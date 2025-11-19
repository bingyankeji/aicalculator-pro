import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ElectricityCalculator from '@/components/Calculator/ElectricityCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Electricity Calculator - Calculate Power Usage & Costs | AICalculator",
  description: "Free electricity calculator to estimate power consumption and costs. Calculate energy usage for appliances, monthly bills, and find savings opportunities with our comprehensive electricity cost calculator.",
  keywords: [
    "electricity calculator",
    "power consumption calculator",
    "energy cost calculator",
    "electricity cost calculator",
    "electricity bill calculator",
    "power usage calculator",
    "energy calculator",
    "appliance energy calculator",
    "electricity usage calculator",
    "kWh calculator",
    "power cost calculator",
    "electric bill estimator",
    "energy consumption calculator",
    "electricity price calculator",
    "household electricity calculator",
    "home energy calculator",
    "appliance power calculator",
    "electricity savings calculator",
    "energy bill calculator",
    "utility bill calculator",
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Electricity Calculator - Estimate Power Costs & Savings",
    description: "Calculate electricity usage and costs for any appliance. Estimate monthly bills, find energy savings, and track power consumption easily.",
    type: 'website',
    url: getUrl('/electricity-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('electricity'),
      width: 1200,
      height: 630,
      alt: "Electricity Calculator"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Electricity Calculator - Power Usage & Cost Estimator",
    description: "Calculate electricity consumption and costs for appliances. Find energy savings opportunities instantly.",
    images: [getOgImage('electricity')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/electricity-calculator'),
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

export default function ElectricityCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/electricity-calculator'),
        name: "Electricity Calculator",
        url: getUrl('/electricity-calculator'),
        description: "Free online electricity calculator to estimate power consumption and costs for any appliance. Calculate energy usage, monthly bills, and discover savings opportunities with comprehensive cost analysis.",
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate electricity usage for any appliance',
          'Estimate daily, weekly, monthly, and yearly costs',
          'Built-in database of 35+ common appliances',
          'Custom appliance power input',
          'Capacity/load factor adjustment',
          'Real-time cost calculations',
          'Energy savings recommendations',
          'Multi-appliance tracking',
          'Visual cost breakdown charts',
          'Typical home energy distribution analysis',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/electricity-calculator'),
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
            name: "Electricity Calculator",
            item: getUrl('/electricity-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/electricity-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: "How do I calculate electricity costs?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "To calculate electricity costs, multiply power consumption (in kilowatts) by usage time (in hours) to get energy consumption in kilowatt-hours (kWh), then multiply by your electricity rate. Formula: Cost = Power (kW) × Time (hours) × Rate ($/kWh). For example, a 1000W (1kW) appliance running 5 hours per day at $0.15/kWh costs: 1 × 5 × 0.15 = $0.75 per day, or $22.50 per month. Use our calculator to automatically compute daily, monthly, and yearly costs for any appliance with instant results and savings recommendations.",
            },
          },
          {
            '@type': 'Question',
            name: "What is a kilowatt-hour (kWh)?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "A kilowatt-hour (kWh) is the standard unit of energy used for billing electricity. It represents the energy consumed by a 1-kilowatt (1000-watt) appliance running for 1 hour. Your electricity bill is based on total kWh consumed. Examples: A 100W light bulb running 10 hours uses 1 kWh (100W × 10h = 1000Wh = 1kWh). A 2000W space heater running 3 hours uses 6 kWh. Understanding kWh helps you identify high-consumption appliances and find savings opportunities. Average US household uses 877 kWh per month.",
            },
          },
          {
            '@type': 'Question',
            name: "How can I reduce my electricity bill?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Reduce electricity bills by: 1) Replacing incandescent bulbs with LED lights (75% savings). 2) Unplugging devices when not in use to eliminate phantom loads (5-10% savings). 3) Using programmable thermostats to optimize heating/cooling (10-15% savings). 4) Running appliances during off-peak hours if you have time-of-use rates. 5) Maintaining HVAC systems regularly (15% efficiency improvement). 6) Upgrading to Energy Star appliances (20-50% savings). 7) Using power strips to easily disconnect multiple devices. Average household can save $200-500 annually through these simple changes.",
            },
          },
          {
            '@type': 'Question',
            name: "What appliances use the most electricity?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Top electricity consumers in homes: 1) HVAC systems (heating/cooling): 40-50% of total usage, 2000-5000W continuous. 2) Water heater: 15-20%, 4000-5500W. 3) Dryer: 12%, 3000W per load. 4) Electric range/oven: 8%, 2000-5000W. 5) Lighting: 5-10%, cumulative wattage. 6) Refrigerator: 4-6%, 150-800W continuous. 7) Washer: 2-3%, 400-1300W per load. 8) TV/Entertainment: 2-4%, 50-400W. Focus energy savings on high-consumption appliances for maximum bill reduction. Use our calculator to identify your biggest energy users.",
            },
          },
          {
            '@type': 'Question',
            name: "How accurate is this electricity calculator?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "This calculator provides accurate estimates based on rated power, usage hours, and your electricity rate. Accuracy depends on input quality: 1) Appliance power ratings are found on nameplates or manuals (accurate within 5-10%). 2) Actual usage may vary based on load, age, and efficiency (±10-20% variance). 3) Capacity factor accounts for variable loads (motors, compressors cycle on/off). 4) Your electricity rate determines cost accuracy (check utility bill for exact rate including taxes and fees). Results are typically within 10-15% of actual bills. For highest accuracy, use actual power measurements from Kill-A-Watt meter or smart plugs.",
            },
          },
          {
            '@type': 'Question',
            name: "What is the average electricity rate in the US?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "The average US residential electricity rate is approximately $0.15 per kWh (as of 2024), but varies significantly by state and region. Lowest rates: Louisiana ($0.09/kWh), Washington ($0.10/kWh), Arkansas ($0.11/kWh). Highest rates: Hawaii ($0.42/kWh), Massachusetts ($0.28/kWh), California ($0.26/kWh). Urban areas typically have higher rates than rural areas. Rates also vary by usage tier, time of day (time-of-use plans), and season. Check your utility bill or company website for your exact rate. Include all charges: energy cost, delivery fees, taxes, and surcharges for accurate calculations.",
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/electricity-calculator'),
        name: "How to Calculate Electricity Costs",
        description: "Step-by-step guide to calculating electricity consumption and costs for any appliance using our electricity calculator.",
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: "Electricity Calculator",
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Appliance or Enter Custom Power',
            text: 'Choose an appliance from the dropdown menu (35+ pre-loaded options) or select "Custom" to enter your own. If selecting from the list, power rating auto-fills. For custom appliances, enter the power rating in watts found on the appliance nameplate, user manual, or specification sheet.',
            url: getStepUrl('/electricity-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Power Rating',
            text: 'Input the appliance power in watts (W). Common examples: LED bulb (9W), TV (100W), refrigerator (150W), microwave (1000W), space heater (1500W), central AC (3500W). Power ratings are typically marked on appliance labels or in product specifications. Use the actual rated power, not the circuit breaker size.',
            url: getStepUrl('/electricity-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Capacity/Load Factor',
            text: 'Enter the capacity percentage (0-100%) representing average operating load. Use 100% for constant-power devices (lights, TVs). Use 50-70% for variable-speed motors (refrigerators, air conditioners that cycle on/off). Use 30-50% for intermittent-use devices. This accounts for duty cycle and actual power draw versus rated power.',
            url: getStepUrl('/electricity-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter Daily Usage Hours',
            text: 'Input average hours per day the appliance runs. Be realistic: lights (6 hours), refrigerator (24 hours continuous), TV (4 hours), air conditioner (8 hours in summer), washer/dryer (1 hour). For intermittent devices, estimate total runtime. Track actual usage over a week and calculate daily average for accuracy.',
            url: getStepUrl('/electricity-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Enter Electricity Rate',
            text: 'Input your electricity cost per kilowatt-hour ($/kWh) found on your utility bill. Look for the "Energy Charge" or "kWh Rate" line item. Include tiered rates if applicable (average rate if you exceed certain usage thresholds). US average is $0.15/kWh, but ranges from $0.09 to $0.42 depending on location.',
            url: getStepUrl('/electricity-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Calculate and Review Results',
            text: 'Click "Calculate" to see energy consumption in kWh and costs for daily, weekly, monthly, and yearly periods. Review savings tips, cost breakdown charts, and add appliances to your tracking list to monitor total household electricity usage and identify opportunities to reduce your energy bill.',
            url: getStepUrl('/electricity-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/electricity-calculator'),
        headline: "Complete Guide to Calculating Electricity Costs and Reducing Energy Bills",
        description: "Comprehensive guide to understanding electricity consumption, calculating power costs, and implementing energy-saving strategies to reduce utility bills.",
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
        image: getOgImage('electricity'),
        articleBody: "Learn how to calculate electricity consumption and costs for any appliance, understand your energy bill, and implement proven strategies to reduce electricity usage and save money on utility bills.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Electricity Calculator - Calculate Power Usage & Costs</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Electricity Calculator"
        calculatorUrl="/electricity-calculator"
      />

      {/* Calculator Component */}
      <ElectricityCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Electricity Costs and Consumption</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate electricity usage and costs for any appliance with our comprehensive electricity calculator. Estimate monthly bills, track energy consumption, and discover savings opportunities. Perfect for homeowners, renters, and businesses looking to reduce energy costs.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How Electricity Billing Works</h3>
          <p className="text-gray-700 mb-4">
            Electricity billing is based on energy consumption measured in kilowatt-hours (kWh). Your utility company records your usage through an electric meter and charges you per kWh consumed. Understanding this system is crucial for managing energy costs effectively. A kilowatt-hour represents the energy used by a 1000-watt appliance running for one hour, or equivalently, a 100-watt bulb running for 10 hours.
          </p>
          <p className="text-gray-700 mb-4">
            Your electricity bill typically includes several components: the energy charge (cost per kWh), delivery or distribution charges (infrastructure costs), demand charges (for commercial customers based on peak usage), taxes, and various fees. Residential rates in the US average $0.15 per kWh but vary dramatically by location—from as low as $0.09/kWh in Louisiana to as high as $0.42/kWh in Hawaii. Understanding your rate structure is the first step in calculating and controlling electricity costs.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Electricity Cost Formula</h3>
          <p className="text-gray-700 mb-4">
            Calculating electricity costs involves a straightforward three-step process:
          </p>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Step 1: Calculate Power in Kilowatts (kW)</h4>
            <p className="font-mono text-blue-700 mb-2">Power (kW) = Power (Watts) ÷ 1000</p>
            <p className="text-sm text-gray-600">Example: 1500W heater = 1500 ÷ 1000 = 1.5 kW</p>
            
            <h4 className="font-bold text-gray-900 mb-3 mt-4">Step 2: Calculate Energy Consumption (kWh)</h4>
            <p className="font-mono text-blue-700 mb-2">Energy (kWh) = Power (kW) × Time (hours)</p>
            <p className="text-sm text-gray-600">Example: 1.5 kW × 8 hours = 12 kWh</p>
            
            <h4 className="font-bold text-gray-900 mb-3 mt-4">Step 3: Calculate Cost</h4>
            <p className="font-mono text-blue-700 mb-2">Cost ($) = Energy (kWh) × Rate ($/kWh)</p>
            <p className="text-sm text-gray-600">Example: 12 kWh × $0.15/kWh = $1.80 per day</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Household Appliances and Their Energy Use</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">High-Consumption Appliances</h4>
          <p className="text-gray-700 mb-4">
            Understanding which appliances consume the most electricity helps prioritize energy-saving efforts:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Appliance</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Power (W)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Typical Daily Use</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Monthly Cost @ $0.15/kWh</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Central Air Conditioner</td>
                  <td className="border border-gray-300 px-4 py-2">3,500W</td>
                  <td className="border border-gray-300 px-4 py-2">8 hours</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-red-600">$126.00</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Electric Water Heater</td>
                  <td className="border border-gray-300 px-4 py-2">4,500W</td>
                  <td className="border border-gray-300 px-4 py-2">3 hours</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-red-600">$60.75</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Electric Dryer</td>
                  <td className="border border-gray-300 px-4 py-2">3,000W</td>
                  <td className="border border-gray-300 px-4 py-2">1 hour</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-orange-600">$13.50</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Electric Oven</td>
                  <td className="border border-gray-300 px-4 py-2">2,400W</td>
                  <td className="border border-gray-300 px-4 py-2">1 hour</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-orange-600">$10.80</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Dishwasher</td>
                  <td className="border border-gray-300 px-4 py-2">1,800W</td>
                  <td className="border border-gray-300 px-4 py-2">1 hour</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-orange-600">$8.10</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Space Heater</td>
                  <td className="border border-gray-300 px-4 py-2">1,500W</td>
                  <td className="border border-gray-300 px-4 py-2">8 hours</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-orange-600">$54.00</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Refrigerator (modern)</td>
                  <td className="border border-gray-300 px-4 py-2">150W</td>
                  <td className="border border-gray-300 px-4 py-2">24 hours</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-yellow-600">$16.20</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">Desktop Computer</td>
                  <td className="border border-gray-300 px-4 py-2">200W</td>
                  <td className="border border-gray-300 px-4 py-2">8 hours</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">$7.20</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">LED TV (55")</td>
                  <td className="border border-gray-300 px-4 py-2">100W</td>
                  <td className="border border-gray-300 px-4 py-2">5 hours</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">$2.25</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">LED Bulb (60W equiv)</td>
                  <td className="border border-gray-300 px-4 py-2">9W</td>
                  <td className="border border-gray-300 px-4 py-2">6 hours</td>
                  <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">$0.24</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Capacity and Load Factors</h3>
          <p className="text-gray-700 mb-4">
            Not all appliances run at full power continuously. The capacity or load factor represents the percentage of rated power actually consumed during operation. This concept is crucial for accurate electricity cost estimates:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>100% Capacity (Resistive Loads):</strong> Incandescent lights, electric heaters, toasters, and irons operate at full rated power whenever they're on. A 1500W heater draws exactly 1500W continuously.</li>
            <li><strong>50-70% Capacity (Cycling Loads):</strong> Refrigerators, air conditioners, and heat pumps cycle on and off to maintain temperature. Compressor runs intermittently, averaging 50-70% of rated power over time. A 3500W AC might average 2100-2450W actual consumption.</li>
            <li><strong>30-50% Capacity (Variable Speed Motors):</strong> Modern washing machines, dishwashers, and pool pumps use variable-speed motors that adjust power based on load. Average power is typically 30-50% of rated maximum.</li>
            <li><strong>20-40% Capacity (Standby Power):</strong> Electronics like TVs, computers, and cable boxes draw power even when "off" due to standby modes. Consider using power strips or smart plugs to eliminate phantom loads.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Proven Strategies to Reduce Electricity Costs</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Lighting Upgrades - Save 75-80%</h4>
          <p className="text-gray-700 mb-4">
            Replacing incandescent bulbs with LED lights offers the quickest return on investment for energy savings. A 60W incandescent bulb replaced with a 9W LED (same brightness) saves 51W. If used 6 hours daily, that's 111.6 kWh annually, worth $16.74 at $0.15/kWh. LEDs last 25,000-50,000 hours (17-34 years at 4 hours/day) versus 1,000 hours for incandescent, reducing replacement costs. For a home with 20 bulbs, total annual savings approach $330-400. LEDs also produce less heat, reducing air conditioning costs in summer.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. HVAC Optimization - Save 15-30%</h4>
          <p className="text-gray-700 mb-4">
            Heating and cooling typically accounts for 40-50% of home energy use. Install a programmable or smart thermostat to automatically adjust temperature when you're sleeping or away. Settings: 68°F winter day, 62°F night; 78°F summer day, 82°F night saves 10-15% annually. Change HVAC filters monthly (dirty filters reduce efficiency 5-15%). Annual professional maintenance prevents 15-20% efficiency loss. Seal air leaks around windows, doors, and ducts—can save 10-20% on heating/cooling. Consider ceiling fans: running fans in summer allows raising thermostat 4°F while maintaining comfort, saving 10-15% on AC costs.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Water Heating Efficiency - Save 20-30%</h4>
          <p className="text-gray-700 mb-4">
            Water heating is the second-largest energy expense (15-20% of bills). Set water heater temperature to 120°F instead of 140°F (saves 10-15% and prevents scalding). Insulate water heater tank and first 6 feet of hot/cold pipes (saves 7-16%). Install low-flow showerheads (2.0 GPM vs 2.5+ GPM standard) reduces hot water use 20-30% without noticeable pressure loss. Fix leaky faucets: one drip per second wastes 3,000 gallons annually. Wash clothes in cold water (90% of washing machine energy goes to heating water). Consider tankless or heat pump water heaters for new construction—50-70% more efficient than standard electric.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Appliance Best Practices - Save 10-25%</h4>
          <p className="text-gray-700 mb-4">
            Optimize appliance usage for significant savings: Run dishwasher and washing machine with full loads only. Use dishwasher's air-dry setting instead of heat dry (saves $30-40/year). Clean refrigerator coils twice yearly (improves efficiency 25-30%). Keep refrigerator at 37-40°F, freezer at 0-5°F (colder wastes energy). Unplug phone chargers, coffee makers, and other devices when not in use—eliminate 5-10% phantom power drain. Use microwave or toaster oven for small meals instead of full-size oven (uses 50-80% less energy). Run ceiling fans counterclockwise in summer, clockwise in winter to optimize air circulation.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Time-of-Use Strategies - Save 10-30%</h4>
          <p className="text-gray-700 mb-4">
            If your utility offers time-of-use (TOU) rates, electricity costs less during off-peak hours (typically 9pm-6am weekdays, all day weekends). Shift high-energy tasks: run dishwasher, washer, dryer, and EV charging overnight. Program pool pumps for off-peak operation. Pre-cool or pre-heat home just before peak rates start. Install battery storage systems to store cheap off-peak power for peak-time use. TOU plans can save 10-30% for families willing to shift usage patterns. Average TOU savings: $200-500 annually for typical household.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Your Electricity Bill</h3>
          <p className="text-gray-700 mb-4">
            Your electricity bill contains multiple charges beyond simple energy consumption. Understanding each component helps identify savings opportunities and ensure billing accuracy:
          </p>
          
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Key Bill Components</h4>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Energy Charge ($/kWh):</strong> Cost per kilowatt-hour consumed. Typically 40-60% of residential bills. May have tiered rates (increasing cost per kWh as usage increases).</li>
              <li><strong>Delivery/Distribution Charge:</strong> Infrastructure costs (power lines, transformers, meters). Usually 30-40% of bill. Fixed monthly charge plus per-kWh fee.</li>
              <li><strong>Demand Charge (Commercial):</strong> Based on peak 15-minute power demand during billing period. Encourages load leveling. Residential customers typically don't have demand charges.</li>
              <li><strong>Fuel Adjustment:</strong> Passes through changes in utility's fuel costs (coal, natural gas). Can vary month-to-month based on energy market prices.</li>
              <li><strong>Taxes and Fees:</strong> State/local taxes, renewable energy surcharges, public benefit fees. Typically 5-15% of bill total.</li>
              <li><strong>Customer Charge:</strong> Fixed monthly fee for meter reading and account maintenance. Typically $5-15/month regardless of usage.</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Advanced Energy Monitoring</h3>
          <p className="text-gray-700 mb-4">
            For maximum control over electricity costs, consider investing in energy monitoring tools that provide real-time data on consumption patterns:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Whole-Home Energy Monitors:</strong> Install at electrical panel to track total consumption in real-time. Devices like Sense, Emporia Vue cost $200-300 and provide detailed insights via smartphone app. Identify high-usage appliances, detect always-on loads, and track savings from efficiency improvements.</li>
            <li><strong>Smart Plugs:</strong> Monitor and control individual appliances. Models like TP-Link Kasa, Wemo Insight cost $15-30 each. Measure actual power consumption, set schedules, and turn off remotely. Ideal for TVs, computers, space heaters, and other high-use devices.</li>
            <li><strong>Kill-A-Watt Meters:</strong> Portable plug-in meters ($20-40) measure appliance power, voltage, current, and cumulative energy use. Essential for identifying phantom loads and verifying rated power consumption. Move between outlets to audit entire home.</li>
            <li><strong>Utility Online Portals:</strong> Many utilities offer free online access to hourly or daily usage data. Compare usage patterns month-over-month, identify peak consumption times, and receive high-usage alerts. Set budget targets and track progress toward energy savings goals.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Solar Power Considerations</h3>
          <p className="text-gray-700 mb-4">
            Solar panels can significantly reduce or eliminate electricity bills, with typical residential systems paying for themselves in 7-12 years. A 6kW solar system (20 panels) produces 7,000-10,000 kWh annually in most US locations, offsetting $1,050-1,500 in electricity costs at $0.15/kWh. Federal tax credit covers 30% of system cost (through 2032). Many states offer additional incentives, rebates, or Solar Renewable Energy Credits (SRECs) that further improve economics.
          </p>
          <p className="text-gray-700 mb-4">
            Net metering policies allow selling excess solar production back to the grid at retail rates, effectively using the grid as free battery storage. Battery systems (Tesla Powerwall, LG Chem) cost $10,000-15,000 and provide backup power during outages while enabling time-shifting of solar production to maximize savings under time-of-use rates. Before installing solar, optimize energy efficiency first—reducing consumption decreases required system size and upfront cost. Use our electricity calculator to estimate your current usage and potential savings from solar.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Energy Efficiency Standards and Programs</h3>
          <p className="text-gray-700 mb-4">
            Government and utility programs offer incentives for energy efficiency improvements:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>ENERGY STAR Certification:</strong> Products meeting EPA efficiency standards use 10-50% less energy than standard models. Look for ENERGY STAR labels on appliances, electronics, HVAC systems, windows, and lighting. Certified appliances save average household $450 annually.</li>
            <li><strong>Utility Rebate Programs:</strong> Many utilities offer rebates for purchasing efficient appliances, HVAC upgrades, insulation improvements, and smart thermostats. Rebates range from $50-2,000 depending on measure. Check your utility website or database.energystar.gov for local programs.</li>
            <li><strong>Home Energy Audits:</strong> Professional audits ($200-500, often free through utility programs) identify savings opportunities through blower door tests, thermal imaging, and appliance testing. Typical audit finds savings opportunities worth $500-1,000 annually with 2-5 year payback on recommended improvements.</li>
            <li><strong>Weatherization Assistance Program (WAP):</strong> Free weatherization services for low-income households. Services include insulation, air sealing, HVAC repair/replacement, and lighting upgrades. Average household saves $283 annually. Contact state energy office for eligibility and application.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Commercial and Industrial Energy Management</h3>
          <p className="text-gray-700 mb-4">
            Businesses face unique electricity challenges with demand charges, three-phase power, and complex rate structures. Commercial electricity rates average $0.11/kWh but demand charges can double effective costs for businesses with high peak loads. Key strategies include: load shifting to off-peak hours, power factor correction (eliminates 10-15% reactive power surcharge), motor variable frequency drives (VFDs save 20-50% on HVAC and pump motors), LED lighting retrofits (70-80% reduction), and energy management systems (EMS) for automated control.
          </p>
          <p className="text-gray-700 mb-4">
            Industrial facilities should implement ISO 50001 energy management standards and conduct regular energy audits. Compressed air systems, often 20-30% of industrial electricity use, offer large savings through leak detection, pressure optimization, and heat recovery. Process heating and cooling optimization through heat exchangers, insulation, and waste heat recovery can reduce energy costs 15-40%. Many utilities offer technical assistance and incentives specifically for commercial/industrial customers. Calculate ROI using our electricity calculator with your actual usage patterns and rate structure.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Electric Vehicle Charging Costs</h3>
          <p className="text-gray-700 mb-4">
            Electric vehicles offer significant fuel cost savings compared to gasoline. A typical EV uses 30-40 kWh per 100 miles. At $0.15/kWh, electricity cost is $4.50-6.00 per 100 miles versus $12-15 for 30 mpg gas vehicle at $4/gallon (60-70% savings). Annual driving 12,000 miles: EV costs $540-720 in electricity versus $1,440-1,800 for gas.
          </p>
          <p className="text-gray-700 mb-4">
            Home Level 2 chargers (240V, 7.2kW) add $200-600 to installation costs but charge 5× faster than 120V outlets. Charging overnight on time-of-use rates can reduce per-kWh costs to $0.05-0.08, cutting annual EV electricity costs to $180-320. Many utilities offer special EV rates with super off-peak pricing. Public DC fast charging costs $0.30-0.60/kWh (equivalent to $2-4/gallon) but is typically used only for road trips. Solar + battery systems can charge EVs with free solar power while providing grid independence. Use our electricity calculator to estimate EV charging costs at your local rates.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on electricity costs, energy efficiency, and utility programs, visit these authoritative resources:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.energy.gov/energysaver/energy-saver" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                U.S. Department of Energy - Energy Saver Guide
              </a>
            </li>
            <li>
              <a href="https://www.eia.gov/electricity/monthly/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                U.S. Energy Information Administration - Electricity Data
              </a>
            </li>
            <li>
              <a href="https://www.energystar.gov/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                ENERGY STAR - Efficient Products and Programs
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
            href="/ohms-law-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Ohm's Law Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate voltage, current, resistance, and power</p>
          </a>
          
          <a 
            href="/solar-panel-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">☀️</div>
            <h3 className="font-semibold text-gray-900">Solar Panel Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate solar power generation and savings</p>
          </a>
          
          <a 
            href="/btu-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-semibold text-gray-900">BTU Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate heating and cooling requirements</p>
          </a>
          
          <a 
            href="/carbon-footprint-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="font-semibold text-gray-900">Carbon Footprint Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate your environmental impact</p>
          </a>
        </div>
      </section>
    </div>
  );
}

