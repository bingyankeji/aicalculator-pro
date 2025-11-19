import type { Metadata } from 'next';
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { MacroCalculator } from '@/components/Calculator/MacroCalculator';

export const metadata: Metadata = {
  title: 'Macro Calculator (Free, No signup) - Macronutrients | AICalculator',
  description: 'Free macro calculator with no sign-up required. Calculate your perfect macros (protein, carbs, fats) for cutting, bulking, or maintenance. Get personalized macro targets, meal plans, and nutrition recommendations for your fitness goals.',
  keywords: [
    'macro calculator',
    'free macro calculator',
    'macro calculator no signup',
    'macros calculator',
    'macronutrient calculator',
    'protein calculator',
    'carb calculator',
    'fat calculator',
    'cutting macros',
    'bulking macros',
    'IIFYM calculator',
    'flexible dieting',
    'nutrition calculator',
    'meal plan calculator',
    'bodybuilding macros',
    'weight loss macros',
    'muscle gain macros',
  ],
  openGraph: {
    title: 'Macro Calculator (Free, No signup) - AICalculator',
    description: 'Free macro calculator with no sign-up required. For weight loss, muscle gain, or maintenance. Get personalized protein, carbs, and fats targets based on your goals and activity level.',
    type: 'website',
    url: getUrl('/macro-calculator'),
    siteName: 'AICalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Macro Calculator (Free, No signup) - AICalculator',
    description: 'Free macro calculator with no sign-up required. Calculate optimal protein, carbs, and fats for cutting, bulking, or maintenance with meal-by-meal breakdown.',
    site: '@AICalculator',
  },
  alternates: {
    canonical: getUrl('/macro-calculator'),
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

export default function MacroCalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Macro Calculator',
        url: getUrl('/macro-calculator'),
        description:
          'Free macronutrient calculator that helps you determine optimal protein, carbs, and fats for cutting, bulking, or maintenance. Get personalized macro targets based on your goals, activity level, and body composition.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'BMR & TDEE calculation',
          'Personalized macro targets for cutting, bulking, or maintenance',
          'Protein, carbs, and fats breakdown',
          'Per-meal macro distribution',
          'Weekly and monthly totals',
          'Activity level adjustment',
          'Imperial and Metric units',
          'Goal-specific recommendations',
          'Share and save results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
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
            item: getUrl('/health-fitness'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Macro Calculator',
            item: getUrl('/macro-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are macros and why do they matter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Macros (macronutrients) are protein, carbohydrates, and fats - the three main nutrients your body needs in large amounts. They matter because: (1) Protein builds and repairs muscle tissue, (2) Carbs provide energy for workouts and daily activities, (3) Fats support hormone production and nutrient absorption. Balancing your macros correctly helps you achieve specific fitness goals like losing fat, building muscle, or maintaining weight while optimizing energy levels and performance.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate my macros for weight loss (cutting)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For weight loss, calculate macros by: (1) Determine TDEE (Total Daily Energy Expenditure), (2) Create a calorie deficit of 300-500 calories, (3) Set protein at 1.0-1.2g per lb of body weight (40-45% of calories), (4) Set fats at 20-30% of calories, (5) Fill remaining calories with carbs (25-40%). Higher protein during cutting helps preserve muscle mass. The calculator automatically determines optimal ratios based on your body stats and activity level.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the best macro ratios for muscle gain (bulking)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For muscle gain, optimal macro ratios are typically: Protein 25-35% (0.8-1.0g per lb body weight), Carbs 45-60%, and Fats 15-25%. Create a calorie surplus of 200-400 calories above TDEE. Higher carbs provide energy for intense training and support muscle glycogen. Moderate protein supports muscle protein synthesis. Don\'t neglect fats - they\'re crucial for testosterone production and overall health during bulking.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much protein do I need per day?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Protein needs depend on your goals: Sedentary adults need 0.4g per lb body weight. For general fitness, aim for 0.7-1.0g per lb. For muscle building, target 0.8-1.2g per lb. During cutting/fat loss, increase to 1.0-1.5g per lb to preserve muscle. Athletes and bodybuilders may need 1.2-2.0g per lb. Our calculator automatically determines optimal protein intake based on your weight, activity level, and fitness goal.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I eat the same macros every day?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Consistency is key, but you can adjust macros strategically: (1) Training days - eat more carbs for energy and recovery, (2) Rest days - slightly reduce carbs, maintain protein, (3) Weekly average matters more than daily perfection. Some people use "carb cycling" - higher carbs on workout days, lower on rest days. For beginners, eating the same macros daily simplifies tracking. Advanced athletes may benefit from strategic variation. Track weekly averages to ensure you\'re meeting targets.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is IIFYM (If It Fits Your Macros)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'IIFYM (If It Fits Your Macros), also called flexible dieting, is an approach where you track macronutrients rather than restricting specific foods. As long as you hit your daily protein, carbs, and fats targets, you can eat any foods you want. Benefits include: (1) Flexibility and sustainability, (2) No "forbidden" foods, (3) Easier social situations, (4) Reduced food stress. However, prioritize whole, nutrient-dense foods (80-90% of intake) for health, satiety, and performance. Use treats to fill remaining macros.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I track my macros accurately?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Track macros accurately by: (1) Use a food scale - weigh foods in grams for precision, (2) Use tracking apps like MyFitnessPal or Cronometer, (3) Track raw/uncooked weights for meat and grains (cooking changes weight), (4) Read nutrition labels carefully, (5) Account for cooking oils and condiments, (6) Pre-log meals to plan ahead, (7) Be consistent - track daily for 1-2 weeks before adjusting. Don\'t need to be perfect - 90% accuracy is sufficient. Track for 2-4 weeks, then adjust based on results.',
            },
          },
          {
            '@type': 'Question',
            name: 'How often should I recalculate my macros?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Recalculate macros when: (1) You lose or gain 5-10 lbs of body weight, (2) Your activity level changes significantly, (3) You\'re not seeing results after 3-4 weeks, (4) You switch goals (cutting to bulking or vice versa), (5) Every 8-12 weeks during a long diet. As you lose weight, your BMR and TDEE decrease, requiring macro adjustments. During muscle gain, you may need to increase calories every 4-6 weeks. Don\'t adjust too frequently - give each macro target at least 3-4 weeks before changing.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your Macros',
        description: 'Step-by-step guide to calculating optimal macronutrient ratios for your fitness goals',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Body Stats',
            text: 'Input your age, gender, weight, and height. Choose Imperial (lbs/inches) or Metric (kg/cm) units based on your preference.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Activity Level',
            text: 'Choose your activity level from Sedentary (little exercise) to Extra Active (hard exercise 2x/day). This multiplier is applied to your BMR to calculate TDEE.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose Your Goal',
            text: 'Select Cutting (fat loss), Maintenance (weight maintenance), or Bulking (muscle gain). This determines your calorie target and optimal macro ratios.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Meals Per Day',
            text: 'Specify how many meals you eat daily (typically 3-6). The calculator will distribute macros evenly across your meals for easy tracking.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate and Review',
            text: 'Click "Calculate Macros" to see your personalized protein, carbs, and fats targets. Review daily targets, per-meal breakdowns, and weekly/monthly totals.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Track and Adjust',
            text: 'Use a food tracking app to hit your macro targets daily. Monitor progress for 2-4 weeks, then adjust if needed based on results (weight change, energy, performance).',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Macro Calculator - Free Macronutrient Calculator for Protein, Carbs, and Fats
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Macro Calculator (Free, No signup)"
        calculatorUrl="/macro-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <MacroCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section
        className="py-12 bg-gradient-to-b from-gray-50 to-white"
        aria-label="Educational Content"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Macronutrients and Macro Counting
            </h2>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* What are Macros */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔬</span>
                  What are Macros?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Macronutrients</strong> (or "macros") are the three main nutrients your body needs in
                  large amounts: <strong className="text-red-600">protein</strong>, <strong className="text-yellow-600">carbohydrates</strong>,
                  and <strong className="text-orange-600">fats</strong>. Each plays a unique role:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>
                      <strong>Protein (4 cal/g):</strong> Builds and repairs muscle, supports immune
                      function, and helps with satiety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>
                      <strong>Carbohydrates (4 cal/g):</strong> Primary energy source for high-intensity
                      exercise and brain function
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span>
                      <strong>Fats (9 cal/g):</strong> Essential for hormone production, nutrient absorption,
                      and cellular health
                    </span>
                  </li>
                </ul>
              </div>

              {/* Why Track Macros */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  Why Track Macros?
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Tracking macros is more precise than just counting calories because it ensures you're
                  getting the right <strong>composition</strong> of nutrients, not just the right amount of energy.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      <strong>Better body composition:</strong> Higher protein preserves muscle during fat loss
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      <strong>Sustained energy:</strong> Balanced macros prevent crashes and maintain focus
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      <strong>Performance optimization:</strong> Carbs fuel workouts, protein aids recovery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span>
                      <strong>Flexible dieting:</strong> No food is off-limits if it fits your macros
                    </span>
                  </li>
                </ul>
              </div>

              {/* Macro Ratios by Goal */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚖️</span>
                  Macro Ratios by Goal
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded">
                    <h4 className="font-bold text-gray-900 mb-1">Cutting (Fat Loss)</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      High protein (40-50%), moderate carbs (25-35%), moderate fats (20-30%)
                    </p>
                    <p className="text-xs text-gray-600">
                      Protein: 1.0-1.2g/lb body weight | Calorie deficit: 300-500
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
                    <h4 className="font-bold text-gray-900 mb-1">Maintenance</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Balanced protein (30-35%), moderate carbs (40-45%), moderate fats (25-30%)
                    </p>
                    <p className="text-xs text-gray-600">
                      Protein: 0.8-1.0g/lb body weight | Calories = TDEE
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded">
                    <h4 className="font-bold text-gray-900 mb-1">Bulking (Muscle Gain)</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Moderate protein (25-35%), high carbs (45-55%), moderate fats (20-30%)
                    </p>
                    <p className="text-xs text-gray-600">
                      Protein: 0.8-1.0g/lb body weight | Calorie surplus: 200-400
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Use This Calculator */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📖</span>
                  How to Use This Calculator
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <span>
                      <strong>Enter your body stats:</strong> Age, gender, weight, and height. Choose
                      Imperial or Metric units.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <span>
                      <strong>Select activity level:</strong> From Sedentary to Extra Active based on your
                      weekly exercise.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    <span>
                      <strong>Choose your goal:</strong> Cutting, Maintenance, or Bulking - this determines
                      calorie target and macro ratios.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    <span>
                      <strong>Set meals per day:</strong> Typically 3-6 meals. The calculator distributes
                      macros evenly per meal.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      5
                    </span>
                    <span>
                      <strong>Track and adjust:</strong> Use apps like MyFitnessPal to track daily intake.
                      Adjust after 2-4 weeks if needed.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Macro Tracking Tips */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                💡 Expert Tips for Tracking Macros
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🎯</span>
                    Getting Started
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>
                        <strong>Invest in a food scale:</strong> Weigh foods in grams for accuracy (eyeballing
                        can be off by 20-50%)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>
                        <strong>Track everything:</strong> Including oils, sauces, and condiments - they add up!
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>
                        <strong>Weigh foods raw:</strong> Cooking changes weight but not calories. Track raw
                        meat and grains.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">•</span>
                      <span>
                        <strong>Pre-log meals:</strong> Plan ahead to ensure you hit targets before the day
                        ends
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>⚡</span>
                    Advanced Strategies
                  </h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>
                        <strong>80/20 rule:</strong> Eat 80% whole foods, use 20% for treats that fit your
                        macros
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>
                        <strong>Protein priority:</strong> Hit protein target daily, be flexible with carbs
                        and fats
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>
                        <strong>Weekly average matters:</strong> Don't stress over daily perfection - track
                        weekly totals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">•</span>
                      <span>
                        <strong>Adjust based on results:</strong> If not losing/gaining after 3-4 weeks,
                        adjust calories by 10-15%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Protein Sources Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                🍗 High-Protein Food Sources (per 100g)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold text-gray-900">Food</th>
                      <th className="px-4 py-2 text-left font-bold text-gray-900">Protein</th>
                      <th className="px-4 py-2 text-left font-bold text-gray-900">Carbs</th>
                      <th className="px-4 py-2 text-left font-bold text-gray-900">Fats</th>
                      <th className="px-4 py-2 text-left font-bold text-gray-900">Calories</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2 text-gray-700">Chicken Breast</td>
                      <td className="px-4 py-2 text-red-600 font-bold">31g</td>
                      <td className="px-4 py-2 text-gray-600">0g</td>
                      <td className="px-4 py-2 text-gray-600">3.6g</td>
                      <td className="px-4 py-2 text-gray-700">165</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">Greek Yogurt (non-fat)</td>
                      <td className="px-4 py-2 text-red-600 font-bold">10g</td>
                      <td className="px-4 py-2 text-gray-600">3.6g</td>
                      <td className="px-4 py-2 text-gray-600">0.4g</td>
                      <td className="px-4 py-2 text-gray-700">59</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-700">Eggs</td>
                      <td className="px-4 py-2 text-red-600 font-bold">13g</td>
                      <td className="px-4 py-2 text-gray-600">1.1g</td>
                      <td className="px-4 py-2 text-gray-600">11g</td>
                      <td className="px-4 py-2 text-gray-700">155</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">Salmon</td>
                      <td className="px-4 py-2 text-red-600 font-bold">20g</td>
                      <td className="px-4 py-2 text-gray-600">0g</td>
                      <td className="px-4 py-2 text-gray-600">13g</td>
                      <td className="px-4 py-2 text-gray-700">206</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-gray-700">Tofu (firm)</td>
                      <td className="px-4 py-2 text-red-600 font-bold">8g</td>
                      <td className="px-4 py-2 text-gray-600">2g</td>
                      <td className="px-4 py-2 text-gray-600">4.8g</td>
                      <td className="px-4 py-2 text-gray-700">76</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 text-gray-700">Lentils (cooked)</td>
                      <td className="px-4 py-2 text-red-600 font-bold">9g</td>
                      <td className="px-4 py-2 text-gray-600">20g</td>
                      <td className="px-4 py-2 text-gray-600">0.4g</td>
                      <td className="px-4 py-2 text-gray-700">116</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                💡 Tip: Combine protein sources throughout the day for complete amino acid profile
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {/* FAQ 1 */}
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What are macros and why do they matter?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      Macros (macronutrients) are protein, carbohydrates, and fats - the three main nutrients
                      your body needs in large amounts. They matter because: (1) <strong>Protein</strong>{' '}
                      builds and repairs muscle tissue, (2) <strong>Carbs</strong> provide energy for workouts
                      and daily activities, (3) <strong>Fats</strong> support hormone production and nutrient
                      absorption. Balancing your macros correctly helps you achieve specific fitness goals like
                      losing fat, building muscle, or maintaining weight while optimizing energy levels and
                      performance.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my macros for weight loss (cutting)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      For weight loss, calculate macros by: (1) Determine <strong>TDEE</strong> (Total Daily
                      Energy Expenditure), (2) Create a calorie deficit of 300-500 calories, (3) Set protein at
                      1.0-1.2g per lb of body weight (40-45% of calories), (4) Set fats at 20-30% of calories,
                      (5) Fill remaining calories with carbs (25-40%). Higher protein during cutting helps
                      preserve muscle mass. The calculator automatically determines optimal ratios based on your
                      body stats and activity level.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What are the best macro ratios for muscle gain (bulking)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      For muscle gain, optimal macro ratios are typically: <strong>Protein 25-35%</strong>{' '}
                      (0.8-1.0g per lb body weight), <strong>Carbs 45-60%</strong>, and{' '}
                      <strong>Fats 15-25%</strong>. Create a calorie surplus of 200-400 calories above TDEE.
                      Higher carbs provide energy for intense training and support muscle glycogen. Moderate
                      protein supports muscle protein synthesis. Don't neglect fats - they're crucial for
                      testosterone production and overall health during bulking.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much protein do I need per day?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      Protein needs depend on your goals: Sedentary adults need <strong>0.4g per lb</strong>{' '}
                      body weight. For general fitness, aim for <strong>0.7-1.0g per lb</strong>. For muscle
                      building, target <strong>0.8-1.2g per lb</strong>. During cutting/fat loss, increase to{' '}
                      <strong>1.0-1.5g per lb</strong> to preserve muscle. Athletes and bodybuilders may need
                      1.2-2.0g per lb. Our calculator automatically determines optimal protein intake based on
                      your weight, activity level, and fitness goal.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I eat the same macros every day?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      Consistency is key, but you can adjust macros strategically: (1){' '}
                      <strong>Training days</strong> - eat more carbs for energy and recovery, (2){' '}
                      <strong>Rest days</strong> - slightly reduce carbs, maintain protein, (3){' '}
                      <strong>Weekly average</strong> matters more than daily perfection. Some people use "carb
                      cycling" - higher carbs on workout days, lower on rest days. For beginners, eating the
                      same macros daily simplifies tracking. Advanced athletes may benefit from strategic
                      variation. Track weekly averages to ensure you're meeting targets.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is IIFYM (If It Fits Your Macros)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      <strong>IIFYM</strong> (If It Fits Your Macros), also called{' '}
                      <strong>flexible dieting</strong>, is an approach where you track macronutrients rather
                      than restricting specific foods. As long as you hit your daily protein, carbs, and fats
                      targets, you can eat any foods you want. Benefits include: (1) Flexibility and
                      sustainability, (2) No "forbidden" foods, (3) Easier social situations, (4) Reduced food
                      stress. However, prioritize whole, nutrient-dense foods (80-90% of intake) for health,
                      satiety, and performance. Use treats to fill remaining macros.
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I track my macros accurately?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      Track macros accurately by: (1) Use a <strong>food scale</strong> - weigh foods in grams
                      for precision, (2) Use tracking apps like <strong>MyFitnessPal</strong> or{' '}
                      <strong>Cronometer</strong>, (3) Track raw/uncooked weights for meat and grains (cooking
                      changes weight), (4) Read nutrition labels carefully, (5) Account for cooking oils and
                      condiments, (6) Pre-log meals to plan ahead, (7) Be consistent - track daily for 1-2
                      weeks before adjusting. Don't need to be perfect - 90% accuracy is sufficient. Track for
                      2-4 weeks, then adjust based on results.
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How often should I recalculate my macros?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700 leading-relaxed" itemProp="text">
                      Recalculate macros when: (1) You <strong>lose or gain 5-10 lbs</strong> of body weight,
                      (2) Your <strong>activity level</strong> changes significantly, (3) You're not seeing
                      results after 3-4 weeks, (4) You switch goals (cutting to bulking or vice versa), (5)
                      Every 8-12 weeks during a long diet. As you lose weight, your BMR and TDEE decrease,
                      requiring macro adjustments. During muscle gain, you may need to increase calories every
                      4-6 weeks. Don't adjust too frequently - give each macro target at least 3-4 weeks before
                      changing.
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
                <a
                  href="/calorie-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Calculate BMR and TDEE for your fitness goals
                  </p>
                </a>
                <a
                  href="/tdee-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">TDEE Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Total Daily Energy Expenditure calculation
                  </p>
                </a>
                <a
                  href="/bmi-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Body Mass Index and health analysis
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

