import { Metadata } from 'next';
import MolarityCalculator from '@/components/Calculator/MolarityCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Molarity Calculator - Calculate Solution Concentration | AICalculator',
  description: 'Free molarity calculator for chemistry labs. Calculate molarity, mass, volume, and moles. Includes dilution calculator (M1V1=M2V2), compound library, and step-by-step solution preparation guide.',
  keywords: [
    'molarity calculator',
    'molar concentration calculator',
    'chemistry calculator',
    'solution concentration calculator',
    'dilution calculator',
    'M1V1=M2V2 calculator',
    'mol/L calculator',
    'moles calculator',
    'chemistry lab calculator',
    'solution preparation calculator',
    'concentration calculator chemistry',
    'molarity to mass calculator',
    'chemical solution calculator',
    'lab preparation calculator',
    'stoichiometry calculator',
    'molar mass calculator',
    'compound molarity calculator',
    'dilution equation calculator',
    'chemistry molarity problems',
    'solution mixing calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Molarity Calculator - Calculate Solution Concentration',
    description: 'Calculate molarity, dilutions, and solution preparations with our free chemistry calculator. Includes compound library and safety guidelines.',
    type: 'website',
    url: getUrl('/molarity-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('molarity'),
      width: 1200,
      height: 630,
      alt: 'Molarity Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Molarity Calculator - Calculate Solution Concentration',
    description: 'Calculate molarity, dilutions, and solution preparations with our free chemistry calculator. Includes compound library and safety guidelines.',
    images: [getOgImage('molarity')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/molarity-calculator'),
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

export default function MolarityCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/molarity-calculator'),
        name: 'Molarity Calculator',
        url: getUrl('/molarity-calculator'),
        description: 'Free online molarity calculator for chemistry labs. Calculate molarity, mass, volume, moles, and perform dilution calculations with M1V1=M2V2 equation.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate molarity from mass and volume',
          'Solve for mass, volume, or moles',
          'Dilution calculator with M1V1=M2V2',
          'Common compound library with molar masses',
          'Step-by-step solution preparation guide',
          'Safety guidelines and precautions',
          'Unit conversions (L to mL)',
          'Laboratory-grade precision',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/molarity-calculator'),
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
            name: 'Molarity Calculator',
            item: getUrl('/molarity-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/molarity-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is molarity and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Molarity (M) is the concentration of a solution expressed as moles of solute per liter of solution. The formula is: Molarity = moles of solute ÷ liters of solution, or M = n/V. To calculate moles: divide mass (g) by molar mass (g/mol). For example, dissolving 5.844 g of NaCl (molar mass 58.44 g/mol) in 1.0 L gives 0.1 mol ÷ 1.0 L = 0.1 M solution. Molarity depends on temperature since volume changes with temperature. Use at standard lab conditions (20-25°C) for consistency.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I use the dilution equation M1V1 = M2V2?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The dilution equation M1V1 = M2V2 relates initial and final concentrations and volumes. M1 = initial molarity, V1 = initial volume, M2 = final molarity, V2 = final volume. To dilute 10 mL of 1.0 M HCl to 0.1 M: (1.0 M)(10 mL) = (0.1 M)(V2), solving gives V2 = 100 mL. Add the 10 mL stock solution to a flask, then add water to reach 100 mL total. Always add acid to water for safety. The equation assumes additive volumes and no chemical reactions.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between molarity and molality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Molarity (M) is moles per liter of solution (mol/L), temperature-dependent since volume changes with temperature. Molality (m) is moles per kilogram of solvent (mol/kg), temperature-independent since mass does not change. Molarity is more common in lab work because volumes are easier to measure than masses. Use molarity for reactions requiring specific concentrations at a given temperature. Use molality for colligative properties calculations or when temperature varies significantly.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I prepare a solution of specific molarity?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To prepare 1.0 L of 0.1 M NaCl: 1) Calculate mass needed: (0.1 mol/L)(1.0 L)(58.44 g/mol) = 5.844 g. 2) Weigh 5.844 g NaCl on analytical balance. 3) Transfer to 1.0 L volumetric flask. 4) Add distilled water to 3/4 volume, swirl to dissolve. 5) Fill to mark with water. 6) Cap and invert to mix thoroughly. 7) Label with compound, concentration, date, and initials. Always use volumetric flasks for accurate concentrations. Rinse glassware with distilled water before use.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are common mistakes when calculating molarity?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Common errors: 1) Confusing mass (g) with molar mass (g/mol). 2) Using mL instead of L—always convert to liters. 3) Incorrect molar mass calculation—double-check periodic table values. 4) Adding wrong amount of water in dilutions—final volume matters, not added volume. 5) Not accounting for solution density in concentrated acids. 6) Rounding too early—keep extra digits until final answer. 7) Using incorrect volumetric glassware—beakers are not accurate. Always verify units and use proper significant figures.',
            },
          },
          {
            '@type': 'Question',
            name: 'What safety precautions should I take when preparing solutions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Essential safety practices: 1) Wear PPE—lab coat, gloves, safety goggles always. 2) Work in fume hood for volatile or hazardous chemicals. 3) Add acid to water, never reverse—prevents violent exothermic reactions. 4) Read SDS (Safety Data Sheets) before handling chemicals. 5) Use appropriate containers—some chemicals react with plastics. 6) Label all solutions immediately with contents, concentration, date, and hazard warnings. 7) Dispose of chemical waste per institutional guidelines. 8) Have spill kit and emergency eyewash/shower accessible. Never pipette by mouth.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/molarity-calculator'),
        name: 'How to Calculate Molarity and Prepare Solutions',
        description: 'Learn how to calculate molarity, perform dilutions, and prepare chemical solutions safely in the laboratory.',
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Molarity Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Calculation Mode',
            text: 'Choose between Molarity calculation (to find concentration from mass/volume) or Dilution calculation (to dilute stock solutions using M1V1=M2V2).',
            url: getStepUrl('/molarity-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Compound or Enter Molar Mass',
            text: 'Select a compound from the library (15+ common compounds) or manually enter the molar mass in g/mol. The library includes NaCl, HCl, NaOH, glucose, and more.',
            url: getStepUrl('/molarity-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Select What to Solve For',
            text: 'Choose whether to calculate molarity, mass required, volume needed, or number of moles. The calculator will ask for the appropriate input values.',
            url: getStepUrl('/molarity-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Enter Known Values',
            text: 'Input the known values with correct units: mass in grams (g), volume in liters (L), molarity in mol/L (M). Ensure all values are positive numbers.',
            url: getStepUrl('/molarity-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate and Review Results',
            text: 'Click Calculate to see results including molarity, moles, mass, and volume. Review the detailed step-by-step solution preparation instructions.',
            url: getStepUrl('/molarity-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Follow Safety Guidelines',
            text: 'Read and follow all safety precautions provided, including proper PPE, handling procedures, and disposal guidelines for your specific chemicals.',
            url: getStepUrl('/molarity-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/molarity-calculator'),
        headline: 'Complete Guide to Molarity Calculations and Solution Preparation',
        description: 'Comprehensive guide to understanding molarity, performing dilution calculations, and preparing chemical solutions safely in the laboratory.',
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
        image: getOgImage('molarity'),
        articleBody: 'Learn how to calculate molarity, understand solution concentration, perform dilutions with M1V1=M2V2, and prepare laboratory solutions safely.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Molarity Calculator - Calculate Solution Concentration</h1>
      
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
                Molarity Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <MolarityCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Molarity and Solution Concentration</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Molarity (M) is the concentration of a solution expressed as moles of solute per liter of solution. Our free calculator helps you calculate molarity, perform dilutions using M1V1=M2V2, and prepare laboratory solutions with step-by-step instructions and safety guidelines.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Molarity?</h3>
          <p className="text-gray-700 mb-4">
            Molarity, denoted as M, is the most common way to express solution concentration in chemistry. It represents the number of moles of solute dissolved in one liter of solution. The formula is straightforward: <strong>Molarity (M) = moles of solute / liters of solution</strong>, or mathematically, M = n/V.
          </p>
          <p className="text-gray-700 mb-4">
            Understanding molarity is crucial for laboratory work, chemical reactions, and stoichiometry calculations. Unlike other concentration measures, molarity directly relates to the number of molecules or ions in solution, making it ideal for predicting reaction outcomes and calculating reagent quantities.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Key characteristics of molarity:</strong> It is temperature-dependent because volume changes with temperature (liquids expand when heated). For precise work, solutions should be prepared and measured at a standard temperature, typically 20-25°C (room temperature). Molarity is always expressed with the unit M (molar), where 1 M = 1 mol/L.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Calculate Molarity</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Basic Molarity Formula</h4>
          <p className="text-gray-700 mb-4">
            The fundamental formula for molarity is:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-xl font-mono text-gray-900">
              M = n / V
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              where M = molarity (mol/L), n = moles of solute (mol), V = volume of solution (L)
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            Since moles are calculated from mass and molar mass, the expanded formula is:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-xl font-mono text-gray-900">
              M = (mass in g) / (molar mass in g/mol × volume in L)
            </p>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step-by-Step Calculation Example</h4>
          <p className="text-gray-700 mb-4">
            <strong>Problem:</strong> Calculate the molarity of a solution prepared by dissolving 5.844 g of sodium chloride (NaCl) in water to make 1.0 L of solution.
          </p>
          
          <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
            <li>
              <strong>Find the molar mass of NaCl:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Na (sodium): 22.99 g/mol</li>
                <li>Cl (chlorine): 35.45 g/mol</li>
                <li>Molar mass of NaCl = 22.99 + 35.45 = 58.44 g/mol</li>
              </ul>
            </li>
            <li>
              <strong>Calculate moles of NaCl:</strong>
              <p className="mt-2">moles = mass / molar mass = 5.844 g / 58.44 g/mol = 0.1 mol</p>
            </li>
            <li>
              <strong>Calculate molarity:</strong>
              <p className="mt-2">M = moles / volume = 0.1 mol / 1.0 L = 0.1 M</p>
            </li>
            <li>
              <strong>Answer:</strong>
              <p className="mt-2 font-semibold">The solution is 0.1 M (or 0.1 molar) NaCl.</p>
            </li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Dilution Calculations: M1V1 = M2V2</h3>
          <p className="text-gray-700 mb-4">
            Dilution is the process of reducing solution concentration by adding more solvent. The dilution equation M1V1 = M2V2 is one of the most important formulas in chemistry labs.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Understanding the Dilution Equation</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-xl font-mono text-gray-900 mb-4">
              M₁V₁ = M₂V₂
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>• M₁ = initial (stock) molarity before dilution</p>
              <p>• V₁ = initial volume of stock solution used</p>
              <p>• M₂ = final molarity after dilution</p>
              <p>• V₂ = final total volume after dilution</p>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Key principle:</strong> The number of moles stays constant during dilution—you are not changing the amount of solute, only the volume of solution. Therefore, n₁ = n₂, which leads to M₁V₁ = M₂V₂.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Dilution Calculation Example</h4>
          <p className="text-gray-700 mb-4">
            <strong>Problem:</strong> How would you prepare 500 mL of 0.1 M HCl from a 1.0 M HCl stock solution?
          </p>
          
          <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
            <li>
              <strong>Identify known values:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>M₁ = 1.0 M (stock concentration)</li>
                <li>M₂ = 0.1 M (desired concentration)</li>
                <li>V₂ = 500 mL = 0.5 L (desired final volume)</li>
                <li>V₁ = ? (volume of stock solution needed)</li>
              </ul>
            </li>
            <li>
              <strong>Apply M₁V₁ = M₂V₂:</strong>
              <p className="mt-2">(1.0 M)(V₁) = (0.1 M)(0.5 L)</p>
            </li>
            <li>
              <strong>Solve for V₁:</strong>
              <p className="mt-2">V₁ = (0.1 M × 0.5 L) / 1.0 M = 0.05 L = 50 mL</p>
            </li>
            <li>
              <strong>Preparation instructions:</strong>
              <p className="mt-2">Measure 50 mL of 1.0 M HCl stock solution, transfer to a 500 mL volumetric flask, add water to the 500 mL mark. <strong>Always add acid to water, never water to acid</strong>, to prevent dangerous splashing and heat generation.</p>
            </li>
          </ol>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <span>⚠️</span> Critical Safety Note for Acid Dilutions
            </h4>
            <p className="text-sm text-amber-900">
              When diluting concentrated acids (especially H₂SO₄, HCl, HNO₃), <strong>ALWAYS add acid to water, NEVER add water to acid</strong>. Adding water to concentrated acid causes violent boiling and splashing due to intense heat release. Use the mnemonic: "Do as you oughta, add acid to water." Work in a fume hood, wear full PPE, and add acid slowly with constant stirring.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Solution Preparation: Laboratory Best Practices</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Equipment and Glassware</h4>
          <p className="text-gray-700 mb-4">
            <strong>Essential equipment for accurate molarity preparation:</strong>
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Volumetric flasks:</strong> Most accurate for final volume (±0.1% tolerance). Available in sizes from 10 mL to 2 L. Always use the flask size closest to your desired volume.</li>
            <li><strong>Analytical balance:</strong> Weigh solids to 0.001 g (mg) precision. Calibrate regularly. Use weighing boats or paper to avoid contaminating the balance pan.</li>
            <li><strong>Graduated cylinders:</strong> For measuring approximate volumes (±1% tolerance). Not suitable for preparing molar solutions—use only for non-critical measurements.</li>
            <li><strong>Pipettes (volumetric or micropipettes):</strong> For transferring precise volumes of stock solutions during dilutions. Volumetric pipettes: ±0.1% tolerance.</li>
            <li><strong>Beakers:</strong> For initial dissolution and mixing, but never for measuring final volumes. Beaker markings are approximate (±5% error).</li>
            <li><strong>Stirring equipment:</strong> Magnetic stirrer with stir bar, or glass stirring rod. Ensure complete dissolution before transferring to volumetric flask.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step-by-Step Solution Preparation Protocol</h4>
          <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
            <li>
              <strong>Calculate the required mass of solute:</strong>
              <p className="mt-1">Use the formula: mass (g) = Molarity (mol/L) × Volume (L) × Molar mass (g/mol). Double-check your calculation before proceeding.</p>
            </li>
            <li>
              <strong>Weigh the solute accurately:</strong>
              <p className="mt-1">Zero the balance with weighing paper/boat. Add solute until you reach the calculated mass ±0.001 g. Record the actual mass used for precise calculation.</p>
            </li>
            <li>
              <strong>Initial dissolution:</strong>
              <p className="mt-1">Transfer solute to a clean beaker. Add approximately 50-100 mL distilled/deionized water. Stir gently until completely dissolved. Some compounds dissolve slowly—be patient.</p>
            </li>
            <li>
              <strong>Transfer to volumetric flask:</strong>
              <p className="mt-1">Use a funnel to transfer the solution from beaker to volumetric flask. Rinse the beaker 3-4 times with small portions of distilled water, adding rinse water to the flask. This ensures quantitative transfer.</p>
            </li>
            <li>
              <strong>Fill to approximately 3/4 volume:</strong>
              <p className="mt-1">Add distilled water to about 75% of the flask capacity. Swirl gently to ensure thorough mixing. This preliminary mixing prevents stratification.</p>
            </li>
            <li>
              <strong>Fill to the mark:</strong>
              <p className="mt-1">Carefully add distilled water dropwise using a pipette or wash bottle until the bottom of the meniscus aligns with the calibration mark. View at eye level to avoid parallax error.</p>
            </li>
            <li>
              <strong>Final mixing:</strong>
              <p className="mt-1">Stopper the flask. Invert 15-20 times to ensure complete homogenization. Hold the stopper securely while inverting. Solution should appear uniform with no concentration gradients.</p>
            </li>
            <li>
              <strong>Labeling:</strong>
              <p className="mt-1">Label with: chemical name and formula, molarity, date of preparation, preparer initials, and any hazard warnings (corrosive, toxic, flammable, etc.). Use permanent marker or waterproof labels.</p>
            </li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Compounds and Their Molar Masses</h3>
          <p className="text-gray-700 mb-4">
            Frequently used laboratory chemicals with their formulas and molar masses:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Compound Name</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Formula</th>
                  <th className="px-4 py-3 text-right font-semibold border-b">Molar Mass (g/mol)</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Sodium Chloride</td>
                  <td className="px-4 py-3 font-mono">NaCl</td>
                  <td className="px-4 py-3 text-right">58.44</td>
                  <td className="px-4 py-3">Salt</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Hydrochloric Acid</td>
                  <td className="px-4 py-3 font-mono">HCl</td>
                  <td className="px-4 py-3 text-right">36.46</td>
                  <td className="px-4 py-3">Acid</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Sulfuric Acid</td>
                  <td className="px-4 py-3 font-mono">H₂SO₄</td>
                  <td className="px-4 py-3 text-right">98.08</td>
                  <td className="px-4 py-3">Acid</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Sodium Hydroxide</td>
                  <td className="px-4 py-3 font-mono">NaOH</td>
                  <td className="px-4 py-3 text-right">40.00</td>
                  <td className="px-4 py-3">Base</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Glucose</td>
                  <td className="px-4 py-3 font-mono">C₆H₁₂O₆</td>
                  <td className="px-4 py-3 text-right">180.16</td>
                  <td className="px-4 py-3">Organic</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Acetic Acid</td>
                  <td className="px-4 py-3 font-mono">CH₃COOH</td>
                  <td className="px-4 py-3 text-right">60.05</td>
                  <td className="px-4 py-3">Acid</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Potassium Chloride</td>
                  <td className="px-4 py-3 font-mono">KCl</td>
                  <td className="px-4 py-3 text-right">74.55</td>
                  <td className="px-4 py-3">Salt</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Calcium Chloride</td>
                  <td className="px-4 py-3 font-mono">CaCl₂</td>
                  <td className="px-4 py-3 text-right">110.98</td>
                  <td className="px-4 py-3">Salt</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Ethanol</td>
                  <td className="px-4 py-3 font-mono">C₂H₅OH</td>
                  <td className="px-4 py-3 text-right">46.07</td>
                  <td className="px-4 py-3">Organic</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Sodium Bicarbonate</td>
                  <td className="px-4 py-3 font-mono">NaHCO₃</td>
                  <td className="px-4 py-3 text-right">84.01</td>
                  <td className="px-4 py-3">Salt</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Molarity vs. Other Concentration Units</h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Unit</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Definition</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">When to Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-semibold">Molarity (M)</td>
                  <td className="px-4 py-3">moles solute / liters solution</td>
                  <td className="px-4 py-3">Most laboratory work, reactions at constant temperature</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Molality (m)</td>
                  <td className="px-4 py-3">moles solute / kg solvent</td>
                  <td className="px-4 py-3">Colligative properties, temperature-varying conditions</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Mass Percent (%)</td>
                  <td className="px-4 py-3">(mass solute / mass solution) × 100</td>
                  <td className="px-4 py-3">Commercial products, food chemistry</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Parts Per Million (ppm)</td>
                  <td className="px-4 py-3">mg solute / L solution (for dilute aqueous)</td>
                  <td className="px-4 py-3">Environmental samples, trace analysis</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Normality (N)</td>
                  <td className="px-4 py-3">equivalents / liter</td>
                  <td className="px-4 py-3">Acid-base titrations (being phased out)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Comprehensive Safety Guidelines</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Protective Equipment (PPE)</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Safety goggles:</strong> ANSI Z87.1 approved goggles or safety glasses with side shields. Regular prescription glasses are NOT sufficient. Wear at all times in lab, even when not actively working.</li>
            <li><strong>Lab coat:</strong> 100% cotton or flame-resistant material, knee-length, fully buttoned. Protects skin and clothing from chemical splashes. Do not wear outside the lab to avoid contaminating public spaces.</li>
            <li><strong>Gloves:</strong> Nitrile gloves for most chemicals (resistant to many solvents and acids). Latex for biological work. Change gloves between tasks and after contamination. Check for tears before use.</li>
            <li><strong>Closed-toe shoes:</strong> Leather or synthetic, covering entire foot. No sandals, Crocs, or canvas shoes. Chemical-resistant shoe covers for highly hazardous work.</li>
            <li><strong>Long pants:</strong> Full-length pants (no shorts, skirts, or dresses). Natural fibers preferred as synthetics can melt if exposed to flames.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Chemical Handling Safety</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Read SDS before use:</strong> Safety Data Sheets provide hazard information, handling procedures, first aid, and disposal. Available online or from chemical supplier. Know the hazards BEFORE opening the bottle.</li>
            <li><strong>Work in fume hood:</strong> Use for volatile, toxic, or odorous chemicals. Ensure hood is functioning (check flow indicator). Keep sash at proper height (usually marked). Do not block vents with equipment.</li>
            <li><strong>Never pipette by mouth:</strong> Always use pipette bulbs, pumps, or electronic pipettors. Mouth pipetting risks ingestion, inhalation, and chemical burns.</li>
            <li><strong>Label everything immediately:</strong> Unlabeled containers are extremely dangerous. Include contents, concentration, date, hazards, and preparer name. Use waterproof labels and permanent markers.</li>
            <li><strong>Transport safely:</strong> Use secondary containment (bottle carriers, buckets). Hold bottles by the body, not the cap. Transport only small quantities—make multiple trips if necessary.</li>
            <li><strong>Maintain clean workspace:</strong> Clean spills immediately. Keep work area organized. Store chemicals properly (acids separate from bases, flammables in approved cabinets).</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Specific Chemical Hazards</h4>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-red-900 mb-3">Concentrated Acids (HCl, H₂SO₄, HNO₃)</h5>
            <ul className="text-sm text-red-900 space-y-1 list-disc ml-6">
              <li>Corrosive: Causes severe chemical burns on contact</li>
              <li>Always add acid to water, NEVER reverse</li>
              <li>Work in fume hood—vapors are corrosive and toxic</li>
              <li>H₂SO₄ reacts violently with water (extremely exothermic)</li>
              <li>Wear acid-resistant gloves and face shield for concentrated forms</li>
              <li>Neutralize spills with sodium bicarbonate before cleaning</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-amber-900 mb-3">Strong Bases (NaOH, KOH)</h5>
            <ul className="text-sm text-amber-900 space-y-1 list-disc ml-6">
              <li>Corrosive: Causes deep, painful burns and tissue damage</li>
              <li>Especially dangerous to eyes—can cause permanent blindness</li>
              <li>Solid pellets are hygroscopic—absorb water from air and skin</li>
              <li>Dissolving NaOH in water generates significant heat</li>
              <li>Rinse any skin contact immediately with copious water for 15+ minutes</li>
              <li>Neutralize spills with dilute acetic acid or citric acid</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-blue-900 mb-3">Organic Solvents (Ethanol, Acetone, Methanol)</h5>
            <ul className="text-sm text-blue-900 space-y-1 list-disc ml-6">
              <li>Flammable: Keep away from heat, sparks, and open flames</li>
              <li>Volatile: Work in fume hood to avoid inhalation</li>
              <li>Methanol is toxic—can cause blindness and death if ingested</li>
              <li>Store in approved flammable storage cabinet</li>
              <li>Use spark-proof equipment in areas where vapors may accumulate</li>
              <li>Dispose in designated solvent waste containers, never down drain</li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Emergency Procedures</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Chemical in eyes:</strong> Immediately go to eyewash station. Hold eyes open and rinse continuously for 15+ minutes. Seek medical attention immediately, even if pain subsides.</li>
            <li><strong>Chemical on skin:</strong> Remove contaminated clothing. Rinse affected area under safety shower or sink for 15+ minutes. For burns, seek medical attention after rinsing.</li>
            <li><strong>Chemical spill:</strong> Alert others. Small spills (less than 100 mL): Clean with spill kit. Large spills: Evacuate area, close doors, contact environmental health and safety. Never attempt to clean large spills alone.</li>
            <li><strong>Fire:</strong> Evacuate if fire is large or spreading. Use appropriate extinguisher for small fires (ABC for most labs). Know location of fire extinguishers, fire blankets, and exits.</li>
            <li><strong>Ingestion:</strong> Do NOT induce vomiting. Rinse mouth with water. Call poison control (1-800-222-1222 in US). Seek immediate medical attention. Bring chemical SDS if possible.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Mistakes and How to Avoid Them</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculation Errors</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Unit confusion:</strong> Always convert mL to L before calculating molarity. 500 mL = 0.5 L, not 500 L. Write units in every calculation step to catch errors.</li>
            <li><strong>Mass vs. molar mass:</strong> Mass (g) is what you weigh; molar mass (g/mol) is from the periodic table. Do not confuse them. Moles = mass / molar mass.</li>
            <li><strong>Rounding too early:</strong> Keep at least 4 significant figures in intermediate calculations. Round only the final answer to appropriate sig figs based on input precision.</li>
            <li><strong>Incorrect molar mass:</strong> Double-check periodic table values. Common error: Using atomic number instead of atomic mass. Na is 22.99 g/mol, not 11 g/mol.</li>
            <li><strong>Wrong volume in dilution:</strong> V₂ is the FINAL total volume, not the volume of water added. If diluting 10 mL to 100 mL, V₂ = 100 mL, and you add 90 mL water.</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Technique Errors</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Using wrong glassware:</strong> Beakers and Erlenmeyer flasks are NOT accurate for measuring volumes. Use only volumetric flasks, pipettes, or graduated cylinders for volumetric measurements.</li>
            <li><strong>Incomplete dissolution:</strong> Some compounds dissolve slowly. Heat gently if necessary (and safe for the compound). Stir thoroughly. Undissolved solid means incorrect concentration.</li>
            <li><strong>Temperature effects:</strong> Preparing solutions at different temperatures than used affects accuracy. Allow solutions to reach room temperature before final dilution. Exothermic dissolution (e.g., NaOH) requires cooling before filling to mark.</li>
            <li><strong>Contaminated water:</strong> Use distilled or deionized water, not tap water. Tap water minerals alter concentration and can cause unwanted reactions. Check water purity with conductivity meter.</li>
            <li><strong>Parallax error:</strong> When reading volumetric glassware, eye level must be at the meniscus. Reading from above or below introduces measurement error (up to ±0.5 mL).</li>
            <li><strong>Not mixing thoroughly:</strong> Solutions can stratify (denser liquid settles). After filling to mark, stopper and invert at least 15 times. Check for uniform color/appearance before using.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Advanced Topics</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Temperature Dependence of Molarity</h4>
          <p className="text-gray-700 mb-4">
            Molarity changes with temperature because liquid volume expands or contracts. For water-based solutions, volume increases approximately 0.02% per °C. A 1.0 M solution at 20°C becomes approximately 0.998 M at 25°C. For high-precision work, prepare and store solutions at constant temperature (usually 20°C or 25°C). Temperature-sensitive applications should use molality (temperature-independent) instead of molarity.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Density Corrections for Concentrated Solutions</h4>
          <p className="text-gray-700 mb-4">
            When preparing solutions from concentrated liquid reagents (like concentrated HCl or H₂SO₄), you must account for solution density. Concentrated HCl is typically 37% by weight with density 1.19 g/mL (approximately 12 M). To prepare 1.0 L of 1.0 M HCl: Calculate volume needed using M₁V₁ = M₂V₂: (12 M)(V₁) = (1 M)(1 L), so V₁ = 83 mL. Measure 83 mL concentrated HCl, add slowly to 800 mL water in beaker, then dilute to 1 L in volumetric flask.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Preparing Buffer Solutions</h4>
          <p className="text-gray-700 mb-4">
            Buffers require specific ratios of weak acid and conjugate base (or weak base and conjugate acid). Use the Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA]). For example, to prepare pH 7.4 phosphate buffer: Mix calculated amounts of Na₂HPO₄ (base form) and NaH₂PO₄ (acid form) based on desired ratio. Molarity calculations apply to each component separately. Verify final pH with calibrated pH meter. Adjust with small additions of acid or base if necessary.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Quality Control and Standardization</h3>
          <p className="text-gray-700 mb-4">
            Prepared solutions may not be exactly the calculated concentration due to:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Hygroscopic compounds:</strong> Absorb water from air during weighing (e.g., NaOH, KOH). Weigh quickly in closed containers when possible.</li>
            <li><strong>Hydrated salts:</strong> Water of crystallization affects molar mass. CuSO₄·5H₂O (249.68 g/mol) vs. CuSO₄ (159.61 g/mol). Use correct hydrated formula.</li>
            <li><strong>Impurities:</strong> Reagent-grade chemicals are 95-99% pure. ACS grade or higher recommended for precise work. Check bottle label for actual purity.</li>
            <li><strong>Volatile components:</strong> Concentrated ammonia and HCl lose vapor during storage, reducing concentration over time. Purchase fresh reagents regularly.</li>
          </ul>

          <p className="text-gray-700 mb-4">
            <strong>Standardization:</strong> For critical applications, standardize solutions against primary standards (highly pure, stable compounds). For example, standardize NaOH solution by titrating against potassium hydrogen phthalate (KHP). Calculate actual molarity from titration data. Label bottle with standardized value and date.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on solution chemistry and laboratory techniques:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.nist.gov/pml/weights-and-measures" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                NIST Weights and Measures
              </a> - Official measurement standards and reference data for laboratory measurements
            </li>
            <li>
              <a href="https://pubchem.ncbi.nlm.nih.gov/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                PubChem Database
              </a> - Comprehensive chemical information including molar masses and properties
            </li>
            <li>
              <a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1450" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                OSHA Laboratory Safety Standards
              </a> - Official laboratory safety regulations and requirements
            </li>
            <li>
              <a href="https://www.acs.org/content/acs/en/chemical-safety.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                American Chemical Society Safety Resources
              </a> - Chemical safety guidelines and educational materials
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/molecular-weight-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🧬</div>
            <h3 className="font-semibold text-gray-900">Molecular Weight Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate molecular weight from formulas</p>
          </a>
          
          <a 
            href="/dilution-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💧</div>
            <h3 className="font-semibold text-gray-900">Dilution Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate dilutions using M1V1=M2V2</p>
          </a>
          
          <a 
            href="/concentration-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚗️</div>
            <h3 className="font-semibold text-gray-900">Concentration Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between concentration units</p>
          </a>
          
          <a 
            href="/chemistry-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Chemistry Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">General chemistry calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}

