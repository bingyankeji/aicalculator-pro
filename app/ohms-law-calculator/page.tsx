import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import OhmsLawCalculator from '@/components/Calculator/OhmsLawCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Ohm's Law Calculator - Calculate Voltage, Current, Resistance & Power | AICalculator",
  description: "Free Ohm's Law calculator to find voltage, current, resistance, and power. Enter any 2 values to calculate the other 2. Includes formulas, circuit diagrams, and practical examples.",
  keywords: [
    "ohms law calculator",
    "ohm's law",
    "voltage calculator",
    "current calculator",
    "resistance calculator",
    "power calculator",
    "electrical calculator",
    "circuit calculator",
    "V=IR calculator",
    "electricity calculator",
    "ohm calculator",
    "electrical resistance",
    "electrical power",
    "voltage current resistance",
    "electrical formulas",
    "electronics calculator",
    "electrical engineering",
    "circuit analysis",
    "ohms law formula",
    "V I R P calculator",
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Ohm's Law Calculator - Calculate V, I, R, P Instantly",
    description: "Calculate voltage, current, resistance, and power using Ohm's Law. Enter any 2 values to find the others. Includes formulas, examples, and V-I curves.",
    type: 'website',
    url: getUrl('/ohms-law-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('ohms-law'),
      width: 1200,
      height: 630,
      alt: "Ohm's Law Calculator"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ohm's Law Calculator - V, I, R, P Calculator",
    description: "Calculate voltage, current, resistance, and power using Ohm's Law. Enter any 2 values instantly.",
    images: [getOgImage('ohms-law')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/ohms-law-calculator'),
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

export default function OhmsLawCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/ohms-law-calculator'),
        name: "Ohm's Law Calculator",
        url: getUrl('/ohms-law-calculator'),
        description: "Free online calculator that uses Ohm's Law to calculate voltage, current, resistance, and power. Enter any 2 values to find the other 2 values instantly.",
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate any parameter: V, I, R, or P',
          'Interactive circuit diagram',
          'All 12 Ohm\'s Law formulas',
          'V-I characteristic curves',
          'Power safety warnings',
          'Recommended resistor ratings',
          'Real-world application examples',
          'Multiple unit conversions',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/ohms-law-calculator'),
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
            name: "Ohm's Law Calculator",
            item: getUrl('/ohms-law-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/ohms-law-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: "What is Ohm's Law and how does it work?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Ohm's Law is a fundamental principle in electrical engineering that describes the relationship between voltage (V), current (I), and resistance (R): V = I × R. It states that the current through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to the resistance. This law also extends to power calculations: P = V × I. You can use any two known values to calculate the other two. For example, if you know voltage (12V) and resistance (6Ω), current is I = 12V / 6Ω = 2A, and power is P = 12V × 2A = 24W.",
            },
          },
          {
            '@type': 'Question',
            name: "How do I use the Ohm's Law calculator?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Using the Ohm's Law calculator is simple: 1) Enter any TWO known values (voltage, current, resistance, or power) into their respective fields. 2) Leave the unknown fields empty. 3) Click 'Calculate' to instantly compute the remaining two values. For example, enter 12V for voltage and 2A for current, and the calculator will automatically determine resistance (6Ω) and power (24W). The calculator also displays which formulas were used and provides a visual circuit diagram showing the relationships between V, I, and R.",
            },
          },
          {
            '@type': 'Question',
            name: "What are all the Ohm's Law formulas?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Ohm's Law includes 12 essential formulas: For Voltage: V = I × R, V = P / I, V = √(P × R). For Current: I = V / R, I = P / V, I = √(P / R). For Resistance: R = V / I, R = V² / P, R = P / I². For Power: P = V × I, P = V² / R, P = I² × R. These formulas allow you to calculate any parameter when you know two others. The calculator automatically selects the appropriate formula based on your inputs and shows which formula was used for each calculation.",
            },
          },
          {
            '@type': 'Question',
            name: "How do I calculate power dissipation in a resistor?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Power dissipation in a resistor can be calculated using three formulas: P = V × I (if you know voltage and current), P = V² / R (if you know voltage and resistance), or P = I² × R (if you know current and resistance). For safety, always use a resistor rated at least 2× the calculated power. For example, if your calculation shows 0.3W dissipation, use a 1W resistor (not 0.5W) to ensure safe continuous operation with margin for temperature variations. Common resistor ratings are 1/8W (0.125W), 1/4W (0.25W), 1/2W (0.5W), 1W, and 2W.",
            },
          },
          {
            '@type': 'Question',
            name: "What is the relationship between voltage and current?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Voltage and current have a linear relationship through resistance, as defined by Ohm's Law: I = V / R. This means current is directly proportional to voltage when resistance is constant. If you double the voltage across a resistor, the current also doubles. For example, at 5V with 10Ω resistance, current is 0.5A. At 10V with the same 10Ω resistance, current increases to 1A. This linear relationship is shown in the V-I characteristic curve, which is a straight line through the origin with slope equal to 1/R (conductance).",
            },
          },
          {
            '@type': 'Question',
            name: "When do I need to consider power ratings in electrical circuits?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Power ratings are critical whenever current flows through resistance, as power is dissipated as heat. Always calculate power using P = I² × R, P = V² / R, or P = V × I, then use a component rated at least 2× this value for safety. Exceeding power ratings causes overheating, component failure, or fire hazards. For example, a 1/4W resistor handling 0.3W will overheat and fail. Common applications requiring power calculation include LED current-limiting resistors, voltage dividers, motor circuits, heating elements, and power supplies. Higher ambient temperatures, poor ventilation, or continuous operation require additional derating (30-50%).",
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/ohms-law-calculator'),
        name: "How to Use Ohm's Law Calculator",
        description: "Learn how to calculate voltage, current, resistance, and power using Ohm's Law with step-by-step instructions.",
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: "Ohm's Law Calculator",
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Identify Known Values',
            text: 'Determine which two electrical parameters you know. You can work with any combination of voltage (V), current (I), resistance (R), or power (P). For example, you might know voltage (12V) and resistance (6Ω), or current (2A) and power (24W).',
            url: getStepUrl('/ohms-law-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter First Known Value',
            text: 'Enter your first known value into the appropriate field. For voltage, enter the value in volts (V). For current, enter in amperes (A). For resistance, enter in ohms (Ω). For power, enter in watts (W). The calculator accepts decimal values for precision.',
            url: getStepUrl('/ohms-law-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Second Known Value',
            text: 'Enter your second known value into its corresponding field. Leave the two unknown fields empty. The calculator requires exactly two input values to solve for the other two parameters.',
            url: getStepUrl('/ohms-law-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Results',
            text: 'Click the "Calculate" button. The calculator instantly computes all four parameters using the appropriate Ohm\'s Law formulas. Results show voltage, current, resistance, and power with the formulas used for each calculation.',
            url: getStepUrl('/ohms-law-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Circuit Diagram',
            text: 'Examine the interactive circuit diagram showing the relationship between V, I, and R in a simple circuit. The diagram helps visualize how voltage drives current through resistance.',
            url: getStepUrl('/ohms-law-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Check Power Safety Warning',
            text: 'Review the power safety warning and recommended resistor rating. The calculator applies a 2× safety factor to ensure you select a component that can safely handle the power dissipation without overheating.',
            url: getStepUrl('/ohms-law-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/ohms-law-calculator'),
        headline: "Complete Guide to Ohm's Law and Electrical Calculations",
        description: "Comprehensive guide to understanding Ohm's Law, calculating voltage, current, resistance, and power, with practical examples and applications.",
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
        dateModified: '2024-11-19',
        image: getOgImage('ohms-law'),
        articleBody: "Learn how to use Ohm's Law to calculate voltage, current, resistance, and power in electrical circuits, with formulas, examples, and practical applications.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Ohm's Law Calculator - Calculate Voltage, Current, Resistance & Power</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Ohm's Law Calculator"
        calculatorUrl="/ohms-law-calculator"
      />

      {/* Calculator Component */}
      <OhmsLawCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Ohm's Law</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Ohm's Law is the fundamental relationship between voltage (V), current (I), resistance (R), and power (P) in electrical circuits. Use this calculator to find any parameter when you know two others. Perfect for electronics design, circuit analysis, and electrical engineering.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Ohm's Law?</h3>
          <p className="text-gray-700 mb-4">
            Ohm's Law, discovered by German physicist Georg Ohm in 1827, is one of the most fundamental principles in electrical engineering and physics. It describes the mathematical relationship between voltage, current, and resistance in an electrical circuit. The law states that the current flowing through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to the resistance between them.
          </p>
          <p className="text-gray-700 mb-4">
            The basic formula is <strong>V = I × R</strong>, where V is voltage in volts (V), I is current in amperes (A), and R is resistance in ohms (Ω). This simple yet powerful equation allows engineers and technicians to design circuits, troubleshoot problems, and ensure electrical safety. Understanding Ohm's Law is essential for anyone working with electronics, from hobbyists building their first LED circuit to professional engineers designing complex power systems.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Complete Ohm's Law Formula Set</h3>
          <p className="text-gray-700 mb-4">
            While V = I × R is the foundational formula, Ohm's Law extends to 12 formulas that relate voltage, current, resistance, and power. By algebraic manipulation and incorporating power calculations (P = V × I), you can derive all parameters from any two known values:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-3">Voltage (V) Formulas</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li className="text-blue-700"><strong>V = I × R</strong> (from current and resistance)</li>
                <li className="text-blue-700"><strong>V = P / I</strong> (from power and current)</li>
                <li className="text-blue-700"><strong>V = √(P × R)</strong> (from power and resistance)</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-3">Current (I) Formulas</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li className="text-green-700"><strong>I = V / R</strong> (from voltage and resistance)</li>
                <li className="text-green-700"><strong>I = P / V</strong> (from power and voltage)</li>
                <li className="text-green-700"><strong>I = √(P / R)</strong> (from power and resistance)</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-900 mb-3">Resistance (R) Formulas</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li className="text-orange-700"><strong>R = V / I</strong> (from voltage and current)</li>
                <li className="text-orange-700"><strong>R = V² / P</strong> (from voltage and power)</li>
                <li className="text-orange-700"><strong>R = P / I²</strong> (from power and current)</li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-900 mb-3">Power (P) Formulas</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li className="text-red-700"><strong>P = V × I</strong> (from voltage and current)</li>
                <li className="text-red-700"><strong>P = V² / R</strong> (from voltage and resistance)</li>
                <li className="text-red-700"><strong>P = I² × R</strong> (from current and resistance)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Practical Applications</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. LED Current Limiting Resistors</h4>
          <p className="text-gray-700 mb-4">
            One of the most common applications of Ohm's Law is calculating current-limiting resistors for LEDs. LEDs require a specific forward current (typically 10-20mA) and have a forward voltage drop (typically 1.8-3.3V depending on color). To calculate the required resistor:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Connect a red LED (V<sub>f</sub> = 2V, I<sub>f</sub> = 20mA) to a 5V power supply:<br />
            Step 1: Calculate voltage across resistor: V<sub>R</sub> = 5V - 2V = 3V<br />
            Step 2: Calculate resistance: R = V<sub>R</sub> / I = 3V / 0.02A = 150Ω<br />
            Step 3: Calculate power: P = I² × R = (0.02A)² × 150Ω = 0.06W<br />
            <strong>Result:</strong> Use a 150Ω or 180Ω (next standard value) 1/4W resistor.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Power Calculation for Heaters</h4>
          <p className="text-gray-700 mb-4">
            Electric heaters convert electrical energy to heat, and their power rating determines how much heat they produce. Understanding power calculations helps select appropriate heaters and circuit breakers:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> A 1500W space heater on 120V circuit:<br />
            Step 1: Calculate current: I = P / V = 1500W / 120V = 12.5A<br />
            Step 2: Calculate resistance: R = V / I = 120V / 12.5A = 9.6Ω<br />
            <strong>Safety Note:</strong> This heater requires a 15A circuit breaker minimum (20A recommended) and 14 AWG or thicker wire. Never connect to a circuit with other high-power devices.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Voltage Divider Circuits</h4>
          <p className="text-gray-700 mb-4">
            Voltage dividers use two resistors in series to create a lower voltage from a higher voltage source. They're commonly used in sensor circuits, reference voltages, and signal conditioning:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Create 3.3V from 5V for a microcontroller:<br />
            Step 1: Choose R1 = 1kΩ, calculate R2 for V<sub>out</sub> = 3.3V<br />
            Step 2: V<sub>out</sub> = V<sub>in</sub> × (R2 / (R1 + R2))<br />
            Step 3: 3.3V = 5V × (R2 / (1kΩ + R2)) → R2 ≈ 1.94kΩ (use 2kΩ)<br />
            Step 4: Calculate current: I = 5V / (1kΩ + 2kΩ) = 1.67mA<br />
            Step 5: Power in each resistor: P<sub>R1</sub> = I² × R1 = 0.0028W, P<sub>R2</sub> = I² × R2 = 0.0056W<br />
            <strong>Result:</strong> Use 1kΩ and 2kΩ 1/8W resistors. Actual output: 3.33V.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Motor Current Draw Analysis</h4>
          <p className="text-gray-700 mb-4">
            DC motors have internal resistance and draw current proportional to their mechanical load. Understanding motor power helps size power supplies and protection circuits:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> 12V DC motor rated at 2A (24W):<br />
            Step 1: Internal resistance: R = V / I = 12V / 2A = 6Ω<br />
            Step 2: At 50% load (1A): V<sub>drop</sub> = I × R = 1A × 6Ω = 6V<br />
            Step 3: Power at 50% load: P = V × I = 12V × 1A = 12W<br />
            <strong>Design Note:</strong> Power supply must provide 12V with at least 2.5A capacity (25% headroom). Use 3A fuse for overcurrent protection.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Power Dissipation and Component Safety</h3>
          <p className="text-gray-700 mb-4">
            Power dissipation is critical for component reliability and safety. When current flows through resistance, electrical energy converts to heat at a rate of P = I² × R. Exceeding a component's power rating causes overheating, degradation, and failure. Always apply safety factors and consider operating conditions:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Resistor Power Ratings</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>1/8 Watt (0.125W):</strong> Small surface-mount and miniature through-hole resistors. Suitable for signal processing, logic circuits, and low-current applications. Physical size: 2-3mm length. Maximum safe power: 0.06W continuous (50% derating).</li>
            <li><strong>1/4 Watt (0.25W):</strong> Most common size for hobby electronics and general circuits. Suitable for LED drivers (up to 50mA), pullup/pulldown resistors, and voltage dividers. Physical size: 6mm length. Maximum safe power: 0.125W continuous.</li>
            <li><strong>1/2 Watt (0.5W):</strong> Medium-power applications including power supplies, motor circuits, and audio amplifiers. Physical size: 9mm length. Gets noticeably warm at rated power. Maximum safe power: 0.25W continuous.</li>
            <li><strong>1 Watt:</strong> High-power circuits, heaters, and power resistors. Requires adequate spacing and airflow. Physical size: 12mm length. Can reach 100-150°C at rated power. Maximum safe power: 0.5W continuous.</li>
            <li><strong>2 Watt and above:</strong> Specialized power resistors with ceramic or wirewound construction. Used in power electronics, load banks, and braking resistors. Often require heatsinking or forced cooling. Follow datasheet derating curves for temperature.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Power Derating Guidelines</h4>
          <p className="text-gray-700 mb-4">
            <strong>The 50% Rule:</strong> Never operate resistors above 50% of their rated power for continuous use (24/7 operation). For intermittent use, 70% is acceptable. This rule ensures long component life and prevents thermal runaway.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Temperature Derating:</strong> Most resistors are rated at 25°C (77°F) ambient temperature. For every 10°C increase above this, derate power by 10-20% depending on the resistor type. In 40°C environments (common in enclosures), use 60-70% of rated power. In 60°C environments, use only 40-50% of rated power.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Enclosure Derating:</strong> Resistors in enclosed spaces without airflow must be derated by 30-50% because heat cannot dissipate effectively. A 1W resistor in a closed box should be treated as 0.5-0.7W maximum. Use multiple lower-power resistors in parallel or provide forced-air cooling for high-power applications.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Series and Parallel Circuits</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Series Circuits</h4>
          <p className="text-gray-700 mb-4">
            In series circuits, components connect end-to-end, forming a single path for current. The same current flows through all components, but voltage divides among them:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Total Resistance:</strong> R<sub>total</sub> = R1 + R2 + R3 + ... (resistances add directly)</li>
            <li><strong>Same Current:</strong> I<sub>total</sub> = I<sub>R1</sub> = I<sub>R2</sub> = I<sub>R3</sub></li>
            <li><strong>Voltage Division:</strong> V<sub>Rx</sub> = V<sub>total</sub> × (Rx / R<sub>total</sub>)</li>
            <li><strong>Power Division:</strong> Higher resistance dissipates more power: P<sub>Rx</sub> = I² × Rx</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Three resistors in series: 100Ω, 200Ω, 300Ω with 12V supply:<br />
            R<sub>total</sub> = 100 + 200 + 300 = 600Ω<br />
            I<sub>total</sub> = 12V / 600Ω = 0.02A (20mA)<br />
            V<sub>100Ω</sub> = 0.02A × 100Ω = 2V<br />
            V<sub>200Ω</sub> = 0.02A × 200Ω = 4V<br />
            V<sub>300Ω</sub> = 0.02A × 300Ω = 6V (total: 2V + 4V + 6V = 12V ✓)
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Parallel Circuits</h4>
          <p className="text-gray-700 mb-4">
            In parallel circuits, components connect across the same two points, providing multiple paths for current. Voltage is the same across all components, but current divides among them:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Total Resistance:</strong> 1/R<sub>total</sub> = 1/R1 + 1/R2 + 1/R3 + ... (reciprocal sum)</li>
            <li><strong>For Two Resistors:</strong> R<sub>total</sub> = (R1 × R2) / (R1 + R2) (product over sum)</li>
            <li><strong>Same Voltage:</strong> V<sub>R1</sub> = V<sub>R2</sub> = V<sub>R3</sub> = V<sub>total</sub></li>
            <li><strong>Current Division:</strong> I<sub>Rx</sub> = V<sub>total</sub> / Rx (lower resistance takes more current)</li>
          </ul>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Three resistors in parallel: 100Ω, 200Ω, 300Ω with 12V supply:<br />
            1/R<sub>total</sub> = 1/100 + 1/200 + 1/300 = 0.01 + 0.005 + 0.0033 = 0.0183<br />
            R<sub>total</sub> = 1 / 0.0183 ≈ 54.5Ω<br />
            I<sub>100Ω</sub> = 12V / 100Ω = 0.12A (120mA)<br />
            I<sub>200Ω</sub> = 12V / 200Ω = 0.06A (60mA)<br />
            I<sub>300Ω</sub> = 12V / 300Ω = 0.04A (40mA)<br />
            I<sub>total</sub> = 120mA + 60mA + 40mA = 220mA ✓
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Real-World Design Examples</h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">USB Charging Circuit Design</h4>
          <p className="text-gray-700 mb-4">
            USB charging provides 5V at various current levels (500mA for USB 2.0, 900mA for USB 3.0, up to 3A for USB-C). Understanding power and resistance helps design safe charging circuits:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Scenario:</strong> Design a USB-C fast charger (5V, 3A):<br />
            Power delivery: P = 5V × 3A = 15W<br />
            Cable resistance (1 meter, 20 AWG): R<sub>cable</sub> ≈ 0.033Ω<br />
            Voltage drop in cable: V<sub>drop</sub> = 3A × 0.033Ω = 0.099V<br />
            Power loss in cable: P<sub>loss</sub> = 3A² × 0.033Ω = 0.297W<br />
            <strong>Design Decision:</strong> Use 18 AWG or thicker cable (R ≈ 0.021Ω) to reduce voltage drop to 0.063V and power loss to 0.189W, ensuring efficient power transfer and preventing cable heating.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Solar Panel and Battery System</h4>
          <p className="text-gray-700 mb-4">
            Solar systems require careful voltage and current calculations for efficient energy harvesting and battery charging:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Scenario:</strong> 100W solar panel (18V, 5.56A) charging 12V battery:<br />
            Panel power: P = 18V × 5.56A = 100W<br />
            Battery voltage: 12V (nominal), 14.4V (charging)<br />
            Charge current at 14.4V: I = 100W / 14.4V = 6.94A (with ideal MPPT controller)<br />
            Wire sizing (3-meter run): At 7A, use 12 AWG wire (R = 0.0053Ω/ft)<br />
            Voltage drop: V<sub>drop</sub> = 7A × (3m × 3.28ft/m × 2 × 0.0053Ω/ft) = 0.73V<br />
            <strong>Result:</strong> Use 10 AWG wire to reduce drop to 0.46V, ensuring 97% efficiency.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Mistakes and How to Avoid Them</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Ignoring Power Ratings:</strong> A resistor's resistance value alone doesn't determine its suitability. Always calculate power (P = I² × R) and use a resistor rated at least 2× the calculated value. A 100Ω 1/8W resistor will fail at 100mA (1W dissipation), even though the resistance is correct.</li>
            <li><strong>Forgetting Unit Conversions:</strong> Use consistent units: volts (V), amperes (A), ohms (Ω), and watts (W). Common errors include using milliamps (mA) without converting to amperes, or kilohms (kΩ) without converting to ohms. 20mA = 0.02A, 4.7kΩ = 4700Ω.</li>
            <li><strong>Misapplying Formulas:</strong> V = I × R calculates voltage drop across a resistor, not total supply voltage. For LED circuits, subtract LED forward voltage first: R = (V<sub>supply</sub> - V<sub>LED</sub>) / I.</li>
            <li><strong>Not Considering Temperature:</strong> Resistance changes with temperature. Carbon resistors vary ±200-500 ppm/°C, metal film ±50-100 ppm/°C. At high temperatures, power ratings decrease. Always check datasheets for derating curves.</li>
            <li><strong>Overlooking Wire Resistance:</strong> Long wire runs have significant resistance, causing voltage drop: V<sub>drop</sub> = I × R<sub>wire</sub>. Use wire gauge charts to select appropriate wire for current and length. This is critical in 12V automotive systems and low-voltage DC systems where even 0.5V drop is significant.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Advanced Topics</h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Non-Ohmic Devices</h4>
          <p className="text-gray-700 mb-4">
            Ohm's Law applies strictly to ohmic materials where resistance remains constant regardless of voltage or current. However, many devices are non-ohmic, meaning their V-I relationship is non-linear:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Diodes and LEDs:</strong> Exhibit exponential V-I curves. Below forward voltage, essentially no current flows. Above it, current increases rapidly. Cannot use Ohm's Law directly; must use diode equation or datasheet curves.</li>
            <li><strong>Thermistors:</strong> Temperature-sensitive resistors (NTC: resistance decreases with temperature, PTC: resistance increases). Used in temperature sensing and inrush current limiting.</li>
            <li><strong>Light-Dependent Resistors (LDR):</strong> Resistance varies with light intensity, from 1MΩ (dark) to 1kΩ (bright). Used in automatic lighting circuits.</li>
            <li><strong>Tungsten Filaments:</strong> Incandescent bulbs have low cold resistance that increases 10-15× when hot due to positive temperature coefficient. A 100W 120V bulb measures 15-20Ω cold but operates at 144Ω hot.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">AC Circuits and Impedance</h4>
          <p className="text-gray-700 mb-4">
            In alternating current (AC) circuits, resistance is replaced by impedance (Z), which includes resistance (R), inductive reactance (X<sub>L</sub>), and capacitive reactance (X<sub>C</sub>). Ohm's Law extends to: V = I × Z, but calculations involve complex numbers and phase angles. RMS (root mean square) values are used for voltage and current. Standard household AC is 120V RMS at 60Hz (North America) or 230V RMS at 50Hz (Europe).
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Safety Considerations</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Electrical Shock Hazard:</strong> Current through the human body causes injury or death. As little as 10mA can cause painful shock, 30mA can cause loss of muscle control, 100mA can cause ventricular fibrillation (heart stops). Body resistance varies: 1000Ω (wet skin) to 100kΩ (dry skin). At 120V, wet hands could draw 120mA—lethal current. Always use GFCI (ground fault circuit interrupter) protection near water.</li>
            <li><strong>Fire Hazard:</strong> Overloaded circuits and undersized components can ignite fires. A 20A circuit on 14 AWG wire (rated 15A) will overheat. Power dissipation in resistors creates heat; a 5W resistor in a 2W application will reach 200-300°C, potentially igniting nearby materials. Use proper wire sizing, fuses, and circuit breakers.</li>
            <li><strong>Arc Flash Hazard:</strong> High-power circuits can produce dangerous electrical arcs when switched or during faults. Arc flash releases intense heat (up to 35,000°F), UV radiation, pressure waves, and molten metal. Working on circuits above 50V requires proper PPE and safety procedures.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on electrical theory and Ohm's Law applications, visit these authoritative resources:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.nist.gov/pml/electrical-resistance" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                NIST - Electrical Resistance Standards
              </a>
            </li>
            <li>
              <a href="https://www.allaboutcircuits.com/textbook/direct-current/chpt-2/voltage-current-resistance-relate/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                All About Circuits - Ohm's Law
              </a>
            </li>
            <li>
              <a href="https://www.electronics-tutorials.ws/dccircuits/dcp_2.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Electronics Tutorials - Ohm's Law and Power
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/resistor-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-900">Resistor Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Decode resistor color codes and calculate values</p>
          </a>
          
          <a 
            href="/voltage-drop-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📉</div>
            <h3 className="font-semibold text-gray-900">Voltage Drop Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate voltage drop in wire and cable</p>
          </a>
          
          <a 
            href="/electricity-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-semibold text-gray-900">Electricity Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate electricity costs and power usage</p>
          </a>
          
          <a 
            href="/watt-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Watt Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between watts, amps, and volts</p>
          </a>
        </div>
      </section>
    </div>
  );
}

