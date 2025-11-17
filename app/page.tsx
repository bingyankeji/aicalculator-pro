import { Metadata } from "next";
import { BasicCalculator } from "@/components/Calculator/BasicCalculator";
import { PopularCalculators } from "@/components/Calculator/PopularCalculators";
import { Sidebar } from "@/components/Sidebar";
import { CalculatorList } from "@/components/CalculatorList";
import { SmartSearch } from "@/components/SmartSearch";
import { getTotalCalculatorsDescription } from "@/lib/categoryStats";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculator Online - Free Online Calculator Tools (250+ Calculators)",
  description: "Best free online calculator tools with AI-powered analysis. Access 250+ calculators online including tax, mortgage, loan, BMI, age, percentage, and more. Instant results with detailed explanations and charts. Better than Google calculator with advanced features.",
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
    title: "Calculator Online - Best Free Online Calculator (250+ Tools)",
    description: "The best online calculator with 250+ free tools. Tax, mortgage, loan, BMI, age, percentage calculators and more. More powerful than Google calculator. Instant results with AI analysis, charts, and explanations.",
    type: "website",
    url: "https://aicalculator.pro",
    siteName: "Calculator Online - AICalculator.pro",
    images: [
      {
        url: "https://aicalculator.pro/og-image.png",
        width: 1200,
        height: 630,
        alt: "AICalculator - Free Online Calculator Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Online - 250+ Free Online Calculators",
    description: "Best online calculator tools: tax, mortgage, loan, BMI, age, percentage & more. Better than Google calculator with AI analysis and charts.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro",
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
        "name": "Calculator Online - AICalculator.pro",
        "alternateName": ["Online Calculator", "Free Online Calculator", "Calculator Tools", "Web Calculator"],
        "url": "https://aicalculator.pro",
        "description": "Best online calculator with 250+ free tools. More powerful than Google calculator with AI-powered analysis, charts, and detailed explanations for tax, mortgage, loan, BMI, age, percentage, and more.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://aicalculator.pro/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "sameAs": [
          "https://twitter.com/AICalculatorPro",
          "https://facebook.com/AICalculatorPro"
        ]
      },
      {
        "@type": "Organization",
        "name": "AICalculator.pro",
        "url": "https://aicalculator.pro",
        "logo": "https://aicalculator.pro/logo.png",
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
            "url": "https://aicalculator.pro/calculators#financial"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Health & Fitness Calculators",
            "description": "35+ health calculators including BMI, calorie, BMR, and body fat calculators",
            "url": "https://aicalculator.pro/calculators#health"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Math Calculators",
            "description": "50+ math calculators including percentage, fraction, algebra, and geometry calculators",
            "url": "https://aicalculator.pro/calculators#math"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Other Calculators",
            "description": "60+ utility calculators including age, date, time, and unit converters",
            "url": "https://aicalculator.pro/calculators#other"
          }
        ]
      },
      {
        "@type": "CollectionPage",
        "name": "Free Online Calculator Tools",
        "description": "Comprehensive collection of 250+ free calculator tools with AI-powered analysis and instant results",
        "url": "https://aicalculator.pro",
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
        Calculator Online - Best Free Online Calculator with 250+ Tools (Better than Google Calculator)
      </h1>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Section - Professional Tool Site */}
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Calculator Suite
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            {getTotalCalculatorsDescription()} with AI-powered analysis and professional insights. 
            Trusted by professionals for accurate calculations and detailed reporting.
          </p>
          
          {/* Enhanced Search Section */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <SmartSearch enhanced={true} />
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-sm text-gray-500">Popular:</span>
                {['mortgage', 'BMI', 'loan', 'percentage', 'tax'].map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Calculator & Quick Tools */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Calculator */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Basic Calculator
                </h3>
                <p className="text-gray-600">
                  Professional calculator with history and advanced functions
                </p>
              </div>
              <BasicCalculator />
            </div>

            {/* Quick Access Tools */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  🔥 Most Popular Tools
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/mortgage-calculator"
                    className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-200 text-center block cursor-pointer border border-transparent hover:border-blue-300"
                  >
                    <div className="text-2xl mb-1">🏠</div>
                    <div className="text-sm font-medium text-gray-900">Mortgage</div>
                  </Link>
                  <Link
                    href="/bmi-calculator"
                    className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-200 text-center block cursor-pointer border border-transparent hover:border-blue-300"
                  >
                    <div className="text-2xl mb-1">⚖️</div>
                    <div className="text-sm font-medium text-gray-900">BMI</div>
                  </Link>
                  <Link
                    href="/loan-calculator"
                    className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-200 text-center block cursor-pointer border border-transparent hover:border-blue-300"
                  >
                    <div className="text-2xl mb-1">💰</div>
                    <div className="text-sm font-medium text-gray-900">Loan</div>
                  </Link>
                  <Link
                    href="/percentage-calculator"
                    className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-200 text-center block cursor-pointer border border-transparent hover:border-blue-300"
                  >
                    <div className="text-2xl mb-1">%</div>
                    <div className="text-sm font-medium text-gray-900">Percentage</div>
                  </Link>
                </div>
                <Link 
                  href="/calculators"
                  className="block mt-4 text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View All {getTotalCalculatorsDescription()}
                </Link>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  ✨ Why Choose Our Calculators?
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    AI-powered analysis and insights
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Step-by-step explanations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Professional charts and reports
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Mobile-friendly design
                  </li>
                </ul>
              </div>
            </div>
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
