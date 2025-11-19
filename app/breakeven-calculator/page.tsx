import type { Metadata } from "next";
import { getUrl, getOgImage } from '@/config/site';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import BreakevenCalculator from "@/components/Calculator/BreakevenCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Break-even Calculator - Business Profitability Analysis Tool | AI Calculator",
  description:
    "Free break-even calculator for business analysis. Calculate break-even point, contribution margin, profit targets, and pricing strategies. Essential tool for startups and business planning.",
  keywords: [
    "break even calculator",
    "breakeven calculator",
    "break-even analysis",
    "breakeven point calculator",
    "fixed cost calculator",
    "variable cost calculator",
    "contribution margin calculator",
    "profit analysis calculator",
    "business breakeven calculator",
    "sales volume calculator",
    "pricing strategy calculator",
    "margin of safety calculator",
    "business planning calculator",
    "startup calculator",
    "cost volume profit analysis",
    "business profitability",
    "break even point",
    "business metrics",
    "financial planning",
    "revenue calculator"
  ],
  openGraph: {
    title: "Break-even Calculator - Smart Business Analysis",
    description:
      "Calculate break-even points, analyze profitability, and optimize pricing strategies. Essential business planning tool for entrepreneurs and managers.",
    type: "website",
    url: getUrl('/breakeven-calculator'),
    siteName: "AI Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Break-even Calculator - Business Planning Tool",
    description:
      "Free break-even analysis calculator with pricing strategies and profit optimization insights.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: getUrl('/breakeven-calculator'),
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
      "name": "Break-even Calculator",
      "url": getUrl('/breakeven-calculator'),
      "description": "Professional break-even analysis calculator for business planning and profitability analysis. Calculate break-even points, contribution margins, target profits, and develop pricing strategies with comprehensive business insights.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Break-even point calculations",
        "Contribution margin analysis",
        "Target profit calculations",
        "Current profitability analysis",
        "Margin of safety calculations",
        "Operating leverage analysis",
        "Pricing strategy recommendations",
        "Business risk assessment",
        "Sales volume projections",
        "Cost structure analysis",
        "Profit optimization insights",
        "Business scenario comparisons",
        "Monthly and yearly analysis",
        "Professional business insights",
        "Decision support recommendations",
        "Financial planning tools"
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
          "name": "Financial",
          "item": getUrl('/financial')
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Break-even Calculator",
          "item": getUrl('/breakeven-calculator')
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is break-even analysis and why is it important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Break-even analysis determines the sales volume needed to cover all costs (fixed and variable) with zero profit or loss. It's crucial for business planning as it helps determine minimum sales targets, pricing strategies, and financial viability. The break-even point is calculated as: Fixed Costs ÷ (Selling Price per Unit - Variable Cost per Unit)."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate my break-even point?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To calculate break-even point: 1) Identify fixed costs (rent, salaries, insurance), 2) Determine variable cost per unit (materials, labor), 3) Set selling price per unit, 4) Calculate contribution margin (selling price - variable cost), 5) Divide fixed costs by contribution margin. For example: $10,000 fixed costs ÷ ($50 price - $30 variable cost) = 500 units to break even."
          }
        },
        {
          "@type": "Question",
          "name": "What is contribution margin and how does it affect profitability?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contribution margin is the amount each unit sale contributes to covering fixed costs and generating profit (Selling Price - Variable Cost per Unit). A higher contribution margin means fewer units needed to break even and greater profit potential. Contribution margin ratio (contribution margin ÷ selling price) shows the percentage of each sale that contributes to profit."
          }
        },
        {
          "@type": "Question",
          "name": "How can I use break-even analysis for pricing decisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Break-even analysis guides pricing by showing how price changes affect profitability. Higher prices increase contribution margin but may reduce sales volume. Lower prices may increase volume but reduce per-unit profit. Test different price points to find the optimal balance. Consider market conditions, competition, and customer value perception when setting prices."
          }
        },
        {
          "@type": "Question",
          "name": "What is margin of safety and why does it matter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Margin of safety is the difference between actual sales and break-even sales, showing how much sales can drop before losses occur. A higher margin of safety indicates lower business risk. Calculate as: (Current Sales - Break-even Sales) ÷ Current Sales × 100%. A margin of safety above 20% is generally considered healthy for most businesses."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I update my break-even analysis?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Update break-even analysis whenever costs, prices, or business conditions change significantly. Review monthly for active businesses, quarterly for stable operations. Key triggers include: cost increases, price changes, new product launches, market shifts, or major operational changes. Regular updates ensure accurate financial planning and decision-making."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "name": "How to Perform Break-even Analysis for Your Business",
      "description": "Complete guide to calculating and using break-even analysis for business planning",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Identify Fixed and Variable Costs",
          "text": "List all fixed costs (rent, salaries, insurance) and variable costs per unit (materials, direct labor, commissions). Ensure accurate cost classification for reliable analysis."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Set Selling Price and Calculate Contribution Margin",
          "text": "Determine your selling price per unit and subtract variable cost per unit to get contribution margin. This shows how much each sale contributes to covering fixed costs."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Break-even Point",
          "text": "Divide total fixed costs by contribution margin per unit to find break-even units. Multiply by selling price to get break-even revenue. This is your minimum sales target."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Analyze Current Performance and Set Targets",
          "text": "Compare current sales to break-even point. Calculate margin of safety and determine units needed for target profit levels. Use insights for strategic planning."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Develop Pricing and Growth Strategies",
          "text": "Use break-even analysis to test different pricing scenarios, evaluate cost reduction opportunities, and plan for business growth and expansion."
        }
      ]
    }
  ]
} as const;

