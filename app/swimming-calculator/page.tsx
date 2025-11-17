import { Metadata } from 'next';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getCategoryUrl, getStepUrl } from '@/config/site';
import SwimmingCalculator from '@/components/Calculator/SwimmingCalculator';
import Link from 'next/link';
import { Waves, Activity, Target, TrendingUp, Info, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Swimming Calculator - Pace, SWOLF & Training Tool | Free Swim Pace Calculator',
  description: 'Free swimming calculator with pace tracking, SWOLF efficiency scoring, and training recommendations. Calculate swimming pace for freestyle, backstroke, breaststroke, and butterfly. Get interval training plans and race predictions.',
  keywords: [
    'swimming calculator',
    'swim pace calculator',
    'swimming pace calculator',
    'swolf calculator',
    'swim time calculator',
    'swimming speed calculator',
    'freestyle pace calculator',
    'swimming training calculator',
    'swim interval calculator',
    'swimming efficiency calculator',
    'swim stroke calculator',
    'pool pace calculator',
    'swimming workout calculator',
    'swim lap calculator',
    'swimming distance calculator',
    'swim split calculator',
    'swimming calorie calculator',
    'competitive swimming calculator',
    'swim training pace',
    'swimming performance calculator',
  ],
  authors: [{ name: 'AICalculator.pro' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getUrl('/')),
  alternates: {
    canonical: getUrl('/swimming-calculator'),
  },
  openGraph: {
    title: 'Swimming Calculator - Pace, SWOLF & Training Tool',
    description: 'Calculate swimming pace, track SWOLF efficiency, and get personalized training plans for all swimming strokes. Free swimming calculator with race predictions.',
    url: getUrl('/swimming-calculator'),
    siteName: 'AICalculator.pro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage('swimming'),
        width: 1200,
        height: 630,
        alt: 'Swimming Calculator - Pace and SWOLF Efficiency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swimming Calculator - Pace, SWOLF & Training Tool',
    description: 'Calculate pace, track efficiency with SWOLF, and get training recommendations for all swimming strokes.',
    images: [getOgImage('swimming')],
    creator: '@AICalculatorPro',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function SwimmingCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/swimming-calculator'),
        name: 'Swimming Calculator',
        url: getUrl('/swimming-calculator'),
        description: 'Free comprehensive swimming calculator with pace calculations, SWOLF efficiency scoring, training pace recommendations, interval training plans, and race time predictions for all swimming strokes.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Swimming pace calculator (per 100m and per 100y)',
          'SWOLF efficiency score calculation',
          'Training pace zones (recovery, endurance, threshold, sprint)',
          'Interval training plans',
          'Race time predictions',
          'Stroke-specific calorie burn estimation',
          'Support for all 4 swimming strokes',
          'Export results as image',
          'Share results via URL',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/swimming-calculator'),
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
            item: getCategoryUrl('health'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Swimming Calculator',
            item: getUrl('/swimming-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/swimming-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is SWOLF and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SWOLF (Swim Golf) is a swimming efficiency metric that combines time and stroke count. Formula: SWOLF = Time (seconds) + Stroke Count for one pool length. For example, if you complete 25 meters in 20 seconds with 15 strokes, your SWOLF is 35 (20 + 15). Lower SWOLF scores indicate better efficiency. Excellent swimmers typically score below 35, good swimmers 35-45, average swimmers 45-55, and beginners over 55. SWOLF helps identify technique improvements - you can either reduce time (swim faster) or reduce strokes (improve technique) to lower your score.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate my swimming pace?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Swimming pace is calculated as time per 100 meters or yards. Formula: Pace = (Time / Distance) × 100. For example, if you swim 1000 meters in 15 minutes (900 seconds), your pace is (900 / 1000) × 100 = 90 seconds per 100m, or 1:30 per 100m. Swimming pace varies significantly by stroke: freestyle is typically fastest, followed by backstroke, then breaststroke, with butterfly being most demanding. Elite swimmers maintain sub-60 second per 100m paces for freestyle, while recreational swimmers typically range from 1:30 to 2:30 per 100m.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are good swimming training pace zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Swimming training zones optimize different aspects of fitness. Recovery pace (25% slower than race pace) aids active recovery and warm-up/cool-down. Endurance pace (10% slower) builds aerobic capacity for 60-90% of training volume. Threshold pace (5% faster) improves lactate threshold through 20-30 minute sustained efforts. Sprint pace (20% faster) develops speed and power through short, intense intervals. For a 1:30/100m swimmer: Recovery = 1:52/100m, Endurance = 1:39/100m, Threshold = 1:25/100m, Sprint = 1:12/100m. Adjust zones based on current fitness and stroke.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many calories does swimming burn?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Swimming calorie burn varies by stroke, intensity, and body weight. Using MET (Metabolic Equivalent) values: Freestyle burns 5.8-10.0 MET, backstroke 4.8-9.5 MET, breaststroke 5.3-10.3 MET, and butterfly 11.0-13.8 MET. Formula: Calories = MET × weight (kg) × time (hours). A 70kg person swimming moderate freestyle for 30 minutes burns approximately 245 calories (7.0 × 70 × 0.5). Butterfly burns the most calories due to demanding full-body engagement, while backstroke typically burns the least. Faster paces significantly increase calorie burn.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a good stroke count for swimming?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Optimal stroke count depends on pool length, stroke type, and swimmer height. For 25m pools, elite freestyle swimmers typically use 10-14 strokes, good swimmers 15-18 strokes, and recreational swimmers 20-25 strokes. Taller swimmers naturally take fewer strokes. For 50m pools, counts roughly double. Breaststroke typically requires fewer strokes (8-12 per 25m) due to longer glide phases. Butterfly uses similar counts to freestyle. Reducing stroke count through improved technique (longer reach, better pull, efficient kick) increases efficiency. Aim to maintain stroke count while increasing speed for optimal performance.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/swimming-calculator'),
        name: 'How to Use the Swimming Calculator',
        description: 'Step-by-step guide to calculating swimming pace, SWOLF score, and training zones',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Swim Stroke',
            text: 'Choose your swimming stroke: Freestyle (front crawl), Backstroke, Breaststroke, or Butterfly. Each stroke has different efficiency and calorie burn characteristics.',
            url: getStepUrl('/swimming-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Distance and Time',
            text: 'Input your swimming distance in meters or yards and the time taken. Use recent swim data for most accurate training pace recommendations.',
            url: getStepUrl('/swimming-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Add Stroke Count (Optional)',
            text: 'Count your strokes for one pool length and select your pool size (25m or 50m). This calculates your SWOLF efficiency score.',
            url: getStepUrl('/swimming-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Input Weight (Optional)',
            text: 'Enter your weight in kilograms for accurate calorie burn calculation based on your stroke and intensity.',
            url: getStepUrl('/swimming-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Results and Training Zones',
            text: 'Review your pace, SWOLF score, training pace zones, interval sets, race predictions, and calorie burn.',
            url: getStepUrl('/swimming-calculator', 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/swimming-calculator'),
        headline: 'Swimming Calculator - Complete Guide to Pace and Efficiency',
        description: 'Comprehensive guide to calculating swimming pace, improving SWOLF efficiency, and optimizing training with personalized pace zones.',
        image: getOgImage('swimming'),
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={getCategoryUrl('health')} className="text-blue-600 hover:text-blue-800 transition-colors">
              Health & Fitness
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">Swimming Calculator</span>
          </nav>
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Swimming Calculator - Free Online Pace and SWOLF Efficiency Calculator</h1>

      {/* Calculator Component */}
      <SwimmingCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          
          {/* Understanding Swimming Pace */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Waves className="h-8 w-8 text-cyan-600" />
              Understanding Swimming Pace
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                <strong>Swimming pace</strong> is typically measured as time per 100 meters or 100 yards, making it easy to compare performances across different distances and strokes. Unlike running, where pace is per mile or kilometer, swimmers use shorter intervals due to the higher resistance of water.
              </p>
              <p className="leading-relaxed">
                Pace varies significantly between swimming strokes due to different biomechanics and resistance profiles. Freestyle (front crawl) is generally the fastest stroke, followed by backstroke, breaststroke, and butterfly. Understanding your pace for each stroke helps set realistic training goals and track improvement over time.
              </p>
              <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5 text-cyan-600" />
                  Pace by Skill Level (Freestyle, per 100m)
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>• Elite:</strong> Under 60 seconds (competitive/Olympic level)</li>
                  <li><strong>• Advanced:</strong> 1:00 - 1:20 (competitive club swimmers)</li>
                  <li><strong>• Intermediate:</strong> 1:20 - 2:00 (regular training)</li>
                  <li><strong>• Beginner:</strong> 2:00 - 3:00 (learning technique)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SWOLF Score Explained */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-600" />
              What is SWOLF?
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>SWOLF</strong> (Swim Golf) is a key metric for measuring swimming efficiency by combining speed and technique. The term comes from combining "swim" and "golf" - like golf, a lower score is better.
              </p>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📊 SWOLF Formula</h3>
                <p className="text-gray-700 mb-4 font-mono text-lg">
                  SWOLF = Time (seconds) + Stroke Count
                </p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Example:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Complete 25m in 18 seconds</li>
                    <li>Take 14 strokes</li>
                    <li>SWOLF = 18 + 14 = 32 (Excellent!)</li>
                  </ul>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">SWOLF Score</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Efficiency Level</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">&lt; 35</td>
                      <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">Excellent</span></td>
                      <td className="px-6 py-4 text-sm text-gray-700">Competitive swimmer level</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">35 - 45</td>
                      <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">Good</span></td>
                      <td className="px-6 py-4 text-sm text-gray-700">Strong recreational swimmer</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">45 - 55</td>
                      <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">Average</span></td>
                      <td className="px-6 py-4 text-sm text-gray-700">Regular fitness swimmer</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">&gt; 55</td>
                      <td className="px-6 py-4 text-sm"><span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full font-medium">Needs Work</span></td>
                      <td className="px-6 py-4 text-sm text-gray-700">Focus on technique improvement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-3">💡 How to Improve Your SWOLF Score</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-2">Reduce Time:</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Improve cardiovascular fitness</li>
                      <li>Increase power output</li>
                      <li>Optimize body position</li>
                      <li>Reduce drag</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Reduce Strokes:</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Lengthen stroke distance</li>
                      <li>Improve catch and pull</li>
                      <li>Perfect body rotation</li>
                      <li>Enhance glide efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Swimming Strokes Comparison */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Swimming Strokes Comparison</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🏊 Freestyle (Front Crawl)</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Speed:</strong> Fastest stroke</li>
                  <li>• <strong>Efficiency:</strong> Most energy-efficient</li>
                  <li>• <strong>Calorie Burn:</strong> 5.8-10.0 MET</li>
                  <li>• <strong>Best For:</strong> Distance swimming, competitions</li>
                  <li>• <strong>Difficulty:</strong> Moderate (breathing technique crucial)</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🏊 Backstroke</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Speed:</strong> Second fastest</li>
                  <li>• <strong>Efficiency:</strong> Good efficiency</li>
                  <li>• <strong>Calorie Burn:</strong> 4.8-9.5 MET</li>
                  <li>• <strong>Best For:</strong> Back strengthening, variety</li>
                  <li>• <strong>Difficulty:</strong> Moderate (navigation, rhythm)</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🏊 Breaststroke</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Speed:</strong> Slowest recreational stroke</li>
                  <li>• <strong>Efficiency:</strong> Lower efficiency</li>
                  <li>• <strong>Calorie Burn:</strong> 5.3-10.3 MET</li>
                  <li>• <strong>Best For:</strong> Beginners, leisurely swimming</li>
                  <li>• <strong>Difficulty:</strong> Easy to learn, hard to master</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">🦋 Butterfly</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Speed:</strong> Fast (but exhausting)</li>
                  <li>• <strong>Efficiency:</strong> Lowest efficiency</li>
                  <li>• <strong>Calorie Burn:</strong> 11.0-13.8 MET (highest!)</li>
                  <li>• <strong>Best For:</strong> Power training, short distances</li>
                  <li>• <strong>Difficulty:</strong> Most difficult, high skill required</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Training Tips */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              Swimming Training Tips
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-6 w-6 text-cyan-600" />
                  <h3 className="font-bold text-gray-900">Technique First</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Focus on proper technique before increasing speed or distance. Good form prevents injury, improves efficiency, and makes swimming more enjoyable. Consider working with a coach for technique feedback.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                  <h3 className="font-bold text-gray-900">Interval Training</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Incorporate interval sets to build speed and endurance. Mix short sprints with recovery periods. Example: 10 × 50m at 80% effort with 15s rest. Gradually increase intensity and reduce rest time.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-6 w-6 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Track Progress</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Monitor your SWOLF score and pace regularly. Keep a training log to track improvements. Set specific, measurable goals like reducing your 400m time by 10 seconds or lowering your SWOLF score by 3 points.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is SWOLF and how is it calculated?</h3>
                <p className="text-gray-700 leading-relaxed">
                  SWOLF (Swim Golf) is a swimming efficiency metric that combines time and stroke count. Formula: SWOLF = Time (seconds) + Stroke Count for one pool length. For example, if you complete 25 meters in 20 seconds with 15 strokes, your SWOLF is 35 (20 + 15). Lower SWOLF scores indicate better efficiency. Excellent swimmers typically score below 35, good swimmers 35-45, average swimmers 45-55, and beginners over 55. SWOLF helps identify technique improvements - you can either reduce time (swim faster) or reduce strokes (improve technique) to lower your score.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How do I calculate my swimming pace?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Swimming pace is calculated as time per 100 meters or yards. Formula: Pace = (Time / Distance) × 100. For example, if you swim 1000 meters in 15 minutes (900 seconds), your pace is (900 / 1000) × 100 = 90 seconds per 100m, or 1:30 per 100m. Swimming pace varies significantly by stroke: freestyle is typically fastest, followed by backstroke, then breaststroke, with butterfly being most demanding. Elite swimmers maintain sub-60 second per 100m paces for freestyle, while recreational swimmers typically range from 1:30 to 2:30 per 100m.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are good swimming training pace zones?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Swimming training zones optimize different aspects of fitness. Recovery pace (25% slower than race pace) aids active recovery and warm-up/cool-down. Endurance pace (10% slower) builds aerobic capacity for 60-90% of training volume. Threshold pace (5% faster) improves lactate threshold through 20-30 minute sustained efforts. Sprint pace (20% faster) develops speed and power through short, intense intervals. For a 1:30/100m swimmer: Recovery = 1:52/100m, Endurance = 1:39/100m, Threshold = 1:25/100m, Sprint = 1:12/100m. Adjust zones based on current fitness and stroke.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How many calories does swimming burn?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Swimming calorie burn varies by stroke, intensity, and body weight. Using MET (Metabolic Equivalent) values: Freestyle burns 5.8-10.0 MET, backstroke 4.8-9.5 MET, breaststroke 5.3-10.3 MET, and butterfly 11.0-13.8 MET. Formula: Calories = MET × weight (kg) × time (hours). A 70kg person swimming moderate freestyle for 30 minutes burns approximately 245 calories (7.0 × 70 × 0.5). Butterfly burns the most calories due to demanding full-body engagement, while backstroke typically burns the least. Faster paces significantly increase calorie burn.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is a good stroke count for swimming?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Optimal stroke count depends on pool length, stroke type, and swimmer height. For 25m pools, elite freestyle swimmers typically use 10-14 strokes, good swimmers 15-18 strokes, and recreational swimmers 20-25 strokes. Taller swimmers naturally take fewer strokes. For 50m pools, counts roughly double. Breaststroke typically requires fewer strokes (8-12 per 25m) due to longer glide phases. Butterfly uses similar counts to freestyle. Reducing stroke count through improved technique (longer reach, better pull, efficient kick) increases efficiency. Aim to maintain stroke count while increasing speed for optimal performance.
                </p>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Enhance your swimming knowledge with these authoritative resources on technique, training, and performance:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://www.usaswimming.org/utility/landing-pages/technique"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">USA Swimming - Technique Resources</h3>
                <p className="text-sm text-gray-600 mb-2">Official technique guides, training tips, and swimming drills from USA Swimming's national governing body.</p>
                <span className="text-xs text-blue-600">usaswimming.org →</span>
              </a>

              <a 
                href="https://www.swimming.org/swim101/swimming-for-fitness-training-plans/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">British Swimming - Training Plans</h3>
                <p className="text-sm text-gray-600 mb-2">Evidence-based swimming training programs and fitness guidelines for all skill levels.</p>
                <span className="text-xs text-green-600">swimming.org →</span>
              </a>

              <a 
                href="https://www.acsm.org/education-resources/trending-topics-resources/resource-library/swimming"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">ACSM - Swimming Research</h3>
                <p className="text-sm text-gray-600 mb-2">American College of Sports Medicine research on swimming physiology and training adaptations.</p>
                <span className="text-xs text-purple-600">acsm.org →</span>
              </a>

              <a 
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6683619/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NIH - Swimming Biomechanics</h3>
                <p className="text-sm text-gray-600 mb-2">Scientific studies on swimming efficiency, stroke mechanics, and performance optimization.</p>
                <span className="text-xs text-orange-600">ncbi.nlm.nih.gov →</span>
              </a>
            </div>
          </section>

          {/* Related Calculators */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Health & Fitness Calculators</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/running-calculator"
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-gray-900">Running Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate running pace, race predictions, and training zones</p>
              </Link>

              <Link 
                href="/vo2-max-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Waves className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-gray-900">VO2 Max Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Measure cardiovascular fitness and aerobic capacity</p>
              </Link>

              <Link 
                href="/target-heart-rate-calculator"
                className="block p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-gray-900">Heart Rate Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate target heart rate zones for optimal training</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

