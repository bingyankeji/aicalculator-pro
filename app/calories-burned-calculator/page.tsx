import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import CaloriesBurnedCalculator from '@/components/Calculator/CaloriesBurnedCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Calories Burned (Free, No signup) - Exercise Calories | AICalculator`,
  description: `Free calories burned calculator with no sign-up required. Estimates energy expenditure for 15+ activities. Calculate calories by exercise type, intensity, duration with MET values. Track weekly/monthly burn and weight loss potential.`,
  keywords: [
    'calories burned calculator',
    'free calories burned calculator',
    'calories burned calculator no signup',
    'calorie burn calculator',
    'exercise calories calculator',
    'how many calories burned',
    'workout calorie calculator',
    'activity calorie calculator',
    'calories burned running',
    'calories burned walking',
    'calories burned cycling',
    'MET calculator',
    'exercise energy expenditure',
    'calorie counter exercise',
    'fitness calorie calculator',
    'weight loss calorie calculator',
    'calories per minute calculator',
    'cardio calorie calculator',
    'workout calories burned',
    'exercise calorie tracker',
    'calorie expenditure calculator',
    'physical activity calories'
  ],
  alternates: {
    canonical: getUrl('/calories-burned-calculator')
  },
  openGraph: {
    title: `Calories Burned (Free, No signup) - AICalculator`,
    description: `Calculate calories burned for any activity with our MET-based calculator. Get weekly projections and food equivalents.`,
    url: getUrl('/calories-burned-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Calories Burned (Free, No signup) - AICalculator`,
    description: `Free calories burned calculator with no sign-up required. Estimate calories burned for running, cycling, swimming and 15+ activities. Track your fitness progress.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function CaloriesBurnedCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/calories-burned-calculator'),
        'name': 'Calories Burned Calculator',
        'url': getUrl('/calories-burned-calculator'),
        'description': `Advanced calories burned calculator estimates energy expenditure for 15+ physical activities using MET (Metabolic Equivalent of Task) values. Calculate calories by exercise type, intensity level, and duration. Get weekly/monthly projections, food equivalents, and weight loss estimates.`,
        'applicationCategory': 'HealthApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          '15+ exercise types (running, cycling, swimming, etc.)',
          'MET-based calorie calculation',
          'Three intensity levels (low, moderate, high)',
          'Weight unit conversion (lbs/kg)',
          'Weekly and monthly projections',
          'Food equivalents visualization',
          'Fat burned estimation',
          'Weight loss potential calculator',
          'Health benefits assessment',
          'Calories per minute tracking'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/calories-burned-calculator'),
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
            'name': 'Calories Burned Calculator',
            'item': getUrl('/calories-burned-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/calories-burned-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How many calories do I burn during exercise?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Calories burned during exercise depend on three main factors: your body weight, exercise intensity (MET value), and duration. Formula: Calories = MET × Weight(kg) × Duration(hours). Examples: A 70kg person burns: 343 calories running at moderate pace (9.8 MET) for 30 minutes. 206 calories walking briskly (3.5 MET) for 60 minutes. 420 calories swimming vigorously (10 MET) for 30 minutes. 245 calories cycling moderately (8 MET) for 30 minutes. Heavier people burn more calories for the same activity because moving more mass requires more energy. Higher intensity activities have higher MET values and burn more calories per minute. Our calculator uses scientifically validated MET values from the Compendium of Physical Activities to provide accurate estimates for 15+ common exercises.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is MET and how does it measure exercise intensity?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `MET (Metabolic Equivalent of Task) is a standardized measure of exercise intensity that compares your energy expenditure during activity to your resting metabolic rate. 1 MET = resting quietly (about 1 calorie per kg per hour). Light activities: 1.5-3 METs (slow walking, light housework, stretching, yoga). Moderate activities: 3-6 METs (brisk walking, light cycling, recreational swimming). Vigorous activities: 6-9 METs (jogging, fast cycling, aerobic dancing, tennis). Very vigorous: 9+ METs (running, competitive sports, fast swimming, jumping rope). Higher MET values mean more intense exercise and more calories burned per minute. Our calculator includes accurate MET values for different intensity levels of each activity. For example, running ranges from 6.0 METs (slow jog) to 12.8 METs (fast running). This allows precise calorie calculations based on your actual workout intensity.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How many calories do I need to burn to lose 1 kg of fat?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To lose 1 kilogram (2.2 pounds) of body fat, you need to create a calorie deficit of approximately 7,700 calories. This can be achieved through exercise, diet, or a combination of both. Examples to burn 7,700 calories through exercise alone: Running at moderate pace (9.8 MET): About 22 hours for a 70kg person. Cycling vigorously (12 MET): About 19 hours for a 70kg person. Swimming moderately (8.3 MET): About 27 hours for a 70kg person. Walking briskly (3.5 MET): About 65 hours for a 70kg person. Realistic approach: Combine exercise with a 500 calorie daily diet reduction = 3,500 calories/week deficit. Add 300 calories burned through exercise 5 days/week = 1,500 calories/week. Total: 5,000 calories/week deficit = 0.65 kg fat loss per week. This sustainable approach results in 2-3 kg fat loss per month, which is healthy and maintainable. Remember: Actual weight loss includes water weight and muscle changes, not just fat loss.`
            }
          },
          {
            '@type': 'Question',
            'name': 'Which exercises burn the most calories?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Calories burned per 30 minutes (for 70kg/154lb person): Highest calorie burners: Jumping rope (high intensity): 450-500 calories (13 MET). Running fast (8+ mph): 420-470 calories (12.8 MET). Boxing/martial arts: 370-420 calories (12 MET). Swimming vigorously: 350 calories (10 MET). Soccer/basketball: 330-385 calories (9-11 MET). Moderate burners: Running moderate: 280-350 calories (9.8 MET). Cycling vigorously: 280-350 calories (8-12 MET). Rowing vigorously: 245-350 calories (7-12 MET). Dancing vigorously: 260 calories (7.5 MET). Tennis: 245 calories (7 MET). Lower intensity (still effective): Brisk walking: 122 calories (3.5 MET). Yoga moderate: 115 calories (3.3 MET). Weight lifting moderate: 175 calories (5 MET). Key insight: While high-intensity exercises burn more calories per minute, the best exercise is one you enjoy and can maintain consistently. A 60-minute moderate walk (244 calories) you do 5 times/week beats a 30-minute intense run (350 calories) you only do once/week.`
            }
          },
          {
            '@type': 'Question',
            'name': 'Is the calorie burn estimate accurate?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Our calculator provides estimates with ±10-20% accuracy for most people, which is the same range as fitness trackers and gym equipment. Accuracy factors: What makes it accurate: Uses scientifically validated MET values from the Compendium of Physical Activities (research-based standard). Accounts for body weight (heavier people burn more). Adjusts for intensity levels (low/moderate/high). Why estimates vary: Individual metabolism differs by 5-15%. Fitness level affects efficiency (fitter people may burn slightly less). Body composition matters (more muscle = higher resting burn). Environmental factors (heat, altitude, terrain). Form and technique impact energy use. Improving accuracy: Choose intensity honestly (many overestimate). Track multiple workouts for patterns. Use with food diary for complete picture. Adjust based on actual weight loss results. Bottom line: While not perfect, MET-based calculations are the gold standard for calorie estimation and much more accurate than guessing. Use as a reliable guide for tracking exercise progress and planning calorie deficits for weight loss.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How often should I exercise to lose weight?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `For weight loss, aim for 150-300 minutes of moderate-intensity exercise per week, or 75-150 minutes of vigorous exercise. Recommended schedule: Beginners: 3-4 days/week, 30-45 minutes moderate intensity (walking, cycling, swimming). Build consistency before intensity. Start with 150 min/week total. Intermediate: 4-5 days/week, 45-60 minutes mixing moderate and vigorous. Include 2 days strength training. 200-250 min/week total. Advanced: 5-6 days/week, 60+ minutes with varied intensity. Add HIIT 1-2x/week. 250-300 min/week total. Example weekly plan for weight loss (70kg person): Monday: 45 min brisk walk (220 cal). Tuesday: 30 min moderate cycling (240 cal). Wednesday: 20 min HIIT/jumping rope (300 cal). Thursday: Rest or light yoga (100 cal). Friday: 45 min jogging (400 cal). Saturday: 60 min swimming (500 cal). Sunday: 30 min weight training (175 cal). Total: ~1,935 calories/week = 0.25 kg fat loss + diet deficit. Key principles: Consistency beats intensity. Mix cardio and strength training. Include rest days for recovery. Combine with 300-500 calorie diet reduction. Track progress and adjust gradually. Realistic goal: 0.5-1 kg fat loss per week is healthy and sustainable long-term.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/calories-burned-calculator'),
        'name': 'How to Calculate Calories Burned During Exercise',
        'description': 'Step-by-step guide to estimating energy expenditure from physical activity',
        'totalTime': 'PT3M',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Enter Your Body Weight',
            'text': `Input your current weight in pounds (lbs) or kilograms (kg). Weight is crucial as heavier individuals burn more calories for the same activity.`,
            'url': getStepUrl('/calories-burned-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Select Exercise Type',
            'text': `Choose from 15+ activities including running, walking, cycling, swimming, weight lifting, and sports. Each activity has unique MET values.`,
            'url': getStepUrl('/calories-burned-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Choose Intensity Level',
            'text': `Select low (easy pace), moderate (breathing faster), or high (hard breathing) intensity. This adjusts the MET value for accurate calculation.`,
            'url': getStepUrl('/calories-burned-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Enter Duration',
            'text': `Input how many minutes you exercised. The calculator will convert this to hours for the MET formula.`,
            'url': getStepUrl('/calories-burned-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Set Workout Frequency',
            'text': `Indicate how many times per week you do this workout for weekly and monthly calorie burn projections.`,
            'url': getStepUrl('/calories-burned-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Review Results',
            'text': `See calories burned, fat loss estimate, food equivalents, weekly/monthly totals, and personalized health benefits. Use for tracking and motivation.`,
            'url': getStepUrl('/calories-burned-calculator', 6)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/calories-burned-calculator'),
        'headline': 'Calories Burned Calculator - Complete Exercise & Activity Guide',
        'description': `Comprehensive guide to calculating calories burned during exercise with MET values, formulas, weight loss strategies, and activity comparisons.`,
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
      <h1 className="sr-only">Calories Burned Calculator - Exercise Calorie Burn & Activity Tracker</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Calories Burned Calculator"
        calculatorUrl="/calories-burned-calculator"
      />

      {/* Calculator Component */}
      <CaloriesBurnedCalculator />

      {/* Educational Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Calories Burned Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Calories Burned Calculator</strong> is a scientifically accurate tool that estimates energy expenditure during physical activity using MET (Metabolic Equivalent of Task) values. Whether you're tracking calories for weight loss, planning workout routines, or monitoring fitness progress, our calculator provides detailed insights for 15+ common exercises and activities.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike simple calorie counters, our calculator adjusts for your body weight, exercise intensity, and duration to provide personalized estimates. You'll also get weekly and monthly projections, food equivalents, fat burn estimates, and health benefits assessment to keep you motivated on your fitness journey.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Calorie Burn Works</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">The MET System</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            MET (Metabolic Equivalent of Task) is the standard unit for measuring exercise intensity. One MET equals the energy you expend at rest (approximately 1 calorie per kilogram of body weight per hour).
          </p>

          <div className="bg-orange-50 rounded-lg p-6 mb-6 border-2 border-orange-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Calorie Burn Formula</h4>
            <p className="font-mono text-lg mb-3 text-orange-900 text-center">
              Calories = MET × Body Weight (kg) × Duration (hours)
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Example:</strong> 70kg person, running at 9.8 MET for 30 minutes:</p>
              <p>Calories = 9.8 × 70 × 0.5 = <strong>343 calories</strong></p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">MET Values by Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">High Intensity (9+ MET)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Running fast: 12.8 MET</li>
                <li>• Jumping rope: 11-13 MET</li>
                <li>• Boxing: 12 MET</li>
                <li>• Swimming vigorous: 10 MET</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">Moderate (3-6 MET)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Brisk walking: 3.5 MET</li>
                <li>• Cycling light: 4 MET</li>
                <li>• Weight lifting: 5 MET</li>
                <li>• Yoga: 3.3 MET</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Comparing Popular Exercises</h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Calories burned in 30 minutes for a 70kg (154 lb) person:
          </p>

          <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Activity</th>
                  <th className="p-3 text-center">MET</th>
                  <th className="p-3 text-right">Calories/30min</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-3">🏃 Running (moderate)</td><td className="p-3 text-center">9.8</td><td className="p-3 text-right font-bold">343</td></tr>
                <tr className="border-t"><td className="p-3">🚴 Cycling (vigorous)</td><td className="p-3 text-center">12.0</td><td className="p-3 text-right font-bold">420</td></tr>
                <tr className="border-t"><td className="p-3">🏊 Swimming (moderate)</td><td className="p-3 text-center">8.3</td><td className="p-3 text-right font-bold">290</td></tr>
                <tr className="border-t"><td className="p-3">🚶 Walking (brisk)</td><td className="p-3 text-center">3.5</td><td className="p-3 text-right font-bold">122</td></tr>
                <tr className="border-t"><td className="p-3">🏋️ Weight lifting</td><td className="p-3 text-center">5.0</td><td className="p-3 text-right font-bold">175</td></tr>
                <tr className="border-t"><td className="p-3">🧘 Yoga (moderate)</td><td className="p-3 text-center">3.3</td><td className="p-3 text-right font-bold">115</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Weight Loss with Exercise</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">The Math of Fat Loss</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            To lose 1 kilogram (2.2 pounds) of body fat, you need to burn approximately 7,700 calories more than you consume.
          </p>

          <div className="bg-green-50 rounded-lg p-6 mb-6 border-2 border-green-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Realistic Weight Loss Plan</h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>Goal:</strong> Lose 0.5 kg per week (healthy, sustainable rate)</p>
              <p><strong>Required deficit:</strong> 3,850 calories/week = 550 calories/day</p>
              <p><strong>Combination approach:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Reduce food intake: 300 calories/day</li>
                <li>Exercise 5x/week: Burn 300 calories per session</li>
                <li>Total daily deficit: 600 calories</li>
                <li><strong>Result: 0.55 kg fat loss per week</strong></li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Exercise Frequency for Results</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Beginners:</strong> 3-4 days/week, 30-45 minutes moderate intensity</li>
            <li><strong>Intermediate:</strong> 4-5 days/week, 45-60 minutes mixed intensity</li>
            <li><strong>Advanced:</strong> 5-6 days/week, 60+ minutes varied workouts</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Health Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/bmr-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-semibold text-gray-900 mb-1">BMR Calculator</h3>
              <p className="text-sm text-gray-600">Calculate basal metabolic rate</p>
            </Link>
            
            <Link 
              href="/tdee-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">TDEE Calculator</h3>
              <p className="text-sm text-gray-600">Total daily energy expenditure</p>
            </Link>
            
            <Link 
              href="/bmi-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 mb-1">BMI Calculator</h3>
              <p className="text-sm text-gray-600">Body mass index calculator</p>
            </Link>

            <Link 
              href="/body-fat-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">📏</div>
              <h3 className="font-semibold text-gray-900 mb-1">Body Fat Calculator</h3>
              <p className="text-sm text-gray-600">Estimate body fat percentage</p>
            </Link>

            <Link 
              href="/macro-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">🍎</div>
              <h3 className="font-semibold text-gray-900 mb-1">Macro Calculator</h3>
              <p className="text-sm text-gray-600">Calculate macronutrient needs</p>
            </Link>

            <Link 
              href="/water-intake-calculator" 
              className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">💧</div>
              <h3 className="font-semibold text-gray-900 mb-1">Water Intake Calculator</h3>
              <p className="text-sm text-gray-600">Daily hydration needs</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <p className="text-gray-700 mb-4">
            For more information about exercise and calories:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a 
                href="https://sites.google.com/site/compendiumofphysicalactivities/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Compendium of Physical Activities - Official MET Values
              </a>
            </li>
            <li>
              <a 
                href="https://www.cdc.gov/physicalactivity/basics/adults/index.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                CDC - Physical Activity Guidelines
              </a>
            </li>
            <li>
              <a 
                href="https://www.hsph.harvard.edu/nutritionsource/calories-burned/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Harvard - Calories Burned in 30 Minutes
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}

