import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import { UnitConverter } from '@/components/Calculator/UnitConverter';

export const metadata: Metadata = {
  title: 'Unit Converter (Free, No signup) - Conversion Calculator | AICalculator',
  description: 'Free unit converter with no sign-up required. Convert units instantly. Support for length, weight, temperature, area, volume, and speed conversions. Accurate results with 30+ units. Mobile-friendly calculator.',
  keywords: 'unit converter, free unit converter, unit converter no signup, conversion calculator, length converter, weight converter, temperature converter, metric converter, imperial converter, area converter, volume converter, speed converter, measurement converter, online unit conversion',
  openGraph: {
    title: 'Unit Converter (Free, No signup) - AICalculator',
    description: 'Free unit converter with no sign-up required. Accurate online unit converter supporting 30+ units across 6 categories. Convert length, weight, temperature, area, volume, and speed instantly.',
    type: 'website',
    url: 'https://aicalculator.io/unit-converter',
    siteName: 'AICalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unit Converter (Free, No signup) - AICalculator',
    description: 'Free unit converter with no sign-up required. Convert between 30+ units instantly. Supports length, weight, temperature, area, volume, and speed.',
  },
  alternates: {
    canonical: 'https://aicalculator.io/unit-converter',
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function UnitConverterPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Unit Converter',
        description: 'Free online unit converter supporting 30+ units across 6 categories: length, weight, temperature, area, volume, and speed.',
        url: 'https://aicalculator.io/unit-converter',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Convert between 30+ units',
          '6 conversion categories',
          'Instant real-time conversion',
          'Quick reference table',
          'Swap units with one click',
          'Share conversion results',
          'Print and save as image',
          'Mobile-friendly interface',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aicalculator.io',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Math & Numbers',
            item: 'https://aicalculator.io/math-numbers',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Unit Converter',
            item: 'https://aicalculator.io/unit-converter',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I convert between metric and imperial units?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Select your conversion category (e.g., Length), choose your starting unit (e.g., meters), enter the value, then select your target unit (e.g., feet). The conversion happens instantly. For example, 1 meter = 3.28084 feet. Our calculator supports all common metric-to-imperial and imperial-to-metric conversions.',
            },
          },
          {
            '@type': 'Question',
            name: 'What units can I convert with this calculator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our unit converter supports 30+ units across 6 categories: Length (mm, cm, m, km, in, ft, yd, mi), Weight (mg, g, kg, ton, oz, lb, stone), Temperature (°C, °F, K), Area (m², km², ft², acre, hectare), Volume (mL, L, m³, tsp, tbsp, fl oz, cup, pint, quart, gallon), and Speed (m/s, km/h, mph, ft/s, knots).',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate is the unit converter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our unit converter uses scientifically validated conversion factors and displays results to 8 decimal places for maximum accuracy. For example, we use the exact conversion factor 1 inch = 0.0254 meters (not rounded). The calculations are precise enough for scientific, engineering, and everyday use.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I convert temperature between Celsius, Fahrenheit, and Kelvin?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Our temperature converter supports all three major temperature scales. The formulas used are: °F = (°C × 9/5) + 32, K = °C + 273.15. For example: 0°C = 32°F = 273.15K, 100°C = 212°F = 373.15K. The conversion accounts for both scale offset and ratio differences.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I convert cooking measurements like cups to milliliters?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Select the Volume category, then choose your units. For US cooking measurements: 1 cup = 236.588 mL, 1 tablespoon = 14.787 mL, 1 teaspoon = 4.929 mL, 1 fl oz = 29.574 mL. Note that US measurements differ from UK/metric measurements (UK cup = 284 mL), so ensure you\'re using the correct system.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why are there different symbols like ft² and m²?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The ² symbol indicates squared units for area measurements (ft² = square feet, m² = square meters). Similarly, ³ indicates cubic units for volume (m³ = cubic meters). This notation shows that area is length × length, and volume is length × length × length. For example, 1 m² = 10.764 ft², and 1 m³ = 1000 liters.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I share my conversion results?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! After performing a conversion, click the Share button to share via Facebook, Twitter, WhatsApp, or email. You can also save the conversion as an image or print it. The share link includes your conversion values, so recipients see your exact calculation when they open the link.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between mass (weight) and volume?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mass (weight) measures how much matter an object contains (kg, lb), while volume measures the space it occupies (liters, gallons). You cannot directly convert between them without knowing the density. For example, 1 liter of water weighs 1 kg (density = 1), but 1 liter of oil weighs only ~0.92 kg (density = 0.92). Use our Weight converter for mass and Volume converter for space measurements.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Use the Unit Converter',
        description: 'Step-by-step guide to converting units',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Category',
            text: 'Choose the type of conversion you need: Length, Weight, Temperature, Area, Volume, or Speed.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Starting Unit',
            text: 'Select the unit you want to convert from (e.g., meters, pounds, Celsius).',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Value',
            text: 'Type in the number you want to convert.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Select Target Unit',
            text: 'Choose the unit you want to convert to (e.g., feet, kilograms, Fahrenheit).',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Results',
            text: 'The conversion appears instantly. See a quick reference table showing your value in all available units. Use the swap button to reverse the conversion direction.',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Unit Converter - Free Online Unit Conversion Calculator for Length, Weight, Temperature, Area, Volume, and Speed with 30+ Units and Instant Results
      </h1>

      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Unit Converter (Free, No signup)"
        calculatorUrl="/unit-converter"
      />

      {/* Calculator */}
      <section className="py-8 md:py-12" aria-label="Unit Converter Tool">
        <div className="container mx-auto px-4">
          <UnitConverter />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Understanding Unit Conversions
              </h2>
              <p className="text-gray-700 mb-4">
                Unit conversion is the process of changing a measurement from one unit to another while maintaining the same quantity. 
                For example, <strong>1 meter equals 3.28084 feet</strong> - the distance is the same, but we're expressing it in different 
                units. Our unit converter handles all the complex math behind these conversions, giving you accurate results instantly.
              </p>
              <p className="text-gray-700 mb-6">
                Understanding unit conversions is essential in many situations: cooking recipes from different countries, 
                international travel (kilometers vs miles), scientific work (metric vs imperial), home improvement projects 
                (square feet vs square meters), and more. This tool eliminates calculation errors and saves you time.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Conversion Categories Explained
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">📏 Length Conversion</h3>
              <p className="text-gray-700 mb-3">
                Length measures distance between two points. Our converter supports both <strong>metric</strong> (millimeters, 
                centimeters, meters, kilometers) and <strong>imperial</strong> (inches, feet, yards, miles) units.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li><strong>1 inch = 2.54 cm</strong> (exact definition)</li>
                <li><strong>1 foot = 30.48 cm = 12 inches</strong></li>
                <li><strong>1 meter = 3.28084 feet = 39.3701 inches</strong></li>
                <li><strong>1 mile = 1.60934 km = 5,280 feet</strong></li>
                <li><strong>1 kilometer = 0.621371 miles</strong></li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>💡 Pro Tip:</strong> When traveling internationally, remember that most countries use kilometers 
                  for road distances. A rough conversion: 100 km/h ≈ 62 mph. For height, 180 cm ≈ 5'11" (5 feet 11 inches).
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">⚖️ Weight (Mass) Conversion</h3>
              <p className="text-gray-700 mb-3">
                Weight measures the amount of matter in an object. Note: technically, weight is a force (mass × gravity), 
                but in everyday use, "weight" and "mass" are used interchangeably.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li><strong>1 kilogram = 2.20462 pounds = 35.274 ounces</strong></li>
                <li><strong>1 pound = 0.453592 kg = 16 ounces</strong></li>
                <li><strong>1 ounce = 28.3495 grams</strong></li>
                <li><strong>1 metric ton = 1,000 kg = 2,204.62 lbs</strong></li>
                <li><strong>1 stone = 14 pounds = 6.35029 kg</strong> (UK/Ireland)</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>🍳 Cooking Conversion:</strong> Recipe says 500g flour but your scale shows ounces? 
                  500g = 17.64 oz (about 1.1 lbs). Most baking scales can switch between grams and ounces - 
                  always use grams for precision baking!
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">🌡️ Temperature Conversion</h3>
              <p className="text-gray-700 mb-3">
                Temperature measures thermal energy. Unlike other conversions, temperature scales have different 
                zero points and scale divisions, so the conversion isn't a simple multiplication.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm mb-2"><strong>Formulas:</strong></p>
                <p className="font-mono text-sm">°F = (°C × 9/5) + 32</p>
                <p className="font-mono text-sm">°C = (°F - 32) × 5/9</p>
                <p className="font-mono text-sm">K = °C + 273.15</p>
              </div>
              <p className="text-gray-700 mb-3"><strong>Key Temperature Reference Points:</strong></p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li><strong>Water freezes:</strong> 0°C = 32°F = 273.15K</li>
                <li><strong>Room temperature:</strong> 20-22°C = 68-72°F = 293-295K</li>
                <li><strong>Body temperature:</strong> 37°C = 98.6°F = 310K</li>
                <li><strong>Water boils:</strong> 100°C = 212°F = 373K</li>
                <li><strong>Absolute zero:</strong> -273.15°C = -459.67°F = 0K</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>🔥 Quick Mental Conversion:</strong> To roughly convert Celsius to Fahrenheit: double it, 
                  then add 30. Example: 20°C → 20×2=40 → 40+30=70°F (actual: 68°F - close enough!). For exact 
                  cooking temperatures, use our calculator.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">📐 Area Conversion</h3>
              <p className="text-gray-700 mb-3">
                Area measures two-dimensional space (length × width). When converting area, you must square the 
                conversion factor. For example, since 1m = 3.28ft, then 1m² = (3.28)² = 10.76 ft².
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li><strong>1 m² = 10.7639 ft² = 1,550 in²</strong></li>
                <li><strong>1 ft² = 0.092903 m² = 144 in²</strong></li>
                <li><strong>1 acre = 4,046.86 m² = 43,560 ft²</strong></li>
                <li><strong>1 hectare = 10,000 m² = 2.471 acres</strong></li>
                <li><strong>1 km² = 0.386102 square miles = 247.105 acres</strong></li>
              </ul>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>🏠 Real Estate:</strong> House listings often show area in different units. 
                  2,000 ft² = 185.8 m² (common US house size). Land is often measured in acres (US) or hectares 
                  (international): 1 acre ≈ 0.4 hectares. A soccer field is about 0.7 hectares (1.76 acres).
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">🧪 Volume Conversion</h3>
              <p className="text-gray-700 mb-3">
                Volume measures three-dimensional space. Like area, volume conversions require cubing: 
                since 1m = 3.28ft, then 1m³ = (3.28)³ = 35.31 ft³. For liquids, we often use liters, gallons, 
                cups, etc.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li><strong>1 liter = 1,000 mL = 33.814 fl oz = 4.227 cups (US)</strong></li>
                <li><strong>1 gallon (US) = 3.78541 L = 128 fl oz = 16 cups</strong></li>
                <li><strong>1 m³ = 1,000 liters = 264.172 gallons</strong></li>
                <li><strong>1 cup (US) = 236.588 mL = 8 fl oz</strong></li>
                <li><strong>1 tablespoon = 14.787 mL = 3 teaspoons</strong></li>
              </ul>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>⚠️ US vs UK Volume Units:</strong> Be careful - US and UK measurements differ! 
                  1 US gallon = 3.785 L, but 1 UK (imperial) gallon = 4.546 L (20% larger!). Similarly, 
                  US cup = 237 mL, UK cup = 284 mL. Always check which system your recipe uses.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">🚗 Speed Conversion</h3>
              <p className="text-gray-700 mb-3">
                Speed measures distance traveled per unit time. The most common units are km/h (kilometers per hour) 
                used in most countries, and mph (miles per hour) used in the US and UK.
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li><strong>1 m/s = 3.6 km/h = 2.237 mph</strong></li>
                <li><strong>1 km/h = 0.621371 mph = 0.277778 m/s</strong></li>
                <li><strong>1 mph = 1.60934 km/h = 0.44704 m/s</strong></li>
                <li><strong>1 knot = 1.852 km/h = 1.15078 mph</strong> (nautical/aviation)</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>🚦 Speed Limit Conversion:</strong> Driving abroad? 100 km/h ≈ 62 mph, 80 km/h ≈ 50 mph, 
                  50 km/h ≈ 31 mph. Most European highways: 120-130 km/h (75-81 mph). US interstate: typically 
                  65-75 mph (105-120 km/h). Always check local speed limits!
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Common Conversion Mistakes to Avoid
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-bold text-red-900 mb-2">❌ Mistake 1: Confusing Area and Linear Measurements</h4>
                  <p className="text-gray-700">
                    Common error: thinking 1 square meter = 3.28 square feet (wrong!). Since 1m = 3.28ft, 
                    you must square it: 1m² = (3.28)² = 10.76 ft². Always square the conversion factor for area, 
                    and cube it for volume.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-bold text-red-900 mb-2">❌ Mistake 2: Using Wrong Temperature Formula</h4>
                  <p className="text-gray-700">
                    Temperature conversion is NOT simple multiplication. 10°C is NOT 10×1.8 = 18°F! 
                    The correct formula is °F = (°C × 9/5) + 32, so 10°C = 50°F. Temperature scales have 
                    different zero points - always use the proper formula or our calculator.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-bold text-red-900 mb-2">❌ Mistake 3: Mixing Up US and UK Units</h4>
                  <p className="text-gray-700">
                    US gallon (3.785 L) ≠ UK gallon (4.546 L). US pint (473 mL) ≠ UK pint (568 mL). 
                    When using international recipes or fuel economy figures, always verify which system is being used. 
                    Our calculator uses US customary units by default.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-bold text-red-900 mb-2">❌ Mistake 4: Confusing Weight and Volume</h4>
                  <p className="text-gray-700">
                    You cannot directly convert pounds to liters - these measure different things! 
                    Weight measures mass, volume measures space. The conversion depends on density: 
                    1 liter of water = 1 kg (2.2 lbs), but 1 liter of oil = 0.92 kg (2 lbs). 
                    Always use the appropriate converter for your measurement type.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <h4 className="font-bold text-red-900 mb-2">❌ Mistake 5: Rounding Too Early</h4>
                  <p className="text-gray-700">
                    If you're doing multiple conversions (e.g., miles → km → meters), don't round intermediate 
                    steps. Rounding errors compound. Use our calculator which maintains full precision throughout 
                    the calculation, only rounding the final result.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Practical Conversion Examples
              </h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">🍳 Example 1: Cooking Recipe Conversion</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Problem:</strong> European recipe calls for 250 mL milk, 200g flour, oven at 180°C. 
                  Convert to US measurements.
                </p>
                <p className="text-gray-700">
                  <strong>Solution:</strong> 250 mL = 1.06 cups ≈ 1 cup + 1 tablespoon, 200g flour = 7.05 oz ≈ 1⅔ cups (depends on density), 
                  180°C = 356°F ≈ 350°F. Our calculator handles these instantly!
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">🏃 Example 2: Running Pace</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Problem:</strong> You run 5 km in 25 minutes. What's your speed in mph?
                </p>
                <p className="text-gray-700">
                  <strong>Solution:</strong> Speed = 5 km / (25/60) hours = 12 km/h. Convert: 12 km/h = 7.46 mph. 
                  This is a comfortable jogging pace!
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">🏠 Example 3: Home Improvement</h4>
                <p className="text-gray-700 mb-2">
                  <strong>Problem:</strong> You need to tile a 15 ft × 12 ft room. Tiles are sold per m². How many do you need?
                </p>
                <p className="text-gray-700">
                  <strong>Solution:</strong> Room area = 15 × 12 = 180 ft². Convert: 180 ft² = 16.72 m². 
                  Add 10% for waste = 18.4 m² of tiles needed.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Related Calculators
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Link href="/percentage-calculator" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-blue-900 mb-2">📊 Percentage Calculator</h3>
                  <p className="text-sm text-gray-700">Calculate percentages, increases, and decreases</p>
                </Link>
                <Link href="/bmi-calculator" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-green-900 mb-2">⚖️ BMI Calculator</h3>
                  <p className="text-sm text-gray-700">Convert weight and height to calculate BMI</p>
                </Link>
                <Link href="/square-footage-calculator" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-purple-900 mb-2">📐 Square Footage Calculator</h3>
                  <p className="text-sm text-gray-700">Calculate area in square feet or meters</p>
                </Link>
                <Link href="/pace-calculator" className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-orange-900 mb-2">🏃 Pace Calculator</h3>
                  <p className="text-sm text-gray-700">Convert running pace between min/km and min/mi</p>
                </Link>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: How do I convert between metric and imperial units?
                  </h3>
                  <p className="text-gray-700">
                    Select your conversion category (e.g., Length), choose your starting unit (e.g., meters), 
                    enter the value, then select your target unit (e.g., feet). The conversion happens instantly. 
                    For example, 1 meter = 3.28084 feet. Our calculator supports all common metric-to-imperial and 
                    imperial-to-metric conversions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: What units can I convert with this calculator?
                  </h3>
                  <p className="text-gray-700">
                    Our unit converter supports 30+ units across 6 categories: Length (mm, cm, m, km, in, ft, yd, mi), 
                    Weight (mg, g, kg, ton, oz, lb, stone), Temperature (°C, °F, K), Area (m², km², ft², acre, hectare), 
                    Volume (mL, L, m³, tsp, tbsp, fl oz, cup, pint, quart, gallon), and Speed (m/s, km/h, mph, ft/s, knots).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: How accurate is the unit converter?
                  </h3>
                  <p className="text-gray-700">
                    Our unit converter uses scientifically validated conversion factors and displays results to 8 decimal 
                    places for maximum accuracy. For example, we use the exact conversion factor 1 inch = 0.0254 meters 
                    (not rounded). The calculations are precise enough for scientific, engineering, and everyday use.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: Can I convert temperature between Celsius, Fahrenheit, and Kelvin?
                  </h3>
                  <p className="text-gray-700">
                    Yes! Our temperature converter supports all three major temperature scales. The formulas used are: 
                    °F = (°C × 9/5) + 32, K = °C + 273.15. For example: 0°C = 32°F = 273.15K, 100°C = 212°F = 373.15K. 
                    The conversion accounts for both scale offset and ratio differences.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: How do I convert cooking measurements like cups to milliliters?
                  </h3>
                  <p className="text-gray-700">
                    Select the Volume category, then choose your units. For US cooking measurements: 1 cup = 236.588 mL, 
                    1 tablespoon = 14.787 mL, 1 teaspoon = 4.929 mL, 1 fl oz = 29.574 mL. Note that US measurements differ 
                    from UK/metric measurements (UK cup = 284 mL), so ensure you're using the correct system.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: Why are there different symbols like ft² and m²?
                  </h3>
                  <p className="text-gray-700">
                    The ² symbol indicates squared units for area measurements (ft² = square feet, m² = square meters). 
                    Similarly, ³ indicates cubic units for volume (m³ = cubic meters). This notation shows that area is 
                    length × length, and volume is length × length × length. For example, 1 m² = 10.764 ft², and 
                    1 m³ = 1000 liters.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: Can I share my conversion results?
                  </h3>
                  <p className="text-gray-700">
                    Yes! After performing a conversion, click the Share button to share via Facebook, Twitter, WhatsApp, 
                    or email. You can also save the conversion as an image or print it. The share link includes your 
                    conversion values, so recipients see your exact calculation when they open the link.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Q: What is the difference between mass (weight) and volume?
                  </h3>
                  <p className="text-gray-700">
                    Mass (weight) measures how much matter an object contains (kg, lb), while volume measures the space 
                    it occupies (liters, gallons). You cannot directly convert between them without knowing the density. 
                    For example, 1 liter of water weighs 1 kg (density = 1), but 1 liter of oil weighs only ~0.92 kg 
                    (density = 0.92). Use our Weight converter for mass and Volume converter for space measurements.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
