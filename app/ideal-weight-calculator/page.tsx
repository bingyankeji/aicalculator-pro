import type { Metadata } from "next";
import IdealWeightCalculator from "@/components/Calculator/IdealWeightCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator - Perfect Body Weight & Health Analysis | AI Calculator",
  description:
    "Free ideal weight calculator using 6 scientific formulas (Robinson, Miller, Devine, Hamwi). Get personalized weight goals, BMI analysis, and health recommendations based on your height, gender, and body frame.",
  keywords: [
    "ideal weight calculator",
    "ideal body weight",
    "target weight calculator",
    "healthy weight calculator",
    "perfect weight calculator",
    "ideal weight formula",
    "robinson formula",
    "devine formula",
    "miller formula",
    "hamwi formula",
    "broca formula",
    "ideal weight for height",
    "healthy weight range",
    "body frame size",
    "weight goal calculator",
    "optimal weight",
    "body type analysis",
    "weight management",
    "health assessment",
    "BMI calculator"
  ],
  openGraph: {
    title: "Ideal Weight Calculator - Scientific Weight Analysis & Health Goals",
    description:
      "Calculate your ideal weight using 6 proven formulas. Get personalized health recommendations and body type analysis for optimal wellness.",
    type: "website",
    url: "https://aicalculator.com/ideal-weight-calculator",
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Weight Calculator - Health & Wellness Tool",
    description:
      "Free ideal weight calculator with body type analysis and health recommendations using scientific formulas.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/ideal-weight-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Ideal Weight Calculator",
      "url": "https://aicalculator.com/ideal-weight-calculator",
      "description": "Advanced ideal weight calculator using 6 scientific formulas including Robinson, Miller, Devine, and Hamwi methods. Provides personalized weight goals, BMI analysis, body type assessment, and health recommendations based on height, gender, and body frame size.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Calculate ideal weight using 6 scientific formulas",
        "Robinson Formula (1983) for clinical applications",
        "Miller Formula (1983) modified Devine method",
        "Devine Formula (1974) for medical dosing",
        "Hamwi Formula (1964) for nutrition planning",
        "Broca Formula for European standards",
        "Lorentz Formula variation",
        "Body frame size adjustments (small, medium, large)",
        "Gender-specific calculations",
        "BMI range analysis",
        "Body type assessment (Ectomorph, Mesomorph, Endomorph)",
        "Health status evaluation",
        "Personalized health recommendations",
        "Weight range calculations",
        "Metric and Imperial unit support",
        "Save and compare multiple analyses",
        "Professional health insights"
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
          "name": "Health & Fitness",
          "item": "https://aicalculator.com/health-fitness"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Ideal Weight Calculator",
          "item": "https://aicalculator.com/ideal-weight-calculator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is ideal body weight and how is it calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideal body weight is the optimal weight range for your height, gender, and body frame that promotes good health and longevity. It's calculated using scientific formulas like Robinson (52kg + 1.9kg per inch over 5ft for men), Miller (56.2kg + 1.41kg per inch over 5ft for men), Devine (50kg + 2.3kg per inch over 5ft for men), and Hamwi (48kg + 2.7kg per inch over 5ft for men). Women have different base weights and increments."
          }
        },
        {
          "@type": "Question",
          "name": "Which ideal weight formula is most accurate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No single formula is universally most accurate as each was developed for specific purposes. Robinson and Miller formulas are widely used in clinical settings, Devine is preferred for medical dosing calculations, Hamwi is traditional in nutrition, and Broca is common in Europe. Our calculator uses all 6 major formulas and provides an average for the most comprehensive assessment."
          }
        },
        {
          "@type": "Question",
          "name": "How does body frame size affect ideal weight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Body frame size significantly impacts ideal weight. Small frame individuals typically weigh 10% less than the calculated ideal weight, while large frame individuals may weigh 10% more while still being healthy. Frame size is determined by bone structure, wrist circumference, and overall skeletal build. Our calculator adjusts all formulas based on your selected frame size."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between ideal weight and healthy weight range?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideal weight is a specific target calculated using scientific formulas, while healthy weight range is a broader span (typically 10-20 pounds) that accounts for individual variations in muscle mass, bone density, and body composition. Our calculator provides both the specific ideal weight and the healthy range based on multiple formulas and frame size adjustments."
          }
        },
        {
          "@type": "Question",
          "name": "How do I determine my body frame size?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Body frame size can be estimated by wrist circumference: For women - small frame: <6 inches, medium: 6-6.25 inches, large: >6.25 inches. For men - small frame: <6.5 inches, medium: 6.5-7.5 inches, large: >7.5 inches. You can also consider your overall bone structure, shoulder width, and how clothes fit. When unsure, medium frame is a safe starting point."
          }
        },
        {
          "@type": "Question",
          "name": "Should I use ideal weight for weight loss goals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideal weight provides a scientifically-based target, but weight loss goals should be personalized and gradual. Aim to lose 1-2 pounds per week and focus on the healthy weight range rather than a specific number. Consider factors like muscle mass, fitness level, and overall health. Always consult healthcare providers for personalized weight management plans, especially if you have medical conditions."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Your Ideal Weight and Set Health Goals",
      "description": "Step-by-step guide to determine your ideal weight using scientific formulas",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Choose Your Measurement System",
          "text": "Select metric (cm, kg) or imperial (feet/inches, pounds) units based on your preference. The calculator automatically converts between systems."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Enter Your Height",
          "text": "Input your height accurately. For imperial, the calculator will display your height in feet and inches format for easy verification."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Select Your Gender",
          "text": "Choose male or female as the formulas use different base weights and increments for each gender to account for physiological differences."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Determine Your Body Frame Size",
          "text": "Select small, medium, or large frame based on your bone structure. This adjusts the ideal weight by ±10% to account for skeletal differences."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Review Your Results",
          "text": "Analyze your ideal weight average, healthy weight range, BMI range, and body type assessment. Use the health recommendations to set realistic goals."
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Save and Track Progress",
          "text": "Save your analysis with a custom name and compare different scenarios or track your progress over time using the comparison feature."
        }
      ]
    }
  ]
} as const;

