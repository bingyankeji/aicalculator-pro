import { Metadata } from "next";
import { AverageCalculator } from "@/components/Calculator/AverageCalculator";

export const metadata: Metadata = {
  title: "Average Calculator (Free, No signup) - Mean Median | AICalculator",
  description: "Free average calculator with no sign-up required. Find mean, median, mode, range, variance, and standard deviation. Perfect for students, teachers, and data analysis. Get instant statistical results with step-by-step formulas.",
  keywords: [
    "average calculator",
    "free average calculator",
    "average calculator no signup",
    "mean calculator",
    "median calculator",
    "mode calculator",
    "statistics calculator",
    "standard deviation calculator",
    "variance calculator",
    "range calculator",
    "calculate average",
    "find mean",
    "statistical analysis",
    "data analysis tool",
    "math statistics",
    "average finder",
    "mean median mode calculator",
  ],
  openGraph: {
    title: "Average Calculator (Free, No signup) - AICalculator",
    description: "Free average calculator with no sign-up required. Calculate mean, median, mode, range, variance, and standard deviation instantly. Perfect for students and data analysis.",
    type: "website",
    url: "https://aicalculator.pro/average-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Average Calculator (Free, No signup) - AICalculator",
    description: "Free average calculator with no sign-up required. Calculate mean, median, mode, and standard deviation with step-by-step formulas.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/average-calculator",
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

export default function AverageCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Average Calculator",
        "url": "https://aicalculator.pro/average-calculator",
        "description": "Free online average calculator to calculate mean, median, mode, range, variance, standard deviation, and other statistical measures. Features automatic sorting, multiple calculations, and step-by-step formulas for educational purposes.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate mean (average)",
          "Calculate median (middle value)",
          "Calculate mode (most frequent)",
          "Calculate range (max - min)",
          "Calculate variance",
          "Calculate standard deviation",
          "Automatic data sorting",
          "Visual identification of min, max, median",
          "Step-by-step formula display",
          "Support for unlimited numbers",
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
            "item": "https://aicalculator.pro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Calculators",
            "item": "https://aicalculator.pro/calculators"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Average Calculator",
            "item": "https://aicalculator.pro/average-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do you calculate the average (mean)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate the average (mean), add all the numbers together and divide by how many numbers there are. Formula: Mean = (Sum of all values) / (Count of values). Example: For 10, 20, 30, the mean is (10+20+30) / 3 = 60 / 3 = 20. The mean represents the central tendency of a dataset and is the most commonly used type of average."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between mean, median, and mode?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mean is the arithmetic average (sum divided by count). Median is the middle value when numbers are sorted (or average of two middle values if even count). Mode is the most frequently occurring value. Example: For data set [1, 2, 2, 3, 100], Mean = 21.6 (affected by outlier 100), Median = 2 (middle value, not affected by outliers), Mode = 2 (appears twice). Use median when data has outliers, mode for categorical data, and mean for normally distributed data."
            }
          },
          {
            "@type": "Question",
            "name": "How do you find the median?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To find the median: 1) Sort all numbers in ascending order, 2) If odd count: median is the middle number, 3) If even count: median is the average of the two middle numbers. Example: For [5, 2, 8, 1, 9] → Sort to [1, 2, 5, 8, 9] → Median = 5 (middle). For [2, 4, 6, 8] → Sort already → Median = (4+6)/2 = 5. Median is resistant to outliers, making it better than mean for skewed distributions."
            }
          },
          {
            "@type": "Question",
            "name": "What is standard deviation and why is it important?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard deviation (σ) measures how spread out numbers are from the mean. Low standard deviation means data points are close to the mean (consistent); high standard deviation means data is spread out (variable). Formula: σ = √(Σ(x - mean)² / n). Example: Test scores [90, 91, 89, 92] have σ ≈ 1.12 (very consistent), while [60, 90, 70, 100] have σ ≈ 16.43 (highly variable). It's crucial in statistics for understanding data reliability and variability."
            }
          },
          {
            "@type": "Question",
            "name": "Can there be more than one mode?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! A dataset can have no mode (all values appear once), one mode (unimodal), two modes (bimodal), or multiple modes (multimodal). Example: [1, 2, 2, 3, 3, 4] is bimodal with modes 2 and 3 (both appear twice). [1, 2, 3, 4, 5] has no mode (all appear once). Mode is most useful for categorical data or discrete data to identify the most common category or value. Our calculator displays all modes when multiple exist."
            }
          },
          {
            "@type": "Question",
            "name": "What is the range in statistics?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Range is the simplest measure of spread, calculated as: Range = Maximum value - Minimum value. It shows the span of the dataset. Example: For temperatures [65°F, 70°F, 75°F, 80°F, 85°F], Range = 85 - 65 = 20°F. While easy to calculate, range is sensitive to outliers since it only uses two data points. For more robust spread measures, use interquartile range (IQR) or standard deviation which consider all data points."
            }
          },
          {
            "@type": "Question",
            "name": "When should I use median instead of mean?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use median instead of mean when: 1) Data has outliers (extreme values) - median isn't affected by them, 2) Data is skewed (not normally distributed) - income data often uses median, 3) You want the 'typical' middle value - median represents the 50th percentile. Example: For house prices [$200K, $250K, $300K, $5M], mean = $1.19M (misleading due to mansion), median = $275K (more representative of typical price). Median is better for ordinal data and asymmetric distributions."
            }
          },
          {
            "@type": "Question",
            "name": "What is variance and how is it different from standard deviation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Variance (σ²) and standard deviation (σ) both measure data spread, but: Variance = average of squared differences from mean. Standard deviation = square root of variance. Formula: Variance = Σ(x - mean)² / n, SD = √Variance. Key difference: variance is in squared units (hard to interpret), while standard deviation is in original units (easier to understand). Example: If data is in dollars, variance is in dollars², but SD is in dollars. Both are used extensively in statistics; SD is more intuitive for interpretation."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Average and Statistics",
        "description": "Step-by-step guide to calculating mean, median, mode, and other statistical measures",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Data",
            "text": "Input all your numbers into the calculator. You can add as many numbers as needed using the 'Add Number' button. Each number can be positive, negative, or decimal values."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Review Results",
            "text": "The calculator automatically computes mean (average), median (middle value), mode (most frequent), range (spread), sum, count, minimum, and maximum values instantly as you enter data."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Analyze Advanced Statistics",
            "text": "View variance and standard deviation to understand data spread. Check the sorted data visualization to see how values are distributed, with min, max, and median highlighted for easy identification."
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
      
      <h1 className="sr-only">Average Calculator - Free Tool to Calculate Mean, Median, Mode, Range, Variance and Standard Deviation for Statistical Analysis</h1>
      
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
              <span itemProp="name" className="text-gray-900 font-semibold">Average Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Average Calculator Tool">
        <div className="container mx-auto px-4">
          <AverageCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Average Calculator Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to Averages and Statistics
            </h2>

            {/* Main Statistical Measures */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">📊 Mean (Arithmetic Average)</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="font-mono text-sm mb-2">Mean = (Sum of all values) / (Number of values)</div>
                  <div className="text-xs text-blue-600">Also called: Average, Arithmetic Mean</div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>What it tells you:</strong> The "center of gravity" of your data. If all values were distributed equally, this is what each would be.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Example:</strong> Test scores of 80, 85, 90 → Mean = (80+85+90)/3 = 85
                </p>
                <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800">
                  ⚠️ <strong>Limitation:</strong> Very sensitive to outliers (extreme values). One very high or low number can skew the mean significantly.
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4">📈 Median (Middle Value)</h3>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <div className="font-mono text-sm mb-2">Median = Middle value when sorted</div>
                  <div className="text-xs text-green-600">Also called: 50th Percentile, Q2</div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>What it tells you:</strong> The value that divides your data in half. 50% of values are below it, 50% are above it.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Example:</strong> Salaries [$40K, $45K, $50K, $55K, $200K] → Median = $50K (middle value, not affected by $200K outlier)
                </p>
                <div className="bg-green-50 p-3 rounded text-xs text-green-800">
                  ✓ <strong>Advantage:</strong> Resistant to outliers. Better for skewed data like income, house prices, test scores with a few very high/low values.
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-4">🎯 Mode (Most Frequent)</h3>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <div className="font-mono text-sm mb-2">Mode = Most frequently occurring value(s)</div>
                  <div className="text-xs text-purple-600">Can have 0, 1, or multiple modes</div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>What it tells you:</strong> The most common or popular value in your dataset. Useful for categorical data (colors, brands, sizes).
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Example:</strong> Shoe sizes [7, 8, 8, 9, 9, 9, 10] → Mode = 9 (appears 3 times, most frequent)
                </p>
                <div className="bg-purple-50 p-3 rounded text-xs text-purple-800">
                  📌 <strong>Types:</strong> Unimodal (1 mode), Bimodal (2 modes), Multimodal (3+ modes), No mode (all values appear once).
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-orange-700 mb-4">📏 Range (Spread)</h3>
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <div className="font-mono text-sm mb-2">Range = Maximum - Minimum</div>
                  <div className="text-xs text-orange-600">Simplest measure of spread</div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>What it tells you:</strong> The span between your lowest and highest values. Shows the total spread of your data.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Example:</strong> Daily temperatures [65°F, 70°F, 75°F, 80°F, 85°F] → Range = 85 - 65 = 20°F
                </p>
                <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800">
                  ⚠️ <strong>Limitation:</strong> Uses only 2 data points (min & max), ignoring all others. Sensitive to outliers.
                </div>
              </div>
            </div>

            {/* Advanced Statistics */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Statistical Measures</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-bold text-indigo-900 mb-2">Variance (σ²)</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    σ² = Σ(x - mean)² / n
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Variance measures how far each number in the dataset is from the mean. It's the average of the squared differences from the mean. Squared differences are used to prevent positive and negative deviations from canceling out.
                  </p>
                  <p className="text-xs text-indigo-700">
                    <strong>Note:</strong> Variance is in squared units (e.g., dollars²), which makes interpretation less intuitive. Standard deviation solves this problem.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-bold text-pink-900 mb-2">Standard Deviation (σ)</h4>
                  <div className="bg-gray-50 p-3 rounded mb-2 text-sm font-mono">
                    σ = √(Variance) = √(Σ(x - mean)² / n)
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Standard deviation is the square root of variance. It measures the typical distance between each data point and the mean, in the same units as the original data. Low SD = data points close to mean (consistent). High SD = data points spread out (variable).
                  </p>
                  <div className="bg-pink-50 p-3 rounded text-xs mt-2">
                    <strong>68-95-99.7 Rule (for normal distribution):</strong><br/>
                    • 68% of data falls within 1 SD of mean<br/>
                    • 95% within 2 SD of mean<br/>
                    • 99.7% within 3 SD of mean
                  </div>
                </div>

                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-bold text-teal-900 mb-2">Population vs Sample</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Population:</strong> The entire group you're studying. Use n in formulas. Variance formula: σ² = Σ(x - μ)² / N<br/>
                    <strong>Sample:</strong> A subset of the population. Use n-1 (Bessel's correction) for unbiased estimate. Variance formula: s² = Σ(x - x̄)² / (n-1)
                  </p>
                  <p className="text-xs text-teal-700">
                    Our calculator uses population formulas (divides by n), which is appropriate when you have all the data or for descriptive statistics.
                  </p>
                </div>
              </div>
            </div>

            {/* When to Use Each Measure */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Which Average Should You Use?</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-blue-700 mb-3">Use Mean When:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Data is normally distributed (symmetric)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>No significant outliers present</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>You need all data points considered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>Calculating with continuous data</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-xs text-blue-700 bg-blue-50 p-2 rounded">
                    <strong>Examples:</strong> Test scores, heights, weights, measurements in controlled experiments
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-green-700 mb-3">Use Median When:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Data has outliers or extreme values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Distribution is skewed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>You want the "typical" middle value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Ordinal data (ranked data)</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-xs text-green-700 bg-green-50 p-2 rounded">
                    <strong>Examples:</strong> Income, house prices, test scores with failures/perfect scores, survey ratings
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-purple-700 mb-3">Use Mode When:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Data is categorical (not numerical)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Finding the most popular choice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Discrete data with repeating values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600">✓</span>
                      <span>Quick observation needed</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-xs text-purple-700 bg-purple-50 p-2 rounded">
                    <strong>Examples:</strong> Favorite color, shirt sizes, most common defect, peak usage time, popular product
                  </div>
                </div>
              </div>
            </div>

            {/* Real-World Applications */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Real-World Applications of Statistics</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">📚 Education</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Calculate class average test scores</li>
                      <li>• Find median GPA to understand typical student performance</li>
                      <li>• Identify mode to see most common grade</li>
                      <li>• Use standard deviation to measure grade consistency</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">💼 Business & Finance</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Average sales per month for forecasting</li>
                      <li>• Median income for salary benchmarking</li>
                      <li>• Stock price volatility using standard deviation</li>
                      <li>• Most common purchase amount (mode)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">🏥 Healthcare</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Average patient wait times</li>
                      <li>• Median blood pressure for age groups</li>
                      <li>• Standard deviation in dosage effectiveness</li>
                      <li>• Most common symptoms (mode)</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">🏃 Sports & Fitness</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Average points per game for players</li>
                      <li>• Median marathon finish time</li>
                      <li>• Consistency in performance (SD)</li>
                      <li>• Most common workout duration</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">🌤️ Weather & Climate</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Average temperature for a month</li>
                      <li>• Median rainfall to avoid outlier storms</li>
                      <li>• Temperature variability (standard deviation)</li>
                      <li>• Most common wind direction</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">🏠 Real Estate</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Median home price (better than mean with outliers)</li>
                      <li>• Average days on market</li>
                      <li>• Price variability by neighborhood (SD)</li>
                      <li>• Most common house size</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">🔬 Research & Science</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Mean experimental results across trials</li>
                      <li>• Median to handle measurement outliers</li>
                      <li>• Standard deviation for error bars</li>
                      <li>• Variance to assess experiment reliability</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">🛒 E-commerce</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Average order value (AOV)</li>
                      <li>• Median cart size</li>
                      <li>• Most purchased items (mode)</li>
                      <li>• Price point optimization using statistics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Statistical Best Practices</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Check for outliers first:</strong> Use median if outliers significantly affect the mean</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Visualize your data:</strong> Create histogram or box plot to see distribution shape</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Report multiple measures:</strong> Mean, median, and SD together give complete picture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Consider sample size:</strong> Larger samples give more reliable statistics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Use appropriate precision:</strong> Round to 2-4 significant figures for clarity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Document your methods:</strong> Specify if using population or sample formulas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Common Statistical Mistakes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Using mean with skewed data:</strong> Median is more appropriate for income, prices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Ignoring outliers:</strong> Always investigate outliers - they might be errors or important insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Mixing populations:</strong> Don't combine data from fundamentally different groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Assuming normal distribution:</strong> Many real-world datasets are not normally distributed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Over-interpreting mode:</strong> Mode is meaningless if all values appear once</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span><strong>Confusing variance and SD:</strong> SD is more interpretable (same units as data)</span>
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
                    How do you calculate the average (mean)?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate the average (mean), add all the numbers together and divide by how many numbers there are. Formula: Mean = (Sum of all values) / (Count of values). Example: For 10, 20, 30, the mean is (10+20+30) / 3 = 60 / 3 = 20. The mean represents the central tendency of a dataset and is the most commonly used type of average.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between mean, median, and mode?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Mean is the arithmetic average (sum divided by count). Median is the middle value when numbers are sorted (or average of two middle values if even count). Mode is the most frequently occurring value. Example: For data set [1, 2, 2, 3, 100], Mean = 21.6 (affected by outlier 100), Median = 2 (middle value, not affected by outliers), Mode = 2 (appears twice). Use median when data has outliers, mode for categorical data, and mean for normally distributed data.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you find the median?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To find the median: 1) Sort all numbers in ascending order, 2) If odd count: median is the middle number, 3) If even count: median is the average of the two middle numbers. Example: For [5, 2, 8, 1, 9] → Sort to [1, 2, 5, 8, 9] → Median = 5 (middle). For [2, 4, 6, 8] → Sort already → Median = (4+6)/2 = 5. Median is resistant to outliers, making it better than mean for skewed distributions.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is standard deviation and why is it important?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Standard deviation (σ) measures how spread out numbers are from the mean. Low standard deviation means data points are close to the mean (consistent); high standard deviation means data is spread out (variable). Formula: σ = √(Σ(x - mean)² / n). Example: Test scores [90, 91, 89, 92] have σ ≈ 1.12 (very consistent), while [60, 90, 70, 100] have σ ≈ 16.43 (highly variable). It's crucial in statistics for understanding data reliability and variability.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can there be more than one mode?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes! A dataset can have no mode (all values appear once), one mode (unimodal), two modes (bimodal), or multiple modes (multimodal). Example: [1, 2, 2, 3, 3, 4] is bimodal with modes 2 and 3 (both appear twice). [1, 2, 3, 4, 5] has no mode (all appear once). Mode is most useful for categorical data or discrete data to identify the most common category or value. Our calculator displays all modes when multiple exist.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the range in statistics?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Range is the simplest measure of spread, calculated as: Range = Maximum value - Minimum value. It shows the span of the dataset. Example: For temperatures [65°F, 70°F, 75°F, 80°F, 85°F], Range = 85 - 65 = 20°F. While easy to calculate, range is sensitive to outliers since it only uses two data points. For more robust spread measures, use interquartile range (IQR) or standard deviation which consider all data points.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    When should I use median instead of mean?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Use median instead of mean when: 1) Data has outliers (extreme values) - median isn't affected by them, 2) Data is skewed (not normally distributed) - income data often uses median, 3) You want the 'typical' middle value - median represents the 50th percentile. Example: For house prices [$200K, $250K, $300K, $5M], mean = $1.19M (misleading due to mansion), median = $275K (more representative of typical price). Median is better for ordinal data and asymmetric distributions.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is variance and how is it different from standard deviation?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Variance (σ²) and standard deviation (σ) both measure data spread, but: Variance = average of squared differences from mean. Standard deviation = square root of variance. Formula: Variance = Σ(x - mean)² / n, SD = √Variance. Key difference: variance is in squared units (hard to interpret), while standard deviation is in original units (easier to understand). Example: If data is in dollars, variance is in dollars², but SD is in dollars. Both are used extensively in statistics; SD is more intuitive for interpretation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Math Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages and changes</p>
                </a>
                <a href="/fraction-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Fraction Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Add, subtract, multiply, divide fractions</p>
                </a>
                <a href="/scientific-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Scientific Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Advanced mathematical operations</p>
                </a>
                <a href="/gpa-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">GPA Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate grade point average</p>
                </a>
                <a href="/grade-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Grade Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate weighted grades</p>
                </a>
                <a href="/unit-converter" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Unit Converter</div>
                  <p className="text-xs text-gray-600 mt-1">Convert measurements</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">Learn more about statistics and averages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.khanacademy.org/math/statistics-probability" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Khan Academy: Statistics →
                </a>
                <a href="https://www.mathsisfun.com/data/standard-deviation.html" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Math Is Fun: Standard Deviation →
                </a>
                <a href="https://en.wikipedia.org/wiki/Average" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Wikipedia: Average →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

