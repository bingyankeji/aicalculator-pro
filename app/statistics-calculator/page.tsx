import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { StatisticsCalculator } from "@/components/Calculator/StatisticsCalculator";
import Link from "next/link";
import { getUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Statistics Calculator - Descriptive Statistics, Mean, Median, Standard Deviation | Free Tool",
  description: "Free statistics calculator for descriptive statistics. Calculate mean, median, mode, standard deviation, variance, quartiles, and more. Perfect for students, researchers, and data analysis.",
  keywords: [
    "statistics calculator",
    "descriptive statistics",
    "mean calculator",
    "median calculator",
    "standard deviation calculator",
    "variance calculator",
    "quartile calculator",
    "statistical analysis",
    "data analysis tool",
    "outlier detection",
    "distribution analysis",
    "skewness calculator",
    "kurtosis calculator",
    "statistical measures",
    "data summary",
  ],
  openGraph: {
    title: "Statistics Calculator - Descriptive Statistics & Data Analysis",
    description: "Free online statistics calculator for comprehensive data analysis. Calculate mean, median, standard deviation, quartiles, and detect outliers with detailed statistical insights.",
    type: "website",
    url: getUrl('/statistics-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Statistics Calculator - Descriptive Statistics Tool",
    description: "Calculate comprehensive statistics including mean, median, standard deviation, and quartiles with detailed analysis and interpretations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/statistics-calculator'),
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

export default function StatisticsCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Statistics Calculator",
        "url": getUrl('/statistics-calculator'),
        "description": "Free online statistics calculator for comprehensive descriptive statistics including mean, median, mode, standard deviation, variance, quartiles, and distribution analysis.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate mean, median, and mode",
          "Standard deviation and variance",
          "Quartiles and percentiles",
          "Outlier detection using IQR method",
          "Distribution analysis (skewness, kurtosis)",
          "Normality assessment",
          "Statistical interpretations",
          "Data visualization insights"
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
            "name": "Math Calculators",
            "item": getUrl('/math-numbers')
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Statistics Calculator",
            "item": getUrl('/statistics-calculator')
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between mean, median, and mode?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mean is the arithmetic average of all values. Median is the middle value when data is sorted. Mode is the most frequently occurring value. Mean is sensitive to outliers, median is robust to outliers, and mode shows the most common value in the dataset."
            }
          },
          {
            "@type": "Question",
            "name": "How do you calculate standard deviation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard deviation measures how spread out data points are from the mean. Calculate it by: 1) Find the mean, 2) Calculate squared differences from mean, 3) Find average of squared differences (variance), 4) Take square root of variance. Formula: σ = √(Σ(x-μ)²/N)"
            }
          },
          {
            "@type": "Question",
            "name": "What are quartiles and how are they used?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Quartiles divide data into four equal parts. Q1 (25th percentile) is the median of the lower half, Q2 (50th percentile) is the overall median, Q3 (75th percentile) is the median of the upper half. The Interquartile Range (IQR = Q3-Q1) measures spread and helps identify outliers."
            }
          },
          {
            "@type": "Question",
            "name": "How does the calculator detect outliers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator uses the IQR (Interquartile Range) method to detect outliers. Values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR are considered outliers. This is a robust method that works well for most distributions and is commonly used in box plots."
            }
          },
          {
            "@type": "Question",
            "name": "What do skewness and kurtosis measure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Skewness measures the asymmetry of the distribution. Positive skewness indicates a right tail, negative indicates a left tail. Kurtosis measures the 'tailedness' - how much data is in the tails vs. center. High kurtosis means more outliers, low kurtosis means fewer outliers than a normal distribution."
            }
          },
          {
            "@type": "Question",
            "name": "When should I use descriptive vs. inferential statistics?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Descriptive statistics (mean, median, standard deviation) summarize and describe your current dataset. Use them to understand your data's characteristics. Inferential statistics help make predictions or generalizations about a larger population based on your sample data."
            }
          },
          {
            "@type": "Question",
            "name": "What sample size do I need for reliable statistics?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For basic descriptive statistics, even small samples (n≥5) can be meaningful. For reliable estimates and normal distribution assumptions, n≥30 is often recommended. Larger samples (n≥100) provide more stable estimates and better power for statistical tests."
            }
          },
          {
            "@type": "Question",
            "name": "How do I interpret the coefficient of variation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Coefficient of Variation (CV) = (Standard Deviation / Mean) × 100%. It measures relative variability. CV < 15% indicates low variability, 15-35% is moderate, >35% is high variability. Use CV to compare variability between datasets with different units or scales."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Statistics Calculator",
        "description": "Step-by-step guide to calculating comprehensive descriptive statistics using our online calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Your Data",
            "text": "Input your numerical data in the text area. Separate numbers with commas, spaces, or new lines. The calculator will automatically detect and count valid numbers."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Choose Analysis Type",
            "text": "Select the type of analysis you need: Descriptive Statistics for basic measures, Distribution Analysis for skewness and normality, or Advanced Analysis for confidence intervals."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Set Confidence Level",
            "text": "Choose your desired confidence level (90%, 95%, or 99%) for interval estimates and statistical inference calculations."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Statistics",
            "text": "Click 'Calculate Statistics' to generate comprehensive results including central tendency, variability measures, quartiles, and distribution characteristics."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Interpret Results",
            "text": "Review the detailed analysis including statistical interpretations, outlier detection, normality assessment, and recommendations for further analysis."
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
      
      <h1 className="sr-only">Statistics Calculator - Free Online Descriptive Statistics Tool</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Statistics Calculator"
        calculatorUrl="/statistics-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <StatisticsCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Descriptive Statistics
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Central Tendency Measures</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-1">Mean (Average)</h4>
                    <p className="text-sm text-gray-700">Sum of all values divided by count. Sensitive to outliers.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-900 mb-1">Median</h4>
                    <p className="text-sm text-gray-700">Middle value when data is sorted. Robust to outliers.</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-1">Mode</h4>
                    <p className="text-sm text-gray-700">Most frequently occurring value in the dataset.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Variability Measures</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-900 mb-1">Standard Deviation</h4>
                    <p className="text-sm text-gray-700">Average distance from the mean. Shows data spread.</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-bold text-orange-900 mb-1">Variance</h4>
                    <p className="text-sm text-gray-700">Average of squared deviations from mean.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-900 mb-1">Range & IQR</h4>
                    <p className="text-sm text-gray-700">Range = Max - Min. IQR = Q3 - Q1 (middle 50%).</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Distribution Shape</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Skewness:</strong> Measures asymmetry (left/right tail)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Kurtosis:</strong> Measures tail heaviness vs normal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Normality:</strong> How close to bell curve shape</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Outliers:</strong> Values far from typical range</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quartiles & Percentiles</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-mono text-gray-800 text-center">
                      Min ── Q1 ── Median ── Q3 ── Max<br/>
                      0%   25%    50%     75%   100%
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Q1:</strong> 25% of data below this value<br/>
                    <strong>Q2:</strong> Median (50% below)<br/>
                    <strong>Q3:</strong> 75% of data below this value<br/>
                    <strong>IQR:</strong> Q3 - Q1 (middle 50% spread)
                  </p>
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
                    What is the difference between mean, median, and mode?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Mean is the arithmetic average of all values. Median is the middle value when data is sorted. Mode is the most frequently occurring value. Mean is sensitive to outliers, median is robust to outliers, and mode shows the most common value in the dataset.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do you calculate standard deviation?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Standard deviation measures how spread out data points are from the mean. Calculate it by: 1) Find the mean, 2) Calculate squared differences from mean, 3) Find average of squared differences (variance), 4) Take square root of variance. Formula: σ = √(Σ(x-μ)²/N)
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What are quartiles and how are they used?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Quartiles divide data into four equal parts. Q1 (25th percentile) is the median of the lower half, Q2 (50th percentile) is the overall median, Q3 (75th percentile) is the median of the upper half. The Interquartile Range (IQR = Q3-Q1) measures spread and helps identify outliers.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How does the calculator detect outliers?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      The calculator uses the IQR (Interquartile Range) method to detect outliers. Values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR are considered outliers. This is a robust method that works well for most distributions and is commonly used in box plots.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What do skewness and kurtosis measure?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Skewness measures the asymmetry of the distribution. Positive skewness indicates a right tail, negative indicates a left tail. Kurtosis measures the 'tailedness' - how much data is in the tails vs. center. High kurtosis means more outliers, low kurtosis means fewer outliers than a normal distribution.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    When should I use descriptive vs. inferential statistics?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Descriptive statistics (mean, median, standard deviation) summarize and describe your current dataset. Use them to understand your data's characteristics. Inferential statistics help make predictions or generalizations about a larger population based on your sample data.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What sample size do I need for reliable statistics?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      For basic descriptive statistics, even small samples (n≥5) can be meaningful. For reliable estimates and normal distribution assumptions, n≥30 is often recommended. Larger samples (n≥100) provide more stable estimates and better power for statistical tests.
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                    >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How do I interpret the coefficient of variation?
                  </h3>
                  <div>
                    <p className="text-gray-700">
                      Coefficient of Variation (CV) = (Standard Deviation / Mean) × 100%. It measures relative variability. CV &lt; 15% indicates low variability, 15-35% is moderate, &gt;35% is high variability. Use CV to compare variability between datasets with different units or scales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Math Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/standard-deviation-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Standard Deviation Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Focused standard deviation calculations</p>
                </Link>
                <Link href="/average-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Average Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Mean, median, mode calculations</p>
                </Link>
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Percentage and ratio calculations</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
