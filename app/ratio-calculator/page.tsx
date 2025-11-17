import { Metadata } from "next";
import { RatioCalculator } from "@/components/Calculator/RatioCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ratio Calculator - Simplify Ratios & Solve Proportions | Free Online Tool",
  description: "Free ratio calculator to simplify ratios, solve proportions, and compare ratios. Calculate ratios step-by-step with detailed explanations and real-world examples. Perfect for math homework, cooking, and business.",
  keywords: [
    "ratio calculator",
    "proportion calculator",
    "simplify ratio",
    "ratio solver",
    "proportion solver",
    "ratio simplifier",
    "cross multiplication",
    "equivalent ratios",
    "ratio comparison",
    "math ratio calculator",
    "fraction to ratio",
    "ratio to percentage",
    "golden ratio calculator",
    "aspect ratio calculator",
    "ratio and proportion",
  ],
  openGraph: {
    title: "Ratio Calculator - Simplify Ratios & Solve Proportions",
    description: "Free online ratio calculator to simplify ratios, solve proportions, and compare ratios with step-by-step solutions and real-world examples.",
    type: "website",
    url: "https://aicalculator.pro/ratio-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ratio Calculator - Simplify Ratios & Solve Proportions",
    description: "Calculate and simplify ratios with detailed step-by-step solutions. Perfect for math, cooking, and business applications.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/ratio-calculator",
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

export default function RatioCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Ratio Calculator",
        "url": "https://aicalculator.pro/ratio-calculator",
        "description": "Free online ratio calculator to simplify ratios, solve proportions, and compare ratios with step-by-step solutions and real-world applications.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Simplify ratios to lowest terms",
          "Solve proportions and find missing values",
          "Compare two different ratios",
          "Step-by-step calculation process",
          "Real-world application examples",
          "Convert ratios to decimals and percentages",
          "Cross multiplication verification",
          "Greatest Common Divisor calculation"
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
            "name": "Math Calculators",
            "item": "https://aicalculator.pro/math-numbers"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Ratio Calculator",
            "item": "https://aicalculator.pro/ratio-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do you simplify a ratio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To simplify a ratio, find the Greatest Common Divisor (GCD) of both numbers and divide each term by the GCD. For example, to simplify 12:8, find GCD(12,8) = 4, then divide: 12÷4 = 3 and 8÷4 = 2, giving you the simplified ratio 3:2."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between a ratio and a proportion?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A ratio compares two quantities (like 3:4), while a proportion states that two ratios are equal (like 3:4 = 6:8). Ratios show the relationship between quantities, while proportions are equations involving two equivalent ratios."
            }
          },
          {
            "@type": "Question",
            "name": "How do you solve a proportion with a missing value?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use cross multiplication to solve proportions. For a:b = c:x, cross multiply to get a×x = b×c, then solve for x by dividing: x = (b×c)÷a. For example, if 3:4 = 6:x, then 3×x = 4×6, so x = 24÷3 = 8."
            }
          },
          {
            "@type": "Question",
            "name": "What are some real-world applications of ratios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ratios are used in cooking (recipe scaling), maps (scale ratios), finance (profit ratios), construction (mixing concrete), photography (aspect ratios), and medicine (dosage calculations). They help maintain proportional relationships when scaling quantities up or down."
            }
          },
          {
            "@type": "Question",
            "name": "How do you convert a ratio to a percentage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To convert a ratio to a percentage, divide the first number by the second number, then multiply by 100. For example, the ratio 3:4 becomes 3÷4 = 0.75, which equals 75%. This shows the first quantity as a percentage of the second."
            }
          },
          {
            "@type": "Question",
            "name": "What is cross multiplication and when do you use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cross multiplication is a method to solve proportions by multiplying diagonally across the equal sign. For a/b = c/d, cross multiply to get a×d = b×c. Use it to solve for missing values in proportions or to verify if two ratios are equivalent."
            }
          },
          {
            "@type": "Question",
            "name": "Can ratios have decimal numbers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ratios can include decimal numbers. For example, 2.5:1 or 1:0.75 are valid ratios. However, it's often easier to work with whole numbers by multiplying both terms by the same factor to eliminate decimals (2.5:1 becomes 5:2 when multiplied by 2)."
            }
          },
          {
            "@type": "Question",
            "name": "How do you compare two different ratios?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To compare ratios, convert both to decimal form by dividing the first term by the second term. The ratio with the larger decimal value is greater. Alternatively, cross multiply: if a:b and c:d, then a×d compared to b×c tells you which ratio is larger."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Use the Ratio Calculator",
        "description": "Step-by-step guide to calculating and simplifying ratios using our online ratio calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Calculation Type",
            "text": "Select whether you want to simplify a ratio, solve a proportion, or compare two ratios. Each option provides different input fields and calculation methods."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Your Numbers",
            "text": "Input the numbers for your ratio in the A:B format. For proportions, also enter the second ratio C:D. Use positive numbers and decimals are allowed."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Solve Option (if applicable)",
            "text": "For proportion solving, choose whether you want to find the third term (C) or fourth term (D). The calculator will solve for the missing value."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Results",
            "text": "Click 'Calculate Ratio' to see your results including simplified ratio, decimal equivalent, percentage, and step-by-step solution process."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review Analysis",
            "text": "Examine the smart analysis, real-world applications, and mathematical properties to better understand your ratio and its practical uses."
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
      
      <h1 className="sr-only">Ratio Calculator - Free Online Ratio and Proportion Calculator</h1>
      
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
                <span itemProp="name">Math Calculators</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Ratio Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <RatioCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Understanding Ratios and Proportions
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Ratio?</h3>
                <p className="text-gray-700 mb-4">
                  A ratio is a comparison of two or more quantities, showing how many times one value contains another. Ratios are written as "a:b" (read as "a to b") or as a fraction a/b.
                </p>
                <p className="text-gray-700">
                  For example, if a recipe calls for 2 cups of flour and 1 cup of sugar, the ratio of flour to sugar is 2:1, meaning there's twice as much flour as sugar.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What is a Proportion?</h3>
                <p className="text-gray-700 mb-4">
                  A proportion is an equation stating that two ratios are equal. If a:b = c:d, then we have a proportion. This relationship allows us to solve for unknown values using cross multiplication.
                </p>
                <p className="text-gray-700">
                  Proportions are essential in scaling recipes, reading maps, calculating dosages, and many other real-world applications where maintaining relationships is crucial.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Simplify Ratios</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-1">Step 1: Find the GCD</h4>
                    <p className="text-sm text-gray-700">Find the Greatest Common Divisor of both numbers</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-900 mb-1">Step 2: Divide Both Terms</h4>
                    <p className="text-sm text-gray-700">Divide both numbers by the GCD</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-1">Step 3: Write Simplified Ratio</h4>
                    <p className="text-sm text-gray-700">The result is your simplified ratio in lowest terms</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cross Multiplication Method</h3>
                <p className="text-gray-700 mb-4">
                  To solve proportions, use cross multiplication: if a/b = c/d, then a×d = b×c. This method helps find missing values in proportional relationships.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-mono text-gray-800">
                    Example: 3/4 = x/12<br/>
                    Cross multiply: 3 × 12 = 4 × x<br/>
                    Solve: 36 = 4x, so x = 9
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you simplify a ratio?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To simplify a ratio, find the Greatest Common Divisor (GCD) of both numbers and divide each term by the GCD. For example, to simplify 12:8, find GCD(12,8) = 4, then divide: 12÷4 = 3 and 8÷4 = 2, giving you the simplified ratio 3:2.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the difference between a ratio and a proportion?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      A ratio compares two quantities (like 3:4), while a proportion states that two ratios are equal (like 3:4 = 6:8). Ratios show the relationship between quantities, while proportions are equations involving two equivalent ratios.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you solve a proportion with a missing value?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Use cross multiplication to solve proportions. For a:b = c:x, cross multiply to get a×x = b×c, then solve for x by dividing: x = (b×c)÷a. For example, if 3:4 = 6:x, then 3×x = 4×6, so x = 24÷3 = 8.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What are some real-world applications of ratios?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Ratios are used in cooking (recipe scaling), maps (scale ratios), finance (profit ratios), construction (mixing concrete), photography (aspect ratios), and medicine (dosage calculations). They help maintain proportional relationships when scaling quantities up or down.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you convert a ratio to a percentage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To convert a ratio to a percentage, divide the first number by the second number, then multiply by 100. For example, the ratio 3:4 becomes 3÷4 = 0.75, which equals 75%. This shows the first quantity as a percentage of the second.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is cross multiplication and when do you use it?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Cross multiplication is a method to solve proportions by multiplying diagonally across the equal sign. For a/b = c/d, cross multiply to get a×d = b×c. Use it to solve for missing values in proportions or to verify if two ratios are equivalent.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can ratios have decimal numbers?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, ratios can include decimal numbers. For example, 2.5:1 or 1:0.75 are valid ratios. However, it's often easier to work with whole numbers by multiplying both terms by the same factor to eliminate decimals (2.5:1 becomes 5:2 when multiplied by 2).
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How do you compare two different ratios?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To compare ratios, convert both to decimal form by dividing the first term by the second term. The ratio with the larger decimal value is greater. Alternatively, cross multiply: if a:b and c:d, then a×d compared to b×c tells you which ratio is larger.
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
                <Link href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Convert ratios to percentages</p>
                </Link>
                <Link href="/fraction-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Fraction Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Work with fractions and ratios</p>
                </Link>
                <Link href="/average-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Average Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate means and ratios</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
