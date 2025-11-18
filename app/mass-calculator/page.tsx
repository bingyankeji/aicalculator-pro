import { Metadata } from 'next';
import MassCalculator from '@/components/Calculator/MassCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Mass Calculator - Calculate Weight & Density for Any Material | AICalculator',
  description: 'Free mass calculator for weight, volume, and density calculations. Calculate mass for metals, wood, plastics, stone, and more. Supports multiple shapes and unit conversions.',
  keywords: [
    'mass calculator',
    'weight calculator',
    'density calculator',
    'volume to mass',
    'material weight calculator',
    'metal weight calculator',
    'steel weight calculator',
    'aluminum weight calculator',
    'concrete weight calculator',
    'wood weight calculator',
    'plastic weight calculator',
    'calculate mass from volume',
    'weight estimation calculator',
    'shipping weight calculator',
    'material density chart',
    'kg to lb converter',
    'mass unit converter',
    'weight measurement',
    'density formula',
    'engineering calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Mass Calculator - Calculate Weight & Density for Any Material',
    description: 'Calculate mass and weight for any material and shape. Comprehensive material density database with instant unit conversions.',
    type: 'website',
    url: getUrl('/mass-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('mass'),
      width: 1200,
      height: 630,
      alt: 'Mass Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mass Calculator - Calculate Weight & Density for Any Material',
    description: 'Calculate mass and weight for any material and shape. Comprehensive material density database with instant unit conversions.',
    images: [getOgImage('mass')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/mass-calculator'),
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

export default function MassCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/mass-calculator'),
        name: 'Mass Calculator',
        url: getUrl('/mass-calculator'),
        description: 'Free mass calculator for weight, volume, and density calculations across metals, wood, plastics, stone, and more materials. Supports multiple geometric shapes and unit conversions.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate mass from volume and density',
          '50+ material density database',
          'Multiple geometric shapes',
          'Custom density input',
          'Multi-unit conversions (kg, lb, ton)',
          'Multiple item calculations',
          'Material search function',
          'Engineering applications',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/mass-calculator'),
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
            name: 'Mass Calculator',
            item: getUrl('/mass-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/mass-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you calculate mass from volume and density?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mass is calculated using the fundamental formula: Mass = Volume × Density. Volume must be in cubic meters (m³) and density in kilograms per cubic meter (kg/m³) to get mass in kilograms. For example, a steel cube measuring 1m × 1m × 1m has volume 1 m³. Steel density is 7850 kg/m³, so mass = 1 × 7850 = 7850 kg. For different units, convert first: a 10cm × 10cm × 10cm cube is 0.1 × 0.1 × 0.1 = 0.001 m³. Aluminum density is 2700 kg/m³, so mass = 0.001 × 2700 = 2.7 kg. Always ensure units match before calculation.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the density of common materials?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common material densities (kg/m³): Metals - Aluminum 2700, Steel 7850, Stainless Steel 8000, Copper 8960, Brass 8500, Iron 7200, Lead 11340, Gold 19300. Wood - Oak 750, Pine 550, Maple 700, Plywood 550, MDF 750. Plastics - ABS 1040, PVC 1380, Acrylic 1180, Polypropylene 900. Stone - Concrete 2400, Granite 2750, Marble 2700, Brick 1920. Other - Water 1000, Glass 2500, Rubber 1200, Ice 917. These values are approximate averages; actual density varies by grade, composition, moisture content (wood), and temperature.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you calculate the weight of a steel plate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate steel plate weight: 1) Measure dimensions - length, width, and thickness in meters. For example: 2m long × 1m wide × 0.01m thick (10mm). 2) Calculate volume: Volume = Length × Width × Thickness = 2 × 1 × 0.01 = 0.02 m³. 3) Use steel density: Carbon steel density is approximately 7850 kg/m³. 4) Calculate mass: Mass = Volume × Density = 0.02 × 7850 = 157 kg. 5) Convert if needed: 157 kg × 2.20462 = 346 pounds. For quick estimation, steel weighs approximately 7.85 kg per liter or 490 pounds per cubic foot. Different steel grades have slightly different densities (stainless 8000 kg/m³).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between mass and weight?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mass and weight are fundamentally different: Mass is the amount of matter in an object, measured in kilograms (kg) or pounds mass (lbm). Mass never changes regardless of location. Weight is the force gravity exerts on that mass, measured in newtons (N) or pounds force (lbf). Weight = Mass × Gravitational Acceleration. On Earth (g = 9.81 m/s²), a 100 kg mass weighs 981 newtons. On the Moon (g = 1.62 m/s²), the same 100 kg mass weighs only 162 newtons. Mass remains 100 kg in both locations. In everyday usage, pounds can mean mass or weight depending on context. Our calculator determines mass; multiply by local gravity to get weight force.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you calculate the mass of a cylinder?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate cylinder mass: 1) Measure dimensions - radius (r) and height (h) in meters. Example: radius 0.5m, height 2m. 2) Calculate volume using formula: Volume = π × r² × h = 3.14159 × 0.5² × 2 = 3.14159 × 0.25 × 2 = 1.571 m³. 3) Choose material and density. Aluminum density = 2700 kg/m³. 4) Calculate mass: Mass = Volume × Density = 1.571 × 2700 = 4241.7 kg. For hollow cylinders (tubes), calculate outer cylinder volume minus inner cylinder volume: Volume = π × h × (r_outer² - r_inner²). Common applications: pipes, drums, columns, storage tanks.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I estimate shipping weight for materials?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To estimate shipping weight accurately: 1) Calculate net material weight using our mass calculator with actual dimensions and material type. 2) Add packaging weight - cardboard boxes (0.1-1 kg per box), pallets (15-25 kg for wood, 10-15 kg for plastic), crating (varies widely by size), protective materials (bubble wrap, foam inserts typically 5-10% of item weight). 3) Consider dimensional weight for shipping costs. Carriers use greater of actual weight or dimensional weight (Length × Width × Height ÷ Dimensional Factor). Standard factor is 5000 for cm/kg or 139 for inches/lbs. 4) Add 10-15% safety margin for weight variations and moisture content in porous materials. Always verify with actual weighing before finalizing shipping documentation.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/mass-calculator'),
        name: 'How to Calculate Mass Using Volume and Density',
        description: 'Learn how to calculate mass for any material and shape using volume and density with our comprehensive mass calculator.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Mass Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Shape',
            text: 'Choose the geometric shape that matches your object: rectangular prism (box), cube, cylinder, sphere, cone, or hollow cylinder (tube). Each shape uses different volume formulas.',
            url: getStepUrl('/mass-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Dimensions',
            text: 'Input the dimensions in meters for your selected shape. For rectangular prism: length, width, height. For cylinder: radius and height. For sphere: radius only. Measure carefully for accurate results.',
            url: getStepUrl('/mass-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select Material or Enter Custom Density',
            text: 'Choose from 50+ materials in our database (metals, wood, plastics, stone, etc.) or enter custom density in kg/m³. Use the search function to quickly find your material.',
            url: getStepUrl('/mass-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Mass',
            text: 'Click Calculate to compute volume and mass. The calculator applies the formula: Mass = Volume × Density. Results show volume in m³ and mass in kg with automatic unit conversions.',
            url: getStepUrl('/mass-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Unit Conversions',
            text: 'View mass in multiple units: kilograms (kg), grams (g), pounds (lb), ounces (oz), metric tons (t), and US tons. All conversions are calculated automatically.',
            url: getStepUrl('/mass-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Add Multiple Items (Optional)',
            text: 'Calculate total mass for multiple items by adding each calculation to a list. Track different materials and shapes together, perfect for shipping estimates or project planning.',
            url: getStepUrl('/mass-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/mass-calculator'),
        headline: 'Complete Guide to Mass Calculation: Formulas, Materials, and Applications',
        description: 'Comprehensive guide to calculating mass from volume and density for any material and shape, with practical applications in engineering, shipping, and manufacturing.',
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
        image: getOgImage('mass'),
        articleBody: 'Learn how to calculate mass for any material and shape using volume and density. Comprehensive material database and practical applications.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Mass Calculator - Calculate Weight & Density for Any Material</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/other" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Other</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Mass Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <MassCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Mass Calculation</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate mass for any material and shape using our free calculator. Choose from 50+ materials including metals, wood, plastics, and stone. Supports multiple geometric shapes with instant unit conversions to kg, lb, tons, and more.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Fundamental Mass Formula</h3>
          <p className="text-gray-700 mb-4">
            Mass calculation relies on one fundamental principle: mass equals volume multiplied by density. This simple yet powerful formula applies universally to all materials and shapes, making it essential for engineering, manufacturing, construction, shipping, and countless other applications.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-2xl font-mono text-gray-900 mb-4">
              Mass = Volume × Density
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Mass:</strong> Amount of matter in an object (kg, lb)</p>
              <p><strong>Volume:</strong> Three-dimensional space occupied (m³, ft³)</p>
              <p><strong>Density:</strong> Mass per unit volume (kg/m³, lb/ft³)</p>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Understanding the relationship:</strong> Density is a material property representing how tightly matter is packed. Lead has high density (11340 kg/m³)—a small volume has large mass. Foam has low density—large volume has small mass. Volume depends on object dimensions and shape. Mass results from combining these two factors.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Material Density Reference</h3>
          <p className="text-gray-700 mb-4">
            Accurate density values are crucial for mass calculation. Material density varies by composition, grade, temperature, and processing method. Our calculator includes a comprehensive database of common materials:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Metals Density Table</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Material</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">Density (kg/m³)</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">lb/ft³</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Common Uses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Aluminum</td>
                  <td className="px-4 py-3 text-center">2,700</td>
                  <td className="px-4 py-3 text-center">169</td>
                  <td className="px-4 py-3 text-sm">Aircraft, automotive, packaging</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Steel (Carbon)</td>
                  <td className="px-4 py-3 text-center">7,850</td>
                  <td className="px-4 py-3 text-center">490</td>
                  <td className="px-4 py-3 text-sm">Construction, machinery, automotive</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Stainless Steel</td>
                  <td className="px-4 py-3 text-center">8,000</td>
                  <td className="px-4 py-3 text-center">500</td>
                  <td className="px-4 py-3 text-sm">Kitchen, medical, marine</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Copper</td>
                  <td className="px-4 py-3 text-center">8,960</td>
                  <td className="px-4 py-3 text-center">559</td>
                  <td className="px-4 py-3 text-sm">Electrical wiring, plumbing, electronics</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Brass</td>
                  <td className="px-4 py-3 text-center">8,500</td>
                  <td className="px-4 py-3 text-center">531</td>
                  <td className="px-4 py-3 text-sm">Fittings, instruments, decorative</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Lead</td>
                  <td className="px-4 py-3 text-center">11,340</td>
                  <td className="px-4 py-3 text-center">708</td>
                  <td className="px-4 py-3 text-sm">Batteries, radiation shielding, weights</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Titanium</td>
                  <td className="px-4 py-3 text-center">4,500</td>
                  <td className="px-4 py-3 text-center">281</td>
                  <td className="px-4 py-3 text-sm">Aerospace, medical implants, sports</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Wood and Building Materials</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Material</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">Density (kg/m³)</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Oak</td>
                  <td className="px-4 py-3 text-center">750</td>
                  <td className="px-4 py-3 text-sm">Varies with moisture content (600-900)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Pine</td>
                  <td className="px-4 py-3 text-center">550</td>
                  <td className="px-4 py-3 text-sm">Softwood, common construction lumber</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Plywood</td>
                  <td className="px-4 py-3 text-center">550</td>
                  <td className="px-4 py-3 text-sm">Varies by wood species and glue type</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">MDF</td>
                  <td className="px-4 py-3 text-center">750</td>
                  <td className="px-4 py-3 text-sm">Medium Density Fiberboard</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Concrete</td>
                  <td className="px-4 py-3 text-center">2,400</td>
                  <td className="px-4 py-3 text-sm">Standard mix (2200-2500 with reinforcement)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Brick</td>
                  <td className="px-4 py-3 text-center">1,920</td>
                  <td className="px-4 py-3 text-sm">Common red brick</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Volume Calculation by Shape</h3>
          <p className="text-gray-700 mb-4">
            Before calculating mass, you must determine volume. Different geometric shapes use different formulas:
          </p>

          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Rectangular Prism (Box)</h4>
              <p className="font-mono text-blue-600 mb-2">Volume = Length × Width × Height</p>
              <p className="text-sm text-gray-700">Example: 2m × 1m × 0.5m = 1.0 m³</p>
              <p className="text-sm text-gray-600">Most common shape: boxes, beams, plates, panels</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Cylinder</h4>
              <p className="font-mono text-blue-600 mb-2">Volume = π × radius² × height</p>
              <p className="text-sm text-gray-700">Example: π × 0.5² × 2 = 1.571 m³</p>
              <p className="text-sm text-gray-600">Common: pipes, columns, drums, shafts</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Sphere</h4>
              <p className="font-mono text-blue-600 mb-2">Volume = (4/3) × π × radius³</p>
              <p className="text-sm text-gray-700">Example: (4/3) × π × 1³ = 4.189 m³</p>
              <p className="text-sm text-gray-600">Common: balls, tanks, pressure vessels</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Cone</h4>
              <p className="font-mono text-blue-600 mb-2">Volume = (1/3) × π × radius² × height</p>
              <p className="text-sm text-gray-700">Example: (1/3) × π × 1² × 3 = 3.142 m³</p>
              <p className="text-sm text-gray-600">Common: hoppers, funnels, conical tanks</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Hollow Cylinder (Tube)</h4>
              <p className="font-mono text-blue-600 mb-2">Volume = π × (r_outer² - r_inner²) × height</p>
              <p className="text-sm text-gray-700">Example: π × (0.5² - 0.4²) × 2 = 1.131 m³</p>
              <p className="text-sm text-gray-600">Common: pipes, tubes, hollow shafts</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Practical Applications</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Engineering and Manufacturing</h4>
          <p className="text-gray-700 mb-4">
            Engineers use mass calculations throughout design and production: Structural analysis requires knowing component weights for load calculations and stress analysis. Material procurement depends on accurate weight estimates for ordering and budgeting. Transportation logistics requires weight data for crane capacity, vehicle load limits, and shipping costs. Quality control uses weight verification to detect manufacturing defects or material inconsistencies.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Manufacturing example:</strong> A machine shop fabricates a steel cylinder with 50cm diameter (0.25m radius) and 2m length. Volume = π × 0.25² × 2 = 0.393 m³. Steel density = 7850 kg/m³. Mass = 0.393 × 7850 = 3,085 kg (6,800 lbs). This weight determines crane requirements, machining setup, and shipping method.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Construction and Architecture</h4>
          <p className="text-gray-700 mb-4">
            Construction projects rely heavily on mass calculations: Foundation design requires total building weight to prevent settling or failure. Structural support must handle dead loads (permanent structure weight) and live loads (occupants, furniture, snow). Material ordering needs accurate quantities—concrete, steel beams, roofing materials. Transportation and lifting equipment must safely handle component weights.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Construction example:</strong> A concrete column measures 0.4m × 0.4m × 3m. Volume = 0.4 × 0.4 × 3 = 0.48 m³. Concrete density = 2400 kg/m³. Mass = 0.48 × 2400 = 1,152 kg per column. For 20 columns: 23,040 kg total. Add reinforcing steel (approximately 1-2% of concrete weight): 230-460 kg. Total material weight helps plan concrete pour logistics and curing support requirements.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Shipping and Logistics</h4>
          <p className="text-gray-700 mb-4">
            Accurate weight calculation is critical for shipping: Freight costs are calculated by weight (or dimensional weight if larger). Carrier restrictions limit package weight—UPS/FedEx typically 150 lbs max, freight carriers higher. Container loading must not exceed weight limits—standard containers rated 24,000-30,000 kg. Safety regulations require accurate weight documentation to prevent accidents.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Shipping calculation workflow:</strong> Calculate net product weight using our calculator. Add packaging materials—box, pallet, protective materials (typically 5-15% of product weight). Compare actual weight to dimensional weight (Length × Width × Height ÷ 5000 for cm/kg). Use higher value for cost calculation. Add 10% safety margin for documentation. For international shipping, convert to required units and verify against regulatory limits.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Mass vs Weight: Important Distinction</h3>
          <p className="text-gray-700 mb-4">
            Though often used interchangeably in everyday language, mass and weight are fundamentally different physical properties:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-900 mb-2">Mass</h5>
              <ul className="text-sm text-blue-900 space-y-1 list-disc ml-5">
                <li>Amount of matter in object</li>
                <li>Measured in kg, g, lb, oz</li>
                <li>Does NOT change with location</li>
                <li>Intrinsic property of object</li>
                <li>Same everywhere in universe</li>
              </ul>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h5 className="font-semibold text-green-900 mb-2">Weight</h5>
              <ul className="text-sm text-green-900 space-y-1 list-disc ml-5">
                <li>Force of gravity on mass</li>
                <li>Measured in newtons (N), lbf</li>
                <li>Changes with gravity</li>
                <li>Weight = Mass × g</li>
                <li>Varies by location</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Practical example:</strong> An astronaut with 80 kg mass has weight = 80 × 9.81 = 785 newtons on Earth. On the Moon (g = 1.62 m/s²), weight = 80 × 1.62 = 130 newtons—the astronaut feels much lighter. However, mass remains 80 kg in both locations. Inertia (resistance to acceleration) depends on mass, not weight. It is just as difficult to push the 80 kg astronaut on the Moon as on Earth, even though weight differs.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Unit Conversions</h3>
          <p className="text-gray-700 mb-4">
            Our calculator provides automatic conversions between common mass units:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">From</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">To</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Conversion Factor</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Kilograms</td>
                  <td className="px-4 py-3">Grams</td>
                  <td className="px-4 py-3">× 1000</td>
                  <td className="px-4 py-3 text-sm">10 kg = 10,000 g</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Kilograms</td>
                  <td className="px-4 py-3">Pounds</td>
                  <td className="px-4 py-3">× 2.20462</td>
                  <td className="px-4 py-3 text-sm">10 kg = 22.05 lb</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Kilograms</td>
                  <td className="px-4 py-3">Ounces</td>
                  <td className="px-4 py-3">× 35.274</td>
                  <td className="px-4 py-3 text-sm">1 kg = 35.27 oz</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Kilograms</td>
                  <td className="px-4 py-3">Metric Tons</td>
                  <td className="px-4 py-3">÷ 1000</td>
                  <td className="px-4 py-3 text-sm">5000 kg = 5 t</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Kilograms</td>
                  <td className="px-4 py-3">US Tons</td>
                  <td className="px-4 py-3">÷ 907.185</td>
                  <td className="px-4 py-3 text-sm">1000 kg = 1.10 ton</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Pounds</td>
                  <td className="px-4 py-3">Kilograms</td>
                  <td className="px-4 py-3">÷ 2.20462</td>
                  <td className="px-4 py-3 text-sm">100 lb = 45.36 kg</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tips for Accurate Calculations</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Measure carefully:</strong> Small measurement errors compound in volume calculations—a 1% dimension error causes approximately 3% volume error for boxes (L×W×H).</li>
            <li><strong>Use consistent units:</strong> Convert all measurements to meters before calculating volume. Mixing units (feet and inches) creates errors.</li>
            <li><strong>Account for moisture:</strong> Wood and porous materials change density with moisture content. Dry wood is lighter; saturated wood can be 30-50% heavier.</li>
            <li><strong>Consider temperature:</strong> Materials expand with heat, slightly changing density. Significant for precision applications and very large volumes.</li>
            <li><strong>Verify material grade:</strong> Steel types vary—mild steel 7850, tool steel 8000, stainless 8000 kg/m³. Aluminum alloys range 2600-2800 kg/m³.</li>
            <li><strong>Add safety margin:</strong> For shipping and lifting, add 10-15% to calculated weight to account for variations, packaging, and safety.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on mass, density, and material properties:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.engineeringtoolbox.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Engineering ToolBox
              </a> - Comprehensive material properties and engineering data
            </li>
            <li>
              <a href="https://www.matweb.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                MatWeb Material Property Data
              </a> - Extensive database of material properties
            </li>
            <li>
              <a href="https://www.nist.gov/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                NIST (National Institute of Standards and Technology)
              </a> - Official measurement standards and references
            </li>
            <li>
              <a href="https://www.azom.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                AZoM Materials Science
              </a> - Material science articles and property data
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/density-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="font-semibold text-gray-900">Density Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate density from mass and volume</p>
          </a>
          
          <a 
            href="/volume-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-semibold text-gray-900">Volume Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate volume for various shapes</p>
          </a>
          
          <a 
            href="/unit-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between measurement units</p>
          </a>
          
          <a 
            href="/weight-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">Weight Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert weight and mass units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

