import type { Metadata } from 'next';
import PercentErrorCalculator from '@/components/Calculator/PercentErrorCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId } from '@/config/site';
import Link from 'next/link';

const calculatorName = 'Percent Error Calculator';
const calculatorDesc = 'Free online percent error calculator for scientific experiments and quality control. Calculate measurement accuracy, absolute error, relative error, and precision analysis.';

export const metadata: Metadata = {
  title: `${calculatorName} - Calculate Measurement Accuracy | Free Tool`,
  description: calculatorDesc,
  keywords: [
    'percent error calculator',
    'percentage error calculator',
    'error calculator',
    'absolute error calculator',
    'relative error calculator',
    'measurement error calculator',
    'experimental error calculator',
    'accuracy calculator',
    'precision calculator',
    'scientific error calculator',
    'lab error calculator',
    'chemistry error calculator',
    'physics error calculator',
    'quality control calculator',
    'measurement accuracy',
    'error analysis',
    'experimental vs theoretical',
    'percent difference calculator',
    'error percentage',
    'calculate accuracy',
  ],
  authors: [{ name: 'AI Calculator' }],
  creator: 'AI Calculator',
  publisher: 'AI Calculator',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: getUrl('/percent-error-calculator'),
  },
  openGraph: {
    title: `${calculatorName} - Calculate Measurement Accuracy`,
    description: calculatorDesc,
    url: getUrl('/percent-error-calculator'),
    siteName: 'AI Calculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: getOgImage(),
        width: 1200,
        height: 630,
        alt: calculatorName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${calculatorName} - Calculate Measurement Accuracy`,
    description: calculatorDesc,
    images: [getOgImage()],
  },
};

export default function PercentErrorCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/percent-error-calculator'),
        name: calculatorName,
        url: getUrl('/percent-error-calculator'),
        description: calculatorDesc,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate percent error',
          'Absolute error calculation',
          'Relative error calculation',
          'Single measurement analysis',
          'Multiple measurements analysis',
          'Statistical analysis (mean, standard deviation)',
          'Precision level assessment',
          'Accuracy evaluation',
          'Error range calculation',
          'Save results as image',
          'Print results',
          'Share calculations',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/percent-error-calculator'),
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
            name: 'Math Calculators',
            item: getUrl('/#math'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: calculatorName,
            item: getUrl('/percent-error-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/percent-error-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is percent error and how do you calculate it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Percent error measures the accuracy of a measurement compared to the theoretical or true value. Formula: % Error = (|Experimental Value - Theoretical Value| / Theoretical Value) × 100%. For example, if the theoretical value is 100 and you measured 98, the percent error is (|98-100|/100) × 100% = 2%. Lower percent error indicates higher measurement accuracy.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between absolute error and relative error?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolute error is the actual difference between measured and theoretical values: |Experimental - Theoretical|. Relative error is the ratio of absolute error to theoretical value: |Experimental - Theoretical| / Theoretical. Percent error is relative error expressed as a percentage. Example: If theoretical is 50 and measured is 48, absolute error = 2, relative error = 0.04, percent error = 4%.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is an acceptable percent error?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Acceptable percent error depends on the field and precision requirements. Generally: ≤1% is excellent (high precision), 1-5% is good (acceptable for most applications), 5-10% is acceptable (may need improvement), 10-20% is poor (review methods), >20% is unacceptable (systematic error likely). In chemistry labs, ≤5% is often acceptable, while physics experiments may require ≤1%.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can percent error be negative?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Technically, percent error uses absolute value, so it\'s always positive. However, some applications distinguish between positive error (overestimation) and negative error (underestimation). If the experimental value is higher than theoretical, the raw error is positive; if lower, it\'s negative. The absolute value ensures percent error shows magnitude of inaccuracy regardless of direction.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you reduce percent error in experiments?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To reduce percent error: 1) Calibrate instruments regularly, 2) Take multiple measurements and average them, 3) Use appropriate precision instruments, 4) Control environmental factors (temperature, humidity), 5) Follow standardized procedures, 6) Minimize parallax errors in readings, 7) Account for systematic errors, 8) Practice proper technique. Averaging multiple measurements reduces random error and improves accuracy.',
            },
          },
          {
            '@type': 'Question',
            name: 'What causes high percent error in measurements?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'High percent error can result from: 1) Systematic errors (faulty equipment, calibration issues), 2) Random errors (environmental fluctuations, reading variations), 3) Human error (incorrect technique, parallax), 4) Instrument limitations (insufficient precision), 5) Incorrect theoretical value, 6) Sample contamination or impurity. Systematic errors cause consistent deviation, while random errors vary unpredictably. Identifying the error source is crucial for improvement.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/#math" className="text-blue-600 hover:text-blue-800 hover:underline">
                Math Calculators
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">{calculatorName}</span>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">{calculatorName}</h1>

        {/* Calculator Component */}
        <div className="py-8">
          <PercentErrorCalculator />
        </div>

        {/* Educational Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
          {/* What is Percent Error */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Percent Error</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is Percent Error?</h3>
                <p>
                  <strong>Percent error</strong> is a measure of measurement accuracy that compares an experimental or measured value to a theoretical or 
                  accepted true value. It expresses the magnitude of error as a percentage, making it easy to understand and compare across different scales. 
                  This metric is fundamental in scientific experiments, quality control, and any field requiring precise measurements.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h4 className="text-xl font-semibold text-purple-900 mb-3">The Percent Error Formula</h4>
                <div className="bg-white rounded-lg p-4 font-mono text-lg text-center border border-purple-200 mb-3">
                  % Error = (|Experimental Value - Theoretical Value| / Theoretical Value) × 100%
                </div>
                <p className="text-purple-900">
                  The <strong>absolute value</strong> ensures the result is always positive, focusing on the magnitude of error rather than its direction. 
                  Some applications may track signed error to distinguish between overestimation (positive) and underestimation (negative).
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Key Concepts</h4>
                <ul className="space-y-2">
                  <li><strong>Absolute Error:</strong> The actual difference between measured and true values (Experimental - Theoretical)</li>
                  <li><strong>Relative Error:</strong> The ratio of absolute error to true value (Absolute Error / Theoretical Value)</li>
                  <li><strong>Percent Error:</strong> Relative error expressed as a percentage</li>
                  <li><strong>Accuracy:</strong> How close a measurement is to the true value (low percent error = high accuracy)</li>
                  <li><strong>Precision:</strong> How close repeated measurements are to each other (measured by standard deviation)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use This Calculator</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Single Measurement</h3>
                <p className="text-purple-800 mb-4">
                  Calculate error for one measurement against the theoretical value. Perfect for quick accuracy checks.
                </p>
                <div className="bg-white rounded-lg p-4 text-sm space-y-2">
                  <div><strong>Example:</strong></div>
                  <div>Theoretical: 100 mL</div>
                  <div>Measured: 98.5 mL</div>
                  <div className="text-purple-600 font-semibold">Result: 1.5% error</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Multiple Measurements</h3>
                <p className="text-blue-800 mb-4">
                  Analyze multiple trials to calculate average error, standard deviation, and error range.
                </p>
                <div className="bg-white rounded-lg p-4 text-sm space-y-2">
                  <div><strong>Example:</strong></div>
                  <div>Theoretical: 50.0 g</div>
                  <div>Trials: 49.8, 50.2, 49.9 g</div>
                  <div className="text-blue-600 font-semibold">Avg Error: 0.33%</div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">Precision Levels</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                  <div className="font-bold text-green-700">≤ 1%</div>
                  <div className="text-sm text-gray-600">Excellent precision</div>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                  <div className="font-bold text-blue-700">1-5%</div>
                  <div className="text-sm text-gray-600">Good accuracy</div>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-500">
                  <div className="font-bold text-yellow-700">5-10%</div>
                  <div className="text-sm text-gray-600">Acceptable</div>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                  <div className="font-bold text-orange-700">10-20%</div>
                  <div className="text-sm text-gray-600">Poor accuracy</div>
                </div>
                <div className="bg-white rounded-lg p-3 border-l-4 border-red-500">
                  <div className="font-bold text-red-700">&gt; 20%</div>
                  <div className="text-sm text-gray-600">Unacceptable</div>
                </div>
              </div>
            </div>
          </section>

          {/* Applications */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Applications</h2>
            
            <div className="space-y-6 text-gray-700">
              <div className="border-l-4 border-purple-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🧪 Chemistry & Physics Labs</h3>
                <p>
                  Used extensively to evaluate experimental results. A chemistry titration with &lt;2% error demonstrates good technique, 
                  while physics measurements of gravitational acceleration typically aim for &lt;5% error. Students use percent error to 
                  assess lab skills and identify systematic errors in procedures or equipment.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🏭 Manufacturing & Quality Control</h3>
                <p>
                  Industrial quality assurance uses percent error to ensure products meet specifications. A bolt manufacturer might require 
                  dimensions within 1% error tolerance. Six Sigma processes aim for extremely low error rates (3.4 defects per million), 
                  equivalent to near-zero percent error in critical measurements.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">💊 Pharmaceutical Industry</h3>
                <p>
                  Drug manufacturing requires precise dosages with minimal error. FDA regulations often mandate &lt;5% variation from stated 
                  content. Analytical labs test batches for active ingredient concentration, dissolution rates, and impurity levels, 
                  calculating percent error against pharmacopeial standards to ensure patient safety.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🔧 Instrument Calibration</h3>
                <p>
                  Percent error verifies instrument accuracy during calibration. A thermometer reading 99.5°C in boiling water (theoretical: 100°C at sea level) 
                  has 0.5% error. Instruments exceeding acceptable error thresholds need recalibration or replacement. Regular calibration 
                  checks maintain measurement reliability across scientific and industrial applications.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">🏗️ Engineering & Construction</h3>
                <p>
                  Civil engineers calculate percent error when testing concrete strength, surveying land, or verifying structural loads. 
                  A concrete cube test showing 29 MPa vs. specified 30 MPa has 3.3% error, typically acceptable. Precision is critical 
                  for safety-critical structures where errors could lead to failures.
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">⚖️ Legal Metrology & Standards</h3>
                <p>
                  Government agencies verify commercial scales, fuel pumps, and measuring devices meet legal accuracy requirements. 
                  A supermarket scale with &gt;1% error violates consumer protection laws. National metrology institutes maintain 
                  measurement standards with extraordinarily low percent errors (often &lt;0.001%) to ensure uniformity in trade and science.
                </p>
              </div>
            </div>
          </section>

          {/* Error Types & Sources */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Measurement Errors</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-xl font-semibold text-red-900 mb-4">🎯 Systematic Errors</h3>
                <p className="text-red-800 mb-4">
                  Consistent, reproducible errors that bias results in one direction. They affect accuracy but not precision.
                </p>
                <ul className="space-y-2 text-sm text-red-900">
                  <li><strong>Instrument Error:</strong> Miscalibrated equipment (scale reads 2g too high)</li>
                  <li><strong>Environmental:</strong> Temperature, pressure, humidity effects</li>
                  <li><strong>Observational:</strong> Parallax error, consistent misreading</li>
                  <li><strong>Methodological:</strong> Flawed procedure or technique</li>
                  <li><strong>Theoretical:</strong> Using incorrect accepted value</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded border border-red-300">
                  <p className="text-xs text-red-800"><strong>Reduction:</strong> Calibrate instruments, control environment, use proper technique, verify theoretical values</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">🎲 Random Errors</h3>
                <p className="text-blue-800 mb-4">
                  Unpredictable variations that scatter measurements. They affect precision but average out over many trials.
                </p>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li><strong>Electronic Noise:</strong> Instrument fluctuations</li>
                  <li><strong>Environmental Variation:</strong> Air currents, vibrations</li>
                  <li><strong>Human Reaction Time:</strong> Inconsistent timing</li>
                  <li><strong>Sample Variation:</strong> Non-uniform specimens</li>
                  <li><strong>Estimation:</strong> Reading between scale divisions</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded border border-blue-300">
                  <p className="text-xs text-blue-800"><strong>Reduction:</strong> Take multiple measurements, calculate averages, use statistical analysis, improve measurement resolution</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-900 mb-3">🔍 Identifying Error Sources</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-yellow-900">
                <div>
                  <p className="font-semibold mb-2">If error is consistent:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Likely systematic error</li>
                    <li>• Check calibration</li>
                    <li>• Review methodology</li>
                    <li>• Verify instrument zero</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">If error varies widely:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Likely random error</li>
                    <li>• Increase sample size</li>
                    <li>• Control environment</li>
                    <li>• Improve technique</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What is percent error and how do you calculate it?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Percent error measures the accuracy of a measurement compared to the theoretical or true value. 
                  Formula: % Error = (|Experimental Value - Theoretical Value| / Theoretical Value) × 100%. For example, 
                  if the theoretical value is 100 and you measured 98, the percent error is (|98-100|/100) × 100% = 2%. 
                  Lower percent error indicates higher measurement accuracy.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What is the difference between absolute error and relative error?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolute error is the actual difference between measured and theoretical values: |Experimental - Theoretical|. 
                  Relative error is the ratio of absolute error to theoretical value: |Experimental - Theoretical| / Theoretical. 
                  Percent error is relative error expressed as a percentage. Example: If theoretical is 50 and measured is 48, 
                  absolute error = 2, relative error = 0.04, percent error = 4%.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What is an acceptable percent error?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Acceptable percent error depends on the field and precision requirements. Generally: ≤1% is excellent (high precision), 
                  1-5% is good (acceptable for most applications), 5-10% is acceptable (may need improvement), 10-20% is poor 
                  (review methods), &gt;20% is unacceptable (systematic error likely). In chemistry labs, ≤5% is often acceptable, 
                  while physics experiments may require ≤1%.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can percent error be negative?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Technically, percent error uses absolute value, so it's always positive. However, some applications distinguish 
                  between positive error (overestimation) and negative error (underestimation). If the experimental value is higher 
                  than theoretical, the raw error is positive; if lower, it's negative. The absolute value ensures percent error 
                  shows magnitude of inaccuracy regardless of direction.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do you reduce percent error in experiments?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To reduce percent error: 1) Calibrate instruments regularly, 2) Take multiple measurements and average them, 
                  3) Use appropriate precision instruments, 4) Control environmental factors (temperature, humidity), 
                  5) Follow standardized procedures, 6) Minimize parallax errors in readings, 7) Account for systematic errors, 
                  8) Practice proper technique. Averaging multiple measurements reduces random error and improves accuracy.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What causes high percent error in measurements?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  High percent error can result from: 1) Systematic errors (faulty equipment, calibration issues), 
                  2) Random errors (environmental fluctuations, reading variations), 3) Human error (incorrect technique, parallax), 
                  4) Instrument limitations (insufficient precision), 5) Incorrect theoretical value, 6) Sample contamination or impurity. 
                  Systematic errors cause consistent deviation, while random errors vary unpredictably. Identifying the error source 
                  is crucial for improvement.
                </p>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">External Resources & Further Reading</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-purple-900 mb-4">Educational Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.khanacademy.org/science/physics/one-dimensional-motion/introduction-to-physics-tutorial/a/percent-error"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Khan Academy - Percent Error
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">Free lessons on measurement accuracy</p>
                  </li>
                  <li>
                    <a
                      href="https://www.mathsisfun.com/numbers/percentage-error.html"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Math Is Fun - Percentage Error
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">Simple explanations with examples</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-purple-900 mb-4">Scientific Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://www.nist.gov/pml/weights-and-measures"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      NIST - Measurement Standards
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">National Institute of Standards and Technology</p>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Approximation_error"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Wikipedia - Approximation Error
                    </a>
                    <p className="text-sm text-gray-600 ml-7 mt-1">Comprehensive error analysis reference</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-purple-300">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> These external links are provided for educational purposes. We are not affiliated with these organizations.
              </p>
            </div>
          </section>

          {/* Related Calculators */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/percentage-calculator"
                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                  Percentage Calculator
                </div>
              </Link>
              
              <Link
                href="/statistics-calculator"
                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">📈</div>
                <div className="font-semibold text-gray-900 group-hover:text-purple-600">
                  Statistics Calculator
                </div>
              </Link>
              
              <Link
                href="/standard-deviation-calculator"
                className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">📉</div>
                <div className="font-semibold text-gray-900 group-hover:text-green-600">
                  Standard Deviation
                </div>
              </Link>
              
              <Link
                href="/scientific-calculator"
                className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2">🔬</div>
                <div className="font-semibold text-gray-900 group-hover:text-indigo-600">
                  Scientific Calculator
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

