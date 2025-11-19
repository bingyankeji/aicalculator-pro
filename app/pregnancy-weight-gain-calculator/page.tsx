import { Metadata } from "next";
import Link from "next/link";
import PregnancyWeightGainCalculator from "@/components/Calculator/PregnancyWeightGainCalculator";
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
  title: "Pregnancy Weight Gain (Free) - Healthy Gain | AICalculator",
  description: "Free pregnancy weight gain calculator with no sign-up required. Based on pre-pregnancy BMI. Track weekly weight gain, get personalized recommendations, and ensure a healthy pregnancy for you and your baby.",
  keywords: [
    "pregnancy weight gain calculator",
    "free pregnancy weight gain calculator",
    "pregnancy weight gain calculator no signup",
    "pregnancy weight calculator",
    "how much weight to gain during pregnancy",
    "pregnancy bmi calculator",
    "healthy pregnancy weight gain",
    "twins pregnancy weight gain",
    "pregnancy weight tracker",
    "trimester weight gain",
    "weekly pregnancy weight gain"
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: "Pregnancy Weight Gain (Free) - AICalculator",
    description: "Free pregnancy weight gain calculator with no sign-up required. Track your pregnancy weight gain with personalized recommendations based on your BMI. Ensure a healthy pregnancy journey.",
    type: "website",
    url: getUrl('/pregnancy-weight-gain-calculator'),
    siteName: "AICalculator",
    locale: 'en_US',
    images: [
      {
        url: getOgImage('pregnancy'),
        width: 1200,
        height: 630,
        alt: 'Pregnancy Weight Gain Calculator',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregnancy Weight Gain (Free) - AICalculator",
    description: "Free pregnancy weight gain calculator with no sign-up required. Track pregnancy weight gain with personalized recommendations.",
    images: [getOgImage('pregnancy')],
    site: "@AICalculator",
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/pregnancy-weight-gain-calculator'),
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

export default function PregnancyWeightGainCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": getWebAppId('/pregnancy-weight-gain-calculator'),
        "name": "Pregnancy Weight Gain Calculator",
        "url": getUrl('/pregnancy-weight-gain-calculator'),
        "description": "Calculate healthy pregnancy weight gain based on pre-pregnancy BMI, track weekly progress, and get personalized nutrition and exercise recommendations for each trimester.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "BMI-based weight gain recommendations",
          "Weekly weight tracking",
          "Trimester-specific guidance",
          "Twin pregnancy support",
          "Weight progression chart",
          "Milestone tracking",
          "Nutrition recommendations",
          "Exercise guidelines"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": getBreadcrumbId('/pregnancy-weight-gain-calculator'),
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
            "name": "Pregnancy Weight Gain Calculator",
            "item": getUrl('/pregnancy-weight-gain-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": getFaqId('/pregnancy-weight-gain-calculator'),
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much weight should I gain during pregnancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Recommended weight gain depends on your pre-pregnancy BMI. Underweight (BMI less than 18.5): 12.5-18 kg (28-40 lbs). Normal weight (BMI 18.5-24.9): 11.5-16 kg (25-35 lbs). Overweight (BMI 25-29.9): 7-11.5 kg (15-25 lbs). Obese (BMI 30 or more): 5-9 kg (11-20 lbs). Twin pregnancies require 17-25 kg gain for normal BMI."
            }
          },
          {
            "@type": "Question",
            "name": "What if I am gaining too much or too little weight?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gaining too much weight increases risks of gestational diabetes, high blood pressure, and delivery complications. Gaining too little may affect fetal growth and development. Consult your healthcare provider immediately if you are outside the recommended range. They can provide personalized guidance, nutritional counseling, and monitor your babys growth."
            }
          },
          {
            "@type": "Question",
            "name": "When should most weight gain occur during pregnancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First trimester (weeks 1-13): Minimal gain, typically 0.5-2 kg (1-5 lbs) total. Second trimester (weeks 14-27): Steady gain of approximately 0.5 kg (1 lb) per week. Third trimester (weeks 28-40): Continue 0.5 kg per week gain. Most weight gain occurs in the second and third trimesters when the baby grows rapidly."
            }
          },
          {
            "@type": "Question",
            "name": "Is it safe to exercise during pregnancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, moderate exercise is generally safe and beneficial during pregnancy if approved by your doctor. Aim for 30 minutes of moderate activity most days. Safe activities include walking, swimming, prenatal yoga, and stationary cycling. Avoid contact sports, activities with fall risk, and lying flat on your back after 20 weeks. Stop exercising if you experience pain, contractions, or bleeding."
            }
          },
          {
            "@type": "Question",
            "name": "How many extra calories do I need during pregnancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First trimester: No additional calories needed. Second trimester: Add approximately 300-350 calories per day. Third trimester: Add approximately 450-500 calories per day. Focus on nutrient-dense foods rather than empty calories. These extra calories should come from protein, healthy fats, complex carbohydrates, and essential vitamins and minerals."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": getHowToId('/pregnancy-weight-gain-calculator'),
        "name": "How to Track Pregnancy Weight Gain",
        "description": "Step-by-step guide to monitoring healthy weight gain during pregnancy.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Record Pre-Pregnancy Weight",
            "text": "Enter your weight before pregnancy and your height to calculate your pre-pregnancy BMI. This determines your recommended weight gain range.",
            "url": getStepUrl('/pregnancy-weight-gain-calculator', 1)
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Current Information",
            "text": "Input your current weight and pregnancy week (1-42). Specify if you are carrying twins as recommendations differ for multiple pregnancies.",
            "url": getStepUrl('/pregnancy-weight-gain-calculator', 2)
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Review Your Results",
            "text": "See your current weight gain compared to the healthy range for your pregnancy week. View whether you are below, within, or above recommended gain.",
            "url": getStepUrl('/pregnancy-weight-gain-calculator', 3)
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Track Progress Over Time",
            "text": "Use the weight progression chart to visualize your journey. Compare your actual weight against the recommended min-max range throughout pregnancy.",
            "url": getStepUrl('/pregnancy-weight-gain-calculator', 4)
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Follow Personalized Recommendations",
            "text": "Get trimester-specific nutrition and exercise guidance. Follow milestone targets and adjust your lifestyle based on your progress and doctors advice.",
            "url": getStepUrl('/pregnancy-weight-gain-calculator', 5)
          }
        ]
      },
      {
        "@type": "Article",
        "@id": getArticleId('/pregnancy-weight-gain-calculator'),
        "headline": "Understanding Healthy Pregnancy Weight Gain",
        "description": "Learn how to track and manage weight gain during pregnancy for optimal maternal and fetal health.",
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
        "image": getOgImage('pregnancy'),
        "articleBody": "Pregnancy weight gain is essential for a healthy baby and mother. The amount of weight you should gain depends on your pre-pregnancy BMI and whether you are carrying one baby or multiples. This calculator provides personalized recommendations based on Institute of Medicine guidelines."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h1 className="sr-only">
        Pregnancy Weight Gain Calculator - Track Healthy Weight Gain During Pregnancy
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
                Pregnancy Weight Gain Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <PregnancyWeightGainCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Pregnancy Weight Gain
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              Gaining the right amount of weight during pregnancy is crucial for your health and your babys development. 
              The recommended weight gain depends on your pre-pregnancy Body Mass Index (BMI) and whether you are carrying 
              one baby or multiples. The Institute of Medicine provides evidence-based guidelines to help expectant mothers 
              maintain a healthy pregnancy.
            </p>
            <p className="text-gray-700 mb-4">
              Weight gain during pregnancy supports fetal growth, increases blood volume, builds maternal fat stores for 
              breastfeeding, and prepares the body for delivery. Inadequate weight gain can lead to low birth weight and 
              preterm birth, while excessive gain increases risks of gestational diabetes, high blood pressure, and delivery 
              complications.
            </p>
          </div>
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Weight Gain Guidelines by BMI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Underweight (BMI less than 18.5)
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Single Baby:</strong> 12.5-18 kg (28-40 lbs)<br />
                <strong>Twins:</strong> 17-25 kg (37-54 lbs)
              </p>
              <p className="text-sm text-gray-600">
                Underweight women need more weight gain to support pregnancy and reduce risks of preterm birth.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Normal Weight (BMI 18.5-24.9)
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Single Baby:</strong> 11.5-16 kg (25-35 lbs)<br />
                <strong>Twins:</strong> 17-25 kg (37-54 lbs)
              </p>
              <p className="text-sm text-gray-600">
                Healthy BMI range allows for optimal fetal growth with moderate weight gain.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Overweight (BMI 25-29.9)
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Single Baby:</strong> 7-11.5 kg (15-25 lbs)<br />
                <strong>Twins:</strong> 14-23 kg (31-50 lbs)
              </p>
              <p className="text-sm text-gray-600">
                Lower gain reduces risks of gestational diabetes and high blood pressure.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Obese (BMI 30 or more)
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Single Baby:</strong> 5-9 kg (11-20 lbs)<br />
                <strong>Twins:</strong> 11-19 kg (25-42 lbs)
              </p>
              <p className="text-sm text-gray-600">
                Minimal gain helps prevent complications while supporting baby growth.
              </p>
            </div>
          </div>
        </article>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How much weight should I gain during pregnancy?
              </h3>
              <p className="text-gray-700">
                Recommended weight gain depends on your pre-pregnancy BMI. Underweight (BMI less than 18.5): 12.5-18 kg (28-40 lbs). 
                Normal weight (BMI 18.5-24.9): 11.5-16 kg (25-35 lbs). Overweight (BMI 25-29.9): 7-11.5 kg (15-25 lbs). 
                Obese (BMI 30 or more): 5-9 kg (11-20 lbs). Twin pregnancies require 17-25 kg gain for normal BMI.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I am gaining too much or too little weight?
              </h3>
              <p className="text-gray-700">
                Gaining too much weight increases risks of gestational diabetes, high blood pressure, and delivery complications. 
                Gaining too little may affect fetal growth and development. Consult your healthcare provider immediately if you 
                are outside the recommended range. They can provide personalized guidance, nutritional counseling, and monitor 
                your babys growth.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When should most weight gain occur during pregnancy?
              </h3>
              <p className="text-gray-700">
                First trimester (weeks 1-13): Minimal gain, typically 0.5-2 kg (1-5 lbs) total. Second trimester (weeks 14-27): 
                Steady gain of approximately 0.5 kg (1 lb) per week. Third trimester (weeks 28-40): Continue 0.5 kg per week gain. 
                Most weight gain occurs in the second and third trimesters when the baby grows rapidly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is it safe to exercise during pregnancy?
              </h3>
              <p className="text-gray-700">
                Yes, moderate exercise is generally safe and beneficial during pregnancy if approved by your doctor. Aim for 
                30 minutes of moderate activity most days. Safe activities include walking, swimming, prenatal yoga, and stationary 
                cycling. Avoid contact sports, activities with fall risk, and lying flat on your back after 20 weeks. Stop exercising 
                if you experience pain, contractions, or bleeding.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How many extra calories do I need during pregnancy?
              </h3>
              <p className="text-gray-700">
                First trimester: No additional calories needed. Second trimester: Add approximately 300-350 calories per day. 
                Third trimester: Add approximately 450-500 calories per day. Focus on nutrient-dense foods rather than empty 
                calories. These extra calories should come from protein, healthy fats, complex carbohydrates, and essential 
                vitamins and minerals.
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
            href="/bmi-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              BMI Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Calculate your Body Mass Index
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
              Calculate your Basal Metabolic Rate
            </p>
          </Link>

          <Link
            href="/carbohydrate-calculator"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-3">🍞</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carbohydrate Calculator
            </h3>
            <p className="text-gray-600 text-sm">
              Calculate your daily carb needs
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}

