import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ChineseZodiacCalculator from '@/components/Calculator/ChineseZodiacCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Chinese Zodiac Calculator - Find Your Zodiac Sign & Personality | AICalculator',
  description: 'Free Chinese Zodiac calculator to discover your zodiac animal sign based on birth year. Learn about personality traits, lucky elements, compatibility, and Ben Ming Year (本命年).',
  keywords: [
    'chinese zodiac calculator',
    'zodiac sign calculator',
    'chinese astrology calculator',
    'birth year zodiac',
    'chinese horoscope',
    'zodiac animal calculator',
    'sheng xiao calculator',
    'ben ming year calculator',
    'chinese zodiac compatibility',
    'zodiac personality traits',
    'lucky elements zodiac',
    'chinese new year zodiac',
    'year of the rat',
    'year of the ox',
    'year of the tiger',
    'year of the rabbit',
    'year of the dragon',
    'year of the snake',
    'year of the horse',
    'year of the sheep',
    'year of the monkey',
    'year of the rooster',
    'year of the dog',
    'year of the pig',
    '12 zodiac animals',
    'chinese zodiac signs',
    'zodiac compatibility chart'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Chinese Zodiac Calculator - Discover Your Zodiac Animal Sign',
    description: 'Find your Chinese Zodiac sign based on birth year. Learn about personality traits, lucky elements, compatibility, and cultural significance.',
    type: 'website',
    url: getUrl('/chinese-zodiac-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('chinese-zodiac'),
      width: 1200,
      height: 630,
      alt: 'Chinese Zodiac Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinese Zodiac Calculator - Find Your Zodiac Sign',
    description: 'Discover your Chinese Zodiac animal sign and personality traits based on your birth year.',
    images: [getOgImage('chinese-zodiac')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/chinese-zodiac-calculator'),
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

export default function ChineseZodiacCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/chinese-zodiac-calculator'),
        name: 'Chinese Zodiac Calculator',
        url: getUrl('/chinese-zodiac-calculator'),
        description: 'Calculate your Chinese Zodiac sign based on birth year and discover personality traits, lucky elements, and compatibility.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate Chinese Zodiac sign from birth year',
          'View detailed personality traits',
          'Discover lucky numbers, colors, and flowers',
          'Check zodiac compatibility',
          'Ben Ming Year (本命年) calculator',
          'Learn about 12 zodiac animals',
          'Cultural and historical information',
          'Share and save results'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/chinese-zodiac-calculator'),
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
            name: 'Chinese Zodiac Calculator',
            item: getUrl('/chinese-zodiac-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/chinese-zodiac-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I calculate my Chinese Zodiac sign?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your Chinese Zodiac sign is determined by your birth year in the Chinese lunar calendar. The zodiac follows a 12-year cycle, with each year represented by an animal: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Sheep, Monkey, Rooster, Dog, and Pig. Simply enter your birth year, and the calculator will identify your zodiac animal. Note that if you were born in January or early February, you may need to check the exact Chinese New Year date for your birth year, as the lunar calendar differs from the Gregorian calendar.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is Ben Ming Year (本命年) and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ben Ming Year (本命年), literally "original life year," occurs every 12 years when your zodiac animal returns. In Chinese culture, it\'s considered both significant and potentially challenging. Traditionally, people wear red clothing, accessories, or underwear during their Ben Ming Year to ward off bad luck and attract good fortune. Red is believed to have protective powers. For example, if you were born in 1990 (Year of the Horse), your Ben Ming Years are 2002, 2014, 2026, and so on. Many people take extra precautions and seek blessings during these years.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the personality traits of each Chinese Zodiac sign?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Each zodiac animal represents distinct personality characteristics. Rats are intelligent and resourceful; Oxen are diligent and dependable; Tigers are brave and confident; Rabbits are gentle and kind; Dragons are ambitious and charismatic; Snakes are wise and intuitive; Horses are energetic and freedom-loving; Sheep are creative and compassionate; Monkeys are clever and mischievous; Roosters are observant and hardworking; Dogs are loyal and honest; Pigs are generous and optimistic. These traits are believed to influence a person\'s character, career choices, and relationships throughout their life.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Chinese Zodiac compatibility work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Chinese Zodiac compatibility is based on the relationships between the 12 animals. Some signs are naturally compatible due to complementary traits, while others may clash. The most compatible pairs often form triangles: Rat-Dragon-Monkey, Ox-Snake-Rooster, Tiger-Horse-Dog, and Rabbit-Sheep-Pig. Signs directly opposite in the cycle (6 years apart) may face challenges, such as Rat-Horse or Dragon-Dog. However, compatibility also depends on other factors like birth elements (Wood, Fire, Earth, Metal, Water) and individual personalities. Many people consult zodiac compatibility for relationships, business partnerships, and friendships.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are lucky elements in Chinese Zodiac?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Each Chinese Zodiac sign has associated lucky elements including numbers, colors, flowers, and directions. For example, Rats have lucky numbers 2 and 3, lucky colors blue and gold, and lucky flowers lily and African violet. These elements are believed to bring good fortune when incorporated into daily life. People often wear lucky colors, use lucky numbers for important dates or decisions, and keep lucky flowers at home or work. The five elements (Wood, Fire, Earth, Metal, Water) also play a role, with each zodiac sign having a primary element that influences personality and fortune. Understanding and using these lucky elements is a common practice in Chinese culture.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Chinese Zodiac the same as Western astrology?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, Chinese Zodiac and Western astrology are different systems. Chinese Zodiac is based on a 12-year cycle with animal signs determined by birth year, rooted in the lunar calendar and Chinese philosophy. Western astrology uses a 12-month cycle with zodiac signs (Aries, Taurus, etc.) based on birth date and the position of celestial bodies. Chinese Zodiac emphasizes personality traits, compatibility, and fortune based on birth year, while Western astrology focuses on planetary influences and birth charts. Both systems have thousands of years of history and cultural significance in their respective traditions. Many people find value in exploring both systems for self-understanding.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/chinese-zodiac-calculator'),
        name: 'How to Use the Chinese Zodiac Calculator',
        description: 'Learn how to calculate your Chinese Zodiac sign and discover your personality traits, lucky elements, and compatibility.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Chinese Zodiac Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Birth Year',
            text: 'Input your birth year in the calculator. The year should be between 1900 and 2100. If you were born in January or early February, verify the Chinese New Year date for your birth year.',
            url: getStepUrl('/chinese-zodiac-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Click Calculate',
            text: 'Click the "Find My Zodiac Sign" button to discover your Chinese Zodiac animal sign based on the 12-year cycle.',
            url: getStepUrl('/chinese-zodiac-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'View Your Zodiac Sign',
            text: 'See your zodiac animal (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Sheep, Monkey, Rooster, Dog, or Pig) displayed with its emoji and element.',
            url: getStepUrl('/chinese-zodiac-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Explore Personality Traits',
            text: 'Read detailed information about your zodiac sign\'s personality characteristics, including strengths and weaknesses that may influence your life.',
            url: getStepUrl('/chinese-zodiac-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Discover Lucky Elements',
            text: 'Learn about your lucky numbers, colors, and flowers. These elements are believed to bring good fortune and can be incorporated into your daily life.',
            url: getStepUrl('/chinese-zodiac-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Check Compatibility',
            text: 'View which zodiac signs are most compatible with yours for relationships and friendships, and which signs to approach with caution.',
            url: getStepUrl('/chinese-zodiac-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Find Ben Ming Year',
            text: 'Discover if the current year is your Ben Ming Year (本命年) and when your next one will occur. Learn about the cultural significance and traditions.',
            url: getStepUrl('/chinese-zodiac-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Save or Share Results',
            text: 'Save your zodiac results as an image, print them, or share them with friends and family on social media.',
            url: getStepUrl('/chinese-zodiac-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/chinese-zodiac-calculator'),
        headline: 'Chinese Zodiac Calculator - Discover Your Zodiac Animal Sign and Personality',
        description: 'Complete guide to calculating your Chinese Zodiac sign, understanding personality traits, lucky elements, and zodiac compatibility.',
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
        image: getOgImage('chinese-zodiac'),
        articleBody: 'The Chinese Zodiac, also known as Sheng Xiao (生肖), is a 12-year cycle where each year is represented by an animal and its attributes. This ancient system has been used for over 2,000 years to understand personality traits, predict fortune, and determine compatibility in relationships.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Chinese Zodiac Calculator - Find Your Zodiac Sign and Personality Traits</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Chinese Zodiac Calculator"
        calculatorUrl="/chinese-zodiac-calculator"
      />

      <ChineseZodiacCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the Chinese Zodiac</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is the Chinese Zodiac?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Chinese Zodiac, known as <strong>Sheng Xiao (生肖)</strong> in Mandarin, is an ancient classification system that assigns an animal and its attributes to each year in a repeating 12-year cycle. Unlike Western astrology which is based on months, the Chinese Zodiac is determined by the year of birth according to the Chinese lunar calendar.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The 12 zodiac animals in order are: <strong>Rat (鼠), Ox (牛), Tiger (虎), Rabbit (兔), Dragon (龙), Snake (蛇), Horse (马), Sheep (羊), Monkey (猴), Rooster (鸡), Dog (狗), and Pig (猪)</strong>. Each animal represents different personality characteristics and is associated with specific elements, lucky numbers, colors, and compatibility patterns.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Chinese Zodiac has been an integral part of Chinese culture for over 2,000 years, influencing everything from personality analysis and relationship compatibility to business decisions and life planning. It remains widely popular not only in China but throughout East Asia and among Chinese communities worldwide.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Origin Legend</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              According to Chinese mythology, the Jade Emperor decided to select 12 animals to serve as palace guards. He organized a race across a river, and the order in which the animals finished determined their position in the zodiac cycle. The clever Rat hitched a ride on the Ox's back and jumped ahead at the last moment to claim first place. The Ox came second, followed by the Tiger, Rabbit, Dragon, Snake, Horse, Sheep, Monkey, Rooster, Dog, and finally the Pig.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each animal's characteristics in the race are said to reflect their zodiac personality traits. For example, the Rat's cunning, the Ox's diligence, the Tiger's bravery, and the Dragon's confidence all stem from this legendary competition. This story has been passed down through generations and continues to be a beloved part of Chinese cultural heritage.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Five Elements System</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Chinese Zodiac is closely connected to the <strong>Five Elements theory (Wu Xing, 五行)</strong>: Wood (木), Fire (火), Earth (土), Metal (金), and Water (水). Each zodiac year is not only associated with an animal but also with one of these elements, creating a 60-year cycle (12 animals × 5 elements = 60 combinations).
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The element adds another layer of meaning to your zodiac sign. For example, a Fire Dragon (born in 1976 or 2036) has different characteristics than a Water Dragon (born in 1952 or 2012). Fire Dragons are passionate and dynamic, while Water Dragons are more flexible and intuitive. Understanding both your animal sign and element provides deeper insight into your personality and destiny.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong>Element Cycle:</strong> Wood (2024, 2025) → Fire (2026, 2027) → Earth (2028, 2029) → Metal (2030, 2031) → Water (2032, 2033) → Wood (2034, 2035)...
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Personality Traits and Characteristics</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each Chinese Zodiac sign is believed to influence a person's personality, behavior, and life path. These characteristics are not deterministic but rather provide insights into natural tendencies and potential strengths:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐀 Rat (1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020)</h4>
                <p className="text-sm text-gray-700">Quick-witted, resourceful, versatile, and kind. Rats are natural leaders with strong intuition and excellent problem-solving abilities.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐂 Ox (1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021)</h4>
                <p className="text-sm text-gray-700">Diligent, dependable, strong, and determined. Oxen are hardworking individuals who value tradition and stability.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐅 Tiger (1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022)</h4>
                <p className="text-sm text-gray-700">Brave, confident, competitive, and charismatic. Tigers are natural leaders who love adventure and challenges.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐇 Rabbit (1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023)</h4>
                <p className="text-sm text-gray-700">Quiet, elegant, kind, and responsible. Rabbits are gentle souls who value peace and harmony.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐉 Dragon (1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024)</h4>
                <p className="text-sm text-gray-700">Confident, intelligent, enthusiastic, and ambitious. Dragons are natural leaders with strong charisma.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐍 Snake (1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025)</h4>
                <p className="text-sm text-gray-700">Enigmatic, intelligent, wise, and intuitive. Snakes are deep thinkers with excellent judgment.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐴 Horse (1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026)</h4>
                <p className="text-sm text-gray-700">Animated, active, energetic, and freedom-loving. Horses are independent spirits who love travel.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐑 Sheep (1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027)</h4>
                <p className="text-sm text-gray-700">Calm, gentle, sympathetic, and creative. Sheep are kind-hearted individuals who value art and beauty.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐵 Monkey (1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028)</h4>
                <p className="text-sm text-gray-700">Sharp, smart, curious, and mischievous. Monkeys are clever problem-solvers with great wit.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐓 Rooster (1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029)</h4>
                <p className="text-sm text-gray-700">Observant, hardworking, courageous, and talented. Roosters are confident and always punctual.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐕 Dog (1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030)</h4>
                <p className="text-sm text-gray-700">Loyal, honest, amiable, and kind. Dogs are faithful companions who value justice and fairness.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🐖 Pig (1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031)</h4>
                <p className="text-sm text-gray-700">Compassionate, generous, diligent, and optimistic. Pigs are kind-hearted and enjoy life.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zodiac Compatibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chinese Zodiac compatibility is an important consideration in relationships, friendships, and even business partnerships. The compatibility between signs is based on the natural relationships between the animals and their elemental properties.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Compatible Triangles:</strong> The zodiac signs form four groups of three compatible signs, known as "San He" (三合):
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Rat, Dragon, Monkey:</strong> Ambitious, intelligent, and success-oriented</li>
              <li><strong>Ox, Snake, Rooster:</strong> Hardworking, determined, and goal-focused</li>
              <li><strong>Tiger, Horse, Dog:</strong> Idealistic, humanitarian, and independent</li>
              <li><strong>Rabbit, Sheep, Pig:</strong> Compassionate, artistic, and peace-loving</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Opposing Signs:</strong> Signs that are six years apart in the cycle may face challenges due to opposing energies: Rat-Horse, Ox-Sheep, Tiger-Monkey, Rabbit-Rooster, Dragon-Dog, Snake-Pig. However, these relationships can also bring balance and growth if both parties are willing to understand and appreciate their differences.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> While zodiac compatibility provides general guidance, successful relationships depend on many factors including communication, mutual respect, shared values, and individual effort. Use compatibility as a tool for understanding, not as a rigid rule.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ben Ming Year (本命年)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Ben Ming Year</strong>, literally translated as "original life year," is the year of your zodiac animal that occurs every 12 years. In Chinese culture, this year is considered both significant and potentially challenging. It's believed that during your Ben Ming Year, you may face obstacles, changes, or increased scrutiny from Tai Sui (太岁), the God of Age.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Traditional Practices:</strong> To ward off bad luck and attract good fortune during Ben Ming Year, people follow several customs:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Wear Red:</strong> Red underwear, socks, belts, or accessories are worn throughout the year as red is believed to have protective powers</li>
              <li><strong>Visit Temples:</strong> Many people visit temples to pray and receive blessings from monks or priests</li>
              <li><strong>Be Cautious:</strong> Avoid major life changes like starting a business, getting married, or making large investments</li>
              <li><strong>Seek Guidance:</strong> Consult fortune tellers or feng shui masters for personalized advice</li>
              <li><strong>Give to Charity:</strong> Performing good deeds and helping others is believed to accumulate positive karma</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              While some view Ben Ming Year with trepidation, others see it as an opportunity for transformation and growth. Modern interpretations suggest using this year for self-reflection, setting new goals, and making positive changes in your life. Whether you follow traditional customs or not, being aware of your Ben Ming Year can help you approach the year with mindfulness and intention.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Lucky Elements and Their Significance</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each Chinese Zodiac sign has associated lucky elements that are believed to enhance fortune and bring positive energy. These include lucky numbers, colors, flowers, and directions. Understanding and incorporating these elements into your life is a common practice in Chinese culture.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Lucky Numbers</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Numbers play a significant role in Chinese culture due to their phonetic similarities to words with positive or negative meanings. Each zodiac sign has specific lucky numbers that are believed to bring good fortune. People often use these numbers when choosing phone numbers, addresses, license plates, or important dates for events like weddings or business openings.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Lucky Colors</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Colors are associated with the Five Elements and carry specific energies. Wearing your lucky colors in clothing, accessories, or home decor is thought to attract positive chi (气) and enhance your fortune. For example, if your lucky colors are blue and gold, you might wear blue clothing to important meetings or decorate your workspace with gold accents.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Lucky Flowers</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each zodiac sign has lucky flowers that symbolize specific virtues and bring positive energy. Keeping these flowers at home or in the office is believed to enhance fortune and create a harmonious environment. Fresh flowers are preferred, but high-quality artificial flowers or images can also be used.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Lucky Directions</h4>
            <p className="text-gray-700 leading-relaxed">
              Feng Shui principles assign lucky directions to each zodiac sign. Facing your lucky direction during important activities like working, sleeping, or conducting business meetings is believed to enhance success and well-being. Some people arrange their desks, beds, or seating positions to align with their lucky directions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Chinese New Year and the Zodiac</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Chinese Zodiac is closely tied to the <strong>Chinese New Year</strong> (Spring Festival, 春节), which marks the beginning of a new zodiac year. Unlike the Gregorian calendar which starts on January 1st, the Chinese New Year falls between January 21st and February 20th, depending on the lunar calendar.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important Note for January/February Birthdays:</strong> If you were born in January or early February, you need to check the exact date of Chinese New Year for your birth year to determine your correct zodiac sign. For example, if you were born on February 10, 2000, you might be a Rabbit (1999) rather than a Dragon (2000), depending on when Chinese New Year fell that year.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chinese New Year is the most important traditional festival in Chinese culture, celebrated with family reunions, feasts, fireworks, red decorations, and giving red envelopes (红包) containing money. Each zodiac year brings different energies and predictions, and people often consult fortune tellers or read zodiac forecasts to prepare for the year ahead.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong>Upcoming Chinese New Years:</strong> 2024 - Year of the Dragon (Feb 10) | 2025 - Year of the Snake (Jan 29) | 2026 - Year of the Horse (Feb 17) | 2027 - Year of the Sheep (Feb 6)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Practical Applications</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              While the Chinese Zodiac has ancient roots in astrology and philosophy, many people today use it as a tool for self-understanding and decision-making:
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Development</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding your zodiac sign's strengths and weaknesses can guide personal growth. For example, if you're a Rat known for being resourceful but sometimes timid, you might work on building confidence while leveraging your problem-solving abilities. Zodiac insights can complement other self-development tools like personality tests and coaching.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Relationships</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Many people consult zodiac compatibility when entering new relationships or trying to understand existing ones. While not deterministic, compatibility insights can highlight potential areas of harmony or conflict, helping couples communicate better and appreciate their differences. Some dating apps in Asia even include zodiac information in user profiles.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Career Planning</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Each zodiac sign has natural talents and preferred work styles. Dragons might thrive in leadership roles, while Rabbits excel in diplomatic positions. Understanding these tendencies can help with career choices, though individual skills, education, and experience remain the primary factors for success.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Parenting</h4>
            <p className="text-gray-700 leading-relaxed">
              Some parents use zodiac insights to better understand their children's personalities and needs. A Tiger child might need more adventure and independence, while a Rabbit child might require more reassurance and stability. These insights can complement other parenting approaches and child development knowledge.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cultural Significance and Modern Relevance</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Chinese Zodiac remains deeply embedded in Chinese culture and has gained popularity worldwide. Beyond its traditional uses, it has become a cultural symbol and conversation starter. Many people enjoy learning about their zodiac sign even if they don't follow all traditional practices.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In modern times, the zodiac is celebrated through art, literature, fashion, and entertainment. Each Chinese New Year, the zodiac animal becomes a popular theme for decorations, gifts, stamps, and collectibles. Major brands create special zodiac-themed products, and cultural festivals worldwide celebrate the incoming zodiac year.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you view the Chinese Zodiac as a spiritual guide, cultural tradition, or entertaining personality system, it offers a unique lens for self-reflection and understanding others. Its enduring popularity across millennia speaks to humanity's timeless desire to find meaning, connection, and guidance in the patterns of life.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Use our Chinese Zodiac Calculator to discover your sign, explore your personality traits, learn about lucky elements, and check compatibility with others. Share your results with friends and family to spark interesting conversations about this fascinating aspect of Chinese culture!
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/zodiac-sign-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">♈</div>
            <h3 className="font-semibold text-gray-900">Zodiac Sign Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your Western zodiac sign</p>
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
            href="/date-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-gray-900">Date Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate dates and durations</p>
          </a>
          
          <a 
            href="/biorhythm-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Biorhythm Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Track your biological rhythms</p>
          </a>
        </div>
      </section>
    </div>
  );
}

