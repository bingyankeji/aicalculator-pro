import { Metadata } from "next";
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from "next/link";
import { StandardDeviationCalculator } from "@/components/Calculator/StandardDeviationCalculator";
import { getUrl } from '@/config/site';

export const metadata: Metadata = {
  title: "Standard Deviation (Free, No signup) - Statistical Analysis | AICalculator",
  description: "Free standard deviation calculator with no sign-up required. Calculate standard deviation, variance, mean, and detect outliers instantly. For sample and population data. Perfect for students, researchers, and data analysis with step-by-step formulas.",
  keywords: [
    "standard deviation calculator",
    "free standard deviation calculator",
    "standard deviation calculator no signup",
    "standard deviation",
    "variance calculator",
    "calculate standard deviation",
    "sample standard deviation",
    "population standard deviation",
    "statistics calculator",
    "standard deviation formula",
    "how to calculate standard deviation",
    "std dev calculator",
    "sigma calculator",
    "statistical analysis",
    "data spread calculator",
    "outlier detection",
    "statistics tool",
    "mean calculator",
    "variance formula",
  ],
  openGraph: {
    title: "Standard Deviation (Free, No signup) - AICalculator",
    description: "Free standard deviation calculator with no sign-up required. Calculate standard deviation, variance, and mean with step-by-step formulas. Perfect for students and data analysis.",
    type: "website",
    url: getUrl('/standard-deviation-calculator'),
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standard Deviation (Free, No signup) - AICalculator",
    description: "Free standard deviation calculator with no sign-up required. Calculate standard deviation, variance, and mean instantly with detailed step-by-step formulas.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/standard-deviation-calculator'),
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Standard Deviation Calculator",
      "url": getUrl('/standard-deviation-calculator'),
      "description": "Free online standard deviation calculator to calculate sample and population standard deviation, variance, mean, and detect outliers. Features step-by-step calculation formulas, automatic outlier detection using IQR method, and comprehensive statistical analysis for educational and professional use.",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Calculate sample standard deviation (n-1)",
        "Calculate population standard deviation (n)",
        "Calculate variance",
        "Calculate mean (average)",
        "Detect outliers using IQR method",
        "Step-by-step calculation formulas",
        "Support for unlimited data points",
        "Automatic data sorting",
        "Visual identification of outliers",
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
          "name": "Standard Deviation Calculator",
          "item": getUrl('/standard-deviation-calculator')
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is standard deviation and how do you calculate it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard deviation (σ) measures how spread out numbers are from the mean. Formula: σ = √(Σ(x - μ)² / n) for population, or σ = √(Σ(x - x̄)² / (n-1)) for sample. Steps: 1) Calculate mean, 2) Find deviation of each value from mean, 3) Square each deviation, 4) Sum squared deviations, 5) Divide by n (population) or n-1 (sample), 6) Take square root. Example: For [10, 20, 30, 40, 50], mean = 30, deviations = [-20, -10, 0, 10, 20], squared = [400, 100, 0, 100, 400], variance = 200, SD = √200 = 14.14."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between sample and population standard deviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sample standard deviation uses (n-1) in the denominator (Bessel's correction) to correct for bias when estimating population parameters from a sample. Population standard deviation uses n. Use sample SD when you have a subset of data representing a larger population. Use population SD when you have all data points. Example: If measuring heights of 30 students (sample of all students), use sample SD. If measuring heights of all 500 students in a school (entire population), use population SD. Sample SD is slightly larger to account for estimation uncertainty."
          }
        },
        {
          "@type": "Question",
          "name": "What does standard deviation tell you?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard deviation tells you: 1) How spread out your data is - low SD means values cluster near mean (consistent), high SD means values are spread out (variable), 2) Data reliability - lower SD indicates more consistent/reliable data, 3) Outlier presence - high SD may indicate outliers, 4) Normal distribution - in normal distributions, ~68% of data falls within 1 SD of mean, ~95% within 2 SD, ~99.7% within 3 SD. Example: Test scores with SD=5 means most scores are within 5 points of average, while SD=20 means scores vary widely."
          }
        },
        {
          "@type": "Question",
          "name": "How do you interpret standard deviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interpret standard deviation by comparing it to the mean: 1) Low SD (< 10% of mean) = data is tightly clustered, very consistent, 2) Medium SD (10-30% of mean) = moderate spread, typical variation, 3) High SD (> 30% of mean) = wide spread, high variability, may indicate outliers. Also use coefficient of variation (CV = SD/mean × 100%) for relative comparison. Example: Mean=100, SD=5 → CV=5% (very consistent). Mean=100, SD=30 → CV=30% (moderate variation). Mean=100, SD=50 → CV=50% (high variation)."
          }
        },
        {
          "@type": "Question",
          "name": "What is variance and how is it related to standard deviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Variance (σ²) is the average of squared deviations from the mean. Standard deviation (σ) is the square root of variance. Relationship: Variance = SD², or SD = √Variance. Variance is in squared units (harder to interpret), while SD is in original units (easier to understand). Formula: Variance = Σ(x - μ)² / n. Example: If data is in dollars, variance is in dollars², but SD is in dollars. Both measure spread; SD is preferred for interpretation because it's in the same units as your data."
          }
        },
        {
          "@type": "Question",
          "name": "When should you use standard deviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use standard deviation when: 1) Data is normally distributed (bell curve), 2) You need to measure spread/variability, 3) Comparing consistency between datasets, 4) Identifying outliers (values beyond 2-3 SD from mean), 5) Quality control (monitoring process variation), 6) Risk assessment (financial volatility), 7) Scientific research (reporting data variability). Don't use SD for: highly skewed data (use IQR instead), categorical data (use mode), or when outliers dominate (use robust measures)."
          }
        },
        {
          "@type": "Question",
          "name": "How do you find outliers using standard deviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Find outliers using standard deviation with the 2σ or 3σ rule: values beyond 2 standard deviations from mean are unusual, beyond 3 SD are outliers. Formula: Outlier if |x - mean| > 2×SD (or 3×SD for extreme outliers). Our calculator uses IQR method (more robust): Q1 - 1.5×IQR and Q3 + 1.5×IQR. Example: If mean=50, SD=10, then values < 30 or > 70 are outliers (2σ rule). Values < 20 or > 80 are extreme outliers (3σ rule). IQR method is preferred for non-normal distributions."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good standard deviation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 'good' standard deviation depends on context: 1) For quality control: lower is better (more consistent), 2) For test scores: SD of 10-15% of mean is typical, 3) For scientific measurements: depends on precision needed, 4) For financial returns: lower SD = lower risk. Use coefficient of variation (CV = SD/mean) for relative comparison. CV < 15% = low variation (good consistency), CV 15-35% = moderate variation (acceptable), CV > 35% = high variation (may need investigation). There's no universal 'good' value - it depends on your data type and purpose."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate Standard Deviation",
      "description": "Step-by-step guide to calculating standard deviation for sample and population data",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Your Data",
          "text": "Input all your numbers into the calculator. You can add as many numbers as needed. Choose between sample (n-1) or population (n) calculation type depending on whether you have a sample or complete population data."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Calculate Mean",
          "text": "The calculator automatically computes the mean (average) of all values: Mean = Sum of all values / Count of values."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Deviations",
          "text": "For each value, calculate its deviation from the mean: Deviation = Value - Mean. These deviations show how far each value is from the average."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Square Deviations",
          "text": "Square each deviation to eliminate negative signs and emphasize larger deviations: Squared Deviation = (Value - Mean)²."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Calculate Variance",
          "text": "Find the average of squared deviations: Variance = Sum of squared deviations / n (population) or / (n-1) (sample). This measures average squared distance from mean."
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Calculate Standard Deviation",
          "text": "Take the square root of variance to get standard deviation in original units: Standard Deviation = √Variance. This is the final measure of data spread."
        }
      ]
    }
  ]
};

