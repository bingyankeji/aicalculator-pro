import { Metadata } from 'next';
import { GPACalculator } from '@/components/Calculator/GPACalculator';

export const metadata: Metadata = {
  title: "GPA Calculator - Free Cumulative GPA Calculator with Target GPA Planner | AICalculator",
  description: "Calculate your GPA with our free GPA calculator. Supports 4.0 and 5.0 scales, multiple courses, target GPA planning, and scholarship eligibility check. Perfect for college students.",
  keywords: ["gpa calculator", "cumulative gpa calculator", "college gpa calculator", "grade point average calculator", "4.0 gpa calculator", "weighted gpa calculator", "target gpa calculator", "gpa calculator college", "calculate gpa", "gpa scale", "semester gpa", "academic standing", "dean's list gpa", "scholarship gpa requirement"],
  openGraph: {
    title: "Free GPA Calculator - Calculate Cumulative GPA & Target Goals",
    description: "Calculate your college GPA with multiple courses. Supports 4.0/5.0 scales, target GPA planning, and scholarship eligibility. Free GPA calculator for students.",
    type: "website",
    url: "https://aicalculator.com/gpa-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator - Cumulative GPA & Target Planner",
    description: "Calculate your college GPA and plan target grades. Free GPA calculator with scholarship eligibility check.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/gpa-calculator",
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

export default function GPACalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "GPA Calculator",
        "url": "https://aicalculator.com/gpa-calculator",
        "description": "Free online GPA calculator to calculate cumulative GPA with multiple courses. Supports 4.0 and 5.0 scales, target GPA planning, and academic standing analysis.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Cumulative GPA calculation",
          "4.0 and 5.0 scale support",
          "Multiple course input",
          "Credit hour weighting",
          "Target GPA calculator",
          "Required GPA calculation",
          "Academic standing assessment",
          "Scholarship eligibility check",
          "Dean's List qualification",
          "Quality points calculation"
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
            "name": "Math & Numbers",
            "item": "https://aicalculator.com/math-numbers"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "GPA Calculator",
            "item": "https://aicalculator.com/gpa-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a good GPA in college?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "On a 4.0 scale, a GPA of 3.0 or higher is generally considered good. A 3.5-3.7 GPA is very good and often qualifies for academic honors. A 3.7-4.0 GPA is excellent and typically qualifies for Dean's List and academic scholarships. Below 2.0 is considered poor and may result in academic probation. Most employers look for a minimum GPA of 3.0, while competitive graduate programs often require 3.5 or higher."
            }
          },
          {
            "@type": "Question",
            "name": "How is GPA calculated in college?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "College GPA is calculated by: 1) Converting each course grade to grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0), 2) Multiplying each course's grade points by its credit hours to get quality points, 3) Adding all quality points together, 4) Dividing total quality points by total credit hours. Formula: GPA = Total Quality Points ÷ Total Credit Hours. For example, an A (4.0) in a 3-credit course = 12 quality points."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between 4.0 and 5.0 GPA scales?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 4.0 scale is the standard unweighted GPA scale where A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. The 5.0 scale is a weighted scale often used for honors, AP, or IB courses, where A=5.0, B=4.0, C=3.0, D=2.0, F=0.0. The 5.0 scale rewards students for taking more challenging courses. Most colleges use the 4.0 scale for admission decisions, but may recalculate high school GPAs to account for course difficulty."
            }
          },
          {
            "@type": "Question",
            "name": "How can I raise my GPA quickly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To raise your GPA quickly: 1) Prioritize courses with more credit hours (they have bigger impact), 2) Focus on improving from C to B or B to A (each letter grade jump significantly helps), 3) Take additional courses if possible, 4) Use the target GPA calculator to see exactly what grades you need, 5) Meet with professors during office hours, 6) Form study groups, 7) Utilize tutoring services. Note: The more credits you've completed, the harder it is to change your GPA significantly."
            }
          },
          {
            "@type": "Question",
            "name": "What GPA do you need for Dean's List?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dean's List requirements vary by college but typically require a GPA of 3.5-3.75 or higher for a semester. Some schools use different thresholds: President's List (3.8-4.0), Dean's List (3.5-3.79), and Honor Roll (3.0-3.49). Requirements may also include completing a minimum number of credit hours (usually 12-15) and having no incomplete grades or academic violations. Check your specific college's academic policies for exact requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get into grad school with a 3.0 GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, but it depends on the program and other factors. A 3.0 GPA meets the minimum requirement for many master's programs, but competitive programs often prefer 3.5+. You can strengthen your application with: strong GRE/GMAT scores, relevant work experience, research experience, compelling personal statement, strong recommendation letters, and upward GPA trend (recent semesters better than earlier ones). Some programs may require a higher GPA in major courses specifically."
            }
          },
          {
            "@type": "Question",
            "name": "How do plus and minus grades affect GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Plus and minus grades create a more granular GPA scale. On a 4.0 scale: A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0. Note that A+ is still 4.0 (not 4.3) at most schools. Not all schools use plus/minus grading, so policies vary. The plus/minus system can help or hurt your GPA depending on your typical performance within each letter grade range."
            }
          },
          {
            "@type": "Question",
            "name": "Do withdrawn or incomplete courses affect GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Withdrawn (W) courses typically do NOT affect your GPA but do appear on your transcript. However, they don't count toward attempted credits, which can affect financial aid and full-time status. Incomplete (I) grades are temporary and should be resolved by a deadline; if not resolved, they often convert to F grades which DO affect GPA. Too many W grades can be a red flag to graduate schools or employers, suggesting poor planning or academic struggles."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Your GPA",
        "description": "Calculate your college GPA in 4 easy steps",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose GPA Scale",
            "text": "Select between 4.0 scale (standard) or 5.0 scale (weighted). Most colleges use the 4.0 scale for cumulative GPA calculation."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Course Information",
            "text": "For each course, enter the course name, letter grade (A, B, C, etc.), and credit hours. Use the plus/minus grades if your school uses that system."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Add All Courses",
            "text": "Click 'Add Course' to include all courses from your semester or cumulative college career. You can add as many courses as needed."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Results",
            "text": "See your cumulative GPA, total credits, quality points, letter grade equivalent, and academic standing. Use the Target GPA calculator to plan future grades."
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
      
      <h1 className="sr-only">GPA Calculator - Free Cumulative GPA Calculator with Target GPA Planning and Scholarship Eligibility</h1>
      
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
              <a href="/math-numbers" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Math & Numbers</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">GPA Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <GPACalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding GPA Calculation
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is GPA?</h3>
                <p className="text-gray-700 mb-4">
                  GPA stands for <strong>Grade Point Average</strong>, a standardized measure of academic achievement used in schools and colleges worldwide. It converts letter grades into numerical values to provide a simple, comparable metric of student performance.
                </p>
                <p className="text-gray-700 mb-4">
                  The most common GPA scale is the 4.0 scale, where A=4.0, B=3.0, C=2.0, D=1.0, and F=0.0. Many schools also use plus/minus modifiers (A- = 3.7, B+ = 3.3) for more granular assessment.
                </p>
                <p className="text-gray-700">
                  <strong>Cumulative GPA</strong> represents your overall academic performance across all semesters, while <strong>Semester GPA</strong> reflects performance in a single term. Both are calculated using the same weighted average method based on credit hours.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why GPA Matters</h3>
                <p className="text-gray-700 mb-4">
                  Your GPA is one of the most important metrics in higher education, affecting numerous opportunities:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Academic Scholarships:</strong> Most require minimum 3.0-3.5 GPA; competitive full-ride scholarships often require 3.8+</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Graduate School Admission:</strong> Master's programs typically require 3.0+; PhD programs often require 3.5+</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Job Opportunities:</strong> Many employers (especially for entry-level) set GPA minimums of 3.0 or 3.5</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Academic Standing:</strong> GPA below 2.0 may result in academic probation or dismissal</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span><strong>Honors and Recognition:</strong> Dean's List (typically 3.5+), Latin honors at graduation (Cum Laude, Magna Cum Laude, Summa Cum Laude)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">GPA Calculation Formula</h3>
                <p className="text-gray-700 mb-4">
                  GPA is calculated using a weighted average based on credit hours. The formula is:
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4 font-mono text-center">
                  <div className="text-lg font-bold text-gray-900">GPA = Total Quality Points ÷ Total Credit Hours</div>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Step-by-step calculation:</strong>
                </p>
                <ol className="space-y-2 text-gray-700 text-sm">
                  <li><strong>1.</strong> Convert each grade to grade points (A=4.0, A-=3.7, B+=3.3, B=3.0, etc.)</li>
                  <li><strong>2.</strong> Multiply grade points by credit hours for each course to get quality points</li>
                  <li><strong>3.</strong> Add all quality points together</li>
                  <li><strong>4.</strong> Add all credit hours together</li>
                  <li><strong>5.</strong> Divide total quality points by total credit hours</li>
                </ol>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="text-sm font-semibold text-gray-900 mb-2">Example:</div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <div>Math 101: A (4.0) × 3 credits = 12 points</div>
                    <div>English 101: B+ (3.3) × 3 credits = 9.9 points</div>
                    <div>History 101: A- (3.7) × 3 credits = 11.1 points</div>
                    <div className="pt-2 border-t border-gray-300 font-semibold">
                      GPA = 33.0 points ÷ 9 credits = 3.67
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">GPA Scales Explained</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">4.0 Scale (Unweighted)</div>
                    <p className="text-sm text-gray-700 mb-3">
                      The standard scale used by most US colleges and universities. All courses are treated equally regardless of difficulty.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-green-50 rounded px-2 py-1">A: 4.0 (93-100%)</div>
                      <div className="bg-green-50 rounded px-2 py-1">A-: 3.7 (90-92%)</div>
                      <div className="bg-blue-50 rounded px-2 py-1">B+: 3.3 (87-89%)</div>
                      <div className="bg-blue-50 rounded px-2 py-1">B: 3.0 (83-86%)</div>
                      <div className="bg-blue-50 rounded px-2 py-1">B-: 2.7 (80-82%)</div>
                      <div className="bg-yellow-50 rounded px-2 py-1">C+: 2.3 (77-79%)</div>
                      <div className="bg-yellow-50 rounded px-2 py-1">C: 2.0 (73-76%)</div>
                      <div className="bg-red-50 rounded px-2 py-1">D: 1.0 (60-69%)</div>
                      <div className="bg-red-50 rounded px-2 py-1">F: 0.0 (0-59%)</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-2">5.0 Scale (Weighted)</div>
                    <p className="text-sm text-gray-700 mb-2">
                      Used primarily for high school honors, AP, and IB courses. Rewards students for taking challenging classes.
                    </p>
                    <p className="text-xs text-gray-600">
                      Each grade is worth 1.0 point more than on the 4.0 scale (A=5.0, B=4.0, etc.). Many colleges recalculate weighted high school GPAs to their own 4.0 scale for admissions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Improving Your GPA</h3>
                <p className="text-gray-700 mb-4">
                  Raising your GPA requires strategic planning, especially if you've already completed many credits. Here are proven strategies:
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">1. Focus on High-Credit Courses</div>
                    <p className="text-sm text-gray-700">A grade in a 4-credit course impacts your GPA more than a 1-credit course. Prioritize studying for classes with more credits.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">2. Target Grade Improvements</div>
                    <p className="text-sm text-gray-700">Use the Target GPA calculator to see exactly what grades you need. Improving from C to B has much more impact than B to B+.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">3. Retake Failed Courses</div>
                    <p className="text-sm text-gray-700">Many schools allow grade replacement where a retake grade replaces the original F in GPA calculation (though both remain on transcript).</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">4. Take Additional Courses</div>
                    <p className="text-sm text-gray-700">Taking more credits (summer courses, extra semester) dilutes previous poor grades if you perform well in new courses.</p>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">5. Use Academic Resources</div>
                    <p className="text-sm text-gray-700">Free tutoring, professor office hours, study groups, and writing centers can significantly improve grades at no extra cost.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Standing Levels</h3>
                <p className="text-gray-700 mb-4">
                  Colleges classify students into academic standing levels based on GPA:
                </p>
                <div className="space-y-3">
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <div className="font-bold text-gray-900 mb-1">Dean's List / Excellent (3.5-4.0)</div>
                    <p className="text-sm text-gray-700">Qualifies for academic honors, scholarship eligibility, and special recognition. May appear on transcript.</p>
                  </div>
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
                    <div className="font-bold text-gray-900 mb-1">Good Standing (3.0-3.49)</div>
                    <p className="text-sm text-gray-700">Solid academic performance. Meets most scholarship and program requirements. Good foundation for graduate school.</p>
                  </div>
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                    <div className="font-bold text-gray-900 mb-1">Satisfactory (2.5-2.99)</div>
                    <p className="text-sm text-gray-700">Acceptable but may limit opportunities. Some majors require higher GPA to remain in program.</p>
                  </div>
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                    <div className="font-bold text-gray-900 mb-1">Academic Warning (2.0-2.49)</div>
                    <p className="text-sm text-gray-700">Below desired level. May receive academic counseling and restrictions on credit load or activities.</p>
                  </div>
                  <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                    <div className="font-bold text-gray-900 mb-1">Academic Probation (&lt;2.0)</div>
                    <p className="text-sm text-gray-700">Serious academic difficulty. Must improve GPA within specified timeframe or face suspension/dismissal.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* GPA Requirements Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">GPA Requirements by Goal</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Goal/Opportunity</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Minimum GPA</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Competitive GPA</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold">Graduate with Honors</td>
                      <td className="px-4 py-3 text-center">3.5</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.7-4.0</td>
                      <td className="px-4 py-3 text-gray-600">Magna/Summa Cum Laude</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Dean's List (Semester)</td>
                      <td className="px-4 py-3 text-center">3.5</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.75+</td>
                      <td className="px-4 py-3 text-gray-600">Varies by school</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Academic Scholarships</td>
                      <td className="px-4 py-3 text-center">3.0</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.5+</td>
                      <td className="px-4 py-3 text-gray-600">Full-ride often requires 3.8+</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Master's Programs</td>
                      <td className="px-4 py-3 text-center">3.0</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.5+</td>
                      <td className="px-4 py-3 text-gray-600">Top programs require 3.7+</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">PhD Programs</td>
                      <td className="px-4 py-3 text-center">3.3</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.7-4.0</td>
                      <td className="px-4 py-3 text-gray-600">Research experience also critical</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Medical/Law School</td>
                      <td className="px-4 py-3 text-center">3.5</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.7-4.0</td>
                      <td className="px-4 py-3 text-gray-600">Highly competitive</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Employer Requirements</td>
                      <td className="px-4 py-3 text-center">3.0</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.5+</td>
                      <td className="px-4 py-3 text-gray-600">Competitive companies</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Good Academic Standing</td>
                      <td className="px-4 py-3 text-center">2.0</td>
                      <td className="px-4 py-3 text-center text-purple-600 font-bold">3.0+</td>
                      <td className="px-4 py-3 text-gray-600">Required to stay enrolled</td>
                    </tr>
                  </tbody>
                </table>
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
                    What is a good GPA in college?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      On a 4.0 scale, a GPA of 3.0 or higher is generally considered good. A 3.5-3.7 GPA is very good and often qualifies for academic honors. A 3.7-4.0 GPA is excellent and typically qualifies for Dean's List and academic scholarships. Below 2.0 is considered poor and may result in academic probation. Most employers look for a minimum GPA of 3.0, while competitive graduate programs often require 3.5 or higher.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How is GPA calculated in college?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      College GPA is calculated by: 1) Converting each course grade to grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0), 2) Multiplying each course's grade points by its credit hours to get quality points, 3) Adding all quality points together, 4) Dividing total quality points by total credit hours. Formula: GPA = Total Quality Points ÷ Total Credit Hours. For example, an A (4.0) in a 3-credit course = 12 quality points.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What's the difference between 4.0 and 5.0 GPA scales?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The 4.0 scale is the standard unweighted GPA scale where A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. The 5.0 scale is a weighted scale often used for honors, AP, or IB courses, where A=5.0, B=4.0, C=3.0, D=2.0, F=0.0. The 5.0 scale rewards students for taking more challenging courses. Most colleges use the 4.0 scale for admission decisions, but may recalculate high school GPAs to account for course difficulty.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How can I raise my GPA quickly?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To raise your GPA quickly: 1) Prioritize courses with more credit hours (they have bigger impact), 2) Focus on improving from C to B or B to A (each letter grade jump significantly helps), 3) Take additional courses if possible, 4) Use the target GPA calculator to see exactly what grades you need, 5) Meet with professors during office hours, 6) Form study groups, 7) Utilize tutoring services. Note: The more credits you've completed, the harder it is to change your GPA significantly.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What GPA do you need for Dean's List?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Dean's List requirements vary by college but typically require a GPA of 3.5-3.75 or higher for a semester. Some schools use different thresholds: President's List (3.8-4.0), Dean's List (3.5-3.79), and Honor Roll (3.0-3.49). Requirements may also include completing a minimum number of credit hours (usually 12-15) and having no incomplete grades or academic violations. Check your specific college's academic policies for exact requirements.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I get into grad school with a 3.0 GPA?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, but it depends on the program and other factors. A 3.0 GPA meets the minimum requirement for many master's programs, but competitive programs often prefer 3.5+. You can strengthen your application with: strong GRE/GMAT scores, relevant work experience, research experience, compelling personal statement, strong recommendation letters, and upward GPA trend (recent semesters better than earlier ones). Some programs may require a higher GPA in major courses specifically.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do plus and minus grades affect GPA?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Plus and minus grades create a more granular GPA scale. On a 4.0 scale: A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0. Note that A+ is still 4.0 (not 4.3) at most schools. Not all schools use plus/minus grading, so policies vary. The plus/minus system can help or hurt your GPA depending on your typical performance within each letter grade range.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Do withdrawn or incomplete courses affect GPA?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Withdrawn (W) courses typically do NOT affect your GPA but do appear on your transcript. However, they don't count toward attempted credits, which can affect financial aid and full-time status. Incomplete (I) grades are temporary and should be resolved by a deadline; if not resolved, they often convert to F grades which DO affect GPA. Too many W grades can be a red flag to graduate schools or employers, suggesting poor planning or academic struggles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl border border-purple-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/grade-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Grade Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate weighted course grades</p>
                </a>
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate grade percentages</p>
                </a>
                <a href="/age-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Age Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate your exact age</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

