import { Metadata } from "next";
import { RefinanceCalculator } from "@/components/Calculator/RefinanceCalculator";

export const metadata: Metadata = {
  title: "Refinance Calculator - Should You Refinance Your Mortgage? | Free Tool",
  description: "Free mortgage refinance calculator to see if refinancing saves money. Calculate monthly savings, break-even point, and lifetime savings. Compare current vs new loan rates instantly.",
  keywords: [
    "refinance calculator",
    "mortgage refinance calculator",
    "should i refinance",
    "refinance savings calculator",
    "home loan refinance",
    "refinancing calculator",
    "mortgage refi calculator",
    "refinance break even calculator",
    "cash out refinance calculator",
    "refinance comparison calculator",
    "when to refinance mortgage",
    "refinance worth it calculator",
    "lower mortgage rate calculator",
    "refinance closing costs",
    "home refinance calculator",
  ],
  openGraph: {
    title: "Free Refinance Calculator - See If You Should Refinance",
    description: "Calculate monthly savings and break-even point. See if refinancing your mortgage makes financial sense.",
    type: "website",
    url: "https://aicalculator.com/refinance-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refinance Calculator - Calculate Refinancing Savings",
    description: "Should you refinance your mortgage? Find out in seconds with our free calculator.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.com/refinance-calculator",
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

export default function RefinanceCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Refinance Calculator",
        "url": "https://aicalculator.com/refinance-calculator",
        "description": "Free online mortgage refinance calculator to determine if refinancing makes financial sense. Calculate monthly savings, break-even point, lifetime savings, and compare your current loan vs new loan options. Features instant results, closing cost analysis, and personalized recommendations.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate monthly payment savings",
          "Determine break-even point",
          "Compare current vs new loan terms",
          "Factor in closing costs",
          "Include cash-out refinancing",
          "Instant recommendations",
          "Lifetime savings calculation",
          "Share and print results",
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
            "item": "https://aicalculator.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Calculators",
            "item": "https://aicalculator.com/calculators"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Refinance Calculator",
            "item": "https://aicalculator.com/refinance-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "When should I refinance my mortgage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You should consider refinancing your mortgage when: 1) Interest rates drop 0.5-1% or more below your current rate, 2) Your credit score has improved significantly (50+ points), 3) You want to switch loan types (ARM to fixed or vice versa), 4) You need to remove PMI after reaching 20% equity, 5) You want to change loan term (30-year to 15-year), 6) You need cash-out for home improvements or debt consolidation. The key is ensuring the monthly savings exceed the closing costs within your planned time in the home. Generally, if you'll break even in 2-3 years and plan to stay 5+ years, refinancing makes sense."
            }
          },
          {
            "@type": "Question",
            "name": "How much does it cost to refinance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Refinancing typically costs 2-5% of your loan amount in closing costs. For a $250,000 mortgage, expect $5,000-$12,500 in fees. Common costs include: Application fee ($300-$500), Origination fee (0.5-1% of loan), Appraisal ($400-$600), Title search and insurance ($700-$1,000), Credit report ($25-$50), Attorney fees ($500-$1,500), Recording fees ($100-$250). Some lenders offer 'no-closing-cost' refinancing where they roll costs into the loan or charge a higher interest rate. However, you still pay - just spread out over time instead of upfront."
            }
          },
          {
            "@type": "Question",
            "name": "What is the break-even point in refinancing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The break-even point is the number of months it takes for your monthly savings to equal the upfront refinancing costs. Formula: Break-even = Total Closing Costs / Monthly Savings. Example: $5,000 closing costs / $200 monthly savings = 25 months (about 2 years). If you plan to stay in your home longer than the break-even period, refinancing makes financial sense. If you'll move before reaching break-even, you'll lose money on the refinance. Most experts recommend refinancing only if break-even is 2-3 years or less, and you plan to stay at least 5 years."
            }
          },
          {
            "@type": "Question",
            "name": "Should I refinance to a 15-year or 30-year mortgage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Choose based on your financial goals: 15-year mortgage advantages: Lower interest rate (typically 0.5-0.75% less), massive interest savings (often $100K+), build equity faster, debt-free sooner, forced savings discipline. Disadvantages: Higher monthly payment (30-50% more), less flexibility, opportunity cost (could invest difference). 30-year mortgage advantages: Lower monthly payment, more cash flow flexibility, easier to qualify, can invest payment difference, better for tight budgets. Disadvantages: Pay much more interest over time, slower equity building, longer debt commitment. Rule of thumb: Choose 15-year if you can comfortably afford 30% higher payments and want to minimize interest. Choose 30-year if you need flexibility or want to invest the difference."
            }
          },
          {
            "@type": "Question",
            "name": "What credit score do I need to refinance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minimum credit score requirements for refinancing: Conventional loan: 620 minimum (best rates require 740+), FHA refinance: 580 minimum (500-579 requires 10% equity), VA refinance: No minimum (but lenders typically want 620+), USDA refinance: 640+ recommended. Higher scores = better rates: 760+ = best rates (save 0.5-0.75% vs. lower scores), 700-759 = good rates, 680-699 = average rates (+0.25% vs. excellent), 620-679 = higher rates (+0.5-1% vs. excellent). To improve chances: Pay down credit cards below 30% utilization, make all payments on time for 6-12 months, don't open new credit before applying, dispute errors on credit report, consider adding income sources to application."
            }
          },
          {
            "@type": "Question",
            "name": "What is cash-out refinancing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cash-out refinancing means taking a new mortgage larger than your current balance and receiving the difference in cash. Example: You owe $200K, home worth $400K. You refinance for $250K, keeping $200K to pay off old loan and receiving $50K cash (minus closing costs). Common uses: Home improvements (adds value), Debt consolidation (replace high-interest debt), Education expenses, Business investment, Emergency funds. Pros: Lower rate than credit cards/personal loans (typically 6-8% vs 15-25%), Tax-deductible if used for home improvements, Single monthly payment. Cons: Increases loan balance, Resets loan term to 30 years, Requires 20% equity minimum, Higher rates than rate-and-term refinance (+0.25-0.5%), Risk losing home if can't pay. Alternatives: HELOC (keeps first mortgage intact, variable rate), Home equity loan (second mortgage, fixed rate), Personal loan (no home equity required)."
            }
          },
          {
            "@type": "Question",
            "name": "Can I refinance if I have PMI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, and refinancing is often an excellent way to remove PMI (Private Mortgage Insurance). You can eliminate PMI through refinancing if: 1) Your home value has increased and you now have 20%+ equity, 2) You've paid down principal to 80% loan-to-value, 3) You've made home improvements increasing value. Example: Bought home for $300K with 10% down ($30K). Original loan: $270K with PMI ($150/month). Home now worth $360K. You've paid $20K in principal. New loan-to-value: $250K / $360K = 69% (31% equity). Result: Refinance to remove PMI, save $150/month ($1,800/year). Even if new rate is same, eliminating PMI makes refinancing worthwhile. Appraisal is key: Lender will order new appraisal to verify value increase. If appraisal comes in low, you won't qualify. Pro tip: Make obvious improvements before appraisal (fresh paint, landscaping, minor repairs)."
            }
          },
          {
            "@type": "Question",
            "name": "How long does refinancing take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typical refinancing timeline: 30-45 days from application to closing. Week 1-2 (Pre-approval & Application): Submit application (1 day), Lender pulls credit, verifies income/assets (3-7 days), Get pre-approval letter (2-3 days), Lock interest rate (if desired). Week 2-3 (Processing): Order home appraisal ($400-$600, takes 1-2 weeks), Submit additional documents requested, Lender reviews appraisal, title search. Week 3-4 (Underwriting): Underwriter reviews entire file, May request additional documentation (pay stubs, bank statements, explanation letters), Final approval issued. Week 4-5 (Closing): Schedule closing appointment, Review Closing Disclosure (3 days before closing required by law), Attend closing, sign documents, Receive funds (3 days later for cash-out refinance). Faster refinancing options: Streamline refinance (FHA/VA): 15-30 days, no appraisal, Same-lender refinance: 15-30 days, simplified docs, Digital closings: can reduce time by 5-10 days. Delays happen due to: Missing documents, Low appraisal, Credit issues discovered, Title problems, High volume periods."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Decide If You Should Refinance Your Mortgage",
        "description": "Step-by-step guide to determining if refinancing makes financial sense",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Current Loan Details",
            "text": "Input your current mortgage balance (not original amount), current interest rate, and years remaining on your loan. This establishes your baseline for comparison."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter New Loan Options",
            "text": "Input the new interest rate offered, desired new loan term (15, 20, or 30 years), estimated closing costs (typically 2-5% of loan amount), and any cash-out amount you want to take."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Review Results and Recommendation",
            "text": "The calculator shows monthly savings, break-even point, and a recommendation (Worth It, Maybe, or Not Recommended). Green = good deal, yellow = borderline, red = not worth it."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Make Your Decision",
            "text": "If break-even is less than 2-3 years and you plan to stay 5+ years, refinancing likely makes sense. Consider your personal situation: cash flow needs, long-term plans, and overall financial goals."
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
      
      <h1 className="sr-only">Refinance Calculator - Free Tool to Calculate Mortgage Refinancing Savings, Break-Even Point, and Compare Current vs New Loan Options</h1>
      
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
              <span itemProp="name" className="text-gray-900 font-semibold">Refinance Calculator</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="py-8 md:py-12" aria-label="Refinance Calculator Tool">
        <div className="container mx-auto px-4">
          <RefinanceCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Refinance Guide">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Guide to Mortgage Refinancing
            </h2>

            {/* When to Refinance */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">When Should You Refinance?</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-3">✅ Great Reasons to Refinance:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Interest rates dropped 0.5-1%+:</strong> Significant monthly savings, often $100-$300/month on $250K loan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Credit score improved 50+ points:</strong> Qualify for better rates you couldn't get before</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Remove PMI with 20% equity:</strong> Save $50-$200/month by eliminating insurance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Switch from ARM to fixed rate:</strong> Lock in rate before ARM adjusts higher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Shorten loan term (30yr→15yr):</strong> Save $50K-$150K in interest with affordable payment increase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">•</span>
                      <span><strong>Cash-out for home improvements:</strong> Increase home value, tax-deductible interest</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-red-700 mb-3">❌ Bad Reasons to Refinance:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Moving within 2-3 years:</strong> Won't reach break-even point, waste closing costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Rate drops less than 0.5%:</strong> Minimal savings, closing costs often not worth it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Extending loan term for lower payment:</strong> May pay more interest long-term ($30yr→$30yr reset)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Cash-out for vacations/cars:</strong> Using home as ATM, risky if can't pay back</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Credit score dropped significantly:</strong> Won't qualify for better rates, may get worse terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span><strong>Already refinanced recently (1-2yr):</strong> Another appraisal/closing costs, minimal benefit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Refinancing Costs Breakdown</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Fee Type</th>
                      <th className="px-4 py-3 text-left font-semibold">Typical Cost</th>
                      <th className="px-4 py-3 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-medium">Application Fee</td>
                      <td className="px-4 py-3">$300-$500</td>
                      <td className="px-4 py-3">Processing your application</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium">Origination Fee</td>
                      <td className="px-4 py-3">0.5-1% of loan</td>
                      <td className="px-4 py-3">Lender's fee for creating loan ($1,250-$2,500 on $250K)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Appraisal</td>
                      <td className="px-4 py-3">$400-$600</td>
                      <td className="px-4 py-3">Professional home valuation</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium">Title Search & Insurance</td>
                      <td className="px-4 py-3">$700-$1,000</td>
                      <td className="px-4 py-3">Verify ownership, protect against claims</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Credit Report</td>
                      <td className="px-4 py-3">$25-$50</td>
                      <td className="px-4 py-3">Pull credit from all 3 bureaus</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium">Attorney/Closing Fees</td>
                      <td className="px-4 py-3">$500-$1,500</td>
                      <td className="px-4 py-3">Legal review and closing services</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Recording Fees</td>
                      <td className="px-4 py-3">$100-$250</td>
                      <td className="px-4 py-3">Government filing of new mortgage</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-medium">Misc. Fees</td>
                      <td className="px-4 py-3">$200-$500</td>
                      <td className="px-4 py-3">Courier, notary, document prep</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 font-bold">TOTAL</td>
                      <td className="px-4 py-3 font-bold text-blue-700">$5,000-$8,000</td>
                      <td className="px-4 py-3 font-bold">On $250K loan (2-3%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Pro Tip:</strong> "No-closing-cost" refinancing means the lender covers fees by charging a slightly higher interest rate (typically +0.25-0.5%). You still pay, just over time instead of upfront. Best if you plan to move within 5-7 years.
                </p>
              </div>
            </div>

            {/* Real Examples */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-World Refinancing Examples</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-green-700 mb-2">✅ Example 1: Clear Win</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Situation:</strong> $300K balance, 6.5% rate, 25 years left → Refinance to 5.5%, 30 years, $6K costs</p>
                    <p><strong>Current payment:</strong> $2,029/month</p>
                    <p><strong>New payment:</strong> $1,703/month</p>
                    <p><strong>Monthly savings:</strong> $326/month</p>
                    <p><strong>Break-even:</strong> 18 months (1.5 years)</p>
                    <p className="text-green-700 font-bold">✅ Decision: Refinance! Break even quickly, save $326/month. If staying 5+ years, save $19,560 total.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-yellow-700 mb-2">⚠️ Example 2: Borderline Case</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Situation:</strong> $200K balance, 5.5% rate, 10 years left → Refinance to 5%, 15 years, $4K costs</p>
                    <p><strong>Current payment:</strong> $2,179/month</p>
                    <p><strong>New payment:</strong> $1,582/month</p>
                    <p><strong>Monthly savings:</strong> $597/month</p>
                    <p><strong>Break-even:</strong> 7 months</p>
                    <p className="text-yellow-700 font-bold">⚠️ Decision: Depends on plans. Great if staying, but extending to 15yr means paying more interest long-term ($284K vs $261K). Consider 10-year term instead.</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-red-700 mb-2">❌ Example 3: Not Worth It</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>Situation:</strong> $150K balance, 4.5% rate, 15 years left → Refinance to 4.25%, 15 years, $3.5K costs</p>
                    <p><strong>Current payment:</strong> $1,148/month</p>
                    <p><strong>New payment:</strong> $1,127/month</p>
                    <p><strong>Monthly savings:</strong> $21/month</p>
                    <p><strong>Break-even:</strong> 167 months (14 years!)</p>
                    <p className="text-red-700 font-bold">❌ Decision: Don't refinance. Tiny rate drop (0.25%), break-even takes almost the entire remaining term. Save the $3.5K closing costs.</p>
                  </div>
                </div>
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
                    When should I refinance my mortgage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      You should consider refinancing your mortgage when: 1) Interest rates drop 0.5-1% or more below your current rate, 2) Your credit score has improved significantly (50+ points), 3) You want to switch loan types (ARM to fixed or vice versa), 4) You need to remove PMI after reaching 20% equity, 5) You want to change loan term (30-year to 15-year), 6) You need cash-out for home improvements or debt consolidation. The key is ensuring the monthly savings exceed the closing costs within your planned time in the home. Generally, if you'll break even in 2-3 years and plan to stay 5+ years, refinancing makes sense.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much does it cost to refinance?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Refinancing typically costs 2-5% of your loan amount in closing costs. For a $250,000 mortgage, expect $5,000-$12,500 in fees. Common costs include: Application fee ($300-$500), Origination fee (0.5-1% of loan), Appraisal ($400-$600), Title search and insurance ($700-$1,000), Credit report ($25-$50), Attorney fees ($500-$1,500), Recording fees ($100-$250). Some lenders offer 'no-closing-cost' refinancing where they roll costs into the loan or charge a higher interest rate. However, you still pay - just spread out over time instead of upfront.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is the break-even point in refinancing?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      The break-even point is the number of months it takes for your monthly savings to equal the upfront refinancing costs. Formula: Break-even = Total Closing Costs / Monthly Savings. Example: $5,000 closing costs / $200 monthly savings = 25 months (about 2 years). If you plan to stay in your home longer than the break-even period, refinancing makes financial sense. If you'll move before reaching break-even, you'll lose money on the refinance. Most experts recommend refinancing only if break-even is 2-3 years or less, and you plan to stay at least 5 years.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Should I refinance to a 15-year or 30-year mortgage?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Choose based on your financial goals: 15-year mortgage advantages: Lower interest rate (typically 0.5-0.75% less), massive interest savings (often $100K+), build equity faster, debt-free sooner, forced savings discipline. Disadvantages: Higher monthly payment (30-50% more), less flexibility, opportunity cost (could invest difference). 30-year mortgage advantages: Lower monthly payment, more cash flow flexibility, easier to qualify, can invest payment difference, better for tight budgets. Disadvantages: Pay much more interest over time, slower equity building, longer debt commitment. Rule of thumb: Choose 15-year if you can comfortably afford 30% higher payments and want to minimize interest. Choose 30-year if you need flexibility or want to invest the difference.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What credit score do I need to refinance?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Minimum credit score requirements for refinancing: Conventional loan: 620 minimum (best rates require 740+), FHA refinance: 580 minimum (500-579 requires 10% equity), VA refinance: No minimum (but lenders typically want 620+), USDA refinance: 640+ recommended. Higher scores = better rates: 760+ = best rates (save 0.5-0.75% vs. lower scores), 700-759 = good rates, 680-699 = average rates (+0.25% vs. excellent), 620-679 = higher rates (+0.5-1% vs. excellent). To improve chances: Pay down credit cards below 30% utilization, make all payments on time for 6-12 months, don't open new credit before applying, dispute errors on credit report, consider adding income sources to application.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    What is cash-out refinancing?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Cash-out refinancing means taking a new mortgage larger than your current balance and receiving the difference in cash. Example: You owe $200K, home worth $400K. You refinance for $250K, keeping $200K to pay off old loan and receiving $50K cash (minus closing costs). Common uses: Home improvements (adds value), Debt consolidation (replace high-interest debt), Education expenses, Business investment, Emergency funds. Pros: Lower rate than credit cards/personal loans (typically 6-8% vs 15-25%), Tax-deductible if used for home improvements, Single monthly payment. Cons: Increases loan balance, Resets loan term to 30 years, Requires 20% equity minimum, Higher rates than rate-and-term refinance (+0.25-0.5%), Risk losing home if can't pay. Alternatives: HELOC (keeps first mortgage intact, variable rate), Home equity loan (second mortgage, fixed rate), Personal loan (no home equity required).
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    Can I refinance if I have PMI?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Yes, and refinancing is often an excellent way to remove PMI (Private Mortgage Insurance). You can eliminate PMI through refinancing if: 1) Your home value has increased and you now have 20%+ equity, 2) You've paid down principal to 80% loan-to-value, 3) You've made home improvements increasing value. Example: Bought home for $300K with 10% down ($30K). Original loan: $270K with PMI ($150/month). Home now worth $360K. You've paid $20K in principal. New loan-to-value: $250K / $360K = 69% (31% equity). Result: Refinance to remove PMI, save $150/month ($1,800/year). Even if new rate is same, eliminating PMI makes refinancing worthwhile. Appraisal is key: Lender will order new appraisal to verify value increase. If appraisal comes in low, you won't qualify. Pro tip: Make obvious improvements before appraisal (fresh paint, landscaping, minor repairs).
                    </p>
                  </div>
                </div>

                <div className="pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How long does refinancing take?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Typical refinancing timeline: 30-45 days from application to closing. Week 1-2 (Pre-approval & Application): Submit application (1 day), Lender pulls credit, verifies income/assets (3-7 days), Get pre-approval letter (2-3 days), Lock interest rate (if desired). Week 2-3 (Processing): Order home appraisal ($400-$600, takes 1-2 weeks), Submit additional documents requested, Lender reviews appraisal, title search. Week 3-4 (Underwriting): Underwriter reviews entire file, May request additional documentation (pay stubs, bank statements, explanation letters), Final approval issued. Week 4-5 (Closing): Schedule closing appointment, Review Closing Disclosure (3 days before closing required by law), Attend closing, sign documents, Receive funds (3 days later for cash-out refinance). Faster refinancing options: Streamline refinance (FHA/VA): 15-30 days, no appraisal, Same-lender refinance: 15-30 days, simplified docs, Digital closings: can reduce time by 5-10 days. Delays happen due to: Missing documents, Low appraisal, Credit issues discovered, Title problems, High volume periods.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Mortgage Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/mortgage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate monthly mortgage payments</p>
                </a>
                <a href="/mortgage-payoff-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Payoff Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">See early payoff savings</p>
                </a>
                <a href="/loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate any type of loan payment</p>
                </a>
                <a href="/interest-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Interest Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate compound interest</p>
                </a>
                <a href="/debt-payoff-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Debt Payoff Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Plan your debt elimination</p>
                </a>
                <a href="/auto-loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Auto Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate car loan payments</p>
                </a>
              </div>
            </div>

            {/* External Links */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p className="mb-2">Learn more about mortgage refinancing:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://www.consumerfinance.gov/owning-a-home/mortgage-closing/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  CFPB: Mortgage Guide →
                </a>
                <a href="https://www.bankrate.com/mortgages/refinance-calculator/" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Bankrate: Refinance Guide →
                </a>
                <a href="https://en.wikipedia.org/wiki/Refinancing" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 hover:underline">
                  Wikipedia: Refinancing →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