export default function StandardDeviationCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <h1 className="sr-only">Standard Deviation Calculator - Free Online Calculator for Variance, Mean, and Statistical Analysis</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Standard Deviation (Free, No signup)"
        calculatorUrl="/standard-deviation-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Standard Deviation Calculator Tool">
        <div className="container mx-auto px-4">
          <StandardDeviationCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Standard Deviation Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Standard Deviation
            </h2>

            {/* Main Concepts */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">📊 What is Standard Deviation?</h3>
                <p className="text-gray-700 mb-4">
                  Standard deviation (σ) is a statistical measure that quantifies the amount of variation or dispersion in a set of data values. It tells you how
                  spread out your numbers are from the mean (average). A lower standard deviation indicates values are clustered closely around the mean, while a
                  higher standard deviation indicates values are more dispersed. In many real-world contexts—such as test scores, manufacturing tolerances,
                  financial returns, and scientific measurements—standard deviation is a key indicator of reliability and variability.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="font-mono text-sm mb-2">σ = √(Σ(x - μ)² / n)</div>
                  <div className="text-xs text-blue-600">Population Standard Deviation</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="font-mono text-sm mb-2">s = √(Σ(x - x̄)² / (n-1))</div>
                  <div className="text-xs text-green-600">Sample Standard Deviation (Bessel's correction)</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4">📈 Why is Standard Deviation Important?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Measures Variability:</strong> Shows how consistent or variable your data is</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Quality Control:</strong> Used in manufacturing to monitor process consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Risk Assessment:</strong> In finance, measures investment volatility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Outlier Detection:</strong> Helps identify unusual values in datasets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Research:</strong> Essential for reporting statistical results in scientific studies</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Deep Dive Sections */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-purple-700 mb-3">Variance vs. Standard Deviation</h3>
                <p className="text-gray-700 mb-3">
                  Variance (σ²) is the average of squared deviations from the mean. Standard deviation is the square root of variance. While variance is useful
                  for mathematical derivations, its units are squared (e.g., dollars²), which are less intuitive. Standard deviation converts the measure back to
                  the original units (e.g., dollars), making it easier to interpret in practice. In optimization and modeling, variance often simplifies algebra,
                  whereas standard deviation improves interpretability for stakeholders.
                </p>
                <p className="text-gray-700">
                  In many domains, both metrics are reported together. For example, lab protocols might specify an acceptable variance threshold for consistency,
                  while the executive summary highlights standard deviation to convey real-world variability in familiar units.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-indigo-700 mb-3">Sample vs. Population (When to Use Which)</h3>
                <p className="text-gray-700 mb-3">
                  Use <strong>population</strong> formulas when your dataset includes <strong>all</strong> members of the group of interest (e.g., all products
                  manufactured on a specific day). Use <strong>sample</strong> formulas when you observe only a subset and wish to infer characteristics about the
                  full population. Bessel’s correction (n−1 in the denominator) compensates for bias when estimating population variance from a sample.
                </p>
                <p className="text-gray-700">
                  As a rule of thumb: if the dataset is a practical census, use population SD. If you randomly sample to generalize results, use sample SD.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-rose-700 mb-3">Common Mistakes and How to Avoid Them</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Mixing sample and population formulas in the same analysis.</li>
                  <li>Forgetting to convert units before computing (e.g., cm vs. m), which inflates or shrinks dispersion.</li>
                  <li>Using standard deviation on highly skewed or categorical data—consider IQR or mode where appropriate.</li>
                  <li>Failing to remove obvious data-entry errors (e.g., misplaced decimals, transposed digits) before computing statistics.</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-amber-700 mb-3">Coefficient of Variation (CV)</h3>
                <p className="text-gray-700 mb-3">
                  The coefficient of variation (CV = SD / mean × 100%) enables relative comparison of variability across different scales or units. A dataset with
                  SD = 5 and mean = 50 (CV = 10%) is more consistent than one with SD = 20 and mean = 100 (CV = 20%). CV is especially helpful when comparing
                  variability across products, sensors, or financial instruments with different baselines.
                </p>
                <p className="text-gray-700">
                  In quality control, a lower CV often indicates better process stability and predictability.
                </p>
              </div>
            </div>

            {/* Calculation Example */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Step-by-Step Calculation Example</h3>
              <p className="text-gray-700 mb-4">
                Let's calculate the standard deviation for the dataset: <strong>[10, 20, 30, 40, 50]</strong>
              </p>
              <div className="space-y-3 font-mono text-sm bg-gray-50 p-4 rounded-lg">
                <div><strong>Step 1:</strong> Mean = (10+20+30+40+50) / 5 = 150 / 5 = 30</div>
                <div><strong>Step 2:</strong> Deviations: (10-30)=-20, (20-30)=-10, (30-30)=0, (40-30)=10, (50-30)=20</div>
                <div><strong>Step 3:</strong> Squared: 400, 100, 0, 100, 400</div>
                <div><strong>Step 4:</strong> Σ = 1000</div>
                <div><strong>Step 5:</strong> Variance (Population) = 1000 / 5 = 200</div>
                <div><strong>Step 6:</strong> Variance (Sample) = 1000 / (5-1) = 250</div>
                <div><strong>Step 7:</strong> SD (Population) = √200 ≈ 14.14</div>
                <div><strong>Step 8:</strong> SD (Sample) = √250 ≈ 15.81</div>
              </div>
              <p className="text-gray-700 mt-4">
                Interpretation: The sample SD (~15.81) is slightly larger than the population SD (~14.14), reflecting the correction for sampling uncertainty.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    What is standard deviation and how do you calculate it?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      Standard deviation (σ) measures how spread out numbers are from the mean. Formula: σ = √(Σ(x - μ)² / n) for population, or σ = √(Σ(x - x̄)² / (n-1)) for sample. Steps: 1) Calculate mean, 2) Find deviation of each value from mean, 3) Square each deviation, 4) Sum squared deviations, 5) Divide by n (population) or n-1 (sample), 6) Take square root. Example: For [10, 20, 30, 40, 50], mean = 30, deviations = [-20, -10, 0, 10, 20], squared = [400, 100, 0, 100, 400], variance = 200, SD = √200 = 14.14.
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    What is the difference between sample and population standard deviation?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      Sample standard deviation uses (n-1) in the denominator (Bessel's correction) to correct for bias when estimating population parameters from a sample. Population standard deviation uses n. Use sample SD when you have a subset of data representing a larger population. Use population SD when you have all data points. Example: If measuring heights of 30 students (sample of all students), use sample SD. If measuring heights of all 500 students in a school (entire population), use population SD. Sample SD is slightly larger to account for estimation uncertainty.
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    What does standard deviation tell you?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      Standard deviation tells you: 1) How spread out your data is - low SD means values cluster near mean (consistent), high SD means values are spread out (variable), 2) Data reliability - lower SD indicates more consistent/reliable data, 3) Outlier presence - high SD may indicate outliers, 4) Normal distribution - in normal distributions, ~68% of data falls within 1 SD of mean, ~95% within 2 SD, ~99.7% within 3 SD. Example: Test scores with SD=5 means most scores are within 5 points of average, while SD=20 means scores vary widely.
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    How do you interpret standard deviation?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      Interpret standard deviation by comparing it to the mean: 1) Low SD (&lt; 10% of mean) = data is tightly clustered, very consistent, 2) Medium SD (10-30% of mean) = moderate spread, typical variation, 3) High SD (&gt; 30% of mean) = wide spread, high variability, may indicate outliers. Also use coefficient of variation (CV = SD/mean × 100%) for relative comparison. Example: Mean=100, SD=5 → CV=5% (very consistent). Mean=100, SD=30 → CV=30% (moderate variation). Mean=100, SD=50 → CV=50% (high variation).
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    What is variance and how is it related to standard deviation?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      Variance (σ²) is the average of squared deviations from the mean. Standard deviation (σ) is the square root of variance. Relationship: Variance = SD², or SD = √Variance. Variance is in squared units (harder to interpret), while SD is in original units (easier to understand). Formula: Variance = Σ(x - μ)² / n. Example: If data is in dollars, variance is in dollars², but SD is in dollars. Both measure spread; SD is preferred for interpretation because it's in the same units as your data.
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    When should you use standard deviation?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      Use standard deviation when: 1) Data is normally distributed (bell curve), 2) You need to measure spread/variability, 3) Comparing consistency between datasets, 4) Identifying outliers (values beyond 2-3 SD from mean), 5) Quality control (monitoring process variation), 6) Risk assessment (financial volatility), 7) Scientific research (reporting data variability). Don't use SD for: highly skewed data (use IQR instead), categorical data (use mode), or when outliers dominate (use robust measures).
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    How do you find outliers using standard deviation?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      Find outliers using standard deviation with the 2σ or 3σ rule: values beyond 2 standard deviations from mean are unusual, beyond 3 SD are outliers. Formula: Outlier if |x - mean| &gt; 2×SD (or 3×SD for extreme outliers). Our calculator uses IQR method (more robust): Q1 - 1.5×IQR and Q3 + 1.5×IQR. Example: If mean=50, SD=10, then values &lt; 30 or &gt; 70 are outliers (2σ rule). Values &lt; 20 or &gt; 80 are extreme outliers (3σ rule). IQR method is preferred for non-normal distributions.
                    </div>
                  </div>
                </div>

                <div className="pb-6" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" itemProp="name">
                    What is a good standard deviation?
                  </h3>
                  <div className="text-gray-700" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">
                      A 'good' standard deviation depends on context: 1) For quality control: lower is better (more consistent), 2) For test scores: SD of 10-15% of mean is typical, 3) For scientific measurements: depends on precision needed, 4) For financial returns: lower SD = lower risk. Use coefficient of variation (CV = SD/mean) for relative comparison. CV &lt; 15% = low variation (good consistency), CV 15-35% = moderate variation (acceptable), CV &gt; 35% = high variation (may need investigation). There's no universal 'good' value - it depends on your data type and purpose.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Links (Related Calculators) */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/average-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Average Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate mean, median, mode, and more</p>
                </Link>
                <Link href="/fraction-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Fraction Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Perform fraction operations</p>
                </Link>
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages easily</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

