import { Metadata } from "next";
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import { BMICalculator } from "@/components/Calculator/BMICalculator";

export const metadata: Metadata = {
  title: "BMI Calculator (Free, No signup) - Check Your BMI | AICalculator",
  description: "Free BMI calculator with no sign-up required. Calculate your BMI (Body Mass Index) instantly. Get personalized health analysis, ideal weight range, and recommendations. Free BMI calculator with charts for men, women, and children.",
  keywords: [
    "BMI calculator",
    "free BMI calculator",
    "BMI calculator no signup",
    "body mass index calculator",
    "BMI chart",
    "calculate BMI",
    "healthy weight calculator",
    "ideal weight calculator",
    "BMI for adults",
    "BMI for children",
    "obesity calculator",
    "underweight calculator",
    "weight loss calculator",
    "health assessment",
    "body composition calculator"
  ],
  openGraph: {
    title: "BMI Calculator (Free, No signup) - AICalculator",
    description: "Free BMI calculator with no sign-up required. Get personalized health analysis and recommendations. Calculate your ideal weight and get actionable health insights.",
    type: "website",
    url: getUrl('/bmi-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator (Free, No signup) - AICalculator",
    description: "Free BMI calculator with no sign-up required. Calculate your BMI and get personalized health recommendations. Fast and accurate.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/bmi-calculator'),
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
  other: {
    'last-modified': new Date().toISOString(),
  },
};

export default function BMICalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "BMI Calculator",
        "url": getUrl('/bmi-calculator'),
        "description": "Free BMI calculator with personalized health analysis. Calculate your Body Mass Index and get ideal weight recommendations.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "BMI calculation for adults",
          "Imperial and metric units",
          "Health risk assessment",
          "Ideal weight range calculation",
          "Personalized recommendations",
          "BMI chart visualization"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": getUrl('/')
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Health & Fitness",
            "item": getUrl('/health-fitness')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "BMI Calculator",
            "item": getUrl('/bmi-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is BMI and how is it calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). For imperial units, the formula is: (weight in pounds × 703) / (height in inches)². BMI provides a simple numeric measure to help assess if you're underweight, normal weight, overweight, or obese."
            }
          },
          {
            "@type": "Question",
            "name": "What is a healthy BMI range?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For adults, a healthy BMI typically ranges from 18.5 to 24.9. Underweight is below 18.5, overweight is 25.0 to 29.9, and obese is 30.0 or higher. However, BMI doesn't account for muscle mass, bone density, or body composition, so it's best used as a general screening tool rather than a diagnostic measure."
            }
          },
          {
            "@type": "Question",
            "name": "Is BMI accurate for everyone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMI has limitations and may not be accurate for everyone. It doesn't distinguish between muscle and fat, so athletes with high muscle mass may have a high BMI but low body fat. It's also less accurate for elderly people, children, pregnant women, and people of different ethnic backgrounds. BMI should be used alongside other health assessments like waist circumference, body fat percentage, and overall health markers."
            }
          },
          {
            "@type": "Question",
            "name": "How can I lower my BMI naturally?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To lower your BMI naturally: 1) Follow a balanced, calorie-controlled diet with plenty of fruits, vegetables, lean proteins, and whole grains. 2) Exercise regularly, aiming for at least 150 minutes of moderate aerobic activity per week. 3) Stay hydrated and get adequate sleep (7-9 hours). 4) Reduce stress through mindfulness or meditation. 5) Avoid sugary drinks and processed foods. Aim for gradual weight loss of 1-2 pounds per week for sustainable results."
            }
          },
          {
            "@type": "Question",
            "name": "Does BMI differ for men and women?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The BMI calculation formula is the same for both men and women. However, women naturally have more body fat than men at the same BMI. Women typically have 6-11% more body fat than men. Despite this difference, the standard BMI categories (underweight, normal, overweight, obese) apply to both genders for adults. Some health professionals may interpret BMI differently based on gender when making health recommendations."
            }
          },
          {
            "@type": "Question",
            "name": "Can BMI be used for children and teenagers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMI can be used for children and teens, but it requires a different approach called BMI-for-age percentiles. Because children and teens are still growing and their body composition changes significantly during development, their BMI is compared to others of the same age and gender. The CDC provides growth charts that healthcare providers use to determine if a child's BMI falls within a healthy range. Parents should consult pediatricians rather than using adult BMI calculators for children under 18."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between BMI and body fat percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMI is calculated using only height and weight and provides an estimate of body fat, while body fat percentage directly measures the proportion of fat tissue in your body. Body fat percentage is more accurate but requires specialized equipment like DEXA scans, bioelectrical impedance, or skinfold calipers. BMI is easier to calculate but doesn't distinguish between fat, muscle, and bone."
            }
          },
          {
            "@type": "Question",
            "name": "How often should I check my BMI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For adults maintaining a healthy weight, checking BMI every 3-6 months is sufficient. If you're actively trying to lose or gain weight, monthly checks can help track progress. However, BMI should be considered alongside other health metrics like waist circumference, body fat percentage, blood pressure, and cholesterol levels."
            }
          },
          {
            "@type": "Question",
            "name": "Is BMI different for different ethnic groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, research shows that health risks associated with BMI can vary by ethnicity. Asian populations tend to have higher health risks at lower BMI levels - the WHO recommends lower thresholds for Asian adults (overweight at BMI ≥23, obese at BMI ≥27.5). Pacific Islanders and Polynesians often have higher bone density and muscle mass, potentially requiring higher BMI thresholds."
            }
          },
          {
            "@type": "Question",
            "name": "What other measurements should I track besides BMI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Besides BMI, track: waist circumference (abdominal fat indicator), waist-to-hip ratio, body fat percentage, blood pressure, blood sugar/HbA1c, cholesterol levels (total, LDL, HDL, triglycerides), and resting heart rate. These measurements together provide a comprehensive view of your health status."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Your BMI",
        "description": "Step-by-step guide to calculate and interpret your Body Mass Index",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Measure Your Weight",
            "text": "Weigh yourself in the morning before eating, wearing minimal clothing. Use a reliable scale and record your weight in pounds or kilograms."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Measure Your Height",
            "text": "Stand straight against a wall without shoes. Measure your height in inches or centimeters using a tape measure or stadiometer."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter Your Information",
            "text": "Input your height and weight into the BMI calculator. Select whether you're using imperial (pounds/inches) or metric (kg/cm) units."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Your BMI",
            "text": "Click the 'Calculate' button to instantly compute your BMI. The calculator will show your BMI number and category."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review Your Results",
            "text": "Check your BMI category: Underweight (< 18.5), Normal (18.5-24.9), Overweight (25-29.9), or Obese (≥ 30). Review the personalized health analysis and recommendations."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Take Action",
            "text": "Based on your results, follow the recommended action plan. Consult with a healthcare provider for personalized advice if your BMI is outside the healthy range."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">BMI Calculator - Free Body Mass Index Calculator with Health Analysis and Ideal Weight Recommendations</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="BMI Calculator (Free, No signup)"
        calculatorUrl="/bmi-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="BMI Calculator Tool">
        <div className="container mx-auto px-4">
          <BMICalculator />
        </div>
      </section>

      {/* Educational Content for SEO */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" 
               aria-label="BMI Education and Resources">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Body Mass Index (BMI)
            </h2>

            {/* Main Content Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* What is BMI */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">What is BMI?</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Body Mass Index (BMI)</strong> is a simple calculation using a person's height and weight to estimate body fat. The formula is: BMI = weight (kg) / height (m)².
                </p>
                <p className="text-gray-700 mb-3">
                  BMI was developed in the 19th century by Belgian mathematician Adolphe Quetelet and is now widely used by healthcare professionals as a screening tool to identify potential weight-related health problems.
                </p>
                <p className="text-sm text-gray-600">
                  While BMI doesn't directly measure body fat, research shows it correlates moderately with direct measures of body fat and can be a useful indicator for most adults.
                </p>
              </div>

              {/* BMI Categories */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    📈
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">BMI Categories</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Underweight</div>
                      <div className="text-sm text-gray-600">BMI below 18.5</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Normal Weight</div>
                      <div className="text-sm text-gray-600">BMI 18.5 - 24.9</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Overweight</div>
                      <div className="text-sm text-gray-600">BMI 25.0 - 29.9</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Obese</div>
                      <div className="text-sm text-gray-600">BMI 30.0 and above</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Calculate */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    🧮
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">How to Calculate BMI</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <div className="font-semibold text-purple-700 mb-2">Metric Formula</div>
                    <p className="text-gray-700 font-mono">BMI = weight (kg) / [height (m)]²</p>
                    <p className="text-xs text-gray-600 mt-2">Example: 70 kg ÷ (1.75 m)² = 22.9</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="font-semibold text-purple-700 mb-2">Imperial Formula</div>
                    <p className="text-gray-700 font-mono">BMI = (weight (lbs) × 703) / [height (in)]²</p>
                    <p className="text-xs text-gray-600 mt-2">Example: (154 lbs × 703) ÷ (69 in)² = 22.7</p>
                  </div>
                </div>
              </div>

              {/* Health Implications */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg border-2 border-red-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    ⚕️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Health Implications</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">⚠️</span>
                    <div>
                      <strong>High BMI (≥25):</strong> Increased risk of heart disease, type 2 diabetes, high blood pressure, stroke, certain cancers, and osteoarthritis.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">⚠️</span>
                    <div>
                      <strong>Low BMI (&lt;18.5):</strong> Increased risk of malnutrition, osteoporosis, anemia, weakened immune system, and fertility issues.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">✓</span>
                    <div>
                      <strong>Healthy BMI (18.5-24.9):</strong> Associated with lower risk of chronic diseases and better overall health outcomes.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WHO BMI Classification Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                WHO BMI Classification for Adults
              </h3>
              <p className="text-gray-600 text-center mb-6">
                International standard BMI categories for men and women aged 20 or older
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <th className="py-3 px-4 text-left rounded-tl-lg">Classification</th>
                      <th className="py-3 px-4 text-center">BMI Range (kg/m²)</th>
                      <th className="py-3 px-4 text-center rounded-tr-lg">Status Indicator</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-indigo-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">Severe Thinness</td>
                      <td className="py-3 px-4 text-center text-gray-700">&lt; 16</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-indigo-600 rounded-full"></span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">Moderate Thinness</td>
                      <td className="py-3 px-4 text-center text-gray-700">16 - 17</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-blue-500 rounded-full"></span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">Mild Thinness</td>
                      <td className="py-3 px-4 text-center text-gray-700">17 - 18.5</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-blue-400 rounded-full"></span>
                      </td>
                    </tr>
                    <tr className="hover:bg-green-50 transition-colors bg-green-50">
                      <td className="py-3 px-4 font-bold text-gray-900">Normal</td>
                      <td className="py-3 px-4 text-center font-semibold text-gray-700">18.5 - 25</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>
                      </td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">Overweight</td>
                      <td className="py-3 px-4 text-center text-gray-700">25 - 30</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full"></span>
                      </td>
                    </tr>
                    <tr className="hover:bg-orange-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">Obese Class I</td>
                      <td className="py-3 px-4 text-center text-gray-700">30 - 35</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-orange-500 rounded-full"></span>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">Obese Class II</td>
                      <td className="py-3 px-4 text-center text-gray-700">35 - 40</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-red-500 rounded-full"></span>
                      </td>
                    </tr>
                    <tr className="hover:bg-red-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-gray-900">Obese Class III</td>
                      <td className="py-3 px-4 text-center text-gray-700">&gt; 40</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block w-4 h-4 bg-red-600 rounded-full"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This classification applies to adults aged 20 and older. For children and adolescents (2-20 years), 
                  use age-specific BMI-for-age percentile charts provided by the CDC.
                </p>
              </div>
            </div>

            {/* BMI Prime and Ponderal Index Explanation */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg border-2 border-purple-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    📊
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">BMI Prime</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>BMI Prime</strong> is the ratio of your BMI to the upper limit of normal BMI (25 kg/m²). 
                  It provides a dimensionless value for quick assessment.
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <div className="font-semibold text-purple-700 mb-2">Formula</div>
                  <p className="text-gray-700 font-mono text-sm">BMI Prime = BMI ÷ 25</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">•</span>
                    <span className="text-gray-700"><strong>&lt; 0.74:</strong> Underweight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">•</span>
                    <span className="text-gray-700"><strong>0.74 - 1.0:</strong> Normal (Optimal)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">•</span>
                    <span className="text-gray-700"><strong>1.0 - 1.2:</strong> Overweight</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">•</span>
                    <span className="text-gray-700"><strong>&gt; 1.2:</strong> Obese</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl shadow-lg border-2 border-cyan-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-2xl text-white">
                    📐
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Ponderal Index</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Ponderal Index (PI)</strong> is similar to BMI but uses the cube of height instead of square. 
                  It's more reliable for very tall or short individuals.
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <div className="font-semibold text-cyan-700 mb-2">Metric Formula</div>
                  <p className="text-gray-700 font-mono text-sm">PI = mass (kg) ÷ height³ (m)</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-cyan-700 mb-2">Imperial Formula</div>
                  <p className="text-gray-700 font-mono text-sm">PI = height (in) ÷ ∛mass (lbs)</p>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  <strong>Advantage:</strong> PI is less affected by extreme heights, making it more accurate for populations 
                  at the extreme ends of the height spectrum.
                </p>
              </div>
            </div>

            {/* BMI Limitations */}
            <div className="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>⚠️</span>
                Important: BMI Limitations
              </h3>
              <p className="text-gray-700 mb-4">
                While BMI is a useful screening tool, it has several limitations:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">❌ Doesn't Measure Body Composition</div>
                  <p className="text-gray-600">BMI can't distinguish between muscle and fat. Athletes with high muscle mass may have high BMI but low body fat.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">❌ Not Accurate for All Ages</div>
                  <p className="text-gray-600">BMI standards are for adults only. Children and teens require age-specific BMI-for-age percentiles.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">❌ Ethnic Differences</div>
                  <p className="text-gray-600">Different ethnic groups may have different health risks at the same BMI. Asian populations may face higher risks at lower BMI.</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-2">❌ Doesn't Consider Fat Distribution</div>
                  <p className="text-gray-600">Waist circumference and waist-to-hip ratio are better indicators of abdominal fat and health risks.</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is BMI and how is it calculated?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated by dividing your weight in kilograms by your height in meters squared (kg/m²). For imperial units, the formula is: (weight in pounds × 703) / (height in inches)². BMI provides a simple numeric measure to help assess if you're underweight, normal weight, overweight, or obese.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is a healthy BMI range?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      For adults, a healthy BMI typically ranges from <strong>18.5 to 24.9</strong>. Underweight is below 18.5, overweight is 25.0 to 29.9, and obese is 30.0 or higher. However, BMI doesn't account for muscle mass, bone density, or body composition, so it's best used as a general screening tool rather than a diagnostic measure.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Is BMI accurate for everyone?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      BMI has limitations and may not be accurate for everyone. It doesn't distinguish between muscle and fat, so athletes with high muscle mass may have a high BMI but low body fat. It's also less accurate for elderly people, children, pregnant women, and people of different ethnic backgrounds. BMI should be used alongside other health assessments like waist circumference, body fat percentage, and overall health markers.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How can I lower my BMI naturally?
                  </h3>
                  <div>
                    <div className="text-gray-700">
                      <p className="mb-3">To lower your BMI naturally:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>Balanced Diet:</strong> Focus on fruits, vegetables, lean proteins, and whole grains</li>
                        <li><strong>Regular Exercise:</strong> Aim for 150 minutes of moderate aerobic activity per week</li>
                        <li><strong>Adequate Sleep:</strong> Get 7-9 hours of quality sleep each night</li>
                        <li><strong>Stay Hydrated:</strong> Drink plenty of water throughout the day</li>
                        <li><strong>Reduce Stress:</strong> Practice mindfulness or meditation</li>
                        <li><strong>Avoid Sugary Drinks:</strong> Cut out sodas and sweetened beverages</li>
                      </ul>
                      <p className="mt-3 text-sm">Aim for gradual weight loss of 1-2 pounds per week for sustainable results.</p>
                    </div>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Does BMI differ for men and women?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      The BMI calculation formula is the same for both men and women. However, women naturally have more body fat than men at the same BMI. Women typically have 6-11% more body fat than men. Despite this difference, the standard BMI categories (underweight, normal, overweight, obese) apply to both genders for adults. Some health professionals may interpret BMI differently based on gender when making health recommendations.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Can BMI be used for children and teenagers?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      BMI can be used for children and teens, but it requires a different approach called BMI-for-age percentiles. Because children and teens are still growing and their body composition changes significantly during development, their BMI is compared to others of the same age and gender. The CDC provides growth charts that healthcare providers use to determine if a child's BMI falls within a healthy range. Parents should consult pediatricians rather than using adult BMI calculators for children under 18.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What's the difference between BMI and body fat percentage?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      BMI is calculated using only height and weight and provides an estimate of body fat, while body fat percentage directly measures the proportion of fat tissue in your body. Body fat percentage is more accurate but requires specialized equipment like DEXA scans, bioelectrical impedance, or skinfold calipers. BMI is easier to calculate but doesn't distinguish between fat, muscle, and bone. Athletes with high muscle mass may have high BMI but low body fat, while some people with normal BMI may have high body fat (called "normal weight obesity").
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How often should I check my BMI?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      For adults maintaining a healthy weight, checking BMI every 3-6 months is sufficient. If you're actively trying to lose or gain weight, monthly checks can help track progress. However, BMI should be considered alongside other health metrics like waist circumference, body fat percentage, blood pressure, and cholesterol levels. Avoid checking too frequently (daily or weekly) as normal weight fluctuations can be misleading. Always weigh yourself at the same time of day, preferably in the morning before eating, for consistency.
                    </p>
                  </div>
                </div>

                {/* FAQ 9 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Is BMI different for different ethnic groups?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Yes, research shows that health risks associated with BMI can vary by ethnicity. Asian populations tend to have higher health risks at lower BMI levels - the WHO recommends lower thresholds for Asian adults (overweight at BMI ≥23, obese at BMI ≥27.5). Pacific Islanders and Polynesians often have higher bone density and muscle mass, potentially requiring higher BMI thresholds. Black individuals may have different body composition with higher lean body mass. These variations mean BMI should be interpreted in context with ethnicity and other health factors.
                    </p>
                  </div>
                </div>

                {/* FAQ 10 */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What other measurements should I track besides BMI?
                  </h3>
                  <div>
                    <div className="text-gray-700">
                      <p className="mb-2">While BMI is useful, tracking these additional measurements provides a more complete health picture:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li><strong>Waist Circumference:</strong> Indicates abdominal fat (health risk if &gt;40&quot; for men, &gt;35&quot; for women)</li>
                        <li><strong>Waist-to-Hip Ratio:</strong> Another indicator of fat distribution and health risk</li>
                        <li><strong>Body Fat Percentage:</strong> More accurate than BMI for body composition</li>
                        <li><strong>Blood Pressure:</strong> Critical indicator of cardiovascular health</li>
                        <li><strong>Blood Sugar/HbA1c:</strong> Screens for diabetes and prediabetes</li>
                        <li><strong>Cholesterol Levels:</strong> Total, LDL, HDL, and triglycerides</li>
                        <li><strong>Resting Heart Rate:</strong> Indicator of cardiovascular fitness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Authoritative Resources */}
            <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Trusted Health Resources
              </h3>
              <p className="text-gray-700 text-center mb-6">
                Learn more from these authoritative health organizations
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="https://www.cdc.gov/healthyweight/assessing/bmi/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white rounded-xl border-2 border-blue-300 hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl mb-3 text-center">🏛️</div>
                  <h4 className="font-bold text-gray-900 text-center mb-2">CDC (Centers for Disease Control)</h4>
                  <p className="text-sm text-gray-600 text-center">
                    Official BMI information and healthy weight guidelines from the U.S. CDC
                  </p>
                </Link>
                <Link
                  href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white rounded-xl border-2 border-blue-300 hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl mb-3 text-center">🌍</div>
                  <h4 className="font-bold text-gray-900 text-center mb-2">WHO (World Health Organization)</h4>
                  <p className="text-sm text-gray-600 text-center">
                    Global BMI standards and obesity fact sheets from WHO
                  </p>
                </Link>
                <Link
                  href="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmi-m.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white rounded-xl border-2 border-blue-300 hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl mb-3 text-center">❤️</div>
                  <h4 className="font-bold text-gray-900 text-center mb-2">NHLBI (National Heart, Lung, and Blood Institute)</h4>
                  <p className="text-sm text-gray-600 text-center">
                    BMI tools and heart health information from NIH's NHLBI
                  </p>
                </Link>
              </div>
            </div>

            {/* Internal Links */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Health Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🧮</div>
                  <div className="font-semibold text-gray-900">Basic Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Scientific and basic calculations</p>
                </Link>
                <Link href="/mortgage-calculator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loan payments</p>
                </Link>
                <Link href="/calculators" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold text-gray-900">All Calculators</div>
                  <p className="text-xs text-gray-600 mt-1">Browse all calculator tools</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

