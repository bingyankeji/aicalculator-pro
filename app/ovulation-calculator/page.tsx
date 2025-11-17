import { Metadata } from 'next';
import Link from 'next/link';
import OvulationCalculator from '@/components/Calculator/OvulationCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl, getCategoryUrl } from '@/config/site';

const calculatorUrl = '/ovulation-calculator';
const calculatorName = 'Ovulation Calculator';

export const metadata: Metadata = {
  title: 'Ovulation Calculator - Free Fertility Calendar & Ovulation Tracker',
  description: 'Calculate your ovulation date, fertile window, and peak fertility days with our free ovulation calculator. Track your menstrual cycle and identify the best time for conception with a 6-month fertility calendar.',
  keywords: ['ovulation calculator', 'fertility calculator', 'ovulation tracker', 'fertile window calculator', 'conception calculator', 'ovulation date predictor', 'menstrual cycle calculator', 'fertility calendar', 'ovulation predictor', 'best time to conceive', 'peak fertility days', 'pregnancy planning calculator', 'cycle tracker', 'fertile days calculator', 'when do i ovulate', 'ovulation calendar', 'fertility window', 'getting pregnant calculator', 'conception date calculator', 'ovulation prediction'],
  authors: [{ name: 'Calculator Tools' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  alternates: {
    canonical: getUrl(calculatorUrl),
  },
  openGraph: {
    title: 'Ovulation Calculator - Track Your Fertile Window',
    description: 'Calculate ovulation date, fertile window, and peak fertility days. Free ovulation tracker with 6-month fertility calendar.',
    url: getUrl(calculatorUrl),
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage(),
        width: 1200,
        height: 630,
        alt: 'Ovulation Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ovulation Calculator - Track Your Fertile Window',
    description: 'Calculate ovulation date, fertile window, and peak fertility days. Free ovulation tracker with 6-month fertility calendar.',
    images: [getOgImage()],
  },
};

export default function OvulationCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId(calculatorUrl),
        name: calculatorName,
        url: getUrl(calculatorUrl),
        description: 'Free online ovulation calculator to predict fertile window, ovulation date, and peak fertility days based on menstrual cycle.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Ovulation date prediction',
          'Fertile window calculation',
          'Peak fertility days identification',
          '6-month fertility calendar',
          'Next period prediction',
          'Pregnancy test date calculation',
          'Cycle phase tracking',
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
            name: 'How does the ovulation calculator work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The ovulation calculator predicts your ovulation date by subtracting 14 days from your expected next period date (based on your average cycle length). It then identifies your fertile window as the 5-6 days surrounding ovulation, with peak fertility occurring in the 2 days before ovulation and ovulation day itself.',
            },
          },
          {
            '@type': 'Question',
            name: 'When is the best time to conceive?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best time to conceive is during your fertile window, particularly the 2 days before ovulation and ovulation day itself. Sperm can live up to 5 days in the female reproductive tract, so having intercourse in the days leading up to ovulation increases your chances of conception.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate is an ovulation calculator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ovulation calculators are most accurate for women with regular cycles (21-35 days). They use the standard calculation that ovulation occurs 12-16 days before the next period. For irregular cycles, consider using ovulation predictor kits or tracking basal body temperature for more precision.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a fertile window?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The fertile window is the 5-6 day period during your menstrual cycle when pregnancy is possible. It includes the 5 days before ovulation and ovulation day itself. The highest probability of conception occurs during the 2 days before ovulation.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get pregnant outside my fertile window?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'While the fertile window represents the highest probability time for conception, pregnancy can occasionally occur outside this window due to variations in ovulation timing, sperm survival, or cycle irregularities. However, the chances are significantly lower outside the fertile window.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId(calculatorUrl),
        name: 'How to Calculate Your Ovulation Date',
        description: 'Step-by-step guide to calculate your ovulation date and identify your fertile window.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Last Period Date',
            text: 'Input the first day of your last menstrual period.',
            url: getStepUrl(calculatorUrl, 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Cycle Length',
            text: 'Specify your average menstrual cycle length (typically 21-35 days, average 28).',
            url: getStepUrl(calculatorUrl, 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Period Duration',
            text: 'Input how many days your period typically lasts (optional but helpful for phase tracking).',
            url: getStepUrl(calculatorUrl, 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate',
            text: 'Click calculate to see your ovulation date, fertile window, peak fertility days, and 6-month calendar.',
            url: getStepUrl(calculatorUrl, 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Track Your Cycle',
            text: 'Use the 6-month fertility calendar to plan ahead and track multiple cycles.',
            url: getStepUrl(calculatorUrl, 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId(calculatorUrl),
        headline: 'Understanding Ovulation and Fertility: Complete Guide',
        description: 'Comprehensive guide to understanding ovulation, fertile window, and how to optimize your chances of conception.',
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
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
            <span className="text-gray-600 font-medium">Ovulation Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Ovulation Calculator - Free Online Fertility Calendar & Ovulation Tracker</h1>

      {/* Calculator Component */}
      <OvulationCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          {/* What is Ovulation Calculator */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is an Ovulation Calculator?</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                An <strong>ovulation calculator</strong> is a fertility tool that predicts when you're most likely to ovulate based on your menstrual cycle information. By tracking your cycle length and the first day of your last period, the calculator identifies your <strong>fertile window</strong>—the days when conception is most likely to occur.
              </p>
              <p>
                Ovulation is the process where a mature egg is released from the ovary, making it available for fertilization. This typically occurs about <strong>12-16 days before your next period</strong>, regardless of cycle length. The ovulation calculator uses this biological pattern to predict your most fertile days.
              </p>
              <p>
                The <strong>fertile window</strong> spans approximately 5-6 days: the 5 days before ovulation and ovulation day itself. During this time, sperm can survive in the female reproductive tract and fertilize the egg. The highest probability of conception occurs during the <strong>2 days before ovulation</strong> and ovulation day.
              </p>
              <p>
                Our ovulation calculator provides a comprehensive 6-month fertility calendar, helping you plan ahead and understand your cycle patterns. It also identifies key dates like your next expected period and the best time to take a pregnancy test.
              </p>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Ovulation Calculator</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Last Period Date</h3>
                    <p className="text-sm text-gray-700">Input the first day of your most recent menstrual period. This is day 1 of your cycle.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Cycle Length</h3>
                    <p className="text-sm text-gray-700">Specify your average cycle length (21-35 days). The average is 28 days, but cycles vary by individual.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Enter Period Duration</h3>
                    <p className="text-sm text-gray-700">Input how many days your period lasts (typically 3-7 days). This helps track cycle phases.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">View Your Results</h3>
                    <p className="text-sm text-gray-700">Get your ovulation date, fertile window, peak fertility days, and a 6-month calendar.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Understanding Fertile Window */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Your Fertile Window</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Your <strong>fertile window</strong> is the most critical timeframe for conception. It encompasses the days when sperm can fertilize an egg, which includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>5 days before ovulation:</strong> Sperm can survive in the female reproductive tract for up to 5 days, waiting for the egg to be released.</li>
                <li><strong>Ovulation day:</strong> The egg is released and can be fertilized for about 12-24 hours.</li>
                <li><strong>Peak fertility (2 days before ovulation + ovulation day):</strong> This is when conception is most likely, with up to a 30% chance per cycle.</li>
              </ul>
              <p>
                Having intercourse during the fertile window—especially during peak fertility days—significantly increases your chances of getting pregnant. Studies show that couples who time intercourse within this window have the highest conception rates.
              </p>
              <p>
                It's important to note that ovulation timing can vary slightly from cycle to cycle, even in women with regular periods. For more precise tracking, consider using <strong>ovulation predictor kits (OPKs)</strong>, <strong>basal body temperature (BBT) charting</strong>, or <strong>cervical mucus monitoring</strong> alongside the calculator.
              </p>
            </div>
          </section>

          {/* Menstrual Cycle Phases */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Four Phases of Your Menstrual Cycle</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-red-600">🩸</span> 1. Menstrual Phase
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Duration:</strong> 3-7 days (average 5 days)<br/>
                  <strong>What happens:</strong> The uterine lining sheds, resulting in menstrual bleeding. This marks day 1 of your cycle.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-blue-600">🌱</span> 2. Follicular Phase
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Duration:</strong> Variable (overlaps with menstrual phase)<br/>
                  <strong>What happens:</strong> Follicles in the ovaries mature, and one becomes dominant. Estrogen levels rise, preparing the uterine lining.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-pink-600">✨</span> 3. Ovulation Phase
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Duration:</strong> 1-2 days<br/>
                  <strong>What happens:</strong> A mature egg is released from the ovary. This is your most fertile time, with the highest chance of conception.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-yellow-600">🌙</span> 4. Luteal Phase
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Duration:</strong> 12-16 days (typically 14 days)<br/>
                  <strong>What happens:</strong> The corpus luteum produces progesterone, thickening the uterine lining. If no pregnancy occurs, progesterone drops and menstruation begins.
                </p>
              </div>
            </div>
          </section>

          {/* Tips for Conception */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips to Increase Your Chances of Conception</h2>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-gray-900">Time intercourse correctly:</strong> Have intercourse every 1-2 days during your fertile window, especially the 2 days before ovulation.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-gray-900">Track multiple cycles:</strong> Use the 6-month calendar to identify patterns and pinpoint your ovulation more accurately over time.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-gray-900">Use ovulation tests:</strong> Combine the calculator with OPKs that detect the LH surge 24-36 hours before ovulation.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-gray-900">Monitor cervical mucus:</strong> Look for clear, stretchy "egg white" cervical mucus, which indicates peak fertility.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-gray-900">Maintain a healthy lifestyle:</strong> Eat a balanced diet, maintain a healthy weight, reduce stress, avoid smoking and excessive alcohol.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-gray-900">Take prenatal vitamins:</strong> Start taking folic acid (400-800 mcg daily) before conception to support fetal development.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-gray-900">Consult a healthcare provider:</strong> If you haven't conceived after 12 months (or 6 months if over 35), seek medical advice.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For more comprehensive information on ovulation, fertility, and conception, explore these authoritative medical resources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://www.acog.org/womens-health/faqs/evaluating-infertility"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">ACOG - Evaluating Infertility</h3>
                <p className="text-sm text-gray-600 mb-2">Official guidance on fertility evaluation and treatment options from the American College of Obstetricians and Gynecologists.</p>
                <span className="text-xs text-blue-600">acog.org →</span>
              </a>

              <a
                href="https://www.mayoclinic.org/healthy-lifestyle/getting-pregnant/in-depth/how-to-get-pregnant/art-20047611"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Mayo Clinic - How to Get Pregnant</h3>
                <p className="text-sm text-gray-600 mb-2">Evidence-based advice on optimizing fertility, timing intercourse, and improving conception chances.</p>
                <span className="text-xs text-green-600">mayoclinic.org →</span>
              </a>

              <a
                href="https://www.cdc.gov/reproductivehealth/infertility/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">CDC - Reproductive Health & Infertility</h3>
                <p className="text-sm text-gray-600 mb-2">Public health information on fertility, infertility statistics, and assisted reproductive technology from the CDC.</p>
                <span className="text-xs text-red-600">cdc.gov →</span>
              </a>

              <a
                href="https://www.nichd.nih.gov/health/topics/womenshealth/conditioninfo/menstruation"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NIH - Menstruation & Menstrual Cycle</h3>
                <p className="text-sm text-gray-600 mb-2">Scientific research and detailed information on menstrual cycle phases, ovulation, and reproductive health from the NIH.</p>
                <span className="text-xs text-purple-600">nih.gov →</span>
              </a>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/due-date-calculator"
                className="block p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">🤰</div>
                <h3 className="font-bold text-gray-900 mb-2">Due Date Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your baby's due date and track pregnancy milestones</p>
              </Link>

              <Link
                href="/bmi-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">⚖️</div>
                <h3 className="font-bold text-gray-900 mb-2">BMI Calculator</h3>
                <p className="text-sm text-gray-600">Check if your weight is in a healthy range for conception</p>
              </Link>

              <Link
                href="/calorie-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">🍎</div>
                <h3 className="font-bold text-gray-900 mb-2">Calorie Calculator</h3>
                <p className="text-sm text-gray-600">Calculate daily caloric needs for optimal fertility health</p>
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How does the ovulation calculator work?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The ovulation calculator predicts your ovulation date by subtracting 14 days from your expected next period date (based on your average cycle length). It then identifies your fertile window as the 5-6 days surrounding ovulation, with peak fertility occurring in the 2 days before ovulation and ovulation day itself.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">When is the best time to conceive?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The best time to conceive is during your fertile window, particularly the 2 days before ovulation and ovulation day itself. Sperm can live up to 5 days in the female reproductive tract, so having intercourse in the days leading up to ovulation increases your chances of conception.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How accurate is an ovulation calculator?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ovulation calculators are most accurate for women with regular cycles (21-35 days). They use the standard calculation that ovulation occurs 12-16 days before the next period. For irregular cycles, consider using ovulation predictor kits or tracking basal body temperature for more precision.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is a fertile window?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The fertile window is the 5-6 day period during your menstrual cycle when pregnancy is possible. It includes the 5 days before ovulation and ovulation day itself. The highest probability of conception occurs during the 2 days before ovulation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I get pregnant outside my fertile window?</h3>
                <p className="text-gray-700 leading-relaxed">
                  While the fertile window represents the highest probability time for conception, pregnancy can occasionally occur outside this window due to variations in ovulation timing, sperm survival, or cycle irregularities. However, the chances are significantly lower outside the fertile window.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What if I have irregular cycles?</h3>
                <p className="text-gray-700 leading-relaxed">
                  If your cycles are irregular (varying by more than 7-9 days), the ovulation calculator may be less accurate. Consider tracking your cycles for 3-6 months to find your average, or use additional methods like ovulation predictor kits (OPKs), basal body temperature charting, or cervical mucus monitoring for more precise ovulation detection.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

