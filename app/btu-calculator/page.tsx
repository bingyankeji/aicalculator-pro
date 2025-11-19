import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import BTUCalculator from '@/components/Calculator/BTUCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'BTU Calculator - Calculate Air Conditioning & Heating Requirements | AICalculator',
  description: 'Free BTU calculator for estimating air conditioning and heating needs. Calculate required BTU/hr, tonnage, and wattage for any room or building based on size, insulation, and climate.',
  keywords: [
    'BTU calculator',
    'air conditioning calculator',
    'AC BTU calculator',
    'heating BTU calculator',
    'cooling capacity calculator',
    'room BTU calculator',
    'AC size calculator',
    'BTU per square foot',
    'BTU per square meter',
    'tonnage calculator',
    'air conditioner size',
    'heater size calculator',
    'cooling load calculator',
    'heating load calculator',
    'HVAC calculator',
    'BTU to watts',
    'BTU to tons',
    'room cooling calculator',
    'house heating calculator',
    'insulation calculator',
    'energy efficiency calculator',
    'AC unit size',
    'heat pump calculator',
    'window AC calculator',
    'central air calculator',
    'BTU requirements',
    'climate control calculator',
    'temperature calculator',
    'thermal load calculator',
    'HVAC sizing calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'BTU Calculator - Calculate AC & Heating Requirements',
    description: 'Calculate BTU requirements for air conditioning and heating. Estimate cooling and heating capacity based on room size, insulation, climate, and more.',
    type: 'website',
    url: getUrl('/btu-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('btu-calculator'),
      width: 1200,
      height: 630,
      alt: 'BTU Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTU Calculator - AC & Heating Requirements',
    description: 'Calculate BTU/hr, tonnage, and power requirements for air conditioning and heating systems based on your space specifications.',
    images: [getOgImage('btu-calculator')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/btu-calculator'),
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

export default function BTUCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/btu-calculator'),
        name: 'BTU Calculator',
        url: getUrl('/btu-calculator'),
        description: 'Calculate BTU requirements for air conditioning and heating systems. Estimate cooling and heating capacity based on room dimensions, insulation, climate, and occupancy.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate AC cooling BTU requirements',
          'Calculate general heating/cooling BTU needs',
          'Consider room size and ceiling height',
          'Factor in insulation quality',
          'Account for climate conditions',
          'Include occupancy heat load',
          'Support multiple unit systems',
          'Provide equipment recommendations',
          'Real-time calculations',
          'Save and print results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/btu-calculator'),
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
            name: 'BTU Calculator',
            item: getUrl('/btu-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/btu-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many BTUs do I need to cool or heat a room?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The BTU requirements depend on several factors: room size, ceiling height, insulation quality, climate, sun exposure, and occupancy. As a general rule, you need approximately 20 BTU per square foot for cooling (or 125 BTU per square meter). For example, a 200 sq ft bedroom typically requires 4,000-5,000 BTU/hr for adequate cooling. However, this baseline should be adjusted: add 10% for high ceilings, 10% for kitchens, 10% for south-facing rooms, and 400 BTU for each additional person regularly in the room. Poor insulation may require 20-30% more capacity, while excellent insulation can reduce needs by 15-25%.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between BTU and tons in air conditioning?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BTU (British Thermal Unit) measures the amount of heat energy needed to raise one pound of water by one degree Fahrenheit. BTU/hr measures cooling or heating capacity per hour. A "ton" of cooling capacity equals 12,000 BTU/hr, derived from the amount of heat needed to melt one ton of ice in 24 hours. For example, a 2-ton AC unit has 24,000 BTU/hr capacity, suitable for cooling approximately 900-1,400 square feet depending on conditions. Residential units typically range from 1.5 to 5 tons (18,000 to 60,000 BTU/hr). Understanding this conversion helps when comparing different AC systems and matching capacity to your space requirements.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does insulation affect BTU requirements?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Insulation quality significantly impacts heating and cooling needs. Poor insulation allows heat transfer through walls, ceilings, and floors, increasing BTU requirements by 20-40%. Well-insulated spaces retain conditioned air better, reducing requirements by 15-25%. Factors include: wall insulation (R-13 to R-21), attic insulation (R-30 to R-60), window quality (single vs. double-pane), door seals, and air leaks. A poorly insulated 300 sq ft room might need 8,000 BTU/hr for cooling, while the same room with excellent insulation needs only 5,000 BTU/hr. Improving insulation before installing HVAC equipment can reduce equipment size, lower energy costs by 20-30%, and improve comfort.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I oversize or undersize my AC unit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Proper sizing is crucial - both oversizing and undersizing cause problems. An oversized AC unit cools too quickly, short-cycling without adequate dehumidification, leading to clammy conditions, higher energy bills (20-30% increase), and premature equipment failure. An undersized unit runs constantly, struggles to maintain temperature, wears out faster, and increases energy costs. The ideal size provides 5-15% extra capacity beyond calculated needs for safety margin. Our calculator includes a 10-15% buffer. For borderline cases, slightly undersizing is better than oversizing, as modern inverter units adjust output. Consult HVAC professionals for final sizing, especially for central systems or complex layouts.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate BTU for heating vs cooling?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Heating and cooling calculations differ because heating depends on desired temperature increase, while cooling must handle solar heat gain, humidity, and internal loads. For cooling: use the AC BTU Calculator considering room characteristics, climate, and occupancy. For heating: use the General Purpose Calculator based on desired temperature rise - typically 20-30°F (11-17°C) difference between outdoor winter temperature and desired indoor temperature. Heating generally requires more BTU than cooling in cold climates. For example, heating a 1,000 sq ft space from 0°F to 70°F might need 40,000-50,000 BTU/hr, while cooling the same space from 95°F to 75°F needs 24,000-30,000 BTU/hr. Heat pumps can provide both heating and cooling with one system.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are common mistakes in BTU calculations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common mistakes include: 1) Ignoring ceiling height - rooms over 8-9 feet need 10-20% more capacity. 2) Not accounting for sun exposure - south and west-facing rooms can be 20% hotter. 3) Forgetting occupancy - each person adds 400 BTU/hr heat load. 4) Overlooking appliances - kitchens need 10-15% extra capacity due to stove/oven heat. 5) Misunderstanding room type - open floor plans need whole-space calculations, not per-room. 6) Using only square footage - insulation, climate, and windows matter significantly. 7) Buying based on price alone - undersized "bargain" units cost more in electricity and discomfort. 8) Not considering climate zone - hot humid climates need 25% more capacity than moderate climates.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/btu-calculator'),
        name: 'How to Calculate BTU Requirements for Air Conditioning and Heating',
        description: 'Step-by-step guide for calculating accurate BTU requirements for your cooling and heating needs.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'BTU Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Measure Your Space',
            text: 'Measure the room or area dimensions. For rectangular spaces, measure length and width. For irregular spaces, break them into sections. Measure ceiling height as well. Convert to consistent units (meters or feet). For the AC calculator, you can directly input area; for the general calculator, input length, width, and height separately.',
            url: getStepUrl('/btu-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose the Appropriate Calculator',
            text: 'Select the AC BTU Calculator for room air conditioning needs with detailed factors like room type, sun exposure, and climate. Use the General Purpose Calculator for heating or basic cooling calculations based on desired temperature change. The AC calculator is more detailed and suitable for cooling; the general calculator works for both heating and cooling.',
            url: getStepUrl('/btu-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Room Specifications',
            text: 'Input room size and ceiling height in your preferred units. Count the number of people regularly occupying the space. Select room type (bedroom, living room, kitchen, etc.). Kitchens and living rooms typically need 10-15% more capacity than bedrooms of the same size.',
            url: getStepUrl('/btu-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Specify Environmental Factors',
            text: 'Select insulation quality (poor, average, good, or excellent). Choose sun exposure level based on window orientation - south and west-facing rooms get more sun. Select your climate zone (cool, moderate, hot, or very hot). These factors significantly impact BTU requirements, potentially changing needs by 30-50%.',
            url: getStepUrl('/btu-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate and Review Results',
            text: 'Click Calculate to see results. Review the required BTU/hr capacity, recommended capacity (with safety margin), and tonnage. Check the calculation details to understand how each factor contributed. The recommended capacity includes a safety buffer for peak conditions.',
            url: getStepUrl('/btu-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Select Appropriate Equipment',
            text: 'Use the calculated tonnage or BTU/hr to shop for equipment. Choose a unit with capacity matching or slightly exceeding the recommended value (within 10%). Avoid oversizing by more than 15%, as this reduces efficiency and comfort. Consider energy efficiency ratings (SEER for cooling, HSPF for heating) when selecting specific models.',
            url: getStepUrl('/btu-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/btu-calculator'),
        headline: 'BTU Calculator: Calculate Air Conditioning and Heating Requirements',
        description: 'Comprehensive guide to calculating BTU requirements for air conditioning and heating systems, including factors affecting capacity needs.',
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
        image: getOgImage('btu-calculator'),
        articleBody: 'Comprehensive guide covering BTU calculations for air conditioning and heating, including room sizing, insulation factors, climate considerations, and equipment selection.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">BTU Calculator - Calculate Air Conditioning and Heating Requirements</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="BTU Calculator"
        calculatorUrl="/btu-calculator"
      />

      {/* Calculator Component */}
      <BTUCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding BTU Calculations for Heating and Cooling</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>BTU (British Thermal Unit)</strong> is the standard measurement for heating and cooling capacity. 
              One BTU is the amount of energy needed to raise the temperature of one pound of water by one degree Fahrenheit. 
              Proper BTU calculation ensures your HVAC system efficiently maintains comfort without wasting energy.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is BTU and Why Does It Matter?</h3>
          <p className="text-gray-700 mb-4">
            BTU measures thermal energy. For air conditioning and heating systems, we use BTU/hr (BTU per hour) to indicate 
            how much heating or cooling a unit can provide in one hour. Understanding BTU requirements helps you:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Avoid undersized equipment:</strong> Insufficient capacity means poor comfort and overworked systems</li>
            <li><strong>Prevent oversizing:</strong> Too much capacity causes short-cycling, poor humidity control, and energy waste</li>
            <li><strong>Optimize energy costs:</strong> Properly sized systems run efficiently and last longer</li>
            <li><strong>Ensure comfort:</strong> Right-sized equipment maintains steady temperatures and humidity</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Basic BTU Calculation Formula</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">For Cooling (Air Conditioning)</h4>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm font-mono mb-2">Basic Formula: Area (sq ft) × 20 BTU = Required BTU/hr</p>
            <p className="text-sm font-mono">Metric: Area (sq m) × 125 BTU = Required BTU/hr</p>
          </div>
          <p className="text-gray-700 mb-4">
            This baseline assumes 8-foot ceilings, average insulation, moderate climate, and typical usage. Adjustments are 
            required for:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Ceiling height above 8-9 feet: add 10-20%</li>
            <li>Kitchen: add 4,000 BTU</li>
            <li>Each additional occupant: add 400 BTU</li>
            <li>Sunny rooms (south/west exposure): add 10%</li>
            <li>Shaded rooms: subtract 10%</li>
            <li>Hot climate: add 10-15%</li>
            <li>Poor insulation: add 20-30%</li>
            <li>Good insulation: subtract 10-15%</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">For Heating</h4>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-sm font-mono">Formula: Volume (cubic ft) × Temperature Change (°F) × 0.133 = BTU/hr</p>
          </div>
          <p className="text-gray-700 mb-6">
            Heating calculations depend on the desired temperature increase. In cold climates, you might want to raise indoor 
            temperature 30-40°F above outdoor winter lows, requiring substantially more BTU than cooling needs.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Factors Affecting BTU Requirements</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Room Size and Volume</h4>
          <p className="text-gray-700 mb-4">
            Larger spaces require more heating or cooling capacity. Both floor area and ceiling height matter - a room with 
            12-foot ceilings needs 30-50% more capacity than one with 8-foot ceilings of the same floor area.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example Calculation:</h5>
            <p className="text-gray-700 mb-2">
              <strong>Room:</strong> 15 ft × 12 ft = 180 sq ft<br />
              <strong>Ceiling:</strong> 8 ft (standard)<br />
              <strong>Basic cooling need:</strong> 180 × 20 = 3,600 BTU/hr<br />
              <strong>With adjustments:</strong> +800 BTU (2 people), +10% (sunny) = 4,920 BTU/hr<br />
              <strong>Recommended unit:</strong> 5,000 BTU window AC
            </p>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Insulation Quality</h4>
          <p className="text-gray-700 mb-4">
            Insulation is one of the most significant factors affecting BTU requirements:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Insulation Level</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Characteristics</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">BTU Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Poor</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Old windows, minimal wall insulation, air leaks</td>
                  <td className="px-6 py-4 text-sm text-red-600 font-semibold">+25-40%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Average</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Standard insulation, older double-pane windows</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">Baseline (0%)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Good</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Modern insulation, quality windows, sealed doors</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">-15-20%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Excellent</td>
                  <td className="px-6 py-4 text-sm text-gray-700">High-R insulation, low-E windows, air-tight construction</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">-25-30%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Climate Zone</h4>
          <p className="text-gray-700 mb-4">
            Your local climate significantly impacts cooling needs. The same room requires different capacity in Phoenix versus Seattle:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Cool climate (Seattle, Portland):</strong> 15-20 BTU per sq ft typically sufficient</li>
            <li><strong>Moderate climate (New York, San Francisco):</strong> 20-25 BTU per sq ft</li>
            <li><strong>Hot climate (Atlanta, Dallas):</strong> 25-30 BTU per sq ft</li>
            <li><strong>Very hot climate (Phoenix, Miami):</strong> 30-35 BTU per sq ft or more</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Sun Exposure and Windows</h4>
          <p className="text-gray-700 mb-4">
            Solar heat gain through windows increases cooling load:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>North-facing:</strong> Minimal sun exposure, reduce BTU by 5-10%</li>
            <li><strong>East-facing:</strong> Morning sun, standard calculation</li>
            <li><strong>South-facing:</strong> Maximum sun in winter, add 5-10%</li>
            <li><strong>West-facing:</strong> Afternoon sun (hottest), add 10-20%</li>
            <li><strong>Multiple large windows:</strong> Add 10-15% additional capacity</li>
            <li><strong>Shaded by trees/awnings:</strong> Reduce by 10-15%</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Occupancy and Heat Sources</h4>
          <p className="text-gray-700 mb-4">
            People and appliances generate heat that your cooling system must remove:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Each person:</strong> Add 400 BTU/hr (sedentary) to 600 BTU/hr (active)</li>
            <li><strong>Kitchens:</strong> Add 4,000-6,000 BTU for stove, oven, refrigerator</li>
            <li><strong>Home office:</strong> Add 400-800 BTU for computers and equipment</li>
            <li><strong>Home theater:</strong> Add 500-1,000 BTU for electronics</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Room-by-Room BTU Guidelines</h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Room Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Typical Size</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Recommended BTU/hr</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Small Bedroom</td>
                  <td className="px-6 py-4 text-sm text-gray-700">100-150 sq ft</td>
                  <td className="px-6 py-4 text-sm text-gray-700">5,000-6,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Single occupant, minimal equipment</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Master Bedroom</td>
                  <td className="px-6 py-4 text-sm text-gray-700">250-350 sq ft</td>
                  <td className="px-6 py-4 text-sm text-gray-700">9,000-12,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Two occupants, TV</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Living Room</td>
                  <td className="px-6 py-4 text-sm text-gray-700">300-450 sq ft</td>
                  <td className="px-6 py-4 text-sm text-gray-700">12,000-18,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Multiple occupants, electronics</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Kitchen</td>
                  <td className="px-6 py-4 text-sm text-gray-700">200-300 sq ft</td>
                  <td className="px-6 py-4 text-sm text-gray-700">10,000-15,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">High heat from appliances</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Home Office</td>
                  <td className="px-6 py-4 text-sm text-gray-700">150-200 sq ft</td>
                  <td className="px-6 py-4 text-sm text-gray-700">6,000-8,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Computer equipment heat</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Whole House</td>
                  <td className="px-6 py-4 text-sm text-gray-700">1,500-2,000 sq ft</td>
                  <td className="px-6 py-4 text-sm text-gray-700">36,000-48,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">3-4 ton central AC system</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding AC Tonnage</h3>
          <p className="text-gray-700 mb-4">
            Air conditioning capacity is often expressed in "tons" rather than BTU. This terminology dates back to ice cooling 
            systems and the energy needed to melt ice:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>1 ton</strong> = 12,000 BTU/hr (heat needed to melt 1 ton of ice in 24 hours)</li>
            <li><strong>1.5 tons</strong> = 18,000 BTU/hr - typical for 700-1,000 sq ft</li>
            <li><strong>2 tons</strong> = 24,000 BTU/hr - typical for 1,000-1,400 sq ft</li>
            <li><strong>2.5 tons</strong> = 30,000 BTU/hr - typical for 1,400-1,700 sq ft</li>
            <li><strong>3 tons</strong> = 36,000 BTU/hr - typical for 1,700-2,100 sq ft</li>
            <li><strong>4 tons</strong> = 48,000 BTU/hr - typical for 2,100-2,700 sq ft</li>
            <li><strong>5 tons</strong> = 60,000 BTU/hr - typical for 2,700-3,300 sq ft</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Types of Air Conditioning Systems</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Window AC Units</h4>
          <p className="text-gray-700 mb-4">
            <strong>Capacity range:</strong> 5,000-24,000 BTU/hr<br />
            <strong>Best for:</strong> Single rooms, apartments, supplemental cooling<br />
            <strong>Pros:</strong> Low cost, easy installation, portable<br />
            <strong>Cons:</strong> Noisy, blocks window, less efficient for large spaces
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Portable AC Units</h4>
          <p className="text-gray-700 mb-4">
            <strong>Capacity range:</strong> 8,000-14,000 BTU/hr<br />
            <strong>Best for:</strong> Renters, temporary cooling, rooms without suitable windows<br />
            <strong>Pros:</strong> No permanent installation, movable between rooms<br />
            <strong>Cons:</strong> Less efficient, requires window vent, takes up floor space
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Mini-Split Systems</h4>
          <p className="text-gray-700 mb-4">
            <strong>Capacity range:</strong> 9,000-36,000 BTU/hr per indoor unit<br />
            <strong>Best for:</strong> Single rooms, home additions, multi-zone cooling<br />
            <strong>Pros:</strong> Very efficient, quiet, zoned cooling, no ductwork needed<br />
            <strong>Cons:</strong> Higher upfront cost, professional installation required
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Central Air Conditioning</h4>
          <p className="text-gray-700 mb-4">
            <strong>Capacity range:</strong> 18,000-60,000+ BTU/hr (1.5-5+ tons)<br />
            <strong>Best for:</strong> Whole-house cooling, homes with existing ductwork<br />
            <strong>Pros:</strong> Even cooling throughout house, increases home value<br />
            <strong>Cons:</strong> Expensive installation, requires ductwork, all-or-nothing operation
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Energy Efficiency Considerations</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">SEER Rating (Cooling Efficiency)</h4>
          <p className="text-gray-700 mb-4">
            SEER (Seasonal Energy Efficiency Ratio) measures cooling efficiency:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>SEER 14-16:</strong> Minimum efficiency, basic units</li>
            <li><strong>SEER 17-19:</strong> Good efficiency, moderate cost</li>
            <li><strong>SEER 20-25:</strong> High efficiency, premium pricing</li>
            <li><strong>SEER 25+:</strong> Top efficiency, highest upfront cost</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Higher SEER units cost more initially but save 20-40% on energy bills. In hot climates, SEER 18+ units 
            typically pay for themselves within 5-8 years through energy savings.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">HSPF Rating (Heating Efficiency)</h4>
          <p className="text-gray-700 mb-4">
            HSPF (Heating Seasonal Performance Factor) measures heat pump heating efficiency:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>HSPF 8-9:</strong> Minimum efficiency</li>
            <li><strong>HSPF 9-10:</strong> Good efficiency</li>
            <li><strong>HSPF 10-13:</strong> High efficiency, best for cold climates</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Common BTU Calculation Mistakes:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Only using square footage:</strong> Ignoring ceiling height, insulation, and climate</li>
              <li>• <strong>Oversizing for "safety":</strong> Too much capacity causes short-cycling and inefficiency</li>
              <li>• <strong>Forgetting kitchens need extra capacity:</strong> Appliances generate significant heat</li>
              <li>• <strong>Ignoring sun exposure:</strong> West-facing rooms can be 10-15°F hotter</li>
              <li>• <strong>Not accounting for occupancy:</strong> People generate 400+ BTU/hr each</li>
              <li>• <strong>Using the same formula for heating and cooling:</strong> Different factors apply</li>
              <li>• <strong>Buying based solely on price:</strong> Undersized units waste energy and fail to maintain comfort</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Professional Consultation</h3>
          <p className="text-gray-700 mb-4">
            While online calculators provide good estimates, professional HVAC contractors should perform final sizing, especially for:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Central air conditioning systems (whole-house)</li>
            <li>Heat pump installations</li>
            <li>Multi-zone mini-split systems</li>
            <li>Commercial applications</li>
            <li>Homes with unusual layouts or high ceilings</li>
            <li>Historic homes with unique insulation challenges</li>
          </ul>
          <p className="text-gray-700 mb-6">
            HVAC professionals use Manual J load calculations, which consider dozens of factors including local climate data, 
            orientation, window specifications, and construction details for the most accurate sizing.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resources and Standards</h3>
          <p className="text-gray-700 mb-4">
            For official HVAC standards and additional information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a 
                href="https://www.energy.gov/energysaver/air-conditioning" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                U.S. Department of Energy - Air Conditioning
              </a>
              {' '}- Official energy efficiency and sizing guidelines
            </li>
            <li>
              <a 
                href="https://www.epa.gov/indoor-air-quality-iaq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                EPA Indoor Air Quality
              </a>
              {' '}- Information on ventilation and climate control
            </li>
            <li>
              <a 
                href="https://www.acca.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Air Conditioning Contractors of America (ACCA)
              </a>
              {' '}- Industry standards including Manual J load calculations
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/electricity-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-semibold text-gray-900">Electricity Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate power consumption and costs</p>
          </a>
          
          <a 
            href="/power-consumption-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Power Consumption</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate appliance energy usage</p>
          </a>
          
          <a 
            href="/unit-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between different units</p>
          </a>
          
          <a 
            href="/temperature-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-semibold text-gray-900">Temperature Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert Celsius, Fahrenheit, Kelvin</p>
          </a>
        </div>
      </section>
    </div>
  );
}

