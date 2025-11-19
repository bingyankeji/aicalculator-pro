import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import EngineHorsepowerCalculator from '@/components/Calculator/EngineHorsepowerCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Engine Horsepower Calculator - Calculate HP from Quarter Mile ET & Trap Speed | AICalculator',
  description: 'Free engine horsepower calculator using quarter-mile elapsed time (ET) and trap speed methods. Estimate your vehicle\'s engine power from drag racing performance data.',
  keywords: [
    'engine horsepower calculator',
    'quarter mile horsepower calculator',
    'ET horsepower calculator',
    'trap speed horsepower calculator',
    'drag racing calculator',
    'engine power calculator',
    'quarter mile ET calculator',
    'calculate horsepower from ET',
    'calculate horsepower from speed',
    'vehicle horsepower estimator',
    'drag strip calculator',
    '1/4 mile horsepower',
    'car horsepower calculator',
    'engine performance calculator',
    'horsepower from acceleration',
    'race car power calculator',
    'dyno alternative calculator',
    'engine HP estimation',
    'trap speed formula',
    'ET method horsepower',
    'vehicle power estimator',
    'racing horsepower calculator',
    'performance calculator',
    'engine power estimation',
    'quarter mile calculator',
    'drag race calculator',
    'car performance calculator',
    '402 meter calculator',
    '1320 feet calculator',
    'terminal velocity calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Engine Horsepower Calculator - Calculate from Quarter Mile Performance',
    description: 'Calculate engine horsepower from quarter-mile ET and trap speed. Two proven methods for estimating vehicle power based on drag racing performance.',
    type: 'website',
    url: getUrl('/engine-horsepower-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('engine-horsepower'),
      width: 1200,
      height: 630,
      alt: 'Engine Horsepower Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engine Horsepower Calculator - ET & Trap Speed Methods',
    description: 'Estimate engine horsepower from quarter-mile performance data using proven ET and trap-speed calculation methods.',
    images: [getOgImage('engine-horsepower')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/engine-horsepower-calculator'),
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

export default function EngineHorsepowerCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/engine-horsepower-calculator'),
        name: 'Engine Horsepower Calculator',
        url: getUrl('/engine-horsepower-calculator'),
        description: 'Calculate engine horsepower from quarter-mile performance using elapsed time (ET) and trap speed methods. Estimate vehicle power based on drag racing data.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate horsepower from elapsed time (ET)',
          'Calculate horsepower from trap speed',
          'Compare both calculation methods',
          'Support for multiple weight units',
          'Support for multiple speed units',
          'Detailed calculation breakdowns',
          'Real-time results',
          'Save and print results',
          'Mobile-friendly interface',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/engine-horsepower-calculator'),
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
            name: 'Engine Horsepower Calculator',
            item: getUrl('/engine-horsepower-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/engine-horsepower-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you calculate horsepower from quarter-mile time?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Elapsed Time (ET) method calculates horsepower using the formula: HP = Weight / (ET/5.825)³. For example, a 3,500-pound car running a 14-second quarter mile produces approximately 264 horsepower. This formula accounts for the relationship between mass, acceleration, and power output. The constant 5.825 is derived from the physics of accelerating a vehicle over 1,320 feet (quarter mile). This method is most accurate for vehicles with good traction and minimal aerodynamic drag.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is trap speed and how does it relate to horsepower?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Trap speed is the velocity a vehicle reaches at the end of the quarter mile (at the finish line). The trap-speed method calculates horsepower using: HP = Weight×(Speed/234)³. For example, a 3,500-pound car with a trap speed of 98 mph produces approximately 280 horsepower. Trap speed is a more reliable indicator of engine power because it\'s less affected by launch technique and traction. Higher trap speeds indicate more power, while ET is influenced heavily by driver skill and tire traction. Professional drag racers use trap speed as the primary power indicator.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which method is more accurate: ET or trap speed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both methods provide estimates, but trap speed is generally more accurate for determining engine power. The ET method is sensitive to launch efficiency, traction, and driver skill - factors that don\'t reflect actual engine power. Trap speed better represents the vehicle\'s ability to maintain acceleration through the entire quarter mile, making it less dependent on launch conditions. However, trap speed can be affected by aerodynamic drag and gear ratios. For the most accurate assessment, compare results from both methods. A well-tuned car should show similar horsepower estimates from both calculations.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why do the two methods give different horsepower results?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Differences between ET and trap-speed calculations reveal vehicle characteristics. If the ET method shows higher horsepower, the car likely has excellent traction and launch but faces aerodynamic drag at high speed. If trap speed shows higher horsepower, the car may have traction issues at launch but good high-speed power delivery. Heavy vehicles with high-torque engines often show larger differences. Lightweight cars with good aerodynamics show more consistent results. Differences of 10-15% are normal, while larger gaps suggest setup issues or measurement errors.',
            },
          },
          {
            '@type': 'Question',
            name: 'What vehicle weight should I use for calculations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use the actual racing weight: vehicle curb weight plus driver (typically 175 lbs) and any equipment or fuel. For best accuracy, weigh the car at the track with driver aboard and the fuel level you\'ll race with. Many racers remove 100-200 lbs through interior stripping or lightweight parts. Each 100 lbs affects calculated horsepower by approximately 10-15 hp at typical trap speeds. Front-engine RWD cars should include weight transfer effects. AWD vehicles may need adjustment for drivetrain losses (typically 15-25% more than the calculation suggests).',
            },
          },
          {
            '@type': 'Question',
            name: 'Are these calculations accurate for all types of vehicles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'These formulas work best for traditional internal combustion vehicles running on street tires or drag radials. They\'re less accurate for: 1) Electric vehicles with instant torque delivery, 2) Heavily modified drag cars with slicks and suspension tuning, 3) Very lightweight vehicles under 2,000 lbs, 4) Vehicles with extreme aerodynamic modifications. For motorcycles, use motorcycle-specific formulas. Professional drag cars with wheelie bars, parachutes, or wings require more complex calculations accounting for downforce and aerodynamics. For daily drivers and street performance cars, these methods provide reliable estimates within 5-10% of dyno results.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/engine-horsepower-calculator'),
        name: 'How to Calculate Engine Horsepower from Quarter Mile Performance',
        description: 'Step-by-step guide for calculating engine horsepower using ET and trap speed methods.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Engine Horsepower Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Gather Quarter Mile Performance Data',
            text: 'Record your vehicle\'s quarter-mile performance data from a drag strip or performance test. You need either the elapsed time (ET) from start to finish, or the trap speed measured at the finish line. Also record your vehicle\'s total racing weight including driver and fuel.',
            url: getStepUrl('/engine-horsepower-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Calculation Method',
            text: 'Select either the ET Method or Trap-Speed Method based on your available data. The ET method uses elapsed time and works well for traction-limited vehicles. The trap-speed method uses terminal velocity and better reflects actual engine power independent of launch efficiency.',
            url: getStepUrl('/engine-horsepower-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Vehicle Weight',
            text: 'Input your vehicle\'s racing weight and select the unit (pounds, kilograms, tons). Use the total weight including driver, fuel, and any equipment. For most accurate results, weigh the car at the track with the driver aboard.',
            url: getStepUrl('/engine-horsepower-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter Performance Data',
            text: 'For ET method: enter the elapsed time in seconds (or milliseconds). For trap-speed method: enter the speed at the finish line in mph, km/h, or m/s. Ensure you use the trap speed (terminal velocity), not average speed.',
            url: getStepUrl('/engine-horsepower-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Horsepower',
            text: 'Click the Calculate button for your chosen method. The calculator applies the formula: HP = Weight/(ET/5.825)³ for ET method, or HP = Weight×(Speed/234)³ for trap-speed method. Review the estimated horsepower and kilowatt values.',
            url: getStepUrl('/engine-horsepower-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Compare Methods and Interpret Results',
            text: 'If you have both ET and trap speed data, calculate using both methods and compare results. Similar values indicate good traction and setup. Large differences suggest traction issues (ET higher) or aerodynamic drag (trap speed higher). Use results to identify tuning opportunities.',
            url: getStepUrl('/engine-horsepower-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/engine-horsepower-calculator'),
        headline: 'Engine Horsepower Calculator: Calculate HP from Quarter Mile Performance',
        description: 'Comprehensive guide to calculating engine horsepower from drag racing data using elapsed time and trap speed methods.',
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
        image: getOgImage('engine-horsepower'),
        articleBody: 'Comprehensive guide covering engine horsepower calculation from quarter-mile performance data, including ET and trap-speed methods, drag racing principles, and performance analysis.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Engine Horsepower Calculator - Calculate HP from Quarter Mile ET and Trap Speed</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Engine Horsepower Calculator"
        calculatorUrl="/engine-horsepower-calculator"
      />

      {/* Calculator Component */}
      <EngineHorsepowerCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Calculating Engine Horsepower from Quarter Mile Performance</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Engine horsepower</strong> can be estimated from quarter-mile drag racing performance using two proven mathematical methods. 
              These calculations provide reliable power estimates without requiring expensive dynamometer testing, making them invaluable tools 
              for racers, tuners, and automotive enthusiasts.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding the Quarter Mile</h3>
          <p className="text-gray-700 mb-4">
            The quarter mile (1/4 mile or 402.3 meters) is the standard distance for drag racing worldwide. Two key measurements define performance:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Elapsed Time (ET):</strong> The time from start to finish - measures overall acceleration capability</li>
            <li><strong>Trap Speed:</strong> Terminal velocity at the finish line - indicates sustained power output</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Both measurements provide insights into vehicle performance, but each emphasizes different aspects of engine power and chassis setup.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Elapsed Time (ET) Method</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Formula and Calculation</h4>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-lg font-mono">Horsepower = Weight / (ET/5.825)³</p>
          </div>
          <p className="text-gray-700 mb-4">
            This formula relates vehicle weight, elapsed time, and power output. The constant 5.825 is derived from the physics of acceleration over 1,320 feet.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example Calculation:</h5>
            <p className="text-gray-700 mb-2">
              <strong>Vehicle:</strong> 3,500 lbs<br />
              <strong>Quarter Mile ET:</strong> 14.0 seconds<br />
              <strong>Calculation:</strong> HP = 3,500 / (14.0/5.825)³ = 3,500 / (2.403)³ = 3,500 / 13.85 = 253 hp
            </p>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">When to Use the ET Method</h4>
          <p className="text-gray-700 mb-4">
            The ET method is best for:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Vehicles with good traction and consistent launches</li>
            <li>Street cars on standard tires (not drag slicks)</li>
            <li>Comparing improvements after modifications</li>
            <li>Initial power estimates without trap speed data</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Limitations of ET Method</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Launch sensitivity:</strong> Poor traction inflates ET, underestimating power</li>
            <li><strong>Driver skill:</strong> Reaction time and shifting affect results</li>
            <li><strong>Track conditions:</strong> Temperature, surface prep, and altitude impact traction</li>
            <li><strong>Weight transfer:</strong> Inadequate suspension setup affects launch efficiency</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Trap-Speed Method</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Formula and Calculation</h4>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <p className="text-lg font-mono">Horsepower = Weight × (Speed/234)³</p>
          </div>
          <p className="text-gray-700 mb-4">
            This formula uses terminal velocity (trap speed) at the quarter-mile finish line. The constant 234 accounts for aerodynamic factors and the power required to maintain acceleration against air resistance.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example Calculation:</h5>
            <p className="text-gray-700 mb-2">
              <strong>Vehicle:</strong> 3,500 lbs<br />
              <strong>Trap Speed:</strong> 98 mph<br />
              <strong>Calculation:</strong> HP = 3,500 × (98/234)³ = 3,500 × (0.4188)³ = 3,500 × 0.0734 = 257 hp
            </p>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Why Trap Speed is More Reliable</h4>
          <p className="text-gray-700 mb-4">
            Trap speed offers several advantages:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Launch independent:</strong> Not affected by poor traction at the start</li>
            <li><strong>Power indicator:</strong> Directly reflects engine's ability to sustain acceleration</li>
            <li><strong>Aerodynamic insight:</strong> Shows how efficiently the car moves through air</li>
            <li><strong>Tuning diagnostic:</strong> Helps identify power delivery issues vs. traction problems</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Comparing Both Methods</h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Aspect</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">ET Method</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Trap-Speed Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Primary Measurement</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Total elapsed time</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Terminal velocity</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Traction Sensitivity</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Very high - poor launch ruins ET</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Low - measures sustained power</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Driver Skill Impact</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Significant - launch and shifts matter</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Minimal - speed reflects power</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Well-setup street cars</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Any vehicle, most accurate</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Typical Accuracy</td>
                  <td className="px-6 py-4 text-sm text-gray-700">±10-15% with good traction</td>
                  <td className="px-6 py-4 text-sm text-gray-700">±5-10% vs dyno results</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Interpreting Differences Between Methods</h4>
          <p className="text-gray-700 mb-4">
            When both methods yield different results, the discrepancy reveals vehicle characteristics:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h5 className="font-semibold text-blue-900 mb-3">ET Method Shows Higher HP</h5>
              <p className="text-sm text-gray-700 mb-2"><strong>Indicates:</strong></p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Excellent launch and traction</li>
                <li>• Efficient weight transfer</li>
                <li>• Possible aerodynamic drag issues</li>
                <li>• Power delivery may drop at high RPM</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h5 className="font-semibold text-green-900 mb-3">Trap Speed Shows Higher HP</h5>
              <p className="text-sm text-gray-700 mb-2"><strong>Indicates:</strong></p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Traction-limited launch</li>
                <li>• Poor weight transfer or suspension</li>
                <li>• Strong top-end power</li>
                <li>• Good aerodynamic efficiency</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Factors Affecting Accuracy</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Vehicle Weight Considerations</h4>
          <p className="text-gray-700 mb-4">
            Accurate weight is critical for reliable calculations:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Use racing weight:</strong> Curb weight + driver (175 lbs typically) + fuel + equipment</li>
            <li><strong>Weight distribution:</strong> Front-engine RWD benefits from weight transfer, affecting ET more than trap speed</li>
            <li><strong>AWD vehicles:</strong> Higher drivetrain losses (20-25%) mean calculated HP is at wheels, not engine</li>
            <li><strong>Weight reduction:</strong> Every 100 lbs removed equals approximately 10-15 hp improvement in calculations</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Environmental Factors</h4>
          <p className="text-gray-700 mb-4">
            Track conditions significantly impact performance:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Altitude:</strong> Higher elevation reduces power (approximately 3% per 1,000 feet above sea level)</li>
            <li><strong>Temperature:</strong> Hot air reduces power; cold air increases it (1% per 10°F difference)</li>
            <li><strong>Humidity:</strong> Higher humidity slightly reduces power in naturally aspirated engines</li>
            <li><strong>Track prep:</strong> Better surface preparation improves ET but doesn't affect trap speed much</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Real-World Applications</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Before and After Modifications</h4>
          <p className="text-gray-700 mb-4">
            These calculators excel at measuring modification effectiveness:
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example: Cold Air Intake Installation</h5>
            <p className="text-gray-700 mb-2">
              <strong>Before:</strong> 14.5 ET, 95 mph trap = 226 hp (trap speed method)<br />
              <strong>After:</strong> 14.3 ET, 97 mph trap = 239 hp (trap speed method)<br />
              <strong>Gain:</strong> 13 hp - verified without dyno testing
            </p>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tuning Diagnostics</h4>
          <p className="text-gray-700 mb-4">
            Comparing methods helps diagnose setup issues:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Large ET/trap discrepancy (>15%):</strong> Check tire pressure, suspension, and launch technique</li>
            <li><strong>Improving ET but not trap speed:</strong> Better traction, but no power gains</li>
            <li><strong>Improving trap but not ET:</strong> More power, but losing it at launch</li>
            <li><strong>Both improving proportionally:</strong> True power gains from modifications</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Vehicle Type Considerations</h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Vehicle Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Preferred Method</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Street Car (RWD)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Trap Speed</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Less traction than race cars, trap speed more reliable</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Street Car (AWD)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Either method</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Good traction makes ET accurate; add 20% for drivetrain loss</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Drag Race Car</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Either method</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Slicks and setup make both methods accurate</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">FWD Sport Compact</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Trap Speed</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Weight distribution limits traction, affecting ET</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Muscle Car</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Either method</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Good weight distribution, both methods reliable</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Electric Vehicle</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Use with caution</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Instant torque changes acceleration physics; less accurate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Advanced Topics</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Corrected vs Uncorrected Power</h4>
          <p className="text-gray-700 mb-4">
            These formulas calculate "uncorrected" horsepower at current conditions. For comparison across different conditions:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>Apply SAE correction factors for temperature and pressure</li>
            <li>Standard conditions: 77°F (25°C), 29.92 inHg (sea level)</li>
            <li>Correction increases calculated HP by 3-15% depending on conditions</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Wheel HP vs Engine HP</h4>
          <p className="text-gray-700 mb-4">
            These calculations estimate power at the wheels. To estimate engine horsepower:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>RWD (manual):</strong> Add 12-15% for drivetrain loss</li>
            <li><strong>RWD (automatic):</strong> Add 15-18% for drivetrain loss</li>
            <li><strong>FWD:</strong> Add 10-12% for drivetrain loss</li>
            <li><strong>AWD:</strong> Add 18-25% for drivetrain loss</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Common Mistakes to Avoid:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Using curb weight instead of racing weight:</strong> Always include driver and fuel</li>
              <li>• <strong>Confusing average speed with trap speed:</strong> Only terminal velocity at finish line counts</li>
              <li>• <strong>Comparing across different tracks:</strong> Surface preparation varies significantly</li>
              <li>• <strong>Ignoring altitude and temperature:</strong> Environmental factors affect power significantly</li>
              <li>• <strong>Expecting dyno-level accuracy:</strong> These are estimates, typically ±10% of dyno results</li>
              <li>• <strong>Not accounting for drivetrain type:</strong> AWD calculations need adjustment for loss</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Validation and Accuracy</h3>
          <p className="text-gray-700 mb-4">
            Studies comparing these methods to chassis dynamometer testing show:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Trap-speed method: typically within 5-10% of dyno-measured wheel horsepower</li>
            <li>ET method: 10-15% accuracy with good traction; less accurate with poor traction</li>
            <li>Both methods together: narrow the range to ±5% when results agree</li>
            <li>Best accuracy with: consistent track conditions, multiple runs averaged, proper vehicle weight</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resources and Further Reading</h3>
          <p className="text-gray-700 mb-4">
            For official drag racing standards and performance data:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a 
                href="https://www.nhra.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                NHRA (National Hot Rod Association)
              </a>
              {' '}- Official drag racing organization with performance standards
            </li>
            <li>
              <a 
                href="https://www.sae.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                SAE International
              </a>
              {' '}- Standards for power measurement and correction factors
            </li>
            <li>
              <a 
                href="https://www.caranddriver.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Car and Driver
              </a>
              {' '}- Professional vehicle testing and performance data
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/horsepower-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Horsepower Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert HP, kW, PS and calculate power</p>
          </a>
          
          <a 
            href="/speed-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏎️</div>
            <h3 className="font-semibold text-gray-900">Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate speed, distance, and time</p>
          </a>
          
          <a 
            href="/gas-mileage-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⛽</div>
            <h3 className="font-semibold text-gray-900">Gas Mileage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate fuel efficiency and MPG</p>
          </a>
          
          <a 
            href="/tire-size-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="font-semibold text-gray-900">Tire Size Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Compare tire sizes and speedometer error</p>
          </a>
        </div>
      </section>
    </div>
  );
}

