import { Metadata } from "next";
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { BMRCalculator } from "@/components/Calculator/BMRCalculator";

export const metadata: Metadata = {
  title: "BMR Calculator (Free, No signup) - Basal Metabolic Rate | AICalculator",
  description: "Free BMR calculator with no sign-up required. Determine your basal metabolic rate and total daily energy expenditure (TDEE). Get personalized calorie goals for weight loss, maintenance, or muscle gain with macro breakdown.",
  keywords: [
    "bmr calculator",
    "free bmr calculator",
    "bmr calculator no signup",
    "basal metabolic rate calculator",
    "tdee calculator",
    "metabolic rate calculator",
    "calorie calculator",
    "daily calorie needs",
    "bmr formula",
    "mifflin st jeor calculator",
    "harris benedict calculator",
    "resting metabolic rate",
    "how many calories do i need",
    "calories to lose weight",
    "calories to gain weight",
    "maintenance calories",
    "macro calculator",
  ],
  openGraph: {
    title: "BMR Calculator (Free, No signup) - AICalculator",
    description: "Free BMR calculator with no sign-up required. Calculate your BMR and daily calorie needs based on activity level. Get personalized weight loss, maintenance, and muscle gain calorie goals.",
    type: "website",
    url: getUrl('/bmr-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMR Calculator (Free, No signup) - AICalculator",
    description: "Free BMR calculator with no sign-up required. BMR and TDEE calculator with personalized calorie and macro recommendations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/bmr-calculator'),
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

export default function BMRCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "BMR Calculator",
        "url": getUrl('/bmr-calculator'),
        "description": "Free online BMR (Basal Metabolic Rate) calculator to determine your daily calorie needs, TDEE (Total Daily Energy Expenditure), and personalized macronutrient recommendations for weight loss, maintenance, or muscle gain.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate BMR using Mifflin-St Jeor or Harris-Benedict formula",
          "Calculate TDEE based on activity level",
          "Personalized calorie goals for weight loss, maintenance, and gain",
          "Macronutrient breakdown (protein, carbs, fats)",
          "Imperial and metric units support",
          "Activity level adjustment (sedentary to very active)",
          "Expected weight change projections",
          "Free forever, no registration required"
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
            "name": "Calculators",
            "item": getUrl('/calculators')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "BMR Calculator",
            "item": getUrl('/bmr-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is BMR (Basal Metabolic Rate)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain vital functions like breathing, circulation, and cell production. It represents 60-75% of your total daily calorie expenditure. BMR does not include calories burned through physical activity or digesting food. For example, a 30-year-old male weighing 180 lbs might have a BMR of 1,800 calories, meaning his body burns 1,800 calories per day even if he stays in bed all day."
            }
          },
          {
            "@type": "Question",
            "name": "What is TDEE and how is it different from BMR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn per day, including BMR plus physical activity, exercise, and food digestion (thermic effect). TDEE = BMR × Activity Multiplier. For example, if your BMR is 1,800 calories and you're moderately active (exercise 3-5 days/week), your TDEE would be 1,800 × 1.55 = 2,790 calories per day. TDEE is the number you should use for setting calorie goals, not BMR."
            }
          },
          {
            "@type": "Question",
            "name": "Which BMR formula is more accurate - Mifflin-St Jeor or Harris-Benedict?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Mifflin-St Jeor equation is generally more accurate for modern populations and is recommended by most nutritionists. It was developed in 1990 and accounts for changes in body composition and lifestyle compared to the original Harris-Benedict equation from 1919. Studies show Mifflin-St Jeor has a 5-10% accuracy advantage, especially for people who are overweight or obese. However, both formulas provide reasonable estimates within 200-300 calories of measured BMR."
            }
          },
          {
            "@type": "Question",
            "name": "How many calories should I eat to lose weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To lose weight safely, create a calorie deficit of 500 calories per day, which results in approximately 1 pound (0.5 kg) of weight loss per week. Calculate your TDEE first, then subtract 500 calories. For example, if your TDEE is 2,500 calories, eat 2,000 calories per day. Never eat below your BMR or less than 1,200 calories (women) or 1,500 calories (men) without medical supervision, as this can slow metabolism and cause nutrient deficiencies."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my activity level accurately?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Choose your activity level honestly: Sedentary (desk job, no exercise) = 1.2x BMR, Light (exercise 1-3 days/week) = 1.375x, Moderate (exercise 3-5 days/week) = 1.55x, Active (exercise 6-7 days/week) = 1.725x, Very Active (physical job + daily exercise) = 1.9x. Most people overestimate their activity level. If you sit at a desk all day and go to the gym 3 times per week for 45 minutes, you're 'Light' or 'Moderate' at most, not 'Active'. Track your weight for 2-3 weeks and adjust if needed."
            }
          },
          {
            "@type": "Question",
            "name": "Can BMR change over time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, BMR changes based on age, weight, muscle mass, and hormones. BMR naturally decreases by 1-2% per decade after age 20 due to muscle loss and hormonal changes. Building muscle increases BMR by 6-10 calories per pound of muscle gained. Losing weight decreases BMR because a smaller body requires fewer calories. Extreme dieting can temporarily lower BMR by 15-20% (metabolic adaptation). Recalculate your BMR every 10-15 pounds of weight change or yearly."
            }
          },
          {
            "@type": "Question",
            "name": "What are macronutrients and how should I split them?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Macronutrients are protein, carbohydrates, and fats - the three main nutrients that provide calories. A balanced split is 30% protein, 40% carbs, 30% fats. Protein (4 cal/g) builds and repairs muscle; aim for 0.7-1g per pound of body weight. Carbohydrates (4 cal/g) provide energy for workouts and brain function. Fats (9 cal/g) support hormones and nutrient absorption. Athletes may use 40% carbs / 30% protein / 30% fats. Keto dieters use 5% carbs / 25% protein / 70% fats. Adjust based on your goals and preferences."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to eat below my BMR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Generally, no. Eating significantly below your BMR for extended periods can cause muscle loss, metabolic slowdown, fatigue, nutrient deficiencies, and hormonal imbalances. Your BMR represents the minimum calories needed for vital functions. A safe calorie deficit is 500-750 calories below your TDEE (not BMR), which keeps you above BMR in most cases. If your TDEE is close to your BMR (very sedentary), focus on increasing activity rather than drastically cutting calories. Always consult a healthcare provider before eating less than 1,200-1,500 calories per day."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Your BMR and Daily Calorie Needs",
        "description": "Step-by-step guide to calculating basal metabolic rate and total daily energy expenditure",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Your Formula and Units",
            "text": "Select between Mifflin-St Jeor (recommended) or Harris-Benedict formula. Choose Imperial (pounds, inches) or Metric (kilograms, centimeters) units based on your preference."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Your Personal Information",
            "text": "Input your gender, age, current weight, and height. Be accurate - even small differences can affect your BMR by 50-100 calories. Use your current weight, not goal weight."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Your Activity Level",
            "text": "Honestly assess your activity level: Sedentary (no exercise), Light (1-3 days/week), Moderate (3-5 days/week), Active (6-7 days/week), or Very Active (physical job + exercise). Most people overestimate - be conservative."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Your Results",
            "text": "See your BMR (calories at rest), TDEE (total daily calories), calorie goals for weight loss/maintenance/gain, and recommended macronutrient breakdown. Use TDEE as your baseline for setting calorie targets."
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
      
      <h1 className="sr-only">BMR Calculator - Free Basal Metabolic Rate and TDEE Calculator for Daily Calorie Needs and Weight Management</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="BMR Calculator (Free, No signup)"
        calculatorUrl="/bmr-calculator"
      />

      <section className="py-8 md:py-12" aria-label="BMR Calculator Tool">
        <div className="container mx-auto px-4">
          <BMRCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="BMR Calculator Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to BMR and TDEE
            </h2>

            {/* Understanding BMR vs TDEE */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">🫀 What is BMR?</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body needs to perform essential functions at complete rest:
                </p>
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Breathing and circulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Cell production and repair</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Nutrient processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Body temperature regulation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Brain and nervous system function</span>
                  </li>
                </ul>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <strong className="text-blue-900">Key Point:</strong>
                  <p className="text-blue-800 mt-1">BMR represents 60-75% of your total daily calorie burn</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4">🔥 What is TDEE?</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Total Daily Energy Expenditure (TDEE)</strong> is your total calorie burn including all activities:
                </p>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span>BMR (Basal Rate)</span>
                    <span className="font-semibold">60-75%</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span>Physical Activity</span>
                    <span className="font-semibold">15-30%</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span>Thermic Effect of Food</span>
                    <span className="font-semibold">8-15%</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <strong className="text-green-900">Key Point:</strong>
                  <p className="text-green-800 mt-1">Use TDEE (not BMR) to set your calorie goals</p>
                </div>
              </div>
            </div>

            {/* BMR Formulas Comparison */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">BMR Calculation Formulas</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Mifflin-St Jeor Equation (Recommended)</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    <div><strong>Men:</strong> BMR = (10 × weight kg) + (6.25 × height cm) - (5 × age) + 5</div>
                    <div className="mt-1"><strong>Women:</strong> BMR = (10 × weight kg) + (6.25 × height cm) - (5 × age) - 161</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✅ More accurate for modern populations (developed 1990)<br />
                    ✅ Accounts for current body composition trends<br />
                    ✅ Recommended by American Dietetic Association
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Harris-Benedict Equation (Classic)</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    <div><strong>Men:</strong> BMR = 88.362 + (13.397 × weight kg) + (4.799 × height cm) - (5.677 × age)</div>
                    <div className="mt-1"><strong>Women:</strong> BMR = 447.593 + (9.247 × weight kg) + (3.098 × height cm) - (4.330 × age)</div>
                  </div>
                  <p className="text-sm text-gray-600">
                    📚 Original formula from 1919, revised 1984<br />
                    ⚠️ May overestimate BMR by 5-10% for some people<br />
                    ℹ️ Still widely used and generally accurate
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Multipliers */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Activity Level Multipliers</h3>
              <p className="text-gray-700 mb-4">Multiply your BMR by your activity level to get TDEE:</p>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">Sedentary (×1.2)</span>
                    <span className="text-sm text-gray-600">Little or no exercise</span>
                  </div>
                  <p className="text-sm text-gray-600">Desk job, no regular exercise, minimal walking. Example: Office worker who drives to work and watches TV at night.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">Light (×1.375)</span>
                    <span className="text-sm text-gray-600">Exercise 1-3 days/week</span>
                  </div>
                  <p className="text-sm text-gray-600">Light cardio or weights 1-3 times per week, some walking. Example: Desk job + gym 2x/week for 30-45 minutes.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">Moderate (×1.55)</span>
                    <span className="text-sm text-gray-600">Exercise 3-5 days/week</span>
                  </div>
                  <p className="text-sm text-gray-600">Moderate exercise 3-5 days per week, active lifestyle. Example: Regular gym-goer who exercises 45-60 minutes per session.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">Active (×1.725)</span>
                    <span className="text-sm text-gray-600">Exercise 6-7 days/week</span>
                  </div>
                  <p className="text-sm text-gray-600">Hard exercise daily or intense exercise 6-7 days/week. Example: Serious athlete or fitness enthusiast training 1-2 hours daily.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">Very Active (×1.9)</span>
                    <span className="text-sm text-gray-600">Physical job + daily exercise</span>
                  </div>
                  <p className="text-sm text-gray-600">Very hard exercise daily plus physical job. Example: Construction worker who also trains for marathons, or professional athlete.</p>
                </div>
              </div>

              <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Most people overestimate their activity level!</strong> Be honest. A 30-minute gym session 3x/week is "Light" or "Moderate," not "Active."
                </p>
              </div>
            </div>

            {/* Practical Examples */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Real-World Examples</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-bold text-blue-900 mb-3">Example 1: Male Office Worker</h4>
                  <div className="space-y-1 text-sm mb-3">
                    <div className="flex justify-between">
                      <span>Age:</span>
                      <strong>35 years</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <strong>185 lbs (84 kg)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <strong>5'11" (180 cm)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Activity:</span>
                      <strong>Light (gym 2x/week)</strong>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-xs text-gray-600 mb-1">Mifflin-St Jeor Results:</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>BMR:</span>
                      <strong className="text-blue-700">1,825 cal/day</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TDEE:</span>
                      <strong className="text-green-700">2,509 cal/day</strong>
                    </div>
                  </div>
                </div>

                <div className="border border-pink-200 rounded-lg p-4 bg-pink-50">
                  <h4 className="font-bold text-pink-900 mb-3">Example 2: Female Fitness Enthusiast</h4>
                  <div className="space-y-1 text-sm mb-3">
                    <div className="flex justify-between">
                      <span>Age:</span>
                      <strong>28 years</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <strong>140 lbs (64 kg)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <strong>5'6" (168 cm)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Activity:</span>
                      <strong>Moderate (gym 4x/week)</strong>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-xs text-gray-600 mb-1">Mifflin-St Jeor Results:</div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>BMR:</span>
                      <strong className="text-pink-700">1,372 cal/day</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TDEE:</span>
                      <strong className="text-green-700">2,127 cal/day</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✅ How to Use Your BMR/TDEE</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">1.</span>
                    <span><strong>For weight loss:</strong> Eat 300-500 calories below your TDEE (not BMR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">2.</span>
                    <span><strong>For maintenance:</strong> Eat at your TDEE to maintain current weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">3.</span>
                    <span><strong>For muscle gain:</strong> Eat 200-400 calories above your TDEE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">4.</span>
                    <span><strong>Track for 2-3 weeks:</strong> Adjust based on actual weight changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">5.</span>
                    <span><strong>Recalculate regularly:</strong> Update every 10-15 lbs of weight change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">6.</span>
                    <span><strong>Focus on protein:</strong> Aim for 0.7-1g per pound of body weight</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Common BMR Mistakes</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Eating below BMR:</strong> Can slow metabolism and cause muscle loss</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Overestimating activity:</strong> Most people are "Light" not "Active"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Not adjusting for weight loss:</strong> BMR decreases as you lose weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Ignoring muscle mass:</strong> More muscle = higher BMR</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Too large deficits:</strong> Cutting 1,000+ calories slows metabolism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Not tracking accurately:</strong> Use a food scale for 2-3 weeks</span>
                  </li>
                </ul>
              </div>
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
                    What is BMR (Basal Metabolic Rate)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain vital functions like breathing, circulation, and cell production. It represents 60-75% of your total daily calorie expenditure. BMR does not include calories burned through physical activity or digesting food. For example, a 30-year-old male weighing 180 lbs might have a BMR of 1,800 calories, meaning his body burns 1,800 calories per day even if he stays in bed all day.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is TDEE and how is it different from BMR?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      TDEE (Total Daily Energy Expenditure) is the total number of calories you burn per day, including BMR plus physical activity, exercise, and food digestion (thermic effect). TDEE = BMR × Activity Multiplier. For example, if your BMR is 1,800 calories and you're moderately active (exercise 3-5 days/week), your TDEE would be 1,800 × 1.55 = 2,790 calories per day. TDEE is the number you should use for setting calorie goals, not BMR.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Which BMR formula is more accurate - Mifflin-St Jeor or Harris-Benedict?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The Mifflin-St Jeor equation is generally more accurate for modern populations and is recommended by most nutritionists. It was developed in 1990 and accounts for changes in body composition and lifestyle compared to the original Harris-Benedict equation from 1919. Studies show Mifflin-St Jeor has a 5-10% accuracy advantage, especially for people who are overweight or obese. However, both formulas provide reasonable estimates within 200-300 calories of measured BMR.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How many calories should I eat to lose weight?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To lose weight safely, create a calorie deficit of 500 calories per day, which results in approximately 1 pound (0.5 kg) of weight loss per week. Calculate your TDEE first, then subtract 500 calories. For example, if your TDEE is 2,500 calories, eat 2,000 calories per day. Never eat below your BMR or less than 1,200 calories (women) or 1,500 calories (men) without medical supervision, as this can slow metabolism and cause nutrient deficiencies.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my activity level accurately?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Choose your activity level honestly: Sedentary (desk job, no exercise) = 1.2x BMR, Light (exercise 1-3 days/week) = 1.375x, Moderate (exercise 3-5 days/week) = 1.55x, Active (exercise 6-7 days/week) = 1.725x, Very Active (physical job + daily exercise) = 1.9x. Most people overestimate their activity level. If you sit at a desk all day and go to the gym 3 times per week for 45 minutes, you're 'Light' or 'Moderate' at most, not 'Active'. Track your weight for 2-3 weeks and adjust if needed.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can BMR change over time?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, BMR changes based on age, weight, muscle mass, and hormones. BMR naturally decreases by 1-2% per decade after age 20 due to muscle loss and hormonal changes. Building muscle increases BMR by 6-10 calories per pound of muscle gained. Losing weight decreases BMR because a smaller body requires fewer calories. Extreme dieting can temporarily lower BMR by 15-20% (metabolic adaptation). Recalculate your BMR every 10-15 pounds of weight change or yearly.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What are macronutrients and how should I split them?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Macronutrients are protein, carbohydrates, and fats - the three main nutrients that provide calories. A balanced split is 30% protein, 40% carbs, 30% fats. Protein (4 cal/g) builds and repairs muscle; aim for 0.7-1g per pound of body weight. Carbohydrates (4 cal/g) provide energy for workouts and brain function. Fats (9 cal/g) support hormones and nutrient absorption. Athletes may use 40% carbs / 30% protein / 30% fats. Keto dieters use 5% carbs / 25% protein / 70% fats. Adjust based on your goals and preferences.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Is it safe to eat below my BMR?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Generally, no. Eating significantly below your BMR for extended periods can cause muscle loss, metabolic slowdown, fatigue, nutrient deficiencies, and hormonal imbalances. Your BMR represents the minimum calories needed for vital functions. A safe calorie deficit is 500-750 calories below your TDEE (not BMR), which keeps you above BMR in most cases. If your TDEE is close to your BMR (very sedentary), focus on increasing activity rather than drastically cutting calories. Always consult a healthcare provider before eating less than 1,200-1,500 calories per day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Health Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/calorie-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate daily calorie needs with detailed macro breakdown</p>
                </a>
                <a href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate Body Mass Index and health status</p>
                </a>
                <a href="/body-fat-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Body Fat Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Estimate body fat percentage</p>
                </a>
                <a href="/weight-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Ideal Weight Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Find your ideal weight range</p>
                </a>
                <a href="/macro-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Macro Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate protein, carbs, and fats</p>
                </a>
                <a href="/protein-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Protein Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate daily protein requirements</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">Learn more about metabolism and nutrition:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.health.harvard.edu/staying-healthy/the-truth-about-metabolism" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Harvard Health: Metabolism →
                </a>
                <a href="https://www.niddk.nih.gov/health-information/weight-management/body-weight-planner" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  NIH: Body Weight Planner →
                </a>
                <a href="https://en.wikipedia.org/wiki/Basal_metabolic_rate" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Wikipedia: BMR →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

