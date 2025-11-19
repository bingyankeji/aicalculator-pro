import { Metadata } from "next";
import TargetHeartRateCalculator from "@/components/Calculator/TargetHeartRateCalculator";
import Link from "next/link";
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Target Heart Rate (Free, No signup) - Training Zones | AICalculator',
  description: 'Free target heart rate calculator with no sign-up required. Find your optimal training zones using the Karvonen formula. Calculate max heart rate, fat burning zone, aerobic zone, and anaerobic zones based on age and resting heart rate.',
  keywords: [
    'target heart rate calculator',
    'free target heart rate calculator',
    'target heart rate calculator no signup',
    'heart rate zone calculator',
    'max heart rate calculator',
    'karvonen formula calculator',
    'training heart rate calculator',
    'fat burning heart rate',
    'aerobic heart rate zone',
    'anaerobic heart rate zone',
    'heart rate reserve calculator',
    'exercise heart rate calculator',
    'cardio heart rate zones',
    'heart rate training zones',
    'optimal heart rate for exercise',
    'target heart rate by age',
    'resting heart rate calculator',
    'heart rate monitor zones',
    'cardiovascular training zones',
    '220 minus age calculator',
    'heart rate percentage calculator',
    'fitness heart rate zones',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Target Heart Rate (Free, No signup) - AICalculator',
    description: 'Calculate your target heart rate zones for optimal training. Free tool using Karvonen formula for accurate fat burning, aerobic, and anaerobic heart rate zones.',
    type: 'website',
    url: getUrl('/target-heart-rate-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('target-heart-rate'),
      width: 1200,
      height: 630,
      alt: 'Target Heart Rate Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Heart Rate (Free, No signup) - AICalculator',
    description: 'Free target heart rate calculator with no sign-up required. Calculate your optimal training heart rate zones by age. Karvonen formula calculator for fat burning, aerobic, and anaerobic zones.',
    images: [getOgImage('target-heart-rate')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/target-heart-rate-calculator'),
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

export default function TargetHeartRateCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/target-heart-rate-calculator'),
        name: 'Target Heart Rate Calculator',
        url: getUrl('/target-heart-rate-calculator'),
        description: 'Free target heart rate calculator to determine your optimal training heart rate zones using the Karvonen formula. Calculate max heart rate, heart rate reserve, and five training zones based on your age and resting heart rate.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate maximum heart rate (220 - age)',
          'Heart rate reserve (HRR) calculation',
          'Five training zone calculation using Karvonen formula',
          'Zone 1: Warm-up (50-60% intensity)',
          'Zone 2: Fat burning (60-70% intensity)',
          'Zone 3: Aerobic (70-80% intensity)',
          'Zone 4: Anaerobic (80-90% intensity)',
          'Zone 5: Maximum effort (90-100% intensity)',
          'Personalized training recommendations',
          'Age-specific exercise advice',
          'Heart rate monitoring tips',
          'Resting heart rate adjustment',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/target-heart-rate-calculator'),
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
            name: 'Target Heart Rate Calculator',
            item: getUrl('/target-heart-rate-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/target-heart-rate-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is target heart rate and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Target heart rate is the ideal range your heart should beat during exercise for maximum cardiovascular benefit and safety. It ensures you\'re exercising at the right intensity - not too easy (ineffective) or too hard (potentially dangerous). Training in different heart rate zones produces specific benefits: Zone 2 (60-70%) burns fat efficiently, Zone 3 (70-80%) improves cardiovascular fitness, and Zone 4 (80-90%) builds speed and power. Monitoring your heart rate helps optimize workouts, track fitness improvements, and prevent overtraining.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate my target heart rate zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most accurate method is the Karvonen formula: (Max HR - Resting HR) × %Intensity + Resting HR. First, calculate your maximum heart rate (220 - age). Then subtract your resting heart rate (measured first thing in the morning) to get your heart rate reserve (HRR). Multiply HRR by the intensity percentage (e.g., 0.70 for 70%) and add back your resting heart rate. For example, a 30-year-old with 70 bpm resting HR: Max HR = 190, HRR = 120. Zone 3 (70-80%) would be 154-166 bpm.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between the Karvonen formula and the simple percentage method?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The simple percentage method (Max HR × percentage) doesn\'t account for individual fitness levels. The Karvonen formula is more accurate because it uses heart rate reserve (Max HR - Resting HR), which adjusts for your fitness level. Athletes with low resting heart rates (50-60 bpm) get more personalized zones than using just maximum heart rate. For a 30-year-old with 60 bpm resting HR: simple method gives Zone 3 as 133-152 bpm, while Karvonen gives 151-165 bpm - a significant difference that better reflects their fitness level.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which heart rate zone is best for fat burning?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Zone 2 (60-70% of max heart rate) is the classic "fat burning zone" where your body primarily uses fat for fuel. However, higher intensity zones (3-4) burn more total calories, including significant fat calories. For weight loss, the best strategy is mixing both: 70-80% of weekly cardio in Zone 2 for building aerobic base and fat oxidation, plus 20-30% in Zones 3-4 for higher calorie burn. Zone 2 training is also sustainable for longer durations (45-90 minutes), maximizing total fat burned.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate are heart rate monitors and fitness trackers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Chest strap heart rate monitors are most accurate (95-99% accuracy), using electrical signals like an EKG. Wrist-based optical sensors (like Apple Watch, Garmin, Fitbit) are 85-95% accurate at rest but can be less accurate during high-intensity exercise, especially with arm movement. Factors affecting wrist sensors: skin tone, tattoos, tight/loose fit, cold temperatures, and arm position. For serious training, use a chest strap. For general fitness tracking, wrist sensors are adequate. Manual pulse checking (60-second count) is reliable if done correctly.',
            },
          },
          {
            '@type': 'Question',
            name: 'When should I train in different heart rate zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Structure your weekly training using the 80/20 rule: 80% easy (Zones 1-2) and 20% hard (Zones 4-5). Monday/Wednesday/Friday: 30-60 minutes Zone 2 (aerobic base building). Tuesday: Zone 4 intervals (4×5 minutes at 80-90% with 3-minute rest). Thursday: Zone 3 tempo run (20-30 minutes at 70-80%). Saturday: Long Zone 2 session (60-90 minutes). Sunday: Zone 1 active recovery or rest. This balance builds endurance without overtraining. Beginners should spend 4-6 weeks in Zones 1-2 before adding high-intensity work.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/target-heart-rate-calculator'),
        name: 'How to Calculate Your Target Heart Rate Zones',
        description: 'Step-by-step guide to calculating your target heart rate zones for optimal cardiovascular training',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Target Heart Rate Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Measure Your Resting Heart Rate',
            text: 'Measure your resting heart rate first thing in the morning before getting out of bed. Count your pulse for a full 60 seconds at your wrist or neck. The average adult resting heart rate is 60-100 bpm, with athletes often having 40-60 bpm. Do this for 3 consecutive mornings and take the average for accuracy.',
            url: getStepUrl('/target-heart-rate-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Your Age',
            text: 'Enter your current age in years (between 10-100). Age is the primary factor in calculating maximum heart rate using the formula 220 - age. This formula is scientifically validated for most adults, though individual variation exists (±10-15 bpm). Your max heart rate naturally decreases by approximately 1 beat per year.',
            url: getStepUrl('/target-heart-rate-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Your Resting Heart Rate',
            text: 'Input your resting heart rate (30-120 bpm). If you haven\'t measured it, the calculator uses 70 bpm as default. However, knowing your actual resting heart rate significantly improves accuracy, especially if you\'re very fit (low RHR) or just starting exercise (high RHR). Athletes may have RHR of 40-50 bpm, while sedentary individuals might be 80-100 bpm.',
            url: getStepUrl('/target-heart-rate-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Your Training Zones',
            text: 'Click "Calculate Heart Rate Zones" to see your personalized five-zone training plan. The calculator uses the Karvonen formula to compute: Zone 1 (50-60% - warm-up), Zone 2 (60-70% - fat burning), Zone 3 (70-80% - aerobic), Zone 4 (80-90% - anaerobic), and Zone 5 (90-100% - maximum effort). Each zone shows specific heart rate ranges in beats per minute.',
            url: getStepUrl('/target-heart-rate-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review Training Recommendations',
            text: 'Review the personalized training advice based on your age and fitness level. Beginners should focus 80% of training in Zones 1-2, intermediates can add 20% Zone 4 work, and advanced athletes can periodize across all zones. The calculator provides specific workout examples and guidelines for each fitness level.',
            url: getStepUrl('/target-heart-rate-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Apply to Your Training',
            text: 'Use a heart rate monitor or fitness tracker during exercise to stay in your target zones. Most devices allow you to set zone alerts. Start each workout with 5-10 minutes in Zone 1, then move to your target zone. Monitor how your resting heart rate decreases over weeks as fitness improves - a sign of cardiovascular adaptation.',
            url: getStepUrl('/target-heart-rate-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/target-heart-rate-calculator'),
        headline: 'Target Heart Rate Calculator - Complete Guide to Training Heart Rate Zones',
        description: 'Learn how to calculate and use target heart rate zones for optimal cardiovascular training. Includes Karvonen formula explanation, zone-specific benefits, and training strategies.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: '2024-11-17',
        image: getOgImage('target-heart-rate'),
        articleBody: 'Target heart rate training is a scientifically-proven method to optimize cardiovascular exercise. By training in specific heart rate zones, you can target different physiological adaptations: fat burning, aerobic capacity, anaerobic threshold, or maximum power. The Karvonen formula provides the most accurate zone calculations by incorporating resting heart rate, which reflects individual fitness levels. Understanding and applying heart rate zones transforms random exercise into structured, goal-oriented training that produces measurable results.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Target Heart Rate Calculator - Calculate Training Heart Rate Zones by Age</h1>
      
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/health-fitness" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Health & Fitness</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Target Heart Rate Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <TargetHeartRateCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Target Heart Rate Training</h2>
              
              <div className="prose prose-blue max-w-none">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What is Target Heart Rate?</h3>
                  <p className="text-gray-700 mb-4">
                    Target heart rate (THR) is the ideal range your heart should beat during exercise to achieve specific training benefits while staying safe. Training at different heart rate intensities produces different physiological adaptations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li><strong>Zone 1-2 (50-70%):</strong> Fat oxidation, aerobic base building, recovery</li>
                    <li><strong>Zone 3 (70-80%):</strong> Cardiovascular fitness, aerobic capacity, endurance</li>
                    <li><strong>Zone 4 (80-90%):</strong> Lactate threshold, speed, anaerobic capacity</li>
                    <li><strong>Zone 5 (90-100%):</strong> Maximum power, VO2 max, neuromuscular training</li>
                  </ul>
                  <p className="text-gray-700">
                    The American Heart Association recommends exercising at 50-85% of maximum heart rate for cardiovascular benefits. Beginners should start at 50-70% and gradually increase intensity as fitness improves. Visit the <a href="https://www.heart.org/en/healthy-living/fitness/fitness-basics/target-heart-rates" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">American Heart Association</a> for official guidelines on target heart rate training.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl shadow-lg border border-red-200 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-4">Maximum Heart Rate Formula</h3>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-2xl font-bold text-center text-gray-900">220 - Age = Max HR</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      This simple formula is widely used and validated by the American College of Sports Medicine. While individual variation exists (±10-15 bpm), it provides a safe and effective estimate for most adults.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Example:</strong> A 30-year-old has a maximum heart rate of approximately 190 bpm (220 - 30 = 190). This means their heart should not exceed 190 beats per minute during maximum effort exercise.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Karvonen Formula (More Accurate)</h3>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-sm font-bold text-center text-gray-900 mb-2">Target HR = (HRR × %Intensity) + Resting HR</p>
                      <p className="text-xs text-center text-gray-600">HRR = Max HR - Resting HR</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      The Karvonen formula accounts for individual fitness by using heart rate reserve (HRR). Athletes with low resting heart rates get more personalized zones than the simple percentage method.
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Example:</strong> 30-year-old, 60 bpm resting HR, targeting 70% intensity: HRR = 190-60 = 130. Target HR = (130 × 0.70) + 60 = 151 bpm.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">The Five Heart Rate Training Zones Explained</h3>
                  
                  <div className="space-y-6">
                    <div className="border-l-4 border-gray-400 pl-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Zone 1: Warm-up (50-60% Max HR)</h4>
                      <p className="text-gray-700 mb-2">
                        <strong>Purpose:</strong> Warm-up, cool-down, active recovery. Very comfortable pace where conversation is easy and natural.
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Benefits:</strong> Increases blood flow, prepares muscles for exercise, promotes recovery, helps beginners build exercise tolerance.
                      </p>
                      <p className="text-gray-700">
                        <strong>Examples:</strong> Gentle walking, easy cycling, light swimming. Use before and after harder workouts, or on recovery days.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="text-lg font-bold text-green-900 mb-2">Zone 2: Fat Burning (60-70% Max HR)</h4>
                      <p className="text-gray-700 mb-2">
                        <strong>Purpose:</strong> Aerobic base building, fat metabolism, endurance foundation. Can maintain conversation in full sentences.
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Benefits:</strong> Maximizes fat oxidation, builds aerobic capacity, improves metabolic efficiency, sustainable for long durations (45-120 minutes). This is where most endurance athletes spend 70-80% of training time.
                      </p>
                      <p className="text-gray-700">
                        <strong>Examples:</strong> Steady jogging, moderate cycling, brisk walking. The "all-day pace" where you could theoretically continue for hours.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="text-lg font-bold text-blue-900 mb-2">Zone 3: Aerobic (70-80% Max HR)</h4>
                      <p className="text-gray-700 mb-2">
                        <strong>Purpose:</strong> Cardiovascular fitness, aerobic capacity development. Breathing harder, can speak in short sentences but not comfortably.
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Benefits:</strong> Improves cardiovascular fitness, increases VO2 max, strengthens heart muscle, builds endurance for longer efforts. This is "tempo" pace for many athletes.
                      </p>
                      <p className="text-gray-700">
                        <strong>Examples:</strong> Tempo runs, steady-state cycling, vigorous swimming. Sustainable for 20-60 minutes depending on fitness level.
                      </p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="text-lg font-bold text-orange-900 mb-2">Zone 4: Anaerobic (80-90% Max HR)</h4>
                      <p className="text-gray-700 mb-2">
                        <strong>Purpose:</strong> Lactate threshold training, speed development, anaerobic capacity. Very hard effort, can only speak a few words.
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Benefits:</strong> Increases lactate threshold (ability to sustain hard effort), improves speed, develops anaerobic capacity, enhances performance. Builds mental toughness.
                      </p>
                      <p className="text-gray-700">
                        <strong>Examples:</strong> Interval training (4×5 minutes hard with 3-minute recovery), race pace for 5K-10K, hill repeats. Limited to 20-40 minutes total time in zone.
                      </p>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="text-lg font-bold text-red-900 mb-2">Zone 5: Maximum Effort (90-100% Max HR)</h4>
                      <p className="text-gray-700 mb-2">
                        <strong>Purpose:</strong> Maximum power output, VO2 max development, neuromuscular training. Cannot speak, maximum sustainable effort for short periods.
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Benefits:</strong> Increases VO2 max (maximum oxygen uptake), develops maximum power, improves neuromuscular coordination, mental resilience. Used sparingly due to high stress and long recovery needs.
                      </p>
                      <p className="text-gray-700">
                        <strong>Examples:</strong> Sprint intervals (30 seconds to 2 minutes), racing finish kicks, all-out efforts. Limited to 5-15 minutes total per week for most athletes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-6">How to Apply Heart Rate Training to Your Workouts</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Beginner Training Plan (First 4-6 Weeks)</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Monday/Wednesday/Friday:</strong> 20-30 minutes Zone 2 (60-70%) - Build aerobic base</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Tuesday/Thursday:</strong> Rest or Zone 1 (50-60%) active recovery - 15-20 minutes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Saturday:</strong> 30-45 minutes Zone 2 (60-70%) - Long easy workout</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Sunday:</strong> Complete rest or gentle Zone 1 walking</span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-3">
                        Focus: Build aerobic base and exercise habit before adding intensity. Stay in Zones 1-2 exclusively.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Intermediate Training Plan (After 2-3 Months)</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Monday:</strong> 30-45 minutes Zone 2 (60-70%) easy aerobic</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Tuesday:</strong> Zone 4 intervals (80-90%) - 6×3 minutes hard, 2 minutes easy recovery</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Wednesday:</strong> 30-40 minutes Zone 2 (60-70%) recovery</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Thursday:</strong> 25-30 minutes Zone 3 (70-80%) tempo</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Friday:</strong> Rest or 20-30 minutes Zone 1 (50-60%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Saturday:</strong> 60-75 minutes Zone 2 (60-70%) long run/ride</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Sunday:</strong> Rest or easy Zone 1 activity</span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-3">
                        Focus: 80/20 rule - 80% easy/moderate (Zones 1-3), 20% hard (Zones 4-5). Build speed while maintaining aerobic base.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-purple-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Advanced Training Plan (Experienced Athletes)</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Monday:</strong> 45-60 minutes Zone 2 (60-70%) + 4×30 sec Zone 5 strides</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Tuesday:</strong> Zone 4-5 VO2 max intervals - 5×3 min at 90-95%, 3 min recovery</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Wednesday:</strong> 40-50 minutes Zone 2 recovery with 10 min Zone 3</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Thursday:</strong> Zone 4 threshold - 2×15 min at 80-85%, 5 min recovery</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Friday:</strong> 30-40 minutes Zone 1-2 easy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Saturday:</strong> 90-120 minutes Zone 2 long endurance with 20 min Zone 3</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold mt-1">•</span>
                          <span><strong>Sunday:</strong> 45-60 minutes Zone 1-2 active recovery or rest</span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-3">
                        Focus: Periodized training with specific adaptations. Still follows 80/20 principle but with more sophisticated interval structures.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Heart Rate Monitoring: Tools and Tips</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">📱</span>
                        Chest Strap Monitors (Most Accurate)
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Accuracy:</strong> 95-99% (EKG-level accuracy)
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>How it works:</strong> Measures electrical signals from heartbeats, same technology as medical EKG.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Best for:</strong> Serious training, interval workouts, accurate zone training, high-intensity exercise.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Popular models:</strong> Polar H10, Garmin HRM-Pro, Wahoo TICKR X. Typically $50-100.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-5">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">⌚</span>
                        Wrist-Based Optical Sensors
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        <strong>Accuracy:</strong> 85-95% (varies by conditions)
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>How it works:</strong> Uses LED lights to detect blood flow changes under the skin.
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Best for:</strong> General fitness tracking, all-day monitoring, convenient everyday use, moderate-intensity exercise.
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Limitations:</strong> Less accurate during high-intensity intervals, arm movements, cold weather. Affected by skin tone, tattoos, and fit.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-bold text-blue-900 mb-4">Tips for Accurate Heart Rate Monitoring</h4>
                    <ul className="space-y-2 text-sm text-blue-900">
                      <li className="flex items-start gap-2">
                        <span className="font-bold mt-1">1.</span>
                        <span><strong>Chest straps:</strong> Wet the electrodes before use, ensure snug fit (1-2 fingers can fit), worn just below chest muscles.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold mt-1">2.</span>
                        <span><strong>Wrist sensors:</strong> Wear 1-2 finger widths above wrist bone, snug but not tight, keep arm steady during readings.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold mt-1">3.</span>
                        <span><strong>Warm-up effect:</strong> Heart rate may lag 1-2 minutes when intensity changes. Be patient when entering new zones.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold mt-1">4.</span>
                        <span><strong>Environmental factors:</strong> Heat/humidity increases HR by 10-20 bpm, altitude by 5-15 bpm. Adjust zones accordingly.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold mt-1">5.</span>
                        <span><strong>Update resting HR monthly:</strong> As fitness improves, resting HR decreases. Recalculate zones every 4-6 weeks.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg border border-amber-200 p-8 mb-8">
                  <h3 className="text-2xl font-bold text-amber-900 mb-6">⚠️ Important Safety Considerations</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-5 border border-amber-200">
                      <h4 className="font-bold text-red-700 mb-2">When to Consult a Doctor Before Exercise</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Resting heart rate consistently above 100 bpm or below 40 bpm (unless trained athlete)</li>
                        <li>• History of heart disease, high blood pressure, or cardiovascular conditions</li>
                        <li>• Chest pain, dizziness, or shortness of breath during or after exercise</li>
                        <li>• Irregular heartbeat or palpitations during physical activity</li>
                        <li>• Taking medications that affect heart rate (beta-blockers, etc.)</li>
                        <li>• Age over 40 (men) or 50 (women) starting vigorous exercise program</li>
                        <li>• Chronic health conditions: diabetes, asthma, arthritis, kidney disease</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-amber-200">
                      <h4 className="font-bold text-amber-900 mb-2">Warning Signs to Stop Exercise Immediately</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Chest pain or pressure (especially radiating to arm, jaw, or back)</li>
                        <li>• Severe shortness of breath that doesn't improve with rest</li>
                        <li>• Dizziness, lightheadedness, or feeling faint</li>
                        <li>• Irregular or racing heartbeat that feels abnormal</li>
                        <li>• Nausea or vomiting during exercise</li>
                        <li>• Confusion or inability to focus</li>
                        <li>• Cold sweats or unusual fatigue</li>
                      </ul>
                      <p className="text-sm text-red-700 font-medium mt-3">
                        If you experience any of these symptoms, stop exercising immediately and seek medical attention if symptoms persist.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-amber-200">
                      <h4 className="font-bold text-amber-900 mb-2">Medications That Affect Heart Rate</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        Several medications can significantly affect heart rate during exercise. If you take any of these, consult your doctor before using target heart rate training:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• <strong>Beta-blockers</strong> (for high blood pressure, heart conditions) - Lower max heart rate by 20-30 bpm</li>
                        <li>• <strong>Calcium channel blockers</strong> - May reduce heart rate response to exercise</li>
                        <li>• <strong>Antidepressants</strong> (SSRIs, TCAs) - Can affect heart rate variability</li>
                        <li>• <strong>Stimulants</strong> (ADHD medications) - Increase resting and exercise heart rate</li>
                        <li>• <strong>Thyroid medications</strong> - Affect metabolic rate and heart rate</li>
                      </ul>
                      <p className="text-sm text-gray-700 mt-3">
                        Your doctor can help adjust your target heart rate zones or recommend alternative intensity measures like Rate of Perceived Exertion (RPE).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                  
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">What is target heart rate and why is it important?</h4>
                      <p className="text-gray-700">
                        Target heart rate is the ideal range your heart should beat during exercise for maximum cardiovascular benefit and safety. It ensures you're exercising at the right intensity - not too easy (ineffective) or too hard (potentially dangerous). Training in different heart rate zones produces specific benefits: Zone 2 (60-70%) burns fat efficiently, Zone 3 (70-80%) improves cardiovascular fitness, and Zone 4 (80-90%) builds speed and power. Monitoring your heart rate helps optimize workouts, track fitness improvements, and prevent overtraining.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">How do I calculate my target heart rate zones?</h4>
                      <p className="text-gray-700">
                        The most accurate method is the Karvonen formula: (Max HR - Resting HR) × %Intensity + Resting HR. First, calculate your maximum heart rate (220 - age). Then subtract your resting heart rate (measured first thing in the morning) to get your heart rate reserve (HRR). Multiply HRR by the intensity percentage (e.g., 0.70 for 70%) and add back your resting heart rate. For example, a 30-year-old with 70 bpm resting HR: Max HR = 190, HRR = 120. Zone 3 (70-80%) would be 154-166 bpm.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">What is the difference between the Karvonen formula and the simple percentage method?</h4>
                      <p className="text-gray-700">
                        The simple percentage method (Max HR × percentage) doesn't account for individual fitness levels. The Karvonen formula is more accurate because it uses heart rate reserve (Max HR - Resting HR), which adjusts for your fitness level. Athletes with low resting heart rates (50-60 bpm) get more personalized zones than using just maximum heart rate. For a 30-year-old with 60 bpm resting HR: simple method gives Zone 3 as 133-152 bpm, while Karvonen gives 151-165 bpm - a significant difference that better reflects their fitness level.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Which heart rate zone is best for fat burning?</h4>
                      <p className="text-gray-700">
                        Zone 2 (60-70% of max heart rate) is the classic "fat burning zone" where your body primarily uses fat for fuel. However, higher intensity zones (3-4) burn more total calories, including significant fat calories. For weight loss, the best strategy is mixing both: 70-80% of weekly cardio in Zone 2 for building aerobic base and fat oxidation, plus 20-30% in Zones 3-4 for higher calorie burn. Zone 2 training is also sustainable for longer durations (45-90 minutes), maximizing total fat burned.
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">How accurate are heart rate monitors and fitness trackers?</h4>
                      <p className="text-gray-700">
                        Chest strap heart rate monitors are most accurate (95-99% accuracy), using electrical signals like an EKG. Wrist-based optical sensors (like Apple Watch, Garmin, Fitbit) are 85-95% accurate at rest but can be less accurate during high-intensity exercise, especially with arm movement. Factors affecting wrist sensors: skin tone, tattoos, tight/loose fit, cold temperatures, and arm position. For serious training, use a chest strap. For general fitness tracking, wrist sensors are adequate. Manual pulse checking (60-second count) is reliable if done correctly.
                      </p>
                    </div>

                    <div className="pb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">When should I train in different heart rate zones?</h4>
                      <p className="text-gray-700">
                        Structure your weekly training using the 80/20 rule: 80% easy (Zones 1-2) and 20% hard (Zones 4-5). Monday/Wednesday/Friday: 30-60 minutes Zone 2 (aerobic base building). Tuesday: Zone 4 intervals (4×5 minutes at 80-90% with 3-minute rest). Thursday: Zone 3 tempo run (20-30 minutes at 70-80%). Saturday: Long Zone 2 session (60-90 minutes). Sunday: Zone 1 active recovery or rest. This balance builds endurance without overtraining. Beginners should spend 4-6 weeks in Zones 1-2 before adding high-intensity work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Health & Fitness Calculators
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Link href="/vo2-max-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">VO2 Max Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Measure cardiovascular fitness capacity</p>
                </Link>
                <Link href="/pace-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Running Pace Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate pace and race time predictions</p>
                </Link>
                <Link href="/calorie-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate daily calorie needs for training</p>
                </Link>
                <Link href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Track your body mass index</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

