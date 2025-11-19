import type { Metadata } from 'next';
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import HeightCalculator from '@/components/Calculator/HeightCalculator';
import Link from 'next/link';
import { Ruler, TrendingUp, Users, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Height Calculator - Predict Child\'s Adult Height | Free Height Prediction Tool',
  description: 'Free height calculator to predict your child\'s adult height based on parents\' heights. Uses WHO growth charts and mid-parental height method. Get accurate height predictions with personalized growth tips.',
  keywords: [
    'height calculator',
    'child height predictor',
    'adult height calculator',
    'height prediction',
    'growth calculator',
    'parents height calculator',
    'mid-parental height',
    'height estimator',
    'future height',
    'how tall will my child be',
    'child growth calculator',
    'height percentile calculator',
    'WHO growth chart',
    'tanner formula',
    'genetic height',
    'height predictor tool',
    'predict height',
    'height forecast',
    'growth prediction',
    'child development calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Height Calculator - Predict Child\'s Future Height',
    description: 'Calculate your child\'s predicted adult height using parents\' heights. Free, accurate, and based on WHO growth standards.',
    type: 'website',
    url: getUrl('/height-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('height'),
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Height Calculator - Predict Child\'s Future Height',
    description: 'Calculate your child\'s predicted adult height using parents\' heights.',
    images: [getOgImage('height')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/height-calculator'),
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
};

export default function HeightCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getUrl('/height-calculator') + '#webapp',
        name: 'Height Calculator',
        url: getUrl('/height-calculator'),
        description: 'Free height calculator to predict child\'s adult height based on parents\' heights using WHO growth standards.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Child height prediction',
          'Mid-parental height method',
          'WHO growth charts',
          'Multiple unit systems (metric, imperial)',
          'Growth tips and recommendations',
          'Height range prediction',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getUrl('/height-calculator') + '#breadcrumb',
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
            name: 'Height Calculator',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getUrl('/height-calculator') + '#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How accurate is the height prediction?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The mid-parental height method typically predicts adult height within ±5-10 cm (2-4 inches). Actual height can vary based on nutrition, health, and environmental factors.',
            },
          },
          {
            '@type': 'Question',
            name: 'At what age can I predict my child\'s adult height?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The prediction can be made at any age, but it becomes more accurate after age 2. For very young infants, predictions based solely on parents\' heights are used.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the mid-parental height method?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The mid-parental height method calculates predicted adult height using parents\' heights. For boys: (Mother\'s height + Father\'s height + 13 cm) / 2. For girls: (Mother\'s height + Father\'s height - 13 cm) / 2.',
            },
          },
          {
            '@type': 'Question',
            name: 'What factors affect a child\'s height besides genetics?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Besides genetics (which accounts for about 60-80% of height), nutrition, sleep quality, physical activity, overall health, and hormonal factors significantly influence growth.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getUrl('/height-calculator') + '#howto',
        name: 'How to Predict Your Child\'s Height',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Calculator Mode',
            text: 'Choose between Full Calculator (with child\'s current measurements) or Parents Heights Only mode.',
            url: getUrl('/height-calculator') + '#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Parent Heights',
            text: 'Input mother\'s and father\'s heights in your preferred unit system (metric, US units, or meters).',
            url: getUrl('/height-calculator') + '#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Child Information (Optional)',
            text: 'If using full calculator, add child\'s age, gender, current height, and weight.',
            url: getUrl('/height-calculator') + '#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Get Prediction',
            text: 'Click Calculate to see predicted adult height with minimum and maximum range.',
            url: getUrl('/height-calculator') + '#step4',
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getUrl('/height-calculator') + '#article',
        headline: 'Understanding Child Height Prediction',
        description: 'Comprehensive guide to predicting your child\'s adult height using scientific methods.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString(),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Height Calculator - Predict Child's Adult Height Based on Parents' Heights
        </h1>

        {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Height Calculator"
        calculatorUrl="/height-calculator"
      />

        {/* Calculator Component */}
        <HeightCalculator />

        {/* Educational Content */}
        <article className="max-w-7xl mx-auto px-4 py-12">
          {/* Understanding Height Prediction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding Height Prediction
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Predicting a child's adult height is a common concern for parents. While genetics plays a significant role (accounting for about 60-80% of height variation), environmental factors such as nutrition, sleep, and physical activity also contribute to final height.
              </p>
              <p>
                Our height calculator uses the mid-parental height method, one of the most widely accepted scientific approaches for height prediction. This method provides a reasonable estimate based on parental heights, with a typical accuracy range of ±5-10 cm (2-4 inches).
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How the Height Calculator Works
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Ruler className="h-6 w-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">For Boys</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  (Mother's Height + Father's Height + 13 cm) ÷ 2
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  The 13 cm adjustment accounts for the average height difference between males and females.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Ruler className="h-6 w-6 text-pink-600" />
                  <h3 className="font-semibold text-gray-900">For Girls</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  (Mother's Height + Father's Height - 13 cm) ÷ 2
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  This formula adjusts for average female height relative to male height.
                </p>
              </div>
            </div>
          </section>

          {/* Factors Affecting Height */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Factors That Influence Height
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Genetics (60-80%)</h3>
                <p className="text-gray-600 text-sm">
                  Parental heights are the strongest predictors of a child's adult height. Multiple genes contribute to determining height.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Activity className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Nutrition (20-40%)</h3>
                <p className="text-gray-600 text-sm">
                  Adequate protein, calcium, vitamin D, and overall balanced nutrition are essential for optimal growth.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Environment & Health</h3>
                <p className="text-gray-600 text-sm">
                  Sleep quality, physical activity, chronic health conditions, and hormonal factors all play important roles.
                </p>
              </div>
            </div>
          </section>

          {/* Growth Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tips to Support Healthy Growth
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🥗 Nutrition</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>Ensure adequate protein intake (lean meat, fish, eggs, legumes)</li>
                  <li>Provide calcium-rich foods (dairy, leafy greens)</li>
                  <li>Include vitamin D sources (sunlight, fortified foods)</li>
                  <li>Maintain a balanced diet with fruits and vegetables</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🏃 Physical Activity</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>Encourage activities that stretch the body (swimming, basketball)</li>
                  <li>Promote regular exercise for at least 60 minutes daily</li>
                  <li>Include activities that strengthen bones and muscles</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">😴 Sleep</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                  <li>Ensure 9-11 hours of sleep for school-age children</li>
                  <li>Growth hormone is primarily released during deep sleep</li>
                  <li>Maintain consistent sleep schedules</li>
                </ul>
              </div>
            </div>
          </section>

          {/* WHO Growth Standards */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              WHO Growth Standards
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                The World Health Organization (WHO) has established growth standards based on data from healthy children worldwide. These standards help healthcare providers monitor a child's growth and identify potential issues early.
              </p>
              <p className="text-gray-700">
                Regular height measurements plotted on WHO growth charts can show if a child is growing at a normal rate. Significant deviations from expected growth patterns may warrant consultation with a pediatrician.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How accurate is the height prediction?
                </h3>
                <p className="text-gray-700 text-sm">
                  The mid-parental height method typically predicts adult height within ±5-10 cm (2-4 inches). However, actual height can vary based on nutrition, health conditions, and other environmental factors. It's a statistical prediction, not a guarantee.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can nutrition really affect my child's height?
                </h3>
                <p className="text-gray-700 text-sm">
                  Yes, nutrition can account for 20-40% of height variation. Chronic malnutrition or nutrient deficiencies can prevent a child from reaching their genetic potential. Conversely, proper nutrition supports optimal growth.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What if my child is shorter than predicted?
                </h3>
                <p className="text-gray-700 text-sm">
                  Children grow at different rates. Some experience growth spurts earlier or later than others. If you're concerned about your child's growth, consult a pediatrician who can assess their growth pattern using WHO growth charts and rule out any medical issues.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Do boys and girls grow at the same rate?
                </h3>
                <p className="text-gray-700 text-sm">
                  No, boys and girls have different growth patterns. Girls typically start their growth spurt earlier (around age 10-11) but stop growing earlier (around age 15-16). Boys start their growth spurt later (around age 12-13) but continue growing until about age 18-20.
                </p>
              </div>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Calculators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/bmi-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  BMI Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate body mass index and assess healthy weight
                </p>
              </Link>
              <Link
                href="/age-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">🎂</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Age Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate exact age and important milestones
                </p>
              </Link>
              <Link
                href="/sleep-calculator"
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-3">😴</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Sleep Calculator
                </h3>
                <p className="text-gray-600 text-sm">
                  Calculate optimal sleep schedule for growth
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

