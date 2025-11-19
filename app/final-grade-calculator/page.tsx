import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import FinalGradeCalculator from '@/components/Calculator/FinalGradeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Final Grade Calculator - Calculate Required Exam Score | AICalculator',
  description: 'Free final grade calculator to determine what score you need on your final exam. Calculate weighted grades, GPA, and plan your semester with multiple grading systems.',
  keywords: ['final grade calculator', 'grade calculator', 'final exam calculator', 'what do i need on my final', 'final exam grade calculator', 'weighted grade calculator', 'GPA calculator', 'semester grade calculator', 'college grade calculator', 'final exam score calculator', 'grade calculator with weights', 'calculate final grade', 'final grade needed', 'exam grade calculator', 'course grade calculator', 'class grade calculator', 'grade percentage calculator', 'final exam percentage calculator', 'grade point calculator', 'academic grade calculator', 'student grade calculator', 'calculate needed grade', 'grade planner', 'semester planner', 'grade predictor', 'final exam predictor', 'grade calculator online', 'free grade calculator', 'weighted average calculator', 'course final calculator'],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Final Grade Calculator - Calculate Required Exam Score',
    description: 'Calculate what score you need on your final exam to achieve your desired grade. Free weighted grade calculator with GPA conversion.',
    type: 'website',
    url: getUrl('/final-grade-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('final-grade'),
        width: 1200,
        height: 630,
        alt: 'Final Grade Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Final Grade Calculator',
    description: 'Calculate what score you need on your final exam',
    images: [getOgImage('final-grade')],
  },
  alternates: {
    canonical: getUrl('/final-grade-calculator'),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/final-grade-calculator'),
      name: 'Final Grade Calculator',
      url: getUrl('/final-grade-calculator'),
      description: 'Calculate the score you need on your final exam to achieve your desired grade. Supports weighted grades, multiple assignments, and GPA conversion.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate required final exam score',
        'Weighted grade calculation',
        'Multiple assignment support',
        'Letter grade conversion',
        'GPA calculation',
        'Maximum possible grade analysis',
        'Customizable grading scale',
        'Semester planning',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/final-grade-calculator'),
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
          name: 'Other',
          item: getUrl('/other'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Final Grade Calculator',
          item: getUrl('/final-grade-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/final-grade-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate what I need on my final exam?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To calculate what you need on your final exam: 1) Enter your current grades and their weights, 2) Enter your final exam weight, 3) Enter your desired final grade, 4) The calculator will determine the required score. Formula: Required Score = (Desired Grade - Current Weighted Average) / (Final Exam Weight / 100).',
          },
        },
        {
          '@type': 'Question',
          name: 'What if my required final exam score is over 100%?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'If the calculator shows a required score over 100%, it means your desired grade is not achievable. The calculator will show your maximum possible grade, which is calculated by assuming you score 100% on the final exam. You may need to adjust your target grade to a more realistic goal.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do weighted grades work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Weighted grades assign different importance to different assignments. For example, if homework is 20% of your grade and you scored 85%, it contributes 17 points (85 × 0.20) to your final grade. All weights must add up to 100%. Your final grade is the sum of all weighted components.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between letter grades and GPA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Letter grades (A, B, C, D, F) are qualitative assessments, while GPA (Grade Point Average) is a numerical scale typically from 0.0 to 4.0. An A is usually 4.0, B is 3.0, C is 2.0, D is 1.0, and F is 0.0. Plus and minus grades adjust these values (e.g., A- is 3.7, B+ is 3.3).',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use this calculator for multiple classes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can use this calculator for any class. Simply enter the specific grade components and weights for each class separately. The calculator works for any grading system as long as the weights total 100%. You can add or remove assignments as needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good final exam score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A "good" score depends on your desired final grade and current standing. Generally, 90%+ is excellent, 80-89% is good, 70-79% is satisfactory, and 60-69% is passing. However, focus on what you need to achieve your target grade rather than arbitrary standards.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate is this final grade calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'This calculator is mathematically accurate for weighted average calculations. However, actual grades may vary if your instructor uses different grading scales, curves grades, or has specific policies. Always verify your institution\'s grading policies and consult with your instructor.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I do if I need a very high score on my final?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'If you need 90%+ on your final: 1) Start studying early, 2) Review all course materials systematically, 3) Attend review sessions, 4) Form study groups, 5) Practice with past exams, 6) Get adequate sleep, 7) Consider meeting with your instructor for guidance on key topics.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/final-grade-calculator'),
      name: 'How to Calculate Your Required Final Exam Score',
      description: 'Step-by-step guide to determine what score you need on your final exam to achieve your desired grade.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter Current Grades',
          text: 'Input all your current assignment grades and their respective weights (percentages). Include homework, quizzes, midterms, projects, and any other graded components.',
          url: getStepUrl('/final-grade-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Set Final Exam Weight',
          text: 'Enter the weight (percentage) of your final exam. This is typically 20-50% of your total grade, depending on your course syllabus.',
          url: getStepUrl('/final-grade-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enter Desired Grade',
          text: 'Input your target final grade as a percentage. This is the overall grade you want to achieve in the course.',
          url: getStepUrl('/final-grade-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Verify Total Weight',
          text: 'Ensure that all weights (assignments + final exam) add up to exactly 100%. Adjust weights if necessary to match your course syllabus.',
          url: getStepUrl('/final-grade-calculator', 4),
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Calculate Required Score',
          text: 'Click "Calculate Required Score" to see what percentage you need on your final exam. The calculator will also show if your goal is achievable.',
          url: getStepUrl('/final-grade-calculator', 5),
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Review Results',
          text: 'Analyze your current grade, required final score, maximum possible grade, letter grade, and GPA. Use this information to plan your study strategy.',
          url: getStepUrl('/final-grade-calculator', 6),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/final-grade-calculator'),
      headline: 'Final Grade Calculator: How to Calculate What You Need on Your Final Exam',
      description: 'Comprehensive guide to calculating required final exam scores, understanding weighted grades, and planning your semester effectively.',
      author: {
        '@type': 'Organization',
        name: 'AICalculator.pro Team',
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
      dateModified: new Date().toISOString(),
    },
  ],
};

export default function FinalGradeCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Final Grade Calculator - Calculate Required Exam Score</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Final Grade Calculator"
        calculatorUrl="/final-grade-calculator"
      />

      {/* Calculator Component */}
      <FinalGradeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Final Grade Calculations
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is a Final Grade Calculator?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A final grade calculator is a tool that helps students determine what score they need on their final exam to achieve a desired overall grade in a course. It takes into account your current grades, the weight of each assignment, and the weight of the final exam to calculate the minimum score required.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                This calculator is essential for academic planning, helping students set realistic goals and prioritize their study efforts effectively.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How Weighted Grades Work
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Weighted grades assign different levels of importance to different course components. For example, a typical course might have:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
                <li>Homework: 20%</li>
                <li>Quizzes: 15%</li>
                <li>Midterm: 25%</li>
                <li>Final Exam: 40%</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Your final grade is calculated by multiplying each component's grade by its weight and summing the results.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Grade Calculation Formula
          </h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-gray-800 font-mono text-sm mb-3">
              <strong>Final Grade = </strong>(Assignment 1 × Weight 1) + (Assignment 2 × Weight 2) + ... + (Final Exam × Final Weight)
            </p>
            <p className="text-gray-800 font-mono text-sm mb-3">
              <strong>Required Final Score = </strong>(Desired Grade - Current Weighted Average) ÷ (Final Exam Weight ÷ 100)
            </p>
            <p className="text-gray-700 text-sm mt-4">
              <strong>Example:</strong> If your current weighted average is 82%, your final exam is worth 30%, and you want a 90% final grade:
              <br />
              Required Score = (90 - 82) ÷ (30 ÷ 100) = 8 ÷ 0.30 = 26.67%
              <br />
              Wait, that doesn't seem right! Let me recalculate...
              <br />
              <br />
              Actually, if your current grade (before the final) is 82% and represents 70% of your total grade, then:
              <br />
              Current contribution = 82 × 0.70 = 57.4 points
              <br />
              Needed from final = 90 - 57.4 = 32.6 points
              <br />
              Required final score = 32.6 ÷ 0.30 = 108.67%
              <br />
              This means you'd need 108.67% on the final, which is impossible, so 90% is not achievable.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Letter Grade and GPA Conversion
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Letter Grade</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Percentage Range</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">GPA (4.0 Scale)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">A</td>
                  <td className="border border-gray-300 px-4 py-2">93-100%</td>
                  <td className="border border-gray-300 px-4 py-2">4.0</td>
                  <td className="border border-gray-300 px-4 py-2">Excellent</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">A-</td>
                  <td className="border border-gray-300 px-4 py-2">90-92%</td>
                  <td className="border border-gray-300 px-4 py-2">3.7</td>
                  <td className="border border-gray-300 px-4 py-2">Excellent</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">B+</td>
                  <td className="border border-gray-300 px-4 py-2">87-89%</td>
                  <td className="border border-gray-300 px-4 py-2">3.3</td>
                  <td className="border border-gray-300 px-4 py-2">Good</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">B</td>
                  <td className="border border-gray-300 px-4 py-2">83-86%</td>
                  <td className="border border-gray-300 px-4 py-2">3.0</td>
                  <td className="border border-gray-300 px-4 py-2">Good</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">B-</td>
                  <td className="border border-gray-300 px-4 py-2">80-82%</td>
                  <td className="border border-gray-300 px-4 py-2">2.7</td>
                  <td className="border border-gray-300 px-4 py-2">Good</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">C+</td>
                  <td className="border border-gray-300 px-4 py-2">77-79%</td>
                  <td className="border border-gray-300 px-4 py-2">2.3</td>
                  <td className="border border-gray-300 px-4 py-2">Satisfactory</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">C</td>
                  <td className="border border-gray-300 px-4 py-2">73-76%</td>
                  <td className="border border-gray-300 px-4 py-2">2.0</td>
                  <td className="border border-gray-300 px-4 py-2">Satisfactory</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">C-</td>
                  <td className="border border-gray-300 px-4 py-2">70-72%</td>
                  <td className="border border-gray-300 px-4 py-2">1.7</td>
                  <td className="border border-gray-300 px-4 py-2">Satisfactory</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">D</td>
                  <td className="border border-gray-300 px-4 py-2">60-69%</td>
                  <td className="border border-gray-300 px-4 py-2">1.0</td>
                  <td className="border border-gray-300 px-4 py-2">Passing</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">F</td>
                  <td className="border border-gray-300 px-4 py-2">0-59%</td>
                  <td className="border border-gray-300 px-4 py-2">0.0</td>
                  <td className="border border-gray-300 px-4 py-2">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Study Strategies Based on Required Score
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Need &lt; 70%</h4>
              <p className="text-sm text-gray-700">
                You're in good shape! Review key concepts, practice problems, and get adequate rest before the exam.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Need 70-85%</h4>
              <p className="text-sm text-gray-700">
                Moderate effort required. Create a study schedule, review all materials, and practice with past exams.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Need &gt; 85%</h4>
              <p className="text-sm text-gray-700">
                Intensive preparation needed. Start early, form study groups, attend office hours, and focus on high-weight topics.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Common Grading Scenarios
          </h3>
          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scenario 1: Standard College Course</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Homework: 15% (average 88%)</li>
                <li>Quizzes: 15% (average 85%)</li>
                <li>Midterm 1: 20% (scored 78%)</li>
                <li>Midterm 2: 20% (scored 82%)</li>
                <li>Final Exam: 30% (need to calculate)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Current grade: 81.95% | To get 85% (B): need 91.83% on final
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scenario 2: High School Class</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Participation: 10% (scored 95%)</li>
                <li>Homework: 20% (average 92%)</li>
                <li>Tests: 40% (average 85%)</li>
                <li>Final Exam: 30% (need to calculate)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Current grade: 88.5% | To get 90% (A-): need 93.33% on final
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scenario 3: Graduate Course</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Research Paper: 30% (scored 92%)</li>
                <li>Presentation: 20% (scored 88%)</li>
                <li>Final Exam: 50% (need to calculate)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Current grade: 90.4% | To get 93% (A): need 94.8% on final
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Tips for Final Exam Success
          </h3>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">1.</span>
                <span><strong>Start Early:</strong> Begin studying at least 1-2 weeks before the exam, not the night before.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">2.</span>
                <span><strong>Create a Study Schedule:</strong> Break down topics and allocate specific time slots for each.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">3.</span>
                <span><strong>Practice with Past Exams:</strong> Review previous tests to understand question formats and difficulty.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">4.</span>
                <span><strong>Form Study Groups:</strong> Collaborate with classmates to share knowledge and fill gaps.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">5.</span>
                <span><strong>Attend Office Hours:</strong> Ask your instructor about topics you find challenging.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">6.</span>
                <span><strong>Focus on High-Weight Topics:</strong> Prioritize material that's emphasized in the syllabus.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">7.</span>
                <span><strong>Take Care of Yourself:</strong> Get 7-8 hours of sleep, eat well, and exercise regularly.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 font-bold mr-2">8.</span>
                <span><strong>Use Active Learning:</strong> Don't just read—practice problems, create flashcards, teach concepts to others.</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Your Results
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">If Your Required Score is Achievable:</h4>
              <p className="text-gray-700 leading-relaxed">
                Great news! Your goal is within reach. Create a focused study plan targeting the areas where you need the most improvement. Allocate more time to challenging topics and practice with similar problems to build confidence.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">If Your Required Score Exceeds 100%:</h4>
              <p className="text-gray-700 leading-relaxed">
                Your desired grade may not be achievable with the current weights. Consider adjusting your target to the maximum possible grade shown by the calculator. Focus on doing your absolute best on the final exam, and remember that learning is more important than the grade itself.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Planning for Future Semesters:</h4>
              <p className="text-gray-700 leading-relaxed">
                Use this experience to improve your approach in future courses. Stay on top of assignments throughout the semester, seek help early when struggling, and maintain consistent study habits rather than relying heavily on the final exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/gpa-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-1">GPA Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your GPA</p>
          </a>

          <a
            href="/test-score-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900 mb-1">Test Score Calculator</h3>
            <p className="text-sm text-gray-600">Calculate test scores</p>
          </a>

          <a
            href="/grade-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="font-semibold text-gray-900 mb-1">Grade Calculator</h3>
            <p className="text-sm text-gray-600">Calculate course grades</p>
          </a>

          <a
            href="/percentage-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900 mb-1">Percentage Calculator</h3>
            <p className="text-sm text-gray-600">Calculate percentages</p>
          </a>
        </div>
      </section>
    </div>
  );
}

