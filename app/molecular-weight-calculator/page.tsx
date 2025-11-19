import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import MolecularWeightCalculator from '@/components/Calculator/MolecularWeightCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Molecular Weight Calculator - Calculate Molar Mass & Composition | AICalculator',
  description: 'Free molecular weight calculator for chemistry. Calculate molar mass, elemental composition, and mass percentages. Supports complex formulas with parentheses. Includes common compounds database.',
  keywords: [
    'molecular weight calculator',
    'molar mass calculator',
    'molecular mass calculator',
    'formula weight calculator',
    'molecular formula calculator',
    'elemental composition calculator',
    'mass percent calculator',
    'chemistry calculator',
    'stoichiometry calculator',
    'molecular weight formula',
    'calculate molar mass',
    'chemical formula calculator',
    'molecular mass calculation',
    'compound weight calculator',
    'element composition',
    'mole calculator',
    'chemistry molar mass',
    'molecular weight determination',
    'formula mass calculator',
    'chemical compound calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Molecular Weight Calculator - Calculate Molar Mass & Composition',
    description: 'Calculate molecular weight and elemental composition for any chemical formula. Supports complex formulas with parentheses. Free chemistry calculator.',
    type: 'website',
    url: getUrl('/molecular-weight-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('molecular-weight'),
      width: 1200,
      height: 630,
      alt: 'Molecular Weight Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Molecular Weight Calculator - Calculate Molar Mass & Composition',
    description: 'Calculate molecular weight and elemental composition for any chemical formula. Supports complex formulas with parentheses. Free chemistry calculator.',
    images: [getOgImage('molecular-weight')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/molecular-weight-calculator'),
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

export default function MolecularWeightCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/molecular-weight-calculator'),
        name: 'Molecular Weight Calculator',
        url: getUrl('/molecular-weight-calculator'),
        description: 'Free molecular weight calculator for calculating molar mass and elemental composition of chemical compounds. Supports complex formulas with parentheses and nested structures.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate molecular weight from formula',
          'Elemental composition analysis',
          'Mass percentage calculation',
          'Support for complex formulas with parentheses',
          'Common compounds database',
          'Automatic formula parsing',
          'Visual composition breakdown',
          'Stoichiometry information',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/molecular-weight-calculator'),
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
            name: 'Molecular Weight Calculator',
            item: getUrl('/molecular-weight-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/molecular-weight-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you calculate molecular weight from a chemical formula?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Molecular weight is calculated by summing the atomic weights of all atoms in a formula. For example, water (H2O) contains 2 hydrogen atoms (2 × 1.008 = 2.016) and 1 oxygen atom (16.00), giving a molecular weight of 18.016 g/mol. For complex formulas with parentheses like Ca(OH)2, first expand the parentheses: Ca + 2O + 2H, then multiply each element by its atomic weight and sum: 40.08 + (2 × 16.00) + (2 × 1.008) = 74.096 g/mol. The molecular weight equals the molar mass and represents the mass in grams of one mole (6.022 × 10²³ molecules) of the substance.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between molecular weight and molar mass?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Molecular weight and molar mass are numerically identical but conceptually different. Molecular weight is a dimensionless ratio comparing the mass of a molecule to one-twelfth the mass of a carbon-12 atom. Molar mass is the mass of one mole of substance, expressed in g/mol. For practical chemistry calculations, both terms are used interchangeably with the same numerical value. For example, water has a molecular weight of 18.016 (dimensionless) and a molar mass of 18.016 g/mol. In laboratory work and stoichiometry, molar mass is the preferred term because it includes units necessary for conversion calculations between mass and moles.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you handle parentheses in chemical formulas?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Parentheses indicate that everything inside must be multiplied by the subscript outside. For Ca(OH)2, the OH group appears twice, so expand to Ca + 2O + 2H. For nested parentheses like Al2(SO4)3, multiply from inside out: each SO4 contains 1 S and 4 O, multiplied by 3 gives 3 S and 12 O, plus 2 Al. The molecular weight is (2 × 26.98) + (3 × 32.07) + (12 × 16.00) = 342.17 g/mol. Multiple parentheses work the same way: Ca3(PO4)2 expands to 3 Ca + 2 P + 8 O. Always multiply subscripts inside parentheses by the subscript outside before calculating total weight.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is molecular weight used in stoichiometry calculations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Molecular weight (molar mass) is the conversion factor between mass and moles in stoichiometry. To convert grams to moles, divide mass by molecular weight: moles = mass (g) ÷ molar mass (g/mol). To convert moles to grams, multiply: mass = moles × molar mass. For example, 36 grams of water: 36 g ÷ 18.016 g/mol = 2.0 moles. In balanced chemical equations, molar mass enables mass-to-mass conversions: if 2H2 + O2 → 2H2O, and you start with 4 g H2 (2 moles), you will produce 2 moles H2O = 2 × 18.016 = 36 g water. Molecular weight is essential for determining limiting reagents, theoretical yields, and percent yields.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you calculate mass percent composition from molecular weight?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mass percent of an element equals (total mass of that element ÷ molecular weight) × 100%. For glucose C6H12O6 (molecular weight 180.16 g/mol): Carbon = (6 × 12.01) ÷ 180.16 × 100% = 40.00% C. Hydrogen = (12 × 1.008) ÷ 180.16 × 100% = 6.71% H. Oxygen = (6 × 16.00) ÷ 180.16 × 100% = 53.29% O. Total must equal 100%. Mass percent helps identify unknown compounds, verify purity, and design chemical processes. For hydrated compounds like CuSO4·5H2O, calculate water content: (5 × 18.016) ÷ 249.69 × 100% = 36.08% water.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where can I find reliable atomic weights for calculations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Authoritative atomic weights are published by IUPAC (International Union of Pure and Applied Chemistry) and updated periodically. The most reliable sources are the IUPAC periodic table, NIST (National Institute of Standards and Technology) WebBook, and CRC Handbook of Chemistry and Physics. Standard atomic weights represent weighted averages of naturally occurring isotopes: carbon-12 and carbon-13 average to 12.01 amu. Our calculator uses IUPAC 2021 standard atomic weights rounded to appropriate significant figures. For precise research calculations requiring more decimal places or specific isotope masses, consult NIST or IUPAC official publications at iupac.org or nist.gov.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/molecular-weight-calculator'),
        name: 'How to Calculate Molecular Weight from a Chemical Formula',
        description: 'Learn how to calculate molecular weight and determine elemental composition for any chemical compound using our molecular weight calculator.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Molecular Weight Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Chemical Formula',
            text: 'Type the molecular formula of your compound in standard chemical notation. Use capital letters for elements (e.g., H, C, O), subscript numbers for atom counts (e.g., H2O, C6H12O6), and parentheses for groups (e.g., Ca(OH)2, Al2(SO4)3). The calculator automatically parses the formula.',
            url: getStepUrl('/molecular-weight-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Or Select from Common Compounds',
            text: 'Browse the built-in database of 18+ common compounds including water, glucose, acids, bases, and organic molecules. Use the search function to filter by name, formula, or category. Click any compound to automatically load its formula.',
            url: getStepUrl('/molecular-weight-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Molecular Weight',
            text: 'Click the Calculate button or press Enter to process the formula. The calculator parses the formula, identifies all elements, counts atoms (including those in parentheses), retrieves atomic weights from the IUPAC periodic table, and computes the total molecular weight.',
            url: getStepUrl('/molecular-weight-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Review Molecular Weight Result',
            text: 'The calculator displays the molecular weight in g/mol with three decimal places. This value represents the mass of one mole (6.022 × 10²³ molecules) of the substance and is identical to the molar mass used in stoichiometry calculations.',
            url: getStepUrl('/molecular-weight-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Analyze Elemental Composition',
            text: 'View the detailed breakdown table showing each element, atom count, atomic weight, total mass contribution, and mass percentage. The pie chart visualizes the mass distribution, making it easy to identify major constituent elements.',
            url: getStepUrl('/molecular-weight-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Use Results for Calculations',
            text: 'Apply the molecular weight to stoichiometry: convert between mass and moles (moles = grams ÷ molecular weight), calculate theoretical yields, determine limiting reagents, or find empirical formulas from percent composition. Export results or share the calculation.',
            url: getStepUrl('/molecular-weight-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/molecular-weight-calculator'),
        headline: 'Complete Guide to Molecular Weight Calculation: Formulas, Methods, and Applications',
        description: 'Comprehensive guide to calculating molecular weight from chemical formulas, understanding elemental composition, and applying molar mass in chemistry calculations.',
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
        image: getOgImage('molecular-weight'),
        articleBody: 'Learn how to calculate molecular weight for any chemical compound, determine elemental composition, and apply molar mass in stoichiometry calculations.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Molecular Weight Calculator - Calculate Molar Mass & Composition</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Molecular Weight Calculator"
        calculatorUrl="/molecular-weight-calculator"
      />

      {/* Calculator Component */}
      <MolecularWeightCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Molecular Weight Calculation</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Calculate molecular weight for any chemical formula by summing atomic weights of all constituent atoms. Our free calculator supports complex formulas with parentheses, provides detailed elemental composition analysis, and includes a database of common compounds. Essential for chemistry students, researchers, and laboratory professionals.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What is Molecular Weight?</h3>
          <p className="text-gray-700 mb-4">
            Molecular weight (also called molecular mass or relative molecular mass) represents the sum of atomic weights of all atoms in a molecule. It is expressed in atomic mass units (amu) or unified atomic mass units (u), but more commonly in grams per mole (g/mol) when referred to as molar mass. These terms are numerically identical and often used interchangeably in chemistry.
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Fundamental relationship:</strong> One mole of any substance contains Avogadro's number (6.022 × 10²³) of molecules. The molecular weight in grams equals the mass of one mole of that substance. For example, water (H2O) has a molecular weight of 18.016, meaning 18.016 grams of water contains exactly 6.022 × 10²³ water molecules.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-2xl font-mono text-gray-900 mb-4">
              Molecular Weight = Σ (Number of atoms × Atomic weight)
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Molecular Weight:</strong> Sum of all atomic weights in formula</p>
              <p><strong>Atomic Weight:</strong> Average mass of element's isotopes (from periodic table)</p>
              <p><strong>Number of atoms:</strong> Count from subscripts in chemical formula</p>
              <p><strong>Units:</strong> amu (atomic mass units) or g/mol (grams per mole)</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Step-by-Step Calculation Method</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Simple Formulas Without Parentheses</h4>
          <p className="text-gray-700 mb-4">
            For straightforward formulas like H2O or CO2, identify each element and its subscript (number of atoms), then multiply by the atomic weight:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="font-semibold text-blue-900 mb-2">Example: Water (H2O)</p>
            <ul className="list-disc pl-6 text-blue-900 text-sm space-y-1">
              <li>Hydrogen (H): 2 atoms × 1.008 amu = 2.016 amu</li>
              <li>Oxygen (O): 1 atom × 16.00 amu = 16.00 amu</li>
              <li><strong>Total Molecular Weight: 2.016 + 16.00 = 18.016 amu (or g/mol)</strong></li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <p className="font-semibold text-green-900 mb-2">Example: Glucose (C6H12O6)</p>
            <ul className="list-disc pl-6 text-green-900 text-sm space-y-1">
              <li>Carbon (C): 6 atoms × 12.01 amu = 72.06 amu</li>
              <li>Hydrogen (H): 12 atoms × 1.008 amu = 12.096 amu</li>
              <li>Oxygen (O): 6 atoms × 16.00 amu = 96.00 amu</li>
              <li><strong>Total: 72.06 + 12.096 + 96.00 = 180.156 amu</strong></li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Complex Formulas With Parentheses</h4>
          <p className="text-gray-700 mb-4">
            Parentheses indicate groups of atoms that appear multiple times. Multiply everything inside parentheses by the subscript outside:
          </p>

          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Example: Calcium Hydroxide Ca(OH)2</h5>
              <p className="text-sm text-gray-700 mb-2"><strong>Step 1:</strong> Expand the parentheses: Ca + (OH) × 2 = Ca + 2O + 2H</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Step 2:</strong> Count atoms: 1 Ca, 2 O, 2 H</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Step 3:</strong> Calculate:</p>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 mb-2">
                <li>Ca: 1 × 40.08 = 40.08</li>
                <li>O: 2 × 16.00 = 32.00</li>
                <li>H: 2 × 1.008 = 2.016</li>
              </ul>
              <p className="text-sm font-bold text-blue-700">Total: 40.08 + 32.00 + 2.016 = 74.096 g/mol</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Example: Aluminum Sulfate Al2(SO4)3</h5>
              <p className="text-sm text-gray-700 mb-2"><strong>Step 1:</strong> Expand: 2 Al + (SO4) × 3 = 2 Al + 3 S + 12 O</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Step 2:</strong> Calculate:</p>
              <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 mb-2">
                <li>Al: 2 × 26.98 = 53.96</li>
                <li>S: 3 × 32.07 = 96.21</li>
                <li>O: 12 × 16.00 = 192.00</li>
              </ul>
              <p className="text-sm font-bold text-blue-700">Total: 53.96 + 96.21 + 192.00 = 342.17 g/mol</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Elemental Composition and Mass Percent</h3>
          <p className="text-gray-700 mb-4">
            Elemental composition describes the percentage by mass of each element in a compound. This information is crucial for analytical chemistry, identifying unknown substances, and quality control in manufacturing.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-center text-xl font-mono text-gray-900 mb-4">
              Mass Percent = (Element's Total Mass ÷ Molecular Weight) × 100%
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Example: Glucose (C6H12O6) with molecular weight 180.156 g/mol:</strong>
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Element</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">Atoms</th>
                  <th className="px-4 py-3 text-right font-semibold border-b">Total Mass (amu)</th>
                  <th className="px-4 py-3 text-right font-semibold border-b">Mass Percent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Carbon (C)</td>
                  <td className="px-4 py-3 text-center">6</td>
                  <td className="px-4 py-3 text-right">72.06</td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-700">40.00%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Hydrogen (H)</td>
                  <td className="px-4 py-3 text-center">12</td>
                  <td className="px-4 py-3 text-right">12.096</td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-700">6.71%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Oxygen (O)</td>
                  <td className="px-4 py-3 text-center">6</td>
                  <td className="px-4 py-3 text-right">96.00</td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-700">53.29%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Interpretation:</strong> Glucose is 40% carbon by mass, 6.71% hydrogen, and 53.29% oxygen. The percentages must sum to 100%. This composition is characteristic of carbohydrates, which are generally composed of carbon, hydrogen, and oxygen in approximately 1:2:1 atomic ratio, resulting in oxygen dominating the mass percentage due to its higher atomic weight.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Applications in Chemistry</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Stoichiometry and Chemical Equations</h4>
          <p className="text-gray-700 mb-4">
            Molecular weight is the bridge between the molecular world and the macroscopic world. It allows conversion between moles (counting molecules) and mass (weighing substances):
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="font-mono text-center text-lg text-blue-900 mb-2">
              moles = mass (g) ÷ molecular weight (g/mol)
            </p>
            <p className="font-mono text-center text-lg text-blue-900">
              mass (g) = moles × molecular weight (g/mol)
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Example: Combustion of methane (CH4):</strong> CH4 + 2O2 → CO2 + 2H2O
          </p>
          <p className="text-gray-700 mb-4">
            If you burn 16 grams of methane (molecular weight 16.04 g/mol), you have 16 ÷ 16.04 ≈ 1 mole of CH4. According to the balanced equation, 1 mole of CH4 produces 1 mole of CO2 (44.01 g/mol) and 2 moles of H2O (18.016 g/mol each). Therefore, you will produce 44.01 g of CO2 and 36.032 g of H2O. Total mass is conserved: 16 g CH4 + 64 g O2 = 44.01 g CO2 + 36.032 g H2O = 80.042 g products (close to 80 g reactants, with rounding).
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Limiting Reagent Determination</h4>
          <p className="text-gray-700 mb-4">
            In chemical reactions with multiple reactants, molecular weight helps identify which reactant runs out first (the limiting reagent), controlling how much product forms:
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> React 10 g of hydrogen (H2, MW = 2.016) with 80 g of oxygen (O2, MW = 32.00) to form water: 2H2 + O2 → 2H2O
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Moles of H2:</strong> 10 g ÷ 2.016 g/mol = 4.96 moles</li>
            <li><strong>Moles of O2:</strong> 80 g ÷ 32.00 g/mol = 2.50 moles</li>
            <li><strong>Stoichiometry:</strong> Need 2 moles H2 per 1 mole O2. With 4.96 moles H2, we need 4.96 ÷ 2 = 2.48 moles O2</li>
            <li><strong>Conclusion:</strong> O2 is in slight excess; H2 is the limiting reagent. Water produced = 4.96 moles H2O × 18.016 g/mol = 89.36 g</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Empirical and Molecular Formula Determination</h4>
          <p className="text-gray-700 mb-4">
            Analytical chemistry often determines percent composition experimentally (e.g., combustion analysis). From this data, chemists calculate the empirical formula (simplest whole-number ratio) and use molecular weight to find the molecular formula:
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> A compound contains 40.00% C, 6.71% H, 53.29% O by mass. Molecular weight from mass spectrometry is approximately 180 g/mol.
          </p>

          <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">
            <li><strong>Convert percentages to moles:</strong> Assume 100 g sample: 40.00 g C ÷ 12.01 = 3.33 mol C; 6.71 g H ÷ 1.008 = 6.66 mol H; 53.29 g O ÷ 16.00 = 3.33 mol O</li>
            <li><strong>Find smallest ratio:</strong> Divide all by 3.33: C = 1, H = 2, O = 1. Empirical formula: CH2O (empirical weight = 30 g/mol)</li>
            <li><strong>Determine molecular formula:</strong> 180 ÷ 30 = 6. Molecular formula = (CH2O)6 = C6H12O6 (glucose)</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Atomic Weights and Isotopes</h3>
          <p className="text-gray-700 mb-4">
            Atomic weights listed on the periodic table are weighted averages of all naturally occurring isotopes of each element. For example, natural chlorine is 75.8% chlorine-35 (34.969 amu) and 24.2% chlorine-37 (36.966 amu):
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="font-mono text-center text-gray-900">
              Atomic weight of Cl = (0.758 × 34.969) + (0.242 × 36.966) = 35.45 amu
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            For most laboratory calculations, standard atomic weights from IUPAC (International Union of Pure and Applied Chemistry) are sufficient. However, for precise isotope studies, nuclear chemistry, or mass spectrometry analysis, specific isotope masses must be used instead of average atomic weights.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Calculation Mistakes and How to Avoid Them</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Forgetting subscripts:</strong> H2O has 2 hydrogens, not 1. Always check subscripts carefully. If no subscript appears, there is 1 atom of that element.</li>
            <li><strong>Mishandling parentheses:</strong> Ca(OH)2 has 2 oxygens and 2 hydrogens, not 1 of each. Multiply everything inside parentheses by the outside subscript.</li>
            <li><strong>Nested parentheses:</strong> Expand from innermost to outermost. For Fe4[Fe(CN)6]3, first expand Fe(CN)6, then multiply by the outside subscript.</li>
            <li><strong>Wrong atomic weights:</strong> Use current values from reliable sources. Older periodic tables may have outdated weights. Our calculator uses IUPAC 2021 values.</li>
            <li><strong>Rounding too early:</strong> Keep full precision during intermediate calculations, then round the final answer to appropriate significant figures (typically 2-4 decimal places for molecular weight).</li>
            <li><strong>Confusing molecular weight with mass:</strong> Molecular weight is 18.016 g/mol for water; this is NOT the mass of one molecule (which would be 18.016 ÷ Avogadro's number = 2.99 × 10⁻²³ g).</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Practical Laboratory Applications</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Solution Preparation</h4>
          <p className="text-gray-700 mb-4">
            To prepare solutions of specific molarity, molecular weight converts desired moles into grams to weigh:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Example:</strong> Prepare 500 mL of 0.1 M NaCl solution (NaCl MW = 58.44 g/mol)
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Moles needed = 0.1 mol/L × 0.5 L = 0.05 mol</li>
            <li>Mass needed = 0.05 mol × 58.44 g/mol = 2.922 g</li>
            <li>Weigh 2.922 g NaCl, dissolve in water, dilute to exactly 500 mL total volume</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Quality Control and Purity Assessment</h4>
          <p className="text-gray-700 mb-4">
            If measured elemental composition deviates from calculated values, the sample may contain impurities, wrong compound, or experimental error. For example, if supposed pure glucose shows 38% carbon instead of 40%, it likely contains impurities or degradation products.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Drug Dosage Calculations</h4>
          <p className="text-gray-700 mb-4">
            Pharmaceutical chemistry uses molecular weight to convert between different dose units. For example, converting a drug dose from milligrams to millimoles (mmol) for physiological calculations, or calculating equivalent doses of different salt forms of the same drug (e.g., comparing calcium carbonate to calcium citrate supplements).
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on molecular weight, chemical formulas, and stoichiometry:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://iupac.org/what-we-do/periodic-table-of-elements/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                IUPAC Periodic Table of Elements
              </a> - Official atomic weights from IUPAC
            </li>
            <li>
              <a href="https://webbook.nist.gov/chemistry/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                NIST Chemistry WebBook
              </a> - Comprehensive chemical and physical property data
            </li>
            <li>
              <a href="https://www.chemspider.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                ChemSpider
              </a> - Chemical structure database with molecular weights
            </li>
            <li>
              <a href="https://pubchem.ncbi.nlm.nih.gov/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                PubChem Database
              </a> - Open chemistry database from NIH
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/molarity-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🧪</div>
            <h3 className="font-semibold text-gray-900">Molarity Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate solution concentration and dilutions</p>
          </a>
          
          <a 
            href="/chemistry-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚗️</div>
            <h3 className="font-semibold text-gray-900">Chemistry Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Various chemistry calculations and conversions</p>
          </a>
          
          <a 
            href="/mole-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔬</div>
            <h3 className="font-semibold text-gray-900">Mole Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between moles, mass, and molecules</p>
          </a>
          
          <a 
            href="/stoichiometry-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">Stoichiometry Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Balance equations and calculate reactants</p>
          </a>
        </div>
      </section>
    </div>
  );
}

