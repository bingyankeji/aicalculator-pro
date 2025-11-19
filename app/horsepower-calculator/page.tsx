import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import HorsepowerCalculator from '@/components/Calculator/HorsepowerCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Horsepower Calculator - Convert HP, kW, PS & Calculate Power | AICalculator',
  description: 'Free horsepower calculator to convert between HP, kW, PS power units, calculate power from force/distance/time, and determine horsepower from torque and RPM. Includes all power unit conversions.',
  keywords: [
    'horsepower calculator',
    'HP calculator',
    'power calculator',
    'horsepower to kW',
    'kW to horsepower',
    'HP to watts',
    'metric horsepower',
    'mechanical horsepower',
    'PS to HP',
    'torque to horsepower',
    'engine horsepower',
    'power conversion calculator',
    'HP conversion',
    'kilowatt to HP',
    'BTU to horsepower',
    'horsepower formula',
    'calculate horsepower',
    'RPM to horsepower',
    'torque calculator',
    'power unit converter',
    'horsepower to PS',
    'car horsepower calculator',
    'engine power calculator',
    'horsepower from torque',
    'watts to horsepower',
    'foot-pound to HP',
    'power measurement',
    'horsepower conversion chart',
    'motor horsepower',
    'brake horsepower calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Horsepower Calculator - Convert HP, kW & Calculate Power',
    description: 'Calculate and convert horsepower, kilowatts, metric horsepower (PS), and other power units. Calculate power from force, distance, and time.',
    type: 'website',
    url: getUrl('/horsepower-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('horsepower'),
      width: 1200,
      height: 630,
      alt: 'Horsepower Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Horsepower Calculator - Convert HP & Calculate Power',
    description: 'Calculate and convert horsepower, kilowatts, metric horsepower, and determine power from torque and RPM.',
    images: [getOgImage('horsepower')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/horsepower-calculator'),
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

export default function HorsepowerCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/horsepower-calculator'),
        name: 'Horsepower Calculator',
        url: getUrl('/horsepower-calculator'),
        description: 'Free online horsepower calculator for converting power units (HP, kW, PS) and calculating power from force, distance, time, torque, and RPM.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Power unit conversion (HP, kW, PS, Watts, BTU/h)',
          'Calculate power from force, distance, and time',
          'Calculate horsepower from torque and RPM',
          'Mechanical and metric horsepower support',
          'All common power units included',
          'Real-time conversion results',
          'Save and print results',
          'Mobile-friendly interface',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/horsepower-calculator'),
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
            name: 'Horsepower Calculator',
            item: getUrl('/horsepower-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/horsepower-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate horsepower?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Horsepower can be calculated in several ways: 1) From the definition: Power = Force × Distance / Time. For example, moving 550 pounds one foot in one second equals 1 horsepower. 2) From torque and RPM: HP = (Torque in lb-ft × RPM) / 5252. This is commonly used for engines where torque and rotational speed are measured. 3) By converting from other power units using conversion factors: 1 mechanical HP = 745.7 watts, 1 metric HP (PS) = 735.5 watts.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between mechanical horsepower and metric horsepower?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mechanical horsepower (hp) is primarily used in the United States and equals 745.7 watts or 550 foot-pounds per second. Metric horsepower (PS, from German "Pferdestärke") is used in Europe and equals 735.5 watts or 75 kilogram-force meters per second. Mechanical HP is about 1.4% larger than metric HP. For example, 100 mechanical HP equals approximately 101.4 metric HP (PS). European cars typically list power in PS, while American cars use hp.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert horsepower to kilowatts?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To convert mechanical horsepower to kilowatts, multiply by 0.7457 (or divide by 1.341). For example, 100 hp = 74.57 kW. To convert kilowatts to horsepower, multiply by 1.341 (or divide by 0.7457). For example, 100 kW = 134.1 hp. For metric horsepower (PS), multiply by 0.7355 to get kW, or multiply kW by 1.360 to get PS. Most modern vehicles display power in both units for convenience.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the formula for calculating horsepower from torque?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The formula to calculate horsepower from torque and engine speed is: HP = (Torque × RPM) / 5252. Torque is measured in pound-feet (lb-ft) and RPM is revolutions per minute. The constant 5252 is derived from converting the units properly (2π × 33,000 / 1). For example, an engine producing 200 lb-ft of torque at 5000 RPM generates (200 × 5000) / 5252 = 190.5 hp. Peak horsepower typically occurs at higher RPM than peak torque.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is horsepower important for vehicles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Horsepower determines a vehicle\'s top speed and high-RPM performance capabilities. Higher horsepower allows faster acceleration at highway speeds and higher maximum velocity. However, torque is equally important for low-speed acceleration and towing. The relationship between HP and torque explains vehicle characteristics: sports cars prioritize high horsepower for speed, while trucks emphasize torque for hauling. Modern engines are designed to provide good power across the entire RPM range, not just at peak.',
            },
          },
          {
            '@type': 'Question',
            name: 'What other power units are commonly used?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common power units include: Watts (W) and Kilowatts (kW) - the SI standard, widely used for electric motors and appliances; BTU/hour - common in HVAC systems (3412 BTU/h = 1 kW); Foot-pounds per second (ft⋅lb/s) - used in engineering (550 ft⋅lb/s = 1 hp); and metric horsepower (PS/CV/ch) used in Europe and Asia. Electric vehicles typically use kW for power ratings, while traditional combustion engines use horsepower. Understanding conversions helps compare different types of engines and motors.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/horsepower-calculator'),
        name: 'How to Use Horsepower Calculator',
        description: 'Step-by-step guide for calculating horsepower and converting power units.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Horsepower Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Method',
            text: 'Select from three calculation methods: 1) Power from definition (force, distance, time), 2) Power unit conversion (convert between HP, kW, PS, etc.), or 3) Horsepower from torque and RPM. Choose based on what information you have available.',
            url: getStepUrl('/horsepower-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Values for Definition Method',
            text: 'For power calculation from definition, enter the force value and select its unit (newton, pound-force, etc.), distance value and unit (meter, foot, mile), and time value and unit (second, minute, hour). Use consistent measurements for accurate results.',
            url: getStepUrl('/horsepower-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Up Unit Conversion',
            text: 'For power unit conversion, enter the amount of power you want to convert, select the source unit (Mechanical Horsepower, Kilowatt, Metric Horsepower, etc.), and choose the target unit. The calculator supports all common power units.',
            url: getStepUrl('/horsepower-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate from Torque and RPM',
            text: 'To calculate horsepower from engine specifications, enter the torque value in pound-feet (lb-ft) and the engine speed in revolutions per minute (RPM). This method is commonly used for automotive engines.',
            url: getStepUrl('/horsepower-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Results',
            text: 'Click the "Calculate" button for your chosen method. The calculator will display the power result in multiple units (watts, horsepower, kilowatts, metric HP) along with detailed calculation steps and the formula used.',
            url: getStepUrl('/horsepower-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'View and Export Results',
            text: 'Review all power unit conversions and calculation details. Use the "Save as Image" button to download results as PNG, "Print Results" for a physical copy, or "Share Calculator" to send to others. Use "Clear All" to start a new calculation.',
            url: getStepUrl('/horsepower-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/horsepower-calculator'),
        headline: 'Horsepower Calculator: Complete Guide to Power Conversion and Calculation',
        description: 'Comprehensive guide to calculating horsepower from various inputs, converting between power units, and understanding engine power specifications.',
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
        image: getOgImage('horsepower'),
        articleBody: 'Comprehensive guide covering horsepower calculations, power unit conversions, torque-to-horsepower formulas, and practical applications in automotive and mechanical engineering.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Horsepower Calculator - Convert HP, kW, PS & Calculate Power from Torque, Force, and RPM</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Horsepower Calculator"
        calculatorUrl="/horsepower-calculator"
      />

      {/* Calculator Component */}
      <HorsepowerCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Horsepower and Power Calculations</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Horsepower</strong> is a unit of power that measures the rate of doing work. Originally defined by James Watt in the 18th century 
              to compare steam engines with the power of draft horses, it remains one of the most common ways to measure engine and motor output, 
              particularly in the automotive industry.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Horsepower?</h3>
          <p className="text-gray-700 mb-4">
            Horsepower is defined as the amount of power required to move 550 pounds one foot in one second, or 33,000 foot-pounds per minute. 
            In SI units, one mechanical horsepower equals 745.7 watts. There are actually several different "horsepower" definitions:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Mechanical Horsepower (hp):</strong> 745.699872 watts - Used primarily in the United States</li>
            <li><strong>Metric Horsepower (PS, CV, ch):</strong> 735.49875 watts - Used in Europe and Asia</li>
            <li><strong>Electrical Horsepower:</strong> 746 watts exactly - Used for electric motors</li>
            <li><strong>Boiler Horsepower:</strong> 9,809.5 watts - Used for steam boilers</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Power Calculation Methods</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. From Definition (Force, Distance, Time)</h4>
          <p className="text-gray-700 mb-4">
            The fundamental definition of power is the rate of doing work. Work is force multiplied by distance, so power is:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-center">
            <p className="text-lg">Power = Force × Distance / Time</p>
          </div>
          <p className="text-gray-700 mb-4">
            For example, if you lift a 100-pound weight 10 feet in 2 seconds, you've generated:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
            <li>Work = 100 lb × 10 ft = 1,000 ft-lb</li>
            <li>Power = 1,000 ft-lb / 2 sec = 500 ft-lb/sec</li>
            <li>Horsepower = 500 / 550 = 0.909 hp</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. From Torque and RPM</h4>
          <p className="text-gray-700 mb-4">
            For rotating machinery like engines and motors, horsepower is calculated from torque (rotational force) and rotational speed:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-center">
            <p className="text-lg">HP = (Torque × RPM) / 5252</p>
          </div>
          <p className="text-gray-700 mb-4">
            The constant 5252 comes from unit conversions (2π × 33,000 / 1). This formula is crucial for understanding engine performance:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Torque:</strong> Rotational force measured in pound-feet (lb-ft) or newton-meters (N⋅m)</li>
            <li><strong>RPM:</strong> Revolutions per minute - how fast the engine spins</li>
            <li><strong>The 5252 Crossover:</strong> Horsepower and torque curves always cross at 5252 RPM on a dyno chart</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Example: Sports Car Engine</h5>
            <p className="text-gray-700">
              An engine producing 250 lb-ft of torque at 6,000 RPM generates:<br />
              HP = (250 × 6000) / 5252 = 285.6 hp
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Power Unit Conversions</h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">From</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">To</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Multiply By</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Mechanical HP</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Watts</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-mono">745.7</td>
                  <td className="px-6 py-4 text-sm text-gray-600">100 hp = 74,570 W</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Mechanical HP</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Kilowatts</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-mono">0.7457</td>
                  <td className="px-6 py-4 text-sm text-gray-600">100 hp = 74.57 kW</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Mechanical HP</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Metric HP (PS)</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-mono">1.0139</td>
                  <td className="px-6 py-4 text-sm text-gray-600">100 hp = 101.4 PS</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Kilowatts</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Mechanical HP</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-mono">1.341</td>
                  <td className="px-6 py-4 text-sm text-gray-600">100 kW = 134.1 hp</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Metric HP (PS)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Kilowatts</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-mono">0.7355</td>
                  <td className="px-6 py-4 text-sm text-gray-600">100 PS = 73.55 kW</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">BTU/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Watts</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-mono">0.2931</td>
                  <td className="px-6 py-4 text-sm text-gray-600">1000 BTU/h = 293.1 W</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Horsepower vs Torque: Understanding the Difference</h3>
          <p className="text-gray-700 mb-4">
            Many people confuse horsepower and torque, but they measure different aspects of engine performance:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">Torque</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Rotational force</li>
                <li>• Determines low-speed acceleration</li>
                <li>• Important for towing and hauling</li>
                <li>• Measured in lb-ft or N⋅m</li>
                <li>• "How hard the engine pushes"</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 mb-3">Horsepower</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Rate of doing work</li>
                <li>• Determines top speed capability</li>
                <li>• Important for high-speed performance</li>
                <li>• Measured in hp, kW, or PS</li>
                <li>• "How fast the engine does work"</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            The relationship between the two is mathematical: <strong>Horsepower = Torque × RPM / 5252</strong>. This means:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>High torque at low RPM = Good for trucks and heavy-duty applications</li>
            <li>High torque at high RPM = High horsepower = Good for performance vehicles</li>
            <li>Horsepower and torque curves always intersect at 5252 RPM</li>
            <li>Modern turbo engines provide broad, flat torque curves for best real-world performance</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Automotive Applications</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Engine Types and Power Characteristics</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Engine Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Power Characteristics</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Typical Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Naturally Aspirated</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Linear power delivery, peak power at high RPM</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Sports cars, economy cars</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Turbocharged</td>
                  <td className="px-6 py-4 text-sm text-gray-700">High torque from low RPM, potential lag</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Modern performance and economy vehicles</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Supercharged</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Instant boost, linear delivery, parasitic loss</td>
                  <td className="px-6 py-4 text-sm text-gray-600">American muscle cars, high-performance</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Diesel</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Very high torque, lower peak RPM, less HP</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Trucks, heavy equipment, economy cars (Europe)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Electric Motor</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Maximum torque from 0 RPM, rated in kW</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Electric vehicles, hybrids</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Power Ratings and Real-World Performance</h4>
          <p className="text-gray-700 mb-4">
            Understanding how manufacturers rate engine power is important:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Brake Horsepower (bhp):</strong> Power measured at the engine's crankshaft before drivetrain losses</li>
            <li><strong>Wheel Horsepower (whp):</strong> Power measured at the wheels - typically 10-20% less than bhp due to drivetrain friction</li>
            <li><strong>SAE Net vs Gross:</strong> Net ratings (post-1972) include accessories; gross ratings don't - gross can be 15-25% higher</li>
            <li><strong>DIN/ECE Standards:</strong> European ratings similar to SAE net but may differ slightly in test conditions</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Real-World Example</h5>
            <p className="text-gray-700 mb-2">
              A car rated at 300 bhp might produce:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>270 whp (automatic transmission, AWD)</li>
              <li>280 whp (manual transmission, RWD)</li>
              <li>285 whp (manual transmission, FWD)</li>
            </ul>
            <p className="text-gray-700 mt-2 text-sm">
              The difference is drivetrain loss - AWD has the most components and highest losses.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Industrial and Mechanical Applications</h3>
          <p className="text-gray-700 mb-4">
            Horsepower calculations are essential beyond automotive applications:
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Electric Motors</h4>
          <p className="text-gray-700 mb-4">
            Electric motors are typically rated in kilowatts or horsepower. Motor selection depends on:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Required torque for the application</li>
            <li>Operating speed (RPM)</li>
            <li>Duty cycle (continuous vs intermittent operation)</li>
            <li>Service factor (overload capacity)</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Common motor sizes: 0.5 hp (375W) to 500 hp (373 kW) for industrial applications. HVAC systems use fractional horsepower motors (1/8 hp to 3 hp).
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Pumps and Compressors</h4>
          <p className="text-gray-700 mb-4">
            Pump horsepower depends on flow rate and pressure requirements:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
            <p>Water HP = (GPM × Head in feet × Specific Gravity) / 3960</p>
            <p>Motor HP = Water HP / Pump Efficiency</p>
          </div>
          <p className="text-gray-700 mb-4">
            For example, pumping 100 GPM of water to a height of 50 feet with 70% efficiency requires approximately 1.8 hp.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. HVAC Systems</h4>
          <p className="text-gray-700 mb-4">
            Air conditioning and refrigeration systems use horsepower for compressor sizing. The relationship between cooling capacity and power:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
            <li>1 ton of cooling ≈ 12,000 BTU/h ≈ 3.52 kW</li>
            <li>Compressor HP typically = Tons / 3 to 4 (depending on efficiency)</li>
            <li>A 3-ton residential AC unit uses approximately 1 hp compressor</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Measurement and Testing</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Dynamometer Testing</h4>
          <p className="text-gray-700 mb-4">
            Engine and vehicle power is measured using dynamometers (dynos):
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Engine Dyno:</strong> Measures power directly at the engine crankshaft - most accurate for engine development</li>
            <li><strong>Chassis Dyno:</strong> Measures power at the wheels - accounts for drivetrain losses and represents real-world output</li>
            <li><strong>Water Brake Dyno:</strong> Uses water resistance - common in industrial applications</li>
            <li><strong>Eddy Current Dyno:</strong> Uses magnetic fields - precise and controllable</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Dyno Testing Process</h5>
            <p className="text-gray-700">
              During a dyno run, the engine or vehicle accelerates through its RPM range while the dyno measures torque at each speed. 
              Software calculates horsepower using the formula HP = (Torque × RPM) / 5252, creating power and torque curves. 
              These curves show where the engine makes peak power and torque, critical information for tuning and performance optimization.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Increasing Horsepower</h3>
          <p className="text-gray-700 mb-4">
            Several methods can increase an engine's power output:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h5 className="font-semibold text-gray-900 mb-3">Forced Induction</h5>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Turbocharger: +30-100% power</li>
                <li>• Supercharger: +30-50% power</li>
                <li>• Requires supporting modifications</li>
                <li>• Most cost-effective per HP gain</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h5 className="font-semibold text-gray-900 mb-3">Engine Displacement</h5>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Larger bore/stroke</li>
                <li>• More displacement = more power</li>
                <li>• Expensive but reliable</li>
                <li>• Often combined with other mods</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h5 className="font-semibold text-gray-900 mb-3">Increased RPM</h5>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Higher rev limit = more power</li>
                <li>• Requires stronger components</li>
                <li>• Better breathing at high RPM</li>
                <li>• Race engine approach</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h5 className="font-semibold text-gray-900 mb-3">Efficiency Improvements</h5>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Cold air intake: +5-15 hp</li>
                <li>• Exhaust system: +10-20 hp</li>
                <li>• Engine tuning: +10-30 hp</li>
                <li>• Combined effects multiply</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Mistakes and Considerations</h3>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Avoid These Common Errors:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Confusing power and torque:</strong> They measure different things but are mathematically related</li>
              <li>• <strong>Ignoring unit differences:</strong> Mechanical HP ≠ Metric HP ≠ kW - always specify which unit you're using</li>
              <li>• <strong>Comparing gross to net ratings:</strong> Pre-1972 gross ratings are 15-25% higher than modern net ratings</li>
              <li>• <strong>Neglecting drivetrain loss:</strong> Wheel HP is always less than engine HP</li>
              <li>• <strong>Focusing only on peak numbers:</strong> The power curve shape matters more than peak values for real-world performance</li>
              <li>• <strong>Forgetting correction factors:</strong> Dyno results should be corrected for temperature, pressure, and humidity</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Electric Vehicles and Modern Power Ratings</h3>
          <p className="text-gray-700 mb-4">
            Electric vehicles (EVs) are changing how we think about power:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>kW vs HP:</strong> EVs are typically rated in kilowatts (75 kW = 100 hp), though manufacturers often provide HP equivalents</li>
            <li><strong>Instant Torque:</strong> Electric motors produce maximum torque from 0 RPM, eliminating turbo lag and providing immediate acceleration</li>
            <li><strong>Continuous vs Peak:</strong> EV motors have continuous and peak power ratings - peak can be 2-3× continuous</li>
            <li><strong>Thermal Management:</strong> Extended high-power use can cause overheating, reducing available power until cooling</li>
            <li><strong>Combined Output:</strong> Multi-motor EVs (dual or tri-motor) add outputs for total system power</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6 rounded-r-lg">
            <h5 className="font-semibold text-gray-900 mb-2">EV Example: Tesla Model S Plaid</h5>
            <p className="text-gray-700">
              Three motors producing a combined 1,020 hp (761 kW) with instant torque delivery. Peak power available from standstill, 
              providing 0-60 mph in under 2 seconds. This demonstrates how EVs can achieve supercar performance with relatively compact 
              motors compared to combustion engines of similar power.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resources and Further Reading</h3>
          <p className="text-gray-700 mb-4">
            For official standards and detailed technical information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a 
                href="https://www.sae.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                SAE International
              </a>
              {' '}- Standards for engine power rating and testing (SAE J1349, J1995)
            </li>
            <li>
              <a 
                href="https://www.nist.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                National Institute of Standards and Technology (NIST)
              </a>
              {' '}- Official SI unit definitions and conversions
            </li>
            <li>
              <a 
                href="https://www.epa.gov/greenvehicles" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                EPA Green Vehicle Guide
              </a>
              {' '}- Vehicle power ratings and efficiency information
            </li>
          </ul>
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
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate speed, distance, and time</p>
          </a>
          
          <a 
            href="/tire-size-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="font-semibold text-gray-900">Tire Size Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Compare tire sizes and dimensions</p>
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