export default function IdealWeightCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Ideal Weight Calculator - Perfect Body Weight & Health Analysis</h1>
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/health-fitness" className="hover:text-gray-700">Health & Fitness</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Ideal Weight Calculator</span>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IdealWeightCalculator />
          
          {/* Educational Content Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Ideal Body Weight: Science-Based Health Goals
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                Ideal body weight represents the optimal weight range for your height, gender, and body frame 
                that promotes longevity, reduces disease risk, and supports overall health. Unlike simple BMI 
                calculations, ideal weight formulas consider physiological differences and have been refined 
                through decades of medical research and clinical application.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Scientific Formulas for Ideal Weight</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">🏥 Robinson Formula (1983)</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Men:</strong> 52 kg + 1.9 kg per inch over 5 feet</div>
                    <div><strong>Women:</strong> 49 kg + 1.7 kg per inch over 5 feet</div>
                    <div className="text-blue-800 mt-2">
                      <strong>Application:</strong> Widely used in clinical settings and medical practice for general health assessments.
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">💊 Devine Formula (1974)</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Men:</strong> 50 kg + 2.3 kg per inch over 5 feet</div>
                    <div><strong>Women:</strong> 45.5 kg + 2.3 kg per inch over 5 feet</div>
                    <div className="text-green-800 mt-2">
                      <strong>Application:</strong> Preferred for medical dosing calculations and pharmaceutical applications.
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-3">🔬 Miller Formula (1983)</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Men:</strong> 56.2 kg + 1.41 kg per inch over 5 feet</div>
                    <div><strong>Women:</strong> 53.1 kg + 1.36 kg per inch over 5 feet</div>
                    <div className="text-purple-800 mt-2">
                      <strong>Application:</strong> Modified Devine formula with updated coefficients based on modern population data.
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-3">🥗 Hamwi Formula (1964)</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Men:</strong> 48 kg + 2.7 kg per inch over 5 feet</div>
                    <div><strong>Women:</strong> 45.5 kg + 2.2 kg per inch over 5 feet</div>
                    <div className="text-orange-800 mt-2">
                      <strong>Application:</strong> Traditional formula used in nutrition and dietetics for meal planning.
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Body Frame Size and Weight Adjustments</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">📏 Determining Your Body Frame</h4>
                  <p className="text-gray-700 mb-4">
                    Body frame size significantly impacts your ideal weight range. Frame size is determined by bone structure and skeletal build.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <h5 className="font-bold text-gray-900 mb-2">Small Frame</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Wrist: Women &lt;6", Men &lt;6.5"</li>
                        <li>• Narrow shoulders and hips</li>
                        <li>• Delicate bone structure</li>
                        <li>• <strong>Weight adjustment: -10%</strong></li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <h5 className="font-bold text-gray-900 mb-2">Medium Frame</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Wrist: Women 6-6.25", Men 6.5-7.5"</li>
                        <li>• Proportional build</li>
                        <li>• Average bone structure</li>
                        <li>• <strong>Weight adjustment: Standard</strong></li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-300">
                      <h5 className="font-bold text-gray-900 mb-2">Large Frame</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Wrist: Women &gt;6.25", Men &gt;7.5"</li>
                        <li>• Broad shoulders and hips</li>
                        <li>• Heavy bone structure</li>
                        <li>• <strong>Weight adjustment: +10%</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Body Type Analysis and Health Implications</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-4">🏃 Ectomorph Tendency (Naturally Lean)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-blue-900 mb-2">Characteristics:</h5>
                      <ul className="text-blue-800 space-y-1 text-sm">
                        <li>• Fast metabolism</li>
                        <li>• Difficulty gaining weight</li>
                        <li>• Lean muscle mass</li>
                        <li>• Low body fat percentage</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-900 mb-2">Health Recommendations:</h5>
                      <ul className="text-blue-800 space-y-1 text-sm">
                        <li>• Focus on strength training</li>
                        <li>• Eat frequent, nutrient-dense meals</li>
                        <li>• Include healthy fats and complex carbs</li>
                        <li>• Monitor for underweight health risks</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-4">💪 Mesomorph Tendency (Balanced Build)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-green-900 mb-2">Characteristics:</h5>
                      <ul className="text-green-800 space-y-1 text-sm">
                        <li>• Moderate metabolism</li>
                        <li>• Builds muscle easily</li>
                        <li>• Athletic build potential</li>
                        <li>• Balanced body composition</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-green-900 mb-2">Health Recommendations:</h5>
                      <ul className="text-green-800 space-y-1 text-sm">
                        <li>• Maintain balanced diet and exercise</li>
                        <li>• Combine cardio and strength training</li>
                        <li>• Focus on whole foods</li>
                        <li>• Regular health monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-4">🏋️ Endomorph Tendency (Larger Frame)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-orange-900 mb-2">Characteristics:</h5>
                      <ul className="text-orange-800 space-y-1 text-sm">
                        <li>• Slower metabolism</li>
                        <li>• Gains weight easily</li>
                        <li>• Higher body fat tendency</li>
                        <li>• Solid, sturdy build</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-orange-900 mb-2">Health Recommendations:</h5>
                      <ul className="text-orange-800 space-y-1 text-sm">
                        <li>• Emphasize cardiovascular exercise</li>
                        <li>• Choose low-glycemic foods</li>
                        <li>• Include strength training</li>
                        <li>• Consider professional guidance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Applications and Health Goals</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">🎯 Setting Realistic Weight Goals</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Use the weight range:</strong> Aim for the healthy range rather than a specific number</li>
                    <li>• <strong>Consider body composition:</strong> Muscle weighs more than fat</li>
                    <li>• <strong>Gradual changes:</strong> Aim for 1-2 pounds per week weight loss</li>
                    <li>• <strong>Lifestyle factors:</strong> Include exercise, nutrition, and sleep</li>
                    <li>• <strong>Professional guidance:</strong> Consult healthcare providers for personalized plans</li>
                  </ul>
                  
                  <h4 className="text-lg font-bold text-gray-900">📊 Monitoring Progress</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Regular weigh-ins:</strong> Same time, same conditions</li>
                    <li>• <strong>Body measurements:</strong> Waist, hips, arms</li>
                    <li>• <strong>Health markers:</strong> Blood pressure, cholesterol, blood sugar</li>
                    <li>• <strong>Fitness levels:</strong> Strength, endurance, flexibility</li>
                    <li>• <strong>Overall wellness:</strong> Energy, mood, sleep quality</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">⚠️ Important Considerations</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Individual variation:</strong> Formulas provide estimates, not absolutes</li>
                    <li>• <strong>Age factors:</strong> Metabolism and body composition change with age</li>
                    <li>• <strong>Medical conditions:</strong> Some conditions affect ideal weight</li>
                    <li>• <strong>Pregnancy and breastfeeding:</strong> Different weight considerations apply</li>
                    <li>• <strong>Athletic populations:</strong> Higher muscle mass affects calculations</li>
                  </ul>
                  
                  <h4 className="text-lg font-bold text-gray-900">🏥 When to Seek Professional Help</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Significant weight changes:</strong> Unexplained gains or losses</li>
                    <li>• <strong>Eating disorders:</strong> Unhealthy relationships with food</li>
                    <li>• <strong>Medical conditions:</strong> Diabetes, thyroid issues, heart disease</li>
                    <li>• <strong>Medications:</strong> Drugs that affect weight</li>
                    <li>• <strong>Persistent struggles:</strong> Difficulty reaching or maintaining goals</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-8">
                <h4 className="text-lg font-bold text-yellow-900 mb-4">💡 Key Takeaways for Healthy Weight Management</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li>• <strong>Focus on health, not just weight:</strong> Overall wellness is more important than a number</li>
                    <li>• <strong>Use multiple formulas:</strong> Our calculator averages 6 methods for accuracy</li>
                    <li>• <strong>Consider your frame:</strong> Body structure significantly affects ideal weight</li>
                    <li>• <strong>Set realistic goals:</strong> Gradual, sustainable changes work best</li>
                  </ul>
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li>• <strong>Monitor trends, not daily fluctuations:</strong> Weight varies naturally</li>
                    <li>• <strong>Include strength training:</strong> Muscle mass improves health outcomes</li>
                    <li>• <strong>Prioritize nutrition quality:</strong> What you eat matters more than calories alone</li>
                    <li>• <strong>Get professional support:</strong> Healthcare providers offer personalized guidance</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6">
                Understanding your ideal weight is an important step in health management, but it's just one piece 
                of the wellness puzzle. Use this information as a guide, combined with professional medical advice, 
                to create a comprehensive approach to health that includes proper nutrition, regular exercise, 
                adequate sleep, and stress management for optimal well-being.
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-green-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Health Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/bmi-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">BMI Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate body mass index</p>
              </Link>
              <Link href="/body-fat-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Body Fat Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Estimate body fat percentage</p>
              </Link>
              <Link href="/calorie-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Calorie Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate daily calorie needs</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
