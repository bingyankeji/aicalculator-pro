import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { SquareFootageCalculator } from '@/components/Calculator/SquareFootageCalculator';

export const metadata: Metadata = {
  title: "Square Footage Calculator (Free, No signup) - Room Area | AICalculator",
  description: "Free square footage calculator with no sign-up required. Calculate square footage for multiple rooms and estimate material costs. Free calculator for flooring, paint, carpet with waste factor. Perfect for home renovation and construction projects.",
  keywords: ["square footage calculator", "free square footage calculator", "square footage calculator no signup", "room area calculator", "flooring calculator", "paint calculator", "material estimator", "square feet calculator", "room size calculator", "carpet calculator", "tile calculator", "construction calculator", "renovation calculator", "sq ft calculator"],
  openGraph: {
    title: "Square Footage Calculator (Free, No signup) - AICalculator",
    description: "Free square footage calculator with no sign-up required. Calculate room areas and estimate materials for flooring, paint, and carpet. Free tool for home renovation projects.",
    type: "website",
    url: "https://aicalculator.pro/square-footage-calculator",
    siteName: "AICalculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Square Footage Calculator (Free, No signup) - AICalculator",
    description: "Free square footage calculator with no sign-up required. Calculate square footage and estimate materials for homeowners and contractors.",
    site: "@AICalculator",
  },
  alternates: {
    canonical: "https://aicalculator.pro/square-footage-calculator",
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

export default function SquareFootageCalculatorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Square Footage Calculator",
        "url": "https://aicalculator.pro/square-footage-calculator",
        "description": "Free square footage calculator for multiple rooms with material estimation for flooring, paint, and carpet. Includes waste factor and cost calculator.",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Multiple room calculation",
          "Feet and meter support",
          "Flooring material estimator",
          "Paint calculator with coats",
          "Carpet yardage calculator",
          "Waste factor adjustment",
          "Cost estimation",
          "Tile and box counter",
          "Wall area calculation",
          "Share and export results"
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
            "name": "Math & Numbers",
            "item": "https://aicalculator.pro/math-numbers"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Square Footage Calculator",
            "item": "https://aicalculator.pro/square-footage-calculator"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate square footage of a room?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate square footage: 1. Measure room length and width in feet, 2. Multiply length × width = square feet. Example: A room 12 feet long × 10 feet wide = 120 square feet. For irregular rooms: Break the room into rectangles, calculate each section separately, add all sections together. For L-shaped rooms: Divide into two rectangles (like a 10×12 section + 8×6 section = 120 + 48 = 168 sq ft). Convert units: 1 square foot = 0.0929 square meters, 1 square yard = 9 square feet, 1 square meter = 10.764 square feet. Pro tips: Always round up when buying materials, measure to nearest inch for accuracy, account for doorways and closets, remeasure to verify before purchasing."
            }
          },
          {
            "@type": "Question",
            "name": "How much flooring material should I buy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Calculate flooring materials with these steps: 1. Calculate room square footage (length × width), 2. Add 10-15% waste factor for cuts and mistakes, 3. Round up to nearest full box/unit. Waste factor guidelines: Standard rooms (rectangular): 10% extra, Irregular rooms or diagonal patterns: 15% extra, Patterned tile requiring alignment: 15-20% extra, Large tiles (24\"×24\" or bigger): 10% extra, Small tiles or mosaics: 15% extra. Common package sizes: Laminate/hardwood: 20-25 sq ft per box, Vinyl planks: 20-24 sq ft per box, Ceramic tile (12\"×12\"): typically 10-12 tiles per box, Carpet: sold by square yard (9 sq ft = 1 sq yd). Example: 200 sq ft room with 10% waste = 220 sq ft needed. At 20 sq ft per box = 11 boxes. Why extra? Damaged pieces, installation mistakes, future repairs, pattern matching, irregular cuts around doorways."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate paint needed for a room?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Calculate paint with this formula: 1. Measure room perimeter: (length + width) × 2, 2. Multiply perimeter × ceiling height = wall area, 3. Subtract windows and doors (typically 20 sq ft each), 4. Divide by paint coverage (usually 350-400 sq ft per gallon), 5. Multiply by number of coats needed (usually 2). Example calculation: 12' × 15' room with 8' ceilings. Perimeter: (12 + 15) × 2 = 54 feet. Wall area: 54 × 8 = 432 sq ft. Subtract 2 windows + 1 door: 432 - (3 × 20) = 372 sq ft. Paint needed: 372 ÷ 350 = 1.06 gallons per coat. For 2 coats: 1.06 × 2 = 2.12 gallons (buy 3 gallons). Paint coverage factors: Primer: 200-300 sq ft per gallon (buy more), Flat/matte: 350-400 sq ft per gallon, Satin/semi-gloss: 350-400 sq ft per gallon, Textured walls: reduce coverage by 20%, Dark to light color: may need 1 extra coat. Pro tip: Always buy an extra quart for touch-ups and future repairs."
            }
          },
          {
            "@type": "Question",
            "name": "What is the waste factor and why do I need it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Waste factor is extra material percentage to account for: Installation cuts - pieces cut to fit edges and corners, Mistakes and damage - broken tiles or scratched planks, Pattern matching - extra needed to align designs, Irregular room shapes - more cuts = more waste, Future repairs - matching material for fixes years later. Standard waste factors by material: Tile (straight lay): 10% extra, Tile (diagonal or pattern): 15-20% extra, Hardwood/laminate: 10% extra, Carpet: 10-15% extra, Vinyl planks: 10% extra, Large format tile (24\"+ tiles): 10-15% extra, Patterned materials: 15-20% extra. How to apply waste factor: Calculate exact square footage needed, multiply by 1.10 for 10% waste (or 1.15 for 15%), round up to nearest package/box size. Example: 180 sq ft room with 10% waste = 180 × 1.10 = 198 sq ft to purchase. Why it matters: Buying too little means stopping mid-project, running out mid-project delays timeline, matching batches later is difficult, different production runs may have slight color variations. Better to have 5-10% leftover than run short!"
            }
          },
          {
            "@type": "Question",
            "name": "How many square feet are in a box of flooring?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Flooring boxes vary by material and manufacturer, but typical coverage: Laminate flooring: 18-25 sq ft per box (average: 20-22 sq ft), Vinyl plank (LVP): 20-24 sq ft per box (average: 22 sq ft), Hardwood (engineered): 19-25 sq ft per box (average: 20 sq ft), Hardwood (solid 3/4\"): 20-25 sq ft per box (average: 22 sq ft), Tile boxes vary widely: 12\"×12\" tiles: 10-15 sq ft per box (~10-15 tiles), 16\"×16\" tiles: 12-18 sq ft per box (~6-8 tiles), 18\"×18\" tiles: 15-20 sq ft per box (~6-8 tiles), Large format (24\"×24\"): 16-32 sq ft per box (~4-8 tiles). How to calculate boxes needed: 1. Calculate total square feet with waste factor, 2. Divide by square feet per box, 3. Round UP to nearest whole box. Example: Need 220 sq ft with waste, flooring is 20 sq ft per box. 220 ÷ 20 = 11 boxes exactly. Buy 11-12 boxes (extra for future repairs). Always check: Box label for exact coverage, manufacturer's recommendations for waste factor, return policy for unopened boxes, batch numbers match (color consistency)."
            }
          },
          {
            "@type": "Question",
            "name": "How do I measure an irregular shaped room?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Measure irregular rooms by breaking them into rectangles: Method 1 - Divide into rectangles: Draw room outline on paper, divide room into rectangular sections, measure each section separately (length × width), add all rectangular areas together. Example L-shaped room: Main section: 15' × 12' = 180 sq ft, Extension: 8' × 6' = 48 sq ft, Total: 180 + 48 = 228 sq ft. Method 2 - Subtract missing areas: Measure full rectangle that would contain the room, calculate full rectangle area, subtract the missing/cut-out sections, result is actual room area. Example: Full rectangle: 20' × 15' = 300 sq ft, Cut-out section: 8' × 10' = 80 sq ft, Actual room: 300 - 80 = 220 sq ft. For curved or angled areas: Approximate curves as rectangles (slight overestimate is okay), for triangular sections use: (base × height) ÷ 2, add these approximations to main rectangular areas. Pro tips: Sketch room on graph paper first, measure in multiple spots if walls aren't perfectly straight, use laser measure for long distances, always add 10-15% waste factor for irregular rooms, double-check measurements before buying materials."
            }
          },
          {
            "@type": "Question",
            "name": "Should I include closets in square footage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, include closets in square footage for accurate material estimates. Why include closets: Real estate square footage includes closets (standard practice), you'll install flooring in closets too, paint extends into closet spaces, material estimates need total coverage area. How to measure closets: Measure closet length and width separately, calculate closet square footage (L × W), add closet area to main room calculation, if closet has irregular shape, break into rectangles. Small vs Walk-in closets: Small closets (3' × 4' = 12 sq ft): Usually include with room, Walk-in closets (6' × 8' = 48 sq ft): Measure separately, may need different flooring. What NOT to include in flooring: Permanent built-in furniture areas, areas under kitchen cabinets (if already installed), spaces under bathtubs (if already installed), mechanical room equipment footprints. For paint calculations: Include closet wall perimeter in total, closet ceilings usually painted too, closet interiors may need only 1 coat vs 2 for main rooms. Pro tip: For resale value, real estate square footage must include closets. For material orders, always include closets in your measurements!"
            }
          },
          {
            "@type": "Question",
            "name": "How much does it cost to install flooring per square foot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Flooring installation costs vary by material type and complexity. Average costs (materials + labor, 2024 prices): Budget options: Carpet: $3-8 per sq ft installed (material: $1-4, labor: $2-4), Vinyl sheet: $3-7 per sq ft installed (material: $1-3, labor: $2-4), Laminate: $5-10 per sq ft installed (material: $2-5, labor: $3-5). Mid-range options: Vinyl plank (LVP): $6-12 per sq ft installed (material: $3-7, labor: $3-5), Engineered hardwood: $8-15 per sq ft installed (material: $4-10, labor: $4-5), Ceramic tile: $10-18 per sq ft installed (material: $3-8, labor: $7-10). Premium options: Solid hardwood: $12-25 per sq ft installed (material: $6-15, labor: $6-10), Porcelain tile: $12-20 per sq ft installed (material: $5-10, labor: $7-10), Natural stone: $15-30+ per sq ft installed (material: $8-20, labor: $7-10). Labor-only costs (if DIY materials): Simple install (carpet, vinyl): $2-4 per sq ft, Moderate (laminate, engineered): $3-5 per sq ft, Complex (tile, hardwood): $5-10 per sq ft. Additional costs: Subfloor prep/repair: $2-5 per sq ft, Remove old flooring: $1-3 per sq ft, Furniture moving: $50-200 per room, Transition strips/moldings: $2-8 per linear foot, Stairs: $40-100 per step extra. DIY to save 40-60% on labor costs!"
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Square Footage and Materials",
        "description": "Calculate room square footage and estimate materials needed in 4 steps",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Add and Measure Rooms",
            "text": "Click 'Add Room' for each room in your project. Enter room name, length, and width. Choose feet or meters as your unit of measurement. For irregular rooms, break them into rectangles and add as separate entries."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Configure Material Settings",
            "text": "Set waste factor (10-15% recommended for most projects). Enter ceiling height for paint calculation. Choose number of paint coats (typically 2). Adjust paint coverage based on your product (usually 350-400 sq ft per gallon)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter Material Prices (Optional)",
            "text": "Input material costs: flooring price per square foot, paint price per gallon, and carpet price per square yard. This generates total cost estimates for your project."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Review Material Estimates",
            "text": "See total square footage across all rooms. Review flooring needs (square feet, tiles, boxes), paint requirements (gallons for walls), carpet yardage, and total material costs. Use these estimates when shopping for materials."
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
      
      <h1 className="sr-only">Square Footage Calculator - Free Room Area and Material Estimator for Flooring, Paint, and Carpet</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Square Footage Calculator (Free, No signup)"
        calculatorUrl="/square-footage-calculator"
      />

      <section className="py-8 md:py-12" aria-label="Calculator Tool">
        <div className="container mx-auto px-4">
          <SquareFootageCalculator />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-white" aria-label="Educational Content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Square Footage Guide for Home Renovation
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Understanding Square Footage</h3>
                <p className="text-gray-700 mb-4">
                  Square footage is the area measurement of a flat surface, calculated by multiplying length times width. It's the standard unit for measuring room size, flooring needs, and property value in the United States.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Why it matters:</strong> Accurate square footage is essential for: buying correct amount of materials, estimating project costs, pricing contractor labor, determining property value, planning furniture layout, calculating heating/cooling needs.
                </p>
                <p className="text-gray-700">
                  <strong>Common conversions:</strong> 1 square yard = 9 square feet | 1 square meter = 10.764 square feet | 144 square inches = 1 square foot
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Waste Factor Explained</h3>
                <p className="text-gray-700 mb-4">
                  Waste factor is the extra material percentage needed beyond exact measurements to account for cuts, mistakes, and future repairs.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="font-semibold text-gray-900 mb-2">Recommended Waste Factors:</div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><strong>10%:</strong> Standard rectangular rooms, straight tile layout</div>
                    <div><strong>15%:</strong> Irregular rooms, diagonal tile, patterned carpet</div>
                    <div><strong>20%:</strong> Complex patterns, intricate tile designs</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Why it's necessary:</strong> Edge cuts and corner pieces create unusable scraps, installation mistakes happen, material may be damaged in shipping, you'll want matching material for future repairs, manufacturers' batches have slight color variations.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Flooring Material Guide</h3>
                <p className="text-gray-700 mb-4">
                  Different flooring materials have different package sizes, installation requirements, and cost considerations.
                </p>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">Laminate & Engineered Hardwood</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • 18-25 sq ft per box (average 20-22 sq ft)<br/>
                      • DIY-friendly click-lock installation<br/>
                      • Cost: $2-8 per sq ft (material)<br/>
                      • 10% waste factor recommended
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Ceramic & Porcelain Tile</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Varies by tile size (10-20 sq ft per box)<br/>
                      • Professional installation recommended<br/>
                      • Cost: $3-15 per sq ft (material)<br/>
                      • 15% waste factor for diagonal layouts
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Vinyl Plank (LVP)</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • 20-24 sq ft per box<br/>
                      • Water-resistant, DIY-friendly<br/>
                      • Cost: $2-7 per sq ft (material)<br/>
                      • 10% waste factor sufficient
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Carpet</div>
                    <div className="text-gray-700 ml-3 text-xs mt-1">
                      • Sold by square yard (9 sq ft = 1 sq yd)<br/>
                      • Professional installation required<br/>
                      • Cost: $2-8 per sq ft installed<br/>
                      • 10-15% waste factor depending on pattern
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Paint Coverage Guide</h3>
                <p className="text-gray-700 mb-4">
                  Paint coverage varies by paint quality, surface texture, and application method. Understanding these factors helps you buy the right amount.
                </p>
                <div className="space-y-3 text-sm mb-4">
                  <div>
                    <div className="font-semibold text-gray-900">Standard Coverage</div>
                    <div className="text-gray-700">
                      • Quality paint: 350-400 sq ft per gallon<br/>
                      • Budget paint: 250-300 sq ft per gallon<br/>
                      • Primer: 200-300 sq ft per gallon
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Factors Affecting Coverage</div>
                    <div className="text-gray-700">
                      • Porous surfaces absorb more paint<br/>
                      • Textured walls need 20% more paint<br/>
                      • Dark to light color needs extra coats<br/>
                      • Spraying uses 30% more than rolling
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  <strong>Pro tip:</strong> Always buy an extra quart for touch-ups and future repairs. Different production batches can have slight color variations.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Measuring Tips for Accuracy</h3>
                <p className="text-gray-700 mb-4">
                  Accurate measurements are crucial for buying the right amount of materials and avoiding costly mistakes or project delays.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Measure twice:</strong> Double-check all measurements before purchasing materials</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Use laser measure:</strong> More accurate for long distances than tape measure</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Draw floor plan:</strong> Sketch room layout on graph paper with measurements</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Include closets:</strong> Don't forget closet floors and walls in calculations</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Check for square:</strong> Rooms aren't always perfectly rectangular</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700"><strong>Photograph measurements:</strong> Take photos of tape measure for reference</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Estimation Tips</h3>
                <p className="text-gray-700 mb-4">
                  Material costs are only part of your renovation budget. Factor in labor, prep work, and unexpected expenses for accurate project planning.
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Material Costs</div>
                    <div className="text-xs text-gray-700">
                      Flooring: $1-20 per sq ft (budget to premium)<br/>
                      Paint: $25-60 per gallon (quality varies)<br/>
                      Carpet: $2-10 per sq ft (installed)<br/>
                      Underlayment: $0.50-2 per sq ft
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Labor Costs</div>
                    <div className="text-xs text-gray-700">
                      Flooring install: $3-10 per sq ft<br/>
                      Painting: $2-6 per sq ft of wall<br/>
                      Subfloor repair: $2-5 per sq ft<br/>
                      Remove old flooring: $1-3 per sq ft
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="font-semibold text-sm text-gray-900 mb-1">Additional Expenses</div>
                    <div className="text-xs text-gray-700">
                      Transition strips: $15-50 each<br/>
                      Baseboards: $1-5 per linear foot<br/>
                      Furniture moving: $50-200 per room<br/>
                      Waste disposal: $50-300
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Material Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flooring Material Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Material</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Cost Range</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Durability</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">DIY-Friendly</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">Maintenance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold">Laminate</td>
                      <td className="px-4 py-3 text-center">$2-8/sq ft</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center text-green-600">✓ Yes</td>
                      <td className="px-4 py-3 text-center">Low</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Vinyl Plank</td>
                      <td className="px-4 py-3 text-center">$2-7/sq ft</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center text-green-600">✓ Yes</td>
                      <td className="px-4 py-3 text-center">Very Low</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Hardwood</td>
                      <td className="px-4 py-3 text-center">$6-20/sq ft</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center text-orange-600">Moderate</td>
                      <td className="px-4 py-3 text-center">Medium</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Ceramic Tile</td>
                      <td className="px-4 py-3 text-center">$3-15/sq ft</td>
                      <td className="px-4 py-3 text-center">⭐⭐⭐⭐⭐</td>
                      <td className="px-4 py-3 text-center text-red-600">✗ No</td>
                      <td className="px-4 py-3 text-center">Low</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">Carpet</td>
                      <td className="px-4 py-3 text-center">$2-10/sq ft</td>
                      <td className="px-4 py-3 text-center">⭐⭐</td>
                      <td className="px-4 py-3 text-center text-red-600">✗ No</td>
                      <td className="px-4 py-3 text-center">High</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                Costs include material only. Add $2-10 per sq ft for professional installation.
              </p>
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
                    How do I calculate square footage of a room?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      To calculate square footage: 1. Measure room length and width in feet, 2. Multiply length × width = square feet. Example: A room 12 feet long × 10 feet wide = 120 square feet. For irregular rooms: Break the room into rectangles, calculate each section separately, add all sections together. For L-shaped rooms: Divide into two rectangles (like a 10×12 section + 8×6 section = 120 + 48 = 168 sq ft). Convert units: 1 square foot = 0.0929 square meters, 1 square yard = 9 square feet, 1 square meter = 10.764 square feet. Pro tips: Always round up when buying materials, measure to nearest inch for accuracy, account for doorways and closets, remeasure to verify before purchasing.
                    </p>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6" 
                     itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="text-xl font-bold text-gray-900 mb-3" itemProp="name">
                    How much flooring material should I buy?
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-700" itemProp="text">
                      Calculate flooring materials with these steps: 1. Calculate room square footage (length × width), 2. Add 10-15% waste factor for cuts and mistakes, 3. Round up to nearest full box/unit. Waste factor guidelines: Standard rooms (rectangular): 10% extra, Irregular rooms or diagonal patterns: 15% extra, Patterned tile requiring alignment: 15-20% extra, Large tiles (24"×24" or bigger): 10% extra, Small tiles or mosaics: 15% extra. Common package sizes: Laminate/hardwood: 20-25 sq ft per box, Vinyl planks: 20-24 sq ft per box, Ceramic tile (12"×12"): typically 10-12 tiles per box, Carpet: sold by square yard (9 sq ft = 1 sq yd). Example: 200 sq ft room with 10% waste = 220 sq ft needed. At 20 sq ft per box = 11 boxes. Why extra? Damaged pieces, installation mistakes, future repairs, pattern matching, irregular cuts around doorways.
                    </p>
                  </div>
                </div>

                {/* 继续添加其他FAQ... */}
              </div>
            </div>

            {/* Related Calculators */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🔗</span>
                Related Calculators
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a href="/percentage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Percentage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate percentages for discounts and markups</p>
                </a>
                <a href="/mortgage-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Mortgage Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate home loan payments and affordability</p>
                </a>
                <a href="/loan-calculator" 
                   className="block p-4 bg-white rounded-lg border hover:shadow-md transition">
                  <div className="font-semibold text-gray-900">Loan Calculator</div>
                  <p className="text-xs text-gray-600 mt-1">Calculate loan payments and interest</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

