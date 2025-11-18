import type { Metadata } from 'next';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import GFRCalculator from '@/components/Calculator/GFRCalculator';

export const metadata: Metadata = {
  title: 'GFR Calculator (Free, No signup) - Glomerular Filtration Rate | AICalculator',
  description: 'Free GFR calculator with no sign-up required. Calculate glomerular filtration rate using CKD-EPI, MDRD, Cockcroft-Gault formulas. Assess kidney function, CKD staging, dialysis needs. 100% free, unlimited use.',
  keywords: [
    'GFR calculator',
    'glomerular filtration rate calculator',
    'eGFR calculator',
    'kidney function calculator',
    'CKD-EPI calculator',
    'MDRD calculator',
    'creatinine calculator',
    'kidney disease calculator',
    'CKD stage calculator',
    'chronic kidney disease calculator',
    'renal function calculator',
    'kidney failure calculator',
    'dialysis calculator',
    'nephrology calculator',
    'serum creatinine GFR',
    'kidney health calculator',
    'GFR estimation',
    'kidney filtration rate',
    'pediatric GFR calculator',
    'Schwartz formula',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  
  openGraph: {
    title: 'GFR Calculator (Free, No signup) - Kidney Function Calculator',
    description: 'Free GFR calculator using CKD-EPI, MDRD formulas. Calculate kidney function, assess CKD stage, and get personalized health recommendations. No sign-up required.',
    type: 'website',
    url: getUrl('/gfr-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('gfr'),
      width: 1200,
      height: 630,
      alt: 'GFR Calculator - Kidney Function Assessment Tool',
    }],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'GFR Calculator (Free, No signup) - Kidney Function Calculator',
    description: 'Free GFR calculator for kidney function assessment. Calculate eGFR using CKD-EPI and MDRD formulas.',
    images: [getOgImage('gfr')],
    creator: '@aicalculator',
  },
  
  alternates: {
    canonical: getUrl('/gfr-calculator'),
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

export default function GFRCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/gfr-calculator'),
        'name': 'GFR Calculator - Free Kidney Function Calculator',
        'url': getUrl('/gfr-calculator'),
        'description': 'Free Glomerular Filtration Rate (GFR) calculator using validated formulas (CKD-EPI, MDRD, Cockcroft-Gault). Calculate eGFR to assess kidney function, determine CKD stage, and receive personalized health recommendations. No sign-up required.',
        'applicationCategory': 'HealthApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'featureList': [
          'CKD-EPI formula (most accurate, KDIGO recommended)',
          'MDRD formula (traditional standard)',
          'Cockcroft-Gault formula',
          'Schwartz formula (pediatric)',
          'Adult and pediatric calculators',
          'CKD staging (G1-G5)',
          'Kidney function interpretation',
          'Dialysis assessment',
          'Medication adjustment warnings',
          'Lifestyle recommendations',
          'Risk level evaluation',
          'No sign-up or registration required',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/gfr-calculator'),
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
            'name': 'GFR Calculator',
            'item': getUrl('/gfr-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/gfr-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is GFR and why is it important?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Glomerular Filtration Rate (GFR) measures how well your kidneys filter waste from blood. It\'s the best overall indicator of kidney function. Normal GFR is 90-120 mL/min/1.73m². GFR is used to: (1) Diagnose chronic kidney disease (CKD), (2) Stage CKD severity (G1-G5), (3) Adjust medication doses, (4) Determine if dialysis is needed, (5) Monitor kidney disease progression. GFR decreases with age, kidney damage, diabetes, hypertension, and other conditions. Early detection through GFR testing allows intervention to slow disease progression and prevent kidney failure.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Which GFR formula is most accurate?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The CKD-EPI formula (2009) is considered most accurate and is recommended by KDIGO (Kidney Disease: Improving Global Outcomes) guidelines. CKD-EPI is more accurate than MDRD at GFR >60 and better predicts risk of mortality and kidney failure. The formula accounts for serum creatinine, age, gender, and race. MDRD formula (1999) tends to underestimate GFR at higher levels (>60) and is less accurate in healthy populations. Cockcroft-Gault (1976) is older and less precise but still used for drug dosing adjustments. For pediatric patients, the Schwartz formula is most appropriate, using height and serum creatinine.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What do the CKD stages (G1-G5) mean?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Chronic Kidney Disease is classified into 5 stages based on GFR: G1 (GFR ≥90): Normal kidney function but with kidney damage (protein in urine, structural abnormality). G2 (GFR 60-89): Mildly decreased function, usually no symptoms. G3a (GFR 45-59): Mild to moderate decrease, may start experiencing symptoms. G3b (GFR 30-44): Moderate to severe decrease, symptoms more likely (fatigue, swelling). G4 (GFR 15-29): Severely decreased, prepare for dialysis or transplant. G5 (GFR <15): Kidney failure, dialysis or transplant needed to sustain life. Each stage requires different management, monitoring frequency, and specialist involvement. Early stages focus on slowing progression; late stages prepare for kidney replacement therapy.',
            },
          },
          {
            '@type': 'Question',
            'name': 'When is dialysis needed based on GFR?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Dialysis is typically needed when GFR falls below 15 mL/min/1.73m² (CKD Stage 5 - kidney failure). However, the decision is not based solely on GFR. Dialysis is started when: (1) GFR <15 with uremic symptoms (nausea, confusion, fatigue), (2) Fluid overload not controlled by diuretics, (3) Severe electrolyte imbalances (high potassium, acidosis), (4) Severe hypertension despite medications, (5) Malnutrition from uremia. Some patients with GFR 10-15 may delay dialysis with careful monitoring and dietary management. Preparation for dialysis should begin at GFR 20-30, including: vascular access creation (AV fistula), transplant evaluation, dialysis education, and nutritionist consultation.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How can I improve my GFR naturally?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'To improve or maintain GFR naturally: (1) Control blood pressure: Keep <130/80 mmHg. ACE inhibitors or ARBs are kidney-protective. (2) Manage diabetes: HbA1c <7%, prevents diabetic nephropathy progression. (3) Maintain healthy weight: Obesity increases kidney strain. (4) Low-salt diet: <2000 mg sodium/day reduces blood pressure and proteinuria. (5) Stay hydrated: 8-10 glasses water/day unless fluid-restricted. (6) Avoid NSAIDs: Ibuprofen, naproxen can damage kidneys. (7) Don\'t smoke: Smoking accelerates kidney disease. (8) Limit alcohol: ≤1 drink/day women, ≤2 men. (9) Exercise regularly: 30 minutes, 5 days/week improves cardiovascular health. (10) Reduce protein if advised: High protein may worsen CKD. Always consult nephrologist before major lifestyle changes.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Do medications need adjustment based on GFR?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, many medications require dose adjustment when GFR is reduced because kidneys eliminate most drugs. At GFR <60: NSAIDs should be avoided (can worsen kidney function), contrast dyes need caution (risk of acute kidney injury), many antibiotics need dose reduction. At GFR <45: Metformin may need dose reduction or discontinuation, some diabetes medications require adjustment, antibiotics (fluoroquinolones, aminoglycosides) need dosing changes. At GFR <30: Most medications need dose adjustment, avoid potassium supplements and salt substitutes, direct oral anticoagulants (DOACs) may not be safe - use warfarin instead, careful monitoring of digoxin, lithium levels. Always inform doctors and pharmacists about your GFR. Never adjust medications without medical supervision. Nephrotoxic drugs should be avoided when possible.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/gfr-calculator'),
        'name': 'How to Calculate GFR (Glomerular Filtration Rate)',
        'description': 'Step-by-step guide to calculating GFR for kidney function assessment using validated medical formulas.',
        'totalTime': 'PT3M',
        'estimatedCost': {
          '@type': 'MonetaryAmount',
          'currency': 'USD',
          'value': '0',
        },
        'tool': {
          '@type': 'HowToTool',
          'name': 'Serum creatinine blood test result',
        },
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Select Patient Type',
            'text': 'Choose Adult (≥18 years) or Pediatric (<18 years). Adults use CKD-EPI, MDRD, or Cockcroft-Gault formulas. Pediatric patients use Schwartz formula which requires height measurement.',
            'url': getStepUrl('/gfr-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter Serum Creatinine',
            'text': 'Enter serum creatinine (SCr) value from blood test in mg/dL or µmol/L. Normal range: 0.6-1.2 mg/dL (53-106 µmol/L). Higher creatinine indicates reduced kidney function.',
            'url': getStepUrl('/gfr-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Enter Age',
            'text': 'Enter patient age in years. GFR naturally decreases with age. Age is a critical factor in all GFR formulas.',
            'url': getStepUrl('/gfr-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Select Gender',
            'text': 'Select Male or Female. Women typically have lower muscle mass, affecting creatinine production. Gender-specific adjustments improve accuracy.',
            'url': getStepUrl('/gfr-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Select Race (Adults Only)',
            'text': 'Select Black or Non-Black race. The CKD-EPI formula includes race adjustment because Black individuals typically have higher muscle mass, producing more creatinine.',
            'url': getStepUrl('/gfr-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Enter Height (Pediatric Only)',
            'text': 'For pediatric patients, enter height in cm or inches. Height is required for the Schwartz formula, which is specifically designed for children.',
            'url': getStepUrl('/gfr-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            'position': 7,
            'name': 'Calculate GFR',
            'text': 'Click "Calculate GFR" to compute estimated GFR using multiple validated formulas. Results show eGFR in mL/min/1.73m², CKD stage, and risk level.',
            'url': getStepUrl('/gfr-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            'position': 8,
            'name': 'Review Results and Recommendations',
            'text': 'Review your eGFR value, CKD stage (G1-G5), and personalized recommendations including: medical management, medication adjustments, lifestyle modifications, and dialysis assessment if applicable.',
            'url': getStepUrl('/gfr-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/gfr-calculator'),
        'headline': 'Complete Guide to GFR (Glomerular Filtration Rate) and Kidney Function',
        'description': 'Comprehensive guide to understanding GFR, CKD staging, kidney function assessment, and management strategies for chronic kidney disease.',
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
        'image': getOgImage('gfr'),
        'articleBody': 'Glomerular Filtration Rate (GFR) is the best overall measure of kidney function. This comprehensive guide covers GFR calculation methods, CKD staging, interpretation, and management strategies for maintaining kidney health.',
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
        GFR Calculator - Free Glomerular Filtration Rate Calculator for Kidney Function Assessment (No Sign-up Required)
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/health-fitness" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Health & Fitness</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                GFR Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <GFRCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding GFR and Kidney Function
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Glomerular Filtration Rate (GFR) is the best overall indicator of kidney function. It measures how much blood 
              passes through the glomeruli (tiny filters in the kidneys) each minute. GFR is expressed in mL/min/1.73m² 
              (milliliters per minute per 1.73 square meters of body surface area). Normal GFR is 90-120 mL/min/1.73m². 
              As kidney function declines, GFR decreases, indicating the kidneys' reduced ability to filter waste and excess 
              fluid from the blood.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why GFR Matters: The Importance of Kidney Function Assessment
          </h3>

          <p className="text-gray-700 mb-6">
            GFR testing is critical because:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
            <li><strong>Early Detection:</strong> Identifies kidney disease before symptoms appear</li>
            <li><strong>Disease Staging:</strong> Classifies CKD severity (G1-G5) for appropriate management</li>
            <li><strong>Treatment Monitoring:</strong> Tracks disease progression or response to therapy</li>
            <li><strong>Medication Safety:</strong> Guides dose adjustments to prevent drug toxicity</li>
            <li><strong>Dialysis Timing:</strong> Determines when kidney replacement therapy is needed</li>
            <li><strong>Transplant Evaluation:</strong> Assesses eligibility for kidney transplant</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            GFR Calculation Formulas
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-blue-900 mb-3">
                1. CKD-EPI Formula (2009) ⭐ Recommended
              </h4>
              <div className="bg-blue-50 p-3 rounded-lg mb-3 text-xs">
                <p className="font-mono">GFR = 141 × min(SCr/κ, 1)<sup>α</sup> × max(SCr/κ, 1)<sup>-1.209</sup> × 0.993<sup>Age</sup></p>
                <p className="mt-2 text-gray-700">Where κ and α vary by gender</p>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Developed:</strong> 2009 by Chronic Kidney Disease Epidemiology Collaboration
                <br /><strong>Best For:</strong> All adults, especially at GFR &gt;60
                <br /><strong>Accuracy:</strong> Most accurate across full GFR range
                <br /><strong>Recommended By:</strong> KDIGO (Kidney Disease: Improving Global Outcomes)
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  ✅ <strong>Advantages:</strong> More accurate than MDRD at higher GFR levels, better predicts mortality 
                  risk and cardiovascular events, reduced bias in diverse populations.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                2. MDRD Formula (1999)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 text-xs">
                <p className="font-mono">GFR = 175 × SCr<sup>-1.154</sup> × Age<sup>-0.203</sup></p>
                <p className="mt-2 text-gray-700">× 0.742 (if female) × 1.212 (if Black)</p>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Developed:</strong> 1999 (Modification of Diet in Renal Disease study)
                <br /><strong>Best For:</strong> CKD patients with GFR &lt;60
                <br /><strong>Accuracy:</strong> Underestimates at GFR &gt;60
                <br /><strong>Use:</strong> Older standard, being replaced by CKD-EPI
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  ⚠️ <strong>Limitations:</strong> Less accurate in healthy individuals, underestimates GFR in normal range, 
                  derived from CKD population only.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                3. Cockcroft-Gault Formula (1976)
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 text-xs">
                <p className="font-mono">CrCl = [(140 - Age) × Weight] / (72 × SCr)</p>
                <p className="mt-2 text-gray-700">× 0.85 (if female)</p>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Developed:</strong> 1976 by Cockcroft and Gault
                <br /><strong>Best For:</strong> Drug dosing calculations
                <br /><strong>Accuracy:</strong> Estimates creatinine clearance (not GFR)
                <br /><strong>Use:</strong> Still used for medication dose adjustments
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  ⚠️ <strong>Note:</strong> Requires body weight, less accurate in obese/edematous patients, 
                  overestimates in elderly.
                </p>
              </div>
            </div>

            <div className="bg-white border border-purple-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-purple-900 mb-3">
                4. Schwartz Formula (Pediatric)
              </h4>
              <div className="bg-purple-50 p-3 rounded-lg mb-3 text-xs">
                <p className="font-mono">GFR = k × Height / SCr</p>
                <p className="mt-2 text-gray-700">k varies by age: 0.33 (&lt;1y), 0.413 (1-13y), 0.7 (male &gt;13y), 0.55 (female &gt;13y)</p>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Developed:</strong> 1976, updated 2009 (bedside Schwartz)
                <br /><strong>Best For:</strong> Children and adolescents (&lt;18 years)
                <br /><strong>Accuracy:</strong> Validated in pediatric CKD populations
                <br /><strong>Required:</strong> Height measurement
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs text-purple-800">
                  👶 <strong>Pediatric Specific:</strong> Accounts for changing muscle mass and growth in children. 
                  Always use pediatric formulas for patients under 18.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            CKD Staging: Understanding the 5 Stages of Chronic Kidney Disease
          </h3>

          <p className="text-gray-700 mb-6">
            The National Kidney Foundation and KDIGO classify CKD into 5 stages based on GFR. Each stage requires 
            different management and monitoring:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
              <h4 className="text-lg font-bold text-green-900 mb-2">
                Stage 1 (G1): GFR ≥90 mL/min/1.73m² - Normal or High
              </h4>
              <p className="text-sm text-green-800 mb-3">
                <strong>Kidney Function:</strong> Normal or increased filtration with signs of kidney damage 
                (protein in urine, blood in urine, structural abnormalities on imaging, genetic kidney disease).
              </p>
              <div className="bg-white border border-green-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-900 mb-2">Management:</p>
                <ul className="text-xs text-green-800 space-y-1">
                  <li>• Treat underlying cause (diabetes, hypertension, glomerulonephritis)</li>
                  <li>• Blood pressure control (&lt;130/80 mmHg)</li>
                  <li>• Annual GFR and urine protein monitoring</li>
                  <li>• Lifestyle modifications: healthy diet, exercise, smoking cessation</li>
                  <li>• ACE inhibitor or ARB if proteinuria present</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
              <h4 className="text-lg font-bold text-yellow-900 mb-2">
                Stage 2 (G2): GFR 60-89 mL/min/1.73m² - Mildly Decreased
              </h4>
              <p className="text-sm text-yellow-800 mb-3">
                <strong>Kidney Function:</strong> Mild reduction in kidney function. Usually no symptoms. 
                Common with normal aging. Most people don't know they have Stage 2 CKD.
              </p>
              <div className="bg-white border border-yellow-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-yellow-900 mb-2">Management:</p>
                <ul className="text-xs text-yellow-800 space-y-1">
                  <li>• Same as Stage 1: treat underlying cause, control blood pressure and blood sugar</li>
                  <li>• Monitor GFR every 6-12 months</li>
                  <li>• Calculate cardiovascular risk (CKD increases CV risk)</li>
                  <li>• Optimize diabetes control (HbA1c &lt;7%)</li>
                  <li>• Consider nephrology referral if rapidly declining GFR</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-lg">
              <h4 className="text-lg font-bold text-orange-900 mb-2">
                Stage 3 (G3): GFR 30-59 mL/min/1.73m² - Moderate Decrease
              </h4>
              <p className="text-sm text-orange-800 mb-3">
                <strong>Subdivided:</strong> G3a (45-59) and G3b (30-44). Symptoms may start: fatigue, swelling, 
                changes in urination, back pain. Complications become more likely.
              </p>
              <div className="bg-white border border-orange-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-orange-900 mb-2">Management:</p>
                <ul className="text-xs text-orange-800 space-y-1">
                  <li>• <strong>Nephrology referral recommended</strong> (especially G3b)</li>
                  <li>• Monitor GFR every 3-6 months</li>
                  <li>• Screen for CKD complications: anemia (low hemoglobin), bone disease (vitamin D, PTH), acidosis</li>
                  <li>• Adjust medication doses for reduced kidney function</li>
                  <li>• Protein restriction: 0.8 g/kg/day (consult dietitian)</li>
                  <li>• Strict blood pressure control with ACE-I or ARB</li>
                  <li>• Avoid nephrotoxic drugs (NSAIDs, contrast dyes)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
              <h4 className="text-lg font-bold text-red-900 mb-2">
                Stage 4 (G4): GFR 15-29 mL/min/1.73m² - Severely Decreased
              </h4>
              <p className="text-sm text-red-800 mb-3">
                <strong>Kidney Function:</strong> Severe reduction. Symptoms present: fatigue, nausea, loss of appetite, 
                difficulty concentrating, muscle cramps, swelling. Prepare for kidney replacement therapy.
              </p>
              <div className="bg-white border border-red-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-900 mb-2">Management:</p>
                <ul className="text-xs text-red-800 space-y-1">
                  <li>• <strong>Specialized nephrology care required</strong></li>
                  <li>• Monitor GFR every 1-3 months</li>
                  <li>• <strong>Prepare for dialysis:</strong> patient education, vascular access creation (AV fistula 6-12 months before dialysis)</li>
                  <li>• <strong>Consider kidney transplant evaluation</strong></li>
                  <li>• Manage complications: treat anemia (ESA, iron), bone disease (vitamin D, phosphate binders), acidosis (bicarbonate)</li>
                  <li>• Strict dietary restrictions: low sodium, low potassium, low phosphorus, protein restriction (0.6-0.8 g/kg/day)</li>
                  <li>• All medications require dose adjustment or avoidance</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-100 border-l-4 border-red-700 p-5 rounded-r-lg">
              <h4 className="text-lg font-bold text-red-900 mb-2">
                Stage 5 (G5): GFR &lt;15 mL/min/1.73m² - Kidney Failure
              </h4>
              <p className="text-sm text-red-900 mb-3">
                <strong>Kidney Function:</strong> Kidneys have lost nearly all function. Dialysis or kidney transplant 
                is necessary to sustain life. Severe uremic symptoms if untreated.
              </p>
              <div className="bg-white border border-red-300 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-900 mb-2">Management:</p>
                <ul className="text-xs text-red-900 space-y-1">
                  <li>• <strong>Dialysis or kidney transplant required</strong></li>
                  <li>• <strong>Hemodialysis:</strong> 3-4 times per week at dialysis center, 3-5 hours per session</li>
                  <li>• <strong>Peritoneal Dialysis:</strong> Daily exchanges at home via abdominal catheter</li>
                  <li>• <strong>Kidney Transplant:</strong> Best long-term option if eligible (living or deceased donor)</li>
                  <li>• Intensive symptom management: nausea, fluid overload, electrolyte imbalances</li>
                  <li>• Very strict dietary restrictions on dialysis</li>
                  <li>• Multidisciplinary care: nephrologist, dialysis nurse, dietitian, social worker</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-blue-900 mb-3 text-xl">
              📚 Additional Resources
            </h4>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>National Kidney Foundation:</strong> Patient education materials, CKD staging information
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>KDIGO Guidelines:</strong> Clinical practice guidelines for CKD evaluation and management
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>American Society of Nephrology:</strong> Nephrology specialty resources
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
            href="/body-surface-area-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">BSA Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Body Surface Area for medical dosing</p>
          </a>

          <a
            href="/calorie-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🍎</div>
            <h3 className="font-semibold text-gray-900">Calorie Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate daily calorie needs</p>
          </a>

          <a
            href="/blood-pressure-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="font-semibold text-gray-900">Blood Pressure Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Assess blood pressure levels</p>
          </a>
        </div>
      </section>
    </div>
  );
}

