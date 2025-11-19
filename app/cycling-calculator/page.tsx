import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getCategoryUrl, getStepUrl } from '@/config/site';
import CyclingCalculator from '@/components/Calculator/CyclingCalculator';
import Link from 'next/link';
import { Bike, Zap, TrendingUp, Mountain, Activity, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cycling Calculator (Free, No signup) - Bike Speed | AICalculator',
  description: 'Free cycling calculator with no sign-up required. With power estimation, speed calculation, and training zones. Get FTP-based power zones, heart rate zones, cadence recommendations, and climb analysis for road cycling and mountain biking.',
  keywords: [
    'cycling calculator',
    'free cycling calculator',
    'cycling calculator no signup',
    'bike calculator',
    'cycling speed calculator',
    'cycling power calculator',
    'ftp calculator',
    'cycling training zones',
    'bike speed calculator',
    'cycling pace calculator',
    'power to weight ratio calculator',
    'cycling wattage calculator',
    'cycling cadence calculator',
    'bike power calculator',
    'cycling calorie calculator',
    'hill climbing calculator',
    'vam calculator cycling',
    'cycling performance calculator',
    'bike training calculator',
    'cycling heart rate zones',
    'road cycling calculator',
    'cycling workout calculator',
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
    canonical: getUrl('/cycling-calculator'),
  },
  openGraph: {
    title: 'Cycling Calculator (Free, No signup) - AICalculator',
    description: 'Free cycling calculator with no sign-up required. Calculate cycling power, speed, and get personalized training zones based on FTP. Includes cadence recommendations and climb analysis.',
    url: getUrl('/cycling-calculator'),
    siteName: 'AICalculator.pro',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage('cycling'),
        width: 1200,
        height: 630,
        alt: 'Cycling Calculator - Power and Training Zones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cycling Calculator (Free, No signup) - AICalculator',
    description: 'Calculate power, speed, and get FTP-based training zones for cycling.',
    images: [getOgImage('cycling')],
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

export default function CyclingCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/cycling-calculator'),
        name: 'Cycling Calculator',
        url: getUrl('/cycling-calculator'),
        description: 'Free comprehensive cycling calculator with power estimation, speed calculation, FTP-based training zones, heart rate zones, cadence recommendations, and climbing analysis for cyclists.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Cycling speed calculator (km/h and mph)',
          'Power estimation with grade and wind resistance',
          'FTP-based power training zones',
          'Heart rate training zones',
          'Cadence recommendations',
          'Climbing metrics and VAM calculation',
          'Calorie burn estimation',
          'Export results as image',
          'Share results via URL',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/cycling-calculator'),
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
            name: 'Cycling Calculator',
            item: getUrl('/cycling-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/cycling-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How is cycling power estimated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cycling power is estimated using a physics-based model: Power = (Rolling Resistance + Air Resistance + Climbing) × Velocity. Rolling resistance depends on tire type and road surface (typically 0.005 coefficient). Air resistance is calculated using drag coefficient (CdA) around 0.324 m² for road cyclists. Climbing power equals weight × gravity × gradient × speed. For a 75kg rider at 25 km/h on flat road, estimated power is 150-200W. Grade significantly increases power: a 5% climb at same speed requires 300-400W. Wind resistance increases power dramatically at higher speeds.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are FTP-based power training zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'FTP (Functional Threshold Power) is the maximum power you can sustain for one hour. Training zones based on FTP: Zone 1 Active Recovery (55-75% FTP) for easy spinning, Zone 2 Endurance (75-90% FTP) for base building, Zone 3 Tempo (90-105% FTP) for sustained efforts, Zone 4 Threshold (105-120% FTP) for lactate threshold work, Zone 5 VO2 Max (120-150% FTP) for high-intensity intervals, Zone 6 Anaerobic (150%+ FTP) for sprints. Most training (70-80%) should be in Zones 1-2. Quality sessions use Zones 3-5.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a good power-to-weight ratio for cycling?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Power-to-weight ratio (W/kg) is critical for climbing performance. Recreational cyclists: 2.0-3.0 W/kg. Category 3-4 racers: 3.0-4.0 W/kg. Category 1-2 racers: 4.0-5.0 W/kg. Professional cyclists: 5.0-6.5 W/kg. World-class climbers: 6.5+ W/kg. These values are for sustained FTP (1-hour) power. For shorter efforts (5-20 min), values increase 10-30%. On flat terrain, absolute power matters more. On climbs over 5%, power-to-weight ratio becomes the dominant factor. Improve ratio through training (increase power) and weight management.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is optimal cadence for cycling?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Optimal cadence is 80-100 rpm for most cyclists. Professional cyclists typically ride at 90-95 rpm on flat terrain. Lower cadences (70-80 rpm) may be more efficient at lower speeds but cause greater muscular fatigue. Higher cadences (90-100+ rpm) reduce muscular stress but increase cardiovascular demand. For climbing, pros maintain 70-85 rpm. Time trialists often use 90-95 rpm. Track cyclists sprint at 120-140 rpm. Individual optimization depends on muscle fiber type, training, and power output. Practice different cadences in training to develop efficiency across ranges.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many calories does cycling burn?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cycling calorie burn depends on intensity, weight, and terrain. Light cycling (<16 km/h): 4 MET, 280 kcal/hour for 70kg rider. Moderate (16-19 km/h): 6.8 MET, 476 kcal/hour. Vigorous (19-22 km/h): 8 MET, 560 kcal/hour. Very vigorous (22-25 km/h): 10 MET, 700 kcal/hour. Racing (>25 km/h): 12 MET, 840 kcal/hour. Climbing significantly increases burn: add 10-20% per 1% gradient. For accurate measurement, use power meter: 1 watt-hour = 3.6 kJ. Typical efficiency is 20-25%, so 200W for 1 hour burns approximately 720-900 kcal.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/cycling-calculator'),
        name: 'How to Use the Cycling Calculator',
        description: 'Step-by-step guide to calculating cycling speed, power, and training zones',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Distance and Time',
            text: 'Input your ride distance in kilometers or miles and the time taken. For power estimation, recent ride data provides the most accurate results.',
            url: getStepUrl('/cycling-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add Rider and Bike Weight',
            text: 'Enter your body weight and bike weight in kilograms. This is essential for accurate power estimation and power-to-weight ratio calculation.',
            url: getStepUrl('/cycling-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Input Terrain Details',
            text: 'Specify the average grade (0 for flat, positive for uphill, negative for downhill) and any headwind speed. These significantly affect power calculations.',
            url: getStepUrl('/cycling-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Add Cadence and Heart Rate Data',
            text: 'Optionally enter your cadence (rpm), age, and resting heart rate for cadence analysis and heart rate zone calculations.',
            url: getStepUrl('/cycling-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Performance Metrics',
            text: 'View your speed, estimated power, FTP-based power zones, heart rate zones, cadence recommendations, and climbing metrics.',
            url: getStepUrl('/cycling-calculator', 5),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/cycling-calculator'),
        headline: 'Cycling Calculator - Complete Guide to Power and Performance',
        description: 'Comprehensive guide to calculating cycling power, understanding FTP training zones, and optimizing performance with power-to-weight ratios.',
        image: getOgImage('cycling'),
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Cycling Calculator (Free, No signup)"
        calculatorUrl="/cycling-calculator"
      />
        </div>
      </div>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Cycling Calculator - Free Online Power and Training Zone Calculator</h1>

      {/* Calculator Component */}
      <CyclingCalculator />

      {/* Educational Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 space-y-12">
          
          {/* Understanding Cycling Power */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-600" />
              Understanding Cycling Power
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="text-lg leading-relaxed">
                <strong>Cycling power</strong> measures the work rate you produce while riding, expressed in watts (W). Power is the most accurate metric for cycling performance because it directly reflects your physical output, unaffected by external factors like wind or terrain that influence speed.
              </p>
              <p className="leading-relaxed">
                Power-based training revolutionized cycling by enabling precise intensity control. Unlike heart rate, which lags and varies with fatigue and conditions, power provides instant, objective feedback. A power meter measures force applied to pedals multiplied by cadence, giving real-time wattage output.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-3">Key Power Concepts</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>• FTP (Functional Threshold Power):</strong> Maximum sustainable power for 1 hour</li>
                  <li><strong>• Normalized Power (NP):</strong> Weighted average accounting for intensity variations</li>
                  <li><strong>• Power-to-Weight:</strong> Watts per kilogram, crucial for climbing</li>
                  <li><strong>• TSS (Training Stress Score):</strong> Quantifies training load</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Power Training Zones */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              Power Training Zones
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Training zones based on FTP ensure you're working at the right intensity for your goals. Each zone targets specific physiological adaptations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Zone 1: Active Recovery (55-75% FTP)</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Very easy spinning</li>
                    <li>• Active recovery between hard efforts</li>
                    <li>• Promotes blood flow and recovery</li>
                    <li>• Use after races or hard training</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Zone 2: Endurance (75-90% FTP)</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Aerobic base building</li>
                    <li>• 70-80% of total training volume</li>
                    <li>• Fat oxidation development</li>
                    <li>• Long rides (2-6 hours)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Zone 3: Tempo (90-105% FTP)</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Sustained efforts</li>
                    <li>• Lactate threshold improvement</li>
                    <li>• 20-60 minute intervals</li>
                    <li>• Race pace for longer events</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Zone 4: Threshold (105-120% FTP)</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Hard, sustained efforts</li>
                    <li>• Time trial pace</li>
                    <li>• 8-30 minute intervals</li>
                    <li>• Increases FTP</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Zone 5: VO2 Max (120-150% FTP)</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• High-intensity intervals</li>
                    <li>• 3-8 minute efforts</li>
                    <li>• Maximal aerobic capacity</li>
                    <li>• Improves top-end fitness</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Zone 6: Anaerobic (150%+ FTP)</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Sprint efforts</li>
                    <li>• 30 seconds to 2 minutes</li>
                    <li>• Anaerobic capacity</li>
                    <li>• Use sparingly</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Power to Weight Ratio */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Mountain className="h-8 w-8 text-green-600" />
              Power-to-Weight Ratio
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Power-to-weight ratio (W/kg) is the single best predictor of climbing performance. On steep gradients, W/kg determines who reaches the summit first.
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Level</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">W/kg (20min)</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">World Tour Pro</td>
                    <td className="px-6 py-4 text-sm text-gray-700">6.5+ W/kg</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Elite professional cyclist level</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Cat 1 Racer</td>
                    <td className="px-6 py-4 text-sm text-gray-700">5.0-6.5 W/kg</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Strong amateur racer</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Cat 2-3 Racer</td>
                    <td className="px-6 py-4 text-sm text-gray-700">4.0-5.0 W/kg</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Competitive amateur</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Cat 4-5 Racer</td>
                    <td className="px-6 py-4 text-sm text-gray-700">3.0-4.0 W/kg</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Entry-level racer</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Recreational</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2.0-3.0 W/kg</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Fitness cyclist</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How is cycling power estimated?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cycling power is estimated using a physics-based model: Power = (Rolling Resistance + Air Resistance + Climbing) × Velocity. Rolling resistance depends on tire type and road surface (typically 0.005 coefficient). Air resistance is calculated using drag coefficient (CdA) around 0.324 m² for road cyclists. Climbing power equals weight × gravity × gradient × speed. For a 75kg rider at 25 km/h on flat road, estimated power is 150-200W. Grade significantly increases power: a 5% climb at same speed requires 300-400W. Wind resistance increases power dramatically at higher speeds.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are FTP-based power training zones?</h3>
                <p className="text-gray-700 leading-relaxed">
                  FTP (Functional Threshold Power) is the maximum power you can sustain for one hour. Training zones based on FTP: Zone 1 Active Recovery (55-75% FTP) for easy spinning, Zone 2 Endurance (75-90% FTP) for base building, Zone 3 Tempo (90-105% FTP) for sustained efforts, Zone 4 Threshold (105-120% FTP) for lactate threshold work, Zone 5 VO2 Max (120-150% FTP) for high-intensity intervals, Zone 6 Anaerobic (150%+ FTP) for sprints. Most training (70-80%) should be in Zones 1-2. Quality sessions use Zones 3-5.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is a good power-to-weight ratio for cycling?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Power-to-weight ratio (W/kg) is critical for climbing performance. Recreational cyclists: 2.0-3.0 W/kg. Category 3-4 racers: 3.0-4.0 W/kg. Category 1-2 racers: 4.0-5.0 W/kg. Professional cyclists: 5.0-6.5 W/kg. World-class climbers: 6.5+ W/kg. These values are for sustained FTP (1-hour) power. For shorter efforts (5-20 min), values increase 10-30%. On flat terrain, absolute power matters more. On climbs over 5%, power-to-weight ratio becomes the dominant factor. Improve ratio through training (increase power) and weight management.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What is optimal cadence for cycling?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Optimal cadence is 80-100 rpm for most cyclists. Professional cyclists typically ride at 90-95 rpm on flat terrain. Lower cadences (70-80 rpm) may be more efficient at lower speeds but cause greater muscular fatigue. Higher cadences (90-100+ rpm) reduce muscular stress but increase cardiovascular demand. For climbing, pros maintain 70-85 rpm. Time trialists often use 90-95 rpm. Track cyclists sprint at 120-140 rpm. Individual optimization depends on muscle fiber type, training, and power output. Practice different cadences in training to develop efficiency across ranges.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How many calories does cycling burn?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cycling calorie burn depends on intensity, weight, and terrain. Light cycling (&lt;16 km/h): 4 MET, 280 kcal/hour for 70kg rider. Moderate (16-19 km/h): 6.8 MET, 476 kcal/hour. Vigorous (19-22 km/h): 8 MET, 560 kcal/hour. Very vigorous (22-25 km/h): 10 MET, 700 kcal/hour. Racing (&gt;25 km/h): 12 MET, 840 kcal/hour. Climbing significantly increases burn: add 10-20% per 1% gradient. For accurate measurement, use power meter: 1 watt-hour = 3.6 kJ. Typical efficiency is 20-25%, so 200W for 1 hour burns approximately 720-900 kcal.
                </p>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Deepen your cycling knowledge with these trusted resources on power training, performance, and cycling science:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://www.britishcycling.org.uk/knowledge"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">British Cycling - Training Knowledge</h3>
                <p className="text-sm text-gray-600 mb-2">Expert coaching advice, training plans, and performance guides from British Cycling's national federation.</p>
                <span className="text-xs text-blue-600">britishcycling.org.uk →</span>
              </a>

              <a 
                href="https://www.trainingpeaks.com/learn/articles/cycling/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">TrainingPeaks - Cycling Education</h3>
                <p className="text-sm text-gray-600 mb-2">Power-based training articles, FTP testing protocols, and performance analytics from cycling coaches.</p>
                <span className="text-xs text-purple-600">trainingpeaks.com →</span>
              </a>

              <a 
                href="https://www.acsm.org/blog-detail/acsm-blog/2019/07/24/cycling-performance-training-tips"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">ACSM - Cycling Performance</h3>
                <p className="text-sm text-gray-600 mb-2">American College of Sports Medicine guidelines on cycling training and performance optimization.</p>
                <span className="text-xs text-green-600">acsm.org →</span>
              </a>

              <a 
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8912757/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <h3 className="font-bold text-gray-900 mb-2">NIH - Cycling Physiology Research</h3>
                <p className="text-sm text-gray-600 mb-2">Scientific research on cycling power output, metabolic demands, and training adaptations.</p>
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
                <p className="text-sm text-gray-600">Calculate pace, race predictions, and training zones</p>
              </Link>

              <Link 
                href="/vo2-max-calculator"
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-gray-900">VO2 Max Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Measure cardiovascular fitness and aerobic capacity</p>
              </Link>

              <Link 
                href="/target-heart-rate-calculator"
                className="block p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-gray-900">Heart Rate Calculator</h3>
                </div>
                <p className="text-sm text-gray-600">Calculate target heart rate zones for training</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

