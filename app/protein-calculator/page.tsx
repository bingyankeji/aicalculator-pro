import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import { ProteinCalculator } from '@/components/Calculator/ProteinCalculator';

export const metadata: Metadata = {
  title: 'Protein Calculator (Free, No signup) - Daily Intake | AICalculator',
  description: 'Free protein calculator with no sign-up required. Calculate your daily protein needs based on weight, activity level, and fitness goals. Free protein calculator for cutting, maintenance, and bulking. Get personalized protein recommendations with meal planning tips.',
  keywords: [
    'protein calculator',
    'free protein calculator',
    'protein calculator no signup',
    'daily protein intake calculator',
    'protein requirement calculator',
    'how much protein per day',
    'protein for muscle gain',
    'protein for weight loss',
    'protein calculator cutting',
    'protein calculator bulking',
    'protein per kg body weight',
    'protein per meal',
    'protein needs calculator',
    'protein intake calculator',
    'protein requirement',
    'daily protein needs',
    'protein for athletes',
    'protein for bodybuilding',
  ],
  openGraph: {
    title: 'Protein Calculator (Free, No signup) - AICalculator',
    description: 'Free protein calculator with no sign-up required. Calculate your daily protein requirements based on weight, activity level, and fitness goals. Perfect for cutting, maintenance, and bulking phases.',
    type: 'website',
    url: 'https://aicalculator.pro/protein-calculator',
    siteName: 'AICalculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protein Calculator (Free, No signup) - AICalculator',
    description: 'Free protein calculator with no sign-up required. Calculate your daily protein needs for muscle gain, fat loss, or maintenance. Get personalized recommendations.',
    site: '@AICalculator',
  },
  alternates: {
    canonical: 'https://aicalculator.pro/protein-calculator',
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

export default function ProteinCalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Protein Calculator',
        url: 'https://aicalculator.pro/protein-calculator',
        description:
          'Free protein calculator to calculate daily protein needs based on weight, activity level, and fitness goals. Get personalized protein recommendations for cutting, maintenance, and bulking phases.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Daily protein requirement calculation',
          'Protein per kg/lb body weight',
          'Protein per meal distribution',
          'Weekly and monthly protein totals',
          'Protein sources breakdown (chicken, eggs, fish, etc.)',
          'Cutting, maintenance, and bulking goals',
          'Activity level adjustment',
          'Meal planning recommendations',
          'Share and export results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aicalculator.pro',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Health & Fitness',
            item: 'https://aicalculator.pro/health-fitness',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Protein Calculator',
            item: 'https://aicalculator.pro/protein-calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How much protein do I need per day?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Daily protein needs depend on your weight, activity level, and fitness goals. General guidelines: Cutting (fat loss): 2.2g per kg body weight (1.0g per lb), Maintenance: 2.0g per kg (0.9g per lb), Bulking (muscle gain): 1.8g per kg (0.8g per lb). Example: A 180 lb person cutting needs 180g protein/day. Athletes and very active individuals may need 2.2-2.5g per kg. Use our calculator for personalized recommendations based on your specific goals.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much protein per kg for muscle gain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For muscle gain (bulking), aim for 1.6-2.2g protein per kg body weight (0.7-1.0g per lb). Most research suggests 1.8g per kg (0.8g per lb) is optimal for muscle growth. Example: A 80kg person needs 144g protein/day for bulking. Higher protein (2.0-2.2g/kg) may be beneficial during calorie surplus for maximum muscle protein synthesis. Distribute protein evenly across 4-6 meals for optimal absorption.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much protein per day for weight loss?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For weight loss (cutting), aim for 2.2-2.5g protein per kg body weight (1.0-1.1g per lb) to preserve muscle mass during calorie deficit. Example: A 70kg person cutting needs 154-175g protein/day. Higher protein during cutting helps: preserve lean muscle mass, increase satiety (feeling full), boost metabolism (thermic effect of food), maintain strength during diet. Distribute protein across 4-6 meals, especially post-workout, for optimal muscle preservation.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much protein per meal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Aim for 20-40g protein per meal for optimal muscle protein synthesis. Research shows 20-25g high-quality protein per meal maximizes muscle building. Example: If you need 150g protein/day across 5 meals, aim for 30g per meal. Post-workout meals should contain 20-40g protein within 2 hours of exercise. Distribute protein evenly throughout the day rather than consuming most at one meal. Higher protein meals (40-50g) may be beneficial for larger individuals or athletes.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the best protein sources?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Best complete protein sources (contain all essential amino acids): Animal sources: Chicken breast (31g per 100g), Salmon (25g per 100g), Lean beef (26g per 100g), Eggs (13g per egg), Greek yogurt (10g per 100g), Cottage cheese (11g per 100g). Plant sources: Tofu (17g per 100g), Black beans (21g per 100g), Lentils (9g per 100g), Quinoa (4g per 100g), Chickpeas (19g per 100g). For muscle building, prioritize complete proteins. Combine plant proteins (rice + beans) for complete amino acid profile.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you eat too much protein?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For most healthy individuals, protein intake up to 2.5g per kg body weight (1.1g per lb) is safe. Very high protein (>3g/kg) may cause: digestive issues (bloating, constipation), kidney strain (if pre-existing kidney disease), dehydration (increased water needs), nutrient imbalance (if replacing carbs/fats). However, healthy kidneys can handle high protein. Athletes often consume 2.5-3g/kg without issues. Drink plenty of water with high protein diets. Consult a doctor if you have kidney disease before increasing protein.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I eat protein for muscle growth?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Timing protein intake: Post-workout (most important): 20-40g protein within 2 hours of exercise maximizes muscle protein synthesis. Pre-workout: 15-25g protein 1-2 hours before exercise can help prevent muscle breakdown. Throughout the day: Distribute protein evenly across 4-6 meals (every 3-4 hours) for sustained muscle protein synthesis. Before bed: 20-40g slow-digesting protein (casein) can support overnight muscle recovery. Research shows total daily protein matters more than exact timing, but post-workout protein is most critical.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much protein do women need?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Women need similar protein per kg body weight as men, but total amounts are lower due to typically smaller body size. Guidelines: Cutting: 2.2g per kg (1.0g per lb), Maintenance: 2.0g per kg (0.9g per lb), Bulking: 1.8g per kg (0.8g per lb). Example: A 60kg woman cutting needs 132g protein/day. Active women and athletes may need 2.0-2.5g per kg. Pregnant women need additional protein (1.1g per kg + 25g extra). Breastfeeding women need extra protein (1.1g per kg + 25g extra).',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your Daily Protein Needs',
        description: 'Step-by-step guide to calculating your daily protein requirements',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Information',
            text: 'Select your unit system (Imperial or Metric), enter your gender, age, weight, and height. These factors help determine your baseline protein needs.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Activity Level',
            text: 'Choose your activity level: Sedentary (little exercise), Light (1-3 days/week), Moderate (3-5 days/week), Active (6-7 days/week), or Very Active (intense daily exercise).',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Choose Your Goal',
            text: 'Select your fitness goal: Cutting (fat loss - 2.2g/kg), Maintenance (2.0g/kg), or Bulking (muscle gain - 1.8g/kg). Each goal has different protein requirements.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Set Meals Per Day',
            text: 'Choose how many meals you eat per day (3-6 meals). This helps calculate protein distribution per meal for optimal muscle protein synthesis.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Protein Needs',
            text: 'Click "Calculate Protein" to get your personalized daily protein requirement, protein per meal, weekly totals, and protein source recommendations.',
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
        Protein Calculator - Daily Protein Intake Calculator for Muscle Gain, Fat Loss, and Maintenance with Personalized Recommendations
      </h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Protein Calculator (Free, No signup)"
        calculatorUrl="/protein-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <ProteinCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section
        className="py-12 bg-gradient-to-b from-gray-50 to-white"
        aria-label="Educational Content"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Protein Requirements
            </h2>

            {/* What is Protein */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What is Protein and Why Do You Need It?</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Protein</strong> is one of the three macronutrients (along with carbohydrates and fats) essential
                for human health. It's made up of amino acids, which are the building blocks of muscle, skin, hair,
                nails, and many other tissues in your body.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Protein plays crucial roles in: building and repairing muscle tissue, supporting immune function,
                producing enzymes and hormones, maintaining healthy skin and hair, providing energy when carbs are
                limited, and promoting satiety (feeling full).
              </p>
            </div>

            {/* Protein Requirements by Goal */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Protein Requirements by Fitness Goal</h3>
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h4 className="font-bold text-gray-900 mb-2">Cutting (Fat Loss) - 2.2g per kg</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Higher protein intake during calorie deficit helps preserve muscle mass while losing fat.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Preserves lean muscle during calorie deficit</li>
                    <li>Increases satiety and reduces hunger</li>
                    <li>Boosts metabolism (thermic effect of food)</li>
                    <li>Example: 70kg person needs 154g protein/day</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2">Maintenance - 2.0g per kg</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Standard protein intake for maintaining current muscle mass and body composition.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Supports muscle maintenance and recovery</li>
                    <li>Optimal for general health and fitness</li>
                    <li>Balanced approach for active individuals</li>
                    <li>Example: 70kg person needs 140g protein/day</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">Bulking (Muscle Gain) - 1.8g per kg</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Moderate protein allows room for more carbohydrates and fats needed for muscle growth.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Supports muscle protein synthesis</li>
                    <li>Allows higher carb intake for energy</li>
                    <li>Sufficient for muscle growth in calorie surplus</li>
                    <li>Example: 70kg person needs 126g protein/day</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Protein Sources Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Protein Sources</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                        Food Source
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-900">
                        Protein (per 100g)
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-900">
                        Common Serving
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center font-semibold text-gray-900">
                        Protein per Serving
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🍗 Chicken Breast</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">31g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">200g (7oz)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">62g</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🐟 Salmon</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">25g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">150g (5oz)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">38g</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🥩 Lean Beef</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">26g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">150g (5oz)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">39g</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🥚 Eggs</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">13g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 large egg (50g)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">6.5g</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🧈 Firm Tofu</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">17g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">100g (3.5oz)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">17g</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🫘 Black Beans</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">21g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 cup (172g)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">36g</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🥛 Greek Yogurt</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">10g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 cup (200g)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">20g</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-semibold">🧀 Cottage Cheese</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">11g</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">1 cup (226g)</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">25g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Protein Timing */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Protein Timing for Optimal Results</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">Post-Workout (Most Important)</h4>
                  <p className="text-sm text-gray-700">
                    Consume 20-40g protein within 2 hours of exercise to maximize muscle protein synthesis and
                    recovery. This is the most critical time for protein intake.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">Throughout the Day</h4>
                  <p className="text-sm text-gray-700">
                    Distribute protein evenly across 4-6 meals (every 3-4 hours) for sustained muscle protein
                    synthesis. Aim for 20-40g per meal.
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <h4 className="font-bold text-gray-900 mb-2">Before Bed</h4>
                  <p className="text-sm text-gray-700">
                    Consuming 20-40g slow-digesting protein (casein) before bed can support overnight muscle recovery
                    and prevent muscle breakdown.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
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
                    <p className="text-gray-700" itemProp="text">
                      Daily protein needs depend on your weight, activity level, and fitness goals. General
                      guidelines: Cutting (fat loss): 2.2g per kg body weight (1.0g per lb), Maintenance: 2.0g per kg
                      (0.9g per lb), Bulking (muscle gain): 1.8g per kg (0.8g per lb). Example: A 180 lb person
                      cutting needs 180g protein/day. Athletes and very active individuals may need 2.2-2.5g per kg.
                      Use our calculator for personalized recommendations based on your specific goals.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much protein per kg for muscle gain?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For muscle gain (bulking), aim for 1.6-2.2g protein per kg body weight (0.7-1.0g per lb). Most
                      research suggests 1.8g per kg (0.8g per lb) is optimal for muscle growth. Example: A 80kg person
                      needs 144g protein/day for bulking. Higher protein (2.0-2.2g/kg) may be beneficial during calorie
                      surplus for maximum muscle protein synthesis. Distribute protein evenly across 4-6 meals for
                      optimal absorption.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much protein per day for weight loss?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For weight loss (cutting), aim for 2.2-2.5g protein per kg body weight (1.0-1.1g per lb) to
                      preserve muscle mass during calorie deficit. Example: A 70kg person cutting needs 154-175g
                      protein/day. Higher protein during cutting helps: preserve lean muscle mass, increase satiety
                      (feeling full), boost metabolism (thermic effect of food), maintain strength during diet.
                      Distribute protein across 4-6 meals, especially post-workout, for optimal muscle preservation.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much protein per meal?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Aim for 20-40g protein per meal for optimal muscle protein synthesis. Research shows 20-25g
                      high-quality protein per meal maximizes muscle building. Example: If you need 150g protein/day
                      across 5 meals, aim for 30g per meal. Post-workout meals should contain 20-40g protein within 2
                      hours of exercise. Distribute protein evenly throughout the day rather than consuming most at one
                      meal. Higher protein meals (40-50g) may be beneficial for larger individuals or athletes.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What are the best protein sources?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Best complete protein sources (contain all essential amino acids): Animal sources: Chicken
                      breast (31g per 100g), Salmon (25g per 100g), Lean beef (26g per 100g), Eggs (13g per egg), Greek
                      yogurt (10g per 100g), Cottage cheese (11g per 100g). Plant sources: Tofu (17g per 100g), Black
                      beans (21g per 100g), Lentils (9g per 100g), Quinoa (4g per 100g), Chickpeas (19g per 100g). For
                      muscle building, prioritize complete proteins. Combine plant proteins (rice + beans) for complete
                      amino acid profile.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can you eat too much protein?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For most healthy individuals, protein intake up to 2.5g per kg body weight (1.1g per lb) is safe.
                      Very high protein (&gt;3g/kg) may cause: digestive issues (bloating, constipation), kidney strain
                      (if pre-existing kidney disease), dehydration (increased water needs), nutrient imbalance (if
                      replacing carbs/fats). However, healthy kidneys can handle high protein. Athletes often consume
                      2.5-3g/kg without issues. Drink plenty of water with high protein diets. Consult a doctor if you
                      have kidney disease before increasing protein.
                    </p>
                  </div>
                </div>

                <div
                  className="border-b border-gray-200 pb-6"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    When should I eat protein for muscle growth?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Timing protein intake: Post-workout (most important): 20-40g protein within 2 hours of exercise
                      maximizes muscle protein synthesis. Pre-workout: 15-25g protein 1-2 hours before exercise can help
                      prevent muscle breakdown. Throughout the day: Distribute protein evenly across 4-6 meals (every
                      3-4 hours) for sustained muscle protein synthesis. Before bed: 20-40g slow-digesting protein
                      (casein) can support overnight muscle recovery. Research shows total daily protein matters more
                      than exact timing, but post-workout protein is most critical.
                    </p>
                  </div>
                </div>

                <div
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much protein do women need?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Women need similar protein per kg body weight as men, but total amounts are lower due to typically
                      smaller body size. Guidelines: Cutting: 2.2g per kg (1.0g per lb), Maintenance: 2.0g per kg (0.9g
                      per lb), Bulking: 1.8g per kg (0.8g per lb). Example: A 60kg woman cutting needs 132g protein/day.
                      Active women and athletes may need 2.0-2.5g per kg. Pregnant women need additional protein (1.1g
                      per kg + 25g extra). Breastfeeding women need extra protein (1.1g per kg + 25g extra).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/macro-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Macro Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate protein, carbs, and fats for your goals</p>
                </Link>
                <Link
                  href="/calorie-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate BMR, TDEE, and daily calorie needs</p>
                </Link>
                <Link
                  href="/bmi-calculator"
                  className="block p-4 bg-white rounded-lg border hover:shadow-md transition"
                >
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate your body mass index</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

