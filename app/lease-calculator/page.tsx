import type { Metadata } from "next";
import LeaseCalculator from "@/components/Calculator/LeaseCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lease Calculator - Lease vs Buy Analysis & Decision Tool | AI Calculator",
  description:
    "Free lease calculator to compare leasing vs buying for cars, equipment, and real estate. Calculate monthly payments, total costs, and get smart recommendations for the best financial decision.",
  keywords: [
    "lease calculator",
    "lease vs buy calculator",
    "auto lease calculator",
    "car lease calculator",
    "equipment lease calculator",
    "lease payment calculator",
    "lease analysis",
    "lease vs purchase",
    "lease comparison",
    "monthly lease payment",
    "lease terms calculator",
    "residual value calculator",
    "lease cost calculator",
    "commercial lease calculator",
    "lease decision tool",
    "lease vs finance",
    "lease evaluation",
    "lease affordability",
    "lease break even",
    "lease roi calculator"
  ],
  openGraph: {
    title: "Lease Calculator - Smart Lease vs Buy Analysis",
    description:
      "Compare leasing vs buying with detailed cost analysis. Get personalized recommendations for cars, equipment, and real estate leasing decisions.",
    type: "website",
    url: "https://aicalculator.com/lease-calculator",
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lease Calculator - Financial Decision Tool",
    description:
      "Free lease vs buy calculator with detailed cost analysis and smart recommendations.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/lease-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      "name": "Lease Calculator",
      "url": "https://aicalculator.com/lease-calculator",
      "description": "Advanced lease calculator for comparing leasing vs buying decisions across automobiles, equipment, and real estate. Calculate monthly payments, total costs, residual values, and get intelligent recommendations based on comprehensive financial analysis.",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Auto lease payment calculations",
        "Equipment lease analysis",
        "Real estate lease evaluation",
        "Lease vs buy comparison",
        "Monthly payment calculations",
        "Total cost analysis",
        "Residual value calculations",
        "Break-even point analysis",
        "Interest rate comparisons",
        "Down payment analysis",
        "Security deposit calculations",
        "Acquisition and disposition fees",
        "Tax implications analysis",
        "Decision recommendations",
        "Multiple scenario comparisons",
        "Cost savings analysis",
        "Financial risk assessment",
        "Professional lease insights"
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
          "name": "Financial",
          "item": "https://aicalculator.com/financial"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Lease Calculator",
          "item": "https://aicalculator.com/lease-calculator"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Should I lease or buy a car?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The decision depends on your financial situation, driving habits, and preferences. Leasing typically offers lower monthly payments and minimal down payment, but you don't build equity. Buying costs more upfront but you own the asset and can modify it freely. Consider factors like mileage restrictions, wear and tear charges, total cost of ownership, and how long you plan to keep the vehicle."
          }
        },
        {
          "@type": "Question",
          "name": "How is a lease payment calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lease payments are calculated based on the vehicle's depreciation during the lease term, plus interest (money factor) and fees. The formula considers: (Vehicle Price - Residual Value) / Lease Term + ((Vehicle Price + Residual Value) × Money Factor) + taxes and fees. The residual value is the estimated worth of the vehicle at lease end, typically 50-70% of original value for 2-3 year leases."
          }
        },
        {
          "@type": "Question",
          "name": "What is residual value in a lease?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Residual value is the estimated worth of the leased asset at the end of the lease term, expressed as a percentage of the original purchase price. For example, a car with 60% residual value after 3 years means it's expected to retain 60% of its original value. Higher residual values result in lower monthly payments because you're paying for less depreciation."
          }
        },
        {
          "@type": "Question",
          "name": "What are the advantages of leasing vs buying?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Leasing advantages: Lower monthly payments, minimal down payment, warranty coverage, easier upgrades, potential tax benefits for business use. Buying advantages: Build equity, no mileage restrictions, freedom to modify, no wear and tear charges, long-term cost savings, ability to sell anytime. The best choice depends on your financial goals, usage patterns, and personal preferences."
          }
        },
        {
          "@type": "Question",
          "name": "What fees are involved in leasing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common lease fees include: Acquisition fee (typically $300-$1,000), security deposit (often waived), disposition fee at lease end ($300-$500), excess mileage charges (usually $0.15-$0.30 per mile), wear and tear charges for damage beyond normal use, early termination fees if you end the lease early, and gap insurance if not included. Always review the lease agreement for all applicable fees."
          }
        },
        {
          "@type": "Question",
          "name": "Can I negotiate a lease like a purchase?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, many lease terms are negotiable. You can negotiate the vehicle price (capitalized cost), money factor (interest rate), fees, mileage allowance, and sometimes the residual value. Focus on the total cost rather than just monthly payments. Get quotes from multiple dealers, research current incentives, and consider timing your lease during promotional periods for better deals."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Use the Lease Calculator for Smart Financial Decisions",
      "description": "Step-by-step guide to analyze lease vs buy options",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select Asset Type and Analysis Mode",
          "text": "Choose whether you're analyzing an auto, equipment, or real estate lease. Select 'Lease Only' to evaluate lease terms or 'Lease vs Buy' to compare both options."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Enter Asset and Lease Information",
          "text": "Input the asset value, lease term in months, monthly payment, down payment, security deposit, and residual value percentage. Include any additional fees like acquisition or disposition costs."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Add Purchase Comparison Data",
          "text": "If comparing to buying, enter the purchase price, loan term, interest rate, and down payment for financing. Include ongoing costs like maintenance and insurance."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Review Analysis Results",
          "text": "Examine the total costs, monthly payment differences, break-even analysis, and financial recommendations. Consider both quantitative results and qualitative factors."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Save and Compare Scenarios",
          "text": "Save different lease scenarios with custom names and use the comparison feature to evaluate multiple options side-by-side for the best decision."
        }
      ]
    }
  ]
} as const;

