import { Metadata } from "next";
import { PregnancyCalculator } from "@/components/Calculator/PregnancyCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pregnancy Calculator (Free, No signup) - Due Date | AICalculator",
  description: "Free pregnancy calculator with no sign-up required. Estimate your due date and track pregnancy week by week. Calculate from LMP, conception date, or ultrasound. Get trimester info, milestones, and prenatal appointment schedule.",
  keywords: [
    "pregnancy calculator",
    "free pregnancy calculator",
    "pregnancy calculator no signup",
    "due date calculator",
    "pregnancy week calculator",
    "conception calculator",
    "pregnancy due date",
    "when is my due date",
    "how many weeks pregnant am I",
    "pregnancy calendar",
    "trimester calculator",
    "gestational age calculator",
    "LMP calculator",
    "ultrasound due date calculator",
    "conception date calculator",
    "pregnancy milestone calculator",
    "prenatal calculator",
  ],
  openGraph: {
    title: "Pregnancy Calculator (Free, No signup) - AICalculator",
    description: "Free pregnancy calculator with no sign-up required. Estimate your due date from LMP, conception, or ultrasound. Track your pregnancy week by week with milestones and appointments.",
    type: "website",
    url: "https://aicalculator.pro/pregnancy-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Calculator (Free, No signup) - AICalculator",
    description: "Free pregnancy calculator with no sign-up required. Calculate your due date and track pregnancy week by week with trimester info and milestones.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/pregnancy-calculator",
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

export default function PregnancyCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Pregnancy Calculator",
        "url": "https://aicalculator.pro/pregnancy-calculator",
        "description": "Free pregnancy calculator to estimate your due date and track pregnancy week by week. Calculate from last menstrual period (LMP), conception date, or ultrasound results.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate due date from LMP",
          "Calculate due date from conception date",
          "Calculate due date from ultrasound",
          "Track pregnancy week by week",
          "View trimester breakdown",
          "See pregnancy milestones",
          "Get prenatal appointment schedule",
          "Adjust for cycle length"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aicalculator.pro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Health & Fitness",
            "item": "https://aicalculator.pro/health-fitness"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Pregnancy Calculator",
            "item": "https://aicalculator.pro/pregnancy-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my pregnancy due date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your due date, enter the first day of your last menstrual period (LMP) and your average cycle length. The calculator uses Naegele's Rule, adding 280 days (40 weeks) to your LMP and adjusting for cycle length. You can also calculate from conception date (add 266 days) or ultrasound dating."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is a pregnancy due date calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A pregnancy calculator provides an estimated due date with about 5% accuracy - only 5% of babies are born on their exact due date. Most babies arrive between 38-42 weeks. Ultrasound dating in the first trimester (especially at 8-12 weeks) is the most accurate method, typically within 3-5 days."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between gestational age and fetal age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gestational age is calculated from the first day of your last menstrual period (LMP) and is the standard used by healthcare providers. Fetal age (conceptional age) is calculated from conception, typically 2 weeks less than gestational age since conception usually occurs about 14 days after LMP."
            }
          },
          {
            "@type": "Question",
            "name": "When does each trimester start and end?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The first trimester is weeks 1-13, the second trimester is weeks 14-27, and the third trimester is weeks 28-40+. The first trimester focuses on organ development, the second on growth and movement, and the third on final development and preparing for birth."
            }
          },
          {
            "@type": "Question",
            "name": "How does cycle length affect my due date calculation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The standard pregnancy calculation assumes a 28-day cycle with ovulation on day 14. If your cycle is longer (e.g., 35 days), your due date moves later. If shorter (e.g., 21 days), it moves earlier. Each day difference from 28 adjusts your due date by one day in the same direction."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator if I did IVF or fertility treatments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! For IVF pregnancies, use the 'Conception Date' method and enter your embryo transfer date. For a 3-day transfer, add 3 days; for a 5-day transfer (blastocyst), add 5 days to your transfer date. This gives you the most accurate due date for IVF pregnancies."
            }
          },
          {
            "@type": "Question",
            "name": "What prenatal appointments should I expect during pregnancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typical prenatal schedule: First visit at 8-10 weeks, monthly visits until 28 weeks, bi-weekly until 36 weeks, then weekly until delivery. Key tests include: NT scan (11-14 weeks), anatomy scan (18-22 weeks), glucose test (24-28 weeks), and Group B strep test (35-37 weeks)."
            }
          },
          {
            "@type": "Question",
            "name": "What if my ultrasound due date differs from my LMP due date?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If the difference is 7+ days, your doctor will likely use the ultrasound date, especially from a first-trimester scan (most accurate). Early ultrasounds (8-12 weeks) are accurate within 3-5 days. LMP calculations can be off if you have irregular cycles, don't remember your exact LMP, or ovulated later than day 14."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Your Pregnancy Due Date",
        "description": "Step-by-step guide to calculating your pregnancy due date using our pregnancy calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Calculation Method",
            "text": "Select your preferred calculation method: Last Menstrual Period (LMP) for standard calculation, Conception Date if you know when you conceived, or Ultrasound if you have dating scan results."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Required Information",
            "text": "For LMP method: Enter the first day of your last period and your average cycle length (typically 28 days). For conception method: Enter the date you conceived. For ultrasound: Enter scan date and gestational age shown."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Calculate Due Date",
            "text": "Click 'Calculate Due Date' to see your estimated delivery date, current pregnancy week, trimester information, and important milestone dates throughout your pregnancy."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Your Results",
            "text": "View your complete pregnancy timeline including due date, current week/day, trimester breakdown, upcoming prenatal appointments, and developmental milestones to track throughout your pregnancy."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Share or Save",
            "text": "Share your due date and pregnancy information with your partner, family, or healthcare provider. Keep the link handy to track your progress throughout pregnancy."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">Pregnancy Calculator - Free Due Date Calculator & Pregnancy Week Calculator</h1>
      
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
              <a href="/health-fitness" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Health & Fitness</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Pregnancy Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <PregnancyCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center hidden lg:block">
              Understanding Pregnancy Calculators & Due Dates
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Pregnancy Calculator?</h3>
                <p className="text-gray-700 mb-4">
                  A pregnancy calculator (also called a due date calculator or pregnancy week calculator) is a tool that estimates your baby's due date based on various inputs like your last menstrual period (LMP), conception date, or ultrasound results.
                </p>
                <p className="text-gray-700">
                  Healthcare providers use a standard 40-week (280-day) pregnancy timeline from the first day of your last period. This is called <strong>gestational age</strong> and is the universal standard for tracking pregnancy, even though conception typically occurs about 2 weeks after your period starts.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How Does Due Date Calculation Work?</h3>
                <p className="text-gray-700 mb-4">
                  The most common method is <strong>Naegele's Rule</strong>: Add 280 days (40 weeks) to the first day of your last menstrual period. For women with regular 28-day cycles, this is highly accurate.
                </p>
                <p className="text-gray-700">
                  <strong>Adjustments:</strong> If your cycle is longer or shorter than 28 days, the calculator adjusts accordingly. For example, a 35-day cycle adds 7 days to your due date. Ultrasound dating in the first trimester is the most accurate method, typically within 3-5 days.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The Three Trimesters Explained</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <h4 className="font-bold text-pink-900 mb-1">First Trimester (Weeks 1-13)</h4>
                    <p className="text-sm text-gray-700">Critical organ development period. Highest risk of miscarriage (decreases significantly after week 12). Morning sickness typically peaks around week 9-10.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-1">Second Trimester (Weeks 14-27)</h4>
                    <p className="text-sm text-gray-700">Often called the "golden period." Energy returns, morning sickness subsides. Baby's movements felt (quickening) around weeks 16-25. Anatomy scan at week 20.</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-1">Third Trimester (Weeks 28-40+)</h4>
                    <p className="text-sm text-gray-700">Final development and growth. Baby gains most weight. Increased prenatal visits. Full term begins at week 37. Most babies born between weeks 38-42.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Pregnancy Milestones</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold mt-1">•</span>
                    <span><strong>Week 6:</strong> Baby's heartbeat can be detected on ultrasound</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold mt-1">•</span>
                    <span><strong>Week 12:</strong> End of first trimester, miscarriage risk drops significantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold mt-1">•</span>
                    <span><strong>Week 20:</strong> Halfway mark! Anatomy scan performed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold mt-1">•</span>
                    <span><strong>Week 24:</strong> Viability milestone - baby could survive with medical intervention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold mt-1">•</span>
                    <span><strong>Week 37:</strong> Early full term - baby is considered fully developed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center hidden lg:block">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my pregnancy due date?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate your due date, enter the first day of your last menstrual period (LMP) and your average cycle length. The calculator uses Naegele's Rule, adding 280 days (40 weeks) to your LMP and adjusting for cycle length. You can also calculate from conception date (add 266 days) or ultrasound dating.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate is a pregnancy due date calculator?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A pregnancy calculator provides an estimated due date with about 5% accuracy - only 5% of babies are born on their exact due date. Most babies arrive between 38-42 weeks. Ultrasound dating in the first trimester (especially at 8-12 weeks) is the most accurate method, typically within 3-5 days.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between gestational age and fetal age?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Gestational age is calculated from the first day of your last menstrual period (LMP) and is the standard used by healthcare providers. Fetal age (conceptional age) is calculated from conception, typically 2 weeks less than gestational age since conception usually occurs about 14 days after LMP.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    When does each trimester start and end?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The first trimester is weeks 1-13, the second trimester is weeks 14-27, and the third trimester is weeks 28-40+. The first trimester focuses on organ development, the second on growth and movement, and the third on final development and preparing for birth.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How does cycle length affect my due date calculation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The standard pregnancy calculation assumes a 28-day cycle with ovulation on day 14. If your cycle is longer (e.g., 35 days), your due date moves later. If shorter (e.g., 21 days), it moves earlier. Each day difference from 28 adjusts your due date by one day in the same direction.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I use this calculator if I did IVF or fertility treatments?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! For IVF pregnancies, use the 'Conception Date' method and enter your embryo transfer date. For a 3-day transfer, add 3 days; for a 5-day transfer (blastocyst), add 5 days to your transfer date. This gives you the most accurate due date for IVF pregnancies.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What prenatal appointments should I expect during pregnancy?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Typical prenatal schedule: First visit at 8-10 weeks, monthly visits until 28 weeks, bi-weekly until 36 weeks, then weekly until delivery. Key tests include: NT scan (11-14 weeks), anatomy scan (18-22 weeks), glucose test (24-28 weeks), and Group B strep test (35-37 weeks).
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What if my ultrasound due date differs from my LMP due date?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      If the difference is 7+ days, your doctor will likely use the ultrasound date, especially from a first-trimester scan (most accurate). Early ultrasounds (8-12 weeks) are accurate within 3-5 days. LMP calculations can be off if you have irregular cycles, don't remember your exact LMP, or ovulated later than day 14.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Health Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Track your pre-pregnancy & pregnancy BMI</p>
                </Link>
                <Link href="/calorie-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate your pregnancy calorie needs</p>
                </Link>
                <Link href="/ideal-weight-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Ideal Weight Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Find your healthy weight range</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