export default function BreakevenCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Break-even Calculator - Business Profitability Analysis Tool</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Break"
        calculatorUrl="/breakeven-calculator"
      />

      {/* Calculator Section */}
      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <BreakevenCalculator />
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" 
               aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mastering Break-even Analysis: Essential Business Planning Tool
              </h2>
              
              <div className="prose max-w-none text-gray-700 space-y-6">
                <p>
                  Break-even analysis is a fundamental financial tool that helps businesses determine 
                  the minimum sales volume needed to cover all costs. Understanding your break-even 
                  point is crucial for pricing decisions, financial planning, and assessing business 
                  viability in competitive markets.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Core Break-even Concepts</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h4 className="text-lg font-bold text-blue-900 mb-3">🏢 Fixed Costs</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Definition:</strong> Costs that remain constant regardless of production volume</div>
                      <div><strong>Examples:</strong> Rent, salaries, insurance, equipment leases</div>
                      <div><strong>Characteristics:</strong> Must be paid even with zero sales</div>
                      <div className="text-blue-800 mt-2">
                        <strong>Impact:</strong> Higher fixed costs increase break-even point
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h4 className="text-lg font-bold text-green-900 mb-3">📦 Variable Costs</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Definition:</strong> Costs that change proportionally with production volume</div>
                      <div><strong>Examples:</strong> Materials, direct labor, commissions, shipping</div>
                      <div><strong>Characteristics:</strong> Zero variable costs with zero production</div>
                      <div className="text-green-800 mt-2">
                        <strong>Impact:</strong> Lower variable costs improve contribution margin
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Break-even Calculation Methods</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">📊 Unit Break-even Formula</h4>
                    <div className="bg-white rounded-lg p-4 border border-gray-300 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 mb-2">Break-even Units = Fixed Costs ÷ Contribution Margin per Unit</div>
                        <div className="text-sm text-gray-600">Where: Contribution Margin = Selling Price - Variable Cost per Unit</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2">Example Calculation:</h5>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Fixed Costs: $10,000/month</li>
                          <li>• Selling Price: $50/unit</li>
                          <li>• Variable Cost: $30/unit</li>
                          <li>• Contribution Margin: $20/unit</li>
                          <li>• <strong>Break-even: 500 units/month</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2">Revenue Break-even:</h5>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Break-even Units × Selling Price</li>
                          <li>• 500 units × $50 = $25,000</li>
                          <li>• <strong>Break-even Revenue: $25,000/month</strong></li>
                          <li>• Alternative: Fixed Costs ÷ Contribution Margin Ratio</li>
                          <li>• $10,000 ÷ 40% = $25,000</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Break-even Analysis</h3>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h4 className="text-lg font-bold text-purple-900 mb-4">🎯 Target Profit Analysis</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-purple-900 mb-2">Formula:</h5>
                        <div className="bg-white rounded p-3 border border-purple-300 text-center mb-3">
                          <div className="font-bold">Target Units = (Fixed Costs + Target Profit) ÷ Contribution Margin</div>
                        </div>
                        <ul className="text-purple-800 space-y-1 text-sm">
                          <li>• Determines sales needed for desired profit</li>
                          <li>• Essential for goal setting and planning</li>
                          <li>• Helps evaluate profit feasibility</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-purple-900 mb-2">Example:</h5>
                        <ul className="text-purple-800 space-y-1 text-sm">
                          <li>• Fixed Costs: $10,000</li>
                          <li>• Target Profit: $5,000</li>
                          <li>• Contribution Margin: $20</li>
                          <li>• <strong>Target Units: 750 units</strong></li>
                          <li>• <strong>Target Revenue: $37,500</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                    <h4 className="text-lg font-bold text-orange-900 mb-4">🛡️ Margin of Safety Analysis</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-orange-900 mb-2">Calculation:</h5>
                        <div className="bg-white rounded p-3 border border-orange-300 text-center mb-3">
                          <div className="font-bold">Margin of Safety = (Current Sales - Break-even Sales) ÷ Current Sales</div>
                        </div>
                        <ul className="text-orange-800 space-y-1 text-sm">
                          <li>• Measures business risk tolerance</li>
                          <li>• Shows sales cushion before losses</li>
                          <li>• Higher percentage = lower risk</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-bold text-orange-900 mb-2">Risk Assessment:</h5>
                        <ul className="text-orange-800 space-y-1 text-sm">
                          <li>• <strong>&gt;30%:</strong> Very safe, low risk</li>
                          <li>• <strong>20-30%:</strong> Healthy margin</li>
                          <li>• <strong>10-20%:</strong> Moderate risk</li>
                          <li>• <strong>&lt;10%:</strong> High risk, vulnerable</li>
                          <li>• <strong>Negative:</strong> Operating at loss</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Strategic Applications</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-900">💰 Pricing Strategy Development</h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• <strong>Premium pricing:</strong> Higher margins, fewer units needed</li>
                      <li>• <strong>Competitive pricing:</strong> Market-based pricing with volume focus</li>
                      <li>• <strong>Penetration pricing:</strong> Lower margins, higher volume strategy</li>
                      <li>• <strong>Value-based pricing:</strong> Price based on customer perceived value</li>
                      <li>• <strong>Dynamic pricing:</strong> Adjust prices based on demand and costs</li>
                    </ul>
                    
                    <h4 className="text-lg font-bold text-gray-900">📈 Business Growth Planning</h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• <strong>Expansion analysis:</strong> Break-even for new locations or products</li>
                      <li>• <strong>Investment decisions:</strong> ROI analysis for equipment and facilities</li>
                      <li>• <strong>Staffing decisions:</strong> When to hire additional employees</li>
                      <li>• <strong>Market entry:</strong> Viability assessment for new markets</li>
                      <li>• <strong>Product mix:</strong> Optimize high-margin product focus</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-900">⚠️ Risk Management</h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• <strong>Scenario planning:</strong> Best/worst case break-even analysis</li>
                      <li>• <strong>Cost control:</strong> Monitor fixed and variable cost trends</li>
                      <li>• <strong>Cash flow planning:</strong> Ensure adequate working capital</li>
                      <li>• <strong>Market volatility:</strong> Prepare for demand fluctuations</li>
                      <li>• <strong>Competitive response:</strong> Plan for price wars or market changes</li>
                    </ul>
                    
                    <h4 className="text-lg font-bold text-gray-900">🎯 Performance Monitoring</h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li>• <strong>Monthly tracking:</strong> Monitor progress toward break-even</li>
                      <li>• <strong>Variance analysis:</strong> Compare actual vs. projected performance</li>
                      <li>• <strong>Trend analysis:</strong> Identify improving or declining patterns</li>
                      <li>• <strong>Benchmark comparison:</strong> Compare to industry standards</li>
                      <li>• <strong>Corrective actions:</strong> Implement improvements when needed</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mt-8">
                  <h4 className="text-lg font-bold text-yellow-900 mb-4">💡 Best Practices for Break-even Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-yellow-800 space-y-2 text-sm">
                      <li>• <strong>Accurate cost classification:</strong> Properly categorize fixed vs. variable costs</li>
                      <li>• <strong>Regular updates:</strong> Review analysis monthly or when costs change</li>
                      <li>• <strong>Multiple scenarios:</strong> Analyze optimistic, realistic, and pessimistic cases</li>
                      <li>• <strong>Market research:</strong> Validate pricing assumptions with customer feedback</li>
                    </ul>
                    <ul className="text-yellow-800 space-y-2 text-sm">
                      <li>• <strong>Sensitivity analysis:</strong> Test how changes affect break-even point</li>
                      <li>• <strong>Industry benchmarks:</strong> Compare your metrics to industry standards</li>
                      <li>• <strong>Professional guidance:</strong> Consult accountants for complex situations</li>
                      <li>• <strong>Technology tools:</strong> Use software for complex multi-product analysis</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-6">
                  Break-even analysis is more than just a calculation—it's a strategic tool that guides 
                  pricing, planning, and performance management. Regular analysis helps businesses stay 
                  profitable, make informed decisions, and adapt to changing market conditions. Use our 
                  calculator to explore different scenarios and optimize your business strategy.
                </p>
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Business Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/business-loan-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Business Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate business loan payments</p>
                </Link>
                <Link href="/roi-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">ROI Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Return on investment analysis</p>
                </Link>
                <Link href="/cash-flow-calculator" className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Cash Flow Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Analyze business cash flow</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
