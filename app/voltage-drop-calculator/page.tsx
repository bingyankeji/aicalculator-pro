import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import VoltageDropCalculator from '@/components/Calculator/VoltageDropCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Voltage Drop Calculator - Wire Size & Circuit Analysis | AICalculator',
  description: 'Free voltage drop calculator for electrical circuits. Calculate voltage drop for single-phase and three-phase systems. Wire gauge selection, NEC compliance check, and power loss analysis.',
  keywords: [
    'voltage drop calculator',
    'wire size calculator',
    'electrical calculator',
    'voltage drop formula',
    'cable size calculator',
    'AWG calculator',
    'wire gauge calculator',
    'electrical wire calculator',
    'voltage drop chart',
    'NEC voltage drop',
    'conductor size calculator',
    'electrical circuit calculator',
    'voltage drop calculation',
    'wire sizing calculator',
    'electrical design calculator',
    '3 phase voltage drop',
    'single phase voltage drop',
    'copper wire calculator',
    'aluminum wire calculator',
    'electrical engineering calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Voltage Drop Calculator - Wire Size & Circuit Analysis',
    description: 'Calculate voltage drop for electrical circuits. Supports single-phase and three-phase systems with comprehensive wire gauge analysis.',
    type: 'website',
    url: getUrl('/voltage-drop-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('voltage-drop'),
      width: 1200,
      height: 630,
      alt: 'Voltage Drop Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voltage Drop Calculator - Wire Size & Circuit Analysis',
    description: 'Calculate voltage drop for electrical circuits. Supports single-phase and three-phase systems with comprehensive wire gauge analysis.',
    images: [getOgImage('voltage-drop')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/voltage-drop-calculator'),
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

export default function VoltageDropCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/voltage-drop-calculator'),
        name: 'Voltage Drop Calculator',
        url: getUrl('/voltage-drop-calculator'),
        description: 'Professional voltage drop calculator for electrical circuits. Calculate voltage drop, wire sizing, and power loss for single-phase and three-phase systems. NEC compliance checking and wire gauge comparison.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Single-phase and three-phase calculations',
          'Wire gauge (AWG) and metric sizing',
          'Copper and aluminum conductors',
          'NEC compliance checking',
          'Voltage drop curves',
          'Wire gauge comparison table',
          'Power loss calculation',
          'Real-time recommendations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/voltage-drop-calculator'),
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
            name: 'Voltage Drop Calculator',
            item: getUrl('/voltage-drop-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/voltage-drop-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you calculate voltage drop in a circuit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Voltage drop is calculated using Ohm\'s Law: Voltage Drop = Current × Resistance. For single-phase circuits, multiply current by total resistance (round-trip wire length × resistance per unit length × 2). For three-phase circuits, use: Voltage Drop = √3 × Current × Resistance × Power Factor. Total resistance depends on wire gauge (AWG or mm²), conductor material (copper or aluminum), and cable length. For example, a 100-foot run of 12 AWG copper wire carrying 15A has resistance of approximately 0.386Ω (round trip), resulting in voltage drop of 15A × 0.386Ω = 5.79V. At 120V system voltage, this represents 4.83% voltage drop.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the acceptable voltage drop percentage according to NEC?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The National Electrical Code (NEC) recommends maximum 3% voltage drop for branch circuits and 5% total for combined feeder and branch circuits. NEC Article 210.19(A) and 215.2(A)(1) provide these guidelines. For optimal performance, keep voltage drop below 2%. Excessive voltage drop causes equipment underperformance, overheating, reduced motor efficiency, dimming lights, and potential safety hazards. For critical loads like medical equipment or data centers, stricter limits (1-2%) are recommended. European standards (IEC 60364-5-52) typically limit voltage drop to 3% for lighting and 5% for other uses. Always verify local electrical codes as requirements vary by jurisdiction and application.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does wire gauge affect voltage drop?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Larger wire gauges (lower AWG numbers) have lower resistance and therefore less voltage drop. Each increase of 3 AWG numbers approximately doubles resistance. For example, 14 AWG copper has 3.07 Ω per 1000 feet, while 12 AWG has 1.93 Ω and 10 AWG has 1.21 Ω. In a 100-foot circuit carrying 15A: 14 AWG produces 9.2V drop (7.7%), 12 AWG produces 5.8V drop (4.8%), and 10 AWG produces 3.6V drop (3.0%). Using larger wire reduces voltage drop but increases material cost. Proper wire sizing balances performance requirements, code compliance, and cost. For long runs or high currents, the reduced energy loss from larger wire often justifies higher initial cost through energy savings over time.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between copper and aluminum wire for voltage drop?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Aluminum wire has approximately 1.64 times higher resistance than copper of the same size, resulting in greater voltage drop. For example, 12 AWG copper has resistance of 1.93 Ω per 1000 feet, while 12 AWG aluminum has 3.18 Ω. To achieve equivalent performance to copper, aluminum wire must be two gauges larger: use 10 AWG aluminum instead of 12 AWG copper. Advantages of aluminum: lighter weight (70% less than copper), lower material cost (typically 30-50% cheaper). Disadvantages: requires special connectors and termination methods (aluminum-rated devices, anti-oxidant compound), greater expansion/contraction with temperature changes, and NEC restrictions for residential branch circuits. Aluminum is commonly used for service entrance conductors, large feeders, and overhead transmission lines where cost and weight savings are significant.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you calculate voltage drop for three-phase circuits?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Three-phase voltage drop formula is: Voltage Drop = √3 × Current × Resistance × Power Factor, where √3 ≈ 1.732. This accounts for the phase relationship in three-phase systems. For balanced three-phase loads, voltage drop is measured line-to-line. Example: 200A three-phase load, 150 feet of 3/0 AWG copper (0.0766 Ω per 1000 ft), 480V system, 0.85 power factor. Resistance = (0.0766 ÷ 1000) × 150 × 2 = 0.023Ω. Voltage drop = 1.732 × 200A × 0.023Ω × 0.85 = 6.78V or 1.41%. Power factor significantly affects three-phase voltage drop. Inductive loads (motors, transformers) typically have power factors of 0.7-0.9. Resistive loads (heaters) have power factor of 1.0. Lower power factor increases apparent current and voltage drop.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the consequences of excessive voltage drop?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Excessive voltage drop causes multiple problems: Equipment performance - motors run slower, produce less torque, draw higher current, and overheat; lights dim significantly, especially when loads start. Energy efficiency - equipment operates less efficiently, wasting energy as heat; motors can draw 10-20% more current with 5% voltage drop. Equipment damage - prolonged operation at reduced voltage shortens equipment lifespan; motors and transformers overheat; electronic devices may malfunction or fail. Safety concerns - overheating wires increase fire risk; inadequate voltage may prevent proper operation of safety devices. Economic impact - higher energy bills from inefficient operation; premature equipment replacement costs; production losses in commercial/industrial settings. Solutions include using larger wire gauge, reducing circuit length, splitting loads across multiple circuits, or increasing system voltage for long distances.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/voltage-drop-calculator'),
        name: 'How to Calculate Voltage Drop and Select Proper Wire Size',
        description: 'Learn how to calculate voltage drop, select appropriate wire gauge, and ensure electrical circuit compliance with NEC standards.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Voltage Drop Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Circuit Type',
            text: 'Choose between single-phase (1φ) and three-phase (3φ) circuit. Single-phase is common for residential 120V/240V circuits. Three-phase is used for commercial and industrial applications with 208V, 240V, 277V, or 480V systems.',
            url: getStepUrl('/voltage-drop-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter System Voltage',
            text: 'Input the nominal system voltage: 120V, 208V, 240V, 277V, 480V, or custom voltage. This is the voltage at the source (panel or transformer) before voltage drop occurs.',
            url: getStepUrl('/voltage-drop-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Specify Load Current or Power',
            text: 'Enter either load current in amperes (A) or load power in watts (W). If entering power, also specify power factor (default 1.0 for resistive loads, 0.7-0.9 for inductive loads like motors). The calculator will compute current if needed.',
            url: getStepUrl('/voltage-drop-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter One-Way Distance',
            text: 'Input the one-way distance from source to load in feet or meters. This is the physical length of the circuit run. The calculator automatically accounts for round-trip (both conductors) in voltage drop calculation.',
            url: getStepUrl('/voltage-drop-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Select Wire Gauge and Material',
            text: 'Choose wire gauge (AWG or kcmil) and conductor material (copper or aluminum). Consider NEC ampacity requirements in addition to voltage drop. Aluminum requires two gauges larger than copper for equivalent performance.',
            url: getStepUrl('/voltage-drop-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Analyze Results and Recommendations',
            text: 'Review voltage drop (volts and percentage), end voltage at load, conductor resistance, and power loss. Check status: Excellent (≤2%), Good (≤3%), Warning (≤5%), or Critical (>5%). Use wire comparison table to select optimal wire size balancing performance and cost.',
            url: getStepUrl('/voltage-drop-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/voltage-drop-calculator'),
        headline: 'Complete Guide to Voltage Drop Calculation: Formulas, Wire Sizing, and NEC Compliance',
        description: 'Comprehensive guide to calculating voltage drop in electrical circuits, selecting proper wire gauge, and ensuring compliance with electrical codes.',
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
        image: getOgImage('voltage-drop'),
        articleBody: 'Learn how to calculate voltage drop for electrical circuits, select appropriate wire gauge, and ensure compliance with NEC standards for safe and efficient electrical installations.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Voltage Drop Calculator - Wire Size & Circuit Analysis</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Voltage Drop Calculator"
        calculatorUrl="/voltage-drop-calculator"
      />

      {/* Calculator Component */}
      <VoltageDropCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Voltage Drop in Electrical Circuits</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate voltage drop for any electrical circuit with our free calculator. Supports single-phase and three-phase systems, copper and aluminum conductors, and provides NEC compliance checking. Essential for electricians, engineers, and electrical contractors.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Voltage Drop?</h3>
          <p className="text-gray-700 mb-4">
            Voltage drop is the reduction in electrical potential (voltage) as current flows through conductors from source to load. All electrical conductors have resistance, and when current flows, energy is lost as heat according to Ohm's Law: V = I × R. This lost voltage means less voltage is available at the load, potentially causing equipment underperformance, energy waste, and safety concerns.
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> A 120V circuit with 5V voltage drop delivers only 115V to the load—a 4.17% reduction. For sensitive equipment or motors, this reduced voltage significantly impacts performance and efficiency. The National Electrical Code (NEC) provides guidelines to limit voltage drop and ensure proper equipment operation.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Basic Voltage Drop Formulas</h4>
            
            <div className="space-y-4">
              <div>
                <p className="font-mono text-lg text-blue-700 mb-2">Single-Phase: V<sub>drop</sub> = 2 × I × R × L</p>
                <p className="text-sm text-gray-700">Where: I = current (A), R = resistance (Ω per unit length), L = one-way length</p>
                <p className="text-sm text-gray-700">Factor of 2 accounts for both conductors (hot and neutral)</p>
              </div>
              
              <div>
                <p className="font-mono text-lg text-green-700 mb-2">Three-Phase: V<sub>drop</sub> = √3 × I × R × L × PF</p>
                <p className="text-sm text-gray-700">Where: √3 ≈ 1.732, PF = power factor (typically 0.7-1.0)</p>
                <p className="text-sm text-gray-700">Applied to line-to-line voltage for balanced loads</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">NEC Voltage Drop Standards</h3>
          <p className="text-gray-700 mb-4">
            The National Electrical Code (NEC) provides voltage drop recommendations in Articles 210.19(A) for branch circuits and 215.2(A)(1) for feeders. While not strict requirements for most applications, these guidelines ensure optimal system performance:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Circuit Type</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">Recommended Max</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Performance Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-green-50">
                  <td className="px-4 py-3">Excellent (≤2%)</td>
                  <td className="px-4 py-3 text-center font-bold text-green-700">≤2%</td>
                  <td className="px-4 py-3 text-sm">Optimal performance, minimal efficiency loss</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="px-4 py-3">Good (Branch Circuit)</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-700">≤3%</td>
                  <td className="px-4 py-3 text-sm">NEC recommended for branch circuits</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="px-4 py-3">Warning (Total)</td>
                  <td className="px-4 py-3 text-center font-bold text-amber-700">≤5%</td>
                  <td className="px-4 py-3 text-sm">NEC maximum (feeder + branch combined)</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-4 py-3">Critical</td>
                  <td className="px-4 py-3 text-center font-bold text-red-700">>5%</td>
                  <td className="px-4 py-3 text-sm">Exceeds NEC guidelines, likely problems</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Special considerations:</strong> Critical loads (life safety, emergency systems, data centers) often require stricter limits of 1-2%. European standards (IEC 60364-5-52) typically allow 3% for lighting circuits and 5% for other uses. Always consult local electrical codes and project specifications for specific requirements.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Wire Gauge and Resistance</h3>
          <p className="text-gray-700 mb-4">
            Wire gauge (AWG - American Wire Gauge) inversely relates to wire diameter: smaller AWG numbers indicate larger wire with lower resistance. Each 3-step increase in AWG approximately doubles resistance. Wire resistance depends on material (copper or aluminum), temperature, and cross-sectional area.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">AWG</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">mm²</th>
                  <th className="px-4 py-3 text-right font-semibold border-b">Copper (Ω/1000ft)</th>
                  <th className="px-4 py-3 text-right font-semibold border-b">Aluminum (Ω/1000ft)</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Typical Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">14</td>
                  <td className="px-4 py-3 text-center">2.08</td>
                  <td className="px-4 py-3 text-right">3.07</td>
                  <td className="px-4 py-3 text-right">5.06</td>
                  <td className="px-4 py-3 text-sm">15A circuits, lighting</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">12</td>
                  <td className="px-4 py-3 text-center">3.31</td>
                  <td className="px-4 py-3 text-right">1.93</td>
                  <td className="px-4 py-3 text-right">3.18</td>
                  <td className="px-4 py-3 text-sm">20A circuits, receptacles</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">10</td>
                  <td className="px-4 py-3 text-center">5.26</td>
                  <td className="px-4 py-3 text-right">1.21</td>
                  <td className="px-4 py-3 text-right">1.99</td>
                  <td className="px-4 py-3 text-sm">30A circuits, dryers, AC</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">8</td>
                  <td className="px-4 py-3 text-center">8.37</td>
                  <td className="px-4 py-3 text-right">0.764</td>
                  <td className="px-4 py-3 text-right">1.26</td>
                  <td className="px-4 py-3 text-sm">40-50A, ranges, heat pumps</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">6</td>
                  <td className="px-4 py-3 text-center">13.3</td>
                  <td className="px-4 py-3 text-right">0.491</td>
                  <td className="px-4 py-3 text-right">0.808</td>
                  <td className="px-4 py-3 text-sm">55-65A, sub-panels</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3 text-center">21.2</td>
                  <td className="px-4 py-3 text-right">0.308</td>
                  <td className="px-4 py-3 text-right">0.508</td>
                  <td className="px-4 py-3 text-sm">70-85A feeders</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">2</td>
                  <td className="px-4 py-3 text-center">33.6</td>
                  <td className="px-4 py-3 text-right">0.194</td>
                  <td className="px-4 py-3 text-right">0.319</td>
                  <td className="px-4 py-3 text-sm">95-115A feeders</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">1/0</td>
                  <td className="px-4 py-3 text-center">53.5</td>
                  <td className="px-4 py-3 text-right">0.122</td>
                  <td className="px-4 py-3 text-right">0.201</td>
                  <td className="px-4 py-3 text-sm">150A service entrance</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">4/0</td>
                  <td className="px-4 py-3 text-center">107</td>
                  <td className="px-4 py-3 text-right">0.0608</td>
                  <td className="px-4 py-3 text-right">0.100</td>
                  <td className="px-4 py-3 text-sm">200A+ service</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Note:</strong> Resistance values shown are at 75°C (167°F), which is standard for insulated conductors in conduit. Temperature affects resistance: copper increases approximately 0.4% per °C above 20°C reference temperature.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Copper vs Aluminum Conductors</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Copper Advantages</h4>
              <ul className="text-sm text-blue-900 space-y-1 list-disc ml-5">
                <li>Lower resistance (better conductivity)</li>
                <li>More ductile and easier to work with</li>
                <li>Less expansion/contraction with temperature</li>
                <li>Standard termination methods</li>
                <li>Longer service life in most applications</li>
                <li>Smaller wire size for same ampacity</li>
              </ul>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Aluminum Advantages</h4>
              <ul className="text-sm text-green-900 space-y-1 list-disc ml-5">
                <li>Lower material cost (30-50% savings)</li>
                <li>Lighter weight (70% less than copper)</li>
                <li>Easier to handle for large sizes</li>
                <li>Good for overhead and long runs</li>
                <li>Common for service entrance conductors</li>
                <li>Abundant and sustainable resource</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Aluminum considerations:</strong> Requires special treatment due to higher resistance and tendency to oxidize. Use aluminum-rated devices (marked AL or CU-AL), apply anti-oxidant compound at terminations, and upsize by two AWG gauges compared to copper (use 10 AWG aluminum instead of 12 AWG copper). NEC Article 310.106 prohibits aluminum smaller than 12 AWG for residential branch circuits. Proper installation is critical to prevent loose connections and fire hazards.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Practical Calculation Examples</h3>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <h4 className="font-semibold text-blue-900 mb-3">Example 1: Residential 120V Circuit</h4>
            <p className="text-sm text-blue-900 mb-2"><strong>Scenario:</strong> 15A lighting circuit, 120V, 80 feet to farthest fixture, 14 AWG copper wire</p>
            <p className="text-sm text-blue-900 mb-2"><strong>Calculation:</strong></p>
            <ul className="text-sm text-blue-900 list-disc ml-5 space-y-1 mb-2">
              <li>Resistance: 14 AWG copper = 3.07 Ω per 1000 ft</li>
              <li>Round-trip resistance: (3.07 ÷ 1000) × 80 × 2 = 0.491 Ω</li>
              <li>Voltage drop: 15A × 0.491Ω = 7.37V</li>
              <li>Percentage: (7.37V ÷ 120V) × 100% = 6.14%</li>
            </ul>
            <p className="text-sm font-bold text-red-700">Result: Critical! Exceeds 5% NEC maximum. Upgrade to 12 AWG (3.7%) or 10 AWG (2.3%).</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
            <h4 className="font-semibold text-green-900 mb-3">Example 2: Three-Phase Motor Circuit</h4>
            <p className="text-sm text-green-900 mb-2"><strong>Scenario:</strong> 50HP motor at 480V 3-phase, 200 feet, power factor 0.85, 8 AWG copper</p>
            <p className="text-sm text-green-900 mb-2"><strong>Calculation:</strong></p>
            <ul className="text-sm text-green-900 list-disc ml-5 space-y-1 mb-2">
              <li>Motor current: 50HP × 746W/HP ÷ (1.732 × 480V × 0.85) = 52.8A</li>
              <li>Resistance: (0.764 ÷ 1000) × 200 × 2 = 0.306Ω</li>
              <li>Voltage drop: 1.732 × 52.8A × 0.306Ω × 0.85 = 23.8V</li>
              <li>Percentage: (23.8V ÷ 480V) × 100% = 4.96%</li>
            </ul>
            <p className="text-sm font-bold text-amber-700">Result: Warning - just under 5% maximum. Consider 6 AWG (3.1%) for better motor performance.</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Consequences of Excessive Voltage Drop</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Motors:</strong> Reduced torque, lower speed, overheating, higher current draw, shortened lifespan. 5% voltage drop can increase motor current by 10-15%.</li>
            <li><strong>Lighting:</strong> Noticeable dimming, reduced light output, possible flickering, shorter bulb life. Incandescent lights are particularly sensitive.</li>
            <li><strong>Electronics:</strong> Malfunction, improper operation, reduced performance, potential damage to sensitive equipment.</li>
            <li><strong>Heating elements:</strong> Reduced heat output proportional to voltage squared (5% voltage drop = 10% heat reduction).</li>
            <li><strong>Energy waste:</strong> Power loss in conductors as heat: P<sub>loss</sub> = I² × R. This represents wasted energy and increased operating costs.</li>
            <li><strong>Safety concerns:</strong> Overheating conductors, inadequate operation of protective devices, fire risk from undersized wiring.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Solutions to Reduce Voltage Drop</h3>
          
          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">1. Increase Wire Size</h4>
              <p className="text-sm text-gray-700">Most common solution. Larger wire has lower resistance. Increasing by one AWG gauge reduces voltage drop by approximately 20-25%. Balance initial cost against long-term energy savings and performance benefits.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">2. Reduce Circuit Length</h4>
              <p className="text-sm text-gray-700">Relocate power source closer to load, eliminate unnecessary bends or indirect routing. Each 10% reduction in length provides 10% reduction in voltage drop. Consider multiple branch circuits instead of one long run.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">3. Increase System Voltage</h4>
              <p className="text-sm text-gray-700">For same power, higher voltage means lower current, reducing voltage drop. 240V single-phase has half the current of 120V for same load. 480V three-phase is standard for large motors and industrial equipment.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">4. Use Copper Instead of Aluminum</h4>
              <p className="text-sm text-gray-700">Copper has 39% lower resistance than aluminum for same size. However, copper costs more. For new installations, copper is often worth the premium for better performance and easier installation.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">5. Split the Load</h4>
              <p className="text-sm text-gray-700">Divide large loads across multiple circuits. Each circuit carries less current, reducing voltage drop. Also provides redundancy and better load balancing.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on voltage drop and electrical code requirements:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                National Electrical Code (NEC)
              </a> - Official electrical code for the United States
            </li>
            <li>
              <a href="https://www.nema.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                NEMA (National Electrical Manufacturers Association)
              </a> - Standards and technical information
            </li>
            <li>
              <a href="https://www.copper.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Copper Development Association
              </a> - Wire sizing guides and technical resources
            </li>
            <li>
              <a href="https://www.ieee.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                IEEE (Institute of Electrical and Electronics Engineers)
              </a> - Electrical engineering standards and publications
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/ohms-law-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Ohms Law Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate voltage, current, resistance, power</p>
          </a>
          
          <a 
            href="/resistor-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔌</div>
            <h3 className="font-semibold text-gray-900">Resistor Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Color code decoder and resistance calculator</p>
          </a>
          
          <a 
            href="/electricity-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-semibold text-gray-900">Electricity Cost Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate energy cost and consumption</p>
          </a>
          
          <a 
            href="/power-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚙️</div>
            <h3 className="font-semibold text-gray-900">Power Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Electrical power calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}

