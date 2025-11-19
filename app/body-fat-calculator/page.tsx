import { Metadata } from 'next';
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { BodyFatCalculator } from '@/components/Calculator/BodyFatCalculator';

export const metadata: Metadata = {
  title: "Body Fat Calculator (Free, No signup) - Estimate Fat | AICalculator",
  description: "Free body fat calculator with no sign-up required. Calculate body fat percentage with Navy Method, YMCA Method, and BMI-based formulas. Get accurate measurements, healthy ranges, and personalized recommendations. Free body composition calculator.",
  keywords: ["body fat calculator", "free body fat calculator", "body fat calculator no signup", "body fat percentage calculator", "navy method body fat", "ymca body fat calculator", "body composition calculator", "lean mass calculator", "fat mass calculator", "body fat measurement", "healthy body fat percentage", "body fat estimate", "body fat formula", "calculate body fat percentage"],
  openGraph: {
    title: "Body Fat Calculator (Free, No signup) - AICalculator",
    description: "Free body fat calculator with no sign-up required. Calculate body fat percentage accurately with Navy Method and YMCA formulas. Get instant results with healthy ranges.",
    type: "website",
    url: getUrl('/body-fat-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Fat Calculator (Free, No signup) - AICalculator",
    description: "Free body fat calculator with no sign-up required. Calculate your body fat percentage with multiple proven methods and health recommendations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/body-fat-calculator'),
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

export default function BodyFatCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Body Fat Calculator",
        "url": getUrl('/body-fat-calculator'),
        "description": "Free body fat calculator using Navy Method, YMCA Method, and BMI-based formulas. Calculate body fat percentage, fat mass, lean mass, and get personalized health recommendations.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "US Navy Method calculation",
          "YMCA Method calculation",
          "BMI-based estimation",
          "Fat mass calculation",
          "Lean mass calculation",
          "Age and gender-specific ranges",
          "Healthy body fat ranges",
          "Personalized recommendations",
          "Imperial and metric units",
          "Share and export results"
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
            "name": "Body Fat Calculator",
            "item": getUrl('/body-fat-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a healthy body fat percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Healthy body fat percentages vary by age and gender. For men: 18-29 years: 8-20%, 30-49 years: 11-22%, 50+ years: 13-25%. For women: 18-29 years: 14-25%, 30-49 years: 15-27%, 50+ years: 16-30%. Athletes typically have lower percentages (men 6-13%, women 14-20%). Essential fat (minimum for health) is 2-5% for men and 10-13% for women. Body fat above these healthy ranges increases risk of heart disease, diabetes, and other health conditions. However, extremely low body fat can be unhealthy too - disrupting hormones, weakening bones, and affecting organ function. Your ideal percentage depends on your age, gender, genetics, and fitness goals."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the Navy Method for body fat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The US Navy Method is one of the most accurate body fat measurement techniques without specialized equipment, with accuracy within 3-4% of DEXA scans (gold standard). It uses circumference measurements (neck, waist, hip for women) and height to estimate body fat through validated formulas developed by the Department of Defense. Advantages: No special equipment needed (just tape measure), quick and repeatable, validated on large populations, free and accessible. Limitations: Less accurate than DEXA, hydrostatic weighing, or bod pod, accuracy depends on proper measurement technique, may be less accurate for very muscular or very obese individuals, doesn't account for individual body fat distribution variations. For best accuracy: Measure at same time of day, use flexible tape measure, don't suck in or flex, take average of 2-3 measurements, follow proper measurement locations exactly."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between Navy Method and YMCA Method?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Navy Method and YMCA Method are different body fat calculation formulas with different approaches. Navy Method: Uses circumference measurements (neck, waist, hip) plus height, developed by US military for fitness assessments, validated on large military populations, generally more accurate for most people, requires proper measurement technique. YMCA Method: Primarily uses waist circumference and weight with age factors, simpler calculation requiring fewer measurements, developed for general population fitness centers, may be less accurate for very athletic or obese individuals, good as secondary estimate. In practice, Navy Method is considered more reliable because it accounts for more body measurements and better reflects individual body composition variations. YMCA is easier but less precise. Our calculator shows both methods so you can compare - typically they're within 2-4% of each other. Significant differences may indicate measurement errors or suggest one formula works better for your body type."
            }
          },
          {
            "@type": "Question",
            "name": "How do I measure my body fat at home?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To measure body fat at home using the Navy Method, you need a flexible tape measure and follow these steps: 1. Measure in the morning before eating (more consistent), 2. Stand relaxed, don't suck in stomach or flex muscles, 3. Keep tape snug but not tight against skin, 4. Take 2-3 measurements of each area and use average. Measurement locations: Neck - measure just below Adam's apple (narrowest point), keep tape level all around. Waist - measure at navel level (belly button), not smallest part of waist, stand relaxed. Hip (women only) - measure at widest point around buttocks, keep tape level. Height - measure barefoot against wall, use book on head for accuracy. Common mistakes to avoid: Sucking in stomach (inflates lean mass), measuring over clothes (adds bulk), tape too tight or too loose, measuring at wrong locations, taking only one measurement (less reliable). Pro tip: Have someone help you measure, or use mirror to ensure tape is level."
            }
          },
          {
            "@type": "Question",
            "name": "Why is body fat percentage more important than weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Body fat percentage is a better health indicator than weight because it distinguishes between fat mass and lean mass (muscle, bone, organs). Two people can weigh the same but have drastically different body compositions and health outcomes. Example: Person A: 180 lbs, 25% body fat = 45 lbs fat, 135 lbs lean mass. Person B: 180 lbs, 15% body fat = 27 lbs fat, 153 lbs lean mass. Person B is much healthier despite same weight. Why it matters: High body fat increases disease risk (heart disease, diabetes, metabolic syndrome), low lean mass reduces metabolism and functional ability, weight alone doesn't show muscle vs fat, body composition affects aging and longevity. Scale weight can mislead: Building muscle increases weight but improves health, losing muscle (crash diets) decreases weight but harms metabolism, 'normal weight' doesn't mean healthy if high body fat (skinny-fat). Better metrics: Body fat percentage, lean muscle mass, waist circumference, how clothes fit, energy levels and performance."
            }
          },
          {
            "@type": "Question",
            "name": "What body fat percentage do I need to see abs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Visible abs require low body fat percentages to reduce abdominal fat covering the muscles. For men: 10-12% body fat for faint ab definition, 8-10% for clearly visible six-pack, 6-8% for very defined, shredded abs (bodybuilder level), below 6% is unsustainable and unhealthy for most. For women: 16-19% for faint ab definition, 14-16% for visible abs, 12-14% for defined six-pack (very athletic), below 12% may disrupt hormones and menstruation. Important factors: Ab visibility also depends on ab muscle development (need to train abs), genetics (fat distribution varies - some store more in abdomen), age (harder to maintain low body fat as you age), gender (women need higher essential fat for health). Reality check: Very low body fat is difficult to maintain - requires strict diet and training, may not be sustainable or healthy long-term, professional physique competitors only achieve this temporarily, focus on health and functionality, not just aesthetics. Visible abs are achievable for most people at moderate body fat levels with proper training."
            }
          },
          {
            "@type": "Question",
            "name": "Can body fat scales accurately measure body fat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Body fat scales (bioelectrical impedance scales) are convenient but have significant accuracy limitations. How they work: Send small electrical current through body, measure resistance (impedance), fat resists electricity more than muscle, calculate body fat from resistance patterns. Accuracy issues: Can vary by 5-8% from true body fat, highly affected by hydration status (more water = lower reading), influenced by recent eating, exercise, or bathroom use, less accurate for very lean or very obese individuals, readings can vary significantly day-to-day or even hour-to-hour. When they're useful: Tracking trends over time (not absolute numbers), if you use same conditions (same time, hydration), comparing yourself to yourself, motivation to see progress, convenient for regular monitoring. Better alternatives: Navy Method (more accurate, just need tape measure), skinfold calipers (if done by trained person), DEXA scan (gold standard, but expensive), hydrostatic weighing (very accurate), Bod Pod (accurate but not widely available). Bottom line: Use body fat scales for trends, not absolute accuracy. Combine with other measurements (waist circumference, how clothes fit, progress photos) for complete picture."
            }
          },
          {
            "@type": "Question",
            "name": "How can I reduce my body fat percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reducing body fat percentage requires creating a calorie deficit while preserving lean muscle mass. Key strategies: 1. Nutrition (most important): Create 300-500 calorie daily deficit for sustainable fat loss, eat adequate protein (0.8-1g per lb body weight) to preserve muscle, focus on whole foods (lean proteins, vegetables, fruits, whole grains), reduce processed foods, sugary drinks, and excessive carbs, don't crash diet (lose muscle, slow metabolism). 2. Strength training (critical): Lift weights 3-4 times per week to build/maintain muscle, compound exercises (squats, deadlifts, bench press, rows), progressive overload (gradually increase weight/reps), muscle burns more calories at rest than fat. 3. Cardio (supportive): 150-300 minutes moderate cardio per week, mix of steady-state and high-intensity interval training (HIIT), walking is underrated (low-impact, sustainable), don't over-rely on cardio alone (can burn muscle). 4. Lifestyle factors: Get 7-9 hours quality sleep (affects hormones and hunger), manage stress (cortisol increases fat storage), stay consistent (slow progress beats fast then quitting), track measurements, not just scale weight. Realistic timeline: Lose 0.5-1% body fat per month sustainably, faster fat loss often means muscle loss too, patience and consistency are key."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Body Fat Percentage",
        "description": "Calculate your body fat percentage using the Navy Method in 4 steps",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Basic Information",
            "text": "Select your gender, age, and unit system (imperial or metric). Choose your weight and height. These factors affect body fat calculation formulas and healthy range recommendations."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Take Body Measurements",
            "text": "Using a flexible tape measure, measure your neck circumference (just below Adam's apple), waist circumference (at navel level, relaxed), and for women, hip circumference (at widest point). Take measurements in the morning before eating for consistency."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Calculate Body Fat Percentage",
            "text": "The calculator uses the US Navy Method formula to compute your body fat percentage. This method is validated and accurate within 3-4% of DEXA scans. You'll also see YMCA Method and BMI-based estimates for comparison."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Results and Recommendations",
            "text": "See your body fat percentage, fat mass, lean mass, and category (athletic, fitness, average, etc.). Compare against healthy ranges for your age and gender. Follow personalized recommendations to achieve or maintain healthy body composition."
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
      
      <h1 className="sr-only">Body Fat Calculator - Free Navy Method and YMCA Body Fat Percentage Calculator</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Body Fat Calculator (Free, No signup)"
        calculatorUrl="/body-fat-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <BodyFatCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Body Fat Percentage & Measurement Methods
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is Body Fat Percentage?</h3>
                <p className="text-gray-700 mb-4">
                  Body fat percentage is the proportion of fat mass to total body weight. It's a more accurate health indicator than weight or BMI because it distinguishes between fat and lean mass (muscle, bone, organs).
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Why it matters:</strong> Two people can weigh the same but have drastically different body compositions. Someone with 15% body fat is typically healthier than someone with 30% body fat at the same weight, even if both have "normal" BMI.
                </p>
                <p className="text-gray-700">
                  Body fat serves important functions: energy storage, hormone production, temperature regulation, organ protection, and vitamin absorption. However, excess body fat increases risk of heart disease, diabetes, high blood pressure, and metabolic syndrome.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">US Navy Method</h3>
                <p className="text-gray-700 mb-4">
                  The Navy Method is one of the most accurate body fat measurement techniques without specialized equipment, developed by the US Department of Defense for military fitness assessments.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">How it Works:</div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>For Men:</strong> Measures neck and waist circumference vs height</div>
                    <div><strong>For Women:</strong> Measures neck, waist, and hip circumference vs height</div>
                    <div className="pt-2 text-xs">Uses validated logarithmic formulas to estimate body fat from circumference patterns</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Accuracy:</strong> Within 3-4% of DEXA scans (gold standard) when measurements are taken correctly. Validated on thousands of military personnel across diverse body types.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">YMCA Method</h3>
                <p className="text-gray-700 mb-4">
                  The YMCA Method is a simpler body fat calculation developed for general population use in fitness centers, requiring fewer measurements than the Navy Method.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Key differences:</strong> Primarily uses waist circumference and weight with age adjustments. Faster to measure but generally less accurate than Navy Method. Best used as secondary estimate or when full Navy Method measurements aren't available.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best practice:</strong> Use both methods and compare results. If they're within 2-3%, measurements are likely accurate. Larger differences may indicate measurement errors or suggest one formula works better for your body type.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Other Measurement Methods</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">DEXA Scan (Gold Standard)</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Most accurate (±1-2%)<br/>
                      • Shows exact fat distribution<br/>
                      • Expensive ($50-150 per scan)<br/>
                      • Requires specialized facility
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Hydrostatic Weighing</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Very accurate (±2-3%)<br/>
                      • Underwater weight measurement<br/>
                      • Uncomfortable, requires facility<br/>
                      • Cost: $40-75 per test
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Skinfold Calipers</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Moderate accuracy (±3-5%)<br/>
                      • Inexpensive ($5-30 for calipers)<br/>
                      • Requires trained technician<br/>
                      • Accuracy depends on skill
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Bioelectrical Impedance (BIA Scales)</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Variable accuracy (±5-8%)<br/>
                      • Very convenient, home use<br/>
                      • Affected by hydration status<br/>
                      • Good for tracking trends
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Measurement Tips for Accuracy</h3>
                <p className="text-gray-700 mb-4">
                  Proper technique is crucial for accurate body fat calculations. Small measurement errors can significantly affect results.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Timing:</strong> Measure in morning before eating or drinking, after using bathroom</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Posture:</strong> Stand relaxed, don't suck in stomach or flex muscles</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Tape measure:</strong> Use flexible tape (not metal), keep snug but not tight</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Consistency:</strong> Measure at same locations every time, take 2-3 readings and average</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Help:</strong> Have someone assist to ensure tape is level all around</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Frequency:</strong> Remeasure every 2-4 weeks to track progress</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Essential Fat vs Storage Fat</h3>
                <p className="text-gray-700 mb-4">
                  Not all body fat is the same. Understanding the difference between essential fat and storage fat helps set realistic goals.
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Essential Fat (Required for Health)</div>
                    <div className="text-xs text-gray-700">
                      <strong>Men:</strong> 2-5% | <strong>Women:</strong> 10-13%<br/>
                      Functions: Protects organs, insulates nerves, produces hormones, absorbs fat-soluble vitamins (A, D, E, K). Going below essential fat is dangerous and unsustainable.
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Storage Fat (Variable)</div>
                    <div className="text-xs text-gray-700">
                      Additional fat stored for energy reserves. This is what you can safely reduce through diet and exercise. Healthy amounts vary by individual, age, and activity level.
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  <strong>Note:</strong> Women need higher essential fat for reproductive functions. Very low body fat in women can disrupt menstrual cycles and hormone production.
                </p>
              </div>
            </div>

            {/* Body Fat Categories Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Body Fat Percentage Categories</h3>
              <p className="text-gray-700 mb-4">
                Healthy body fat ranges vary by age and gender. Use this chart to understand where you fall:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Men</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-900">Category</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-900">&lt;30 years</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-900">30-50 years</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-900">50+ years</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="bg-blue-50">
                          <td className="px-3 py-2 font-semibold text-sm">Essential/Athletic</td>
                          <td className="px-3 py-2 text-center">&lt;8%</td>
                          <td className="px-3 py-2 text-center">&lt;11%</td>
                          <td className="px-3 py-2 text-center">&lt;13%</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="px-3 py-2 font-semibold text-sm">Fitness</td>
                          <td className="px-3 py-2 text-center">8-14%</td>
                          <td className="px-3 py-2 text-center">11-17%</td>
                          <td className="px-3 py-2 text-center">13-19%</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="px-3 py-2 font-semibold text-sm">Average</td>
                          <td className="px-3 py-2 text-center">14-20%</td>
                          <td className="px-3 py-2 text-center">17-22%</td>
                          <td className="px-3 py-2 text-center">19-25%</td>
                        </tr>
                        <tr className="bg-orange-50">
                          <td className="px-3 py-2 font-semibold text-sm">Above Average</td>
                          <td className="px-3 py-2 text-center">20-25%</td>
                          <td className="px-3 py-2 text-center">22-27%</td>
                          <td className="px-3 py-2 text-center">25-30%</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="px-3 py-2 font-semibold text-sm">High</td>
                          <td className="px-3 py-2 text-center">&gt;25%</td>
                          <td className="px-3 py-2 text-center">&gt;27%</td>
                          <td className="px-3 py-2 text-center">&gt;30%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Women</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-gray-900">Category</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-900">&lt;30 years</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-900">30-50 years</th>
                          <th className="px-3 py-2 text-center font-semibold text-gray-900">50+ years</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="bg-blue-50">
                          <td className="px-3 py-2 font-semibold text-sm">Essential/Athletic</td>
                          <td className="px-3 py-2 text-center">&lt;14%</td>
                          <td className="px-3 py-2 text-center">&lt;15%</td>
                          <td className="px-3 py-2 text-center">&lt;16%</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="px-3 py-2 font-semibold text-sm">Fitness</td>
                          <td className="px-3 py-2 text-center">14-21%</td>
                          <td className="px-3 py-2 text-center">15-23%</td>
                          <td className="px-3 py-2 text-center">16-25%</td>
                        </tr>
                        <tr className="bg-yellow-50">
                          <td className="px-3 py-2 font-semibold text-sm">Average</td>
                          <td className="px-3 py-2 text-center">21-25%</td>
                          <td className="px-3 py-2 text-center">23-27%</td>
                          <td className="px-3 py-2 text-center">25-30%</td>
                        </tr>
                        <tr className="bg-orange-50">
                          <td className="px-3 py-2 font-semibold text-sm">Above Average</td>
                          <td className="px-3 py-2 text-center">25-31%</td>
                          <td className="px-3 py-2 text-center">27-33%</td>
                          <td className="px-3 py-2 text-center">30-35%</td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="px-3 py-2 font-semibold text-sm">High</td>
                          <td className="px-3 py-2 text-center">&gt;31%</td>
                          <td className="px-3 py-2 text-center">&gt;33%</td>
                          <td className="px-3 py-2 text-center">&gt;35%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                <strong>Note:</strong> These are general guidelines. Individual optimal body fat varies based on genetics, activity level, and health status. Consult healthcare providers for personalized advice.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a healthy body fat percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Healthy body fat percentages vary by age and gender. For men: 18-29 years: 8-20%, 30-49 years: 11-22%, 50+ years: 13-25%. For women: 18-29 years: 14-25%, 30-49 years: 15-27%, 50+ years: 16-30%. Athletes typically have lower percentages (men 6-13%, women 14-20%). Essential fat (minimum for health) is 2-5% for men and 10-13% for women. Body fat above these healthy ranges increases risk of heart disease, diabetes, and other health conditions. However, extremely low body fat can be unhealthy too - disrupting hormones, weakening bones, and affecting organ function. Your ideal percentage depends on your age, gender, genetics, and fitness goals.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate is the Navy Method for body fat?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The US Navy Method is one of the most accurate body fat measurement techniques without specialized equipment, with accuracy within 3-4% of DEXA scans (gold standard). It uses circumference measurements (neck, waist, hip for women) and height to estimate body fat through validated formulas developed by the Department of Defense. Advantages: No special equipment needed (just tape measure), quick and repeatable, validated on large populations, free and accessible. Limitations: Less accurate than DEXA, hydrostatic weighing, or bod pod, accuracy depends on proper measurement technique, may be less accurate for very muscular or very obese individuals, doesn't account for individual body fat distribution variations. For best accuracy: Measure at same time of day, use flexible tape measure, don't suck in or flex, take average of 2-3 measurements, follow proper measurement locations exactly.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What's the difference between Navy Method and YMCA Method?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Navy Method and YMCA Method are different body fat calculation formulas with different approaches. Navy Method: Uses circumference measurements (neck, waist, hip) plus height, developed by US military for fitness assessments, validated on large military populations, generally more accurate for most people, requires proper measurement technique. YMCA Method: Primarily uses waist circumference and weight with age factors, simpler calculation requiring fewer measurements, developed for general population fitness centers, may be less accurate for very athletic or obese individuals, good as secondary estimate. In practice, Navy Method is considered more reliable because it accounts for more body measurements and better reflects individual body composition variations. YMCA is easier but less precise. Our calculator shows both methods so you can compare - typically they're within 2-4% of each other. Significant differences may indicate measurement errors or suggest one formula works better for your body type.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I measure my body fat at home?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To measure body fat at home using the Navy Method, you need a flexible tape measure and follow these steps: 1. Measure in the morning before eating (more consistent), 2. Stand relaxed, don't suck in stomach or flex muscles, 3. Keep tape snug but not tight against skin, 4. Take 2-3 measurements of each area and use average. Measurement locations: Neck - measure just below Adam's apple (narrowest point), keep tape level all around. Waist - measure at navel level (belly button), not smallest part of waist, stand relaxed. Hip (women only) - measure at widest point around buttocks, keep tape level. Height - measure barefoot against wall, use book on head for accuracy. Common mistakes to avoid: Sucking in stomach (inflates lean mass), measuring over clothes (adds bulk), tape too tight or too loose, measuring at wrong locations, taking only one measurement (less reliable). Pro tip: Have someone help you measure, or use mirror to ensure tape is level.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Why is body fat percentage more important than weight?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Body fat percentage is a better health indicator than weight because it distinguishes between fat mass and lean mass (muscle, bone, organs). Two people can weigh the same but have drastically different body compositions and health outcomes. Example: Person A: 180 lbs, 25% body fat = 45 lbs fat, 135 lbs lean mass. Person B: 180 lbs, 15% body fat = 27 lbs fat, 153 lbs lean mass. Person B is much healthier despite same weight. Why it matters: High body fat increases disease risk (heart disease, diabetes, metabolic syndrome), low lean mass reduces metabolism and functional ability, weight alone doesn't show muscle vs fat, body composition affects aging and longevity. Scale weight can mislead: Building muscle increases weight but improves health, losing muscle (crash diets) decreases weight but harms metabolism, 'normal weight' doesn't mean healthy if high body fat (skinny-fat). Better metrics: Body fat percentage, lean muscle mass, waist circumference, how clothes fit, energy levels and performance.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What body fat percentage do I need to see abs?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Visible abs require low body fat percentages to reduce abdominal fat covering the muscles. For men: 10-12% body fat for faint ab definition, 8-10% for clearly visible six-pack, 6-8% for very defined, shredded abs (bodybuilder level), below 6% is unsustainable and unhealthy for most. For women: 16-19% for faint ab definition, 14-16% for visible abs, 12-14% for defined six-pack (very athletic), below 12% may disrupt hormones and menstruation. Important factors: Ab visibility also depends on ab muscle development (need to train abs), genetics (fat distribution varies - some store more in abdomen), age (harder to maintain low body fat as you age), gender (women need higher essential fat for health). Reality check: Very low body fat is difficult to maintain - requires strict diet and training, may not be sustainable or healthy long-term, professional physique competitors only achieve this temporarily, focus on health and functionality, not just aesthetics. Visible abs are achievable for most people at moderate body fat levels with proper training.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can body fat scales accurately measure body fat?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Body fat scales (bioelectrical impedance scales) are convenient but have significant accuracy limitations. How they work: Send small electrical current through body, measure resistance (impedance), fat resists electricity more than muscle, calculate body fat from resistance patterns. Accuracy issues: Can vary by 5-8% from true body fat, highly affected by hydration status (more water = lower reading), influenced by recent eating, exercise, or bathroom use, less accurate for very lean or very obese individuals, readings can vary significantly day-to-day or even hour-to-hour. When they're useful: Tracking trends over time (not absolute numbers), if you use same conditions (same time, hydration), comparing yourself to yourself, motivation to see progress, convenient for regular monitoring. Better alternatives: Navy Method (more accurate, just need tape measure), skinfold calipers (if done by trained person), DEXA scan (gold standard, but expensive), hydrostatic weighing (very accurate), Bod Pod (accurate but not widely available). Bottom line: Use body fat scales for trends, not absolute accuracy. Combine with other measurements (waist circumference, how clothes fit, progress photos) for complete picture.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How can I reduce my body fat percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Reducing body fat percentage requires creating a calorie deficit while preserving lean muscle mass. Key strategies: 1. Nutrition (most important): Create 300-500 calorie daily deficit for sustainable fat loss, eat adequate protein (0.8-1g per lb body weight) to preserve muscle, focus on whole foods (lean proteins, vegetables, fruits, whole grains), reduce processed foods, sugary drinks, and excessive carbs, don't crash diet (lose muscle, slow metabolism). 2. Strength training (critical): Lift weights 3-4 times per week to build/maintain muscle, compound exercises (squats, deadlifts, bench press, rows), progressive overload (gradually increase weight/reps), muscle burns more calories at rest than fat. 3. Cardio (supportive): 150-300 minutes moderate cardio per week, mix of steady-state and high-intensity interval training (HIIT), walking is underrated (low-impact, sustainable), don't over-rely on cardio alone (can burn muscle). 4. Lifestyle factors: Get 7-9 hours quality sleep (affects hormones and hunger), manage stress (cortisol increases fat storage), stay consistent (slow progress beats fast then quitting), track measurements, not just scale weight. Realistic timeline: Lose 0.5-1% body fat per month sustainably, faster fat loss often means muscle loss too, patience and consistency are key.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate Body Mass Index and health ranges</p>
                </a>
                <a href="/calorie-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate daily calorie needs for weight goals</p>
                </a>
                <a href="/weight-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Ideal Weight Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Find your ideal weight range by height and age</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

