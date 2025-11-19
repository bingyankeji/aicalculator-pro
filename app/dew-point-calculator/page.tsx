import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import DewPointCalculator from '@/components/Calculator/DewPointCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Dew Point Calculator - Calculate Dew Point Temperature | AICalculator',
  description: 'Free dew point calculator to estimate the temperature at which air becomes saturated with moisture. Calculate comfort levels, condensation risk, and humidity effects on indoor air quality.',
  keywords: [
    'dew point calculator',
    'dew point temperature',
    'dew point',
    'humidity calculator',
    'relative humidity calculator',
    'condensation calculator',
    'moisture calculator',
    'dew point formula',
    'calculate dew point',
    'air quality calculator',
    'comfort index calculator',
    'indoor humidity calculator',
    'mold risk calculator',
    'condensation risk',
    'humidity comfort level',
    'dew point chart',
    'dew point vs humidity',
    'moisture content calculator',
    'water vapor calculator',
    'saturation point calculator',
    'humidity index',
    'dew point meter',
    'atmospheric moisture',
    'comfort level calculator',
    'indoor air quality',
    'dehumidifier calculator',
    'hvac calculator',
    'weather dew point',
    'dew point measurement',
    'psychrometric calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Dew Point Calculator - Humidity & Comfort Assessment',
    description: 'Calculate dew point temperature and assess comfort levels, condensation risk, and indoor air quality. Get recommendations for optimal humidity control.',
    type: 'website',
    url: getUrl('/dew-point-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('dew-point'),
      width: 1200,
      height: 630,
      alt: 'Dew Point Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dew Point Calculator - Comfort & Air Quality',
    description: 'Calculate dew point and assess humidity comfort levels, condensation risk, and indoor air quality recommendations.',
    images: [getOgImage('dew-point')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/dew-point-calculator'),
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

export default function DewPointCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/dew-point-calculator'),
        name: 'Dew Point Calculator',
        url: getUrl('/dew-point-calculator'),
        description: 'Calculate dew point temperature from air temperature and relative humidity. Assess comfort levels, condensation risk, and get indoor air quality recommendations.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate dew point temperature',
          'Calculate from any two of three variables',
          'Temperature in Celsius or Fahrenheit',
          'Comfort level assessment',
          'Condensation risk evaluation',
          'Health effects analysis',
          'Indoor air quality recommendations',
          'Mold prevention guidance',
          'Real-time calculations',
          'Save and print results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/dew-point-calculator'),
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
            name: 'Dew Point Calculator',
            item: getUrl('/dew-point-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/dew-point-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is dew point and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dew point is the temperature at which air becomes saturated with water vapor and condensation begins to form. It\'s calculated using the Magnus formula: Td = (b × α) / (a - α), where α = [(a × T) / (b + T)] + ln(RH/100), T is air temperature in °C, RH is relative humidity as percentage, a = 17.27, and b = 237.7. For example, if air temperature is 25°C (77°F) with 60% relative humidity, the dew point is approximately 16.7°C (62°F). Unlike relative humidity which changes with temperature, dew point is an absolute measure of atmospheric moisture content. Lower dew points indicate drier air, while higher dew points indicate more moisture in the atmosphere.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a comfortable dew point temperature?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Comfortable dew point temperatures range from 50-60°F (10-16°C). At this level, most people feel comfortable and neither too dry nor too humid. Below 50°F feels dry and may cause dry skin or respiratory irritation. 60-65°F (16-18°C) feels slightly humid but still tolerable. 65-70°F (18-21°C) feels noticeably humid and uncomfortable, with a sticky sensation. Above 70°F (21°C) feels very humid to oppressive, similar to tropical climates. Above 75°F (24°C) is considered extremely humid and can be dangerous for prolonged exposure. The ideal indoor dew point for comfort and health is 50-55°F (10-13°C), which corresponds to approximately 40-50% relative humidity at normal room temperature.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does dew point affect condensation and mold?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Condensation forms on surfaces when their temperature drops below the dew point. If the temperature difference between air and a surface (like a window or wall) is less than 2-4°C (4-7°F), condensation is highly likely. This moisture creates ideal conditions for mold growth, which thrives in humidity above 60% and dew points above 55°F (13°C). Single-pane windows, poorly insulated walls, cold water pipes, and basements are especially prone to condensation. To prevent mold: maintain dew point below 50°F (10°C), ensure proper ventilation, use dehumidifiers if needed, insulate cold surfaces, and fix water leaks promptly. Mold can develop within 24-48 hours in favorable conditions, so immediate action on condensation is critical for preventing health issues and structural damage.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between dew point and relative humidity?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dew point and relative humidity both measure atmospheric moisture but in different ways. Dew point is an absolute measure - the actual temperature at which air becomes saturated, regardless of current temperature. It doesn\'t change unless moisture content changes. Relative humidity is a percentage comparing current moisture to maximum possible moisture at that temperature. It changes with temperature even if actual moisture stays constant. For example, morning air at 50°F with 90% RH and afternoon air at 80°F with 45% RH can have the same dew point (47°F), meaning identical moisture content. Meteorologists prefer dew point because it provides consistent moisture measurement throughout the day, while RH fluctuates with temperature changes. For comfort assessment, dew point is more reliable than RH.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I lower the dew point in my home?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To lower indoor dew point: 1) Use dehumidifiers to remove excess moisture, aiming for 30-50% relative humidity; 2) Improve ventilation by opening windows (when outdoor dew point is lower), using exhaust fans in bathrooms and kitchens, and ensuring HVAC system has adequate fresh air intake; 3) Run air conditioning, which naturally dehumidifies while cooling; 4) Fix moisture sources like leaky pipes, roof leaks, or basement seepage; 5) Avoid moisture-generating activities or use exhaust fans when cooking, showering, or drying clothes; 6) Use moisture barriers in crawl spaces and basements; 7) Ensure proper drainage around home foundation. In summer, keep windows closed during humid days and use AC or dehumidifier. In winter, avoid over-humidification. Monitor with a hygrometer and maintain dew point below 55°F (13°C) to prevent mold and maximize comfort.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does high dew point make it feel hotter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'High dew point makes it feel hotter because it inhibits your body\'s natural cooling mechanism - sweat evaporation. Your body cools itself by producing sweat, which evaporates from skin and removes heat. When dew point is high, the air is nearly saturated with moisture, dramatically reducing evaporation rates. At 70°F (21°C) dew point or above, sweat barely evaporates, leaving you feeling sticky and overheated. This is why 85°F with 70°F dew point (humid) feels much worse than 95°F with 50°F dew point (dry). The heat index combines temperature and humidity to show perceived temperature, and at high dew points, heat index can be 10-20°F higher than actual temperature. Dew points above 65°F (18°C) significantly impair heat dissipation, increasing risk of heat exhaustion and heat stroke during physical activity.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/dew-point-calculator'),
        name: 'How to Calculate and Use Dew Point',
        description: 'Step-by-step guide for calculating dew point and using it to assess comfort and air quality.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Dew Point Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Gather Required Measurements',
            text: 'You need any two of these three values: air temperature, relative humidity percentage, or dew point temperature. Most commonly, you\'ll have air temperature and relative humidity from a thermometer and hygrometer. Weather apps and stations typically provide these measurements. Ensure measurements are taken in the same location and at the same time for accuracy.',
            url: getStepUrl('/dew-point-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Known Values',
            text: 'Input any two of the three values into the calculator. Select your preferred temperature unit (Celsius or Fahrenheit). The most common calculation is entering air temperature and relative humidity to find dew point. Leave the third field blank - the calculator will compute it automatically. Ensure relative humidity is between 0-100%.',
            url: getStepUrl('/dew-point-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Dew Point',
            text: 'Click Calculate to determine the missing value. The calculator uses the Magnus-Tetens approximation formula, which is accurate for most atmospheric conditions. Results show all three values plus conversions between Celsius and Fahrenheit. The dew point result indicates the temperature at which moisture will condense from the air.',
            url: getStepUrl('/dew-point-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Assess Comfort Level',
            text: 'Review the comfort level assessment: Dry (below 50°F), Very Comfortable (50-55°F), Comfortable (55-60°F), Slightly Humid (60-65°F), Humid (65-70°F), Very Humid (70-75°F), or Extremely Humid (above 75°F). This classification helps you understand how the current conditions will feel and whether adjustments are needed for indoor comfort.',
            url: getStepUrl('/dew-point-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Evaluate Condensation Risk',
            text: 'Check the condensation risk assessment based on the temperature difference between air and dew point. If surfaces in your home (windows, walls, pipes) are at or below the dew point, condensation will form. High condensation risk indicates need for dehumidification, improved insulation, or increased ventilation to prevent mold growth and structural damage.',
            url: getStepUrl('/dew-point-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Implement Recommendations',
            text: 'Follow the health effects and recommendations provided. For high dew points, use dehumidifiers or air conditioning, improve ventilation, and monitor for mold. For low dew points, consider humidifiers and moisturizers. Maintain indoor dew point between 50-55°F (10-13°C) for optimal comfort and air quality. Use the guidance to select appropriate HVAC equipment and settings.',
            url: getStepUrl('/dew-point-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/dew-point-calculator'),
        headline: 'Dew Point Calculator: Calculate Temperature, Comfort Levels, and Air Quality',
        description: 'Comprehensive guide to calculating dew point, understanding its impact on comfort and health, and maintaining optimal indoor air quality.',
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
        image: getOgImage('dew-point'),
        articleBody: 'Comprehensive guide covering dew point calculation, comfort assessment, condensation prevention, mold risk management, and indoor air quality optimization.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Dew Point Calculator - Calculate Temperature, Comfort, and Air Quality</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Dew Point Calculator"
        calculatorUrl="/dew-point-calculator"
      />

      {/* Calculator Component */}
      <DewPointCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Dew Point and Its Impact</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Dew point</strong> is the temperature at which air becomes saturated with water vapor and condensation begins to form. 
              It's a critical measure of atmospheric moisture that affects comfort, health, and indoor air quality. Unlike relative humidity, 
              which changes with temperature, dew point provides an absolute measure of moisture content in the air.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Dew Point?</h3>
          <p className="text-gray-700 mb-4">
            Dew point is the temperature to which air must be cooled for water vapor to condense into liquid water (dew, fog, or clouds). 
            When air temperature equals the dew point, relative humidity reaches 100%, and the air is saturated with moisture. This is 
            when you see dew forming on grass in the morning, fog developing, or condensation appearing on cold surfaces.
          </p>

          <p className="text-gray-700 mb-6">
            The dew point is an absolute measurement of moisture in the air - it tells you exactly how much water vapor is present, 
            regardless of temperature. A higher dew point means more moisture in the air. A dew point of 75°F (24°C) in Alaska and 
            Florida indicates the same amount of atmospheric moisture, even though their temperatures might differ greatly.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Dew Point Formula</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm font-mono mb-2">Td = (b × α) / (a - α)</p>
            <p className="text-sm font-mono mb-2">where: α = [(a × T) / (b + T)] + ln(RH/100)</p>
            <p className="text-xs text-gray-600 mt-2">
              T = Air Temperature (°C), RH = Relative Humidity (%), a = 17.27, b = 237.7 (Magnus-Tetens constants)
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example Calculation:</h5>
            <p className="text-gray-700 mb-2">
              <strong>Given:</strong> Air temperature = 25°C (77°F), Relative humidity = 60%<br />
              <strong>Calculation:</strong> α = [(17.27 × 25) / (237.7 + 25)] + ln(0.6) = 1.131<br />
              <strong>Result:</strong> Dew Point = (237.7 × 1.131) / (17.27 - 1.131) = 16.7°C (62°F)<br />
              <strong>Meaning:</strong> If any surface cools to 16.7°C or below, condensation will form
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Dew Point vs. Relative Humidity</h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Aspect</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Dew Point</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Relative Humidity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Type of Measure</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Absolute (temperature)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Relative (percentage)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Changes with Temp</td>
                  <td className="px-6 py-4 text-sm text-gray-700">No (unless moisture added/removed)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Yes (increases as temp drops)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Best Use</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Comfort, moisture content</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Indoor humidity control</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Stability</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Stable throughout day</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Fluctuates with temperature</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Preferred By</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Meteorologists</td>
                  <td className="px-6 py-4 text-sm text-gray-700">HVAC professionals</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Dew Point Comfort Scale</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Dry (Below 50°F / 10°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Perception:</strong> Very dry, comfortable for most</p>
              <p className="text-sm text-gray-700">
                Air feels crisp and dry. Great for outdoor activities. May cause dry skin, static electricity, and respiratory 
                irritation for sensitive individuals. Common in desert climates and heated indoor spaces in winter.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-green-900 mb-2">Comfortable (50-60°F / 10-16°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Perception:</strong> Ideal comfort range</p>
              <p className="text-sm text-gray-700">
                Most people find this range very comfortable. Optimal for indoor environments and outdoor activities. 
                Low risk of mold and dust mites. This is the target range for well-controlled indoor spaces.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Slightly Humid (60-65°F / 16-18°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Perception:</strong> Slightly sticky, generally tolerable</p>
              <p className="text-sm text-gray-700">
                Beginning to feel muggy. Most people still comfortable, but some may notice stickiness. 
                Outdoor activities still pleasant. Mold growth becomes possible in poorly ventilated areas.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Humid (65-70°F / 18-21°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Perception:</strong> Noticeably humid, uncomfortable</p>
              <p className="text-sm text-gray-700">
                Distinctly uncomfortable for most people. Sticky feeling, clothes may feel damp. Outdoor activities become 
                more difficult. High mold and dust mite risk. Typical of humid summer days.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-red-900 mb-2">Very Humid (70-75°F / 21-24°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Perception:</strong> Very uncomfortable, oppressive</p>
              <p className="text-sm text-gray-700">
                Very uncomfortable for most people. Significant difficulty with physical activity. Body's cooling mechanism 
                impaired. High heat stress risk. Severe mold concerns. Common in tropical climates.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Extremely Humid (Above 75°F / 24°C)</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Perception:</strong> Oppressive, dangerous</p>
              <p className="text-sm text-gray-700">
                Extremely uncomfortable and potentially dangerous. Minimal sweat evaporation. High risk of heat exhaustion 
                and heat stroke. Avoid strenuous activity. Rare except in extremely humid tropical conditions.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Condensation and Mold Prevention</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Condensation Forms</h4>
          <p className="text-gray-700 mb-4">
            Condensation occurs when warm, moist air contacts a surface that's at or below the dew point temperature. The air 
            immediately adjacent to the cold surface cools to its dew point, and water vapor condenses into liquid droplets. 
            Common examples include:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Windows:</strong> Especially single-pane windows in winter when outdoor temperature is much lower than indoor</li>
            <li><strong>Cold water pipes:</strong> Pipes carrying cold water in humid conditions</li>
            <li><strong>Walls and ceilings:</strong> Poorly insulated areas where surface temperature drops below dew point</li>
            <li><strong>Basements:</strong> Cool concrete surfaces in contact with humid air</li>
            <li><strong>Air conditioning ducts:</strong> Cold ductwork in unconditioned spaces like attics</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Mold Growth Conditions</h4>
          <p className="text-gray-700 mb-4">
            Mold requires three conditions to grow: moisture, organic material (food), and suitable temperature. Condensation 
            provides the moisture mold needs. Mold growth patterns:
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Mold Growth Timeline:</h5>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-amber-200">
                <span className="font-medium">0-24 hours:</span>
                <span>Water intrusion, surfaces wet</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-amber-200">
                <span className="font-medium">24-48 hours:</span>
                <span>Mold spores begin germinating</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-amber-200">
                <span className="font-medium">3-7 days:</span>
                <span>Visible mold colonies form</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">1-2 weeks:</span>
                <span>Extensive growth, odor, health risks</span>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Prevention Strategies</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Control humidity:</strong> Maintain indoor relative humidity between 30-50%, dew point below 55°F (13°C)</li>
            <li><strong>Improve ventilation:</strong> Use exhaust fans in bathrooms and kitchens, ensure adequate air circulation</li>
            <li><strong>Use dehumidifiers:</strong> Especially in basements, crawl spaces, and humid climates</li>
            <li><strong>Insulate cold surfaces:</strong> Add insulation to prevent surface temperature from dropping below dew point</li>
            <li><strong>Fix leaks promptly:</strong> Repair roof leaks, plumbing issues, and foundation cracks immediately</li>
            <li><strong>Increase surface temperature:</strong> Use double-pane windows, insulated walls, pipe insulation</li>
            <li><strong>Monitor regularly:</strong> Use hygrometer to track humidity and dew point</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Health Effects of Dew Point</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Low Dew Point (Too Dry)</h4>
          <p className="text-gray-700 mb-4">
            When dew point is below 40°F (4°C), air is very dry, which can cause:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Respiratory irritation:</strong> Dry nasal passages, throat discomfort, increased susceptibility to respiratory infections</li>
            <li><strong>Dry skin:</strong> Itching, cracking, exacerbation of eczema and psoriasis</li>
            <li><strong>Eye irritation:</strong> Dry, itchy eyes, especially problematic for contact lens wearers</li>
            <li><strong>Static electricity:</strong> Uncomfortable shocks, potential damage to electronics</li>
            <li><strong>Wood damage:</strong> Furniture and flooring can crack and split</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">High Dew Point (Too Humid)</h4>
          <p className="text-gray-700 mb-4">
            When dew point exceeds 60°F (16°C), especially above 65°F (18°C), health risks include:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Respiratory problems:</strong> Worsens asthma, allergies, and COPD due to mold, dust mites, and bacteria</li>
            <li><strong>Heat stress:</strong> Impaired body cooling through sweat evaporation, increased risk of heat exhaustion</li>
            <li><strong>Mold exposure:</strong> Allergic reactions, respiratory issues, toxic mold syndrome in severe cases</li>
            <li><strong>Dust mite proliferation:</strong> Triggers allergies and asthma, dust mites thrive above 50% RH</li>
            <li><strong>Bacterial growth:</strong> Increased bacterial activity in moist environments</li>
            <li><strong>Sleep disruption:</strong> Discomfort and difficulty sleeping in humid conditions</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Practical Applications</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">HVAC System Selection</h4>
          <p className="text-gray-700 mb-4">
            Understanding dew point helps in choosing appropriate heating, ventilation, and air conditioning equipment:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Dehumidifier sizing:</strong> Calculate moisture removal needs based on dew point and indoor volume</li>
            <li><strong>AC selection:</strong> In humid climates, choose units with good dehumidification capability</li>
            <li><strong>Ventilation planning:</strong> Determine when outdoor air exchange is beneficial (when outdoor dew point is lower)</li>
            <li><strong>Energy efficiency:</strong> Controlling dew point can reduce HVAC energy consumption</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Weather Forecasting</h4>
          <p className="text-gray-700 mb-4">
            Meteorologists use dew point for several purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Fog prediction:</strong> Fog forms when temperature drops to dew point</li>
            <li><strong>Precipitation likelihood:</strong> Higher dew points increase thunderstorm and rain potential</li>
            <li><strong>Severe weather:</strong> Dew points above 70°F can fuel severe thunderstorms and tornadoes</li>
            <li><strong>Frost prediction:</strong> When dew point is below freezing, frost forms instead of dew</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Industrial Applications</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Food storage:</strong> Maintaining proper dew point prevents condensation in cold storage</li>
            <li><strong>Pharmaceutical manufacturing:</strong> Strict dew point control ensures product quality</li>
            <li><strong>Electronics production:</strong> Low dew point prevents corrosion and static damage</li>
            <li><strong>Museums and archives:</strong> Controlling dew point preserves artifacts and documents</li>
            <li><strong>Compressed air systems:</strong> Monitoring dew point prevents water contamination</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Monitoring and Control</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Measurement Tools</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Hygrometer:</strong> Measures relative humidity; calculate dew point from temperature and RH</li>
            <li><strong>Dew point meter:</strong> Directly measures dew point using chilled mirror or capacitive sensor</li>
            <li><strong>Weather stations:</strong> Home weather stations often display dew point along with other parameters</li>
            <li><strong>Smart thermostats:</strong> Some models monitor and display indoor dew point</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Optimal Indoor Targets</h4>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Recommended Indoor Conditions:</h5>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="font-medium">Dew Point:</span>
                <span className="text-blue-700 font-semibold">50-55°F (10-13°C)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="font-medium">Relative Humidity (at 70°F):</span>
                <span className="text-blue-700 font-semibold">40-50%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="font-medium">Temperature:</span>
                <span className="text-blue-700 font-semibold">68-72°F (20-22°C)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Purpose:</span>
                <span className="text-blue-700 font-semibold">Comfort, health, mold prevention</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resources and Further Information</h3>
          <p className="text-gray-700 mb-4">
            For additional information on dew point and indoor air quality:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a 
                href="https://www.weather.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                National Weather Service
              </a>
              {' '}- Official weather forecasts including dew point measurements
            </li>
            <li>
              <a 
                href="https://www.epa.gov/indoor-air-quality-iaq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                EPA - Indoor Air Quality
              </a>
              {' '}- Guidelines for maintaining healthy indoor air quality
            </li>
            <li>
              <a 
                href="https://www.ashrae.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ASHRAE
              </a>
              {' '}- Standards for indoor environmental conditions and HVAC
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
            href="/wind-chill-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌬️</div>
            <h3 className="font-semibold text-gray-900">Wind Chill Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate how cold it feels with wind</p>
          </a>
          
          <a 
            href="/btu-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">❄️</div>
            <h3 className="font-semibold text-gray-900">BTU Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate cooling and heating needs</p>
          </a>
          
          <a 
            href="/temperature-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-semibold text-gray-900">Temperature Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between temperature units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

