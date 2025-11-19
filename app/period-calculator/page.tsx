import { Metadata } from 'next';
import Link from 'next/link';
import PeriodCalculator from '@/components/Calculator/PeriodCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl, getCategoryUrl } from '@/config/site';

const calculatorUrl = '/period-calculator';
const calculatorName = 'Period Calculator';

export const metadata: Metadata = {
  title: 'Period Calculator (Free, No signup) - Cycle Tracker | AICalculator',
  description: 'Free period calculator with no sign-up required. Calculate your next period date, track your menstrual cycle, and predict ovulation. Get a 6-month calendar with fertile window and PMS predictions.',
  keywords: ['period calculator', 'free period calculator', 'period calculator no signup', 'menstrual cycle calculator', 'period tracker', 'next period calculator', 'menstrual calendar', 'cycle tracker', 'period prediction', 'when is my next period', 'fertile window calculator', 'ovulation predictor', 'pms calculator', 'period calendar', 'menstrual cycle tracker', 'period due date', 'cycle length calculator', 'irregular period calculator', 'period tracker app', 'menstruation calculator', 'period date predictor', 'cycle calendar'],
  authors: [{ name: 'Calculator Tools' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  alternates: {
    canonical: getUrl(calculatorUrl),
  },
  openGraph: {
    title: 'Period Calculator (Free, No signup) - AICalculator',
    description: 'Free period calculator with no sign-up required. Calculate next period date, track menstrual cycle, and predict ovulation. Period tracker with 6-month calendar.',
    url: getUrl(calculatorUrl),
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage(),
        width: 1200,
        height: 630,
        alt: 'Period Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Period Calculator (Free, No signup) - AICalculator',
    description: 'Free period calculator with no sign-up required. Calculate next period date, track menstrual cycle, and predict ovulation. Period tracker with 6-month calendar.',
    images: [getOgImage()],
  },
};

export default function PeriodCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId(calculatorUrl),
        name: calculatorName,
        url: getUrl(calculatorUrl),
        description: 'Free online period calculator to track menstrual cycle, predict next period date, fertile window, and PMS symptoms.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Next period prediction',
          'Menstrual cycle tracking',
          'Fertile window calculation',
          'Ovulation prediction',
          'PMS symptoms timing',
          '6-month period calendar',
          'Cycle regularity analysis',
          'Share and export results',
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
            name: 'How does a period calculator work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A period calculator predicts your next period date by adding your average cycle length to the first day of your last period. It also calculates your fertile window (approximately 5-6 days around ovulation) and potential PMS symptom start date (typically 5-11 days before your period).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a normal menstrual cycle length?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A normal menstrual cycle typically ranges from 21 to 35 days, with the average being 28 days. Cycles between 24-32 days are considered regular. Variations of up to 7-9 days from month to month are common, especially in the first few years after menstruation begins and in the years approaching menopause.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate are period calculators?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Period calculators are most accurate for women with regular cycles. They provide estimates based on your average cycle length but cannot account for factors like stress, illness, travel, or hormonal changes that may affect timing. For best accuracy, track your cycles for at least 3-6 months and update your average cycle length regularly.',
            },
          },
          {
            '@type': 'Question',
            name: 'What should I do if my period is irregular?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If your menstrual cycle varies by more than 7-9 days each month, it is considered irregular. Track your cycles for at least 3 months to identify patterns. Common causes include stress, weight changes, excessive exercise, hormonal imbalances, or underlying medical conditions. Consult a healthcare provider if irregularity persists, especially if accompanied by heavy bleeding, severe pain, or missed periods.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are PMS symptoms and when do they start?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'PMS (Premenstrual Syndrome) refers to physical and emotional symptoms that occur 5-11 days before menstruation. Common symptoms include bloating, breast tenderness, mood swings, irritability, fatigue, food cravings, and headaches. Symptoms typically resolve within a few days after menstruation begins. Severe PMS symptoms may indicate PMDD (Premenstrual Dysphoric Disorder) and should be evaluated by a healthcare provider.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId(calculatorUrl),
        name: 'How to Track Your Menstrual Cycle',
        description: 'Step-by-step guide to calculate and track your period using a period calculator.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Last Period Date',
            text: 'Input the first day of your most recent menstrual period. This is considered day 1 of your cycle.',
            url: getStepUrl(calculatorUrl, 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Cycle Length',
            text: 'Specify your average menstrual cycle length in days (typically 21-35 days, with 28 being average).',
            url: getStepUrl(calculatorUrl, 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Period Duration',
            text: 'Input how many days your period typically lasts (usually 3-7 days, with 5 being average).',
            url: getStepUrl(calculatorUrl, 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate',
            text: 'Click calculate to see your next period date, fertile window, ovulation day, PMS timeline, and 6-month calendar.',
            url: getStepUrl(calculatorUrl, 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Track Regularly',
            text: 'Record your actual period start dates each month to refine your average cycle length and improve prediction accuracy.',
            url: getStepUrl(calculatorUrl, 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId(calculatorUrl),
        headline: 'Understanding Your Menstrual Cycle: Complete Period Tracking Guide',
        description: 'Comprehensive guide to understanding menstrual cycles, tracking periods, and managing reproductive health.',
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={getCategoryUrl('health')} className="text-blue-600 hover:text-blue-800 transition-colors">
              Health & Fitness
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Period Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Period Calculator - Free Online Menstrual Cycle Tracker & Calendar</h1>

      {/* Calculator Component */}
      <PeriodCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          {/* What is Period Calculator */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a Period Calculator?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                A <strong>period calculator</strong> is a health tool designed to help women track their menstrual cycles and predict future period dates. By entering the first day of your last period and your average cycle length, the calculator estimates when your next period will start, when you're most fertile, and when PMS symptoms might begin.
              </p>
              <p>
                The menstrual cycle is the monthly hormonal cycle that prepares the body for pregnancy. It begins on the first day of menstruation (day 1) and ends the day before the next period starts. The <strong>average cycle length is 28 days</strong>, but normal cycles can range from 21 to 35 days. Understanding your cycle helps you anticipate physical and emotional changes throughout the month.
              </p>
              <p>
                Our period calculator provides a comprehensive <strong>6-month calendar</strong> showing your predicted period dates, fertile windows, ovulation days, and PMS symptom timelines. It also analyzes your cycle regularity, helping you identify patterns or potential irregularities that may warrant medical attention.
              </p>
              <p>
                Regular period tracking is essential for reproductive health awareness, family planning, and identifying potential health issues early. Whether you're trying to conceive, avoid pregnancy, or simply understand your body better, a period calculator is an invaluable tool for menstrual health management.
              </p>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Period Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
                <div className="flex items-start gap-4">
                  <div className="bg-rose-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Last Period Date</h3>
                    <p className="text-sm text-gray-700">Input the first day of your most recent menstrual period. This marks day 1 of your cycle.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Cycle Length</h3>
                    <p className="text-sm text-gray-700">Specify your average cycle length (21-45 days). If unsure, use 28 days as a starting point.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Period Duration</h3>
                    <p className="text-sm text-gray-700">Input how many days your period typically lasts (2-10 days, average 5 days).</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">View Your Calendar</h3>
                    <p className="text-sm text-gray-700">Get your next period date, fertile window, ovulation day, PMS timeline, and 6-month calendar.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Your Menstrual Cycle */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Your Menstrual Cycle</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                The menstrual cycle consists of four distinct phases, each governed by hormonal changes:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-red-600">🩸</span> Menstrual Phase (Days 1-5)
                  </h3>
                  <p className="text-sm text-gray-700">
                    The period itself. The uterine lining (endometrium) sheds, resulting in menstrual bleeding. Hormone levels are at their lowest.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-blue-600">🌱</span> Follicular Phase (Days 1-13)
                  </h3>
                  <p className="text-sm text-gray-700">
                    Overlaps with menstruation. FSH stimulates follicle growth in ovaries. Estrogen rises, thickening the uterine lining for potential pregnancy.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-pink-600">✨</span> Ovulation Phase (Day 14)
                  </h3>
                  <p className="text-sm text-gray-700">
                    A surge in LH triggers the release of a mature egg from the ovary. This is the most fertile time of your cycle, lasting about 24 hours.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-yellow-600">🌙</span> Luteal Phase (Days 15-28)
                  </h3>
                  <p className="text-sm text-gray-700">
                    The corpus luteum produces progesterone, further thickening the uterine lining. If pregnancy doesn't occur, hormone levels drop, triggering menstruation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PMS and Symptoms */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding PMS and Menstrual Symptoms</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>Premenstrual Syndrome (PMS)</strong> refers to a collection of physical and emotional symptoms that occur during the luteal phase, typically 5-11 days before your period. Up to 75% of menstruating women experience some form of PMS.
              </p>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mt-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Common PMS Symptoms:</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-semibold text-purple-900 mb-2">Physical Symptoms:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Bloating and water retention</li>
                      <li>Breast tenderness and swelling</li>
                      <li>Fatigue and low energy</li>
                      <li>Headaches or migraines</li>
                      <li>Food cravings (especially sweets)</li>
                      <li>Acne breakouts</li>
                      <li>Muscle or joint pain</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900 mb-2">Emotional Symptoms:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Mood swings</li>
                      <li>Irritability or anger</li>
                      <li>Anxiety or tension</li>
                      <li>Depression or sadness</li>
                      <li>Difficulty concentrating</li>
                      <li>Changes in sleep patterns</li>
                      <li>Social withdrawal</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="mt-4">
                <strong>Managing PMS:</strong> Lifestyle modifications can significantly reduce PMS symptoms. Regular exercise, balanced nutrition (limiting salt, sugar, and caffeine), stress management techniques, adequate sleep, and staying hydrated all help. For severe symptoms that interfere with daily life, consult a healthcare provider about treatment options including hormonal birth control or other medications.
              </p>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For more comprehensive information on menstrual health, cycle tracking, and reproductive wellness, explore these authoritative medical resources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.acog.org/womens-health/faqs/menstruation"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">ACOG - Menstrual Health</h3>
                <p className="text-sm text-gray-600 mb-2">Official guidance on menstrual cycles, irregular periods, and reproductive health from the American College of Obstetricians and Gynecologists.</p>
                <span className="text-xs text-blue-600">acog.org →</span>
              </a>

              <a
                href="https://www.mayoclinic.org/healthy-lifestyle/womens-health/in-depth/menstrual-cycle/art-20047186"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Mayo Clinic - Menstrual Cycle</h3>
                <p className="text-sm text-gray-600 mb-2">Evidence-based information on understanding your menstrual cycle, tracking periods, and identifying abnormalities.</p>
                <span className="text-xs text-green-600">mayoclinic.org →</span>
              </a>

              <a
                href="https://www.womenshealth.gov/menstrual-cycle"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">OWH - Menstrual Cycle Guide</h3>
                <p className="text-sm text-gray-600 mb-2">Comprehensive menstrual health information from the Office on Women's Health, U.S. Department of Health and Human Services.</p>
                <span className="text-xs text-red-600">womenshealth.gov →</span>
              </a>

              <a
                href="https://www.nichd.nih.gov/health/topics/menstruation"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NIH - Menstruation Research</h3>
                <p className="text-sm text-gray-600 mb-2">Scientific research and clinical information on menstruation, PMS, and menstrual disorders from the National Institutes of Health.</p>
                <span className="text-xs text-purple-600">nih.gov →</span>
              </a>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/ovulation-calculator"
                className="block p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">🌸</div>
                <h3 className="font-bold text-gray-900 mb-2">Ovulation Calculator</h3>
                <p className="text-sm text-gray-600">Predict ovulation date and fertile window for conception planning</p>
              </Link>

              <Link
                href="/due-date-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">🤰</div>
                <h3 className="font-bold text-gray-900 mb-2">Due Date Calculator</h3>
                <p className="text-sm text-gray-600">Calculate pregnancy due date and track baby development milestones</p>
              </Link>

              <Link
                href="/bmi-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">⚖️</div>
                <h3 className="font-bold text-gray-900 mb-2">BMI Calculator</h3>
                <p className="text-sm text-gray-600">Check if your weight is in a healthy range for optimal reproductive health</p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How does a period calculator work?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A period calculator predicts your next period date by adding your average cycle length to the first day of your last period. It also calculates your fertile window (approximately 5-6 days around ovulation) and potential PMS symptom start date (typically 5-11 days before your period).
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is a normal menstrual cycle length?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A normal menstrual cycle typically ranges from 21 to 35 days, with the average being 28 days. Cycles between 24-32 days are considered regular. Variations of up to 7-9 days from month to month are common, especially in the first few years after menstruation begins and in the years approaching menopause.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How accurate are period calculators?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Period calculators are most accurate for women with regular cycles. They provide estimates based on your average cycle length but cannot account for factors like stress, illness, travel, or hormonal changes that may affect timing. For best accuracy, track your cycles for at least 3-6 months and update your average cycle length regularly.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What should I do if my period is irregular?</h3>
                <p className="text-gray-700 leading-relaxed">
                  If your menstrual cycle varies by more than 7-9 days each month, it is considered irregular. Track your cycles for at least 3 months to identify patterns. Common causes include stress, weight changes, excessive exercise, hormonal imbalances, or underlying medical conditions. Consult a healthcare provider if irregularity persists, especially if accompanied by heavy bleeding, severe pain, or missed periods.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are PMS symptoms and when do they start?</h3>
                <p className="text-gray-700 leading-relaxed">
                  PMS (Premenstrual Syndrome) refers to physical and emotional symptoms that occur 5-11 days before menstruation. Common symptoms include bloating, breast tenderness, mood swings, irritability, fatigue, food cravings, and headaches. Symptoms typically resolve within a few days after menstruation begins. Severe PMS symptoms may indicate PMDD (Premenstrual Dysphoric Disorder) and should be evaluated by a healthcare provider.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">When should I see a doctor about my menstrual cycle?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Consult a healthcare provider if you experience: periods lasting longer than 7 days, cycles shorter than 21 days or longer than 35 days, severe pain that interferes with daily activities, heavy bleeding requiring pad/tampon changes every 1-2 hours, bleeding between periods, missed periods (not due to pregnancy), or severe PMS symptoms affecting your quality of life.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

