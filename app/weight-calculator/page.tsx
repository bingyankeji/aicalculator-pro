import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { WeightCalculator } from '@/components/Calculator/WeightCalculator';

export const metadata: Metadata = {
  title: "Weight Calculator (Free, No signup) - Ideal Weight | AICalculator",
  description: "Free weight calculator with no sign-up required. Calculate your ideal weight using Robinson, Miller, Devine & Hamwi formulas. Get personalized weight analysis, healthy range, and recommendations. Free online tool with BMI integration.",
  keywords: [
    "ideal weight calculator",
    "free ideal weight calculator",
    "weight calculator no signup",
    "body weight calculator",
    "healthy weight calculator",
    "target weight calculator",
    "weight goal calculator",
    "Robinson formula",
    "Miller formula",
    "Devine formula",
    "Hamwi formula",
    "ideal body weight",
    "weight range calculator",
    "bmi weight calculator",
    "free weight calculator",
    "weight loss goal",
  ],
  openGraph: {
    title: "Weight Calculator (Free, No signup) - AICalculator",
    description: "Free weight calculator with no sign-up required. Ideal weight calculator using 4 proven formulas. Get your healthy weight range and personalized recommendations.",
    type: "website",
    url: "https://aicalculator.pro/weight-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weight Calculator (Free, No signup) - AICalculator",
    description: "Free weight calculator with no sign-up required. Calculate ideal weight with Robinson, Miller, Devine & Hamwi formulas. Get your healthy weight range now!",
  },
  alternates: {
    canonical: "https://aicalculator.pro/weight-calculator",
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

export default function WeightCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Ideal Weight Calculator",
        "url": "https://aicalculator.pro/weight-calculator",
        "description": "Calculate your ideal body weight using Robinson, Miller, Devine, and Hamwi formulas. Get personalized weight analysis and healthy weight range based on your height, gender, and frame size.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Four proven ideal weight formulas (Robinson, Miller, Devine, Hamwi)",
          "Personalized weight analysis based on frame size",
          "Healthy weight range calculation (BMI-based)",
          "Current vs ideal weight comparison",
          "Personalized recommendations",
          "Imperial and Metric units",
          "BMI calculation included",
          "Share and export results",
          "Instant calculation",
          "Mobile-friendly design"
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
            "name": "Weight Calculator",
            "item": "https://aicalculator.pro/weight-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is ideal body weight and how is it calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ideal body weight (IBW) is the optimal weight range for your height and gender. It's calculated using proven formulas like Robinson (1983), Miller (1983), Devine (1974), and Hamwi (1964). These formulas consider your height, gender, and sometimes frame size to estimate a healthy weight target."
            }
          },
          {
            "@type": "Question",
            "name": "Which ideal weight formula is most accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Robinson and Miller formulas (1983) are considered most accurate for modern populations. However, ideal weight varies by individual factors like muscle mass, bone density, and frame size. Our calculator averages all four formulas and adjusts for frame size to provide the most comprehensive estimate."
            }
          },
          {
            "@type": "Question",
            "name": "How does frame size affect ideal weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Frame size significantly impacts ideal weight. Small-framed individuals typically weigh 10% less than the calculated ideal weight, while large-framed individuals may weigh 10% more and still be healthy. Frame size is determined by wrist circumference or elbow breadth measurements."
            }
          },
          {
            "@type": "Question",
            "name": "Is ideal weight the same as healthy weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not necessarily. Ideal weight formulas provide a target, but healthy weight is better represented as a range (typically BMI 18.5-24.9). Athletes with high muscle mass may exceed ideal weight but still be very healthy. Our calculator shows both ideal weight and healthy weight range for comprehensive guidance."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do if I'm not at my ideal weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Don't panic! Focus on sustainable lifestyle changes rather than quick fixes. For weight loss: create a 500-750 calorie deficit through diet and exercise (aim for 0.5-1 kg/week loss). For weight gain: increase calorie intake with nutritious foods and strength training. Always consult healthcare providers before starting any weight change program."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the ideal weight calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our calculator uses four medically validated formulas and is accurate for most adults. However, it doesn't account for individual factors like muscle mass, body composition, or specific health conditions. Use it as a guideline, not absolute truth. Consult healthcare professionals for personalized advice."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for children or teenagers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, this calculator is designed for adults 18+ only. Children and teenagers have different growth patterns and require pediatric growth charts and BMI-for-age percentiles. Consult a pediatrician for children's weight assessment."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between ideal weight and BMI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMI (Body Mass Index) is a ratio of weight to height squared, showing if you're underweight, normal, overweight, or obese. Ideal weight is a specific target weight calculated using proven formulas. Our calculator uses both: ideal weight formulas provide your target, while BMI-based healthy range (18.5-24.9) shows acceptable boundaries."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Ideal Weight Calculator",
        "description": "Step-by-step guide to calculate your ideal body weight and get personalized recommendations",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select unit system",
            "text": "Choose between Metric (cm, kg) or Imperial (ft/in, lbs) units based on your preference."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter your height",
            "text": "Input your height in centimeters or feet and inches depending on your selected unit system."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter current weight",
            "text": "Input your current weight in kilograms or pounds."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Select gender",
            "text": "Choose Male or Female as ideal weight calculations differ by gender."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Choose frame size",
            "text": "Select Small, Medium, or Large frame size. If unsure, choose Medium."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Calculate results",
            "text": "Click 'Calculate Ideal Weight' to see your results from all four formulas, healthy weight range, and personalized recommendations."
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
      
      <h1 className="sr-only">Ideal Weight Calculator - Calculate Your Target Weight with 4 Proven Formulas | Free Body Weight Calculator</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Weight Calculator (Free, No signup)"
        calculatorUrl="/weight-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Weight Calculator Tool">
        <div className="container mx-auto px-4">
          <WeightCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-gray-50" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Ideal Body Weight
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What is Ideal Body Weight?</h3>
                  <p className="text-gray-700 mb-4">
                    Ideal body weight (IBW) is a medically calculated target weight for your height, gender, and frame size. Unlike BMI which provides a range, IBW formulas estimate a specific optimal weight.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Developed by physicians and nutritionists over decades, these formulas help healthcare providers:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Determine medication dosages</li>
                    <li>Set realistic weight loss/gain goals</li>
                    <li>Assess nutritional requirements</li>
                    <li>Evaluate health risks</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    However, ideal weight is just a guideline. Factors like muscle mass, bone density, and overall body composition matter more than hitting a specific number.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Four Proven Formulas</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">1. Robinson Formula (1983)</h4>
                      <p className="text-gray-700 text-sm">
                        Most widely used modern formula. Male: 52 kg + 1.9 kg/inch over 5ft. Female: 49 kg + 1.7 kg/inch.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2. Miller Formula (1983)</h4>
                      <p className="text-gray-700 text-sm">
                        Similar accuracy to Robinson. Male: 56.2 kg + 1.41 kg/inch. Female: 53.1 kg + 1.36 kg/inch.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">3. Devine Formula (1974)</h4>
                      <p className="text-gray-700 text-sm">
                        Classic formula still used in medical settings. Male: 50 kg + 2.3 kg/inch. Female: 45.5 kg + 2.3 kg/inch.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">4. Hamwi Formula (1964)</h4>
                      <p className="text-gray-700 text-sm">
                        Oldest formula, tends to estimate higher. Male: 48 kg + 2.7 kg/inch. Female: 45.5 kg + 2.2 kg/inch.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-4 italic">
                    Our calculator averages all four formulas for the most comprehensive estimate.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is ideal body weight and how is it calculated?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Ideal body weight (IBW) is the optimal weight range for your height and gender. It's calculated using proven formulas like Robinson (1983), Miller (1983), Devine (1974), and Hamwi (1964). These formulas consider your height, gender, and sometimes frame size to estimate a healthy weight target. Our calculator uses all four formulas and averages them for the most accurate estimate.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Which ideal weight formula is most accurate?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The Robinson and Miller formulas (1983) are considered most accurate for modern populations as they're based on more recent data. However, ideal weight varies by individual factors like muscle mass, bone density, and frame size. Our calculator averages all four formulas (Robinson, Miller, Devine, Hamwi) and adjusts for frame size to provide the most comprehensive estimate possible.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How does frame size affect ideal weight?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Frame size significantly impacts ideal weight. Small-framed individuals typically weigh 10% less than the calculated ideal weight, while large-framed individuals may weigh 10% more and still be healthy. You can determine frame size by measuring wrist circumference or using the thumb-and-finger method around your wrist. If fingers overlap, you have a small frame; if they just touch, medium frame; if they don't touch, large frame.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Health & Fitness Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate your Body Mass Index and health status</p>
                </a>
                <a href="/calorie-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate daily calorie needs for weight goals</p>
                </a>
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate weight loss/gain percentages</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
