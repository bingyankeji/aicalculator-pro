import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import BodySurfaceAreaCalculator from '@/components/Calculator/BodySurfaceAreaCalculator';

export const metadata: Metadata = {
  title: 'Body Surface Area Calculator (Free, No signup) - BSA Calculator | AICalculator',
  description: 'Free Body Surface Area (BSA) calculator with no sign-up required. Calculate BSA using 8 formulas: Du Bois, Mosteller, Haycock, Gehan & George. Medical dosing, chemotherapy, dialysis calculations. 100% free, unlimited use.',
  keywords: [
    'body surface area calculator',
    'BSA calculator',
    'body surface area',
    'BSA calculation',
    'Du Bois formula',
    'Mosteller formula',
    'BSA medical calculator',
    'chemotherapy dose calculator',
    'BSA dosing calculator',
    'drug dosing calculator BSA',
    'body surface area estimation',
    'BSA for chemotherapy',
    'dialysis BSA',
    'burn BSA calculator',
    'pediatric BSA calculator',
    'adult BSA calculator',
    'BSA formula comparison',
    'BSA square meters',
    'medical BSA calculator',
    'clinical BSA calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  
  openGraph: {
    title: 'Body Surface Area Calculator (Free, No signup) - BSA Calculator',
    description: 'Free BSA calculator with 8 formulas. Calculate Body Surface Area for chemotherapy dosing, dialysis, and medical applications. No sign-up required.',
    type: 'website',
    url: getUrl('/body-surface-area-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('bsa'),
      width: 1200,
      height: 630,
      alt: 'Body Surface Area Calculator - BSA Medical Calculator',
    }],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Body Surface Area Calculator (Free, No signup) - BSA Calculator',
    description: 'Free BSA calculator with 8 formulas for medical applications. Calculate BSA for chemotherapy dosing and dialysis.',
    images: [getOgImage('bsa')],
    creator: '@aicalculator',
  },
  
  alternates: {
    canonical: getUrl('/body-surface-area-calculator'),
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

export default function BodySurfaceAreaCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/body-surface-area-calculator'),
        'name': 'Body Surface Area Calculator - Free BSA Medical Calculator',
        'url': getUrl('/body-surface-area-calculator'),
        'description': 'Free Body Surface Area (BSA) calculator using 8 validated formulas. Calculate BSA for chemotherapy dosing, dialysis parameters, burn assessment, and other medical applications. No sign-up required.',
        'applicationCategory': 'HealthApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'featureList': [
          '8 validated BSA formulas (Du Bois, Mosteller, Haycock, Gehan & George, Boyd, Fujimoto, Takahira, Schlich)',
          'Chemotherapy dose calculation examples',
          'Dialysis parameter estimation',
          'Burn area assessment',
          'Pediatric and adult BSA ranges',
          'Multiple unit conversions (m², ft², in²)',
          'Age-appropriate reference ranges',
          'Clinical interpretation and guidance',
          'Gender-specific Schlich formula',
          'No sign-up or registration required',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/body-surface-area-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/'),
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Health & Fitness',
            'item': getUrl('/health-fitness'),
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Body Surface Area Calculator',
            'item': getUrl('/body-surface-area-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/body-surface-area-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is Body Surface Area (BSA) and why is it important?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Body Surface Area (BSA) is the measured or calculated surface area of a human body, expressed in square meters (m²). BSA is crucial in medicine because it provides a more accurate way to calculate drug dosages than weight alone, especially for chemotherapy and other potent medications. Average adult BSA ranges from 1.5-2.5 m². BSA is used in oncology (chemotherapy dosing), nephrology (dialysis adequacy), critical care (burn resuscitation using Parkland formula), and cardiology (cardiac index calculation). It accounts for both height and weight, providing better dosing precision and safety.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Which BSA formula is most accurate?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The Mosteller formula is widely considered the most accurate and easiest to use: BSA = √((Height(cm) × Weight(kg)) / 3600). It was validated in the 1980s and is recommended by the FDA for calculating BSA in clinical trials. Du Bois formula (1916) is the traditional standard: BSA = 0.007184 × Height^0.725 × Weight^0.425. Other formulas like Haycock, Gehan & George are also accurate. The Schlich formula is gender-specific and may be more accurate for specific populations. In practice, differences between formulas are usually less than 5%, so any validated formula is acceptable. Our calculator shows all 8 formulas for comparison.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate BSA for chemotherapy dosing?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'To calculate chemotherapy dosing using BSA: (1) Calculate BSA using height and weight with a validated formula like Mosteller or Du Bois. (2) Multiply the BSA by the prescribed dose in mg/m². For example, if BSA = 1.85 m² and the drug is dosed at 50 mg/m², the total dose is 1.85 × 50 = 92.5 mg. Most chemotherapy agents (doxorubicin, cisplatin, 5-FU, etc.) are dosed in mg/m² to minimize toxicity while maintaining efficacy. BSA-based dosing accounts for both patient size and metabolic capacity. Always verify calculations and follow oncology protocols. Dose modifications may be needed for renal/hepatic impairment, elderly patients, or prior toxicity.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What is normal BSA for adults and children?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Normal BSA ranges vary by age: Infants (0-2 years): 0.2-0.6 m², Children (2-12 years): 0.5-1.5 m², Adolescents (12-18 years): 1.0-2.0 m², Adults (18+ years): 1.5-2.5 m². Average adult male BSA is approximately 1.9 m², while average adult female BSA is approximately 1.6 m². Very small adults may have BSA as low as 1.3 m², while very large adults may exceed 2.5 m². BSA increases with both height and weight, so taller or heavier individuals have higher BSA. These ranges help clinicians identify when BSA-based dosing may need adjustment. Always use age-appropriate reference ranges and formulas.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Can BSA calculator be used for pediatric patients?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, BSA calculators can and should be used for pediatric patients, but with important precautions. Pediatric BSA ranges are much smaller: infants 0.2-0.6 m², young children 0.5-1.5 m². Always use age and weight-adjusted dosing protocols for children. Never extrapolate adult doses directly using BSA alone. Consult pediatric-specific guidelines and formularies. Some medications have pediatric dose caps even when BSA suggests higher doses. The Mosteller and Haycock formulas are well-validated for children. Neonates and premature infants may require specialized formulas. Always double-check pediatric calculations and have another healthcare provider verify doses before administration.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What medical applications use BSA calculations?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'BSA is used across multiple medical specialties: Oncology - chemotherapy dosing (most antineoplastic agents in mg/m²), Nephrology - medication dose adjustment in renal failure, dialysis adequacy (Kt/V), glomerular filtration rate (GFR) indexing, Cardiology - cardiac index (CI = Cardiac Output / BSA), indexed valve areas, Critical Care - burn resuscitation (Parkland formula: 4 mL × kg × % burn, using BSA to calculate % area), fluid management, Research - normalizing physiologic measurements across different body sizes, Pediatrics - age-appropriate medication dosing, growth assessment. BSA provides more accurate dosing than weight alone because it better reflects metabolic mass and blood volume.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/body-surface-area-calculator'),
        'name': 'How to Calculate Body Surface Area (BSA)',
        'description': 'Step-by-step guide to calculating Body Surface Area for medical applications using validated formulas.',
        'totalTime': 'PT3M',
        'estimatedCost': {
          '@type': 'MonetaryAmount',
          'currency': 'USD',
          'value': '0',
        },
        'tool': {
          '@type': 'HowToTool',
          'name': 'Height and weight measurements',
        },
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Enter Age',
            'text': 'Enter the patient\'s age in years (0-120). Age determines appropriate reference ranges: infants (0-2), children (2-12), adolescents (12-18), or adults (18+). Pediatric patients require special dosing considerations.',
            'url': getStepUrl('/body-surface-area-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Select Gender',
            'text': 'Select Male or Female. Gender affects the Schlich formula calculation, which uses different exponents for males and females to improve accuracy.',
            'url': getStepUrl('/body-surface-area-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Enter Height',
            'text': 'Enter height in centimeters (cm) or inches. Use standing height for most accurate results. Common conversions: 5\'6" = 66 inches = 168 cm, 6\'0" = 72 inches = 183 cm.',
            'url': getStepUrl('/body-surface-area-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Enter Weight',
            'text': 'Enter current body weight in kilograms (kg) or pounds (lbs). Use accurate scale weight. Common conversions: 150 lbs = 68 kg, 200 lbs = 91 kg.',
            'url': getStepUrl('/body-surface-area-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Calculate BSA',
            'text': 'Click "Calculate BSA" to compute Body Surface Area using 8 validated formulas. The calculator will show individual results for each formula plus an average BSA.',
            'url': getStepUrl('/body-surface-area-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Review Results',
            'text': 'Review your BSA in m², ft², and in². Compare results across different formulas. Most formulas should agree within 5%. Check if BSA falls within normal range for age group.',
            'url': getStepUrl('/body-surface-area-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            'position': 7,
            'name': 'Apply to Medical Calculations',
            'text': 'Use BSA for intended medical application: chemotherapy dosing (dose in mg/m² × BSA), dialysis parameters, cardiac index calculation, or burn area assessment. Always verify with clinical protocols.',
            'url': getStepUrl('/body-surface-area-calculator', 7),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/body-surface-area-calculator'),
        'headline': 'Complete Guide to Body Surface Area (BSA) Calculation in Medicine',
        'description': 'Comprehensive guide to calculating Body Surface Area using validated formulas for chemotherapy dosing, dialysis, and other medical applications.',
        'author': {
          '@type': 'Organization',
          'name': 'AICalculator.pro',
          'url': getUrl('/'),
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'AICalculator.pro',
          'logo': {
            '@type': 'ImageObject',
            'url': getUrl('/logo.png'),
          },
        },
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'image': getOgImage('bsa'),
        'articleBody': 'Body Surface Area (BSA) is a critical measurement in medicine used for accurate drug dosing, particularly chemotherapy agents. This comprehensive guide covers BSA calculation methods, clinical applications, and best practices for safe medication administration.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Body Surface Area Calculator - Free BSA Medical Calculator for Chemotherapy Dosing and Dialysis (No Sign-up Required)
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Body Surface Area Calculator (Free, No signup)"
        calculatorUrl="/body-surface-area-calculator"
      />

      {/* Calculator Component */}
      <BodySurfaceAreaCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Body Surface Area (BSA) in Medicine
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Body Surface Area (BSA) is the measured or calculated surface area of a human body, typically expressed in 
              square meters (m²). BSA is one of the most important measurements in clinical medicine, particularly for 
              calculating accurate drug dosages, assessing burn injuries, and normalizing cardiac output. Unlike simple 
              weight-based dosing, BSA accounts for both height and weight, providing a more accurate reflection of 
              metabolic mass and medication distribution.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why BSA is Important in Medicine
          </h3>

          <p className="text-gray-700 mb-6">
            BSA-based dosing is critical because it:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
            <li><strong>Improves medication safety:</strong> Prevents under or overdosing, especially in chemotherapy</li>
            <li><strong>Accounts for body composition:</strong> Better reflects metabolic capacity than weight alone</li>
            <li><strong>Standardizes across populations:</strong> Enables comparison between children, adults, and different body types</li>
            <li><strong>Reduces toxicity risk:</strong> Particularly important for narrow therapeutic index drugs</li>
            <li><strong>Optimizes efficacy:</strong> Ensures adequate drug exposure for therapeutic effect</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            BSA Formulas Explained
          </h3>

          <p className="text-gray-700 mb-6">
            Multiple formulas have been developed to calculate BSA. Our calculator includes all 8 major validated formulas:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                1. Du Bois Formula (1916)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                BSA = 0.007184 × Height<sup>0.725</sup> × Weight<sup>0.425</sup>
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> The original and most widely recognized formula, published in 1916. 
                <br /><strong>Use:</strong> Traditional standard for clinical calculations.
                <br /><strong>Accuracy:</strong> Validated across broad populations, slightly overestimates at extremes.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                2. Mosteller Formula (1987)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                BSA = √((Height × Weight) / 3600)
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> Simplified formula developed in 1987.
                <br /><strong>Use:</strong> FDA-recommended for clinical trials, easiest to calculate.
                <br /><strong>Accuracy:</strong> Highly accurate, agrees closely with Du Bois formula.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                3. Haycock Formula (1978)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                BSA = 0.024265 × Height<sup>0.3964</sup> × Weight<sup>0.5378</sup>
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> Developed for infants and children.
                <br /><strong>Use:</strong> Preferred for pediatric populations.
                <br /><strong>Accuracy:</strong> More accurate for children than Du Bois.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                4. Gehan & George (1970)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                BSA = 0.0235 × Height<sup>0.42246</sup> × Weight<sup>0.51456</sup>
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> Derived from direct measurements.
                <br /><strong>Use:</strong> Validated across wide weight range (0.8-150 kg).
                <br /><strong>Accuracy:</strong> Very accurate for both children and adults.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                5. Boyd Formula (1935)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm text-xs">
                BSA = 0.0003207 × H<sup>0.3</sup> × W<sup>(0.7285 - 0.0188×log W)</sup>
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> Complex formula using logarithmic adjustment.
                <br /><strong>Use:</strong> Research applications.
                <br /><strong>Accuracy:</strong> Good, but complex to calculate manually.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                6. Fujimoto Formula (1968)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                BSA = 0.008883 × Height<sup>0.663</sup> × Weight<sup>0.444</sup>
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> Developed in Japan for Asian populations.
                <br /><strong>Use:</strong> May be more accurate for Asian body types.
                <br /><strong>Accuracy:</strong> Good for intended population.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                7. Takahira Formula (1925)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-sm">
                BSA = 0.007241 × Height<sup>0.725</sup> × Weight<sup>0.425</sup>
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> Japanese modification of Du Bois.
                <br /><strong>Use:</strong> Alternative to Du Bois.
                <br /><strong>Accuracy:</strong> Very similar to Du Bois results.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                8. Schlich Formula (2010)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 font-mono text-xs">
                Male: 0.000579479 × H<sup>0.38</sup> × W<sup>0.93</sup>
                <br />Female: 0.000975482 × H<sup>0.46</sup> × W<sup>0.78</sup>
              </div>
              <p className="text-sm text-gray-700">
                <strong>History:</strong> Modern gender-specific formula (2010).
                <br /><strong>Use:</strong> Most recent formula, gender-adjusted.
                <br /><strong>Accuracy:</strong> May be most accurate for modern populations.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span> Formula Selection Guidelines
            </h4>
            <ul className="space-y-2 text-sm text-amber-900">
              <li><strong>Most clinical settings:</strong> Mosteller or Du Bois (most widely accepted)</li>
              <li><strong>Pediatric patients:</strong> Haycock, Gehan & George, or Mosteller</li>
              <li><strong>Clinical trials:</strong> Mosteller (FDA recommended)</li>
              <li><strong>Asian populations:</strong> Fujimoto or Takahira may be more accurate</li>
              <li><strong>Gender considerations:</strong> Schlich formula accounts for gender differences</li>
              <li><strong>In practice:</strong> Differences between formulas are usually &lt;5%, any validated formula is acceptable</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Clinical Applications of BSA
          </h3>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-purple-900 mb-4">
                💊 Oncology: Chemotherapy Dosing
              </h4>
              <p className="text-gray-700 mb-4">
                BSA-based dosing is the gold standard for most chemotherapy agents. Most antineoplastic drugs are dosed 
                in mg/m² to minimize toxicity while maintaining efficacy.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>How to calculate chemotherapy dose:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li>Calculate patient's BSA using validated formula (Mosteller recommended)</li>
                <li>Identify prescribed dose in mg/m² from protocol (e.g., Doxorubicin 50 mg/m²)</li>
                <li>Multiply: Total Dose = BSA × mg/m² dose</li>
                <li>Example: 1.85 m² × 50 mg/m² = 92.5 mg total dose</li>
              </ol>
              <div className="bg-white border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2"><strong>Common chemotherapy agents dosed by BSA:</strong></p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Doxorubicin (Adriamycin): 60-75 mg/m² every 21 days</li>
                  <li>• Cisplatin: 50-120 mg/m² every 3-4 weeks</li>
                  <li>• 5-Fluorouracil (5-FU): 400-600 mg/m² IV bolus</li>
                  <li>• Carboplatin: Target AUC (area under curve) using Calvert formula</li>
                  <li>• Paclitaxel: 175-250 mg/m² every 3 weeks</li>
                  <li>• Docetaxel: 60-100 mg/m² every 3 weeks</li>
                </ul>
              </div>
              <p className="text-xs text-amber-700 mt-4">
                ⚠️ Always verify calculations, check for dose modifications (renal/hepatic impairment, obesity, elderly), 
                and follow institutional protocols. Two-provider verification is standard practice.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-900 mb-4">
                🩸 Nephrology: Dialysis and Renal Function
              </h4>
              <p className="text-gray-700 mb-4">
                BSA is used to normalize renal function measurements and optimize dialysis treatment.
              </p>
              <div className="space-y-3">
                <div className="bg-white border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Glomerular Filtration Rate (GFR) Indexing</h5>
                  <p className="text-sm text-gray-700">
                    eGFR is often reported "indexed" to BSA of 1.73 m² (average adult BSA) to standardize results. 
                    Actual GFR = Indexed GFR × (Patient BSA / 1.73).
                  </p>
                </div>
                <div className="bg-white border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Dialysis Blood Flow Rates</h5>
                  <p className="text-sm text-gray-700">
                    Blood flow rate during hemodialysis: 250-300 mL/min × (BSA/1.73). For BSA 1.85 m²: 
                    267-320 mL/min recommended.
                  </p>
                </div>
                <div className="bg-white border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Kt/V Calculation (Dialysis Adequacy)</h5>
                  <p className="text-sm text-gray-700">
                    Target Kt/V ≥1.2 for adequate hemodialysis. BSA is used to estimate urea distribution volume (V).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-orange-900 mb-4">
                🔥 Critical Care: Burn Assessment
              </h4>
              <p className="text-gray-700 mb-4">
                BSA is critical for calculating burn extent and fluid resuscitation requirements.
              </p>
              <div className="bg-white border border-orange-200 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-orange-900 mb-2">Rule of Nines (% BSA burned)</h5>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Adult:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Head: 9%</li>
                      <li>• Each arm: 9% (×2 = 18%)</li>
                      <li>• Chest: 9%</li>
                      <li>• Abdomen: 9%</li>
                      <li>• Upper back: 9%</li>
                      <li>• Lower back: 9%</li>
                      <li>• Each leg: 18% (×2 = 36%)</li>
                      <li>• Genitalia: 1%</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Child (modified):</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Head: 18% (larger head)</li>
                      <li>• Each arm: 9%</li>
                      <li>• Chest: 9%</li>
                      <li>• Abdomen: 9%</li>
                      <li>• Upper back: 9%</li>
                      <li>• Lower back: 9%</li>
                      <li>• Each leg: 13.5% (shorter legs)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-orange-200 rounded-lg p-4">
                <h5 className="font-semibold text-orange-900 mb-2">Parkland Formula (Fluid Resuscitation)</h5>
                <div className="bg-red-50 p-3 rounded-lg mb-2 font-mono text-sm">
                  Fluid (mL) = 4 × Weight (kg) × % BSA burned
                </div>
                <p className="text-sm text-gray-700">
                  Give half in first 8 hours, remaining half over next 16 hours. Example: 80 kg patient with 30% BSA burns: 
                  4 × 80 × 30 = 9,600 mL Lactated Ringer's (4,800 mL in first 8h, 4,800 mL over next 16h).
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-green-900 mb-4">
                💚 Cardiology: Cardiac Index
              </h4>
              <p className="text-gray-700 mb-4">
                Cardiac Index (CI) normalizes cardiac output to BSA for comparison across different body sizes.
              </p>
              <div className="bg-white border border-green-200 rounded-lg p-4">
                <div className="bg-green-50 p-3 rounded-lg mb-2 font-mono text-sm">
                  Cardiac Index (L/min/m²) = Cardiac Output (L/min) / BSA (m²)
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Normal CI:</strong> 2.5-4.0 L/min/m²
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Example:</strong> Cardiac output 5.5 L/min, BSA 1.85 m² → CI = 5.5/1.85 = 2.97 L/min/m² (normal)
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  CI &lt;2.2 suggests low cardiac output (heart failure, shock). CI &gt;4.2 may indicate hyperdynamic state 
                  (sepsis, hyperthyroidism, anemia).
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Special Populations and BSA Considerations
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                👶 Pediatric Patients
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Formula choice:</strong> Haycock or Mosteller preferred</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Dose caps:</strong> Some drugs have pediatric maximum doses even with BSA calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Neonates:</strong> Extra caution, may need specialized formulas or weight-based dosing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Growth:</strong> Recalculate BSA regularly as child grows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Verification:</strong> Always have two providers verify pediatric chemotherapy doses</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                🏋️ Obese Patients
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>BSA vs weight:</strong> BSA increases with obesity but not proportionally</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Chemotherapy dosing:</strong> ASCO guidelines recommend using actual body weight for BSA (no capping)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>BSA cap:</strong> Some institutions cap BSA at 2.0-2.5 m² to limit toxicity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Alternative:</strong> Consider ideal body weight or adjusted body weight for certain drugs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Monitoring:</strong> Watch for increased toxicity, may need dose reduction</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                👴 Elderly Patients
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Physiology:</strong> Decreased lean body mass, altered drug metabolism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Renal function:</strong> Check creatinine clearance, may need dose reduction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Tolerance:</strong> May not tolerate full BSA-based doses, start lower</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Frailty:</strong> Consider performance status, not just BSA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Polypharmacy:</strong> Watch for drug interactions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                🤰 Pregnant Patients
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Weight changes:</strong> Use pre-pregnancy weight or adjust for pregnancy weight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Blood volume:</strong> Increased during pregnancy, may affect drug distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Drug selection:</strong> Many chemotherapy agents contraindicated in pregnancy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Specialist consult:</strong> Maternal-fetal medicine and oncology collaboration essential</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Safety Checklist for BSA-Based Dosing
          </h3>

          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-red-900 mb-4 flex items-center gap-2 text-xl">
              🚨 Critical Safety Steps
            </h4>
            <ol className="space-y-3 text-sm text-red-900">
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">1.</span>
                <span><strong>Verify measurements:</strong> Confirm height and weight are current and accurate. Recheck if values seem unusual.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">2.</span>
                <span><strong>Calculate BSA correctly:</strong> Use validated formula (Mosteller recommended). Double-check calculation or use calculator.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">3.</span>
                <span><strong>Verify dose from protocol:</strong> Confirm the mg/m² dose from institutional protocol or drug monograph.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">4.</span>
                <span><strong>Calculate total dose:</strong> Total dose = BSA × mg/m² dose. Show your work.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">5.</span>
                <span><strong>Check for dose modifications:</strong> Adjust for renal/hepatic impairment, obesity (per guidelines), elderly, prior toxicity.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">6.</span>
                <span><strong>Independent verification:</strong> Have second qualified provider verify all calculations independently.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">7.</span>
                <span><strong>Check maximum dose:</strong> Some drugs have maximum dose limits regardless of BSA (especially pediatrics).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">8.</span>
                <span><strong>Verify final dose makes sense:</strong> Does it fall within expected range? Too high or too low may indicate error.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">9.</span>
                <span><strong>Document everything:</strong> Record BSA, dose calculation, modifications, verification in patient chart.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold min-w-[24px]">10.</span>
                <span><strong>When in doubt, consult:</strong> Pharmacist, oncologist, or specialist. Never guess with chemotherapy dosing.</span>
              </li>
            </ol>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Common Mistakes to Avoid
          </h3>

          <div className="space-y-4 mb-8">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold text-amber-900 mb-2">❌ Using wrong units</p>
              <p className="text-sm text-amber-800">
                Always verify if height should be in cm or inches, weight in kg or lbs. Converting incorrectly can lead to 
                massive dosing errors. Our calculator handles conversions automatically.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold text-amber-900 mb-2">❌ Outdated measurements</p>
              <p className="text-sm text-amber-800">
                Recalculate BSA if patient has significant weight change (&gt;10%) or for growing children. Don't rely on 
                BSA from months ago.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold text-amber-900 mb-2">❌ Forgetting dose modifications</p>
              <p className="text-sm text-amber-800">
                Standard BSA calculation must be adjusted for renal failure, hepatic impairment, prior toxicity, and sometimes 
                obesity or elderly. Check protocol for modifications.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold text-amber-900 mb-2">❌ No independent verification</p>
              <p className="text-sm text-amber-800">
                Chemotherapy errors can be fatal. Always have a second qualified provider independently verify BSA and dose 
                calculations. This is standard of care.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-semibold text-amber-900 mb-2">❌ Confusing mg/m² with mg/kg</p>
              <p className="text-sm text-amber-800">
                These are completely different! mg/m² requires BSA calculation, mg/kg uses weight directly. Mixing them up 
                results in massive under or overdosing.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3 text-xl">
              ✅ Best Practices Summary
            </h4>
            <ul className="space-y-2 text-sm text-green-900">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Use Mosteller or Du Bois formula (most widely accepted)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Verify current height and weight measurements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Always have independent verification of chemotherapy doses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Check for dose modifications (renal, hepatic, elderly, obesity)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Use institutional protocols and drug monographs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Document all calculations in patient chart</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Recalculate BSA with significant weight changes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Consult pharmacy or specialist when uncertain</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-bold text-blue-900 mb-3 text-xl">
              📚 Further Reading & References
            </h4>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Mosteller RD.</strong> Simplified calculation of body-surface area. N Engl J Med. 1987;317(17):1098.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Du Bois D, Du Bois EF.</strong> A formula to estimate the approximate surface area if height and weight be known. Arch Int Med. 1916;17:863.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>American Society of Clinical Oncology.</strong> Chemotherapy Dosing in Obese Adults: Guideline. J Clin Oncol. 2012.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>FDA Guidance for Industry.</strong> Estimating the Maximum Safe Starting Dose in Initial Clinical Trials.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/bmi-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate Body Mass Index</p>
          </a>

          <a
            href="/body-fat-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate body fat percentage</p>
          </a>

          <a
            href="/ideal-weight-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Ideal Weight Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your ideal body weight</p>
          </a>

          <a
            href="/lean-body-mass-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💪</div>
            <h3 className="font-semibold text-gray-900">Lean Body Mass Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate lean muscle mass</p>
          </a>
        </div>
      </section>
    </div>
  );
}

