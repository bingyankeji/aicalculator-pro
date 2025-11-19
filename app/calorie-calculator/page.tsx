import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalorieCalculator } from "@/components/Calculator/CalorieCalculator";

export const metadata: Metadata = {
  title: "Calorie Calculator (Free, No signup) - Daily Needs | AICalculator",
  description: "Free calorie calculator with no sign-up required. Calculate your daily calorie needs. Get personalized BMR, TDEE, and macronutrient recommendations for weight loss, maintenance, or muscle gain. Includes smart analysis and meal planning guidance.",
  keywords: [
    "calorie calculator",
    "free calorie calculator",
    "calorie calculator no signup",
    "BMR calculator",
    "TDEE calculator",
    "daily calorie needs",
    "calories per day",
    "weight loss calculator",
    "calorie deficit calculator",
    "macros calculator",
    "macronutrients calculator",
    "how many calories should i eat",
    "calories to lose weight",
    "maintenance calories",
    "Mifflin St Jeor",
    "Harris Benedict",
    "how to calculate daily calories",
    "calorie deficit for weight loss",
    "TDEE calculator online",
    "BMR calculator online free",
    "daily calorie intake calculator"
  ],
  openGraph: {
    title: "Calorie Calculator (Free, No signup) - AICalculator",
    description: "Free calorie calculator with no sign-up required. Get BMR and TDEE calculation with personalized calorie goals and macro recommendations for weight loss, maintenance, or muscle gain.",
    type: "website",
    url: "https://aicalculator.pro/calorie-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Calculator (Free, No signup) - AICalculator",
    description: "Free calorie calculator with no sign-up required. Calculate your daily calorie needs with personalized BMR, TDEE, and macronutrient recommendations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/calorie-calculator",
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

export default function CalorieCalculatorPage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Calorie Calculator",
        "url": "https://aicalculator.pro/calorie-calculator",
        "description": "Free online calorie calculator with BMR and TDEE calculation, personalized macronutrient recommendations, and smart nutrition analysis.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "BMR Calculator (Mifflin-St Jeor & Harris-Benedict formulas)",
          "TDEE Calculator with activity level adjustments",
          "Weight loss, maintenance, and muscle gain goals",
          "Personalized macronutrient breakdown (protein, carbs, fats)",
          "Time to goal calculation",
          "Smart health status analysis",
          "Personalized nutrition recommendations",
          "Imperial and metric unit support",
          "Share results via social media",
          "Export calculations as images",
          "Print-friendly calculation reports"
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
            "name": "Calorie Calculator",
            "item": "https://aicalculator.pro/calorie-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many calories should I eat per day?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Daily calorie needs depend on your age, gender, weight, height, and activity level. For most adults, this ranges from 1,600-3,000 calories per day. Men typically need 2,000-3,000 calories, while women need 1,600-2,400 calories. Use our calorie calculator to get a personalized estimate based on your BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure)."
            }
          },
          {
            "@type": "Question",
            "name": "What is BMR and how is it calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMR (Basal Metabolic Rate) is the number of calories your body needs to perform basic life-sustaining functions at rest, such as breathing, circulation, and cell production. The most accurate formulas are Mifflin-St Jeor: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5 for men (subtract 161 for women), and Harris-Benedict which uses slightly different coefficients. BMR typically accounts for 60-75% of total daily calories."
            }
          },
          {
            "@type": "Question",
            "name": "What is TDEE and why is it important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, including BMR plus calories burned through physical activity. TDEE = BMR × activity multiplier (1.2 for sedentary, 1.375 for light exercise, 1.55 for moderate, 1.725 for active, 1.9 for very active). Knowing your TDEE is crucial for weight management: eat below TDEE to lose weight, at TDEE to maintain, or above TDEE to gain weight."
            }
          },
          {
            "@type": "Question",
            "name": "How many calories should I eat to lose weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For safe weight loss, create a calorie deficit of 500-1,000 calories per day below your TDEE, which results in losing 1-2 lbs per week. However, never go below 1,200 calories/day for women or 1,500 calories/day for men without medical supervision. A moderate deficit (500 cal/day = 1 lb/week loss) is more sustainable than aggressive deficits, which can lead to muscle loss and nutritional deficiencies."
            }
          },
          {
            "@type": "Question",
            "name": "How should I split my macronutrients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A balanced macronutrient split is typically 40% carbohydrates, 30% protein, and 30% fats. For weight loss, increase protein to 35-40% to preserve muscle mass. For muscle gain, aim for 30-35% protein, 45-50% carbs, and 20-25% fats. Calculate grams by dividing calories by 4 for protein and carbs (4 cal/gram), and by 9 for fats (9 cal/gram). Adjust based on your activity level and goals."
            }
          },
          {
            "@type": "Question",
            "name": "Is the Mifflin-St Jeor or Harris-Benedict formula more accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Mifflin-St Jeor equation is generally considered more accurate for modern populations. Developed in 1990, it reflects current body compositions better than the Harris-Benedict equation from 1919. Studies show Mifflin-St Jeor has an accuracy rate of about 10% for predicting BMR in healthy individuals, while Harris-Benedict can be 5-10% less accurate. However, both provide good estimates for calorie planning."
            }
          },
          {
            "@type": "Question",
            "name": "How long will it take to reach my weight goal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Weight loss timeline depends on your calorie deficit. A 500 calorie daily deficit (3,500 cal/week) results in losing approximately 1 lb per week. For example, losing 20 lbs would take about 20 weeks (5 months) at this rate. Safe weight loss is 0.5-2 lbs per week. Faster loss may lead to muscle loss and is harder to maintain. Use our calculator's target weight feature to estimate your timeline based on your chosen deficit."
            }
          },
          {
            "@type": "Question",
            "name": "Should I eat back calories burned from exercise?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you've calculated your TDEE using an activity multiplier, your exercise is already accounted for in your calorie target, so you don't need to eat back exercise calories. However, if you calculated maintenance calories using sedentary multiplier and do additional exercise, you may need to eat back 50-75% of exercise calories to avoid excessive deficit. Monitor your energy levels, recovery, and weight changes to adjust as needed."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Calorie Calculator",
        "description": "Step-by-step guide to calculate your daily calorie needs and macronutrient goals",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Unit System and Formula",
            "text": "Choose between Imperial (lbs/inches) or Metric (kg/cm) units. Select your preferred BMR formula: Mifflin-St Jeor (recommended for accuracy) or Harris-Benedict (classic formula)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Basic Information",
            "text": "Input your age (15-100 years), select your biological gender (male/female), enter your current weight and height in your chosen unit system."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Activity Level",
            "text": "Select your activity level: Sedentary (little to no exercise), Light (1-3 days/week), Moderate (4-5 days/week), Active (6-7 days/week), or Very Active (intense daily exercise). This determines your TDEE multiplier."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Set Your Goal",
            "text": "Choose your fitness goal: aggressive weight loss (-2 lbs/week), moderate loss (-1 lb/week), mild loss (-0.5 lb/week), maintain weight, or muscle gain (+0.5 or +1 lb/week). Optionally, enter your target weight to calculate time to goal."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Calculate and Review Results",
            "text": "Click 'Calculate Calories' to see your BMR, TDEE, goal calories, and personalized macronutrient breakdown. Review smart analysis including health status, key insights, and nutrition recommendations."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Share or Save Results",
            "text": "Share your calculation via social media, save as an image for reference, or print your personalized nutrition plan. Use the share link to track your progress over time."
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
      <h1 className="sr-only">Calorie Calculator - Free BMR and TDEE Calculator for Daily Calorie Needs</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Calorie Calculator (Free, No signup)"
        calculatorUrl="/calorie-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <CalorieCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" 
               aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Calorie Calculation and Nutrition
            </h2>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Card 1: What is BMR */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔥</span>
                  What is BMR (Basal Metabolic Rate)?
                </h3>
                <p className="text-gray-700 mb-4">
                  BMR is the number of calories your body needs to perform essential life-sustaining functions while at complete rest. This includes breathing, circulation, nutrient processing, and cell production. BMR typically accounts for 60-75% of your total daily calorie expenditure.
                </p>
                <p className="text-gray-700">
                  Factors affecting BMR include age, gender, body composition, genetics, and hormonal balance. Men generally have higher BMR than women due to greater muscle mass. BMR decreases with age as muscle mass naturally declines, making it important to adjust calorie intake as you get older. Learn more from <a href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WHO Healthy Diet Guidelines</a>.
                </p>
              </div>

              {/* Card 2: What is TDEE */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚡</span>
                  What is TDEE (Total Daily Energy Expenditure)?
                </h3>
                <p className="text-gray-700 mb-4">
                  TDEE is the total number of calories you burn in a 24-hour period, combining your BMR with calories burned through physical activity and digestion (thermic effect of food). TDEE is calculated by multiplying your BMR by an activity factor that ranges from 1.2 (sedentary) to 1.9 (very active).
                </p>
                <p className="text-gray-700">
                  Understanding your TDEE is crucial for effective weight management. To lose weight, consume fewer calories than your TDEE (calorie deficit). To gain weight or build muscle, consume more calories than your TDEE (calorie surplus). To maintain your current weight, match your calorie intake to your TDEE.
                </p>
              </div>

              {/* Card 3: BMR Calculation Methods */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📐</span>
                  BMR Calculation Formulas
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Mifflin-St Jeor Equation (Recommended):</p>
                    <p className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded mb-2">
                      Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5
                    </p>
                    <p className="text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded">
                      Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Harris-Benedict Equation (Classic):</p>
                    <p className="text-xs text-gray-600">
                      An older formula that tends to overestimate BMR by 5-10% for modern populations. Mifflin-St Jeor is generally more accurate for most people today.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: Activity Levels */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏃</span>
                  Activity Level Multipliers
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Sedentary (1.2):</strong> Little or no exercise, desk job</li>
                  <li>• <strong>Light (1.375):</strong> Light exercise or sports 1-3 days/week</li>
                  <li>• <strong>Moderate (1.55):</strong> Moderate exercise 4-5 days/week</li>
                  <li>• <strong>Active (1.725):</strong> Hard exercise 6-7 days/week</li>
                  <li>• <strong>Very Active (1.9):</strong> Very intense exercise daily, physical job</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Choose the level that best matches your current lifestyle. Be honest - most people fall into the sedentary or light category. Overestimating activity level can lead to consuming too many calories.
                </p>
              </div>

              {/* Card 5: Weight Loss Guidelines */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📉</span>
                  Safe Weight Loss Guidelines
                </h3>
                <p className="text-gray-700 mb-3">
                  Safe and sustainable weight loss typically ranges from 0.5 to 2 pounds per week. This requires a daily calorie deficit of 250-1,000 calories below your TDEE (since 1 pound of fat equals approximately 3,500 calories).
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>• <strong>Never go below:</strong> 1,200 cal/day (women) or 1,500 cal/day (men)</li>
                  <li>• <strong>Moderate deficit:</strong> 500 cal/day = 1 lb/week loss (recommended)</li>
                  <li>• <strong>Aggressive deficit:</strong> 1,000 cal/day = 2 lb/week loss (short-term only)</li>
                  <li>• <strong>Mild deficit:</strong> 250 cal/day = 0.5 lb/week loss (sustainable)</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Very low calorie diets can lead to muscle loss, nutritional deficiencies, metabolic slowdown, and are difficult to maintain long-term.
                </p>
              </div>

              {/* Card 6: Macronutrients */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🥗</span>
                  Macronutrient Breakdown
                </h3>
                <p className="text-gray-700 mb-3">
                  Macronutrients are the three main categories of nutrients your body needs in large amounts: protein, carbohydrates, and fats. Each provides different amounts of energy per gram.
                </p>
                <ul className="text-gray-700 space-y-2 mb-3">
                  <li>• <strong>Protein:</strong> 4 calories per gram - builds and repairs tissues</li>
                  <li>• <strong>Carbohydrates:</strong> 4 calories per gram - primary energy source</li>
                  <li>• <strong>Fats:</strong> 9 calories per gram - hormone production, nutrient absorption</li>
                </ul>
                <p className="text-gray-700">
                  <strong>Recommended split:</strong> 40% carbs, 30% protein, 30% fats. Adjust based on goals: increase protein for muscle building or weight loss, increase carbs for endurance activities.
                </p>
              </div>
            </div>

            {/* Calorie Needs by Demographics Table */}
            <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Average Daily Calorie Needs by Demographics
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-4 py-3 font-bold text-gray-900">Age Group</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Male (Sedentary)</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Male (Active)</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Female (Sedentary)</th>
                      <th className="px-4 py-3 font-bold text-gray-900">Female (Active)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">19-25 years</td>
                      <td className="px-4 py-3 text-gray-700">2,400</td>
                      <td className="px-4 py-3 text-gray-700">3,000</td>
                      <td className="px-4 py-3 text-gray-700">2,000</td>
                      <td className="px-4 py-3 text-gray-700">2,400</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">26-35 years</td>
                      <td className="px-4 py-3 text-gray-700">2,400</td>
                      <td className="px-4 py-3 text-gray-700">2,800</td>
                      <td className="px-4 py-3 text-gray-700">1,800</td>
                      <td className="px-4 py-3 text-gray-700">2,200</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">36-50 years</td>
                      <td className="px-4 py-3 text-gray-700">2,200</td>
                      <td className="px-4 py-3 text-gray-700">2,600</td>
                      <td className="px-4 py-3 text-gray-700">1,800</td>
                      <td className="px-4 py-3 text-gray-700">2,200</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">51-65 years</td>
                      <td className="px-4 py-3 text-gray-700">2,000</td>
                      <td className="px-4 py-3 text-gray-700">2,400</td>
                      <td className="px-4 py-3 text-gray-700">1,600</td>
                      <td className="px-4 py-3 text-gray-700">2,000</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-gray-700">65+ years</td>
                      <td className="px-4 py-3 text-gray-700">2,000</td>
                      <td className="px-4 py-3 text-gray-700">2,400</td>
                      <td className="px-4 py-3 text-gray-700">1,600</td>
                      <td className="px-4 py-3 text-gray-700">2,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                These are general guidelines from <a href="https://www.dietaryguidelines.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USDA Dietary Guidelines</a>. Individual needs vary based on metabolism, body composition, and specific health conditions.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How many calories should I eat per day?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Daily calorie needs depend on your age, gender, weight, height, and activity level. For most adults, this ranges from 1,600-3,000 calories per day. Men typically need 2,000-3,000 calories, while women need 1,600-2,400 calories. Use our calorie calculator to get a personalized estimate based on your BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure).
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is BMR and how is it calculated?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      BMR (Basal Metabolic Rate) is the number of calories your body needs to perform basic life-sustaining functions at rest, such as breathing, circulation, and cell production. The most accurate formulas are Mifflin-St Jeor: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5 for men (subtract 161 for women), and Harris-Benedict which uses slightly different coefficients. BMR typically accounts for 60-75% of total daily calories.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is TDEE and why is it important?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, including BMR plus calories burned through physical activity. TDEE = BMR × activity multiplier (1.2 for sedentary, 1.375 for light exercise, 1.55 for moderate, 1.725 for active, 1.9 for very active). Knowing your TDEE is crucial for weight management: eat below TDEE to lose weight, at TDEE to maintain, or above TDEE to gain weight.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How many calories should I eat to lose weight?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For safe weight loss, create a calorie deficit of 500-1,000 calories per day below your TDEE, which results in losing 1-2 lbs per week. However, never go below 1,200 calories/day for women or 1,500 calories/day for men without medical supervision. A moderate deficit (500 cal/day = 1 lb/week loss) is more sustainable than aggressive deficits, which can lead to muscle loss and nutritional deficiencies.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How should I split my macronutrients?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A balanced macronutrient split is typically 40% carbohydrates, 30% protein, and 30% fats. For weight loss, increase protein to 35-40% to preserve muscle mass. For muscle gain, aim for 30-35% protein, 45-50% carbs, and 20-25% fats. Calculate grams by dividing calories by 4 for protein and carbs (4 cal/gram), and by 9 for fats (9 cal/gram). Adjust based on your activity level and goals.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Is the Mifflin-St Jeor or Harris-Benedict formula more accurate?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The Mifflin-St Jeor equation is generally considered more accurate for modern populations. Developed in 1990, it reflects current body compositions better than the Harris-Benedict equation from 1919. Studies show Mifflin-St Jeor has an accuracy rate of about 10% for predicting BMR in healthy individuals, while Harris-Benedict can be 5-10% less accurate. However, both provide good estimates for calorie planning.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How long will it take to reach my weight goal?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Weight loss timeline depends on your calorie deficit. A 500 calorie daily deficit (3,500 cal/week) results in losing approximately 1 lb per week. For example, losing 20 lbs would take about 20 weeks (5 months) at this rate. Safe weight loss is 0.5-2 lbs per week. Faster loss may lead to muscle loss and is harder to maintain. Use our calculator's target weight feature to estimate your timeline based on your chosen deficit.
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I eat back calories burned from exercise?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      If you've calculated your TDEE using an activity multiplier, your exercise is already accounted for in your calorie target, so you don't need to eat back exercise calories. However, if you calculated maintenance calories using sedentary multiplier and do additional exercise, you may need to eat back 50-75% of exercise calories to avoid excessive deficit. Monitor your energy levels, recovery, and weight changes to adjust as needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Links */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Health Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate your body mass index and health status</p>
                </a>
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate calorie deficits and macro percentages</p>
                </a>
                <a href="/age-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Age Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate your exact age for metabolism adjustments</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