export default function LeaseCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Lease Calculator - Lease vs Buy Analysis & Decision Tool</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Financial</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">Lease Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <LeaseCalculator />
          
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" 
               aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding Leasing: Smart Financial Decisions for Every Asset
            </h2>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                Leasing has become a popular alternative to purchasing for everything from vehicles to 
                business equipment and real estate. Understanding the financial implications of leasing 
                versus buying is crucial for making informed decisions that align with your financial 
                goals and usage patterns.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Lease Payments Are Calculated</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">🚗 Auto Lease Formula</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Depreciation:</strong> (Vehicle Price - Residual Value) ÷ Lease Term</div>
                    <div><strong>Interest:</strong> (Vehicle Price + Residual Value) × Money Factor</div>
                    <div><strong>Total Payment:</strong> Depreciation + Interest + Taxes + Fees</div>
                    <div className="text-blue-800 mt-2">
                      <strong>Example:</strong> $30,000 car, 60% residual, 36 months = $333/month depreciation
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-3">🏭 Equipment Lease Structure</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Capital Cost:</strong> Equipment price minus down payment</div>
                    <div><strong>Residual Value:</strong> Usually 10-25% for equipment</div>
                    <div><strong>Money Factor:</strong> Interest rate equivalent (APR ÷ 2400)</div>
                    <div className="text-green-800 mt-2">
                      <strong>Tax Benefits:</strong> Lease payments often 100% deductible for business use
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Lease vs Buy Decision Framework</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">💰 Financial Considerations</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2">When Leasing Makes Sense:</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Lower upfront costs needed</li>
                        <li>• Want latest technology/features</li>
                        <li>• Business tax deductions available</li>
                        <li>• Prefer predictable monthly costs</li>
                        <li>• Don't want maintenance hassles</li>
                        <li>• Usage within mileage limits</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2">When Buying Makes Sense:</h5>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Want to build equity/ownership</li>
                        <li>• High usage or mileage needs</li>
                        <li>• Plan to keep asset long-term</li>
                        <li>• Want modification freedom</li>
                        <li>• Prefer no usage restrictions</li>
                        <li>• Lower total cost of ownership</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of Leases and Applications</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-4">🚙 Automotive Leasing</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-blue-900 mb-2">Closed-End Lease (Most Common):</h5>
                      <ul className="text-blue-800 space-y-1 text-sm">
                        <li>• Fixed residual value at lease start</li>
                        <li>• No risk if actual value differs</li>
                        <li>• Walk away at lease end</li>
                        <li>• Mileage and wear restrictions apply</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-blue-900 mb-2">Open-End Lease (Commercial):</h5>
                      <ul className="text-blue-800 space-y-1 text-sm">
                        <li>• Residual value determined at lease end</li>
                        <li>• Lessee bears depreciation risk</li>
                        <li>• More flexible terms</li>
                        <li>• Common for business fleets</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-4">🏭 Equipment Leasing</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-green-900 mb-2">Operating Lease:</h5>
                      <ul className="text-green-800 space-y-1 text-sm">
                        <li>• Off-balance-sheet financing</li>
                        <li>• Shorter than asset's useful life</li>
                        <li>• Lessor retains ownership risks</li>
                        <li>• Easy upgrades to newer equipment</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-green-900 mb-2">Capital/Finance Lease:</h5>
                      <ul className="text-green-800 space-y-1 text-sm">
                        <li>• Treated as asset purchase for accounting</li>
                        <li>• Covers most of asset's useful life</li>
                        <li>• Often includes purchase option</li>
                        <li>• Lessee assumes ownership risks</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-purple-900 mb-4">🏢 Real Estate Leasing</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-bold text-purple-900 mb-2">Commercial Lease Benefits:</h5>
                      <ul className="text-purple-800 space-y-1 text-sm">
                        <li>• Preserve capital for business operations</li>
                        <li>• Flexibility to relocate or expand</li>
                        <li>• Landlord handles property maintenance</li>
                        <li>• Tax-deductible lease payments</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-purple-900 mb-2">Purchase Considerations:</h5>
                      <ul className="text-purple-800 space-y-1 text-sm">
                        <li>• Build equity in real estate</li>
                        <li>• Control over property modifications</li>
                        <li>• Potential appreciation benefits</li>
                        <li>• Depreciation tax advantages</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Lease Analysis Techniques</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">📊 Financial Metrics to Consider</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Net Present Value (NPV):</strong> Compare present value of lease vs buy cash flows</li>
                    <li>• <strong>Internal Rate of Return (IRR):</strong> Effective interest rate of lease financing</li>
                    <li>• <strong>Total Cost of Ownership:</strong> All costs over expected usage period</li>
                    <li>• <strong>Break-even Analysis:</strong> Point where lease and buy costs are equal</li>
                    <li>• <strong>Opportunity Cost:</strong> Alternative uses for down payment capital</li>
                  </ul>
                  
                  <h4 className="text-lg font-bold text-gray-900">🎯 Negotiation Strategies</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Research market values:</strong> Know fair market price before negotiating</li>
                    <li>• <strong>Negotiate capitalized cost:</strong> Focus on vehicle price, not just payments</li>
                    <li>• <strong>Understand money factor:</strong> Convert to APR for comparison (multiply by 2400)</li>
                    <li>• <strong>Review all fees:</strong> Acquisition, disposition, and documentation fees</li>
                    <li>• <strong>Consider multiple offers:</strong> Compare deals from different lessors</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-900">⚠️ Common Lease Pitfalls</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Focusing only on monthly payment:</strong> Ignore total cost and terms</li>
                    <li>• <strong>Underestimating usage:</strong> Excess mileage charges can be expensive</li>
                    <li>• <strong>Ignoring wear and tear:</strong> Normal use definitions vary by lessor</li>
                    <li>• <strong>Early termination:</strong> Penalties can be substantial</li>
                    <li>• <strong>Gap insurance gaps:</strong> Ensure adequate coverage for total loss</li>
                  </ul>
                  
                  <h4 className="text-lg font-bold text-gray-900">💡 Tax Implications</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Business use:</strong> Lease payments often fully deductible</li>
                    <li>• <strong>Personal use:</strong> Limited tax benefits for individual lessees</li>
                    <li>• <strong>Section 179:</strong> Purchase may qualify for immediate expense deduction</li>
                    <li>• <strong>Depreciation:</strong> Ownership allows depreciation deductions</li>
                    <li>• <strong>State taxes:</strong> Sales tax treatment varies by state and lease type</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-8">
                <h4 className="text-lg font-bold text-yellow-900 mb-4">🎯 Making the Right Decision</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li>• <strong>Assess your financial situation:</strong> Available capital, cash flow, credit score</li>
                    <li>• <strong>Consider usage patterns:</strong> Mileage, wear, modification needs</li>
                    <li>• <strong>Evaluate business needs:</strong> Tax implications, balance sheet impact</li>
                    <li>• <strong>Plan for the future:</strong> Technology changes, business growth</li>
                  </ul>
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li>• <strong>Calculate total costs:</strong> Include all fees, taxes, and opportunity costs</li>
                    <li>• <strong>Consider flexibility needs:</strong> Ability to change or upgrade</li>
                    <li>• <strong>Review insurance requirements:</strong> Coverage levels and gap insurance</li>
                    <li>• <strong>Understand end-of-lease options:</strong> Purchase, extend, or return</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6">
                The lease vs buy decision involves multiple financial and personal factors. Use our calculator 
                to analyze the quantitative aspects, but also consider qualitative factors like flexibility, 
                convenience, and your specific business or personal needs. When in doubt, consult with 
                financial advisors or tax professionals to ensure the decision aligns with your overall 
                financial strategy.
              </p>
            </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🔗</span>
              Related Financial Calculators
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/auto-loan-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Auto Loan Calculator</div>
                <p className="text-xs text-gray-600 mt-1">Calculate car loan payments</p>
              </Link>
              <Link href="/loan-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Loan Calculator</div>
                <p className="text-xs text-gray-600 mt-1">General loan payment calculator</p>
              </Link>
              <Link href="/present-value-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                <div className="font-semibold text-gray-900">Present Value Calculator</div>
                <p className="text-xs text-gray-600 mt-1">NPV and investment analysis</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
