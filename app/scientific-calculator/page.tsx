import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { ScientificCalculator } from '@/components/Calculator/ScientificCalculator';
import { getUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Scientific Calculator (Free, No signup) - Advanced | AICalculator",
  description: "Free scientific calculator with no sign-up required. Includes trig functions (sin, cos, tan), logarithms, exponentials, memory, and history. Supports degrees and radians. Perfect for students and professionals.",
  keywords: [
    "scientific calculator",
    "free scientific calculator",
    "scientific calculator no signup",
    "online scientific calculator",
    "calculator with sin cos tan",
    "trigonometric calculator",
    "logarithm calculator",
    "exponential calculator",
    "advanced calculator",
    "math calculator online",
    "scientific notation calculator",
    "deg rad calculator",
    "memory calculator",
    "engineering calculator",
  ],
  openGraph: {
    title: "Scientific Calculator (Free, No signup) - AICalculator",
    description: "Free scientific calculator with no sign-up required. Powerful online calculator with trigonometry, logarithms, memory functions, and more. Free for students and professionals.",
    type: "website",
    url: getUrl('/scientific-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scientific Calculator (Free, No signup) - AICalculator",
    description: "Free scientific calculator with no sign-up required. Advanced calculator with trig functions, logs, exponentials, and memory for complex calculations.",
  },
  alternates: {
    canonical: getUrl('/scientific-calculator'),
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

export default function ScientificCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Scientific Calculator",
        "url": getUrl('/scientific-calculator'),
        "description": "Advanced online scientific calculator with trigonometric functions, logarithms, exponentials, memory functions, and calculation history. Supports both degree and radian modes for angle measurements.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Trigonometric functions (sin, cos, tan)",
          "Logarithmic functions (log, ln)",
          "Exponential functions (e^x, 10^x, x^2, x^3)",
          "Square root and reciprocal",
          "Factorial calculation",
          "Memory functions (MC, MR, M+, M-)",
          "Angle modes (degrees and radians)",
          "Calculation history (last 20)",
          "Mathematical constants (π, e)",
          "Keyboard support",
          "Scientific notation for large numbers"
        ]
      },
      {
        "@type": "BreadcrumbList",
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
            "name": "Math & Numbers",
            "item": getUrl('/math-numbers')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Scientific Calculator",
            "item": getUrl('/scientific-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a scientific calculator used for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A scientific calculator is used for complex mathematical calculations beyond basic arithmetic. It handles trigonometric functions (sin, cos, tan), logarithms (log, ln), exponentials (e^x, 10^x), roots, powers, and factorials. Essential for students in algebra, trigonometry, calculus, physics, chemistry, and engineering. Also used by professionals in science, finance, and technical fields."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between DEG and RAD mode?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DEG (degrees) and RAD (radians) are angle measurement modes. Degrees divide a circle into 360 parts, while radians use π (about 3.14159) as the unit—a full circle is 2π radians. Use DEG for everyday angles (90°, 180°, 270°) and RAD for calculus and advanced math. Example: sin(90°) in DEG = 1, sin(π/2) in RAD = 1 (same angle, different units)."
            }
          },
          {
            "@type": "Question",
            "name": "How do memory functions (M+, M-, MR, MC) work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Memory functions store numbers for later use. MC (Memory Clear) resets memory to 0. MR (Memory Recall) displays the stored value. M+ (Memory Add) adds the current display to memory. M- (Memory Subtract) subtracts the current display from memory. Example: Calculate 5×3 (=15), press M+, calculate 8×2 (=16), press M+, press MR to see 31 (15+16)."
            }
          },
          {
            "@type": "Question",
            "name": "What's the order of operations in scientific calculations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Scientific calculators follow PEMDAS/BODMAS: Parentheses/Brackets, Exponents/Orders (powers, roots), Multiplication & Division (left to right), Addition & Subtraction (left to right). Functions like sin, log are evaluated first. Example: 2+3×4 = 14 (not 20), sin(30°)+5 = 5.5 (sin first). Always use parentheses for clarity in complex expressions."
            }
          },
          {
            "@type": "Question",
            "name": "When should I use log vs ln?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "log (logarithm base 10) and ln (natural logarithm base e) serve different purposes. Use log for: pH calculations, decibels, Richter scale, and general science where base-10 is standard. Use ln for: exponential growth/decay, compound interest, calculus, and when working with e (2.71828). Example: log(100)=2 because 10²=100; ln(e)=1 because e¹=e. Both are available on our calculator."
            }
          },
          {
            "@type": "Question",
            "name": "Can this scientific calculator replace a physical calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, for most purposes! Our online scientific calculator offers the same core functions as physical calculators: trig functions, logs, exponentials, memory, and history. Advantages: always accessible, free, keyboard support, calculation history, no batteries needed. However, standardized tests (SAT, ACT, AP) may require specific approved physical calculators. For homework, projects, and professional work, our online calculator is perfect."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Scientific Calculator",
        "description": "Complete guide to using advanced scientific calculator functions",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose angle mode",
            "text": "Click DEG/RAD button to switch between degrees and radians for trigonometric functions."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter numbers",
            "text": "Click number buttons or use keyboard to input values. Use decimal point for fractions."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Apply functions",
            "text": "Click function buttons (sin, cos, log, etc.) to apply to current display value."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Use memory",
            "text": "Store values with M+/M-, recall with MR, clear with MC for complex calculations."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "View history",
            "text": "Click 'Show History' to see previous calculations and reuse results."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Calculate result",
            "text": "Press = or Enter to evaluate expressions and see results."
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
      
      <h1 className="sr-only">Scientific Calculator - Free Online Scientific Calculator with Trigonometric Functions | Advanced Math Calculator</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Scientific Calculator (Free, No signup)"
        calculatorUrl="/scientific-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Scientific Calculator Tool">
        <div className="container mx-auto px-4">
          <ScientificCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-gray-50" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Master Scientific Calculations
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scientific Calculator Functions</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Trigonometric Functions</h4>
                    <p className="text-gray-700 text-sm">sin, cos, tan for angle calculations. Essential for geometry, physics, and engineering. Remember to set correct angle mode (DEG/RAD).</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Logarithmic Functions</h4>
                    <p className="text-gray-700 text-sm">log (base 10) and ln (base e). Used in chemistry (pH), sound (decibels), earthquakes (Richter), and exponential growth problems.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Exponential Functions</h4>
                    <p className="text-gray-700 text-sm">e^x, 10^x, x², x³ for growth calculations, compound interest, and scientific notation. Powers of any base available.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Special Functions</h4>
                    <p className="text-gray-700 text-sm">√x (square root), 1/x (reciprocal), n! (factorial), |x| (absolute value), % (percent), and constants π & e.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Common Use Cases</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">📐</span>
                    <div>
                      <strong className="text-gray-900">Trigonometry:</strong>
                      <p className="text-gray-700 text-sm">Calculate angles, sides of triangles, wave functions, circular motion</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🧪</span>
                    <div>
                      <strong className="text-gray-900">Chemistry:</strong>
                      <p className="text-gray-700 text-sm">pH calculations, equilibrium constants, half-life decay, concentration</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">⚡</span>
                    <div>
                      <strong className="text-gray-900">Physics:</strong>
                      <p className="text-gray-700 text-sm">Force vectors, energy calculations, wavelengths, projectile motion</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">💰</span>
                    <div>
                      <strong className="text-gray-900">Finance:</strong>
                      <p className="text-gray-700 text-sm">Compound interest, exponential growth, logarithmic charts, NPV calculations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">📊</span>
                    <div>
                      <strong className="text-gray-900">Statistics:</strong>
                      <p className="text-gray-700 text-sm">Standard deviation, probability distributions, exponential models</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Degrees vs Radians</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">When to Use DEGREES (DEG):</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Everyday angle measurements</li>
                    <li>• Navigation and surveying</li>
                    <li>• Geometry problems in school</li>
                    <li>• Architecture and construction</li>
                    <li>• When angles given as 30°, 45°, 90°, etc.</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">When to Use RADIANS (RAD):</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Calculus and advanced mathematics</li>
                    <li>• Physics formulas (angular velocity, etc.)</li>
                    <li>• Programming and computer graphics</li>
                    <li>• Trigonometric identities</li>
                    <li>• When angles given as π, π/2, 2π, etc.</li>
                  </ul>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  <strong>Quick conversion:</strong> 180° = π radians | 360° = 2π radians | 90° = π/2 radians
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Calculator Tips & Tricks</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 border-l-4 border-green-500 p-3">
                    <h4 className="font-semibold text-green-900 text-sm">💡 Use Memory for Complex Calculations</h4>
                    <p className="text-green-800 text-xs mt-1">Store intermediate results with M+ instead of writing them down. Saves time and reduces errors!</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                    <h4 className="font-semibold text-blue-900 text-sm">💡 Check Your Angle Mode</h4>
                    <p className="text-blue-800 text-xs mt-1">#1 mistake: using wrong angle mode. sin(30°)≠sin(30 rad). Always verify DEG/RAD indicator!</p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-3">
                    <h4 className="font-semibold text-purple-900 text-sm">💡 Use Parentheses Wisely</h4>
                    <p className="text-purple-800 text-xs mt-1">Complex expressions need parentheses: 1/(2+3) ≠ 1/2+3. Group operations clearly.</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                    <h4 className="font-semibold text-orange-900 text-sm">💡 Leverage History Feature</h4>
                    <p className="text-orange-800 text-xs mt-1">View past calculations to spot patterns, reuse results, or check your work. Click any result to reuse it!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is a scientific calculator used for?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      A scientific calculator is used for complex mathematical calculations beyond basic arithmetic. It handles trigonometric functions (sin, cos, tan), 
                      logarithms (log, ln), exponentials (e^x, 10^x), roots, powers, and factorials. Essential for students in algebra, trigonometry, calculus, physics, 
                      chemistry, and engineering. Also used by professionals in science, finance, and technical fields for statistical analysis, scientific notation, 
                      and complex formulas.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What's the difference between DEG and RAD mode?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      DEG (degrees) and RAD (radians) are angle measurement modes. Degrees divide a circle into 360 parts, while radians use π (about 3.14159) as the unit—a 
                      full circle is 2π radians (about 6.28). Use DEG for everyday angles (90°, 180°, 270°) and geometry problems. Use RAD for calculus, physics formulas, 
                      and advanced math. Example: sin(90°) in DEG mode = 1, sin(π/2) in RAD mode = 1 (same angle, different units). Always check your mode before calculating!
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do memory functions (M+, M-, MR, MC) work?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Memory functions store numbers for later use in complex calculations. MC (Memory Clear) resets memory to 0. MR (Memory Recall) displays the stored value. 
                      M+ (Memory Add) adds the current display to memory. M- (Memory Subtract) subtracts the current display from memory. Example workflow: Calculate 5×3 (=15), 
                      press M+ to store 15, calculate 8×2 (=16), press M+ to add 16 to memory (now 31), press MR to see 31 (15+16). Perfect for multi-step calculations!
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What's the order of operations in scientific calculations?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Scientific calculators follow PEMDAS/BODMAS order: Parentheses/Brackets first, then Exponents/Orders (powers, roots), then Multiplication & Division 
                      (left to right), finally Addition & Subtraction (left to right). Special functions like sin, cos, log are evaluated first. Examples: 2+3×4 = 14 (not 20), 
                      because multiplication comes before addition; sin(30°)+5 = 5.5, because sin(30°) is calculated first (=0.5), then added to 5. Always use parentheses 
                      for clarity in complex expressions: (2+3)×4 = 20.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    When should I use log vs ln?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      log (logarithm base 10) and ln (natural logarithm base e≈2.71828) serve different purposes. Use log for: pH calculations in chemistry, decibels in sound, 
                      Richter scale for earthquakes, and general science where base-10 is standard. Use ln for: exponential growth/decay problems, compound interest calculations, 
                      calculus (especially derivatives/integrals), and when working with the natural base e. Examples: log(100)=2 because 10²=100; ln(e)=1 because e¹=e. 
                      Both functions are available on our calculator—choose based on your problem's context.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Can this scientific calculator replace a physical calculator?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Yes, for most purposes! Our online scientific calculator offers the same core functions as physical calculators: trig functions, logs, exponentials, 
                      memory, and calculation history. Advantages: always accessible on any device, completely free, keyboard support for faster input, automatic history 
                      tracking, no batteries needed, and no risk of loss. However, standardized tests (SAT, ACT, AP exams) often require specific approved physical calculators. 
                      For homework, projects, professional work, and general calculations, our online calculator is perfect and actually more convenient than physical ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Math Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages for math problems</p>
                </a>
                <a href="/grade-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Grade Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate weighted grades and GPA</p>
                </a>
                <a href="/age-calculator" 
                   className="block p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Age Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate exact age and time differences</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

