import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { GradeCalculator } from "@/components/Calculator/GradeCalculator";
import { getUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Grade Calculator (Free, No signup) - Weighted Grade | AICalculator",
  description: "Free grade calculator with no sign-up required. Calculate your weighted grade average, GPA, and letter grade instantly. Free grade calculator with assignment weights, percentage calculations, and academic performance analysis. Perfect for students and teachers.",
  keywords: [
    "grade calculator",
    "free grade calculator",
    "grade calculator no signup",
    "gpa calculator",
    "weighted grade calculator",
    "final grade calculator",
    "class grade calculator",
    "semester grade calculator",
    "assignment grade calculator",
    "test grade calculator",
    "calculate my grade",
    "grade percentage calculator",
    "college grade calculator",
    "high school grade calculator",
    "grading calculator",
    "academic grade calculator",
    "course grade calculator",
  ],
  openGraph: {
    title: "Grade Calculator (Free, No signup) - AICalculator",
    description: "Free grade calculator with no sign-up required. Online grade calculator with weighted averages, GPA conversion, and performance analysis. Calculate your final grade instantly!",
    type: "website",
    url: getUrl('/grade-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grade Calculator (Free, No signup) - AICalculator",
    description: "Free grade calculator with no sign-up required. Calculate your weighted grade average, GPA, and letter grade instantly. Perfect for students and teachers.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/grade-calculator'),
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

export default function GradeCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Grade Calculator",
        "url": getUrl('/grade-calculator'),
        "description": "Free online grade calculator for calculating weighted averages, GPA, and letter grades. Supports multiple assignments with custom weights.",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Weighted grade calculation",
          "GPA conversion (4.0 scale)",
          "Letter grade assignment",
          "Multiple assignment support",
          "Custom weight percentages",
          "Add/remove assignments",
          "Automatic calculations",
          "Performance status analysis",
          "Academic recommendations",
          "Share results",
          "Save as image",
          "Print-friendly format"
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
            "name": "Grade Calculator",
            "item": getUrl('/grade-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my weighted grade?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate a weighted grade: 1) Enter each assignment name and grade percentage, 2) Assign a weight percentage to each assignment (e.g., homework 20%, midterm 30%, final 50%), 3) The calculator multiplies each grade by its weight, sums them up, and divides by total weight. Formula: Weighted Grade = (Grade1 × Weight1 + Grade2 × Weight2 + ...) / Total Weight × 100."
            }
          },
          {
            "@type": "Question",
            "name": "What is the GPA scale used in this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator uses the standard 4.0 GPA scale: A+ (97-100) = 4.0, A (93-96) = 4.0, A- (90-92) = 3.7, B+ (87-89) = 3.3, B (83-86) = 3.0, B- (80-82) = 2.7, C+ (77-79) = 2.3, C (73-76) = 2.0, C- (70-72) = 1.7, D+ (67-69) = 1.3, D (63-66) = 1.0, D- (60-62) = 0.7, F (0-59) = 0.0."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for college courses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! This grade calculator works for high school, college, and university courses. You can customize assignment names and weights to match your syllabus. Whether it's homework (10%), quizzes (20%), midterms (30%), and finals (40%), or any other distribution, simply enter your specific weights and grades."
            }
          },
          {
            "@type": "Question",
            "name": "What if my total weight doesn't equal 100%?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If your total weight doesn't equal 100%, the calculator will still compute a weighted average based on the weights provided. However, you'll see a warning message. For accurate results, ensure your weights add up to 100%. For example, if you have 3 assignments worth 30%, 40%, and 30%, the total is 100%. If incomplete, the calculator proportionally adjusts the calculation."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate what grade I need on my final exam?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate the grade needed on your final: 1) Enter all completed assignments with their actual grades and weights, 2) Enter your final exam weight, 3) Leave the final exam grade at 0, 4) Calculate to see your current grade, 5) Determine your target final grade, 6) Use the formula: Required Final Grade = (Target Grade × Total Weight - Current Weighted Sum) / Final Exam Weight × 100. For example, if you have 70% with 40% remaining on the final and want 80% overall: (80 × 100 - 70 × 60) / 40 = 95% needed on final."
            }
          },
          {
            "@type": "Question",
            "name": "What do the letter grades mean?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Letter grades represent different performance levels: A (90-100%) = Excellent, demonstrating outstanding understanding; B (80-89%) = Good, showing above-average mastery; C (70-79%) = Average, meeting basic requirements; D (60-69%) = Below average, barely passing; F (0-59%) = Failing, not meeting minimum standards. Plus (+) and minus (-) modifiers provide finer distinctions within each grade band."
            }
          },
          {
            "@type": "Question",
            "name": "Can I save and share my grade calculation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! The calculator provides multiple sharing options: 1) Copy Link - generates a URL with your assignments and grades that can be bookmarked or shared, 2) Social Media - share directly to Facebook, Twitter, or WhatsApp, 3) Email - send your calculation via email, 4) Save as Image - download a PNG screenshot of your results, 5) Print - create a printer-friendly version. All your data is preserved in the share link."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the GPA conversion?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The GPA conversion uses the standard 4.0 scale commonly used in the United States. However, note that different schools may use slightly different scales or policies (e.g., some don't give A+ grades, some use different plus/minus cutoffs). Always verify with your institution's specific grading policy. This calculator provides a good estimate, but your school's official GPA may vary based on their unique policies."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Grade Calculator",
        "description": "Step-by-step guide to calculating your weighted grade and GPA",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Assignment Details",
            "text": "Enter each assignment name (e.g., 'Homework', 'Midterm Exam', 'Final Project'). This helps you organize and identify different components of your course grade."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Input Grades",
            "text": "Enter the grade percentage you received for each assignment (0-100%). If you haven't completed an assignment yet, enter 0 or your projected grade."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Assign Weights",
            "text": "Enter the weight percentage for each assignment as specified in your course syllabus. For example, homework might be 20%, midterm 30%, and final exam 50%. Ensure all weights add up to 100%."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Add or Remove Assignments",
            "text": "Use the '+' button to add more assignments or the trash icon to remove any. You can add as many assignments as needed to match your course structure."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Calculate Your Grade",
            "text": "Click the 'Calculate Grade' button. The calculator will display your weighted average percentage, letter grade, GPA, and performance status."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Review Recommendations",
            "text": "Read the personalized recommendations based on your performance level. These suggestions can help you maintain or improve your academic standing."
          }
        ]
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
      <h1 className="sr-only">Grade Calculator - Calculate Weighted Grade Average, GPA, and Letter Grade</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Grade Calculator (Free, No signup)"
        calculatorUrl="/grade-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Grade Calculator Tool">
        <div className="container mx-auto px-4">
          <GradeCalculator />
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Main Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Grade Calculations
            </h2>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              
              {/* What is a Weighted Grade? */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Weighted Grade?</h3>
                <p className="text-gray-700 mb-4">
                  A weighted grade is a grading system where different assignments, tests, or categories are assigned different importance (weights). Instead of treating all assignments equally, weighted grading reflects the varying significance of coursework components.
                </p>
                <p className="text-gray-700 mb-4">
                  For example, in a typical college course:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Homework: 20%</li>
                  <li>Quizzes: 10%</li>
                  <li>Midterm Exam: 30%</li>
                  <li>Final Exam: 40%</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  A student scoring 85% on homework but 95% on the final exam would have a higher overall grade than someone with the reverse scores, because the final exam carries more weight.
                </p>
              </div>

              {/* How to Calculate Weighted Grade */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Calculate Weighted Grade</h3>
                <p className="text-gray-700 mb-4">
                  The formula for calculating a weighted grade is:
                </p>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-4 font-mono text-sm">
                  Weighted Grade = (Grade₁ × Weight₁ + Grade₂ × Weight₂ + ...) / Total Weight × 100
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Example:</strong> If you have:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                  <li>Homework: 85% (weight 20%)</li>
                  <li>Midterm: 78% (weight 30%)</li>
                  <li>Final: 92% (weight 50%)</li>
                </ul>
                <p className="text-gray-700 mb-2">
                  Calculation:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-800">
                  = (85 × 20 + 78 × 30 + 92 × 50) / 100<br />
                  = (1700 + 2340 + 4600) / 100<br />
                  = 86.4%
                </div>
              </div>

              {/* Understanding GPA */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding GPA (Grade Point Average)</h3>
                <p className="text-gray-700 mb-4">
                  GPA (Grade Point Average) is a standardized way of measuring academic achievement in the U.S. education system. The most common scale is the 4.0 scale, where:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">Letter</th>
                        <th className="px-4 py-2 text-left font-semibold">Percentage</th>
                        <th className="px-4 py-2 text-left font-semibold">GPA</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-t"><td className="px-4 py-2">A+, A</td><td className="px-4 py-2">93-100%</td><td className="px-4 py-2">4.0</td></tr>
                      <tr className="border-t bg-gray-50"><td className="px-4 py-2">A-</td><td className="px-4 py-2">90-92%</td><td className="px-4 py-2">3.7</td></tr>
                      <tr className="border-t"><td className="px-4 py-2">B+</td><td className="px-4 py-2">87-89%</td><td className="px-4 py-2">3.3</td></tr>
                      <tr className="border-t bg-gray-50"><td className="px-4 py-2">B</td><td className="px-4 py-2">83-86%</td><td className="px-4 py-2">3.0</td></tr>
                      <tr className="border-t"><td className="px-4 py-2">B-</td><td className="px-4 py-2">80-82%</td><td className="px-4 py-2">2.7</td></tr>
                      <tr className="border-t bg-gray-50"><td className="px-4 py-2">C+</td><td className="px-4 py-2">77-79%</td><td className="px-4 py-2">2.3</td></tr>
                      <tr className="border-t"><td className="px-4 py-2">C</td><td className="px-4 py-2">73-76%</td><td className="px-4 py-2">2.0</td></tr>
                      <tr className="border-t bg-gray-50"><td className="px-4 py-2">C-</td><td className="px-4 py-2">70-72%</td><td className="px-4 py-2">1.7</td></tr>
                      <tr className="border-t"><td className="px-4 py-2">D+</td><td className="px-4 py-2">67-69%</td><td className="px-4 py-2">1.3</td></tr>
                      <tr className="border-t bg-gray-50"><td className="px-4 py-2">D</td><td className="px-4 py-2">60-66%</td><td className="px-4 py-2">1.0</td></tr>
                      <tr className="border-t"><td className="px-4 py-2">F</td><td className="px-4 py-2">0-59%</td><td className="px-4 py-2">0.0</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mt-4 text-sm">
                  <strong>Note:</strong> Some schools use different scales or don't award A+ grades. Always check your institution's specific grading policy. For more information on academic standards, visit the <a href="https://www.ed.gov/college" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">U.S. Department of Education</a>.
                </p>
              </div>

              {/* Common Weighting Systems */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Common Grading Weight Systems</h3>
                <p className="text-gray-700 mb-4">
                  Different courses and institutions use various weighting systems. Here are some common distributions:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Standard College Course:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                      <li>Homework/Assignments: 20%</li>
                      <li>Quizzes: 10%</li>
                      <li>Midterm Exam: 30%</li>
                      <li>Final Exam: 40%</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">High School Course:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                      <li>Homework: 15%</li>
                      <li>Class Participation: 10%</li>
                      <li>Tests/Quizzes: 50%</li>
                      <li>Projects: 15%</li>
                      <li>Final Exam: 10%</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Project-Based Course:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                      <li>Assignments: 20%</li>
                      <li>Mid-term Project: 30%</li>
                      <li>Final Project: 40%</li>
                      <li>Presentation: 10%</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Lab Science Course:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                      <li>Lab Reports: 30%</li>
                      <li>Homework: 15%</li>
                      <li>Midterm: 25%</li>
                      <li>Final Exam: 30%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips for Improving Grades */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tips for Improving Your Grades</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">1. Focus on High-Weight Assignments</h4>
                    <p className="text-sm">If your final exam is worth 40%, prioritize studying for it over a 5% homework assignment. Allocate study time proportionally to assignment weights.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">2. Don't Ignore Low-Weight Items</h4>
                    <p className="text-sm">While focusing on major assignments, don't completely neglect smaller ones. Consistent effort on homework can provide a grade cushion.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">3. Calculate "What If" Scenarios</h4>
                    <p className="text-sm">Use this calculator to determine what grade you need on remaining assignments to achieve your target final grade. This helps with strategic planning.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">4. Track Your Progress</h4>
                    <p className="text-sm">After each graded assignment, update your calculation. This keeps you aware of your standing and motivates improvement.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">5. Understand Your Syllabus</h4>
                    <p className="text-sm">Make sure you accurately know the weight of each component. Some syllabi have policies like "dropping the lowest quiz" which affect calculations.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">6. Seek Help Early</h4>
                    <p className="text-sm">If you're struggling in a high-weight category (like exams), seek tutoring or office hours immediately rather than waiting until it's too late.</p>
                  </div>
                </div>
              </div>

              {/* Grade Requirements by Performance Level */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Grade Requirements by Performance Level</h3>
                <p className="text-gray-700 mb-4">
                  Understanding what each grade level means can help set realistic goals:
                </p>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-700 mb-1">A (90-100%) - Excellent</h4>
                    <p className="text-sm text-gray-700">Demonstrates comprehensive understanding, consistently exceeds expectations, minimal errors, exceptional quality work.</p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-700 mb-1">B (80-89%) - Good</h4>
                    <p className="text-sm text-gray-700">Shows strong understanding, meets and occasionally exceeds expectations, minor errors, above-average quality.</p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-yellow-700 mb-1">C (70-79%) - Average</h4>
                    <p className="text-sm text-gray-700">Demonstrates adequate understanding, meets basic requirements, some errors, satisfactory quality work.</p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-700 mb-1">D (60-69%) - Below Average</h4>
                    <p className="text-sm text-gray-700">Shows limited understanding, barely meets minimum requirements, frequent errors, passing but concerning.</p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-red-700 mb-1">F (0-59%) - Failing</h4>
                    <p className="text-sm text-gray-700">Does not demonstrate minimum understanding, fails to meet basic requirements, extensive errors, unacceptable quality.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                
                {/* FAQ 1 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do I calculate my weighted grade?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      To calculate a weighted grade: 1) Enter each assignment name and grade percentage, 2) Assign a weight percentage to each assignment (e.g., homework 20%, midterm 30%, final 50%), 3) The calculator multiplies each grade by its weight, sums them up, and divides by total weight. Formula: <strong>Weighted Grade = (Grade₁ × Weight₁ + Grade₂ × Weight₂ + ...) / Total Weight × 100</strong>. For example, if you scored 85% on homework (20% weight) and 92% on final (80% weight): (85×20 + 92×80)/100 = 90.6%.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What is the GPA scale used in this calculator?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      This calculator uses the standard 4.0 GPA scale: <strong>A+ (97-100) = 4.0</strong>, <strong>A (93-96) = 4.0</strong>, <strong>A- (90-92) = 3.7</strong>, <strong>B+ (87-89) = 3.3</strong>, <strong>B (83-86) = 3.0</strong>, <strong>B- (80-82) = 2.7</strong>, <strong>C+ (77-79) = 2.3</strong>, <strong>C (73-76) = 2.0</strong>, <strong>C- (70-72) = 1.7</strong>, <strong>D+ (67-69) = 1.3</strong>, <strong>D (63-66) = 1.0</strong>, <strong>D- (60-62) = 0.7</strong>, <strong>F (0-59) = 0.0</strong>. Note that different institutions may use slightly different scales, so verify with your school's policy.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Can I use this calculator for college courses?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Yes! This grade calculator works for <strong>high school, college, and university courses</strong>. You can customize assignment names and weights to match your syllabus. Whether it's homework (10%), quizzes (20%), midterms (30%), and finals (40%), or any other distribution, simply enter your specific weights and grades. The calculator handles any number of assignments and any weight distribution, making it versatile for all academic levels.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What if my total weight doesn't equal 100%?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      If your total weight doesn't equal 100%, the calculator will still compute a weighted average based on the weights provided. However, you'll see a warning message. For accurate results, <strong>ensure your weights add up to 100%</strong>. For example, if you have 3 assignments worth 30%, 40%, and 30%, the total is 100%. If incomplete (e.g., you've only entered assignments totaling 60%), the calculator proportionally adjusts the calculation, but your final grade may change as more assignments are added.
                    </p>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do I calculate what grade I need on my final exam?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      To calculate the grade needed on your final: 1) Enter all completed assignments with their actual grades and weights, 2) Enter your final exam weight, 3) Leave the final exam grade at 0, 4) Calculate to see your current grade, 5) Determine your target final grade, 6) Use the formula: <strong>Required Final Grade = (Target Grade × 100 - Current Weighted Sum) / Final Exam Weight</strong>. Example: If you have 70% weighted average from 60% of coursework and want 80% overall with final worth 40%: (80×100 - 70×60)/40 = 95% needed on final.
                    </p>
                  </div>
                </div>

                {/* FAQ 6 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What do the letter grades mean?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Letter grades represent different performance levels: <strong>A (90-100%) = Excellent</strong>, demonstrating outstanding understanding and exceeding expectations; <strong>B (80-89%) = Good</strong>, showing above-average mastery and strong performance; <strong>C (70-79%) = Average</strong>, meeting basic requirements and demonstrating adequate understanding; <strong>D (60-69%) = Below average</strong>, barely passing with limited understanding; <strong>F (0-59%) = Failing</strong>, not meeting minimum standards. Plus (+) and minus (-) modifiers provide finer distinctions within each grade band (e.g., B+ vs B vs B-).
                    </p>
                  </div>
                </div>

                {/* FAQ 7 */}
                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Can I save and share my grade calculation?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Yes! The calculator provides multiple sharing options: 1) <strong>Copy Link</strong> - generates a URL with your assignments and grades that can be bookmarked or shared with friends/teachers, 2) <strong>Social Media</strong> - share directly to Facebook, Twitter, or WhatsApp, 3) <strong>Email</strong> - send your calculation via email, 4) <strong>Save as Image</strong> - download a PNG screenshot of your results for your records, 5) <strong>Print</strong> - create a printer-friendly version. All your assignment data is preserved in the share link, so recipients can see your exact calculation.
                    </p>
                  </div>
                </div>

                {/* FAQ 8 */}
                <div className="pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How accurate is the GPA conversion?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      The GPA conversion uses the <strong>standard 4.0 scale commonly used in the United States</strong>. However, note that different schools may use slightly different scales or policies. For example, some don't give A+ grades (capping at 4.0), some use different plus/minus cutoffs (e.g., A- starting at 91% vs 90%), and some have weighted vs unweighted GPA systems. This calculator provides a good estimate, but <strong>always verify with your institution's specific grading policy</strong> for official transcripts. Your school's registrar office can provide the authoritative GPA scale.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages, increases, and decreases</p>
                </a>
                <a href="/age-calculator" 
                   className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Age Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate exact age and time differences</p>
                </a>
                <a href="/date-calculator" 
                   className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="font-semibold text-gray-900">Date Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Add or subtract dates, find weekdays</p>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

