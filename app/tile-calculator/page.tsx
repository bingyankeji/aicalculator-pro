import { Metadata } from 'next';
import TileCalculator from '@/components/Calculator/TileCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId } from '@/config/site';

export const metadata: Metadata = {
  title: 'Tile Calculator - Calculate Tiles, Boxes & Cost | Free Tool',
  description: 'Free tile calculator to estimate tiles needed, boxes required, and total cost for any room. Supports all tile sizes and installation patterns. Calculate grout and adhesive quantities instantly.',
  keywords: [
    'tile calculator',
    'flooring calculator',
    'ceramic tile calculator',
    'porcelain tile calculator',
    'bathroom tile calculator',
    'kitchen tile calculator',
    'tile cost calculator',
    'tile estimator',
    'how many tiles do I need',
    'tile boxes calculator',
    'grout calculator',
    'adhesive calculator',
    'tile installation calculator',
    'tile square footage calculator',
    'tile waste calculator',
    'herringbone tile calculator',
    'diagonal tile pattern',
    'brick pattern tile',
    'tile per box',
    'flooring cost estimator',
    'backsplash tile calculator',
    'floor tile quantity'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Tile Calculator - Estimate Tiles, Boxes & Cost',
    description: 'Calculate tiles needed for any room. Supports all patterns (straight, diagonal, herringbone). Get instant estimates for tiles, grout, adhesive and total cost.',
    type: 'website',
    url: getUrl('/tile-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('tile-calculator'),
      width: 1200,
      height: 630,
      alt: 'Tile Calculator - Calculate Tile Quantity and Cost'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tile Calculator - Free Tile Estimator Tool',
    description: 'Calculate tiles needed for flooring and walls. Supports all tile sizes and patterns. Get instant cost estimates.',
    images: [getOgImage('tile-calculator')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/tile-calculator'),
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

export default function TileCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/tile-calculator'),
        name: 'Tile Calculator',
        url: getUrl('/tile-calculator'),
        description: 'Professional tile calculator for estimating tiles, boxes, grout, adhesive and total installation cost for any room size and tile pattern.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Room dimension calculator',
          'All tile size support',
          'Multiple installation patterns',
          'Waste calculation (5-15%)',
          'Box quantity estimator',
          'Grout quantity calculator',
          'Adhesive quantity calculator',
          'Total cost estimator',
          'Instant calculations',
          'Free to use'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/tile-calculator'),
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
            name: 'Other Calculators',
            item: getUrl('/other'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Tile Calculator',
            item: getUrl('/tile-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/tile-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate how many tiles I need?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate tiles needed: 1) Measure room length and width, 2) Calculate room area (length × width), 3) Calculate tile area, 4) Divide room area by tile area, 5) Add waste percentage based on pattern (5% straight, 10% diagonal, 15% herringbone, 8% brick). Round up to the nearest whole number for final tile count.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the waste percentage for tile installation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Waste percentages vary by installation pattern: Straight pattern - 5% waste (simplest, least cutting), Diagonal pattern - 10% waste (45-degree angle requires more cuts), Herringbone pattern - 15% waste (complex V-pattern with maximum cutting), Brick/Offset pattern - 8% waste (staggered layout). Always order extra tiles as different production batches may have slight color variations.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many tiles are in a box?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tiles per box varies by size: 12x12 inch tiles typically have 10-14 tiles per box covering 10-14 sq ft. 18x18 inch tiles have 6-8 tiles per box covering 12-18 sq ft. 6x6 inch tiles have 40-50 tiles per box covering 10-12 sq ft. Larger format tiles (24x24 inch or larger) usually have 4-6 tiles per box. Always check the box label for exact coverage as it varies by manufacturer and tile thickness.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much grout do I need for tile installation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Grout quantity depends on tile size, grout line width, and tile thickness. General estimate: 0.5 lbs per 100 sq ft for standard 3mm grout lines. Wider grout lines (5mm+) may require up to 1 lb per 100 sq ft. For precise calculations, consider: tile dimensions, grout joint width, tile thickness, and grout density. Most standard bags are 25 lbs, covering approximately 5000 sq ft with thin grout lines. Always buy one extra bag for contingencies.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much tile adhesive (thinset) do I need?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Adhesive coverage depends on tile size and trowel notch size. General guideline: 1 gallon covers approximately 100 sq ft for standard wall tiles using 1/4 inch notch trowel. Floor tiles typically need 1 gallon per 80-90 sq ft using 3/8 inch notch. Large format tiles (12x24 or larger) require 1 gallon per 60-70 sq ft using 1/2 inch notch. Always apply adhesive to both tile back and substrate (back-buttering) for large format tiles.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the best tile pattern for my room?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Best pattern depends on room size and aesthetic: Straight/Grid pattern - Best for beginners, minimal waste, faster installation, works well in any room. Diagonal pattern - Makes small rooms appear larger, adds visual interest, 10% waste. Herringbone pattern - Elegant V-pattern, ideal for hallways and narrow spaces, 15% waste, professional installation recommended. Brick/Running bond - Classic look, good for rectangular tiles, 8% waste. Consider tile size: larger tiles (12x24+) work better with straight patterns, smaller tiles (6x6 or less) suit complex patterns better.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I calculate tiles for an irregular room?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For irregular rooms: 1) Divide the room into rectangular sections, 2) Calculate area for each section separately, 3) Add all areas together, 4) Add 10-15% extra waste due to increased cutting. For L-shaped rooms: measure each leg separately. For rooms with alcoves: measure main room and add alcove areas. For diagonal walls: measure maximum length and width to create bounding rectangle. Always sketch the room layout and mark dimensions before ordering tiles.'
            }
          },
          {
            '@type': 'Question',
            name: 'Should I buy extra tiles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, always buy 10-20% extra tiles beyond calculated needs for these reasons: Breakage during transport and installation (2-5%), Cutting waste based on pattern (5-15%), Future repairs - tiles from different production lots may have slight color variations making exact matches difficult, Complex room shapes requiring more cuts, Learning curve if DIY installation. For high-value or imported tiles, consider buying even more extras as replacements may be unavailable later. Store extras properly in a dry location for future use.'
            }
          },
          {
            '@type': 'Question',
            name: 'What size tile is best for small bathrooms?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For small bathrooms (under 50 sq ft): Large format tiles (12x24 or 12x12 inch) - Fewer grout lines make space appear larger, easier to clean, modern look. Medium tiles (8x8 to 10x10 inch) - Good balance, not too busy, adequate traction. Avoid very small tiles (2x2 mosaic) on floors as many grout lines can make space feel smaller. For walls, smaller tiles (4x4 to 6x6) or subway tiles (3x6) work well. Consider using same tile on floor and walls to create continuous look expanding visual space.'
            }
          },
          {
            '@type': 'Question',
            name: 'How long does tile installation take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Installation time varies by room size, pattern complexity, and skill level: Small bathroom (40-60 sq ft) - 1-2 days for floor, 1 day for backsplash. Medium kitchen (150-200 sq ft) - 3-4 days including substrate preparation. Large living room (300+ sq ft) - 5-7 days for floor tiles. Professional installers work faster (100-150 sq ft per day) compared to DIY (50-75 sq ft per day). Complex patterns (herringbone, mosaic) take 50-100% longer. Add extra time for: substrate preparation, waterproofing, grout curing (24-48 hours), sealing (if required).'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/tile-calculator'),
        name: 'How to Calculate Tiles Needed for Your Room',
        description: 'Step-by-step guide to accurately calculate the number of tiles, boxes, grout, and adhesive needed for your flooring or wall tiling project.',
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: [
          {
            '@type': 'HowToTool',
            name: 'Measuring tape'
          },
          {
            '@type': 'HowToTool',
            name: 'Calculator or Tile Calculator Tool'
          },
          {
            '@type': 'HowToTool',
            name: 'Pen and paper for notes'
          }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Measure Room Dimensions',
            text: 'Using a measuring tape, measure the length and width of your room in feet or meters. For irregular rooms, divide into rectangular sections and measure each separately. Record all measurements accurately, rounding up to the nearest inch. For walls, measure height and width of each wall section to be tiled.',
            url: getUrl('/tile-calculator#step1'),
            image: getOgImage('measure-room')
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Calculate Room Area',
            text: 'Multiply length by width to get total square footage (or square meters). For multiple sections, calculate each area separately and add them together. For example: 10 ft × 12 ft = 120 sq ft. For walls, multiply height by width for each wall. Subtract areas for permanent fixtures like cabinets or built-in furniture.',
            url: getUrl('/tile-calculator#step2'),
            image: getOgImage('calculate-area')
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Determine Tile Size',
            text: 'Identify your tile dimensions (typically marked on packaging). Common sizes: 12"×12", 18"×18", 6"×24", etc. Calculate single tile area: 12"×12" = 144 sq inches = 1 sq ft. Convert tile area to match room measurement units. Consider tile thickness and finish as these affect coverage slightly.',
            url: getUrl('/tile-calculator#step3'),
            image: getOgImage('tile-size')
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Choose Installation Pattern',
            text: 'Select your installation pattern as it affects waste: Straight pattern (5% waste) - tiles aligned in grid, simplest installation. Diagonal pattern (10% waste) - 45° angle, makes room appear larger. Herringbone pattern (15% waste) - V-shaped pattern, elegant but complex. Brick/Offset pattern (8% waste) - staggered layout, popular for subway tiles. Consider room shape and tile size when choosing pattern.',
            url: getUrl('/tile-calculator#step4'),
            image: getOgImage('tile-pattern')
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Tiles with Waste',
            text: 'Divide room area by single tile area to get base tile count. Add waste percentage: Straight: tiles × 1.05, Diagonal: tiles × 1.10, Herringbone: tiles × 1.15, Brick: tiles × 1.08. Round up to nearest whole number. For example: 120 sq ft ÷ 1 sq ft = 120 tiles + 10% waste = 132 tiles needed. Always round up for partial tiles.',
            url: getUrl('/tile-calculator#step5'),
            image: getOgImage('calculate-waste')
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Determine Box Quantity',
            text: 'Check tile packaging for tiles per box (typically 10-14 for 12"×12" tiles, 6-8 for 18"×18"). Divide total tiles needed by tiles per box, round up. Example: 132 tiles ÷ 10 tiles per box = 13.2, round up to 14 boxes. Some retailers sell individual tiles, but boxes are more cost-effective. Buy from same batch number to ensure color consistency.',
            url: getUrl('/tile-calculator#step6'),
            image: getOgImage('box-quantity')
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Calculate Grout and Adhesive',
            text: 'Grout: ~0.5 lbs per 100 sq ft for standard 3mm joints (1 lb for 5mm+ joints). For 120 sq ft: 120 ÷ 100 × 0.5 = 0.6 lbs (buy 1-2 bags as minimum). Adhesive: ~1 gallon per 100 sq ft for walls (80-90 sq ft for floors). For 120 sq ft floor: 120 ÷ 90 = 1.33 gallons (buy 2 gallons). Factor in surface preparation materials: primer, waterproofing membrane, backer board.',
            url: getUrl('/tile-calculator#step7'),
            image: getOgImage('grout-adhesive')
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Estimate Total Cost',
            text: 'Calculate material costs: Tiles cost = tiles needed × price per tile (or boxes × price per box). Grout cost = bags needed × price per bag. Adhesive cost = gallons needed × price per gallon. Add accessories: spacers ($10-20), trowel ($15-30), tile cutter ($30-200), level ($20-50). Labor cost if hiring professional: $5-15 per sq ft depending on complexity and location. Total project cost = materials + tools + labor.',
            url: getUrl('/tile-calculator#step8'),
            image: getOgImage('cost-estimate')
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/tile-calculator'),
        headline: 'Complete Guide to Tile Calculation: Estimating Tiles, Grout, and Cost',
        description: 'Professional guide to calculating tiles needed for any project. Learn how to estimate materials, choose patterns, and budget for your tile installation.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/')
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png')
          }
        },
        datePublished: '2024-01-15T00:00:00Z',
        dateModified: new Date().toISOString(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': getUrl('/tile-calculator')
        },
        image: getOgImage('tile-calculator'),
        articleSection: 'Home Improvement',
        keywords: 'tile calculator, flooring calculator, tile estimator, grout calculator, tile installation cost'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Tile Calculator - Free Tool to Calculate Tiles, Boxes, Grout & Cost for Any Room
        </h1>

        {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
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
              <a href="/other" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Other Calculators</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Tile Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <TileCalculator />

      {/* Educational Content */}
      <article className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-0">Understanding Tile Calculations</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Calculating the correct number of tiles for your flooring or wall project is crucial for budget planning and ensuring you have enough materials to complete your renovation. Whether you're tiling a bathroom, kitchen backsplash, or entire floor, accurate tile estimation prevents costly mistakes like over-ordering or running out mid-project.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Accurate Tile Calculation Matters</h3>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional tile calculation goes beyond simple area division. It accounts for multiple factors that significantly impact your final tile count and project cost. Underestimating tiles means project delays, potential color mismatch from different batches, and additional delivery fees. Overestimating wastes money and storage space. Our tile calculator considers all critical factors including room dimensions, tile size, installation pattern, waste percentage, box quantities, and auxiliary materials like grout and adhesive.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step Tile Calculation Process</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Accurate Room Measurement</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Begin with precise measurements using a quality measuring tape. Measure room length and width at multiple points as rooms are rarely perfectly square. Record the largest measurements to ensure adequate coverage. For rectangular rooms, multiply length by width. For L-shaped rooms, divide into two rectangles, calculate each area separately, then add together. For irregular shapes, use the bounding rectangle method or divide into multiple simple shapes.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Tile Size and Coverage</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tiles come in various sizes, each covering different square footage. Common sizes include 12"×12" (1 sq ft), 18"×18" (2.25 sq ft), 6"×24" (1 sq ft), 24"×24" (4 sq ft), and large format 30"×30" (6.25 sq ft). Smaller tiles like 6"×6" (0.25 sq ft) are popular for bathrooms and decorative accents. Calculate single tile coverage by multiplying length by width, then convert to your room's measurement units. Large format tiles cover more area with fewer grout lines but require professional installation and perfect substrate preparation.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Installation Pattern and Waste Calculation</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Installation pattern dramatically affects waste percentage and overall aesthetics. <strong>Straight/Grid Pattern</strong> (5% waste) aligns tiles in rows and columns, simplest for DIY, minimal cutting, fastest installation, works with any tile size. <strong>Diagonal Pattern</strong> (10% waste) rotates tiles 45 degrees, makes small rooms appear larger, every edge tile requires diagonal cutting, adds visual interest, recommended for square tiles. <strong>Herringbone Pattern</strong> (15% waste) creates elegant V-pattern using rectangular tiles, complex installation requires precision, highest waste due to extensive cutting, best for professional installation, stunning in hallways and feature walls. <strong>Brick/Running Bond Pattern</strong> (8% waste) staggers tiles like brickwork, popular for subway tiles, good for rectangular spaces, moderate cutting required.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Box Quantity Determination</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tiles are sold by the box, with quantity varying by tile size. Standard 12"×12" ceramic tiles typically have 10-14 tiles per box covering 10-14 sq ft. Larger 18"×18" tiles contain 6-8 pieces covering 12-18 sq ft. Small 6"×6" tiles pack 40-50 per box for 10-12 sq ft coverage. Large format 24"×24" tiles have only 4-6 per box due to weight. Always check box labels for exact coverage and buy all boxes from the same batch number to ensure color consistency, as slight variations between production runs can be noticeable when installed.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Material Requirements Beyond Tiles</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Grout Calculation</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Grout fills joints between tiles, providing waterproofing and structural stability. Calculate grout needs based on tile size, grout line width, and tile thickness. Standard grout lines are 1/8" (3mm) for floor tiles and 1/16" (1.5mm) for wall tiles. Wider lines (1/4" or 6mm) are sometimes used for rustic or hand-made tiles. General estimate: 0.5 lbs per 100 sq ft for thin lines, 1 lb per 100 sq ft for wide lines. For 300 sq ft bathroom with standard lines: 1.5 lbs needed, but buy 25 lb bag minimum. Sanded grout is used for lines wider than 1/8", unsanded for narrower lines to prevent scratching. Epoxy grout costs 3-5x more but offers superior stain resistance and waterproofing for showers and high-traffic areas.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Adhesive (Thinset) Calculation</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tile adhesive coverage depends on tile size and trowel notch size. Wall tiles using 1/4" notch trowel: 1 gallon covers 100-120 sq ft. Standard floor tiles using 3/8" notch: 1 gallon covers 80-95 sq ft. Large format tiles (12"×24"+) using 1/2" notch: 1 gallon covers 60-75 sq ft. Back-buttering (applying thinset to both substrate and tile back) is essential for large format tiles, reducing coverage by 20-30%. Polymer-modified thinset offers better adhesion and flexibility for challenging substrates like plywood or areas with slight movement. For outdoor or wet areas, use latex or polymer-modified thinset for enhanced water resistance.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Choosing the Right Tile Size for Your Space</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Small Bathrooms (Under 50 sq ft)</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Large format tiles (12"×24", 12"×12") make small bathrooms appear more spacious by minimizing grout lines. Fewer grout lines mean easier cleaning and more continuous look. For floors, 12"×12" or 12"×24" tiles work excellently. Walls can use same size or smaller formats like 6"×6" or classic subway tiles (3"×6"). Avoid tiny mosaics (2"×2" or smaller) on floors as numerous grout lines can make space feel cramped and increase cleaning effort. Large tiles require perfectly level substrate as any imperfection shows clearly.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Medium Spaces (100-300 sq ft)</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Medium-sized kitchens and bathrooms offer flexibility in tile selection. Popular choices include 12"×12", 18"×18", and rectangular formats like 12"×24" or 6"×36". Mix different sizes for visual interest: large format floor tiles with smaller wall tiles or decorative mosaics for accents. Consider traffic and use patterns - high-traffic kitchens benefit from larger tiles with fewer grout lines for easier maintenance. Backsplashes can use smaller decorative tiles or subway tiles for traditional look.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Large Open Spaces (300+ sq ft)</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Large format tiles (24"×24", 30"×30", or larger) are ideal for expansive open floor plans. Minimize grout lines for clean, modern aesthetic and easier cleaning. Installation requires experienced professionals as large tiles are heavy, difficult to handle, and need perfectly flat substrate. Any substrate imperfection will telegraph through tile, causing lippage (uneven edges). Consider rectified tiles (precisely cut edges) for tighter grout lines. Large commercial spaces often use 24"×48" or even 48"×48" tiles for impressive visual impact.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cost Estimation and Budgeting</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tile Material Costs</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tile prices vary enormously based on material, size, design, and origin. Budget ceramic tiles: $0.50-$2 per sq ft, suitable for simple renovations. Mid-range porcelain tiles: $3-$8 per sq ft, excellent durability and water resistance. Premium porcelain/natural stone: $8-$20+ per sq ft, luxury materials like marble, granite, or designer collections. Specialty tiles (hand-painted, imported, custom): $20-$50+ per sq ft. Large format tiles typically cost 20-40% more than standard sizes due to manufacturing complexity. Always factor in 10-20% extra for breakage, cuts, and future repairs.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Installation Costs</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional installation costs vary by region, complexity, and tile size. Basic installation (straight pattern, standard tiles): $5-$10 per sq ft. Complex patterns (diagonal, herringbone): $8-$15 per sq ft. Large format tiles: $10-$20 per sq ft due to handling difficulty and substrate preparation needs. Additional costs include: substrate preparation ($2-$5 per sq ft), waterproofing ($1-$3 per sq ft), old tile removal ($2-$4 per sq ft), furniture moving/room preparation ($100-$500), trim and transition pieces ($5-$20 per linear ft). DIY installation saves labor costs but requires tool investment ($200-$500) and time commitment. Mistakes can be expensive to fix.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Long-term Cost Considerations</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            Consider total cost of ownership beyond initial installation. High-quality tiles with proper installation last 20-50 years with minimal maintenance. Cheaper tiles may need replacement in 10-15 years. Maintenance costs: professional cleaning ($100-$300 annually for large areas), grout sealing every 1-2 years ($0.50-$1 per sq ft), repairs/replacements (keep 5-10% extra tiles for inevitable damage). Energy efficiency: light-colored tiles reflect light reducing lighting costs, tiles with high thermal mass help regulate temperature. Resale value: quality tile work adds 60-80% of cost to home value, appeals to buyers, reduces time on market.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Mistakes to Avoid</h3>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Inadequate waste calculation:</strong> Always add appropriate waste percentage (minimum 5%, up to 20% for complex patterns or irregular rooms). Buying exact quantity often results in project delays when tiles break or cuts don't work perfectly.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Ignoring substrate condition:</strong> Tiles are only as good as their foundation. Cracked, uneven, or weak substrates lead to tile failure regardless of quality. Invest in proper substrate preparation including leveling compound, crack isolation membrane, and appropriate backer board for wet areas.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Mixing production batches:</strong> Tile colors vary slightly between production runs. Always buy all tiles from same batch (check batch number on boxes). If ordering additional tiles later, color match may be impossible.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Wrong adhesive selection:</strong> Using wall tile adhesive for floors or vice versa leads to failure. Floor adhesive must withstand compression forces, wall adhesive needs anti-sag properties. Outdoor tiles need freeze-thaw resistant adhesive and grout.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Insufficient grout line spacing:</strong> Grout lines accommodate tile size variations and substrate movement. Too-thin lines (less than 1/16") risk cracking, especially in high-traffic or moisture-prone areas. Use tile spacers for consistent spacing.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Professional Tips for Success</h3>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Plan tile layout before starting installation. Dry-lay tiles to visualize final appearance and identify potential issues. Center tiles in room or start from most visible focal point. Avoid thin slivers along walls - adjust starting point to have at least half-tile width at edges. For large rooms, use laser level or snap chalk lines to ensure straight courses.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Allow proper curing time at each stage: thinset needs 24-48 hours before grouting, grout needs 24-72 hours before sealing, sealer needs 24 hours before water exposure. Rushing any stage compromises durability.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Store extra tiles properly for future repairs. Keep in dry location away from freezing temperatures. Store with original box label showing batch number. Even 5-10 extra tiles can save you from impossible color matching situation years later.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Consider hiring professionals for complex projects: large format tiles, steam showers, heated floors, intricate patterns, or critical areas like structural repairs. Cost of fixing DIY mistakes often exceeds professional installation cost. Professional installation typically includes warranty for workmanship.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h3>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Accurate tile calculation is foundation of successful tiling project. Use our free tile calculator to estimate tiles, boxes, grout, adhesive, and total project cost instantly. Whether you're renovating bathroom, updating kitchen backsplash, or tiling entire floor, proper planning prevents costly mistakes and ensures beautiful, lasting results. Remember to account for waste, buy from same batch, prepare substrate properly, and don't hesitate to consult professionals for complex installations.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Start your tile project with confidence by using our comprehensive tile calculator above. Input your room dimensions, tile size, and pattern preference to receive instant, accurate material estimates and cost projections. Happy tiling!
          </p>
        </div>
      </article>
      </div>
    </>
  );
}

