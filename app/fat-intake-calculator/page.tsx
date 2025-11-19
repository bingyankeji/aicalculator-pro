import { Metadata } from "next";
import Link from "next/link";
import FatIntakeCalculator from "@/components/Calculator/FatIntakeCalculator";
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
  title: "Fat Intake Calculator (Free, No signup) - Daily Fats | AICalculator",
  description: "Free fat intake calculator with no sign-up required. For optimal fat consumption. Calculate daily fat needs, omega-3 to omega-6 ratio, and get personalized recommendations for heart and brain health.",
  keywords: [
    "fat intake calculator",
    "free fat intake calculator",
    "fat intake calculator no signup",
    "fat calculator",
    "daily fat intake calculator",
    "healthy fats calculator",
    "omega 3 calculator",
    "fat needs calculator",
    "macros calculator fat",
    "saturated fat calculator",
    "unsaturated fat calculator",
    "omega 3 6 ratio calculator"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Fat Intake Calculator (Free, No signup) - AICalculator",
    description: "Free fat intake calculator with no sign-up required. Calculate your optimal daily fat intake with personalized omega-3 and omega-6 recommendations. Perfect for heart health, brain function, and overall wellness.",
    type: "website",
    url: getUrl('/fat-intake-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('fat'),
        width: 1200,
        height: 630,
        alt: 'Fat Intake Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fat Intake Calculator (Free, No signup) - AICalculator",
    description: "Free fat intake calculator with no sign-up required. Calculate your daily fat needs with personalized recommendations.",
    images: [getOgImage('fat')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/fat-intake-calculator'),
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

export default function FatIntakeCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/fat-intake-calculator'),
        "name": "Fat Intake Calculator",
        "url": getUrl('/fat-intake-calculator'),
        "description": "Calculate optimal daily fat intake based on weight, activity level, and health goals. Get personalized omega-3 omega-6 ratio recommendations.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Daily fat needs calculation",
          "Fat type distribution (saturated, monounsaturated, polyunsaturated)",
          "Omega-3 and omega-6 recommendations",
          "Omega-3 to omega-6 ratio analysis",
          "Health score assessment",
          "Diet type optimization (low fat, balanced, mediterranean, keto)",
          "Food recommendations by fat type",
          "Visual fat distribution charts"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/fat-intake-calculator'),
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
            "name": "Health Calculators",
            "item": getUrl('/category/health')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Fat Intake Calculator",
            "item": getUrl('/fat-intake-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/fat-intake-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much fat should I eat per day?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fat intake depends on your total calorie needs and diet type. Generally, 20-35% of daily calories should come from fats for a balanced diet. For a 2000 calorie diet, this equals 44-78g of fat per day. Specific amounts vary based on your weight, activity level, and health goals."
            }
          },
          {
            "@type": "Question",
            "name": "What is the ideal omega-3 to omega-6 ratio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The ideal omega-3 to omega-6 ratio is between 1:1 and 1:4. Modern Western diets often have ratios of 1:15 or higher, which may promote inflammation. Increasing omega-3 intake from fatty fish, flax seeds, and walnuts while reducing omega-6 from vegetable oils can help achieve a healthier balance."
            }
          },
          {
            "@type": "Question",
            "name": "What are healthy sources of fats?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Healthy fat sources include avocados, fatty fish (salmon, mackerel, sardines), nuts (almonds, walnuts), seeds (chia, flax), olive oil, and natural nut butters. These provide monounsaturated and polyunsaturated fats, including essential omega-3 fatty acids. Limit saturated fats from red meat and dairy, and avoid trans fats from processed foods."
            }
          },
          {
            "@type": "Question",
            "name": "How does fat intake affect heart health?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fat type matters more than total amount for heart health. Monounsaturated and polyunsaturated fats (especially omega-3) can reduce bad cholesterol and inflammation, protecting your heart. Saturated fats should be limited to less than 10% of calories, and trans fats should be avoided completely as they increase heart disease risk."
            }
          },
          {
            "@type": "Question",
            "name": "Can I lose weight eating more fat?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can lose weight on a higher-fat diet if total calories are controlled. Diets like keto (70% fat) and Mediterranean (35% fat) can support weight loss. Fat provides satiety and helps control hunger. The key is maintaining a calorie deficit while choosing healthy fat sources and balancing with adequate protein and nutrients."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/fat-intake-calculator'),
        "name": "How to Calculate Your Daily Fat Intake",
        "description": "Step-by-step guide to determine your optimal daily fat needs based on your body and goals.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Basic Information",
            "text": "Input your age, gender, height, and weight. These factors determine your Basal Metabolic Rate (BMR) and daily energy needs.",
            "url": getStepUrl('/fat-intake-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Activity Level",
            "text": "Choose from sedentary to extra active based on your daily physical activity and exercise routine. This helps calculate Total Daily Energy Expenditure (TDEE).",
            "url": getStepUrl('/fat-intake-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Your Goal",
            "text": "Select lose weight, maintain weight, or gain weight. This adjusts your target calorie intake by plus or minus 500 calories per day.",
            "url": getStepUrl('/fat-intake-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Choose Diet Type",
            "text": "Select from low fat (20%), balanced (30%), Mediterranean (35%), or keto (70%) to determine what percentage of calories should come from fats.",
            "url": getStepUrl('/fat-intake-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review Your Results",
            "text": "Get your personalized fat intake in grams per day, broken down by fat type (saturated, monounsaturated, polyunsaturated, omega-3, omega-6) with health score and food recommendations.",
            "url": getStepUrl('/fat-intake-calculator', 5)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/fat-intake-calculator'),
        "headline": "Understanding Daily Fat Intake: A Complete Guide",
        "description": "Learn how to calculate and optimize your fat intake for better health, including omega-3 and omega-6 balance.",
        "author": {
          "@type": "Organization",
          "name": "AICalculator.pro"
        },
        "publisher": {
          "@type": "Organization",
          "name": "AICalculator.pro"
        },
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString()
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

      <h1 className="sr-only">
        Fat Intake Calculator - Calculate Your Daily Fat Needs and Omega-3 to Omega-6 Ratio for Optimal Health
      </h1>

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
                Fat Intake Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <FatIntakeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* What is Fat Intake */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is Fat Intake and Why Does It Matter?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Fat intake refers to the amount and types of dietary fats you consume daily. Despite past misconceptions, 
              fats are essential nutrients that play crucial roles in hormone production, brain function, vitamin absorption, 
              and cell membrane structure. The key is consuming the right types in optimal amounts.
            </p>
            <p className="text-gray-700 mb-4">
              Not all fats are created equal. Your fat intake should prioritize unsaturated fats (monounsaturated and 
              polyunsaturated) while limiting saturated fats and completely avoiding trans fats. The omega-3 to omega-6 
              ratio is particularly important for managing inflammation and supporting cardiovascular health.
            </p>
          </div>
        </article>

        {/* Types of Fats */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Understanding Different Types of Fats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Monounsaturated Fats (Healthy)
              </h3>
              <p className="text-gray-700 mb-2">
                Found in olive oil, avocados, and nuts. These fats can lower bad cholesterol (LDL) while maintaining 
                good cholesterol (HDL), reducing heart disease risk.
              </p>
              <p className="text-sm text-gray-600">
                Aim for 40-50% of total fat intake
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Polyunsaturated Fats (Essential)
              </h3>
              <p className="text-gray-700 mb-2">
                Includes omega-3 and omega-6 fatty acids found in fish, flax seeds, and walnuts. These are essential 
                fats your body cannot produce on its own.
              </p>
              <p className="text-sm text-gray-600">
                Aim for 25-30% of total fat intake
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Saturated Fats (Moderate)
              </h3>
              <p className="text-gray-700 mb-2">
                Found in red meat, butter, and coconut oil. While not as harmful as once thought, intake should still 
                be limited to less than 10% of daily calories.
              </p>
              <p className="text-sm text-gray-600">
                Limit to 20-30% of total fat intake
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Trans Fats (Avoid)
              </h3>
              <p className="text-gray-700 mb-2">
                Found in partially hydrogenated oils, fried foods, and processed snacks. Trans fats increase bad 
                cholesterol and decrease good cholesterol.
              </p>
              <p className="text-sm text-red-600">
                Avoid completely - 0g daily
              </p>
            </div>
          </div>
        </article>

        {/* Omega-3 vs Omega-6 */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            The Omega-3 to Omega-6 Ratio
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Both omega-3 and omega-6 are essential polyunsaturated fats, but their ratio matters significantly for health. 
              Omega-3 fatty acids are anti-inflammatory, while omega-6 can be pro-inflammatory when consumed in excess. 
              The ideal ratio is between 1:1 and 1:4, but modern Western diets often reach 1:15 or higher.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Omega-3 Benefits:</h3>
              <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
                <li>Reduces inflammation throughout the body</li>
                <li>Supports brain health and cognitive function</li>
                <li>Lowers triglycerides and blood pressure</li>
                <li>Reduces risk of heart disease and stroke</li>
                <li>May help prevent Alzheimer&#39;s and depression</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Omega-6 Considerations:</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li>Essential in moderate amounts for growth and development</li>
                <li>Excessive intake may promote inflammation</li>
                <li>Found abundantly in vegetable oils (soybean, corn, sunflower)</li>
                <li>Balance with omega-3 for optimal health</li>
              </ul>
            </div>
          </div>
        </article>

        {/* FAQs */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How much fat should I eat per day?
              </h3>
              <p className="text-gray-700">
                Fat intake depends on your total calorie needs and diet type. Generally, 20-35% of daily calories 
                should come from fats for a balanced diet. For a 2000 calorie diet, this equals 44-78g of fat per day. 
                Specific amounts vary based on your weight, activity level, and health goals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the ideal omega-3 to omega-6 ratio?
              </h3>
              <p className="text-gray-700">
                The ideal omega-3 to omega-6 ratio is between 1:1 and 1:4. Modern Western diets often have ratios of 
                1:15 or higher, which may promote inflammation. Increasing omega-3 intake from fatty fish, flax seeds, 
                and walnuts while reducing omega-6 from vegetable oils can help achieve a healthier balance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are healthy sources of fats?
              </h3>
              <p className="text-gray-700">
                Healthy fat sources include avocados, fatty fish (salmon, mackerel, sardines), nuts (almonds, walnuts), 
                seeds (chia, flax), olive oil, and natural nut butters. These provide monounsaturated and polyunsaturated 
                fats, including essential omega-3 fatty acids. Limit saturated fats from red meat and dairy, and avoid 
                trans fats from processed foods.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does fat intake affect heart health?
              </h3>
              <p className="text-gray-700">
                Fat type matters more than total amount for heart health. Monounsaturated and polyunsaturated fats 
                (especially omega-3) can reduce bad cholesterol and inflammation, protecting your heart. Saturated 
                fats should be limited to less than 10% of calories, and trans fats should be avoided completely as 
                they increase heart disease risk.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I lose weight eating more fat?
              </h3>
              <p className="text-gray-700">
                Yes, you can lose weight on a higher-fat diet if total calories are controlled. Diets like keto (70% fat) 
                and Mediterranean (35% fat) can support weight loss. Fat provides satiety and helps control hunger. 
                The key is maintaining a calorie deficit while choosing healthy fat sources and balancing with adequate 
                protein and nutrients.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Related Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Related Health Calculators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/carbohydrate-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🍞</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carbohydrate Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Calculate your daily carb needs with meal distribution
            </p>
          </Link>

          <Link
            href="/bmr-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🔥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              BMR Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Calculate your Basal Metabolic Rate and daily calorie needs
            </p>
          </Link>

          <Link
            href="/calories-burned-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">💪</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Calories Burned Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Estimate calories burned during various activities
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

