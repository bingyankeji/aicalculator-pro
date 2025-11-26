import { Metadata } from "next";
import { ScientificCalculator } from "@/components/Calculator/ScientificCalculator";
import { PopularCalculators } from "@/components/Calculator/PopularCalculators";
import { Sidebar } from "@/components/Sidebar";
import { CalculatorList } from "@/components/CalculatorList";
import { SmartSearch } from "@/components/SmartSearch";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { getTotalCalculatorsDescription } from "@/lib/categoryStats";
import { getOgImage, getUrl } from "@/config/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AICalculator (Free, No signup) - 250+ Online Calculators",
  description: "Free online calculator with no sign-up required. Access 250+ calculators including tax, mortgage, loan, BMI, age, percentage, and more. Instant results with AI-powered analysis, detailed explanations, and charts. 100% free, unlimited use, no registration needed.",
  keywords: [
    // Top priority: Generic search terms (Google热度 Top 10)
    "calculator online",
    "online calculator",
    "calculator google",
    "free online calculator",
    "online calculator free",
    "web calculator",
    "calculator tools",
    "best online calculator",
    "advanced calculator online",
    "calculator app",
    
    // Google Top 25 - High priority calculator keywords
    "tax calculator",
    "loan calculator",
    "mortgage calculator",
    "age calculator",
    "bmi calculator",
    "interest calculator",
    "time calculator",
    "date calculator",
    "salary calculator",
    "emi calculator",
    "percentage calculator",
    "pay calculator",
    "paycheck calculator",
    "calorie calculator",
    "grade calculator",
    "weight calculator",
    "payment calculator",
    "sip calculator",
    "scientific calculator",
    "income tax calculator",
    "home loan calculator",
    
    // Math calculators
    "math calculator",
    "fraction calculator",
    "algebra calculator",
    "geometry calculator",
    "statistics calculator",
    "graphing calculator",
    "function calculator",
    
    // Financial calculators (extended)
    "auto loan calculator",
    "personal loan calculator",
    "retirement calculator",
    "investment calculator",
    "savings calculator",
    "compound interest calculator",
    "debt calculator",
    "budget calculator",
    "401k calculator",
    "credit card calculator",
    
    // Health & fitness calculators
    "BMR calculator",
    "TDEE calculator",
    "body fat calculator",
    "ideal weight calculator",
    "pregnancy calculator",
    "due date calculator",
    "macro calculator",
    
    // Other popular calculators
    "GPA calculator",
    "tip calculator",
    "unit converter",
    "currency converter",
    "square footage calculator",
    
    // Long-tail keywords
    "free online calculator with history",
    "calculator with steps",
    "smart calculator",
    "AI calculator",
    "calculator with explanations",
    "mobile calculator",
    "calculator for students",
    "calculator for professionals",
  ],
  openGraph: {
    title: "AICalculator (Free, No signup) - 250+ Online Calculators",
    description: "Free online calculator with no sign-up required. 250+ tools including tax, mortgage, loan, BMI, age, percentage calculators and more. More powerful than Google calculator with AI analysis, charts, and instant results. 100% free, unlimited use.",
    type: "website",
    url: getUrl('/'),
    siteName: "Calculator Online - AICalculator.pro",
    images: [
      {
        url: getOgImage('home'),
        width: 1200,
        height: 630,
        alt: "AICalculator - Free Online Calculator Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AICalculator (Free, No signup) - 250+ Online Calculators",
    description: "Free online calculator with no sign-up required. Tax, mortgage, loan, BMI, age, percentage & more. Better than Google calculator with AI analysis, charts, and instant results. 100% free, unlimited use.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/'),
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

export default function HomePage() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "AICalculator - Free Online Calculator (No Sign-up Required)",
        "alternateName": ["Online Calculator", "Free Online Calculator", "Calculator Tools", "Web Calculator", "AICalculator.pro"],
        "url": getUrl('/'),
        "description": "Free online calculator with no sign-up required. 250+ tools with AI-powered analysis, charts, and detailed explanations. More powerful than Google calculator for tax, mortgage, loan, BMI, age, percentage, and more. 100% free, unlimited use.",
        "sameAs": [
          "https://twitter.com/AICalculatorPro",
          "https://facebook.com/AICalculatorPro"
        ]
      },
      {
        "@type": "Organization",
        "name": "AICalculator.pro",
        "url": getUrl('/'),
        "logo": getUrl('/logo.png'),
        "sameAs": [
          "https://twitter.com/AICalculatorPro",
          "https://facebook.com/AICalculatorPro"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "email": "support@aicalculator.pro"
        }
      },
      {
        "@type": "ItemList",
        "name": "Calculator Categories",
        "description": "250+ free online calculators organized by category",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Financial Calculators",
            "description": "80+ financial calculators including mortgage, loan, retirement, and investment calculators",
            "url": getUrl('/calculators#financial')
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Health & Fitness Calculators",
            "description": "35+ health calculators including BMI, calorie, BMR, and body fat calculators",
            "url": getUrl('/calculators#health')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Math Calculators",
            "description": "50+ math calculators including percentage, fraction, algebra, and geometry calculators",
            "url": getUrl('/calculators#math')
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Other Calculators",
            "description": "60+ utility calculators including age, date, time, and unit converters",
            "url": getUrl('/calculators#other')
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Free Online Calculator Tools (No Sign-up Required)",
        "description": "Comprehensive collection of 250+ free calculator tools with no sign-up required. AI-powered analysis, instant results, unlimited use, 100% free.",
        "url": getUrl('/'),
        "isPartOf": {
          "@type": "WebSite",
          "name": "AICalculator.pro"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        AICalculator - Free Online Calculator with No Sign-up Required (250+ Tools, Better than Google Calculator)
      </h1>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Section - Professional Tool Site */}
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Calculator Suite
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold text-sm border border-green-300">
              ✓ 100% Free
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm border border-blue-300">
              ✓ Unlimited Use
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 font-semibold text-sm border border-purple-300">
              ✓ No Sign-up Required
            </span>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            {getTotalCalculatorsDescription()} with AI-powered analysis and professional insights. 
            Trusted by professionals for accurate calculations and detailed reporting.
          </p>
          
          {/* Enhanced Search Section */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <SmartSearch enhanced={true} />
            </div>
          </div>
        </header>

        {/* Main Content: Calculator + Categories */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Basic Calculator */}
            <div className="lg:row-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Basic Calculator
                </h3>
                <p className="text-gray-600">
                  Professional calculator with history and advanced functions
                </p>
              </div>
              <ScientificCalculator />
              </div>
            </div>

            {/* Right: Category Cards */}
            <CategoryShowcase />
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="mt-16 max-w-6xl mx-auto" aria-label="About Our Calculators">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center hidden lg:block">
              Why Use Our Online Calculator? (Better than Google Calculator)
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600">
                  Get intelligent insights and personalized recommendations with every calculation. Our calculators provide detailed explanations and step-by-step breakdowns.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Charts</h3>
                <p className="text-gray-600">
                  Visualize your results with interactive charts and graphs. Compare scenarios, track progress, and make data-driven decisions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600">
                  Real-time calculations with instant feedback. Share results, export as images, or print for your records.
                </p>
              </div>
            </div>

            {/* SEO Text Content */}
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Comprehensive Calculator Collection
              </h3>
              <p className="mb-4">
                Our platform offers over 250 free online calculators covering every aspect of daily life and professional needs. 
                From financial planning with mortgage calculators and loan calculators, to health tracking with BMI calculators 
                and calorie calculators, we provide the tools you need for accurate calculations and smart decision-making.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">💰 Financial Calculators (80+)</h4>
                  <p className="text-sm">
                    Mortgage, loan, retirement, investment, savings, tax, salary, compound interest, debt payoff, 
                    and budget calculators with detailed amortization schedules and affordability analysis.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">🏥 Health & Fitness (35+)</h4>
                  <p className="text-sm">
                    BMI, calorie, BMR, TDEE, body fat, ideal weight, pregnancy, due date, macro, and protein 
                    calculators with personalized health recommendations and progress tracking.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">📐 Math Calculators (50+)</h4>
                  <p className="text-sm">
                    Percentage, fraction, algebra, geometry, statistics, scientific, and equation calculators 
                    with step-by-step solutions and detailed explanations.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">🔧 Utility Tools (60+)</h4>
                  <p className="text-sm">
                    Age, date, time, GPA, grade, tip, unit converter, currency converter, and more with 
                    smart features and instant results.
                  </p>
                </div>
              </div>

              <p className="mb-4">
                Whether you're a student working on homework, a professional planning finances, a homeowner calculating 
                mortgage payments, or someone tracking health goals, our calculators provide accurate, reliable results 
                with AI-powered insights that traditional calculators can't match. All calculators are mobile-optimized, 
                work offline, and feature calculation history for easy reference.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-bold text-gray-900 mb-2">🎓 Perfect For:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Students - Math, science, and academic calculators with detailed solutions</li>
                  <li>Homeowners - Mortgage, property tax, and home improvement calculators</li>
                  <li>Professionals - Financial planning, investment, and business calculators</li>
                  <li>Health Enthusiasts - BMI, calorie, fitness, and nutrition calculators</li>
                  <li>Everyone - Daily utility calculators for time, dates, tips, and conversions</li>
                </ul>
              </div>

              {/* Online Calculator vs Google Calculator */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                Online Calculator vs Google Calculator - Why We're Better
              </h3>
              <p className="mb-4">
                While Google's built-in calculator is convenient for simple arithmetic, our online calculator platform 
                offers significantly more power and features for real-world calculations:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-700 mb-2">❌ Google Calculator Limitations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    <li>Basic arithmetic only (no specialized calculators)</li>
                    <li>No mortgage, loan, or financial planning tools</li>
                    <li>No health calculators (BMI, calories, etc.)</li>
                    <li>No charts, graphs, or visualizations</li>
                    <li>No calculation history or saving results</li>
                    <li>No step-by-step explanations</li>
                    <li>Cannot share or export results</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-900 mb-2">✅ Our Online Calculator Advantages:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
                    <li>250+ specialized calculators for every need</li>
                    <li>Advanced financial calculators with amortization</li>
                    <li>Health & fitness calculators with AI analysis</li>
                    <li>Professional charts and visualizations</li>
                    <li>Save and track calculation history</li>
                    <li>Step-by-step breakdowns and formulas</li>
                    <li>Share results via link, export as image/PDF</li>
                    <li>Mobile-optimized responsive design</li>
                    <li>AI-powered insights and recommendations</li>
                  </ul>
                </div>
              </div>

              <p className="mb-4 text-center font-semibold text-gray-900">
                💡 <strong>Pro Tip:</strong> Use our online calculator for any calculation beyond basic math. 
                Get detailed analysis, save your results, and make better decisions with AI-powered insights.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links for SEO */}
        <section className="mt-12 mb-8">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center hidden lg:block">
              Quick Access to Popular Calculators
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <Link href="/mortgage-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Mortgage Calculator
              </Link>
              <Link href="/loan-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Loan Calculator
              </Link>
              <Link href="/bmi-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                BMI Calculator
              </Link>
              <Link href="/percentage-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Percentage Calculator
              </Link>
              <Link href="/age-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Age Calculator
              </Link>
              <Link href="/date-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Date Calculator
              </Link>
              <Link href="/calorie-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Calorie Calculator
              </Link>
              <Link href="/gpa-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                GPA Calculator
              </Link>
              <Link href="/tip-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Tip Calculator
              </Link>
              <Link href="/grade-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Grade Calculator
              </Link>
              <Link href="/savings-calculator" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Savings Calculator
              </Link>
              <Link href="/calculators" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                View All →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
