import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import DistanceCalculator from '@/components/Calculator/DistanceCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Distance Calculator - 2D, 3D, Geographic & Manhattan Distance | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Free online distance calculator for 2D Euclidean, 3D space, geographic (GPS), and Manhattan distances. Calculate distances between points with step-by-step solutions, midpoint calculations, and multiple coordinate systems.`,
  keywords: [
    'distance calculator',
    '2d distance calculator',
    '3d distance calculator',
    'geographic distance calculator',
    'gps distance calculator',
    'coordinate distance',
    'euclidean distance',
    'manhattan distance',
    'taxicab distance',
    'haversine formula',
    'great circle distance',
    'latitude longitude distance',
    'point to point distance',
    'midpoint calculator',
    'distance between two points',
    'spatial distance',
    'cartesian distance',
    'distance formula',
    'calculate distance',
    'map distance calculator'
  ],
  alternates: {
    canonical: getUrl('/distance-calculator')
  },
  openGraph: {
    title: `Distance Calculator - 2D, 3D, Geographic & Manhattan Distance`,
    description: `Free online distance calculator for 2D, 3D, geographic (GPS), and Manhattan distances. Calculate distances with step-by-step solutions.`,
    url: getUrl('/distance-calculator'),
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Distance Calculator - 2D, 3D, Geographic & Manhattan Distance`,
    description: `Calculate distances between points in 2D, 3D, geographic coordinates with step-by-step solutions.`,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function DistanceCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/distance-calculator'),
        'name': 'Distance Calculator',
        'url': getUrl('/distance-calculator'),
        'description': `Calculate distances between points using Euclidean (2D/3D), geographic (Haversine), and Manhattan distance formulas with step-by-step solutions.`,
        'applicationCategory': 'CalculatorApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          '2D Euclidean distance calculation',
          '3D spatial distance calculation',
          'Geographic distance (Haversine formula)',
          'Manhattan distance (taxicab)',
          'Midpoint calculation',
          'Multiple coordinate systems',
          'Step-by-step solutions',
          'Kilometers and miles support',
          'GPS coordinate support',
          'Instant results'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/distance-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/')
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Math Calculators',
            'item': getUrl('/calculators/math')
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Distance Calculator',
            'item': getUrl('/distance-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/distance-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is the distance formula?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The distance formula calculates the straight-line distance between two points. In 2D, it is d = √[(x₂-x₁)² + (y₂-y₁)²], which is derived from the Pythagorean theorem. In 3D, it extends to d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]. This is also known as Euclidean distance.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate distance between two points?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To calculate distance between two points: 1) Find the difference between x-coordinates (Δx = x₂-x₁), 2) Find the difference between y-coordinates (Δy = y₂-y₁), 3) Square both differences, 4) Add the squares together, 5) Take the square root of the sum. For example, distance from (0,0) to (3,4) is √(3² + 4²) = √(9 + 16) = √25 = 5 units.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the difference between Euclidean and Manhattan distance?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Euclidean distance is the straight-line distance ("as the crow flies") calculated using the Pythagorean theorem. Manhattan distance (also called taxicab distance) is the sum of absolute differences in coordinates, representing distance if you can only move horizontally and vertically (like on a city grid). For points (0,0) and (3,4): Euclidean = 5 units, Manhattan = 7 units.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate distance using latitude and longitude?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `To calculate distance between geographic coordinates (latitude/longitude), use the Haversine formula which accounts for Earth\'s curvature. The formula calculates the great-circle distance (shortest path on a sphere) between two points. Our calculator uses Earth\'s radius of 6,371 km (or 3,959 miles) to compute distances in either kilometers or miles.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the Haversine formula?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The Haversine formula calculates the great-circle distance between two points on a sphere given their longitudes and latitudes. It\'s the most accurate method for calculating geographic distances on Earth. The formula accounts for the spherical shape of Earth and is widely used in navigation and GPS applications. Results are typically given in kilometers or miles.`
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you find the midpoint between two points?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `The midpoint between two points is found by averaging their coordinates. For 2D points (x₁,y₁) and (x₂,y₂), the midpoint is ((x₁+x₂)/2, (y₁+y₂)/2). For example, the midpoint between (0,0) and (6,8) is (3,4). In 3D, include the z-coordinate: ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2).`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is 3D distance?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `3D distance is the straight-line distance between two points in three-dimensional space. It extends the 2D distance formula by adding the z-coordinate: d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]. This is used in physics, computer graphics, 3D modeling, and spatial analysis applications.`
            }
          },
          {
            '@type': 'Question',
            'name': 'What is Manhattan distance used for?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Manhattan distance (taxicab geometry) is used when movement is restricted to horizontal and vertical directions, like on a city grid. It\'s commonly used in: urban planning, circuit board routing, warehouse logistics, pathfinding algorithms, and machine learning (as a distance metric). The formula is d = |x₂-x₁| + |y₂-y₁|.`
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/distance-calculator'),
        'name': 'How to Calculate Distance Between Points',
        'description': 'Learn how to calculate distances using different formulas and coordinate systems',
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Select Distance Type',
            'text': `Choose the type of distance calculation you need: 2D (planar), 3D (spatial), Geographic (GPS), or Manhattan (grid).`
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Enter Coordinates',
            'text': `Enter the coordinates for both points. For 2D use (x,y), for 3D use (x,y,z), and for geographic use latitude and longitude.`
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Select Units (if applicable)',
            'text': `For geographic distances, choose between kilometers or miles as your unit of measurement.`
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Calculate',
            'text': `Click the "Calculate Distance" button to compute the result instantly.`
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Review Results',
            'text': `View the distance, formula used, midpoint (if applicable), and step-by-step calculation breakdown.`
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/distance-calculator'),
        'headline': 'Distance Calculator - Complete Guide to Calculating Distances',
        'description': `Comprehensive guide to calculating distances using Euclidean, Manhattan, and geographic distance formulas with practical examples and applications.`,
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'author': {
          '@type': 'Organization',
          'name': process.env.NEXT_PUBLIC_SITE_NAME
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Distance Calculator - Calculate 2D, 3D, Geographic & Manhattan Distances with Step-by-Step Solutions</h1>
      
      {/* Calculator Component */}
      <DistanceCalculator />

      {/* SEO Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Distance Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our <strong>Distance Calculator</strong> is a comprehensive and free online tool designed to calculate distances between 
            points using various methods including 2D Euclidean distance, 3D spatial distance, geographic distance (using the 
            Haversine formula for GPS coordinates), and Manhattan distance (taxicab geometry). Whether you're a student learning 
            coordinate geometry, a developer working on location-based applications, or a professional needing accurate distance 
            measurements, our calculator provides instant, precise results with detailed step-by-step explanations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Understanding distance calculations is fundamental to mathematics, physics, geography, computer science, and many 
            real-world applications. Our calculator not only computes distances but also calculates midpoints, shows you the 
            exact formulas used, and provides comprehensive explanations of each calculation method, making it an excellent 
            educational tool as well as a practical utility.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Supported Distance Calculations</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>2D Euclidean Distance:</strong> Calculate straight-line distance between two points on a plane using coordinates (x, y)</li>
            <li><strong>3D Spatial Distance:</strong> Find distance between two points in three-dimensional space using (x, y, z) coordinates</li>
            <li><strong>Geographic Distance:</strong> Calculate real-world distances using latitude and longitude with the Haversine formula</li>
            <li><strong>Manhattan Distance:</strong> Compute grid-based distance (taxicab geometry) for applications like urban planning and pathfinding</li>
            <li><strong>Midpoint Calculation:</strong> Automatically calculate the midpoint between two points (2D and 3D)</li>
            <li><strong>Multiple Units:</strong> Support for kilometers and miles for geographic distances</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Multiple Distance Types:</strong> Four different distance calculation methods in one tool</li>
            <li><strong>Step-by-Step Solutions:</strong> Detailed breakdown of every calculation step</li>
            <li><strong>Formula Display:</strong> See the exact mathematical formula used for each calculation</li>
            <li><strong>Midpoint Finder:</strong> Automatically calculate the center point between two coordinates</li>
            <li><strong>GPS Support:</strong> Enter latitude and longitude coordinates for real-world distances</li>
            <li><strong>Unit Conversion:</strong> Switch between kilometers and miles for geographic distances</li>
            <li><strong>High Precision:</strong> Accurate calculations to 4 decimal places</li>
            <li><strong>Educational Explanations:</strong> Learn why and how each formula works</li>
            <li><strong>Mobile-Friendly:</strong> Works perfectly on all devices</li>
            <li><strong>100% Free:</strong> No registration or payment required</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Distance Formulas</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. 2D Euclidean Distance</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The 2D Euclidean distance formula calculates the straight-line distance between two points in a plane. It is derived 
            from the Pythagorean theorem:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-4">d = √[(x₂-x₁)² + (y₂-y₁)²]</p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Distance from (0, 0) to (3, 4)<br />
              d = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5 units
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. 3D Euclidean Distance</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The 3D distance formula extends the 2D formula into three-dimensional space by adding the z-coordinate:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-4">d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]</p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Distance from (0, 0, 0) to (1, 2, 2)<br />
              d = √[(1-0)² + (2-0)² + (2-0)²] = √[1 + 4 + 4] = √9 = 3 units
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Geographic Distance (Haversine Formula)</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Haversine formula calculates the great-circle distance between two points on a sphere (Earth) given their 
            latitude and longitude. This accounts for Earth's curvature and provides accurate real-world distances:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 text-sm mb-4">
              The formula involves converting degrees to radians and using trigonometric functions to calculate the angular 
              distance, which is then multiplied by Earth's radius (6,371 km or 3,959 miles).
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> New York City (40.7128°N, 74.0060°W) to Los Angeles (34.0522°N, 118.2437°W)<br />
              Distance ≈ 3,944 kilometers or 2,451 miles
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Manhattan Distance</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Manhattan distance (also called taxicab distance or L1 distance) is the sum of the absolute differences of 
            coordinates. It represents the distance traveled on a grid where you can only move horizontally or vertically:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-xl text-center mb-4">d = |x₂-x₁| + |y₂-y₁|</p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Distance from (0, 0) to (3, 4)<br />
              d = |3-0| + |4-0| = 3 + 4 = 7 units<br />
              (Compare to Euclidean: 5 units)
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Midpoint Formula</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The midpoint is the point exactly halfway between two given points. It is calculated by averaging the coordinates:
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="font-mono text-lg text-center mb-4">
              2D: M = ((x₁+x₂)/2, (y₁+y₂)/2)<br />
              3D: M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2)
            </p>
            <p className="text-gray-700 text-sm">
              <strong>Example:</strong> Midpoint between (0, 0) and (6, 8)<br />
              M = ((0+6)/2, (0+8)/2) = (3, 4)
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Applications</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2D & 3D Distance Applications</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Computer Graphics:</strong> Calculate distances between objects, collision detection, rendering optimization</li>
            <li><strong>Game Development:</strong> Character movement, AI pathfinding, proximity detection</li>
            <li><strong>Robotics:</strong> Path planning, obstacle avoidance, sensor measurements</li>
            <li><strong>Physics & Engineering:</strong> Calculate displacement, velocity, and force vectors</li>
            <li><strong>Machine Learning:</strong> K-nearest neighbors (KNN), clustering algorithms, similarity measures</li>
            <li><strong>Architecture:</strong> Spatial planning, structural analysis, 3D modeling</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Geographic Distance Applications</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Navigation & GPS:</strong> Route planning, travel distance estimation, location-based services</li>
            <li><strong>Logistics & Delivery:</strong> Optimize delivery routes, calculate shipping costs, fleet management</li>
            <li><strong>Travel Planning:</strong> Estimate travel distances, compare flight paths, plan road trips</li>
            <li><strong>Real Estate:</strong> Calculate proximity to amenities, compare locations, property valuation</li>
            <li><strong>Emergency Services:</strong> Find nearest hospitals, fire stations, optimize response times</li>
            <li><strong>Wildlife Tracking:</strong> Monitor animal movements, migration patterns, habitat analysis</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manhattan Distance Applications</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Urban Planning:</strong> Calculate city block distances, analyze street networks</li>
            <li><strong>Warehouse Management:</strong> Optimize picking routes, inventory placement</li>
            <li><strong>Circuit Board Design:</strong> Calculate wire lengths, routing optimization</li>
            <li><strong>Chess & Board Games:</strong> Calculate move distances for kings and rooks</li>
            <li><strong>Image Processing:</strong> Pixel distance calculations, edge detection</li>
            <li><strong>Data Science:</strong> Feature scaling, outlier detection, classification algorithms</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Distance Calculator</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">For 2D Distance:</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>Select the "2D Distance" tab</li>
            <li>Enter the x and y coordinates for Point 1</li>
            <li>Enter the x and y coordinates for Point 2</li>
            <li>Click "Calculate Distance"</li>
            <li>View the distance, midpoint, and step-by-step solution</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">For 3D Distance:</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>Select the "3D Distance" tab</li>
            <li>Enter the x, y, and z coordinates for Point 1</li>
            <li>Enter the x, y, and z coordinates for Point 2</li>
            <li>Click "Calculate Distance"</li>
            <li>View the 3D distance, midpoint, and calculation steps</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Geographic Distance:</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>Select the "Geographic" tab</li>
            <li>Choose your preferred unit (Kilometers or Miles)</li>
            <li>Enter latitude and longitude for Location 1 (e.g., 40.7128, -74.0060 for New York)</li>
            <li>Enter latitude and longitude for Location 2 (e.g., 34.0522, -118.2437 for Los Angeles)</li>
            <li>Click "Calculate Distance"</li>
            <li>View the great-circle distance and detailed calculation using the Haversine formula</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">For Manhattan Distance:</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
            <li>Select the "Manhattan" tab</li>
            <li>Enter the x and y coordinates for Point 1</li>
            <li>Enter the x and y coordinates for Point 2</li>
            <li>Click "Calculate Distance"</li>
            <li>View the Manhattan distance and see how it compares to Euclidean distance</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Distance Calculation Examples</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 1: 2D Euclidean Distance</h3>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-2"><strong>Problem:</strong> Find the distance between points A(1, 2) and B(4, 6)</p>
            <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
            <p className="text-gray-700 text-sm font-mono ml-4">
              d = √[(4-1)² + (6-2)²]<br />
              d = √[3² + 4²]<br />
              d = √[9 + 16]<br />
              d = √25<br />
              d = 5 units
            </p>
            <p className="text-gray-700 mt-2"><strong>Midpoint:</strong> M = ((1+4)/2, (2+6)/2) = (2.5, 4)</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 2: 3D Distance</h3>
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-2"><strong>Problem:</strong> Calculate distance between points P(1, 2, 3) and Q(4, 6, 8)</p>
            <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
            <p className="text-gray-700 text-sm font-mono ml-4">
              d = √[(4-1)² + (6-2)² + (8-3)²]<br />
              d = √[3² + 4² + 5²]<br />
              d = √[9 + 16 + 25]<br />
              d = √50<br />
              d ≈ 7.0711 units
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 3: Geographic Distance</h3>
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-2"><strong>Problem:</strong> Distance from London (51.5074°N, 0.1278°W) to Paris (48.8566°N, 2.3522°E)</p>
            <p className="text-gray-700 mb-2"><strong>Solution:</strong> Using Haversine formula</p>
            <p className="text-gray-700 text-sm ml-4">
              Distance ≈ 344 kilometers or 214 miles
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Example 4: Manhattan Distance</h3>
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-2"><strong>Problem:</strong> Manhattan distance from (0, 0) to (5, 7)</p>
            <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
            <p className="text-gray-700 text-sm font-mono ml-4">
              d = |5-0| + |7-0|<br />
              d = 5 + 7<br />
              d = 12 units
            </p>
            <p className="text-gray-700 mt-2 text-sm"><em>Note: Euclidean distance would be approximately 8.6 units</em></p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Distance Calculations</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li><strong>Check Your Units:</strong> Ensure all coordinates use the same units (meters, feet, etc.)</li>
            <li><strong>Geographic Coordinates:</strong> Remember that latitude ranges from -90° to 90° and longitude from -180° to 180°</li>
            <li><strong>Negative Coordinates:</strong> Distance formulas work with negative numbers; the result is always positive</li>
            <li><strong>Choose the Right Method:</strong> Use Euclidean for straight-line, Manhattan for grid-based, Geographic for Earth surface</li>
            <li><strong>Verify Results:</strong> Check if your calculated distance makes sense given the input coordinates</li>
            <li><strong>Precision Matters:</strong> For GPS coordinates, more decimal places = higher precision (6 decimals ≈ 0.1 meter accuracy)</li>
            <li><strong>Earth's Shape:</strong> For very long distances, consider that Earth is not perfectly spherical (use WGS84 ellipsoid for highest precision)</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Distance Values Reference</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pythagorean Triples (2D):</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Common right triangles where all sides are integers:
            </p>
            <ul className="text-gray-700 text-sm space-y-1 mb-6">
              <li>• 3-4-5 triangle: Distance from (0,0) to (3,4) = 5 units</li>
              <li>• 5-12-13 triangle: Distance from (0,0) to (5,12) = 13 units</li>
              <li>• 8-15-17 triangle: Distance from (0,0) to (8,15) = 17 units</li>
              <li>• 7-24-25 triangle: Distance from (0,0) to (7,24) = 25 units</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Major City Distances:</h3>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• New York to Los Angeles: ~3,944 km / 2,451 mi</li>
              <li>• London to Paris: ~344 km / 214 mi</li>
              <li>• Tokyo to Beijing: ~2,100 km / 1,305 mi</li>
              <li>• Sydney to Melbourne: ~713 km / 443 mi</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our Distance Calculator?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Distance Calculator stands out for its versatility, accuracy, and educational value. Unlike basic calculators that 
            only show final results, we provide comprehensive step-by-step solutions that help you understand the mathematical 
            process behind each calculation. The support for multiple distance types (2D, 3D, geographic, and Manhattan) makes it 
            a one-stop solution for all your distance calculation needs.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you need to calculate the distance between two points on a graph, find the real-world distance between cities 
            using GPS coordinates, or determine grid-based distances for pathfinding algorithms, our calculator handles it all with 
            ease. The automatic midpoint calculation feature and detailed formula explanations make it an excellent tool for both 
            learning and practical applications.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The intuitive interface works perfectly on desktop and mobile devices, ensuring you can perform distance calculations 
            wherever you are. With support for multiple coordinate systems, unit conversions, and high-precision calculations, our 
            calculator is trusted by students, educators, developers, and professionals worldwide. Best of all, it's completely 
            free with no registration required.
          </p>
        </section>
      </article>
    </div>
  );
}

