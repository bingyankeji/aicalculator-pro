import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getCategoryUrl, getStepUrl } from '@/config/site';
import DueDateCalculator from '@/components/Calculator/DueDateCalculator';
import Link from 'next/link';
import { Baby, Calendar, Heart, Info, Activity, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Due Date Calculator (Free, No signup) - Baby Due Date | AICalculator',
  description: 'Free due date calculator with no sign-up required. With 3 calculation methods (LMP, conception, ultrasound). Get your estimated due date, pregnancy week, trimester timeline, prenatal checkup schedule, and baby development milestones.',
  keywords: [
    'due date calculator',
    'free due date calculator',
    'due date calculator no signup',
    'pregnancy calculator',
    'pregnancy due date calculator',
    'when is my due date',
    'calculate due date',
    'pregnancy week calculator',
    'conception date calculator',
    'lmp calculator',
    'estimated due date',
    'pregnancy timeline',
    'trimester calculator',
    'prenatal checkup schedule',
    'baby due date',
    'gestational age calculator',
    'ultrasound due date',
    'pregnancy calendar',
    'how many weeks pregnant',
    'baby development timeline',
    'pregnancy milestone calculator',
    'naegele rule calculator',
  ],
  authors: [{ name: 'AICalculator.pro' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl('/')),
  alternates: {
    canonical: getUrl('/due-date-calculator'),
  },
  openGraph: {
    title: 'Due Date Calculator (Free, No signup) - AICalculator',
    description: 'Free due date calculator with no sign-up required. Calculate your due date using LMP, conception date, or ultrasound. Get complete pregnancy timeline with checkup schedule and milestones.',
    url: getUrl('/due-date-calculator'),
    siteName: 'AICalculator.pro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage('pregnancy'),
        width: 1200,
        height: 630,
        alt: 'Due Date Calculator - Pregnancy Timeline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Due Date Calculator (Free, No signup) - AICalculator',
    description: 'Calculate due date with 3 methods. Get pregnancy timeline, checkup schedule, and milestones.',
    images: [getOgImage('pregnancy')],
    creator: '@AICalculatorPro',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function DueDateCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/due-date-calculator'),
        name: 'Due Date Calculator',
        url: getUrl('/due-date-calculator'),
        description: 'Free comprehensive due date calculator with multiple calculation methods including LMP, conception date, and ultrasound dating. Provides pregnancy timeline, trimester dates, prenatal checkup schedule, and baby development milestones.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Due date calculation using LMP (Naegele\'s Rule)',
          'Conception date method',
          'Ultrasound dating method',
          'Current pregnancy week and day',
          'Trimester timeline',
          'Prenatal checkup schedule',
          'Baby development milestones',
          'Full term and delivery window dates',
          'Export results as image',
          'Share pregnancy timeline via URL',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/due-date-calculator'),
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
            item: getCategoryUrl('health'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Due Date Calculator',
            item: getUrl('/due-date-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/due-date-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How is due date calculated from last menstrual period?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Due date is calculated using Naegele\'s Rule, which adds 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a 28-day menstrual cycle with ovulation occurring on day 14. The formula: Due Date = LMP + 280 days. For example, if your LMP was January 1, your due date would be October 8. This method has been used since the 1830s and remains the standard initial dating method. However, ultrasound dating between 11-14 weeks is considered more accurate and may adjust your due date by several days.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which due date calculation method is most accurate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ultrasound dating performed between 11-14 weeks of pregnancy is the most accurate method, with accuracy within 3-5 days. Early ultrasound measures crown-rump length (CRL) of the fetus, which correlates strongly with gestational age. LMP-based calculation is accurate if you have regular 28-day cycles and know your exact LMP date, but can be off by 1-2 weeks with irregular cycles. Conception date method is accurate only if you know the exact date of conception. Medical guidelines recommend using the earliest ultrasound for dating when there\'s a discrepancy of more than 7 days between LMP and ultrasound dating.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is full term pregnancy and when is it safe to deliver?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Full term pregnancy is defined by the American College of Obstetricians and Gynecologists (ACOG) as 37-42 weeks. Specifically: Early term is 37 weeks 0 days to 38 weeks 6 days. Full term is 39 weeks 0 days to 40 weeks 6 days. Late term is 41 weeks 0 days to 41 weeks 6 days. Post term is 42 weeks 0 days onward. Babies born at 39-40 weeks have the lowest risk of complications. Delivery before 37 weeks is considered preterm and carries higher risks. After 42 weeks, risks increase and induction is typically recommended. Only 4% of babies arrive on their exact due date, with most arriving within 2 weeks before or after.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many prenatal checkups should I have during pregnancy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Standard prenatal care schedule includes 10-15 visits for uncomplicated pregnancies. Schedule: First visit at 8-12 weeks for dating ultrasound and initial screening. Monthly visits from weeks 4-28 (approximately 6 visits). Bi-weekly visits from weeks 28-36 (approximately 4 visits). Weekly visits from weeks 36-40 (approximately 4-5 visits). Key appointments include: 8-12 weeks (dating ultrasound), 16 weeks (maternal serum screening), 18-22 weeks (anatomy scan), 24-28 weeks (glucose screening), 36 weeks (Group B strep test). High-risk pregnancies require more frequent monitoring. Virtual visits may supplement in-person appointments.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the three trimesters of pregnancy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pregnancy is divided into three trimesters based on fetal development stages. First Trimester (Weeks 1-13): Major organs form, morning sickness common, miscarriage risk highest, fetal heartbeat detectable at 6 weeks. Second Trimester (Weeks 14-26): Often called "honeymoon phase" with increased energy, baby movements felt (18-25 weeks), anatomy scan at 20 weeks, gender typically visible. Third Trimester (Weeks 27-40): Rapid fetal growth, increased discomfort, Braxton Hicks contractions, baby drops into pelvis, final preparations for birth. Each trimester brings unique physical changes, fetal developments, and medical screenings. Understanding trimester milestones helps expectant parents know what to expect.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/due-date-calculator'),
        name: 'How to Calculate Your Due Date',
        description: 'Step-by-step guide to calculating your pregnancy due date using different methods',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Calculation Method',
            text: 'Select your preferred method: Last Menstrual Period (LMP) for most common calculation, Conception Date if you know when you conceived, or Ultrasound Date for most accurate dating.',
            url: getStepUrl('/due-date-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Your Date',
            text: 'Input the first day of your last menstrual period, your conception date, or your ultrasound date with gestational age measurement.',
            url: getStepUrl('/due-date-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Due Date',
            text: 'The calculator applies Naegele\'s Rule (LMP + 280 days) or adjusts based on conception date (+ 266 days) or ultrasound measurements.',
            url: getStepUrl('/due-date-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Review Pregnancy Timeline',
            text: 'View your current pregnancy week, trimester, due date range, and key milestones including first baby movement and full term date.',
            url: getStepUrl('/due-date-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Check Prenatal Schedule',
            text: 'Review recommended prenatal checkup dates, important tests, and baby development milestones throughout your pregnancy.',
            url: getStepUrl('/due-date-calculator', 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/due-date-calculator'),
        headline: 'Due Date Calculator - Complete Guide to Pregnancy Dating',
        description: 'Comprehensive guide to calculating your due date, understanding pregnancy trimesters, and tracking prenatal care milestones.',
        image: getOgImage('pregnancy'),
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Due Date Calculator (Free, No signup)"
        calculatorUrl="/due-date-calculator"
      />
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Due Date Calculator - Free Online Pregnancy Calculator</h1>

      {/* Calculator Component */}
      <DueDateCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          
          {/* Understanding Due Date Calculation */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calendar className="h-8 w-8 text-pink-600" />
              Understanding Due Date Calculation
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                Your <strong>estimated due date (EDD)</strong> is the date your healthcare provider expects your baby to be born, calculated as 40 weeks (280 days) from the first day of your last menstrual period (LMP). This calculation method, called <strong>Naegele's Rule</strong>, has been used since the 1830s.
              </p>
              <p className="leading-relaxed">
                It's important to understand that a due date is an estimate, not a guarantee. Only about 4% of babies arrive on their exact due date. Most babies (about 90%) are born within two weeks before or after the due date. This is why doctors refer to a "due date range" rather than a specific day.
              </p>
              <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5 text-pink-600" />
                  Why 40 Weeks?
                </h3>
                <p className="text-sm text-gray-700">
                  The 40-week pregnancy timeline is measured from your LMP, not from conception. Since conception typically occurs about 2 weeks after your LMP (during ovulation), the actual fetal development time is approximately 38 weeks. This two-week difference exists because it's easier to identify the start of menstruation than the exact moment of conception.
                </p>
              </div>
            </div>
          </section>

          {/* Calculation Methods */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Due Date Calculation Methods</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📅 Last Menstrual Period (LMP)</h3>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Most Common Method</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Formula: LMP + 280 days</li>
                  <li>• Assumes 28-day cycle</li>
                  <li>• Ovulation on day 14</li>
                  <li>• Used for initial estimation</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 Conception Date</h3>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>If You Know Conception</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Formula: Conception + 266 days</li>
                  <li>• More accurate if known</li>
                  <li>• Common with IVF/IUI</li>
                  <li>• 38-week fetal age</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🔬 Ultrasound Dating</h3>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Most Accurate Method</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Crown-rump length (CRL)</li>
                  <li>• Accurate within 3-5 days</li>
                  <li>• Best at 11-14 weeks</li>
                  <li>• Overrides LMP if ≥7 days off</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pregnancy Trimesters */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-600" />
              Pregnancy Trimesters
            </h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">First Trimester (Weeks 1-13)</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Baby Development:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>All major organs form</li>
                      <li>Heart begins beating (week 5-6)</li>
                      <li>Limbs develop</li>
                      <li>Brain and spinal cord form</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Mom's Experience:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Morning sickness common</li>
                      <li>Fatigue and breast tenderness</li>
                      <li>Frequent urination</li>
                      <li>Emotional changes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Second Trimester (Weeks 14-26)</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Baby Development:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Gender visible on ultrasound</li>
                      <li>Hair and nails grow</li>
                      <li>Baby can hear sounds</li>
                      <li>Movements felt (quickening)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Mom's Experience:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Energy returns ("honeymoon phase")</li>
                      <li>Baby bump becomes visible</li>
                      <li>Reduced nausea</li>
                      <li>Feel baby movements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Third Trimester (Weeks 27-40)</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Baby Development:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Rapid weight gain</li>
                      <li>Lungs mature</li>
                      <li>Baby practices breathing</li>
                      <li>Positioned for birth</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Mom's Experience:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Increased discomfort</li>
                      <li>Braxton Hicks contractions</li>
                      <li>Shortness of breath</li>
                      <li>Preparing for labor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How is due date calculated from last menstrual period?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Due date is calculated using Naegele's Rule, which adds 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a 28-day menstrual cycle with ovulation occurring on day 14. The formula: Due Date = LMP + 280 days. For example, if your LMP was January 1, your due date would be October 8. This method has been used since the 1830s and remains the standard initial dating method. However, ultrasound dating between 11-14 weeks is considered more accurate and may adjust your due date by several days.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Which due date calculation method is most accurate?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ultrasound dating performed between 11-14 weeks of pregnancy is the most accurate method, with accuracy within 3-5 days. Early ultrasound measures crown-rump length (CRL) of the fetus, which correlates strongly with gestational age. LMP-based calculation is accurate if you have regular 28-day cycles and know your exact LMP date, but can be off by 1-2 weeks with irregular cycles. Conception date method is accurate only if you know the exact date of conception. Medical guidelines recommend using the earliest ultrasound for dating when there's a discrepancy of more than 7 days between LMP and ultrasound dating.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is full term pregnancy and when is it safe to deliver?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Full term pregnancy is defined by the American College of Obstetricians and Gynecologists (ACOG) as 37-42 weeks. Specifically: Early term is 37 weeks 0 days to 38 weeks 6 days. Full term is 39 weeks 0 days to 40 weeks 6 days. Late term is 41 weeks 0 days to 41 weeks 6 days. Post term is 42 weeks 0 days onward. Babies born at 39-40 weeks have the lowest risk of complications. Delivery before 37 weeks is considered preterm and carries higher risks. After 42 weeks, risks increase and induction is typically recommended. Only 4% of babies arrive on their exact due date, with most arriving within 2 weeks before or after.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How many prenatal checkups should I have during pregnancy?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Standard prenatal care schedule includes 10-15 visits for uncomplicated pregnancies. Schedule: First visit at 8-12 weeks for dating ultrasound and initial screening. Monthly visits from weeks 4-28 (approximately 6 visits). Bi-weekly visits from weeks 28-36 (approximately 4 visits). Weekly visits from weeks 36-40 (approximately 4-5 visits). Key appointments include: 8-12 weeks (dating ultrasound), 16 weeks (maternal serum screening), 18-22 weeks (anatomy scan), 24-28 weeks (glucose screening), 36 weeks (Group B strep test). High-risk pregnancies require more frequent monitoring. Virtual visits may supplement in-person appointments.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are the three trimesters of pregnancy?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Pregnancy is divided into three trimesters based on fetal development stages. First Trimester (Weeks 1-13): Major organs form, morning sickness common, miscarriage risk highest, fetal heartbeat detectable at 6 weeks. Second Trimester (Weeks 14-26): Often called "honeymoon phase" with increased energy, baby movements felt (18-25 weeks), anatomy scan at 20 weeks, gender typically visible. Third Trimester (Weeks 27-40): Rapid fetal growth, increased discomfort, Braxton Hicks contractions, baby drops into pelvis, final preparations for birth. Each trimester brings unique physical changes, fetal developments, and medical screenings. Understanding trimester milestones helps expectant parents know what to expect.
                </p>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Learn more about pregnancy, prenatal care, and baby development from these trusted medical authorities:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">ACOG - Fetal Growth & Development</h3>
                <p className="text-sm text-gray-600 mb-2">American College of Obstetricians and Gynecologists guidelines on pregnancy timeline and fetal development milestones.</p>
                <span className="text-xs text-blue-600">acog.org →</span>
              </a>

              <a 
                href="https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20044882"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">Mayo Clinic - Prenatal Care</h3>
                <p className="text-sm text-gray-600 mb-2">Comprehensive prenatal care guide, checkup schedules, and what to expect during pregnancy from Mayo Clinic experts.</p>
                <span className="text-xs text-green-600">mayoclinic.org →</span>
              </a>

              <a 
                href="https://www.cdc.gov/pregnancy/during.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">CDC - Pregnancy Information</h3>
                <p className="text-sm text-gray-600 mb-2">Centers for Disease Control pregnancy health guidelines, safety information, and recommended screenings.</p>
                <span className="text-xs text-purple-600">cdc.gov →</span>
              </a>

              <a 
                href="https://www.nichd.nih.gov/health/topics/pregnancy"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NIH - Pregnancy Research</h3>
                <p className="text-sm text-gray-600 mb-2">National Institutes of Health research on pregnancy health, fetal development, and maternal well-being.</p>
                <span className="text-xs text-orange-600">nichd.nih.gov →</span>
              </a>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Health & Pregnancy Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/ovulation-calculator"
                className="block p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-6 w-6 text-pink-600" />
                  <h3 className="font-bold text-gray-900">Ovulation Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate your fertile window and ovulation date</p>
              </Link>

              <Link 
                href="/period-calculator"
                className="block p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-gray-900">Period Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Track your menstrual cycle and predict next period</p>
              </Link>

              <Link 
                href="/bmi-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900">BMI Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate healthy weight range for pregnancy</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

