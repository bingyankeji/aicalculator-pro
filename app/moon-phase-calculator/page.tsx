import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import MoonPhaseCalculator from '@/components/Calculator/MoonPhaseCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Moon Phase Calculator - Find Current & Future Lunar Phases | AICalculator',
  description: 'Free moon phase calculator to determine the current moon phase for any date. Track new moon, full moon, and all lunar phases with detailed astronomical information and viewing times.',
  keywords: [
    'moon phase calculator',
    'lunar phase calculator',
    'current moon phase',
    'moon calendar',
    'full moon calculator',
    'new moon calculator',
    'moon phases today',
    'lunar calendar',
    'moon cycle calculator',
    'waxing moon',
    'waning moon',
    'moon illumination',
    'moon age calculator',
    'next full moon',
    'next new moon',
    'moon phase today',
    'lunar cycle',
    'moon phases 2024',
    'moon viewing time',
    'moon zodiac sign',
    'tidal calculator',
    'spring tides',
    'neap tides',
    'moon astronomy',
    'lunar phases chart'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Moon Phase Calculator - Track Lunar Cycles',
    description: 'Calculate moon phases for any date. Discover new moon, full moon, and all lunar phases with detailed astronomical data.',
    type: 'website',
    url: getUrl('/moon-phase-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('moon-phase'),
      width: 1200,
      height: 630,
      alt: 'Moon Phase Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moon Phase Calculator - Track Lunar Cycles',
    description: 'Find the moon phase for any date with detailed astronomical information.',
    images: [getOgImage('moon-phase')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/moon-phase-calculator'),
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

export default function MoonPhaseCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/moon-phase-calculator'),
        name: 'Moon Phase Calculator',
        url: getUrl('/moon-phase-calculator'),
        description: 'Calculate the moon phase for any date with detailed astronomical information including illumination percentage, moon age, zodiac sign, and tidal influence.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate moon phase for any date',
          'Eight distinct lunar phases',
          'Moon illumination percentage',
          'Moon age in days',
          'Next major phase dates',
          'Best viewing times',
          'Moon zodiac sign',
          'Tidal influence information',
          'Complete lunar cycle visualization'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/moon-phase-calculator'),
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
            name: 'Moon Phase Calculator',
            item: getUrl('/moon-phase-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/moon-phase-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the eight phases of the moon?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The moon goes through eight distinct phases during its 29.5-day cycle: 1) New Moon - completely dark, not visible; 2) Waxing Crescent - thin crescent on the right; 3) First Quarter - right half illuminated; 4) Waxing Gibbous - more than half illuminated, growing; 5) Full Moon - completely illuminated; 6) Waning Gibbous - more than half illuminated, shrinking; 7) Last Quarter - left half illuminated; 8) Waning Crescent - thin crescent on the left. The cycle then repeats. "Waxing" means growing larger, while "waning" means shrinking. The moon appears to grow from right to left in the Northern Hemisphere.'
            }
          },
          {
            '@type': 'Question',
            name: 'How long does each moon phase last?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The complete lunar cycle lasts approximately 29.53 days (called a synodic month). Each of the four primary phases (New Moon, First Quarter, Full Moon, Last Quarter) lasts about 7.4 days. The transition phases (Waxing Crescent, Waxing Gibbous, Waning Gibbous, Waning Crescent) also last roughly 7.4 days each. However, the exact moment of each primary phase is instantaneous - for example, the Full Moon technically lasts only a moment when the moon is exactly opposite the Sun, though it appears full to the naked eye for about 2-3 days. The moon moves through about 12.2 degrees of its orbit each day, causing the visible phase to change continuously.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why does the moon have phases?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Moon phases occur because the moon orbits Earth while Earth orbits the Sun. The moon doesn\'t produce its own light - it reflects sunlight. As the moon moves around Earth, we see different amounts of its sunlit side, creating the phases. During a New Moon, the moon is between Earth and the Sun, so the sunlit side faces away from us. During a Full Moon, Earth is between the Sun and the moon, so we see the entire sunlit side. The phases in between show us partial views of the sunlit portion. This is purely a matter of geometry and viewing angle - the moon is always half-illuminated by the Sun, but we see varying amounts of that illuminated half depending on the moon\'s position in its orbit.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the best time to view the moon?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best viewing time depends on the moon phase. Full Moon is visible all night, rising at sunset and setting at sunrise - perfect for all-night observation. Waxing phases (Crescent and Gibbous) are best viewed in the evening, looking west after sunset. Waning phases are best seen in the morning, looking east before sunrise. First Quarter moon is visible from noon to midnight, while Last Quarter is visible from midnight to noon. New Moon is not visible as it\'s too close to the Sun. For optimal viewing, use binoculars or a telescope during First or Last Quarter when shadows along the terminator (the line between light and dark) reveal the most surface detail. Avoid viewing during Full Moon for surface details as the lack of shadows makes features less visible.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do moon phases affect tides?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Moon phases significantly affect tides through gravitational pull. During New Moon and Full Moon, the Sun, Moon, and Earth align, combining their gravitational forces to create Spring Tides - the highest high tides and lowest low tides (largest tidal range). During First Quarter and Last Quarter, the Sun and Moon are at right angles to Earth, partially canceling each other\'s gravitational effects, creating Neap Tides - the smallest tidal range with lower high tides and higher low tides. Spring tides occur twice monthly (at new and full moons) and are about 20% higher than average. Neap tides also occur twice monthly (at quarter moons) and are about 20% lower than average. Coastal areas experience two high tides and two low tides each day, with the timing advancing by about 50 minutes daily as the moon orbits Earth.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can moon phases affect human behavior?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Despite popular belief, scientific research has found no reliable evidence that moon phases affect human behavior, mood, or health. Multiple large-scale studies have examined potential correlations between moon phases and hospital admissions, crime rates, psychiatric episodes, sleep quality, and birth rates - none found consistent, significant effects. The belief in lunar influence (called the "lunar effect" or "Transylvania effect") likely persists due to confirmation bias (remembering events that match beliefs while forgetting those that don\'t), cultural traditions, and the fact that the moon is highly visible and has a regular cycle that\'s easy to track. However, the moon does affect Earth through tides, which can influence marine life behavior and some animal breeding cycles. While the moon may not affect human behavior scientifically, many people find tracking lunar phases meaningful for spiritual or reflective practices.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/moon-phase-calculator'),
        name: 'How to Use the Moon Phase Calculator',
        description: 'Learn how to calculate moon phases for any date and understand lunar cycle information.',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Moon Phase Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select the Date',
            text: 'Choose the month, day, and year for which you want to know the moon phase. The calculator defaults to today\'s date.',
            url: getStepUrl('/moon-phase-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Calculate Moon Phase',
            text: 'Click the "Calculate Moon Phase" button to generate the lunar information for your selected date.',
            url: getStepUrl('/moon-phase-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Current Phase',
            text: 'See the moon phase name (e.g., Full Moon, Waxing Crescent) along with the moon emoji visualization and illumination percentage.',
            url: getStepUrl('/moon-phase-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Check Moon Age',
            text: 'Review the moon age in days, which shows how many days have passed since the last new moon.',
            url: getStepUrl('/moon-phase-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Read Phase Description',
            text: 'Learn about the characteristics and significance of the current moon phase.',
            url: getStepUrl('/moon-phase-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Find Best Viewing Time',
            text: 'Discover the optimal time to observe the moon based on its current phase.',
            url: getStepUrl('/moon-phase-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Check Upcoming Phases',
            text: 'View the dates for the next New Moon, First Quarter, Full Moon, and Last Quarter.',
            url: getStepUrl('/moon-phase-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Review Tidal Information',
            text: 'Understand how the current moon phase affects ocean tides (spring tides vs. neap tides).',
            url: getStepUrl('/moon-phase-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/moon-phase-calculator'),
        headline: 'Moon Phase Calculator - Track and Understand Lunar Cycles',
        description: 'Complete guide to moon phases, lunar cycles, and how to use a moon phase calculator for astronomy and planning.',
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
        image: getOgImage('moon-phase'),
        articleBody: 'The moon goes through a complete cycle of phases approximately every 29.5 days, transitioning through eight distinct phases from new moon to full moon and back again. Understanding moon phases is valuable for astronomy, photography, gardening, fishing, and cultural practices.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Moon Phase Calculator - Find Current and Future Lunar Phases</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Moon Phase Calculator"
        calculatorUrl="/moon-phase-calculator"
      />

      <MoonPhaseCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Moon Phases</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What Are Moon Phases?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Moon phases</strong> are the different appearances of the moon as seen from Earth, caused by the changing positions of the moon, Earth, and Sun. The moon doesn't produce its own light - it reflects sunlight. As the moon orbits Earth (taking approximately 29.5 days for a complete cycle), we see varying amounts of its illuminated surface, creating the phases we observe.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The lunar cycle, also called a <strong>synodic month</strong>, lasts 29.53059 days on average. During this time, the moon transitions through eight distinct phases, from completely dark (New Moon) to fully illuminated (Full Moon) and back again. This cycle has fascinated humanity for millennia and has been used for calendars, agriculture, navigation, and cultural celebrations across civilizations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Understanding moon phases is valuable for various activities including astronomy observation, astrophotography, gardening (some gardeners plant by moon phases), fishing (fish behavior can correlate with tides), and simply appreciating the beauty of our closest celestial neighbor. The phases are entirely predictable and follow precise mathematical patterns based on orbital mechanics.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Eight Moon Phases Explained</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The moon progresses through eight distinct phases during its monthly cycle. Each phase has unique characteristics and optimal viewing times:
            </p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border-l-4 border-gray-600 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌑</span>
                  <h4 className="font-bold text-gray-900 text-lg">1. New Moon</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 0% | <strong>Duration:</strong> Instantaneous (appears dark for 2-3 days)
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  The moon is positioned between Earth and the Sun, with its dark side facing us. The moon is not visible in the night sky during this phase. It rises and sets with the Sun, making daytime observation impossible without special equipment.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Not visible. This is the ideal time for stargazing and deep-sky astronomy as there's no moonlight to interfere. New beginnings and fresh starts in various cultural traditions.
                </p>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌒</span>
                  <h4 className="font-bold text-orange-900 text-lg">2. Waxing Crescent</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 1-49% | <strong>Duration:</strong> ~7.4 days
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  A thin, crescent-shaped sliver appears on the right side (in the Northern Hemisphere). The illuminated portion grows larger each night. "Waxing" means increasing or growing.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Evening viewing, looking west after sunset. Beautiful for photography with the crescent moon near the horizon. Represents growth, intention-setting, and new projects.
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌓</span>
                  <h4 className="font-bold text-yellow-900 text-lg">3. First Quarter</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 50% | <strong>Duration:</strong> Instantaneous (appears half-lit for 2-3 days)
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Exactly half of the moon is illuminated on the right side. Despite being called "quarter," it refers to the moon being one-quarter of the way through its cycle, not its appearance. The moon is at a 90-degree angle to the Sun as seen from Earth.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Visible from noon to midnight. Excellent for observing lunar surface details as shadows along the terminator (day/night line) reveal craters and mountains. Represents decision-making and taking action.
                </p>
              </div>
              
              <div className="bg-lime-50 border-l-4 border-lime-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌔</span>
                  <h4 className="font-bold text-lime-900 text-lg">4. Waxing Gibbous</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 51-99% | <strong>Duration:</strong> ~7.4 days
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  More than half of the moon is illuminated and continuing to grow. "Gibbous" comes from Latin meaning "hump" or "bulge." The moon appears nearly full but with a slight shadow on the left edge.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Evening and night viewing. Good for general moon observation. Represents refinement, patience, and preparation for completion.
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌕</span>
                  <h4 className="font-bold text-blue-900 text-lg">5. Full Moon</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 100% | <strong>Duration:</strong> Instantaneous (appears full for 2-3 days)
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  The entire face of the moon visible from Earth is illuminated. Earth is positioned between the Sun and the moon. The moon rises at sunset and sets at sunrise, making it visible all night long.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> All-night viewing. Creates bright moonlight ideal for nighttime activities. However, surface details are less visible due to lack of shadows. Represents culmination, celebration, and peak energy. Associated with spring tides (highest tidal ranges).
                </p>
              </div>
              
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌖</span>
                  <h4 className="font-bold text-indigo-900 text-lg">6. Waning Gibbous</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 99-51% | <strong>Duration:</strong> ~7.4 days
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  More than half illuminated but decreasing. "Waning" means shrinking or decreasing. The shadow appears on the right side and grows larger each night. Also called the "Disseminating Moon."
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Late evening and early morning viewing. Represents sharing wisdom, gratitude, and beginning to release.
                </p>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌗</span>
                  <h4 className="font-bold text-purple-900 text-lg">7. Last Quarter</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 50% | <strong>Duration:</strong> Instantaneous (appears half-lit for 2-3 days)
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Half of the moon is illuminated on the left side. The moon is three-quarters of the way through its cycle. It rises around midnight and sets around noon.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Visible from midnight to noon. Good for morning observation. Excellent for viewing surface details. Represents reflection, forgiveness, and letting go.
                </p>
              </div>
              
              <div className="bg-pink-50 border-l-4 border-pink-500 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">🌘</span>
                  <h4 className="font-bold text-pink-900 text-lg">8. Waning Crescent</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Illumination:</strong> 49-1% | <strong>Duration:</strong> ~7.4 days
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  A thin crescent on the left side, shrinking towards the new moon. The final phase before the cycle begins again. Also called the "Balsamic Moon."
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Best for:</strong> Early morning viewing, looking east before sunrise. Beautiful for photography. Represents rest, surrender, and preparation for renewal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How Moon Phases Are Calculated</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Moon phase calculations are based on precise astronomical algorithms that determine the moon's position relative to the Sun and Earth. Our calculator uses the following methodology:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-5 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Calculation Steps</h4>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
                <li><strong>Convert Date to Julian Day:</strong> Transform the calendar date into a Julian Day Number (JDN), a continuous count of days since January 1, 4713 BCE. This standardizes date calculations across different calendar systems.</li>
                <li><strong>Calculate Days Since Known New Moon:</strong> Determine the number of days since a reference new moon (January 6, 2000, at 18:14 UTC, JD 2451550.26).</li>
                <li><strong>Determine Lunar Cycle Position:</strong> Divide by the synodic month length (29.53058867 days) to find the fractional position in the current cycle.</li>
                <li><strong>Calculate Phase Value:</strong> The fractional part represents the phase (0.0 = New Moon, 0.25 = First Quarter, 0.5 = Full Moon, 0.75 = Last Quarter).</li>
                <li><strong>Determine Illumination:</strong> Use the formula: Illumination = (1 - cos(phase × 2π)) / 2 × 100%</li>
                <li><strong>Calculate Moon Age:</strong> Multiply the phase value by 29.53058867 to get the moon's age in days since the last new moon.</li>
              </ol>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Why 29.53 Days?</h4>
              <p className="text-sm text-gray-700">
                The lunar cycle (synodic month) is 29.53058867 days because the moon must "catch up" to the Sun after completing its orbit around Earth. The moon's orbital period around Earth (sidereal month) is only 27.32 days, but during that time, Earth has moved in its orbit around the Sun, so the moon needs an extra 2.2 days to return to the same phase position relative to the Sun.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Moon Phases and Tides</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The moon's gravitational pull is the primary force driving Earth's ocean tides. The Sun also affects tides, but to a lesser extent (about 46% of the moon's effect). The interaction between these gravitational forces creates two types of tides:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="font-bold text-blue-900 text-lg mb-3 flex items-center gap-2">
                  <span>🌊</span>
                  Spring Tides (High Range)
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>When:</strong> During New Moon and Full Moon phases
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Why:</strong> The Sun, Moon, and Earth are aligned (syzygy), combining their gravitational forces. This creates the strongest tidal pull.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Effect:</strong> Higher than normal high tides and lower than normal low tides. The tidal range (difference between high and low) is at its maximum - about 20% greater than average.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> "Spring" refers to the tide "springing forth," not the season. Spring tides occur twice monthly regardless of the time of year.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-bold text-green-900 text-lg mb-3 flex items-center gap-2">
                  <span>🌊</span>
                  Neap Tides (Low Range)
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>When:</strong> During First Quarter and Last Quarter phases
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Why:</strong> The Sun and Moon are at right angles (90 degrees) to Earth, partially canceling each other's gravitational effects.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Effect:</strong> Lower than normal high tides and higher than normal low tides. The tidal range is at its minimum - about 20% less than average.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> "Neap" comes from Old English meaning "without power." Neap tides also occur twice monthly, alternating with spring tides.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              <strong>Practical Implications:</strong> Coastal communities, fishermen, surfers, and boaters must account for tides in their planning. Spring tides can cause coastal flooding in low-lying areas, while neap tides may leave boats stranded in shallow harbors. Many marine animals time their breeding and feeding behaviors to specific tidal patterns.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cultural and Historical Significance</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Moon phases have played crucial roles in human civilization throughout history:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">📅 Calendars and Timekeeping</h4>
                <p className="text-sm text-gray-700">
                  Many ancient calendars were lunar-based, with months defined by moon cycles. Islamic, Hebrew, and traditional Chinese calendars still use lunar months. The word "month" derives from "moon." Even modern calendars show traces of lunar origins - our months average about 30 days, close to the lunar cycle.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🌾 Agriculture and Gardening</h4>
                <p className="text-sm text-gray-700">
                  Traditional farming practices often followed moon phases. Planting "by the moon" suggests planting above-ground crops during waxing phases (increasing light) and root crops during waning phases. While scientific evidence is limited, many gardeners still follow these traditions.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🎉 Festivals and Celebrations</h4>
                <p className="text-sm text-gray-700">
                  Many cultural celebrations are tied to moon phases: Easter (first Sunday after the first full moon following the spring equinox), Chinese Mid-Autumn Festival (full moon of the 8th lunar month), Islamic Ramadan (begins with the new moon), and many indigenous celebrations worldwide.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🧭 Navigation</h4>
                <p className="text-sm text-gray-700">
                  Before modern technology, sailors used the moon for navigation. The moon's position and phase helped determine time and direction. Moonlight during full moons enabled night travel and activities.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🔮 Spiritual and Mystical Practices</h4>
                <p className="text-sm text-gray-700">
                  Many spiritual traditions assign meanings to moon phases: new moons for new beginnings and intentions, full moons for manifestation and release, waxing phases for growth, and waning phases for letting go. While not scientifically proven, these practices provide meaningful rituals for many people.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tips for Moon Observation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you're an amateur astronomer or simply appreciate the moon's beauty, these tips will enhance your viewing experience:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">1.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Best Phases for Surface Detail</h4>
                  <p className="text-sm text-gray-700">First Quarter and Last Quarter moons are ideal for observing craters, mountains, and other surface features. The shadows along the terminator (day/night line) create dramatic contrast and reveal topography.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">2.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Use Binoculars or Telescope</h4>
                  <p className="text-sm text-gray-700">Even basic binoculars (7x50 or 10x50) reveal amazing lunar details. A small telescope (60mm or larger) shows craters, maria (dark plains), and mountain ranges. Always use a moon filter to reduce glare during bright phases.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Avoid Full Moon for Details</h4>
                  <p className="text-sm text-gray-700">While visually impressive, the full moon lacks shadows, making surface features appear flat and washed out. It's better for general viewing and photography but not for detailed observation.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">4.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Photography Tips</h4>
                  <p className="text-sm text-gray-700">Use a tripod and remote shutter. Start with ISO 100-200, aperture f/8-f/11, and shutter speed 1/125-1/250 for full moon. Adjust for other phases. Crescent moons near sunset/sunrise make beautiful compositions with landscapes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">5.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Track Special Events</h4>
                  <p className="text-sm text-gray-700">Watch for supermoons (when full moon coincides with perigee - closest approach to Earth), blue moons (second full moon in a calendar month), and lunar eclipses (when Earth's shadow falls on the moon).</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mt-6">
              Use our Moon Phase Calculator to plan your observations, track upcoming phases, and discover the best times to view the moon. Whether for science, photography, or simple appreciation, understanding lunar cycles enriches your connection with the night sky!
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/biorhythm-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Biorhythm Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Track your natural cycles</p>
          </a>
          
          <a 
            href="/zodiac-sign-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">♈</div>
            <h3 className="font-semibold text-gray-900">Zodiac Sign Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your astrological sign</p>
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
            href="/age-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎂</div>
            <h3 className="font-semibold text-gray-900">Age Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate your exact age</p>
          </a>
        </div>
      </section>
    </div>
  );
}

