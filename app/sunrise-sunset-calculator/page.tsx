import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import SunriseSunsetCalculator from '@/components/Calculator/SunriseSunsetCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Sunrise Sunset Calculator - Find Sun Times for Any Location | AICalculator',
  description: 'Free sunrise sunset calculator to find exact sunrise, sunset, solar noon, and twilight times for any location and date. Calculate daylight hours and plan your activities.',
  keywords: [
    'sunrise sunset calculator',
    'sunrise calculator',
    'sunset calculator',
    'sun times calculator',
    'solar calculator',
    'daylight calculator',
    'twilight calculator',
    'civil twilight',
    'nautical twilight',
    'astronomical twilight',
    'solar noon calculator',
    'day length calculator',
    'sunrise time',
    'sunset time',
    'golden hour calculator',
    'blue hour calculator',
    'dawn calculator',
    'dusk calculator',
    'sun position calculator',
    'daylight hours',
    'sun schedule',
    'sunrise sunset times',
    'solar times',
    'sun calculator',
    'photography calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Sunrise Sunset Calculator - Calculate Sun Times',
    description: 'Find exact sunrise, sunset, and twilight times for any location and date worldwide.',
    type: 'website',
    url: getUrl('/sunrise-sunset-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('sunrise-sunset'),
      width: 1200,
      height: 630,
      alt: 'Sunrise Sunset Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunrise Sunset Calculator - Calculate Sun Times',
    description: 'Calculate sunrise, sunset, and twilight times for any location.',
    images: [getOgImage('sunrise-sunset')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/sunrise-sunset-calculator'),
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

export default function SunriseSunsetCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/sunrise-sunset-calculator'),
        name: 'Sunrise Sunset Calculator',
        url: getUrl('/sunrise-sunset-calculator'),
        description: 'Calculate precise sunrise, sunset, solar noon, and twilight times for any location and date. Includes civil, nautical, and astronomical twilight calculations.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Sunrise and sunset times',
          'Solar noon calculation',
          'Daylight duration',
          'Civil twilight times',
          'Nautical twilight times',
          'Astronomical twilight times',
          'Location-based calculations',
          'Current location support',
          'Preset major cities'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/sunrise-sunset-calculator'),
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
            name: 'Other Tools',
            item: getUrl('/other'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Sunrise Sunset Calculator',
            item: getUrl('/sunrise-sunset-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/sunrise-sunset-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How are sunrise and sunset times calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sunrise and sunset times are calculated using astronomical algorithms based on the sun\'s position relative to Earth. The calculation considers: 1) The date and your geographic coordinates (latitude and longitude), 2) The sun\'s declination (position relative to Earth\'s equator), which changes throughout the year, 3) The hour angle - the time it takes for the sun to move from the horizon to its highest point, 4) Atmospheric refraction - light bending through the atmosphere makes the sun appear higher than it actually is, 5) The sun\'s angular diameter - we see sunrise when the top edge appears, not the center. The standard definition uses -0.833 degrees below the geometric horizon to account for refraction (0.567°) and the sun\'s radius (0.267°). Our calculator uses these precise astronomical formulas to provide accurate times for any location and date.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between civil, nautical, and astronomical twilight?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Twilight is divided into three phases based on the sun\'s angle below the horizon: 1) Civil Twilight (sun 0-6° below horizon) - Brightest twilight phase. Sufficient natural light for most outdoor activities without artificial lighting. The horizon is clearly visible. This is when most people consider it "dawn" or "dusk." 2) Nautical Twilight (sun 6-12° below horizon) - Darker than civil twilight but the horizon is still visible at sea, allowing sailors to take star sightings for navigation while seeing the horizon. General outlines of objects are distinguishable. 3) Astronomical Twilight (sun 12-18° below horizon) - Very dark, but not completely. The faintest stars are visible, but the sky isn\'t fully dark. Astronomers consider this the limit for astronomical observations. Beyond 18° below the horizon, it\'s considered true night with no solar illumination affecting the sky.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why do sunrise and sunset times vary by location?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sunrise and sunset times vary by location due to several factors: 1) Latitude - Locations closer to the equator have relatively consistent day lengths year-round (about 12 hours). Locations closer to the poles experience extreme variations, from 24-hour daylight in summer to 24-hour darkness in winter. 2) Longitude - Affects the local time of sunrise/sunset. Moving east means earlier sunrise/sunset; moving west means later times. 3) Time zones - Two locations at the same latitude but different longitudes within the same time zone will have different sun times. 4) Elevation - Higher elevations see sunrise earlier and sunset later because they have a lower horizon. 5) Local terrain - Mountains, hills, and buildings can block the sun, affecting when you actually see sunrise or sunset, though astronomical times remain the same.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is solar noon and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Solar noon (also called "true noon" or "midday") is the moment when the sun reaches its highest point in the sky for the day, crossing the local meridian (the imaginary line running from north to south through your location). This is when the sun is due south in the Northern Hemisphere or due north in the Southern Hemisphere. Solar noon rarely coincides with clock noon (12:00 PM) due to: 1) Time zones - Each zone covers about 15° of longitude, but solar noon varies continuously with longitude. 2) Equation of time - Earth\'s elliptical orbit and axial tilt cause the sun\'s apparent motion to vary, making solar noon up to 16 minutes different from mean solar time. 3) Daylight Saving Time - Shifts clock time by one hour. Solar noon is important for: sundial calibration, solar panel positioning, photography (shortest shadows), astronomy observations, and understanding your local solar day.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does daylight duration change throughout the year?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Daylight duration changes throughout the year due to Earth\'s axial tilt (23.5°) as it orbits the Sun. At the equator, day length remains nearly constant at about 12 hours year-round. At higher latitudes, variations are dramatic: Summer Solstice (June 20-21 in Northern Hemisphere) - Longest day of the year. The North Pole has 24-hour daylight while the South Pole has 24-hour darkness. Winter Solstice (December 21-22) - Shortest day. The situation reverses. Spring and Fall Equinoxes (March 20-21 and September 22-23) - Day and night are approximately equal (12 hours each) everywhere on Earth. The rate of change is fastest around the equinoxes and slowest near the solstices. At 60° latitude, daylight ranges from about 6 hours in winter to 18 hours in summer. Inside the Arctic and Antarctic Circles (66.5° latitude), there are periods of continuous daylight (midnight sun) in summer and continuous darkness (polar night) in winter.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the golden hour and blue hour for photography?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The golden hour and blue hour are prized times for photography due to unique lighting conditions: Golden Hour (also called "magic hour") occurs twice daily - shortly after sunrise and shortly before sunset (roughly when the sun is 0-6° above the horizon). Characteristics: warm, soft, diffused light; long shadows; golden/orange color tones; reduced contrast; flattering for portraits and landscapes. Duration varies by latitude and season, typically 20-60 minutes. Blue Hour occurs twice daily - before sunrise and after sunset (roughly when the sun is 4-8° below the horizon, during civil twilight). Characteristics: deep blue sky tones; soft, even lighting; city lights visible but sky not completely dark; ethereal atmosphere; ideal for cityscapes and architecture. Duration is shorter than golden hour, typically 20-40 minutes. Our calculator shows civil twilight times which correspond to these periods. Photographers often arrive 30 minutes before sunrise or stay 30 minutes after sunset to capture both hours.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/sunrise-sunset-calculator'),
        name: 'How to Use the Sunrise Sunset Calculator',
        description: 'Learn how to calculate sunrise, sunset, and twilight times for any location and date.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Sunrise Sunset Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select the Date',
            text: 'Choose the month, day, and year for which you want to calculate sun times. The calculator defaults to today\'s date.',
            url: getStepUrl('/sunrise-sunset-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Location',
            text: 'Input your location using latitude and longitude coordinates. You can optionally add a location name for reference.',
            url: getStepUrl('/sunrise-sunset-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use Current Location (Optional)',
            text: 'Click "Use Current Location" to automatically detect your coordinates using your device\'s GPS.',
            url: getStepUrl('/sunrise-sunset-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Quick Select City (Optional)',
            text: 'Choose from preset major cities like New York, London, Tokyo, Sydney, Paris, or Dubai for quick calculations.',
            url: getStepUrl('/sunrise-sunset-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Calculate Sun Times',
            text: 'Click the "Calculate Sun Times" button to generate sunrise, sunset, and twilight information.',
            url: getStepUrl('/sunrise-sunset-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'View Main Sun Times',
            text: 'See the sunrise time, solar noon (when the sun is highest), and sunset time for your location.',
            url: getStepUrl('/sunrise-sunset-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Check Daylight Duration',
            text: 'Review the total daylight hours and minutes between sunrise and sunset.',
            url: getStepUrl('/sunrise-sunset-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Review Twilight Times',
            text: 'Explore civil, nautical, and astronomical twilight times for dawn and dusk, useful for photography and astronomy.',
            url: getStepUrl('/sunrise-sunset-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/sunrise-sunset-calculator'),
        headline: 'Sunrise Sunset Calculator - Calculate Sun Times for Any Location',
        description: 'Complete guide to calculating sunrise, sunset, twilight times, and understanding solar patterns for any location and date.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png'),
          },
        },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        image: getOgImage('sunrise-sunset'),
        articleBody: 'Understanding sunrise and sunset times is essential for planning outdoor activities, photography, astronomy, agriculture, and daily routines. Our calculator provides precise sun times based on your location and date using astronomical algorithms.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Sunrise Sunset Calculator - Find Sun Times for Any Location</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Sunrise Sunset Calculator"
        calculatorUrl="/sunrise-sunset-calculator"
      />

      <SunriseSunsetCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Sunrise and Sunset</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What Determines Sunrise and Sunset Times?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Sunrise</strong> and <strong>sunset</strong> are the moments when the upper edge of the sun appears to touch the horizon. These times are determined by the complex interaction of Earth's rotation, orbital position, axial tilt, and your geographic location. Understanding these factors helps explain why sun times vary throughout the year and across different locations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The calculation of sun times involves sophisticated astronomical algorithms that account for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Earth's Rotation:</strong> Earth rotates 360° in approximately 24 hours, causing the sun to appear to move across the sky from east to west.</li>
              <li><strong>Earth's Axial Tilt:</strong> The 23.5° tilt of Earth's axis causes seasonal variations in sun position and daylight duration.</li>
              <li><strong>Earth's Orbital Position:</strong> As Earth orbits the sun, the sun's declination (position relative to the equator) changes, affecting sunrise and sunset times.</li>
              <li><strong>Geographic Latitude:</strong> Your distance from the equator dramatically affects sun times and seasonal variations.</li>
              <li><strong>Geographic Longitude:</strong> Your east-west position determines the local time of solar events.</li>
              <li><strong>Atmospheric Refraction:</strong> Earth's atmosphere bends light, making the sun appear about 0.6° higher than its true position.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our calculator uses precise astronomical formulas to compute sun times for any location and date, providing accurate results for planning your activities, photography sessions, or simply satisfying your curiosity about solar patterns.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Three Types of Twilight</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Twilight is the period between day and night when the sun is below the horizon but its light is still visible. There are three distinct phases of twilight, defined by the sun's angle below the horizon:
            </p>
            
            <div className="space-y-6">
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🌆</span>
                  <h4 className="font-bold text-indigo-900 text-lg">Civil Twilight</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Sun's Position:</strong> 0° to 6° below the horizon
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Characteristics:</strong> This is the brightest twilight phase. There's enough natural light for most outdoor activities without artificial lighting. The horizon is clearly defined, and the brightest stars and planets become visible. This is what most people consider "dawn" or "dusk."
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Duration:</strong> Varies by latitude and season. At the equator, about 20-25 minutes. At higher latitudes, can last over an hour.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Outdoor sports, walking without flashlights, landscape photography (golden hour and blue hour occur during this period), and general outdoor activities.
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🌊</span>
                  <h4 className="font-bold text-blue-900 text-lg">Nautical Twilight</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Sun's Position:</strong> 6° to 12° below the horizon
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Characteristics:</strong> Darker than civil twilight, but the horizon is still visible at sea, which is crucial for marine navigation. Sailors can take star sightings for navigation while still seeing the horizon line. General outlines of objects are distinguishable on land.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Duration:</strong> Typically 30-40 minutes at mid-latitudes.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Marine navigation (traditional celestial navigation), aviation (pilots can distinguish horizon), and transitioning to night activities.
                </p>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">⭐</span>
                  <h4 className="font-bold text-purple-900 text-lg">Astronomical Twilight</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Sun's Position:</strong> 12° to 18° below the horizon
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Characteristics:</strong> Very dark, but not completely. The sky isn't fully dark - there's still a faint glow on the horizon. Most stars are visible, but the faintest ones may still be washed out. Astronomers consider this the limit for quality astronomical observations.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Duration:</strong> Typically 30-40 minutes at mid-latitudes.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Astronomy observations (though true night is better), astrophotography, and viewing the Milky Way (though it's more visible after astronomical twilight ends).
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Beyond 18° below the horizon, it's considered true night with no solar illumination affecting the sky. At very high latitudes (near the poles), some or all twilight phases may last for extended periods or merge together, especially around the summer solstice when the sun barely sets.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Solar Noon and Day Length</h3>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 mb-6">
              <h4 className="font-bold text-yellow-900 text-lg mb-3">What is Solar Noon?</h4>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Solar noon</strong> (also called "true noon" or "midday") is the moment when the sun reaches its highest point in the sky for the day. At this moment, the sun crosses your local meridian - an imaginary line running from north to south through your location. The sun is due south if you're in the Northern Hemisphere, or due north if you're in the Southern Hemisphere.
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Why Solar Noon ≠ Clock Noon:</strong> Solar noon rarely occurs at exactly 12:00 PM on your clock due to:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li><strong>Time Zones:</strong> Each time zone covers about 15° of longitude (1 hour), but solar noon varies continuously with longitude within that zone.</li>
                <li><strong>Equation of Time:</strong> Earth's elliptical orbit and axial tilt cause the sun's apparent motion to vary throughout the year, creating up to a 16-minute difference from mean solar time.</li>
                <li><strong>Daylight Saving Time:</strong> When in effect, shifts clock time by one hour from standard time.</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
              <h4 className="font-bold text-blue-900 text-lg mb-3">Understanding Day Length</h4>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Day length</strong> (or daylight duration) is the time between sunrise and sunset. It varies dramatically based on latitude and time of year:
              </p>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold mb-1">At the Equator (0° latitude):</p>
                  <p>Day length remains nearly constant at about 12 hours year-round, varying by only a few minutes.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">At Mid-Latitudes (30-50°):</p>
                  <p>Significant seasonal variation. For example, at 40°N, day length ranges from about 9 hours in winter to 15 hours in summer.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">At High Latitudes (60-66.5°):</p>
                  <p>Extreme variation. At 60°N, day length ranges from about 6 hours in winter to 18 hours in summer.</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Inside Arctic/Antarctic Circles (>66.5°):</p>
                  <p>Experience periods of midnight sun (24-hour daylight) in summer and polar night (24-hour darkness) in winter.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Seasonal Variations in Sun Times</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The sun's position and timing change throughout the year due to Earth's axial tilt and orbital motion. Understanding these patterns helps you plan activities and appreciate the astronomical causes of seasons:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                <h4 className="font-bold text-amber-900 mb-3">☀️ Summer Solstice</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> June 20-21 (Northern Hemisphere)</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Sun's Position:</strong> Highest point in the sky, farthest north</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Day Length:</strong> Longest day of the year</p>
                <p className="text-sm text-gray-700">
                  <strong>Effects:</strong> Earliest sunrise and latest sunset (though not on the same day). Maximum daylight hours. At Arctic Circle, sun doesn't set (midnight sun). At Antarctic Circle, sun doesn't rise (polar night).
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="font-bold text-blue-900 mb-3">❄️ Winter Solstice</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> December 21-22 (Northern Hemisphere)</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Sun's Position:</strong> Lowest point in the sky, farthest south</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Day Length:</strong> Shortest day of the year</p>
                <p className="text-sm text-gray-700">
                  <strong>Effects:</strong> Latest sunrise and earliest sunset (though not on the same day). Minimum daylight hours. At Arctic Circle, sun doesn't rise (polar night). At Antarctic Circle, sun doesn't set (midnight sun).
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-bold text-green-900 mb-3">🌸 Spring Equinox</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> March 20-21</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Sun's Position:</strong> Directly above equator, moving north</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Day Length:</strong> Approximately 12 hours everywhere</p>
                <p className="text-sm text-gray-700">
                  <strong>Effects:</strong> Day and night are nearly equal. Sun rises due east and sets due west. Fastest rate of change in day length. Days are getting longer in Northern Hemisphere.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h4 className="font-bold text-orange-900 mb-3">🍂 Fall Equinox</h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> September 22-23</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Sun's Position:</strong> Directly above equator, moving south</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Day Length:</strong> Approximately 12 hours everywhere</p>
                <p className="text-sm text-gray-700">
                  <strong>Effects:</strong> Day and night are nearly equal. Sun rises due east and sets due west. Fastest rate of change in day length. Days are getting shorter in Northern Hemisphere.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Important Note:</strong> The earliest sunset doesn't occur on the winter solstice, and the latest sunset doesn't occur on the summer solstice. This is due to the "equation of time" - the variation in the sun's apparent motion caused by Earth's elliptical orbit and axial tilt. Earliest sunset typically occurs in early December, while latest sunrise occurs in early January (in the Northern Hemisphere).
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Practical Applications</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Knowing sunrise and sunset times has numerous practical applications in daily life, professional activities, and hobbies:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>📸</span>
                  Photography
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Photographers rely on sun times for optimal lighting conditions:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Golden Hour:</strong> Shortly after sunrise and before sunset (sun 0-6° above horizon) provides warm, soft light ideal for portraits and landscapes.</li>
                  <li><strong>Blue Hour:</strong> Before sunrise and after sunset (sun 4-8° below horizon, during civil twilight) offers deep blue tones perfect for cityscapes.</li>
                  <li><strong>Avoid Harsh Midday Light:</strong> Solar noon produces harsh shadows and high contrast, less ideal for most photography.</li>
                  <li><strong>Plan Shoots:</strong> Knowing exact times helps photographers arrive early and maximize the brief optimal lighting windows.</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🔭</span>
                  Astronomy
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Astronomers need to know when true darkness occurs:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Observation Planning:</strong> Best observations occur after astronomical twilight ends (sun >18° below horizon).</li>
                  <li><strong>Telescope Setup:</strong> Arrive during civil twilight to set up equipment while there's still light.</li>
                  <li><strong>Planet Viewing:</strong> Some planets are visible during twilight before full darkness.</li>
                  <li><strong>Meteor Showers:</strong> Peak viewing is typically between astronomical twilight and dawn.</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🌾</span>
                  Agriculture
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Farmers use sun times for planning daily operations:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Work Scheduling:</strong> Plan field work during daylight hours, especially for tasks requiring visibility.</li>
                  <li><strong>Frost Protection:</strong> Understanding sunrise timing helps protect crops from frost damage.</li>
                  <li><strong>Irrigation Timing:</strong> Water crops in early morning or late evening to minimize evaporation.</li>
                  <li><strong>Harvest Planning:</strong> Coordinate harvest activities with available daylight.</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🏃</span>
                  Outdoor Activities
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Outdoor enthusiasts need sun times for safety and planning:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Hiking & Camping:</strong> Plan to reach destinations before sunset, set up camp during daylight.</li>
                  <li><strong>Running & Cycling:</strong> Schedule early morning or evening activities during cooler, less sunny times.</li>
                  <li><strong>Fishing:</strong> Many fish are most active during dawn and dusk twilight periods.</li>
                  <li><strong>Beach Activities:</strong> Plan around sun position for optimal conditions and UV exposure management.</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>🏗️</span>
                  Construction & Architecture
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Builders and architects consider sun patterns:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Work Hours:</strong> Schedule outdoor construction during daylight hours for safety and efficiency.</li>
                  <li><strong>Building Design:</strong> Orient buildings to maximize natural light and solar heating.</li>
                  <li><strong>Solar Panel Placement:</strong> Position panels to capture maximum sunlight based on sun path.</li>
                  <li><strong>Shade Analysis:</strong> Predict shadow patterns for landscape design and building placement.</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>✈️</span>
                  Aviation & Marine
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Pilots and sailors use sun times for navigation and safety:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                  <li><strong>Visual Flight Rules (VFR):</strong> Pilots need sufficient daylight for safe visual navigation.</li>
                  <li><strong>Celestial Navigation:</strong> Nautical twilight is ideal for taking star sightings at sea.</li>
                  <li><strong>Landing Planning:</strong> Schedule arrivals during daylight for better visibility.</li>
                  <li><strong>Watch Schedules:</strong> Coordinate crew shifts with day/night cycles.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tips for Using This Calculator</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Get the most out of our Sunrise Sunset Calculator with these helpful tips:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">1.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Use Precise Coordinates</h4>
                  <p className="text-sm text-gray-700">For the most accurate results, use precise latitude and longitude coordinates (to at least 4 decimal places). Even small differences in coordinates can affect sun times by several minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">2.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Consider Local Terrain</h4>
                  <p className="text-sm text-gray-700">Our calculator provides astronomical sun times (when the sun crosses the horizon). Mountains, buildings, or hills may block your view, causing you to see sunrise later or sunset earlier than calculated.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Plan Photography Sessions</h4>
                  <p className="text-sm text-gray-700">Arrive 30-45 minutes before sunrise or stay 30-45 minutes after sunset to capture both golden hour and blue hour. Civil twilight times indicate these periods.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">4.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Check Multiple Dates</h4>
                  <p className="text-sm text-gray-700">Calculate sun times for different dates to see how they change throughout the year. This is especially useful for planning seasonal activities or understanding local solar patterns.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-orange-600 font-bold text-lg">5.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Account for Daylight Saving Time</h4>
                  <p className="text-sm text-gray-700">Times are displayed in your local time zone. Remember that Daylight Saving Time shifts clock time by one hour, affecting when sunrise and sunset occur relative to your clock.</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mt-6">
              Use our Sunrise Sunset Calculator to plan your day, optimize outdoor activities, capture perfect photographs, or simply appreciate the beautiful astronomical patterns that govern our daily cycles. Understanding sun times connects us to the natural rhythms of Earth and enhances our experience of each day!
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/moon-phase-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🌙</div>
            <h3 className="font-semibold text-gray-900">Moon Phase Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Track lunar cycles</p>
          </a>
          
          <a 
            href="/date-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-gray-900">Date Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate dates and durations</p>
          </a>
          
          <a 
            href="/time-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-gray-900">Time Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add and subtract time</p>
          </a>
          
          <a 
            href="/biorhythm-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Biorhythm Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Track your natural cycles</p>
          </a>
        </div>
      </section>
    </div>
  );
}

