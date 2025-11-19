import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import TestScoreCalculator from '@/components/Calculator/TestScoreCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Test Score Calculator - Calculate Test Grades & Percentages | AICalculator',
  description: 'Free test score calculator to calculate test grades, percentages, and letter grades. Supports curve grading, multiple tests, weighted averages, and GPA conversion.',
  keywords: ['test score calculator', 'grade calculator', 'test grade calculator', 'calculate test score', 'test percentage calculator', 'quiz grade calculator', 'exam score calculator', 'test grading calculator', 'grade percentage calculator', 'test score percentage', 'calculate grade percentage', 'test grade percentage', 'grade calculator percentage', 'test calculator', 'grading calculator', 'score calculator', 'test score grader', 'grade calculator with curve', 'curved grade calculator', 'test average calculator', 'multiple test calculator', 'weighted test calculator', 'test GPA calculator', 'letter grade calculator', 'percentage to grade calculator', 'grade converter', 'test score converter', 'academic calculator', 'student grade calculator', 'online grade calculator'],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Test Score Calculator - Calculate Test Grades & Percentages',
    description: 'Calculate test scores, grades, and percentages instantly. Free calculator with curve grading, multiple tests, and weighted averages.',
    type: 'website',
    url: getUrl('/test-score-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('test-score'),
        width: 1200,
        height: 630,
        alt: 'Test Score Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Score Calculator',
    description: 'Calculate test scores and grades instantly',
    images: [getOgImage('test-score')],
  },
  alternates: {
    canonical: getUrl('/test-score-calculator'),
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
      '@id': getWebAppId('/test-score-calculator'),
      name: 'Test Score Calculator',
      url: getUrl('/test-score-calculator'),
      description: 'Calculate test scores, grades, and percentages. Supports single tests, multiple tests with weighted averages, curve grading, and GPA conversion.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate test score percentages',
        'Letter grade conversion',
        'GPA calculation',
        'Curve grading support',
        'Multiple test averaging',
        'Weighted test scores',
        'Custom passing grades',
        'Performance analysis',
        'Score distribution visualization',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/test-score-calculator'),
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
          name: 'Test Score Calculator',
          item: getUrl('/test-score-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/test-score-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I calculate my test score percentage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To calculate your test score percentage, divide the number of correct answers by the total number of questions and multiply by 100. Formula: (Correct Answers ÷ Total Questions) × 100 = Percentage. For example, if you got 18 out of 20 questions correct: (18 ÷ 20) × 100 = 90%.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is curve grading and how does it work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Curve grading (also called grading on a curve) is when an instructor adds points to everyone\'s test score to adjust for test difficulty. For example, if the highest score was 85%, the instructor might add 15 points to everyone\'s score so the top score becomes 100%. This calculator allows you to add a fixed number of curve points to your score.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate a weighted average of multiple tests?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To calculate a weighted average: 1) Multiply each test score by its weight (as a decimal), 2) Add all the weighted scores together. For example, if Test 1 is 80% with 40% weight and Test 2 is 90% with 60% weight: (80 × 0.40) + (90 × 0.60) = 32 + 54 = 86% weighted average.',
          },
        },
        {
          '@type': 'Question',
          name: 'What letter grade is a 85% test score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An 85% test score is typically a B grade. In most standard grading scales: 90-100% = A, 80-89% = B, 70-79% = C, 60-69% = D, below 60% = F. However, grading scales can vary by institution, so check with your instructor for the specific scale used in your course.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many questions can I miss to get a certain grade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To find how many questions you can miss: 1) Determine your target percentage (e.g., 90% for an A), 2) Multiply total questions by target percentage to get required correct answers, 3) Subtract from total to get allowed wrong answers. For example, on a 50-question test to get 90%: need 45 correct (50 × 0.90), can miss 5 questions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between weighted and unweighted averages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An unweighted average treats all tests equally - you simply add all scores and divide by the number of tests. A weighted average assigns different importance (weights) to different tests. For example, if finals are worth more than quizzes, a weighted average reflects this by multiplying each score by its weight percentage.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I convert a test score to GPA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'GPA conversion depends on your institution\'s scale. A common 4.0 scale is: A (93-100%) = 4.0, A- (90-92%) = 3.7, B+ (87-89%) = 3.3, B (83-86%) = 3.0, B- (80-82%) = 2.7, C+ (77-79%) = 2.3, C (73-76%) = 2.0, C- (70-72%) = 1.7, D (60-69%) = 1.0, F (below 60%) = 0.0.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a passing grade on a test?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A passing grade typically ranges from 60% to 70%, depending on the institution and course. In most US schools, 60% (D) is the minimum passing grade, though some courses require 70% (C) to pass. Graduate programs often require 80% (B) or higher. Always check your course syllabus for specific passing requirements.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/test-score-calculator'),
      name: 'How to Calculate Your Test Score',
      description: 'Step-by-step guide to calculating test scores, percentages, and letter grades.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose Calculator Mode',
          text: 'Select "Single Test" to calculate one test score, or "Multiple Tests" to calculate a weighted average of several tests.',
          url: getStepUrl('/test-score-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Total Questions',
          text: 'Input the total number of questions on your test. This is the maximum possible score.',
          url: getStepUrl('/test-score-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enter Correct Answers',
          text: 'Input how many questions you answered correctly. The calculator will automatically calculate wrong answers.',
          url: getStepUrl('/test-score-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Set Passing Grade (Optional)',
          text: 'Enter your passing grade threshold (typically 60-70%). This helps determine if you passed or failed.',
          url: getStepUrl('/test-score-calculator', 4),
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Apply Curve (Optional)',
          text: 'If your instructor curves grades, enable the curve option and enter the number of bonus points to add to your score.',
          url: getStepUrl('/test-score-calculator', 5),
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Calculate Score',
          text: 'Click "Calculate Score" to see your percentage, letter grade, GPA, pass/fail status, and performance analysis.',
          url: getStepUrl('/test-score-calculator', 6),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/test-score-calculator'),
      headline: 'Test Score Calculator: How to Calculate Test Grades and Percentages',
      description: 'Comprehensive guide to calculating test scores, understanding grading scales, curve grading, weighted averages, and improving test performance.',
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

export default function TestScoreCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Test Score Calculator - Calculate Test Grades & Percentages</h1>

      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Test Score Calculator"
        calculatorUrl="/test-score-calculator"
      />

      {/* Calculator Component */}
      <TestScoreCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Test Scores and Grading
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What is a Test Score Calculator?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A test score calculator is a tool that converts the number of correct answers on a test into a percentage score and letter grade. It helps students quickly understand their performance and determine if they passed or failed based on their institution's grading standards.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                This calculator supports single tests, multiple test averaging with weights, curve grading, and automatic GPA conversion, making it versatile for various academic scenarios.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How Test Scores Are Calculated
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Test scores are calculated using a simple formula:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-3">
                <p className="font-mono text-sm text-gray-800">
                  <strong>Percentage = (Correct Answers ÷ Total Questions) × 100</strong>
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                For example, if you answered 45 out of 50 questions correctly:<br />
                (45 ÷ 50) × 100 = 90%
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Standard Grading Scale
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Letter Grade</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Percentage Range</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">GPA (4.0 Scale)</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
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
                  <td className="border border-gray-300 px-4 py-2 font-semibold">D+</td>
                  <td className="border border-gray-300 px-4 py-2">67-69%</td>
                  <td className="border border-gray-300 px-4 py-2">1.3</td>
                  <td className="border border-gray-300 px-4 py-2">Below Average</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">D</td>
                  <td className="border border-gray-300 px-4 py-2">63-66%</td>
                  <td className="border border-gray-300 px-4 py-2">1.0</td>
                  <td className="border border-gray-300 px-4 py-2">Below Average</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">D-</td>
                  <td className="border border-gray-300 px-4 py-2">60-62%</td>
                  <td className="border border-gray-300 px-4 py-2">0.7</td>
                  <td className="border border-gray-300 px-4 py-2">Below Average</td>
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
            Understanding Curve Grading
          </h3>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>What is curve grading?</strong> Curve grading (or "grading on a curve") is when an instructor adjusts test scores to account for test difficulty or to achieve a desired grade distribution.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Common curve methods:</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Fixed Point Addition:</strong> Add the same number of points to everyone's score (e.g., add 5 points to all scores)</li>
              <li><strong>Highest Score Method:</strong> Scale scores so the highest score becomes 100%</li>
              <li><strong>Statistical Curve:</strong> Adjust scores based on class average and standard deviation</li>
              <li><strong>Bell Curve:</strong> Force grade distribution to match a normal distribution</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Example:</strong> If the highest score on a difficult test was 85%, the instructor might add 15 points to everyone's score so the top score becomes 100%. A student who scored 70% would then have 85% after the curve.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Calculating Weighted Test Averages
          </h3>
          <div className="space-y-4 mb-8">
            <p className="text-gray-700 leading-relaxed">
              When different tests have different importance (weights), you need to calculate a weighted average rather than a simple average.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="font-semibold text-gray-900 mb-2">Weighted Average Formula:</p>
              <p className="font-mono text-sm text-gray-800 mb-3">
                Weighted Average = (Score₁ × Weight₁) + (Score₂ × Weight₂) + ... + (Scoreₙ × Weightₙ)
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Important:</strong> All weights must add up to 100% (or 1.0 if using decimals)
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Example Calculation:</h4>
              <p className="text-gray-700 mb-2">A course has three tests with the following scores and weights:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Test 1: 85% (weight: 30%)</li>
                <li>Test 2: 92% (weight: 30%)</li>
                <li>Final Exam: 88% (weight: 40%)</li>
              </ul>
              <p className="text-gray-700 mb-2">Calculation:</p>
              <p className="font-mono text-sm text-gray-800 mb-1">
                = (85 × 0.30) + (92 × 0.30) + (88 × 0.40)
              </p>
              <p className="font-mono text-sm text-gray-800 mb-1">
                = 25.5 + 27.6 + 35.2
              </p>
              <p className="font-mono text-sm text-gray-800 font-semibold">
                = 88.3% (weighted average)
              </p>
              <p className="text-gray-600 text-sm mt-3">
                Note: The simple (unweighted) average would be (85 + 92 + 88) ÷ 3 = 88.33%, which is close but slightly different.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            How Many Questions Can I Miss?
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Total Questions</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">For 90% (A)</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">For 80% (B)</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">For 70% (C)</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">For 60% (D)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">10 questions</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 1</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 2</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 4</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">20 questions</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 2</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 4</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 6</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 8</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">25 questions</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 2-3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 5</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 7-8</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 10</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">50 questions</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 5</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 10</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 15</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 20</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">100 questions</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 10</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 20</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 30</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">Can miss 40</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Tips for Improving Test Scores
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">📚 Before the Test</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Start studying at least one week in advance</li>
                <li>• Create a study schedule and stick to it</li>
                <li>• Review class notes and textbook materials</li>
                <li>• Practice with sample problems and past tests</li>
                <li>• Form study groups with classmates</li>
                <li>• Get 7-8 hours of sleep the night before</li>
                <li>• Eat a healthy breakfast on test day</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">✍️ During the Test</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Read all instructions carefully</li>
                <li>• Answer easy questions first</li>
                <li>• Skip difficult questions and return later</li>
                <li>• Show your work for partial credit</li>
                <li>• Check your answers if time permits</li>
                <li>• Manage your time wisely</li>
                <li>• Stay calm and focused</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3">🔍 After the Test</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Review your graded test carefully</li>
                <li>• Understand why you got questions wrong</li>
                <li>• Ask your instructor for clarification</li>
                <li>• Identify patterns in your mistakes</li>
                <li>• Adjust your study methods accordingly</li>
                <li>• Keep tests for final exam review</li>
                <li>• Celebrate your successes!</li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h4 className="font-semibold text-orange-900 mb-3">💡 Study Techniques</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Use active recall (test yourself)</li>
                <li>• Create flashcards for key concepts</li>
                <li>• Teach the material to someone else</li>
                <li>• Use mnemonic devices for memorization</li>
                <li>• Take regular breaks (Pomodoro technique)</li>
                <li>• Practice spaced repetition</li>
                <li>• Eliminate distractions while studying</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Common Test Score Scenarios
          </h3>
          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scenario 1: Multiple Choice Test</h4>
              <p className="text-sm text-gray-700 mb-2">
                50 multiple choice questions, you answered 42 correctly
              </p>
              <p className="text-sm text-gray-600">
                Score: (42 ÷ 50) × 100 = <strong>84%</strong> (B grade)
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scenario 2: Test with Curve</h4>
              <p className="text-sm text-gray-700 mb-2">
                30 questions, 24 correct (80%), instructor adds 5-point curve
              </p>
              <p className="text-sm text-gray-600">
                Original: 80% → After curve: <strong>85%</strong> (B grade)
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Scenario 3: Weighted Tests</h4>
              <p className="text-sm text-gray-700 mb-2">
                Quiz 1: 85% (20%), Quiz 2: 90% (20%), Midterm: 78% (60%)
              </p>
              <p className="text-sm text-gray-600">
                Weighted average: (85×0.2) + (90×0.2) + (78×0.6) = <strong>81.8%</strong> (B- grade)
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Pass/Fail Grades
          </h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>What is a passing grade?</strong> A passing grade is the minimum score required to successfully complete a course or test. This varies by institution and course level.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>K-12 Schools:</strong> Typically 60% (D) or 70% (C) is passing</li>
              <li><strong>Undergraduate Courses:</strong> Usually 60-70% (D or C) is passing</li>
              <li><strong>Graduate Programs:</strong> Often require 80% (B) or higher to pass</li>
              <li><strong>Professional Certifications:</strong> Passing scores vary widely (60-80%)</li>
              <li><strong>Pass/Fail Courses:</strong> Usually require 70% for a "Pass"</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Important:</strong> Always check your course syllabus or institution's academic policies for specific passing grade requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/final-grade-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎓</div>
            <h3 className="font-semibold text-gray-900 mb-1">Final Grade Calculator</h3>
            <p className="text-sm text-gray-600">Calculate required final score</p>
          </a>

          <a
            href="/gpa-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900 mb-1">GPA Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your GPA</p>
          </a>

          <a
            href="/grade-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📝</div>
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

