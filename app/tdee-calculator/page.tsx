import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import { TDEECalculator } from '@/components/Calculator/TDEECalculator';

export const metadata: Metadata = {
  title: 'TDEE Calculator (Free, No signup) - Daily Calories | AICalculator',
  description: 'Free TDEE calculator with no sign-up required. Calculate your TDEE (Total Daily Energy Expenditure) with our accurate calculator. Get personalized calorie goals for cutting, bulking, and maintenance. Includes BMR, macro calculator, and activity levels.',
  keywords: 'TDEE calculator, free TDEE calculator, TDEE calculator no signup, total daily energy expenditure, TDEE, calorie calculator, BMR calculator, cutting calories, bulking calories, macro calculator, weight loss calculator, fitness calculator, metabolism calculator',
  openGraph: {
    title: 'TDEE Calculator (Free, No signup) - AICalculator',
    description: 'Free TDEE calculator with no sign-up required. Accurate TDEE Calculator with BMR, activity levels, and personalized calorie goals. Perfect for cutting, bulking, or maintaining weight.',
    type: 'website',
    url: 'https://aicalculator.io/tdee-calculator',
    siteName: 'AI Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Calculator (Free, No signup) - AICalculator',
    description: 'Free TDEE calculator with no sign-up required. BMR, macros, and personalized goals for cutting, bulking, and maintenance.',
  },
  alternates: {
    canonical: 'https://aicalculator.io/tdee-calculator',
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

export default function TDEECalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'TDEE Calculator',
        description: 'Calculate your Total Daily Energy Expenditure (TDEE) with our accurate calculator. Get personalized calorie goals for cutting, bulking, and maintenance based on your BMR and activity level.',
        url: 'https://aicalculator.io/tdee-calculator',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'TDEE calculation with activity levels',
          'BMR calculation (Mifflin-St Jeor and Harris-Benedict)',
          'Cutting/Bulking/Maintenance calorie goals',
          'Macro nutrient breakdown',
          'Weight goal timelines',
          'Imperial and metric units',
          'Results sharing and export',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aicalculator.io',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Health & Fitness Calculators',
            item: 'https://aicalculator.io/health-fitness',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'TDEE Calculator',
            item: 'https://aicalculator.io/tdee-calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is TDEE and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including BMR (calories at rest) plus calories from physical activity. It\'s crucial for weight management - eat more than your TDEE to gain weight, less to lose weight, or match it to maintain. Knowing your TDEE allows you to set accurate calorie goals for any fitness objective.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is TDEE different from BMR?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BMR (Basal Metabolic Rate) is the calories you burn at complete rest - just staying alive (breathing, heart beating, cell production). TDEE is your BMR multiplied by an activity factor (1.2-1.9) to account for your daily movement and exercise. Example: If your BMR is 1,500 cal and you\'re moderately active (1.55x), your TDEE would be 2,325 cal/day.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which activity level should I choose?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Be honest about your actual activity: Sedentary (1.2x) = desk job, no exercise. Lightly Active (1.375x) = light exercise 1-3 days/week. Moderately Active (1.55x) = moderate exercise 3-5 days/week. Very Active (1.725x) = hard exercise 6-7 days/week. Extra Active (1.9x) = very hard exercise + physical job. Most people overestimate - when in doubt, choose the lower level and adjust based on results.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many calories should I cut to lose weight?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A safe deficit is 15-25% below your TDEE, typically 300-500 calories. This leads to 0.5-1 lb per week of fat loss, which is sustainable and preserves muscle. Avoid cutting more than 500 cal below TDEE (unless supervised by a professional), as this can slow metabolism, cause muscle loss, and make the diet unsustainable. Slow and steady wins the race!',
            },
          },
          {
            '@type': 'Question',
            name: 'How many calories do I need to gain muscle?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For lean muscle gains, eat 10-15% above your TDEE (200-300 cal surplus). This provides energy for muscle growth without excessive fat gain. Pair this with progressive resistance training and adequate protein (1.0-1.1g per lb of body weight). Trying to gain too fast (500+ cal surplus) typically just adds fat, not muscle. Aim for 0.5-1 lb per week of gain.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the TDEE calculator accurate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TDEE calculators provide estimates within ±10-15% for most people. Accuracy depends on honest activity level selection and accurate input data. Factors like genetics, muscle mass, hormones, and previous dieting can affect your actual TDEE. Use the calculator as a starting point, then track your weight for 2 weeks and adjust calories by 100-200 if needed.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I eat the same calories every day?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can eat the same daily amount, or use "calorie cycling" - eating more on training days and less on rest days, while keeping the weekly total the same. Both approaches work. What matters most is consistency and hitting your weekly calorie target. Some people find calorie cycling helps with performance and adherence, while others prefer the simplicity of same-daily calories.',
            },
          },
          {
            '@type': 'Question',
            name: 'How often should I recalculate my TDEE?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Recalculate every 10-15 lbs of weight change, or if your activity level changes significantly. As you lose weight, your TDEE decreases (less body mass = fewer calories needed). As you gain muscle or become more active, your TDEE increases. Also recalculate if you plateau for 3+ weeks - this might indicate metabolic adaptation requiring a calorie adjustment.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Your TDEE',
        description: 'Step-by-step guide to calculating your Total Daily Energy Expenditure',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Information',
            text: 'Input your gender, age, height, and weight in either imperial or metric units.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Activity Level',
            text: 'Choose your activity level honestly - from sedentary (desk job, no exercise) to extra active (hard exercise daily + physical job).',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Review Your TDEE',
            text: 'Your TDEE is displayed as calories per day. This is your maintenance level - eat this amount to maintain current weight.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Choose Your Goal',
            text: 'View personalized calorie targets for cutting (fat loss), maintenance, or bulking (muscle gain) with recommended macros.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Track and Adjust',
            text: 'Follow your calorie goal for 2 weeks, track your weight, and adjust by 100-200 calories if not seeing expected results.',
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
        TDEE Calculator - Free Total Daily Energy Expenditure Calculator with BMR, Activity Levels, and Personalized Calorie Goals for Cutting, Bulking, and Maintenance
      </h1>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="TDEE Calculator (Free, No signup)"
        calculatorUrl="/tdee-calculator"
      />

        {/* Calculator */}
        <TDEECalculator />

        {/* Educational Content */}
        <article className="mt-16 max-w-4xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is TDEE and Why Should You Care?
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>TDEE (Total Daily Energy Expenditure)</strong> is the holy grail of nutrition planning. It represents 
              the <strong>total number of calories your body burns in a 24-hour period</strong>, accounting for everything from 
              breathing and digestion to your workouts and daily activities.
            </p>
            <p className="text-gray-700 mb-4">
              Understanding your TDEE is crucial because it's the foundation for any successful weight management strategy:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>For Weight Loss (Cutting):</strong> Eat 15-25% below your TDEE (typically 300-500 calories) to create a deficit</li>
              <li><strong>For Muscle Gain (Bulking):</strong> Eat 10-15% above your TDEE (typically 200-300 calories) to provide energy for growth</li>
              <li><strong>For Maintenance:</strong> Eat at your TDEE to maintain your current weight</li>
            </ul>
            <p className="text-gray-700">
              Our TDEE Calculator uses scientifically validated formulas (Mifflin-St Jeor and Harris-Benedict) to calculate your BMR, 
              then multiplies it by your activity level to give you an accurate daily calorie target. Plus, we provide personalized 
              macro breakdowns and smart recommendations to help you reach your goals faster.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding the Components of TDEE
            </h2>
            <p className="text-gray-700 mb-4">
              Your TDEE is made up of four main components. Understanding these helps you see where your calories go:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. BMR (Basal Metabolic Rate) - 60-75% of TDEE</h3>
            <p className="text-gray-700 mb-4">
              This is the energy your body needs just to stay alive - breathing, circulating blood, producing cells, maintaining body temperature. 
              It's what you'd burn if you stayed in bed all day. BMR is influenced by age, gender, weight, height, and genetics.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Exercise Activity Thermogenesis (EAT) - 5-10% of TDEE</h3>
            <p className="text-gray-700 mb-4">
              The calories burned during structured exercise - gym workouts, running, sports. This is what most people focus on, but it's 
              actually a smaller portion of TDEE than many think. A 30-minute run might only burn 300 calories.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. NEAT (Non-Exercise Activity Thermogenesis) - 15-30% of TDEE</h3>
            <p className="text-gray-700 mb-4">
              All the movement that's not formal exercise - walking to your car, fidgeting, taking the stairs, doing housework. NEAT can 
              vary by up to 2,000 calories between two people with similar jobs! This is why some people stay lean eating more - they move more 
              throughout the day.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4. TEF (Thermic Effect of Food) - 10% of TDEE</h3>
            <p className="text-gray-700 mb-4">
              The energy required to digest, absorb, and process nutrients. Protein has the highest TEF (20-30% of calories consumed), 
              followed by carbs (5-10%), and fats (0-3%). This is one reason high-protein diets can be beneficial for fat loss.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Choose the Right Activity Level
            </h2>
            <p className="text-gray-700 mb-4">
              The <strong>most common mistake</strong> people make is overestimating their activity level. Be brutally honest - 
              it's better to start conservative and adjust up if needed. Here's how to choose:
            </p>

            <div className="bg-gray-50 border-l-4 border-orange-500 p-6 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">🛋️ Sedentary (1.2x) - Choose if you:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Have a desk job and don't exercise regularly</li>
                <li>Get fewer than 3,000-5,000 steps per day</li>
                <li>Spend most of your day sitting</li>
              </ul>
            </div>

            <div className="bg-gray-50 border-l-4 border-yellow-500 p-6 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">🚶 Lightly Active (1.375x) - Choose if you:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Exercise lightly 1-3 days per week (walking, light gym)</li>
                <li>Have a desk job but are somewhat active outside work</li>
                <li>Get 5,000-7,500 steps per day</li>
              </ul>
            </div>

            <div className="bg-gray-50 border-l-4 border-green-500 p-6 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">🏃 Moderately Active (1.55x) - Choose if you:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Exercise moderately 3-5 days per week</li>
                <li>Have a somewhat active job (teacher, nurse, retail)</li>
                <li>Get 7,500-10,000 steps per day</li>
              </ul>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">🏋️ Very Active (1.725x) - Choose if you:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Exercise intensely 6-7 days per week</li>
                <li>Are an athlete in training</li>
                <li>Get 10,000-12,500+ steps per day</li>
              </ul>
            </div>

            <div className="bg-gray-50 border-l-4 border-purple-500 p-6 mb-4">
              <h4 className="font-bold text-gray-900 mb-2">⚡ Extra Active (1.9x) - Choose if you:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Exercise intensely twice per day</li>
                <li>Have a very physical job (construction, professional athlete)</li>
                <li>Get 12,500+ steps per day consistently</li>
              </ul>
            </div>

            <p className="text-gray-700 mt-4">
              <strong>Pro Tip:</strong> If you're between two levels, choose the lower one. You can always increase calories 
              if you're not seeing results after 2 weeks. It's easier to add calories than deal with the frustration of not 
              losing weight because you overestimated.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Calorie Goals: Cutting, Maintenance, and Bulking
            </h2>
            
            <h3 className="text-xl font-semibold text-red-700 mb-3">🔴 Cutting (Fat Loss)</h3>
            <p className="text-gray-700 mb-4">
              <strong>Goal:</strong> Lose fat while preserving muscle mass
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Calorie Target:</strong> 15-25% below TDEE (typically 300-500 cal deficit)</li>
              <li><strong>Expected Rate:</strong> 0.5-1% of body weight per week (1-2 lbs for most people)</li>
              <li><strong>Macros:</strong> High protein (40%), moderate carbs (30%), moderate fats (30%)</li>
              <li><strong>Duration:</strong> 8-16 weeks, then take a 1-2 week diet break at maintenance</li>
              <li><strong>Training:</strong> Maintain strength training to preserve muscle, add cardio for extra deficit if needed</li>
            </ul>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
              <p className="text-gray-700 font-medium">
                ⚠️ <strong>Warning:</strong> Don't cut more than 500 calories below TDEE. Aggressive cuts can lead to muscle loss, 
                metabolic slowdown, hormonal issues, and extreme hunger that makes you binge. Slow and steady wins the race!
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-8">🔵 Maintenance</h3>
            <p className="text-gray-700 mb-4">
              <strong>Goal:</strong> Maintain current weight and body composition
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Calorie Target:</strong> Exactly at your TDEE</li>
              <li><strong>Macros:</strong> Balanced (30% protein, 40% carbs, 30% fats)</li>
              <li><strong>When to Use:</strong> After a cut or bulk, when happy with current physique, or for long-term sustainability</li>
              <li><strong>Benefits:</strong> Improves relationship with food, allows strength gains without weight change, sustainable long-term</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-3 mt-8">🟢 Bulking (Muscle Gain)</h3>
            <p className="text-gray-700 mb-4">
              <strong>Goal:</strong> Build muscle mass with minimal fat gain
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Calorie Target:</strong> 10-15% above TDEE (typically 200-300 cal surplus)</li>
              <li><strong>Expected Rate:</strong> 0.5-1 lb per week (0.25-0.5 lb per week for advanced lifters)</li>
              <li><strong>Macros:</strong> High carbs for energy (30% protein, 50% carbs, 20% fats)</li>
              <li><strong>Duration:</strong> 12-24 weeks, then mini-cut or return to maintenance</li>
              <li><strong>Training:</strong> Progressive overload with compound lifts, adequate rest between sessions</li>
            </ul>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
              <p className="text-gray-700 font-medium">
                💪 <strong>Lean Bulking Tip:</strong> Don't "dirty bulk" with huge surpluses (500+ calories). You can only build 
                muscle so fast - extra calories just become fat. A small surplus (200-300 cal) leads to lean gains you can keep!
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding Macronutrients
            </h2>
            <p className="text-gray-700 mb-4">
              While total calories determine weight change, <strong>macronutrient distribution</strong> affects body composition, 
              performance, and how you feel. Here's what each macro does:
            </p>

            <h3 className="text-xl font-semibold text-red-600 mb-3">🥩 Protein (4 calories per gram)</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Function:</strong> Builds and repairs muscle, supports immune function, regulates hormones</li>
              <li><strong>Target:</strong> 0.8-1.1g per lb of body weight (1.8-2.4g per kg)</li>
              <li><strong>Benefits:</strong> Highest satiety (keeps you full), high TEF (burns 20-30% of protein calories during digestion), preserves muscle in a deficit</li>
              <li><strong>Best Sources:</strong> Chicken, fish, lean beef, eggs, Greek yogurt, protein powder, tofu, lentils</li>
            </ul>

            <h3 className="text-xl font-semibold text-orange-600 mb-3">🍞 Carbohydrates (4 calories per gram)</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Function:</strong> Primary energy source, fuels workouts, replenishes glycogen stores</li>
              <li><strong>Target:</strong> Varies based on activity (higher for athletes, lower for sedentary)</li>
              <li><strong>Benefits:</strong> Essential for high-intensity exercise, improves workout performance, supports hormone health</li>
              <li><strong>Best Sources:</strong> Rice, oats, potatoes, fruits, whole grain bread, quinoa, vegetables</li>
            </ul>

            <h3 className="text-xl font-semibold text-yellow-600 mb-3">🥑 Fats (9 calories per gram)</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Function:</strong> Hormone production (especially testosterone, estrogen), vitamin absorption, cell membrane health</li>
              <li><strong>Target:</strong> 20-35% of total calories (minimum 0.3g per lb of body weight)</li>
              <li><strong>Benefits:</strong> Supports hormone health, provides sustained energy, enhances meal satisfaction</li>
              <li><strong>Best Sources:</strong> Olive oil, avocados, nuts, fatty fish (salmon), eggs, dark chocolate</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
              <p className="text-gray-700">
                <strong>Flexible Approach:</strong> While our calculator provides recommended macro splits, these are guidelines, 
                not rules. Some people perform better on higher carbs, others on higher fats. Experiment and find what makes you 
                feel and perform your best while hitting your calorie target.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Common TDEE Mistakes to Avoid
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Mistake 1: Overestimating Activity Level</h4>
                <p className="text-gray-700">
                  This is the #1 mistake. That 3x per week gym session doesn't make you "very active" if you sit the rest of the time. 
                  When in doubt, choose the lower activity level.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Mistake 2: Not Tracking Consistently</h4>
                <p className="text-gray-700">
                  You can't "eyeball" portions accurately. Studies show people underestimate calorie intake by 30-50%. Use a food scale 
                  and tracking app (MyFitnessPal, Cronometer) for at least 2-4 weeks to learn proper portions.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Mistake 3: Expecting Linear Progress</h4>
                <p className="text-gray-700">
                  Weight fluctuates daily due to water, sodium, carbs, stress, sleep, and hormones (women can see 5+ lb swings during 
                  menstrual cycle). Judge progress by weekly averages, not daily weigh-ins.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Mistake 4: Not Adjusting as You Lose Weight</h4>
                <p className="text-gray-700">
                  As you lose weight, your TDEE decreases (less body mass = less energy needed). Recalculate every 10-15 lbs of weight 
                  loss, or if you plateau for 3+ weeks.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Mistake 5: Forgetting About Liquid Calories</h4>
                <p className="text-gray-700">
                  That daily Starbucks latte (300 cal), orange juice (120 cal), and evening wine (150 cal) add 570 calories you probably 
                  forgot to count. Track everything that has calories!
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">❌ Mistake 6: Eating Back All Exercise Calories</h4>
                <p className="text-gray-700">
                  Your fitness tracker probably overestimates calories burned by 20-50%. If you're eating at your TDEE, don't eat back 
                  exercise calories - they're already factored into your activity multiplier.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              TDEE Calculation Formulas Explained
            </h2>
            <p className="text-gray-700 mb-4">
              Our calculator uses two scientifically validated BMR formulas, then multiplies by your activity factor to get TDEE:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Mifflin-St Jeor Equation (Recommended)</h3>
            <p className="text-gray-700 mb-2">
              Developed in 1990, this is considered the most accurate for the general population:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
              <p className="mb-2"><strong>Men:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5</p>
              <p><strong>Women:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Harris-Benedict Equation (Classic)</h3>
            <p className="text-gray-700 mb-2">
              The original BMR formula from 1919, revised in 1984. Still widely used:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 font-mono text-sm">
              <p className="mb-2"><strong>Men:</strong> BMR = 88.362 + (13.397 × weight(kg)) + (4.799 × height(cm)) - (5.677 × age)</p>
              <p><strong>Women:</strong> BMR = 447.593 + (9.247 × weight(kg)) + (3.098 × height(cm)) - (4.330 × age)</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Activity Multipliers</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="mb-1">• Sedentary (little or no exercise): <strong>BMR × 1.2</strong></p>
              <p className="mb-1">• Lightly Active (exercise 1-3 days/week): <strong>BMR × 1.375</strong></p>
              <p className="mb-1">• Moderately Active (exercise 3-5 days/week): <strong>BMR × 1.55</strong></p>
              <p className="mb-1">• Very Active (exercise 6-7 days/week): <strong>BMR × 1.725</strong></p>
              <p>• Extra Active (very hard exercise + physical job): <strong>BMR × 1.9</strong></p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Example Calculation</h3>
            <p className="text-gray-700 mb-2">
              Let's calculate TDEE for a 30-year-old male, 180 lbs (81.6 kg), 5'10" (178 cm), moderately active:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="mb-2"><strong>Step 1:</strong> Calculate BMR (Mifflin-St Jeor)</p>
              <p className="mb-2">BMR = 10 × 81.6 + 6.25 × 178 - 5 × 30 + 5</p>
              <p className="mb-2">BMR = 816 + 1,112.5 - 150 + 5 = <strong>1,783.5 calories</strong></p>
              <p className="mb-2 mt-4"><strong>Step 2:</strong> Multiply by activity factor</p>
              <p className="mb-2">TDEE = 1,783.5 × 1.55 (moderately active)</p>
              <p>TDEE = <strong>2,764 calories per day</strong></p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tracking Progress and Making Adjustments
            </h2>
            <p className="text-gray-700 mb-4">
              TDEE calculators provide estimates. Here's how to dial in your actual TDEE through real-world tracking:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 1-2: Baseline Period</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Eat at your calculated TDEE</li>
              <li>Weigh yourself daily (same time, same conditions - morning, after bathroom, before eating)</li>
              <li>Track all food accurately with a food scale</li>
              <li>Calculate your weekly average weight</li>
              <li>Be patient - water weight fluctuations can mask true trends in the first 2 weeks</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Week 3-4: Adjustment Period</h3>
            <p className="text-gray-700 mb-2">
              After 2 weeks, compare your average weights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Losing weight faster than expected?</strong> Increase calories by 100-200</li>
              <li><strong>Not losing weight (during a cut)?</strong> Decrease calories by 100-200</li>
              <li><strong>Gaining weight faster than expected (during bulk)?</strong> Decrease calories by 100-200</li>
              <li><strong>Not gaining weight (during bulk)?</strong> Increase calories by 100-200</li>
              <li><strong>Weight stable (during maintenance)?</strong> Perfect! This is your true TDEE</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Ongoing: Monthly Check-ins</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Recalculate TDEE every 10-15 lbs of weight change</li>
              <li>Take progress photos monthly (more useful than scale)</li>
              <li>Track body measurements (waist, chest, arms, thighs)</li>
              <li>Monitor gym performance - strength should maintain or increase</li>
              <li>Assess energy levels, mood, sleep quality, hunger</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-gray-700 font-medium">
                ⚡ <strong>Pro Tip:</strong> Don't make changes too quickly. Your body needs 2 weeks to adapt to a calorie change 
                before you see true results. Patience is key - trust the process!
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              TDEE for Special Populations
            </h2>

            <h3 className="text-xl font-semibold text-purple-700 mb-3">🏋️‍♀️ Athletes and Very Active Individuals</h3>
            <p className="text-gray-700 mb-2">
              Standard TDEE formulas may underestimate needs for serious athletes. Consider:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>Endurance athletes (marathoners, cyclists): May need TDEE × 1.3-1.5 on training days</li>
              <li>Strength athletes (powerlifters, bodybuilders): Focus on protein (1.2-1.4g per lb)</li>
              <li>Use the "Extra Active" multiplier as baseline, adjust based on results</li>
            </ul>

            <h3 className="text-xl font-semibold text-pink-700 mb-3 mt-6">👶 Pregnant and Breastfeeding Women</h3>
            <p className="text-gray-700 mb-2">
              Calorie needs increase significantly:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>Pregnancy (2nd trimester): Add 340 calories to TDEE</li>
              <li>Pregnancy (3rd trimester): Add 450 calories to TDEE</li>
              <li>Breastfeeding: Add 300-500 calories to TDEE</li>
              <li><strong>Important:</strong> Consult a doctor before using any calculator during pregnancy</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-6">👴 Older Adults (60+)</h3>
            <p className="text-gray-700 mb-2">
              Metabolism naturally slows with age due to muscle loss:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>TDEE may be 10-20% lower than predicted by formulas</li>
              <li>Prioritize protein (1.0-1.2g per lb) to preserve muscle mass</li>
              <li>Resistance training becomes even more important</li>
              <li>Be conservative with calorie deficits (max 300-400 cal)</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-3 mt-6">👦 Teenagers (13-19)</h3>
            <p className="text-gray-700 mb-2">
              Growing teens have higher calorie needs:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
              <li>Don't use aggressive deficits - growth requires energy</li>
              <li>Focus on nutrient-dense whole foods</li>
              <li>Add 200-400 calories to calculated TDEE during growth spurts</li>
              <li><strong>Important:</strong> Consult a pediatrician before any calorie restriction</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Related Calculators
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/bmr-calculator" className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-2">🔥 BMR Calculator</h3>
                <p className="text-sm text-gray-700">Calculate your Basal Metabolic Rate - the foundation of TDEE</p>
              </Link>
              <Link href="/calorie-calculator" className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-2">🍎 Calorie Calculator</h3>
                <p className="text-sm text-gray-700">Complete calorie planning with meal suggestions</p>
              </Link>
              <Link href="/bmi-calculator" className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-2">⚖️ BMI Calculator</h3>
                <p className="text-sm text-gray-700">Check your Body Mass Index and healthy weight range</p>
              </Link>
              <Link href="/body-fat-calculator" className="block p-4 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-2">💪 Body Fat Calculator</h3>
                <p className="text-sm text-gray-700">Estimate body fat percentage and lean body mass</p>
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: What is TDEE and why is it important?
                </h3>
                <p className="text-gray-700">
                  TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day, including BMR 
                  (calories at rest) plus calories from physical activity. It's crucial for weight management - eat more than your 
                  TDEE to gain weight, less to lose weight, or match it to maintain. Knowing your TDEE allows you to set accurate 
                  calorie goals for any fitness objective.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: How is TDEE different from BMR?
                </h3>
                <p className="text-gray-700">
                  BMR (Basal Metabolic Rate) is the calories you burn at complete rest - just staying alive (breathing, heart beating, 
                  cell production). TDEE is your BMR multiplied by an activity factor (1.2-1.9) to account for your daily movement and 
                  exercise. Example: If your BMR is 1,500 cal and you're moderately active (1.55x), your TDEE would be 2,325 cal/day.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: Which activity level should I choose?
                </h3>
                <p className="text-gray-700">
                  Be honest about your actual activity: Sedentary (1.2x) = desk job, no exercise. Lightly Active (1.375x) = light 
                  exercise 1-3 days/week. Moderately Active (1.55x) = moderate exercise 3-5 days/week. Very Active (1.725x) = hard 
                  exercise 6-7 days/week. Extra Active (1.9x) = very hard exercise + physical job. Most people overestimate - when 
                  in doubt, choose the lower level and adjust based on results.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: How many calories should I cut to lose weight?
                </h3>
                <p className="text-gray-700">
                  A safe deficit is 15-25% below your TDEE, typically 300-500 calories. This leads to 0.5-1 lb per week of fat loss, 
                  which is sustainable and preserves muscle. Avoid cutting more than 500 cal below TDEE (unless supervised by a 
                  professional), as this can slow metabolism, cause muscle loss, and make the diet unsustainable. Slow and steady 
                  wins the race!
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: How many calories do I need to gain muscle?
                </h3>
                <p className="text-gray-700">
                  For lean muscle gains, eat 10-15% above your TDEE (200-300 cal surplus). This provides energy for muscle growth 
                  without excessive fat gain. Pair this with progressive resistance training and adequate protein (1.0-1.1g per lb 
                  of body weight). Trying to gain too fast (500+ cal surplus) typically just adds fat, not muscle. Aim for 0.5-1 lb 
                  per week of gain.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: Is the TDEE calculator accurate?
                </h3>
                <p className="text-gray-700">
                  TDEE calculators provide estimates within ±10-15% for most people. Accuracy depends on honest activity level 
                  selection and accurate input data. Factors like genetics, muscle mass, hormones, and previous dieting can affect 
                  your actual TDEE. Use the calculator as a starting point, then track your weight for 2 weeks and adjust calories 
                  by 100-200 if needed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: Should I eat the same calories every day?
                </h3>
                <p className="text-gray-700">
                  You can eat the same daily amount, or use "calorie cycling" - eating more on training days and less on rest days, 
                  while keeping the weekly total the same. Both approaches work. What matters most is consistency and hitting your 
                  weekly calorie target. Some people find calorie cycling helps with performance and adherence, while others prefer 
                  the simplicity of same-daily calories.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: How often should I recalculate my TDEE?
                </h3>
                <p className="text-gray-700">
                  Recalculate every 10-15 lbs of weight change, or if your activity level changes significantly. As you lose weight, 
                  your TDEE decreases (less body mass = fewer calories needed). As you gain muscle or become more active, your TDEE 
                  increases. Also recalculate if you plateau for 3+ weeks - this might indicate metabolic adaptation requiring a 
                  calorie adjustment.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-gray-700 mb-4">
              Understanding your TDEE is the first step toward achieving your fitness goals. Whether you want to lose fat, build 
              muscle, or maintain your current physique, knowing your calorie needs takes the guesswork out of nutrition.
            </p>
            <p className="text-gray-700 mb-4">
              Remember: The calculator provides a starting point, but your actual TDEE is unique to you. Track your progress, adjust 
              as needed, and be patient with the process. Sustainable results take time, but they're worth it!
            </p>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <p className="text-gray-700 font-medium mb-2">
                📚 <strong>Next Steps:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Calculate your TDEE above</li>
                <li>Download a calorie tracking app (MyFitnessPal, Cronometer)</li>
                <li>Invest in a food scale ($15-20 on Amazon)</li>
                <li>Track consistently for 2 weeks</li>
                <li>Adjust based on results and keep going!</li>
              </ul>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

