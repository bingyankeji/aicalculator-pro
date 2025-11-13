import { Metadata } from "next";
import { PaceCalculator } from "@/components/Calculator/PaceCalculator";

export const metadata: Metadata = {
  title: "Pace Calculator - Free Running Pace, Time & Distance Calculator for Runners",
  description: "Free pace calculator for runners. Calculate running pace, finish time, or distance. Get split times and race predictions for 5K, 10K, half marathon, and marathon. Perfect for training plans.",
  keywords: [
    "pace calculator",
    "running pace calculator",
    "marathon pace calculator",
    "5k pace calculator",
    "half marathon pace calculator",
    "running time calculator",
    "run pace calculator",
    "calculate pace",
    "running speed calculator",
    "mile pace calculator",
    "km pace calculator",
    "split time calculator",
    "race time predictor",
    "running calculator",
    "jogging pace calculator",
  ],
  openGraph: {
    title: "Free Running Pace Calculator - Calculate Pace, Time & Distance",
    description: "Calculate your running pace, finish time, or distance. Get split times and race predictions for all major race distances.",
    type: "website",
    url: "https://aicalculator.com/pace-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Running Pace Calculator - Plan Your Race Strategy",
    description: "Calculate pace, time, or distance for your runs. Get split times and race predictions instantly.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/pace-calculator",
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

export default function PaceCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Pace Calculator",
        "url": "https://aicalculator.com/pace-calculator",
        "description": "Free online running pace calculator to calculate pace per mile/km, finish time, or distance covered. Get split times and race predictions for 5K, 10K, half marathon, marathon, and ultra distances.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate running pace from distance and time",
          "Calculate finish time from distance and pace",
          "Calculate distance from time and pace",
          "Split times for common distances",
          "Race time predictions (5K, 10K, half marathon, marathon, 50K)",
          "Miles and kilometers support",
          "Speed conversion (mph and km/h)",
          "Free forever, no registration required"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aicalculator.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Calculators",
            "item": "https://aicalculator.com/calculators"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Pace Calculator",
            "item": "https://aicalculator.com/pace-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my running pace?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate running pace, divide your total time by your distance. For example, if you ran 5 miles in 45 minutes, your pace is 45 ÷ 5 = 9 minutes per mile (9:00/mi). The formula is: Pace (min/mile) = Total Time (minutes) ÷ Distance (miles). Our calculator does this automatically and also converts between miles and kilometers, showing your pace in both formats."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good running pace for beginners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A good running pace for beginners is typically 10-12 minutes per mile (6:15-7:30 per km) for easy runs. However, 'good' is relative to your fitness level, age, and experience. Beginners should focus on running at a conversational pace where you can speak full sentences. As you build endurance over 8-12 weeks, your pace will naturally improve. Don't compare yourself to others - consistency matters more than speed when starting out."
            }
          },
          {
            "@type": "Question",
            "name": "What pace should I run a marathon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your marathon pace should be 30-90 seconds per mile slower than your half marathon pace, or 45-60 seconds per mile slower than your 10K pace. For example, if you run a 10K at 8:00/mile pace, target 8:45-9:00/mile for a marathon. Most runners should aim for a pace they can maintain while holding a conversation (60-75% of max heart rate). Use our calculator to predict your marathon time based on recent race performances. First-time marathoners should be conservative - it's better to start slower and finish strong."
            }
          },
          {
            "@type": "Question",
            "name": "How do you convert pace to speed (mph or km/h)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To convert pace to speed, use these formulas: Speed (mph) = 60 ÷ Pace (minutes per mile), or Speed (km/h) = 60 ÷ Pace (minutes per km). For example, a 10:00/mile pace = 60 ÷ 10 = 6.0 mph. An 8:00/mile pace = 60 ÷ 8 = 7.5 mph. Our calculator shows both pace and speed automatically, so you can see your results in whichever format you prefer. Treadmills typically display speed (mph), while runners usually think in terms of pace (min/mile)."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between pace per mile and pace per kilometer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pace per mile is how long it takes to run one mile, while pace per kilometer is how long it takes to run one kilometer. Since 1 mile = 1.60934 kilometers, pace per kilometer is always faster (lower number) than pace per mile. For example, 8:00/mile pace equals approximately 4:58/km pace. American runners typically use miles, while most of the world uses kilometers. Use our calculator to easily convert between both units."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate are race time predictions based on pace?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Race time predictions are reasonably accurate (within 2-5%) if you maintain consistent training and proper race-day pacing. However, accuracy depends on several factors: your training specificity for the target distance, course terrain and weather, your pacing discipline, and race-day nutrition. Predictions work best when extrapolating to similar distances (10K pace predicts half marathon better than marathon). For marathons, add 10-20% to your predicted time if you haven't specifically trained for the distance."
            }
          },
          {
            "@type": "Question",
            "name": "What does negative split mean in running?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A negative split means running the second half of your race faster than the first half. For example, in a marathon, if you run the first 13.1 miles in 2:00:00 and the second 13.1 miles in 1:55:00, that's a negative split. This pacing strategy is considered ideal for most runners because it: conserves energy early, prevents bonking (hitting the wall), allows you to pass struggling runners late in the race, and often results in better overall times. The opposite - starting too fast and slowing down - is called a positive split and should be avoided."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use pace calculator for interval training?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For interval training, calculate your target paces for different workout intensities: Easy pace (conversational, 60-70% effort), Tempo pace (comfortably hard, 80-85% effort, ~25-30 seconds faster than easy pace), Threshold pace (hard but sustainable for 20-60 minutes, ~15-20 seconds faster than tempo), Interval/VO2max pace (very hard, 5K-10K race pace or faster). Use our calculator to determine split times for specific interval distances (e.g., 800m repeats at 5K pace). Track your paces over time to monitor fitness improvements."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Running Pace Calculator",
        "description": "Step-by-step guide to calculating running pace, time, and distance",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Calculation Mode",
            "text": "Select what you want to calculate: Pace (from distance and time), Time (from distance and pace), or Distance (from time and pace). Choose between miles or kilometers based on your preference."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Your Data",
            "text": "Input the known values. For pace calculation: enter your distance and finish time (hours, minutes, seconds). For time calculation: enter distance and target pace. For distance calculation: enter time and pace."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Review Results",
            "text": "See your pace per mile and per kilometer, speed in mph and km/h, split times for common distances, and predicted race times for 5K, 10K, half marathon, marathon, and 50K distances."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">Pace Calculator - Free Running Pace Calculator for Pace, Time and Distance with Split Times and Race Predictions</h1>
      
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
              <a href="/calculators" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Calculators</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Pace Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Pace Calculator Tool">
        <div className="container mx-auto px-4">
          <PaceCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Pace Calculator Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to Running Pace
            </h2>

            {/* Pace Reference Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Running Paces Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Pace Category</th>
                      <th className="px-4 py-3 text-left">Pace (min/mi)</th>
                      <th className="px-4 py-3 text-left">Pace (min/km)</th>
                      <th className="px-4 py-3 text-left">Speed (mph)</th>
                      <th className="px-4 py-3 text-left">5K Time</th>
                      <th className="px-4 py-3 text-left">10K Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold">World Class</td>
                      <td className="px-4 py-3">4:30-5:30</td>
                      <td className="px-4 py-3">2:48-3:25</td>
                      <td className="px-4 py-3">10.9-13.3</td>
                      <td className="px-4 py-3">14:00-17:00</td>
                      <td className="px-4 py-3">28:00-34:00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Competitive</td>
                      <td className="px-4 py-3">6:00-7:30</td>
                      <td className="px-4 py-3">3:44-4:40</td>
                      <td className="px-4 py-3">8.0-10.0</td>
                      <td className="px-4 py-3">18:40-23:20</td>
                      <td className="px-4 py-3">37:20-46:40</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Advanced</td>
                      <td className="px-4 py-3">7:30-9:00</td>
                      <td className="px-4 py-3">4:40-5:36</td>
                      <td className="px-4 py-3">6.7-8.0</td>
                      <td className="px-4 py-3">23:20-28:00</td>
                      <td className="px-4 py-3">46:40-56:00</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Intermediate</td>
                      <td className="px-4 py-3">9:00-11:00</td>
                      <td className="px-4 py-3">5:36-6:50</td>
                      <td className="px-4 py-3">5.5-6.7</td>
                      <td className="px-4 py-3">28:00-34:10</td>
                      <td className="px-4 py-3">56:00-68:20</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Beginner</td>
                      <td className="px-4 py-3">11:00-13:00</td>
                      <td className="px-4 py-3">6:50-8:05</td>
                      <td className="px-4 py-3">4.6-5.5</td>
                      <td className="px-4 py-3">34:10-40:25</td>
                      <td className="px-4 py-3">68:20-80:50</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Casual/Walking</td>
                      <td className="px-4 py-3">13:00-20:00</td>
                      <td className="px-4 py-3">8:05-12:25</td>
                      <td className="px-4 py-3">3.0-4.6</td>
                      <td className="px-4 py-3">40:25-62:00</td>
                      <td className="px-4 py-3">80:50-124:00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Training Paces */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏃 Training Pace Zones</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-green-500 pl-3">
                    <strong className="text-gray-900">Easy/Recovery (60-70% effort)</strong>
                    <p className="text-gray-700">Conversational pace, can speak full sentences. Use for most training runs (70-80% of weekly mileage).</p>
                    <p className="text-green-600 text-xs mt-1">Example: If 5K race pace is 8:00/mi, easy pace is ~10:00-11:00/mi</p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-3">
                    <strong className="text-gray-900">Tempo (75-85% effort)</strong>
                    <p className="text-gray-700">Comfortably hard, can speak short phrases. Improves lactate threshold. Sustainable for 20-60 minutes.</p>
                    <p className="text-yellow-600 text-xs mt-1">Example: If 5K race pace is 8:00/mi, tempo is ~8:30-9:00/mi</p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-3">
                    <strong className="text-gray-900">Threshold (85-90% effort)</strong>
                    <p className="text-gray-700">Hard but controlled, can speak 1-2 words. 10K-Half Marathon race pace. Lasts 15-40 minutes.</p>
                    <p className="text-orange-600 text-xs mt-1">Example: If 5K race pace is 8:00/mi, threshold is ~8:15-8:30/mi</p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-3">
                    <strong className="text-gray-900">Interval/VO2max (90-95% effort)</strong>
                    <p className="text-gray-700">Very hard, gasping for air. 3K-5K race pace. Intervals of 3-8 minutes with rest.</p>
                    <p className="text-red-600 text-xs mt-1">Example: If 5K race pace is 8:00/mi, intervals at 7:30-7:45/mi</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-3">
                    <strong className="text-gray-900">Repetition (95-100% effort)</strong>
                    <p className="text-gray-700">All-out sprint, maximum effort. Mile race pace or faster. Short intervals (30-90 seconds) with full recovery.</p>
                    <p className="text-purple-600 text-xs mt-1">Example: If 5K race pace is 8:00/mi, reps at 6:30-7:00/mi or faster</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏁 Race Day Pacing Strategies</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Even Pace (Recommended)</h4>
                    <p className="text-gray-700 mb-1">Maintain the same pace throughout the race. Best for most runners and distances.</p>
                    <p className="text-xs text-blue-600">✓ Most energy-efficient • Reduces risk of bonking • Easy to execute</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Negative Split (Advanced)</h4>
                    <p className="text-gray-700 mb-1">Run second half 1-3% faster than first half. Ideal for experienced runners.</p>
                    <p className="text-xs text-green-600">✓ Finish strong • Pass competitors late • Optimal for PRs</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Conservative Start</h4>
                    <p className="text-gray-700 mb-1">First mile 10-20 seconds slower than goal pace. Settle into rhythm.</p>
                    <p className="text-xs text-purple-600">✓ Prevents early burnout • Good for nervous runners • Works for all distances</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-red-900 mb-1">Positive Split (Avoid)</h4>
                    <p className="text-gray-700 mb-1">Start too fast, slow down significantly in second half. Common mistake.</p>
                    <p className="text-xs text-red-600">✗ Wastes energy early • Causes "hitting the wall" • Results in slower times</p>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mt-4">
                    <p className="text-xs text-yellow-800">
                      <strong>Golden Rule:</strong> For races longer than 10K, never start faster than goal pace. First mile should feel easy. If you're not sure, slow down!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marathon-Specific Pacing */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🏃‍♂️ Marathon Pacing Guide</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Miles 1-10 (Start Easy)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Run 5-10 seconds slower than goal pace</li>
                    <li>• Should feel very easy, almost slow</li>
                    <li>• Save energy for later miles</li>
                    <li>• Stay behind pace groups if needed</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Miles 11-20 (Settle In)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Hit goal pace, maintain effort</li>
                    <li>• Should still feel controlled</li>
                    <li>• Focus on form and nutrition</li>
                    <li>• This is your "cruise control" phase</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Miles 21-26.2 (Fight Hard)</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Maintain pace, accept discomfort</li>
                    <li>• Mental toughness becomes key</li>
                    <li>• Small slowdown (5-15 sec/mi) is OK</li>
                    <li>• Last mile: empty the tank!</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Marathon Pace Targets by Finish Time:</h4>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">3:00:00 finish →</span>
                    <strong>6:52/mile</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">3:30:00 finish →</span>
                    <strong>8:00/mile</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">4:00:00 finish →</span>
                    <strong>9:09/mile</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">4:30:00 finish →</span>
                    <strong>10:18/mile</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">5:00:00 finish →</span>
                    <strong>11:27/mile</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">6:00:00 finish →</span>
                    <strong>13:44/mile</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Pacing Best Practices</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Train at easy pace:</strong> 70-80% of your runs should be at conversational pace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Use a GPS watch:</strong> Track pace in real-time to avoid going too fast or slow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Practice race pace:</strong> Include goal pace segments in long runs to build confidence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Adjust for terrain:</strong> Expect 5-15 seconds slower per mile on hilly courses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Account for weather:</strong> Slow down 20-30 seconds per mile in heat/humidity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Negative splits win:</strong> Run second half faster than first for best results</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Common Pacing Mistakes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Starting too fast:</strong> Most common mistake - costs you dearly in late miles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Ignoring effort:</strong> Pace varies with terrain, wind, temperature - listen to your body</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>No easy days:</strong> Running every workout hard prevents recovery and adaptation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Comparing to others:</strong> Your optimal pace is unique - don't race in training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Treadmill disconnect:</strong> Treadmill shows speed (mph), not pace - learn conversion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>No pace variety:</strong> Running same pace daily leads to plateaus - vary intensity</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I calculate my running pace?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate running pace, divide your total time by your distance. For example, if you ran 5 miles in 45 minutes, your pace is 45 ÷ 5 = 9 minutes per mile (9:00/mi). The formula is: Pace (min/mile) = Total Time (minutes) ÷ Distance (miles). Our calculator does this automatically and also converts between miles and kilometers, showing your pace in both formats.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is a good running pace for beginners?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A good running pace for beginners is typically 10-12 minutes per mile (6:15-7:30 per km) for easy runs. However, 'good' is relative to your fitness level, age, and experience. Beginners should focus on running at a conversational pace where you can speak full sentences. As you build endurance over 8-12 weeks, your pace will naturally improve. Don't compare yourself to others - consistency matters more than speed when starting out.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What pace should I run a marathon?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Your marathon pace should be 30-90 seconds per mile slower than your half marathon pace, or 45-60 seconds per mile slower than your 10K pace. For example, if you run a 10K at 8:00/mile pace, target 8:45-9:00/mile for a marathon. Most runners should aim for a pace they can maintain while holding a conversation (60-75% of max heart rate). Use our calculator to predict your marathon time based on recent race performances. First-time marathoners should be conservative - it's better to start slower and finish strong.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you convert pace to speed (mph or km/h)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To convert pace to speed, use these formulas: Speed (mph) = 60 ÷ Pace (minutes per mile), or Speed (km/h) = 60 ÷ Pace (minutes per km). For example, a 10:00/mile pace = 60 ÷ 10 = 6.0 mph. An 8:00/mile pace = 60 ÷ 8 = 7.5 mph. Our calculator shows both pace and speed automatically, so you can see your results in whichever format you prefer. Treadmills typically display speed (mph), while runners usually think in terms of pace (min/mile).
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between pace per mile and pace per kilometer?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Pace per mile is how long it takes to run one mile, while pace per kilometer is how long it takes to run one kilometer. Since 1 mile = 1.60934 kilometers, pace per kilometer is always faster (lower number) than pace per mile. For example, 8:00/mile pace equals approximately 4:58/km pace. American runners typically use miles, while most of the world uses kilometers. Use our calculator to easily convert between both units.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How accurate are race time predictions based on pace?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Race time predictions are reasonably accurate (within 2-5%) if you maintain consistent training and proper race-day pacing. However, accuracy depends on several factors: your training specificity for the target distance, course terrain and weather, your pacing discipline, and race-day nutrition. Predictions work best when extrapolating to similar distances (10K pace predicts half marathon better than marathon). For marathons, add 10-20% to your predicted time if you haven't specifically trained for the distance.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What does negative split mean in running?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A negative split means running the second half of your race faster than the first half. For example, in a marathon, if you run the first 13.1 miles in 2:00:00 and the second 13.1 miles in 1:55:00, that's a negative split. This pacing strategy is considered ideal for most runners because it: conserves energy early, prevents bonking (hitting the wall), allows you to pass struggling runners late in the race, and often results in better overall times. The opposite - starting too fast and slowing down - is called a positive split and should be avoided.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do I use pace calculator for interval training?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      For interval training, calculate your target paces for different workout intensities: Easy pace (conversational, 60-70% effort), Tempo pace (comfortably hard, 80-85% effort, ~25-30 seconds faster than easy pace), Threshold pace (hard but sustainable for 20-60 minutes, ~15-20 seconds faster than tempo), Interval/VO2max pace (very hard, 5K-10K race pace or faster). Use our calculator to determine split times for specific interval distances (e.g., 800m repeats at 5K pace). Track your paces over time to monitor fitness improvements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Fitness Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/bmi-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate Body Mass Index</p>
                </a>
                <a href="/calorie-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Calorie Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate daily calorie needs</p>
                </a>
                <a href="/bmr-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">BMR Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate basal metabolic rate</p>
                </a>
                <a href="/body-fat-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Body Fat Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Estimate body fat percentage</p>
                </a>
                <a href="/weight-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Ideal Weight Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Find your ideal weight</p>
                </a>
                <a href="/heart-rate-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Heart Rate Zones</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate training heart rate zones</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">Learn more about running and pacing:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.runnersworld.com/training/a20803133/pace-calculator/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Runner's World: Pace Guide →
                </a>
                <a href="https://www.active.com/running/calculators/pace" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Active.com: Training Paces →
                </a>
                <a href="https://en.wikipedia.org/wiki/Running" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Wikipedia: Running →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

