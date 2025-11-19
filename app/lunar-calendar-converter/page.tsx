import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import LunarCalendarConverter from '@/components/Calculator/LunarCalendarConverter';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Lunar Calendar Converter - Convert Solar to Lunar Dates | AICalculator',
  description: 'Free lunar calendar converter to convert between solar (Gregorian) and lunar (Chinese) calendar dates. Find Chinese zodiac, festivals, and solar terms.',
  keywords: [
    'lunar calendar converter',
    'chinese calendar converter',
    'solar to lunar converter',
    'lunar to solar converter',
    'chinese lunar calendar',
    'gregorian to lunar',
    'lunar date calculator',
    'chinese calendar calculator',
    'lunar calendar 2024',
    'chinese new year calculator',
    'lunar birthday converter',
    'chinese zodiac calendar',
    'lunar festival dates',
    'solar terms calculator',
    'gan zhi calculator',
    'heavenly stems',
    'earthly branches',
    'chinese astrology calendar',
    'lunar month converter',
    'chinese calendar 2024',
    'lunar new year calculator',
    'traditional chinese calendar',
    'lunisolar calendar',
    'chinese date converter',
    'lunar calendar tool'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Lunar Calendar Converter - Solar to Lunar Date Conversion',
    description: 'Convert between solar and lunar calendar dates with Chinese zodiac, festivals, and solar terms.',
    type: 'website',
    url: getUrl('/lunar-calendar-converter'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('lunar-calendar'),
      width: 1200,
      height: 630,
      alt: 'Lunar Calendar Converter'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lunar Calendar Converter - Solar to Lunar Dates',
    description: 'Convert between solar and lunar calendar dates easily.',
    images: [getOgImage('lunar-calendar')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/lunar-calendar-converter'),
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

export default function LunarCalendarConverterPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/lunar-calendar-converter'),
        name: 'Lunar Calendar Converter',
        url: getUrl('/lunar-calendar-converter'),
        description: 'Convert between solar (Gregorian) and lunar (Chinese) calendar dates. Includes Chinese zodiac, Gan-Zhi system, festivals, and 24 solar terms.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Solar to lunar conversion',
          'Lunar to solar conversion',
          'Chinese zodiac calculation',
          'Gan-Zhi (Heavenly Stems and Earthly Branches)',
          'Traditional festival identification',
          '24 solar terms',
          'Leap month support',
          'Date range 1900-2100'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/lunar-calendar-converter'),
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
            name: 'Lunar Calendar Converter',
            item: getUrl('/lunar-calendar-converter'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/lunar-calendar-converter'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the Chinese lunar calendar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Chinese lunar calendar, also called the Chinese calendar or agricultural calendar (农历), is a lunisolar calendar that has been used in China for thousands of years. Unlike the purely solar Gregorian calendar, it incorporates both lunar phases (moon cycles) and solar movements (seasons). Key features include: 1) Lunar months - Each month begins with a new moon and lasts about 29.5 days. A year typically has 12 lunar months (354-355 days). 2) Leap months - To stay synchronized with solar seasons, a 13th month (leap month) is added approximately every 3 years. 3) Solar terms - 24 solar terms divide the year based on the sun\'s position, marking seasonal changes for agriculture. 4) Gan-Zhi system - Uses 10 Heavenly Stems and 12 Earthly Branches to create a 60-year cycle for naming years, months, and days. 5) Zodiac animals - Each year is associated with one of 12 animals. The calendar determines traditional Chinese festivals like Spring Festival (Chinese New Year), Mid-Autumn Festival, and Dragon Boat Festival.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do you convert solar dates to lunar dates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Converting solar (Gregorian) dates to lunar (Chinese) dates requires complex astronomical calculations and historical data tables. The process involves: 1) Determine the lunar month - Calculate which lunar month the solar date falls into based on new moon dates. New moons occur approximately every 29.53 days. 2) Calculate the day within the month - Count days from the start of the lunar month (new moon). 3) Identify leap months - Check if the lunar month is a leap month (闰月), which occurs when there are 13 lunar months in a year. 4) Account for time zones - Traditional calculations use Chinese Standard Time (UTC+8). 5) Use lookup tables - Most accurate conversions use pre-calculated tables covering specific date ranges (typically 1900-2100). Manual calculation is extremely complex because: lunar months vary between 29 and 30 days, leap month placement follows specific rules, the calendar has been reformed multiple times throughout history. Our calculator uses established conversion algorithms and data tables to provide accurate results for dates between 1900 and 2100.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the 24 solar terms?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 24 solar terms (二十四节气) divide the solar year into 24 periods of approximately 15 days each, based on the sun\'s position along the ecliptic. They guide agricultural activities and mark seasonal changes. The 24 terms are: Spring - 立春 (Start of Spring), 雨水 (Rain Water), 惊蛰 (Awakening of Insects), 春分 (Spring Equinox), 清明 (Pure Brightness), 谷雨 (Grain Rain). Summer - 立夏 (Start of Summer), 小满 (Grain Buds), 芒种 (Grain in Ear), 夏至 (Summer Solstice), 小暑 (Minor Heat), 大暑 (Major Heat). Autumn - 立秋 (Start of Autumn), 处暑 (End of Heat), 白露 (White Dew), 秋分 (Autumn Equinox), 寒露 (Cold Dew), 霜降 (Descent of Frost). Winter - 立冬 (Start of Winter), 小雪 (Minor Snow), 大雪 (Major Snow), 冬至 (Winter Solstice), 小寒 (Minor Cold), 大寒 (Major Cold). These terms were crucial for traditional agriculture, indicating optimal times for planting, harvesting, and other farming activities. They remain culturally significant and are recognized by UNESCO as Intangible Cultural Heritage.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is a leap month in the lunar calendar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A leap month (闰月, rùnyuè) is an extra month added to the Chinese lunar calendar to keep it synchronized with the solar year. Here\'s how it works: Why leap months are needed: A lunar year (12 lunar months) is about 354 days, while a solar year is about 365 days. This 11-day difference would cause the lunar calendar to drift out of sync with seasons. To prevent this, a 13th month is added approximately every 2-3 years (7 times in 19 years). How leap months are determined: A leap month is inserted when a lunar month contains no major solar term (中气). The leap month takes the same number as the previous month but is marked as "leap" (闰). For example, if there\'s a leap month after the 4th month, it\'s called "Leap 4th Month" (闰四月). Characteristics: Leap months can occur in any month except the 11th, 12th, or 1st. People born in a leap month celebrate birthdays in the corresponding regular month in non-leap years. Some traditional beliefs consider leap months special for certain activities. The leap month system ensures that traditional festivals remain in their proper seasons - Spring Festival always falls in late winter/early spring, Mid-Autumn Festival in autumn, etc.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the Gan-Zhi (Heavenly Stems and Earthly Branches) system?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Gan-Zhi system (干支, gānzhī) is an ancient Chinese method for recording time using two sets of characters: 10 Heavenly Stems (天干, tiāngān): 甲 (jiǎ), 乙 (yǐ), 丙 (bǐng), 丁 (dīng), 戊 (wù), 己 (jǐ), 庚 (gēng), 辛 (xīn), 壬 (rén), 癸 (guǐ). Associated with five elements (wood, fire, earth, metal, water) in yin and yang forms. 12 Earthly Branches (地支, dìzhī): 子 (zǐ), 丑 (chǒu), 寅 (yín), 卯 (mǎo), 辰 (chén), 巳 (sì), 午 (wǔ), 未 (wèi), 申 (shēn), 酉 (yǒu), 戌 (xū), 亥 (hài). Associated with the 12 zodiac animals and 12 two-hour periods of the day. How it works: One stem and one branch combine to form a pair (e.g., 甲子, 乙丑). The system cycles through 60 combinations (10 × 6 or 12 × 5) before repeating. This 60-unit cycle is used for: Years (60-year cycle), Months, Days, Hours (two-hour periods). Applications: Traditional Chinese astrology (Four Pillars of Destiny), Historical records and chronology, Traditional Chinese medicine, Feng shui and fortune telling. For example, 2024 is 甲辰 (jiǎchén) year - the Year of the Wood Dragon.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why are lunar calendar dates important in Chinese culture?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The lunar calendar holds deep cultural significance in Chinese and East Asian societies for several reasons: Traditional Festivals: All major Chinese festivals follow the lunar calendar: Spring Festival (Chinese New Year) - 1st day of 1st lunar month, Lantern Festival - 15th day of 1st lunar month, Dragon Boat Festival - 5th day of 5th lunar month, Mid-Autumn Festival - 15th day of 8th lunar month, Double Ninth Festival - 9th day of 9th lunar month. Agricultural Heritage: The calendar was designed for agricultural societies, with 24 solar terms guiding planting and harvesting. Many rural communities still use it for farming decisions. Cultural Identity: The lunar calendar represents thousands of years of Chinese civilization and cultural continuity. Using it maintains connection to ancestral traditions and cultural identity. Auspicious Dates: Many people consult the lunar calendar to choose auspicious dates (吉日) for: Weddings, Business openings, Moving house, Important decisions. Birthdays: Traditional Chinese birthdays are celebrated according to lunar dates. Elders especially prefer lunar birthday celebrations. Astrology and Fortune: Chinese astrology, feng shui, and fortune-telling systems are based on the lunar calendar and Gan-Zhi system. Regional Variations: The lunar calendar is used throughout East Asia with local variations in Vietnam, Korea, and other countries. Despite modernization, the lunar calendar remains relevant in daily life, especially for cultural and family occasions.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/lunar-calendar-converter'),
        name: 'How to Use the Lunar Calendar Converter',
        description: 'Learn how to convert between solar and lunar calendar dates.',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Lunar Calendar Converter',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose Conversion Direction',
            text: 'Select whether you want to convert from Solar to Lunar or from Lunar to Solar calendar.',
            url: getStepUrl('/lunar-calendar-converter', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter the Date',
            text: 'Input the complete date (month, day, year) that you want to convert. For lunar dates, you can also indicate if it\'s a leap month.',
            url: getStepUrl('/lunar-calendar-converter', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Convert the Date',
            text: 'Click the "Convert" button to calculate the corresponding date in the other calendar system.',
            url: getStepUrl('/lunar-calendar-converter', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Converted Date',
            text: 'See the converted date displayed in both traditional Chinese format and standard numerical format.',
            url: getStepUrl('/lunar-calendar-converter', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Check Additional Information',
            text: 'Review the Gan-Zhi (Heavenly Stems and Earthly Branches), Chinese zodiac animal, and lunar month/day names.',
            url: getStepUrl('/lunar-calendar-converter', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Identify Solar Terms',
            text: 'If the date corresponds to one of the 24 solar terms, it will be displayed.',
            url: getStepUrl('/lunar-calendar-converter', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Find Traditional Festivals',
            text: 'See if the date corresponds to any traditional Chinese festivals.',
            url: getStepUrl('/lunar-calendar-converter', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Save or Share Results',
            text: 'Use the save, print, or share buttons to keep or share the conversion results.',
            url: getStepUrl('/lunar-calendar-converter', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/lunar-calendar-converter'),
        headline: 'Lunar Calendar Converter - Convert Solar and Lunar Dates',
        description: 'Complete guide to the Chinese lunar calendar and how to convert between solar and lunar dates.',
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
        image: getOgImage('lunar-calendar'),
        articleBody: 'The Chinese lunar calendar is a lunisolar calendar that has been used for thousands of years. Our converter helps you easily convert between solar (Gregorian) and lunar (Chinese) calendar dates.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Lunar Calendar Converter - Convert Solar to Lunar Dates</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Lunar Calendar Converter"
        calculatorUrl="/lunar-calendar-converter"
      />

      <LunarCalendarConverter />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the Chinese Lunar Calendar</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is the Lunar Calendar?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>Chinese lunar calendar</strong> (农历, nónglì), also known as the agricultural calendar, is a lunisolar calendar that has been used in China and throughout East Asia for over 4,000 years. Unlike the purely solar Gregorian calendar used internationally, the Chinese calendar incorporates both lunar phases (moon cycles) and solar movements (seasons), making it uniquely suited for agricultural societies.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The calendar serves multiple purposes in Chinese culture:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Festival Determination:</strong> All traditional Chinese festivals follow lunar dates, including Spring Festival (Chinese New Year), Mid-Autumn Festival, and Dragon Boat Festival.</li>
              <li><strong>Agricultural Guidance:</strong> The 24 solar terms provide precise timing for planting, harvesting, and other farming activities.</li>
              <li><strong>Cultural Identity:</strong> The calendar represents thousands of years of Chinese civilization and maintains cultural continuity across generations.</li>
              <li><strong>Astrological System:</strong> Chinese astrology, fortune-telling, and feng shui are based on the lunar calendar and its associated systems.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Despite the widespread adoption of the Gregorian calendar for official and business purposes, the lunar calendar remains deeply embedded in Chinese culture and daily life, especially for family celebrations and traditional observances.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How the Lunar Calendar Works</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Chinese lunar calendar is a complex system that balances lunar months with solar years:
            </p>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
                <h4 className="font-bold text-blue-900 text-lg mb-3">🌙 Lunar Months</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Each month begins with a new moon and lasts approximately 29.5 days. Months alternate between 29 and 30 days (called "small months" and "large months"). A standard lunar year has 12 months, totaling about 354-355 days.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Problem:</strong> This is 11 days shorter than a solar year (365 days), which would cause the calendar to drift out of sync with seasons.
                </p>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-5">
                <h4 className="font-bold text-green-900 text-lg mb-3">🔄 Leap Months</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Solution:</strong> A 13th month (leap month, 闰月) is added approximately every 2-3 years (7 times in 19 years) to keep the calendar aligned with solar seasons.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  The leap month is inserted when a lunar month contains no major solar term (中气). It takes the same number as the previous month but is marked as "leap."
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Example:</strong> If there's a leap month after the 4th month, it's called "Leap 4th Month" (闰四月).
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5">
                <h4 className="font-bold text-yellow-900 text-lg mb-3">☀️ Solar Terms</h4>
                <p className="text-sm text-gray-700 mb-3">
                  The 24 solar terms (二十四节气) divide the solar year into 24 periods of about 15 days each, based on the sun's position along the ecliptic. These terms mark seasonal changes and guide agricultural activities.
                </p>
                <p className="text-sm text-gray-700">
                  Solar terms are determined by the sun's longitude and occur on fixed dates in the Gregorian calendar (with minor variations). They include well-known terms like Spring Equinox (春分), Summer Solstice (夏至), Autumn Equinox (秋分), and Winter Solstice (冬至).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Gan-Zhi (Stem-Branch) System</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Gan-Zhi system (干支, gānzhī) is an ancient Chinese method for recording time using combinations of Heavenly Stems and Earthly Branches:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                <h4 className="font-semibold text-purple-900 mb-3">10 Heavenly Stems (天干)</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>1. 甲 (jiǎ) - Yang Wood</p>
                  <p>2. 乙 (yǐ) - Yin Wood</p>
                  <p>3. 丙 (bǐng) - Yang Fire</p>
                  <p>4. 丁 (dīng) - Yin Fire</p>
                  <p>5. 戊 (wù) - Yang Earth</p>
                  <p>6. 己 (jǐ) - Yin Earth</p>
                  <p>7. 庚 (gēng) - Yang Metal</p>
                  <p>8. 辛 (xīn) - Yin Metal</p>
                  <p>9. 壬 (rén) - Yang Water</p>
                  <p>10. 癸 (guǐ) - Yin Water</p>
                </div>
              </div>
              
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-5">
                <h4 className="font-semibold text-pink-900 mb-3">12 Earthly Branches (地支)</h4>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>1. 子 (zǐ) - Rat</p>
                  <p>2. 丑 (chǒu) - Ox</p>
                  <p>3. 寅 (yín) - Tiger</p>
                  <p>4. 卯 (mǎo) - Rabbit</p>
                  <p>5. 辰 (chén) - Dragon</p>
                  <p>6. 巳 (sì) - Snake</p>
                  <p>7. 午 (wǔ) - Horse</p>
                  <p>8. 未 (wèi) - Sheep</p>
                  <p>9. 申 (shēn) - Monkey</p>
                  <p>10. 酉 (yǒu) - Rooster</p>
                  <p>11. 戌 (xū) - Dog</p>
                  <p>12. 亥 (hài) - Pig</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-3">The 60-Year Cycle</h4>
              <p className="text-sm text-gray-700 mb-3">
                One stem and one branch combine to form a pair (e.g., 甲子 jiǎzǐ, 乙丑 yǐchǒu). Since there are 10 stems and 12 branches, the system creates 60 unique combinations before repeating. This 60-unit cycle (六十甲子) is used for:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li><strong>Years:</strong> Each year in the 60-year cycle has a unique Gan-Zhi name</li>
                <li><strong>Months:</strong> Each lunar month has its Gan-Zhi designation</li>
                <li><strong>Days:</strong> Days cycle through the 60 combinations continuously</li>
                <li><strong>Hours:</strong> Each two-hour period has a branch designation</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                <strong>Example:</strong> 2024 is 甲辰 (jiǎchén) year - the Year of the Wood Dragon. The next 甲辰 year will be in 2084.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Traditional Chinese Festivals</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              All major Chinese festivals follow the lunar calendar. Here are the most important ones:
            </p>
            
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-5">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <span>🧧</span>
                  Spring Festival (春节) - Lunar New Year
                </h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> 1st day of 1st lunar month</p>
                <p className="text-sm text-gray-700">
                  The most important Chinese festival, marking the beginning of the lunar new year. Celebrated with family reunions, feasts, fireworks, red envelopes (红包), and various traditional customs. The celebration lasts 15 days, ending with the Lantern Festival.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-5">
                <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <span>🏮</span>
                  Lantern Festival (元宵节)
                </h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> 15th day of 1st lunar month</p>
                <p className="text-sm text-gray-700">
                  Marks the end of Spring Festival celebrations. People hang colorful lanterns, solve lantern riddles, eat tangyuan (sweet rice balls), and watch lion dances. The first full moon of the lunar year.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-5">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <span>🐉</span>
                  Dragon Boat Festival (端午节)
                </h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> 5th day of 5th lunar month</p>
                <p className="text-sm text-gray-700">
                  Commemorates the ancient poet Qu Yuan. Celebrated with dragon boat races, eating zongzi (sticky rice dumplings wrapped in bamboo leaves), and hanging mugwort and calamus plants.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <span>💫</span>
                  Qixi Festival (七夕节) - Chinese Valentine's Day
                </h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> 7th day of 7th lunar month</p>
                <p className="text-sm text-gray-700">
                  Based on the legend of the Cowherd and Weaver Girl. Considered the Chinese Valentine's Day, celebrating romantic love.
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-5">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <span>🥮</span>
                  Mid-Autumn Festival (中秋节)
                </h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> 15th day of 8th lunar month</p>
                <p className="text-sm text-gray-700">
                  Celebrates the autumn harvest and family reunion. People eat mooncakes, admire the full moon, and share time with family. The moon is believed to be brightest and roundest on this night.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-5">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <span>🏔️</span>
                  Double Ninth Festival (重阳节)
                </h4>
                <p className="text-sm text-gray-700 mb-2"><strong>Date:</strong> 9th day of 9th lunar month</p>
                <p className="text-sm text-gray-700">
                  A day to honor elderly people and ancestors. Traditional activities include climbing mountains, drinking chrysanthemum wine, and wearing dogwood.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Using the Lunar Calendar Today</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Despite modernization and the official use of the Gregorian calendar, the lunar calendar remains relevant in contemporary life:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg">•</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Festival Celebrations</h4>
                  <p className="text-sm text-gray-700">All traditional festivals follow lunar dates. Knowing the lunar calendar helps you plan for these important cultural celebrations and family gatherings.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg">•</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Birthday Celebrations</h4>
                  <p className="text-sm text-gray-700">Many people, especially elders, celebrate birthdays according to lunar dates. Converting between calendars helps you remember and celebrate these important occasions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg">•</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Auspicious Dates</h4>
                  <p className="text-sm text-gray-700">Many people consult the lunar calendar to choose auspicious dates (吉日) for weddings, business openings, moving house, and other important life events.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg">•</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Cultural Understanding</h4>
                  <p className="text-sm text-gray-700">Understanding the lunar calendar deepens appreciation of Chinese culture, literature, and historical records. Many historical events and documents use lunar dates.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg">•</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Agricultural Practices</h4>
                  <p className="text-sm text-gray-700">Some farmers and gardeners still follow the 24 solar terms for planting and harvesting, as these terms accurately reflect seasonal changes.</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mt-6">
              Use our Lunar Calendar Converter to easily convert between solar and lunar dates, discover traditional festivals, identify solar terms, and explore the rich cultural heritage of the Chinese calendar system!
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/chinese-zodiac-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🐉</div>
            <h3 className="font-semibold text-gray-900">Chinese Zodiac</h3>
            <p className="text-sm text-gray-600 mt-1">Find your zodiac animal</p>
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
          
          <a 
            href="/zodiac-sign-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">♈</div>
            <h3 className="font-semibold text-gray-900">Zodiac Sign</h3>
            <p className="text-sm text-gray-600 mt-1">Find your astrological sign</p>
          </a>
        </div>
      </section>
    </div>
  );
}

