import { Metadata } from "next";
import Link from "next/link";
import CarbohydrateCalculator from "@/components/Calculator/CarbohydrateCalculator";
import {
  getUrl,
  getOgImage,
  getBreadcrumbId,
  getWebAppId,
  getFaqId,
  getHowToId,
  getArticleId,
  getStepUrl
} from '@/config/site';

export const metadata: Metadata = {
  title: "Carbohydrate Calculator - Daily Carb Intake & Meal Planning | AICalculator",
  description: "Free carbohydrate calculator for optimal carb intake. Calculate daily carb needs based on weight, activity, and goals. Get personalized meal distribution and GI recommendations for better energy and health.",
  keywords: [
    "carbohydrate calculator",
    "carb calculator",
    "daily carb intake calculator",
    "carb needs calculator",
    "low carb calculator",
    "keto carb calculator",
    "carb counter",
    "macros calculator carbs",
    "how many carbs per day",
    "carb intake calculator",
    "gi index calculator",
    "meal carb calculator",
    "carb distribution calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Carbohydrate Calculator - Daily Carb Needs",
    description: "Calculate your optimal daily carbohydrate intake with personalized meal distribution and GI recommendations. Perfect for weight loss, muscle gain, or maintenance.",
    type: "website",
    url: getUrl('/carbohydrate-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('carb'),
        width: 1200,
        height: 630,
        alt: 'Carbohydrate Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carbohydrate Calculator",
    description: "Calculate your daily carb needs with personalized recommendations.",
    images: [getOgImage('carb')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/carbohydrate-calculator'),
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

export default function CarbohydrateCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/carbohydrate-calculator'),
        "name": "Carbohydrate Calculator",
        "url": getUrl('/carbohydrate-calculator'),
        "description": "Calculate optimal daily carbohydrate intake based on weight, activity level, and fitness goals. Get personalized meal distribution and GI recommendations.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Daily carb needs calculation",
          "Meal distribution planning",
          "Workout timing recommendations",
          "GI index food suggestions",
          "Multiple diet types support",
          "Activity level adjustment",
          "Goal-based calculations"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/carbohydrate-calculator'),
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
            "name": "Health",
            "item": getUrl('/health')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Carbohydrate Calculator",
            "item": getUrl('/carbohydrate-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/carbohydrate-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many carbs should I eat per day?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Daily carbohydrate needs vary based on weight, activity level, and goals. For a balanced diet, aim for 45-65% of total calories from carbs. For a 2000-calorie diet, this equals 225-325g of carbs. Athletes may need more (5-7g per kg body weight), while low-carb dieters may consume 50-150g daily. Our calculator provides personalized recommendations based on your specific parameters."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between simple and complex carbs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simple carbs (sugars) are quickly digested and cause rapid blood sugar spikes. Examples include candy, soda, and white bread. Complex carbs (starches and fiber) digest slowly, providing sustained energy and stable blood sugar. Examples include oatmeal, brown rice, and vegetables. Complex carbs are generally healthier and should form the bulk of your carb intake."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Glycemic Index (GI)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Glycemic Index measures how quickly foods raise blood sugar levels. Low GI foods (55 or less) like oats and lentils digest slowly. Medium GI (56-69) includes brown rice and honey. High GI (70+) like white bread and candy spike blood sugar quickly. Choose low GI foods for sustained energy, better blood sugar control, and improved satiety."
            }
          },
          {
            "@type": "Question",
            "name": "Should I eat carbs before or after workout?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Both are beneficial! Pre-workout carbs (30-60 minutes before) provide energy for your workout. Post-workout carbs (within 2 hours) replenish glycogen stores and aid recovery. Pre-workout: 15-20% of daily carbs from easily digestible sources. Post-workout: 20-30% of daily carbs, ideally with protein for optimal recovery and muscle growth."
            }
          },
          {
            "@type": "Question",
            "name": "Are low-carb diets good for weight loss?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Low-carb diets can be effective for weight loss by reducing calorie intake and promoting fat burning. However, sustainability varies by individual. Benefits include reduced appetite and improved blood sugar control. Consider your activity level, personal preferences, and long-term sustainability. Very active individuals often perform better with moderate carb intake."
            }
          },
          {
            "@type": "Question",
            "name": "How do I distribute carbs throughout the day?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Optimal distribution: Breakfast 25%, Lunch 30%, Dinner 30%, Snacks 15% of daily carbs. For athletes, time more carbs around workouts. Morning carbs fuel your day, lunch maintains energy, dinner supports recovery, and snacks prevent energy dips. Adjust based on your schedule, workout timing, and hunger patterns."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/carbohydrate-calculator'),
        "name": "How to Calculate Your Daily Carb Needs",
        "description": "Step-by-step guide to determining optimal carbohydrate intake.",
        "totalTime": "PT5M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": {
          "@type": "HowToTool",
          "name": "Carbohydrate Calculator"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Weight",
            "text": "Input your current weight in kilograms or pounds. This is the base for calculating your needs.",
            "url": getStepUrl('/carbohydrate-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Activity Level",
            "text": "Choose from sedentary to very active based on your typical weekly exercise and daily movement.",
            "url": getStepUrl('/carbohydrate-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Choose Your Goal",
            "text": "Select weight loss, maintenance, or muscle gain. This adjusts your total calorie and carb targets.",
            "url": getStepUrl('/carbohydrate-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Pick Diet Type",
            "text": "Choose between keto (5%), low-carb (25%), balanced (50%), or high-carb (60%) approach.",
            "url": getStepUrl('/carbohydrate-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "View Your Results",
            "text": "See your daily carb target in grams, meal distribution, workout timing, and food recommendations with GI values.",
            "url": getStepUrl('/carbohydrate-calculator', 5)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/carbohydrate-calculator'),
        "headline": "Complete Guide to Carbohydrate Intake and Meal Planning",
        "description": "Learn how to calculate and optimize your daily carbohydrate intake for energy, performance, and health.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "url": getUrl('/')
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator.pro",
          "logo": {
            "@type": "ImageObject",
            "url": getUrl('/logo.png')
          }
        },
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "image": getOgImage('carb'),
        "articleBody": "Carbohydrates are essential macronutrients that provide energy for your body and brain. Understanding your optimal carb intake can improve athletic performance, support weight management goals, and enhance overall health."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">Carbohydrate Calculator - Calculate Daily Carb Intake & Meal Planning</h1>

      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/health" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Health</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Carbohydrate Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <CarbohydrateCalculator />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Carbohydrates</h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">What You Will Learn</h3>
            <ul className="space-y-2 text-blue-800">
              <li>✓ How to calculate your daily carb needs</li>
              <li>✓ Understanding simple vs complex carbohydrates</li>
              <li>✓ The Glycemic Index and blood sugar control</li>
              <li>✓ Optimal meal timing and distribution</li>
              <li>✓ Carb intake for different goals and diets</li>
              <li>✓ Best food sources for sustained energy</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4">
            Carbohydrates are one of three macronutrients (along with protein and fat) that provide energy for your body. They are your main fuel source, especially for your brain and during physical activity. Understanding how to calculate and optimize your carb intake can dramatically improve your energy levels, athletic performance, and help you reach your health and fitness goals.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of Carbohydrates</h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Simple Carbohydrates (Sugars)</h4>
          <p className="text-gray-700 mb-4">
            Simple carbs are quickly digested and absorbed, causing rapid spikes in blood sugar. While they provide quick energy, they can lead to energy crashes. Found in fruits, milk, candy, and refined sugars.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Complex Carbohydrates (Starches)</h4>
          <p className="text-gray-700 mb-4">
            Complex carbs take longer to digest, providing sustained energy and stable blood sugar levels. They are found in whole grains, legumes, and vegetables. These should form the majority of your carb intake for optimal health.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Glycemic Index (GI)</h3>
          
          <p className="text-gray-700 mb-4">
            The GI measures how quickly foods raise blood sugar levels on a scale of 0-100. Lower GI foods are generally healthier as they provide more stable energy and better satiety.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="pb-2 font-semibold">GI Range</th>
                  <th className="pb-2 font-semibold">Classification</th>
                  <th className="pb-2 font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200">
                  <td className="py-2">55 or less</td>
                  <td className="py-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded">Low</span></td>
                  <td className="py-2">Oats, lentils, most fruits</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">56-69</td>
                  <td className="py-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Medium</span></td>
                  <td className="py-2">Brown rice, whole wheat, bananas</td>
                </tr>
                <tr>
                  <td className="py-2">70+</td>
                  <td className="py-2"><span className="px-2 py-1 bg-red-100 text-red-800 rounded">High</span></td>
                  <td className="py-2">White bread, white rice, candy</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Carb Needs by Goal</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">Weight Loss</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>25-40% of calories</strong> from carbs
              </p>
              <p className="text-sm text-gray-700">
                Lower carb intake creates calorie deficit while maintaining energy for workouts. Focus on low-GI, high-fiber carbs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">Maintenance</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>45-55% of calories</strong> from carbs
              </p>
              <p className="text-sm text-gray-700">
                Balanced approach provides steady energy. Mix of complex and simple carbs around activity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-3">Muscle Gain</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>50-60% of calories</strong> from carbs
              </p>
              <p className="text-sm text-gray-700">
                Higher carbs fuel intense training and support recovery. Time carbs around workouts for best results.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Meal Timing & Distribution</h3>
          
          <p className="text-gray-700 mb-4">
            How you distribute carbs throughout the day matters as much as total intake:
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li><strong>Breakfast (25%):</strong> Fuels your morning and jumpstarts metabolism</li>
            <li><strong>Lunch (30%):</strong> Maintains energy through afternoon activities</li>
            <li><strong>Dinner (30%):</strong> Supports evening recovery and next-day preparation</li>
            <li><strong>Snacks (15%):</strong> Prevents energy dips between meals</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Carb Sources</h3>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-900 mb-3">Top Complex Carb Sources:</h4>
            <ul className="space-y-2 text-blue-800">
              <li>• <strong>Oatmeal:</strong> High fiber, low GI (55), great for breakfast</li>
              <li>• <strong>Quinoa:</strong> Complete protein, low GI (53), versatile grain</li>
              <li>• <strong>Sweet Potato:</strong> Nutrient-dense, moderate GI (63)</li>
              <li>• <strong>Brown Rice:</strong> Whole grain, moderate GI (68)</li>
              <li>• <strong>Lentils:</strong> High fiber and protein, very low GI (32)</li>
              <li>• <strong>Whole Wheat Pasta:</strong> Slow-digesting, moderate GI (42)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">How many carbs should I eat per day?</h3>
            <p className="text-gray-700">
              Daily carb needs vary by individual. For a balanced diet, aim for 45-65% of calories from carbs (225-325g on a 2000-calorie diet). Athletes may need 5-7g per kg body weight. Use our calculator for personalized recommendations based on your weight, activity, and goals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What is the difference between simple and complex carbs?</h3>
            <p className="text-gray-700">
              Simple carbs digest quickly and spike blood sugar (candy, soda, white bread). Complex carbs digest slowly, providing sustained energy (oats, brown rice, vegetables). Complex carbs are healthier and should form the bulk of your intake.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Should I eat carbs before or after workout?</h3>
            <p className="text-gray-700">
              Both! Pre-workout carbs (30-60 min before) fuel your training. Post-workout carbs (within 2 hours) replenish glycogen and aid recovery. Aim for 15-20% pre and 20-30% post-workout from your daily carbs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Are low-carb diets good for weight loss?</h3>
            <p className="text-gray-700">
              Low-carb diets can be effective for weight loss by reducing calories and promoting fat burning. However, sustainability varies. Consider your activity level and preferences. Very active individuals often perform better with moderate carb intake.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Health Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/bmi-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Check your body mass index</p>
          </Link>

          <Link
            href="/calorie-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-semibold text-gray-900">Calorie Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate daily calorie needs</p>
          </Link>

          <Link
            href="/protein-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💪</div>
            <h3 className="font-semibold text-gray-900">Protein Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Optimal protein intake</p>
          </Link>

          <Link
            href="/macro-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Macro Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Complete macros breakdown</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

