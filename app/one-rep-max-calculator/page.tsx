import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import OneRepMaxCalculator from '@/components/Calculator/OneRepMaxCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `One Rep Max (Free, No signup) - 1RM Calculator | AICalculator`,
  description: `Free 1RM calculator with no sign-up required. Estimates your one rep max using 7 validated formulas. Calculate max strength from any weight and reps. Get personalized training plan with percentages for all fitness goals.`,
  keywords: [
    'one rep max calculator',
    'free one rep max calculator',
    'one rep max calculator no signup',
    '1rm calculator',
    'max strength calculator',
    'bench press calculator',
    'squat calculator',
    'deadlift calculator',
    '1 rep max formula',
    'one rep maximum',
    'strength training calculator',
    'powerlifting calculator',
    'epley formula',
    'brzycki formula',
    '1rm test',
    'max lift calculator',
    'training weight calculator',
    'percentage calculator',
    'strength standards',
    'bodyweight ratio',
    '1rm estimation',
    'weightlifting calculator'
  ],
  alternates: {
    canonical: getUrl('/one-rep-max-calculator')
  },
  openGraph: {
    title: `One Rep Max (Free, No signup) - AICalculator`,
    description: `Estimate your 1RM using 7 formulas. Get training weights for strength, hypertrophy, and endurance.`,
    url: getUrl('/one-rep-max-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `One Rep Max (Free, No signup) - AICalculator`,
    description: `Free 1RM calculator with no sign-up required. Calculate max strength from any weight/reps. Get complete training plan with percentages.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function OneRepMaxCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/one-rep-max-calculator'),
        'name': 'One Rep Max Calculator',
        'url': getUrl('/one-rep-max-calculator'),
        'description': `Professional 1RM calculator estimates your one repetition maximum using 7 scientifically validated formulas (Epley, Brzycki, Lander, Lombardi, Mayhew, O'Conner, Wathan). Calculate max strength from any weight and reps (1-12). Get complete training plan with 9 percentage zones for strength, hypertrophy, and endurance goals.`,
        'applicationCategory': 'HealthApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          'Seven 1RM calculation formulas',
          'Support for 5 major lifts (bench, squat, deadlift, overhead press, row)',
          'Weight unit conversion (lbs/kg)',
          'Reps range 1-12 for accuracy',
          'Strength level assessment',
          'Bodyweight ratio calculation',
          'Complete training plan (50-95% of 1RM)',
          'Rep ranges for each percentage',
          'Training purpose guidance',
          'Safety warnings and tips'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/one-rep-max-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/')
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Health & Fitness',
            'item': getUrl('/health-fitness')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'One Rep Max Calculator',
            'item': getUrl('/one-rep-max-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/one-rep-max-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is One Rep Max (1RM)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `One Rep Max (1RM) is the maximum amount of weight you can lift for one complete repetition of an exercise with proper form. It is the gold standard measurement of maximum strength in weightlifting and powerlifting. 1RM is important because it: (1) Measures your absolute maximum strength, (2) Provides a baseline for programming progressive overload, (3) Helps calculate training weights (e.g. 80% of 1RM for 5 reps), (4) Tracks strength progress over time, (5) Compares strength across individuals using bodyweight ratios. Example: If your 1RM bench press is 225 lbs, you can lift 225 lbs for exactly 1 rep with good form, but you cannot lift 230 lbs. Your training might use 180 lbs (80% of 1RM) for sets of 5 reps. Testing actual 1RM is risky and exhausting, so most people use calculators to estimate 1RM from submaximal lifts (e.g. 185 lbs x 5 reps = ~215 lbs 1RM). Our calculator uses 7 validated formulas to provide accurate estimates from any weight and reps combination.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How accurate are 1RM calculators?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `1RM calculators are accurate within ±5-10% when using 1-6 reps, but accuracy decreases beyond 10 reps. Accuracy by rep range: 1-3 reps: ±3-5% (most accurate), tested weight is very close to 1RM. 4-6 reps: ±5-8% (highly accurate), standard for most calculations. 7-10 reps: ±8-12% (moderate), still useful but less precise. 11-15 reps: ±15-20% (low), enters muscular endurance territory. Formula differences: Epley Formula: Best for 1-6 reps, slightly overestimates with higher reps. Brzycki Formula: Better for 7-12 reps, conservative estimate. Lander, Lombardi, etc.: Provide range of estimates; average gives balanced result. Factors affecting accuracy: Lifting experience (novices may have inconsistent form), Muscle fiber type (fast-twitch vs slow-twitch affects rep performance), Fatigue level (fresh vs. tired dramatically changes results), Exercise specificity (compound lifts more predictable than isolation). Best practices for accuracy: Use 3-5 reps for estimation (sweet spot of accuracy and safety), Ensure proper form on test set, Test when fresh (not after exhausting workout), Compare multiple formulas (our calculator shows all 7). Bottom line: Calculators are reliable for programming training weights but should not replace proper 1RM testing for competition preparation. Use them for planning workouts, tracking progress, and avoiding unnecessary max attempts.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are the different 1RM formulas?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `There are 7 main 1RM formulas, each with different mathematical approaches: (1) Epley Formula (1985): 1RM = Weight × (1 + Reps/30). Most popular, slightly optimistic. Best for 1-6 reps. Example: 225 lbs × 5 reps = 225 × (1 + 5/30) = 262.5 lbs. (2) Brzycki Formula (1993): 1RM = Weight × (36 / (37 - Reps)). More conservative, better for higher reps (7-12). Used by many strength coaches. (3) Lander Formula: 1RM = (100 × Weight) / (101.3 - 2.67123 × Reps). Middle ground between Epley and Brzycki. (4) Lombardi Formula (1989): 1RM = Weight × Reps^0.1. Uses exponential calculation, conservative estimates. (5) Mayhew Formula: 1RM = (100 × Weight) / (52.2 + 41.9 × e^(-0.055 × Reps)). Most complex, uses exponential decay. Accurate across rep ranges. (6) O Conner Formula: 1RM = Weight × (1 + Reps/40). Most conservative, good for beginners. (7) Wathan Formula: 1RM = (100 × Weight) / (48.8 + 53.8 × e^(-0.075 × Reps)). Similar to Mayhew, slightly different coefficients. Which to use? Our calculator shows all 7 and recommends: Epley for 1-6 reps, Brzycki for 7-12 reps. The average of all formulas provides a balanced estimate. For training purposes, using any established formula consistently is more important than which specific formula you choose.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do I use my 1RM for training?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Use percentage-based training to program workouts based on your 1RM. Standard percentage zones: 95% 1RM (1-2 reps): Competition testing, peaking phase. Very high CNS demand, use sparingly (1-2x/month). 90% 1RM (2-3 reps): Max strength development, competition prep. High fatigue, need 4-5 min rest between sets. 85% 1RM (3-5 reps): Strength building phase. Standard for powerlifting programs. 3-4 min rest. 80% 1RM (5-6 reps): Strength with some volume. Great for intermediate lifters. 2-3 min rest. 75% 1RM (6-8 reps): Hypertrophy sweet spot. Best for muscle growth. 2-3 min rest. 70% 1RM (8-10 reps): Hypertrophy and work capacity. High volume, moderate intensity. 2 min rest. 65% 1RM (10-12 reps): Muscular endurance with growth. Good for accessory work. 1-2 min rest. 60% 1RM (12-15 reps): Endurance training. Light technique work. 1 min rest. 50% 1RM (15-20 reps): Warm-up, recovery, rehab. Very low fatigue. Sample training week: Monday (Strength): 85% × 5 reps, 5 sets. Wednesday (Hypertrophy): 75% × 8 reps, 4 sets. Friday (Volume): 70% × 10 reps, 3 sets. Progressive overload: When you can do 2+ extra reps at a given weight, increase by 2.5-5% (about 5-10 lbs). Deload: Every 4-6 weeks, reduce to 60-70% for recovery and prevent overtraining. Important: Percentages are guidelines, not absolute rules. Adjust based on daily readiness, fatigue, and recovery. Some days 80% feels like 90%, other days it feels light.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What are strength standards for bench press, squat, and deadlift?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Strength standards compare your 1RM to your bodyweight. Expressed as multiples (e.g. 1.5x bodyweight). Standards vary by gender, age, and exercise. Male strength standards (% of bodyweight): Bench Press: Beginner: 0.5x BW (e.g. 180 lb person benches 90 lbs). Novice: 0.75x BW (135 lbs). Intermediate: 1.0x BW (180 lbs). Advanced: 1.5x BW (270 lbs). Elite: 2.0x+ BW (360+ lbs). Squat: Beginner: 0.75x BW. Novice: 1.0x BW. Intermediate: 1.5x BW. Advanced: 2.0x BW. Elite: 2.5x+ BW. Deadlift: Beginner: 1.0x BW. Novice: 1.25x BW. Intermediate: 1.75x BW. Advanced: 2.5x BW. Elite: 3.0x+ BW. Overhead Press: Beginner: 0.35x BW. Novice: 0.5x BW. Intermediate: 0.75x BW. Advanced: 1.0x BW. Elite: 1.5x+ BW. Female standards (typically 60-70% of male): Bench: Elite = 1.5x BW. Squat: Elite = 2.0x BW. Deadlift: Elite = 2.5x BW. Age adjustments: Under 20: -5-10% (still developing). 20-35: Peak strength years (100% standard). 35-50: 0-5% decline. 50-60: -10-15% expected. 60+: -20-30% natural decline. Example: 180 lb male, 1RM bench 225 lbs: 225/180 = 1.25x bodyweight = Upper Intermediate level. Goal: Progress one level every 6-12 months with consistent training. Note: These are general population standards, not competitive powerlifting (which has much higher requirements). Our calculator automatically assesses your strength level when you enter bodyweight.`
            }
          },
          {
            '@type': 'Question',
            'name': 'Should I test my actual 1RM or use a calculator?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Use calculators for regular training; only test actual 1RM 2-4 times per year or before competition. Pros of calculator estimation: (1) Safer: No risk of injury from maximal attempts. Testing 1RM is high-injury risk, especially without spotter. (2) Less fatigue: Max attempts require 5-7 days recovery. Calculator uses submaximal weight (80-85% range) which you can test more frequently. (3) More accurate for programming: Testing 1RM when tired gives lower number than true max when fresh. (4) Accessible: Can test any time without special preparation or spotters. Cons of calculator: Not competition-accurate: Real 1RM may be 5-10% different than calculated. Technique dependent: Poor form on test set skews results. When to test actual 1RM: Powerlifting competition: Must test true max for meets. Peak week: After 8-12 week training cycle to measure progress. Plateau check: If calculated 1RM seems off after months of training. Motivation: Some people need to see the actual max for psychological boost. How to test safely: Full warm-up: 15 min cardio + dynamic stretching + warm-up sets. Progressive loading: Bar → 50% → 70% → 85% → 95% → 100%. Rest 3-5 minutes between attempts above 90%. Always use spotter for bench press. Use safety bars for squat. Proper technique over ego lifting. Stop if form breaks down. Best approach: Use calculator for weekly/monthly programming. Test actual 1RM only 2-4x per year (every 12-16 weeks). Compare calculated vs. actual when you do test to validate accuracy. This approach maximizes training quality while minimizing injury risk and fatigue.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/one-rep-max-calculator'),
        'name': 'How to Calculate Your One Rep Max',
        'description': 'Step-by-step guide to estimating your maximum strength and creating a training plan',
        'totalTime': 'PT5M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Select Your Exercise',
            'text': `Choose the exercise you want to calculate 1RM for: bench press, squat, deadlift, overhead press, or barbell row.`,
            'url': getStepUrl('/one-rep-max-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter Weight and Reps',
            'text': `Input the weight you successfully lifted and how many reps you completed with good form. For best accuracy, use a weight you can lift 3-6 times.`,
            'url': getStepUrl('/one-rep-max-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Add Bodyweight (Optional)',
            'text': `Enter your bodyweight to get strength level assessment. The calculator will show if you are Beginner, Novice, Intermediate, Advanced, or Elite.`,
            'url': getStepUrl('/one-rep-max-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Review Multiple Formula Results',
            'text': `See your estimated 1RM from 7 different formulas (Epley, Brzycki, Lander, etc.). The recommended value uses the most accurate formula for your rep range.`,
            'url': getStepUrl('/one-rep-max-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Get Your Training Plan',
            'text': `Review the complete training weight table showing 50-95% of your 1RM with recommended reps and training purposes for each percentage.`,
            'url': getStepUrl('/one-rep-max-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Apply to Your Workouts',
            'text': `Use the calculated percentages to program your workouts. For example, use 85% for strength (3-5 reps) or 75% for hypertrophy (6-8 reps).`,
            'url': getStepUrl('/one-rep-max-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/one-rep-max-calculator'),
        'headline': 'One Rep Max Calculator - Complete 1RM Training Guide',
        'description': `Comprehensive guide to calculating 1RM, understanding strength standards, programming percentage-based training, and maximizing strength gains safely.`,
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'author': {
          '@type': 'Organization',
          'name': process.env.NEXT_PUBLIC_SITE_NAME
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">One Rep Max Calculator - 1RM Strength Calculator</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="One Rep Max Calculator"
        calculatorUrl="/one-rep-max-calculator"
      />

      {/* Calculator Component */}
      <OneRepMaxCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About One Rep Max Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>One Rep Max (1RM) Calculator</strong> is a professional strength training tool that estimates your maximum lifting capacity using 7 scientifically validated formulas. Whether you're a powerlifter, bodybuilder, CrossFit athlete, or general fitness enthusiast, this calculator provides accurate 1RM estimates without the risk and fatigue of actual max testing.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Simply enter the weight you lifted and how many reps you completed, and our calculator will provide your estimated 1RM using Epley, Brzycki, Lander, Lombardi, Mayhew, O'Conner, and Wathan formulas. You'll also receive a complete training plan with 9 percentage zones (50-95%) optimized for different training goals: maximum strength, power, hypertrophy, and muscular endurance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding One Rep Max</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is 1RM?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>One Repetition Maximum (1RM)</strong> is the maximum amount of weight you can lift for exactly one complete repetition with proper form. It's the gold standard measurement of maximum strength in resistance training.
          </p>

          <div className="bg-red-50 rounded-lg p-6 mb-6 border-2 border-red-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Why 1RM Matters</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Measures Absolute Strength:</strong> Provides an objective number for your maximum force production.</li>
              <li><strong>Programs Training:</strong> Allows percentage-based programming (e.g., 80% of 1RM for 5 reps).</li>
              <li><strong>Tracks Progress:</strong> Quarterly 1RM testing shows if your training is working.</li>
              <li><strong>Sets Goals:</strong> Provides clear targets (e.g., "reach 2x bodyweight squat").</li>
              <li><strong>Compares Lifters:</strong> Bodyweight ratios allow fair comparison across weight classes.</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Calculator vs. Actual Testing</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most athletes should use calculators for regular training and only test actual 1RM 2-4 times per year. Here's why:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">✅ Calculator Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Much safer (no injury risk)</li>
                <li>• Can test frequently (weekly)</li>
                <li>• Less fatiguing (use 80-85% weight)</li>
                <li>• No spotter needed</li>
                <li>• Better for programming</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">⚠️ Actual Testing</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• High injury risk</li>
                <li>• Needs 5-7 days recovery</li>
                <li>• Requires spotter/safety equipment</li>
                <li>• Only useful 2-4x per year</li>
                <li>• Needed for competition</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">1RM Calculation Formulas</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Our calculator uses 7 validated formulas. Each has different mathematical approaches and works best for specific rep ranges:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-900 mb-2">1. Epley Formula (1985) ⭐ Most Popular</h4>
              <p className="font-mono text-sm mb-2">1RM = Weight × (1 + Reps / 30)</p>
              <p className="text-sm text-gray-700">Best for: 1-6 reps. Slightly optimistic but widely used in powerlifting.</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <h4 className="font-semibold text-gray-900 mb-2">2. Brzycki Formula (1993) ⭐ Best for High Reps</h4>
              <p className="font-mono text-sm mb-2">1RM = Weight × (36 / (37 - Reps))</p>
              <p className="text-sm text-gray-700">Best for: 7-12 reps. More conservative, preferred by many coaches.</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-2">3-7. Other Formulas</h4>
              <p className="text-sm text-gray-700">Lander, Lombardi, Mayhew, O'Conner, and Wathan provide additional estimates. Our calculator shows all 7 and provides an average for balanced programming.</p>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-semibold text-gray-900 mb-2">📊 Accuracy by Rep Range</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>1-3 reps:</strong> ±3-5% (highly accurate)</li>
              <li>• <strong>4-6 reps:</strong> ±5-8% (very good, recommended)</li>
              <li>• <strong>7-10 reps:</strong> ±8-12% (moderate)</li>
              <li>• <strong>11-15 reps:</strong> ±15-20% (less reliable)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Training with Percentages</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Once you know your 1RM, use percentage-based training to optimize for different goals:
          </p>

          <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">% of 1RM</th>
                  <th className="p-3 text-center">Reps</th>
                  <th className="p-3 text-left">Training Goal</th>
                  <th className="p-3 text-left">Rest Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-3 font-bold text-red-700">95%</td><td className="p-3 text-center">1-2</td><td className="p-3">Max strength / Competition</td><td className="p-3">5 min</td></tr>
                <tr className="border-t bg-gray-50"><td className="p-3 font-bold text-red-700">90%</td><td className="p-3 text-center">2-3</td><td className="p-3">Max strength / Peaking</td><td className="p-3">4-5 min</td></tr>
                <tr className="border-t"><td className="p-3 font-bold text-orange-700">85%</td><td className="p-3 text-center">3-5</td><td className="p-3">Strength training</td><td className="p-3">3-4 min</td></tr>
                <tr className="border-t bg-gray-50"><td className="p-3 font-bold text-orange-700">80%</td><td className="p-3 text-center">5-6</td><td className="p-3">Strength / Power</td><td className="p-3">2-3 min</td></tr>
                <tr className="border-t"><td className="p-3 font-bold text-yellow-700">75%</td><td className="p-3 text-center">6-8</td><td className="p-3">Hypertrophy (muscle growth)</td><td className="p-3">2-3 min</td></tr>
                <tr className="border-t bg-gray-50"><td className="p-3 font-bold text-yellow-700">70%</td><td className="p-3 text-center">8-10</td><td className="p-3">Hypertrophy / Endurance</td><td className="p-3">2 min</td></tr>
                <tr className="border-t"><td className="p-3 font-bold text-green-700">65%</td><td className="p-3 text-center">10-12</td><td className="p-3">Muscular endurance</td><td className="p-3">1-2 min</td></tr>
                <tr className="border-t bg-gray-50"><td className="p-3 font-bold text-green-700">60%</td><td className="p-3 text-center">12-15</td><td className="p-3">Endurance / Warm-up</td><td className="p-3">1 min</td></tr>
                <tr className="border-t"><td className="p-3 font-bold text-blue-700">50%</td><td className="p-3 text-center">15-20</td><td className="p-3">Warm-up / Recovery</td><td className="p-3">30s-1 min</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Sample Training Week</h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>Monday (Strength Day):</strong> 85% × 5 reps, 5 sets, 3-4 min rest</li>
              <li><strong>Wednesday (Hypertrophy Day):</strong> 75% × 8 reps, 4 sets, 2-3 min rest</li>
              <li><strong>Friday (Volume Day):</strong> 70% × 10 reps, 3-4 sets, 2 min rest</li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              Deload every 4-6 weeks: Drop to 60-70% for one week to allow full recovery.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Strength Standards</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Strength standards compare your 1RM to your bodyweight. Here are general population standards for adult males:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-2 border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Level</th>
                  <th className="p-3 text-center">Bench Press</th>
                  <th className="p-3 text-center">Squat</th>
                  <th className="p-3 text-center">Deadlift</th>
                  <th className="p-3 text-center">OHP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-3 font-semibold">Beginner</td><td className="p-3 text-center">0.5x BW</td><td className="p-3 text-center">0.75x BW</td><td className="p-3 text-center">1.0x BW</td><td className="p-3 text-center">0.35x BW</td></tr>
                <tr className="border-t bg-gray-50"><td className="p-3 font-semibold">Novice</td><td className="p-3 text-center">0.75x BW</td><td className="p-3 text-center">1.0x BW</td><td className="p-3 text-center">1.25x BW</td><td className="p-3 text-center">0.5x BW</td></tr>
                <tr className="border-t"><td className="p-3 font-semibold">Intermediate</td><td className="p-3 text-center">1.0x BW</td><td className="p-3 text-center">1.5x BW</td><td className="p-3 text-center">1.75x BW</td><td className="p-3 text-center">0.75x BW</td></tr>
                <tr className="border-t bg-gray-50"><td className="p-3 font-semibold">Advanced</td><td className="p-3 text-center">1.5x BW</td><td className="p-3 text-center">2.0x BW</td><td className="p-3 text-center">2.5x BW</td><td className="p-3 text-center">1.0x BW</td></tr>
                <tr className="border-t"><td className="p-3 font-semibold">Elite</td><td className="p-3 text-center">2.0x+ BW</td><td className="p-3 text-center">2.5x+ BW</td><td className="p-3 text-center">3.0x+ BW</td><td className="p-3 text-center">1.5x+ BW</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-gray-600">
            Note: Female standards are typically 60-70% of male standards. These are general population standards, not competitive powerlifting requirements.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Fitness Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/calories-burned-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-semibold text-gray-900 mb-1">Calories Burned</h3>
              <p className="text-sm text-gray-600">Calculate workout calories</p>
            </Link>
            
            <Link 
              href="/bmi-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="font-semibold text-gray-900 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Body mass index</p>
            </Link>
            
            <Link 
              href="/body-fat-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📏</div>
              <h3 className="font-semibold text-gray-900 mb-1">Body Fat Calculator</h3>
              <p className="text-sm text-gray-600">Estimate body fat %</p>
            </Link>

            <Link 
              href="/macro-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🍎</div>
              <h3 className="font-semibold text-gray-900 mb-1">Macro Calculator</h3>
              <p className="text-sm text-gray-600">Macronutrient needs</p>
            </Link>

            <Link 
              href="/tdee-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">TDEE Calculator</h3>
              <p className="text-sm text-gray-600">Total daily energy</p>
            </Link>

            <Link 
              href="/bmr-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-semibold text-gray-900 mb-1">BMR Calculator</h3>
              <p className="text-sm text-gray-600">Basal metabolic rate</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about strength training and 1RM:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://www.strongerbyscience.com/1rm-prediction/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Stronger By Science - 1RM Prediction Research
              </a>
            </li>
            <li>
              <a 
                href="https://www.nsca.com/education/tools-and-resources/strength-standards/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                NSCA - Strength Standards and Testing
              </a>
            </li>
            <li>
              <a 
                href="https://www.bodybuilding.com/fun/1rm-calculator.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Bodybuilding.com - 1RM Calculator Guide
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

