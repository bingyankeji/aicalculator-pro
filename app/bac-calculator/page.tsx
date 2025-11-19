import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import BACCalculator from '@/components/Calculator/BACCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl, getCategoryUrl } from '@/config/site';

const calculatorUrl = '/bac-calculator';
const calculatorName = 'BAC Calculator';

export const metadata: Metadata = {
  title: 'BAC Calculator (Free, No signup) - Blood Alcohol | AICalculator',
  description: 'Free BAC calculator with no sign-up required. Calculate your Blood Alcohol Content (BAC). Estimate metabolism time, find when it\'s safe to drive, and understand alcohol impairment levels. Based on the Widmark formula.',
  keywords: ['bac calculator', 'free bac calculator', 'bac calculator no signup', 'blood alcohol calculator', 'blood alcohol content calculator', 'bac estimator', 'alcohol calculator', 'dui calculator', 'drunk driving calculator', 'alcohol metabolism calculator', 'widmark formula calculator', 'how drunk am i', 'when can i drive calculator', 'alcohol level calculator', 'breathalyzer calculator', 'drunk calculator', 'bac chart calculator', 'alcohol impairment calculator', 'legal limit calculator', 'sobriety calculator', 'alcohol blood test calculator', 'bac estimation'],
  authors: [{ name: 'Calculator Tools' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  alternates: {
    canonical: getUrl(calculatorUrl),
  },
  openGraph: {
    title: 'BAC Calculator (Free, No signup) - AICalculator',
    description: 'Free BAC calculator with no sign-up required. Calculate BAC, estimate metabolism time, and learn when it\'s safe to drive. Blood Alcohol Content calculator with legal limit information.',
    url: getUrl(calculatorUrl),
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage(),
        width: 1200,
        height: 630,
        alt: 'BAC Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAC Calculator (Free, No signup) - AICalculator',
    description: 'Free BAC calculator with no sign-up required. Calculate BAC, estimate metabolism time, and learn when it\'s safe to drive. Blood Alcohol Content calculator with legal limit information.',
    images: [getOgImage()],
  },
};

export default function BACCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId(calculatorUrl),
        name: calculatorName,
        url: getUrl(calculatorUrl),
        description: 'Free online Blood Alcohol Content (BAC) calculator using the Widmark formula. Estimate BAC level, metabolism time, and when it\'s safe to drive after drinking alcohol.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'BAC calculation (Widmark formula)',
          'Multiple drink types (beer, wine, liquor)',
          'Metabolism time estimation',
          'Time until sober prediction',
          'Legal limit comparison',
          'Impairment level assessment',
          'Driving safety warnings',
          'Educational information',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId(calculatorUrl),
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
            name: 'Health & Fitness',
            item: getUrl(getCategoryUrl('health')),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: calculatorName,
            item: getUrl(calculatorUrl),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId(calculatorUrl),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does a BAC calculator work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A BAC calculator uses the Widmark formula to estimate blood alcohol content based on the amount of alcohol consumed, body weight, gender, and time spent drinking. The formula accounts for the body\'s water content (higher in males at 68% vs. 55% in females) and the typical metabolism rate of 0.015% BAC per hour.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the legal BAC limit for driving?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In all 50 US states, the legal BAC limit for drivers aged 21 and over is 0.08%. For drivers under 21, most states enforce a "zero tolerance" limit of 0.02% or lower. Commercial drivers have a limit of 0.04%. However, you can still be arrested for DUI at lower BAC levels if impairment is evident.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take for alcohol to leave your system?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The body metabolizes alcohol at an average rate of 0.015% BAC per hour (about one standard drink per hour). This means if your BAC is 0.08%, it would take approximately 5.5 hours to reach 0%. However, metabolism rates vary based on factors like liver health, medications, food intake, and individual physiology.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate are BAC calculators?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BAC calculators provide estimates that can vary by ±0.02% from actual BAC. Factors affecting accuracy include individual metabolism rate, food consumption, medications, hydration level, and liver function. BAC calculators should never be used to determine fitness to drive. Only a breathalyzer or blood test can provide accurate BAC measurements.',
            },
          },
          {
            '@type': 'Question',
            name: 'What factors affect Blood Alcohol Content?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BAC is influenced by: amount of alcohol consumed, body weight (less weight = higher BAC), gender (women typically have higher BAC than men at the same weight), drinking rate (faster = higher peak BAC), food consumption (eating slows absorption), medications (some increase alcohol effects), overall health, and individual metabolism rate.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId(calculatorUrl),
        name: 'How to Calculate Your Blood Alcohol Content',
        description: 'Step-by-step guide to calculating BAC and understanding alcohol metabolism.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Personal Information',
            text: 'Input your gender and body weight. Gender affects body water content, which impacts BAC calculation.',
            url: getStepUrl(calculatorUrl, 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add Drinks Consumed',
            text: 'Select drink types (beer, wine, liquor) and specify quantities. You can customize volume and alcohol percentage.',
            url: getStepUrl(calculatorUrl, 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Drinking Duration',
            text: 'Specify how long ago you started drinking. This accounts for alcohol metabolism over time.',
            url: getStepUrl(calculatorUrl, 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View BAC Results',
            text: 'See your estimated current BAC, peak BAC, time until sober, impairment level, and legal status.',
            url: getStepUrl(calculatorUrl, 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Make Safe Decisions',
            text: 'Never drive if your BAC is above 0%. Use designated drivers, taxis, or rideshare services.',
            url: getStepUrl(calculatorUrl, 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId(calculatorUrl),
        headline: 'Understanding Blood Alcohol Content: Complete BAC Guide',
        description: 'Comprehensive guide to understanding BAC, alcohol metabolism, impairment levels, and responsible drinking.',
        author: {
          '@type': 'Organization',
          name: 'Calculator Tools',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calculator Tools',
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="BAC Calculator (Free, No signup)"
        calculatorUrl="/bac-calculator"
      />
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">BAC Calculator - Free Online Blood Alcohol Content & DUI Legal Limit Checker</h1>

      {/* Calculator Component */}
      <BACCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          {/* What is BAC Calculator */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a BAC Calculator?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                A <strong>Blood Alcohol Content (BAC) calculator</strong> is a health tool that estimates the concentration of alcohol in your bloodstream based on the amount you've consumed, your body weight, gender, and time spent drinking. BAC is expressed as a percentage, representing grams of alcohol per 100 milliliters of blood.
              </p>
              <p>
                Our BAC calculator uses the scientifically-validated <strong>Widmark formula</strong>, which has been the standard for BAC estimation since the 1930s. The formula accounts for biological differences between men and women—specifically, body water content, which is typically 68% in men and 55% in women. Since alcohol distributes in body water, this difference significantly impacts BAC levels.
              </p>
              <p>
                The calculator also factors in alcohol metabolism, which occurs at an average rate of <strong>0.015% BAC per hour</strong> in most people. This means your liver processes approximately one standard drink per hour, though individual rates vary based on genetics, liver health, medications, and other factors.
              </p>
              <p>
                <strong>Critical Disclaimer:</strong> This calculator provides estimates only and should never be used to determine fitness to drive or operate machinery. Actual BAC can only be measured accurately with a breathalyzer or blood test. Always err on the side of caution and never drink and drive.
              </p>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the BAC Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Personal Information</h3>
                    <p className="text-sm text-gray-700">Select your gender and enter your body weight. These factors significantly affect how your body processes alcohol.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Add Your Drinks</h3>
                    <p className="text-sm text-gray-700">Click to add beer, wine, or liquor. Specify the count and customize volume/ABV if needed.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Drinking Duration</h3>
                    <p className="text-sm text-gray-700">Specify how many hours have passed since you started drinking. This accounts for metabolism.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Review Results & Stay Safe</h3>
                    <p className="text-sm text-gray-700">See your estimated BAC, time until sober, and impairment level. Never drive if you've been drinking.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding BAC Levels */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding BAC Levels and Impairment</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Blood Alcohol Content affects everyone differently, but general impairment patterns are well-documented:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">0.00-0.02%: No Visible Effects</h3>
                  <p className="text-sm text-gray-700">
                    Normal behavior, no impairment. Suitable for driving and all activities.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">0.02-0.05%: Mild Impairment</h3>
                  <p className="text-sm text-gray-700">
                    Relaxation, slight euphoria, decreased judgment. Some decline in visual functions and ability to multitask.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">0.05-0.08%: Moderate Impairment</h3>
                  <p className="text-sm text-gray-700">
                    Reduced coordination, impaired judgment, slowed reaction time. Difficulty steering and reduced response to emergencies.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">0.08-0.10%: Legally Intoxicated</h3>
                  <p className="text-sm text-gray-700">
                    <strong>Illegal to drive.</strong> Poor muscle coordination, short-term memory loss, impaired perception. Significantly increased accident risk.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl p-6 border-2 border-red-300">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">0.10-0.15%: Severe Impairment</h3>
                  <p className="text-sm text-gray-700">
                    Slurred speech, poor coordination, slowed thinking. Clear deterioration of reaction time and control.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-200 to-red-100 rounded-xl p-6 border-2 border-red-400">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">0.15-0.30%: Extreme Impairment</h3>
                  <p className="text-sm text-gray-700">
                    Vomiting, loss of balance, blackouts. High risk of injury from falls. May require medical attention.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-300 to-red-200 rounded-xl p-6 border-2 border-red-500 md:col-span-2">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">&gt;0.30%: Life-Threatening</h3>
                  <p className="text-sm text-gray-700">
                    <strong>MEDICAL EMERGENCY.</strong> Risk of unconsciousness, respiratory depression, coma, and death. Call 911 immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Factors Affecting BAC */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors That Affect Blood Alcohol Content</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-gray-900">Body Weight:</strong> Heavier people have more body water to dilute alcohol, resulting in lower BAC levels for the same amount of alcohol consumed.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-gray-900">Gender:</strong> Women typically reach higher BAC levels than men of the same weight due to lower body water content (55% vs. 68%) and differences in alcohol metabolism enzymes.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-gray-900">Drinking Rate:</strong> Consuming drinks rapidly leads to higher peak BAC because absorption outpaces metabolism. Spacing drinks allows time for alcohol elimination.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-gray-900">Food Consumption:</strong> Eating before or while drinking slows alcohol absorption from the stomach into the bloodstream, reducing peak BAC (but not total alcohol consumed).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-gray-900">Medications:</strong> Many medications interact with alcohol, either intensifying its effects or impairing metabolism. Always check with your doctor or pharmacist.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-gray-900">Tolerance:</strong> Regular drinkers may feel less impaired at a given BAC, but their legal risk and physiological impairment remain the same.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl flex-shrink-0">•</span>
                  <div>
                    <strong className="text-gray-900">Age:</strong> Younger people (under 21) and older adults (65+) are more susceptible to alcohol's effects and may experience higher impairment at lower BAC levels.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For authoritative information on alcohol effects, safe drinking guidelines, and addiction resources, consult these trusted health organizations:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.niaaa.nih.gov/alcohols-effects-health/overview-alcohol-consumption/what-standard-drink"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NIAAA - Alcohol's Effects on Health</h3>
                <p className="text-sm text-gray-600 mb-2">Comprehensive information on standard drinks, BAC, and alcohol's health effects from the National Institute on Alcohol Abuse and Alcoholism.</p>
                <span className="text-xs text-blue-600">niaaa.nih.gov →</span>
              </a>

              <a
                href="https://www.cdc.gov/alcohol/fact-sheets/moderate-drinking.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">CDC - Alcohol and Public Health</h3>
                <p className="text-sm text-gray-600 mb-2">Evidence-based guidelines on moderate drinking, health risks, and alcohol-related statistics from the Centers for Disease Control.</p>
                <span className="text-xs text-green-600">cdc.gov →</span>
              </a>

              <a
                href="https://www.nhtsa.gov/risky-driving/drunk-driving"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NHTSA - Drunk Driving Prevention</h3>
                <p className="text-sm text-gray-600 mb-2">DUI statistics, legal consequences, and drunk driving prevention campaigns from the National Highway Traffic Safety Administration.</p>
                <span className="text-xs text-red-600">nhtsa.gov →</span>
              </a>

              <a
                href="https://www.samhsa.gov/find-help/national-helpline"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">SAMHSA - Substance Abuse Helpline</h3>
                <p className="text-sm text-gray-600 mb-2">Free, confidential, 24/7 treatment referral and information service for substance abuse (1-800-662-4357) from SAMHSA.</p>
                <span className="text-xs text-purple-600">samhsa.gov →</span>
              </a>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/bmi-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">⚖️</div>
                <h3 className="font-bold text-gray-900 mb-2">BMI Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your Body Mass Index and overall health status</p>
              </Link>

              <Link
                href="/calorie-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">🍎</div>
                <h3 className="font-bold text-gray-900 mb-2">Calorie Calculator</h3>
                <p className="text-sm text-gray-600">Estimate daily caloric needs for healthy weight management</p>
              </Link>

              <Link
                href="/target-heart-rate-calculator"
                className="block p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl border-2 border-pink-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">❤️</div>
                <h3 className="font-bold text-gray-900 mb-2">Heart Rate Calculator</h3>
                <p className="text-sm text-gray-600">Calculate target heart rate zones for safe exercise</p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How does a BAC calculator work?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A BAC calculator uses the Widmark formula to estimate blood alcohol content based on the amount of alcohol consumed, body weight, gender, and time spent drinking. The formula accounts for the body's water content (higher in males at 68% vs. 55% in females) and the typical metabolism rate of 0.015% BAC per hour.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is the legal BAC limit for driving?</h3>
                <p className="text-gray-700 leading-relaxed">
                  In all 50 US states, the legal BAC limit for drivers aged 21 and over is 0.08%. For drivers under 21, most states enforce a "zero tolerance" limit of 0.02% or lower. Commercial drivers have a limit of 0.04%. However, you can still be arrested for DUI at lower BAC levels if impairment is evident.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How long does it take for alcohol to leave your system?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The body metabolizes alcohol at an average rate of 0.015% BAC per hour (about one standard drink per hour). This means if your BAC is 0.08%, it would take approximately 5.5 hours to reach 0%. However, metabolism rates vary based on factors like liver health, medications, food intake, and individual physiology.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How accurate are BAC calculators?</h3>
                <p className="text-gray-700 leading-relaxed">
                  BAC calculators provide estimates that can vary by ±0.02% from actual BAC. Factors affecting accuracy include individual metabolism rate, food consumption, medications, hydration level, and liver function. BAC calculators should never be used to determine fitness to drive. Only a breathalyzer or blood test can provide accurate BAC measurements.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What factors affect Blood Alcohol Content?</h3>
                <p className="text-gray-700 leading-relaxed">
                  BAC is influenced by: amount of alcohol consumed, body weight (less weight = higher BAC), gender (women typically have higher BAC than men at the same weight), drinking rate (faster = higher peak BAC), food consumption (eating slows absorption), medications (some increase alcohol effects), overall health, and individual metabolism rate.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I speed up alcohol metabolism?</h3>
                <p className="text-gray-700 leading-relaxed">
                  No. Coffee, cold showers, exercise, or "sobering up" methods do not accelerate alcohol metabolism. Only time eliminates alcohol from your system at the rate of approximately 0.015% BAC per hour. The liver processes alcohol at this fixed rate regardless of any interventions.
                </p>
              </div>
            </div>
          </section>

          {/* Final Warning */}
          <section>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-300">
              <div className="flex items-start gap-4">
                <svg className="w-12 h-12 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="text-2xl font-bold text-red-900 mb-3">Critical Safety Reminder</h3>
                  <p className="text-red-900 mb-3 leading-relaxed">
                    <strong>Never drink and drive.</strong> This calculator provides estimates only and should never be used to determine fitness to drive or operate machinery. Even at BAC levels below the legal limit, alcohol impairs judgment, reaction time, and coordination.
                  </p>
                  <p className="text-red-900 leading-relaxed">
                    Always use designated drivers, taxis, rideshare services, or public transportation after drinking any amount of alcohol. Your life and the lives of others depend on it. If you or someone you know struggles with alcohol use, call SAMHSA's National Helpline at <strong>1-800-662-4357</strong> for free, confidential support 24/7.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

