import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ZodiacSignCalculator from '@/components/Calculator/ZodiacSignCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Zodiac Sign Calculator - Find Your Astrological Sign & Traits | AICalculator',
  description: 'Free zodiac sign calculator to discover your astrological sign based on birth date. Learn about personality traits, compatibility, lucky elements, and horoscope insights for all 12 zodiac signs.',
  keywords: [
    'zodiac sign calculator',
    'astrology calculator',
    'horoscope calculator',
    'birth date zodiac',
    'astrological sign calculator',
    'sun sign calculator',
    'zodiac personality',
    'star sign calculator',
    'zodiac compatibility',
    'aries calculator',
    'taurus calculator',
    'gemini calculator',
    'cancer calculator',
    'leo calculator',
    'virgo calculator',
    'libra calculator',
    'scorpio calculator',
    'sagittarius calculator',
    'capricorn calculator',
    'aquarius calculator',
    'pisces calculator',
    '12 zodiac signs',
    'western astrology',
    'zodiac traits',
    'horoscope signs'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Zodiac Sign Calculator - Discover Your Astrological Sign',
    description: 'Find your zodiac sign based on birth date. Learn about personality traits, compatibility, and horoscope insights.',
    type: 'website',
    url: getUrl('/zodiac-sign-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('zodiac-sign'),
      width: 1200,
      height: 630,
      alt: 'Zodiac Sign Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zodiac Sign Calculator - Find Your Astrological Sign',
    description: 'Discover your zodiac sign and personality traits based on your birth date.',
    images: [getOgImage('zodiac-sign')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/zodiac-sign-calculator'),
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

export default function ZodiacSignCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/zodiac-sign-calculator'),
        name: 'Zodiac Sign Calculator',
        url: getUrl('/zodiac-sign-calculator'),
        description: 'Calculate your zodiac sign based on birth date and discover personality traits, compatibility, and lucky elements.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate zodiac sign from birth date',
          'View detailed personality traits',
          'Discover lucky numbers, colors, and stones',
          'Check zodiac compatibility',
          'Learn about ruling planets and elements',
          'Explore all 12 zodiac signs',
          'Astrological insights and guidance',
          'Share and save results'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/zodiac-sign-calculator'),
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
            name: 'Zodiac Sign Calculator',
            item: getUrl('/zodiac-sign-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/zodiac-sign-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I find my zodiac sign?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your zodiac sign (also called sun sign or star sign) is determined by your birth date - specifically, the position of the sun at the time of your birth. Simply enter your birth month and day into the calculator to discover your sign. The 12 zodiac signs are: Aries (March 21-April 19), Taurus (April 20-May 20), Gemini (May 21-June 20), Cancer (June 21-July 22), Leo (July 23-August 22), Virgo (August 23-September 22), Libra (September 23-October 22), Scorpio (October 23-November 21), Sagittarius (November 22-December 21), Capricorn (December 22-January 19), Aquarius (January 20-February 18), and Pisces (February 19-March 20). Note that if you were born on a cusp date (the transition day between two signs), you may want to check the exact time and year, as the sun changes signs at different times each year.'
            }
          },
          {
            '@type': 'Question',
            name: 'What do the zodiac elements mean?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The zodiac signs are divided into four elements: Fire, Earth, Air, and Water. Fire signs (Aries, Leo, Sagittarius) are passionate, dynamic, and temperamental - they get angry quickly but also forgive easily. Earth signs (Taurus, Virgo, Capricorn) are grounded, practical, and realistic - they value material security and are the most stable. Air signs (Gemini, Libra, Aquarius) are intellectual, communicative, and social - they love philosophical discussions and social gatherings. Water signs (Cancer, Scorpio, Pisces) are emotional, intuitive, and sensitive - they are deeply connected to their feelings and have strong empathy. Understanding your element helps explain your natural tendencies and how you interact with others.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are zodiac qualities (Cardinal, Fixed, Mutable)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Zodiac qualities (also called modalities) describe how signs express their energy. Cardinal signs (Aries, Cancer, Libra, Capricorn) are initiators and leaders who start new projects and seasons - they are action-oriented and love taking charge. Fixed signs (Taurus, Leo, Scorpio, Aquarius) are stabilizers who maintain and sustain - they are determined, loyal, and resistant to change. Mutable signs (Gemini, Virgo, Sagittarius, Pisces) are adapters who transition between seasons - they are flexible, versatile, and excellent at going with the flow. Your quality influences your approach to life: Cardinals start things, Fixed signs finish them, and Mutables adjust along the way. This system adds depth to understanding personality beyond just the element.'
            }
          },
          {
            '@type': 'Question',
            name: 'How accurate is zodiac compatibility?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Zodiac compatibility provides general insights based on elemental harmony and quality interactions. Signs of the same element (Fire with Fire, Earth with Earth, etc.) often understand each other naturally. Complementary elements also work well: Fire and Air fuel each other, while Earth and Water nourish each other. However, compatibility is just one factor in relationships. Real compatibility depends on many factors including individual birth charts (which include moon signs, rising signs, and planetary positions), personal values, communication styles, life experiences, and mutual effort. Use zodiac compatibility as a tool for understanding potential dynamics and differences, not as a definitive judgment. Many "incompatible" signs have successful relationships through understanding and compromise.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between sun sign, moon sign, and rising sign?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your sun sign (what most people call their "zodiac sign") represents your core identity, ego, and life purpose - it\'s determined by your birth date. Your moon sign represents your emotional nature, inner self, and instinctive reactions - it\'s determined by the moon\'s position at your exact birth time and location. Your rising sign (also called ascendant) represents how others perceive you, your outward personality, and your approach to new situations - it\'s determined by the zodiac sign rising on the eastern horizon at your birth moment. While this calculator shows your sun sign, a complete astrological profile requires your exact birth time and location to calculate moon and rising signs. Many people find their moon and rising signs explain aspects of their personality that their sun sign doesn\'t fully capture.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can my zodiac sign change?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, your zodiac sign (sun sign) never changes - it\'s permanently determined by your birth date. However, there are a few nuances to understand. First, if you were born on a "cusp" (the day when the sun transitions between signs), your exact sign depends on the precise time the sun changed signs that year, which varies. Second, while your sun sign stays the same, the planets continue moving through the zodiac throughout your life, creating different astrological influences. Third, some people confuse sun sign with "current sign" - astrologers look at where planets are now relative to your birth chart, but your natal sun sign remains constant. The only exception is the rare astronomical phenomenon called "precession," which has shifted zodiac dates slightly over millennia, but Western astrology uses the tropical zodiac which maintains traditional dates.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/zodiac-sign-calculator'),
        name: 'How to Use the Zodiac Sign Calculator',
        description: 'Learn how to calculate your zodiac sign and discover your personality traits, compatibility, and astrological insights.',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Zodiac Sign Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Your Birth Month',
            text: 'Choose your birth month from the dropdown menu. The calculator includes all 12 months from January to December.',
            url: getStepUrl('/zodiac-sign-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Your Birth Day',
            text: 'Input the day of the month you were born (1-31). Make sure to enter a valid day for your selected month.',
            url: getStepUrl('/zodiac-sign-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Click Calculate',
            text: 'Click the "Find My Zodiac Sign" button to discover your astrological sign based on your birth date.',
            url: getStepUrl('/zodiac-sign-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Your Zodiac Sign',
            text: 'See your zodiac sign displayed with its symbol, date range, element (Fire, Earth, Air, Water), quality (Cardinal, Fixed, Mutable), and ruling planet.',
            url: getStepUrl('/zodiac-sign-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Explore Personality Traits',
            text: 'Read detailed information about your zodiac sign\'s personality characteristics, including both strengths and weaknesses that may influence your behavior and relationships.',
            url: getStepUrl('/zodiac-sign-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Discover Lucky Elements',
            text: 'Learn about your lucky numbers, colors, and gemstone. These elements are believed to bring positive energy and good fortune.',
            url: getStepUrl('/zodiac-sign-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Check Compatibility',
            text: 'View which zodiac signs are most compatible with yours for relationships and friendships, and which signs may present challenges.',
            url: getStepUrl('/zodiac-sign-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Save or Share Results',
            text: 'Save your zodiac results as an image, print them, or share them with friends and family on social media.',
            url: getStepUrl('/zodiac-sign-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/zodiac-sign-calculator'),
        headline: 'Zodiac Sign Calculator - Discover Your Astrological Sign and Personality',
        description: 'Complete guide to calculating your zodiac sign, understanding personality traits, compatibility, and astrological elements.',
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
        image: getOgImage('zodiac-sign'),
        articleBody: 'The zodiac is a belt of the heavens divided into twelve equal divisions, each represented by a constellation and associated with specific personality traits, elements, and characteristics. Western astrology uses these twelve signs to provide insights into personality, relationships, and life paths.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Zodiac Sign Calculator - Find Your Astrological Sign and Personality Traits</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Zodiac Sign Calculator"
        calculatorUrl="/zodiac-sign-calculator"
      />

      <ZodiacSignCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Zodiac Signs and Astrology</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What Are Zodiac Signs?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The zodiac is a belt of the heavens divided into twelve equal divisions, each spanning 30 degrees of celestial longitude. These divisions are represented by constellations and form the basis of Western astrology. Your <strong>zodiac sign</strong> (also called sun sign or star sign) is determined by the position of the sun at the moment of your birth.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The twelve zodiac signs are: <strong>Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces</strong>. Each sign is associated with specific personality traits, elements, qualities, ruling planets, and symbolic meanings that have been studied and refined over thousands of years.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Western astrology, which originated in Mesopotamia and was developed by the ancient Greeks and Romans, uses the tropical zodiac system. This system is based on the seasons rather than the actual positions of constellations in the sky, which is why the dates remain consistent year after year despite astronomical precession.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Four Elements</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The zodiac signs are grouped into four elements, each representing a fundamental type of energy and approach to life. Understanding your element helps explain your natural temperament and how you interact with the world.
            </p>
            
            <div className="space-y-4 mt-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-semibold text-red-900 mb-2">🔥 Fire Signs: Aries, Leo, Sagittarius</h4>
                <p className="text-sm text-gray-700">
                  Fire signs are passionate, dynamic, and temperamental. They are driven by enthusiasm and inspiration, often acting on impulse and intuition. Fire signs are natural leaders who inspire others with their energy and confidence. They get angry quickly but also forgive easily. These signs need freedom and independence to thrive, and they excel in creative and entrepreneurial pursuits.
                </p>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h4 className="font-semibold text-green-900 mb-2">🌍 Earth Signs: Taurus, Virgo, Capricorn</h4>
                <p className="text-sm text-gray-700">
                  Earth signs are grounded, practical, and realistic. They value material security and tangible results, making them excellent at building lasting structures and achieving long-term goals. Earth signs are the most stable and reliable of the zodiac, preferring to work with what they can see, touch, and measure. They are patient, methodical, and excellent at managing resources and finances.
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💨 Air Signs: Gemini, Libra, Aquarius</h4>
                <p className="text-sm text-gray-700">
                  Air signs are intellectual, communicative, and social. They love philosophical discussions, social gatherings, and exchanging ideas. Air signs are the thinkers and communicators of the zodiac, valuing mental stimulation and social connection above all. They are objective, rational, and excellent at seeing multiple perspectives. These signs thrive in environments that allow for free expression and intellectual exploration.
                </p>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <h4 className="font-semibold text-purple-900 mb-2">💧 Water Signs: Cancer, Scorpio, Pisces</h4>
                <p className="text-sm text-gray-700">
                  Water signs are emotional, intuitive, and sensitive. They are deeply connected to their feelings and have strong empathy for others. Water signs navigate the world through emotion and intuition rather than logic, making them excellent at understanding unspoken feelings and hidden motivations. They are nurturing, compassionate, and often possess psychic or healing abilities. These signs need emotional security and deep connections to feel fulfilled.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Three Qualities (Modalities)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to elements, zodiac signs are divided into three qualities (also called modalities) that describe how they express their energy and approach change. Each quality contains four signs, one from each element.
            </p>
            
            <div className="space-y-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Cardinal Signs: Aries, Cancer, Libra, Capricorn</h4>
                <p className="text-sm text-gray-700">
                  Cardinal signs are the initiators and leaders of the zodiac. They mark the beginning of each season (Aries - Spring, Cancer - Summer, Libra - Fall, Capricorn - Winter) and are characterized by their ability to start new projects and take action. Cardinal signs are ambitious, enterprising, and love taking charge. They are excellent at identifying opportunities and getting things moving, though they may struggle with follow-through once the initial excitement wears off.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Fixed Signs: Taurus, Leo, Scorpio, Aquarius</h4>
                <p className="text-sm text-gray-700">
                  Fixed signs are the stabilizers and sustainers of the zodiac. They occur in the middle of each season and are characterized by their determination, loyalty, and resistance to change. Fixed signs are excellent at maintaining projects, building lasting structures, and seeing things through to completion. They are reliable, persistent, and have strong willpower. However, their steadfast nature can sometimes manifest as stubbornness or inflexibility.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Mutable Signs: Gemini, Virgo, Sagittarius, Pisces</h4>
                <p className="text-sm text-gray-700">
                  Mutable signs are the adapters and transformers of the zodiac. They occur at the end of each season, preparing for the transition to the next. Mutable signs are flexible, versatile, and excellent at going with the flow. They can see multiple perspectives and adapt to changing circumstances with ease. These signs are resourceful, diplomatic, and skilled at finding creative solutions. However, their adaptability can sometimes lead to indecisiveness or lack of direction.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Detailed Zodiac Sign Profiles</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Each zodiac sign has unique characteristics, strengths, and challenges. Here's a comprehensive overview of all twelve signs:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-5 border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♈</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Aries (March 21 - April 19)</h4>
                    <p className="text-sm text-gray-600">Fire • Cardinal • Mars</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  The first sign of the zodiac, Aries are natural-born leaders who love taking on challenges. Bold, ambitious, and confident, they are pioneers who aren't afraid to forge new paths. Aries are passionate and energetic, though they can be impulsive and impatient.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♉</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Taurus (April 20 - May 20)</h4>
                    <p className="text-sm text-gray-600">Earth • Fixed • Venus</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Taurus individuals are reliable, patient, and devoted. They value stability and appreciate the finer things in life. Grounded and practical, Taurus are excellent at building lasting security. They can be stubborn but are incredibly loyal and dependable.
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♊</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Gemini (May 21 - June 20)</h4>
                    <p className="text-sm text-gray-600">Air • Mutable • Mercury</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Gemini are curious, adaptable, and communicative social butterflies. They love learning and sharing information, making them excellent communicators. Witty and versatile, Gemini can adapt to any situation, though they may struggle with consistency.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♋</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Cancer (June 21 - July 22)</h4>
                    <p className="text-sm text-gray-600">Water • Cardinal • Moon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Cancer are intuitive, emotional, and deeply nurturing. They value home and family above all else. Protective and loyal, Cancer have strong emotional intelligence and empathy. They can be moody but are incredibly caring and supportive.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♌</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Leo (July 23 - August 22)</h4>
                    <p className="text-sm text-gray-600">Fire • Fixed • Sun</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Leo are confident, charismatic, and generous natural performers. They love being in the spotlight and inspire others with their enthusiasm. Warm-hearted and creative, Leo are natural leaders, though they can be prone to arrogance.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♍</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Virgo (August 23 - September 22)</h4>
                    <p className="text-sm text-gray-600">Earth • Mutable • Mercury</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Virgo are analytical, practical, and detail-oriented perfectionists. They excel at organization and problem-solving. Helpful and reliable, Virgo are always striving to improve themselves and their surroundings, though they can be overly critical.
                </p>
              </div>
              
              <div className="bg-pink-50 rounded-lg p-5 border border-pink-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♎</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Libra (September 23 - October 22)</h4>
                    <p className="text-sm text-gray-600">Air • Cardinal • Venus</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Libra are diplomatic, fair-minded, and social beings who seek balance and harmony. Charming and cooperative, they have a strong sense of justice. Libra excel at seeing all sides of an issue, though this can lead to indecisiveness.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♏</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Scorpio (October 23 - November 21)</h4>
                    <p className="text-sm text-gray-600">Water • Fixed • Pluto</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Scorpio are passionate, resourceful, and determined with intense emotional depth. They have strong willpower and aren't afraid of transformation. Loyal and brave, Scorpio are excellent at uncovering hidden truths, though they can be secretive.
                </p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♐</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Sagittarius (November 22 - December 21)</h4>
                    <p className="text-sm text-gray-600">Fire • Mutable • Jupiter</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Sagittarius are optimistic, adventurous, and philosophical free spirits. They love exploring new ideas and places, always seeking truth and meaning. Honest and enthusiastic, Sagittarius inspire others, though they can be tactless.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♑</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Capricorn (December 22 - January 19)</h4>
                    <p className="text-sm text-gray-600">Earth • Cardinal • Saturn</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Capricorn are ambitious, disciplined, and responsible achievers. They value tradition and are excellent at long-term planning. Patient and practical, Capricorn are natural managers who build lasting success, though they can be pessimistic.
                </p>
              </div>
              
              <div className="bg-cyan-50 rounded-lg p-5 border border-cyan-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♒</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Aquarius (January 20 - February 18)</h4>
                    <p className="text-sm text-gray-600">Air • Fixed • Uranus</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Aquarius are progressive, original, and independent visionaries. They think outside the box and value freedom and individuality. Humanitarian and intellectual, Aquarius work toward a better future, though they can be emotionally aloof.
                </p>
              </div>
              
              <div className="bg-teal-50 rounded-lg p-5 border border-teal-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">♓</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Pisces (February 19 - March 20)</h4>
                    <p className="text-sm text-gray-600">Water • Mutable • Neptune</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Pisces are compassionate, artistic, and intuitive dreamers with deep emotional sensitivity. They are empathetic and imaginative with a strong spiritual connection. Gentle and wise, Pisces are natural healers, though they may struggle with boundaries.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zodiac Compatibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Zodiac compatibility is based on the relationships between elements and qualities. Understanding these patterns can provide insights into relationship dynamics, though remember that successful relationships require effort regardless of astrological compatibility.
            </p>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Elemental Compatibility</h4>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Fire + Fire:</strong> Exciting and passionate, but may burn out quickly. Both partners are energetic and adventurous.</li>
              <li><strong>Fire + Air:</strong> Highly compatible. Air fuels Fire, creating dynamic and stimulating relationships.</li>
              <li><strong>Fire + Earth:</strong> Challenging. Fire's spontaneity clashes with Earth's need for stability.</li>
              <li><strong>Fire + Water:</strong> Difficult. Fire can evaporate Water, while Water can extinguish Fire.</li>
              <li><strong>Earth + Earth:</strong> Stable and secure, but may lack excitement. Both value practicality and security.</li>
              <li><strong>Earth + Air:</strong> Challenging. Earth finds Air too flighty, while Air finds Earth too rigid.</li>
              <li><strong>Earth + Water:</strong> Highly compatible. Water nourishes Earth, creating nurturing and supportive relationships.</li>
              <li><strong>Air + Air:</strong> Intellectually stimulating, but may lack emotional depth. Both love communication and ideas.</li>
              <li><strong>Air + Water:</strong> Difficult. Air's logic clashes with Water's emotions, though they can balance each other.</li>
              <li><strong>Water + Water:</strong> Deeply emotional and intuitive, but may become overwhelming. Both understand each other's feelings.</li>
            </ul>
            
            <h4 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Quality Compatibility</h4>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Cardinal + Cardinal:</strong> Both want to lead, which can create power struggles. Success requires compromise.</li>
              <li><strong>Cardinal + Fixed:</strong> Cardinal initiates, Fixed maintains. Can work well if roles are respected.</li>
              <li><strong>Cardinal + Mutable:</strong> Cardinal leads, Mutable adapts. Often a harmonious combination.</li>
              <li><strong>Fixed + Fixed:</strong> Both are stubborn, making compromise difficult. Requires patience and understanding.</li>
              <li><strong>Fixed + Mutable:</strong> Fixed provides stability, Mutable provides flexibility. Can balance each other well.</li>
              <li><strong>Mutable + Mutable:</strong> Both are adaptable, but may lack direction. Needs external structure for success.</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-sm text-gray-700">
                <strong>Remember:</strong> Astrological compatibility is just one factor in relationships. Communication, shared values, mutual respect, and personal growth are equally important. Many "incompatible" signs have successful relationships through understanding and effort, while "compatible" signs can fail without proper care.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Beyond the Sun Sign</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              While your sun sign (the zodiac sign calculated by this tool) is the most well-known aspect of astrology, a complete astrological profile includes many other factors:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🌙 Moon Sign</h4>
                <p className="text-sm text-gray-700">
                  Your moon sign represents your emotional nature, inner self, and instinctive reactions. It's determined by the moon's position at your exact birth time and location. The moon sign governs your subconscious, habits, and emotional needs. Many people find their moon sign explains their emotional responses better than their sun sign.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">⬆️ Rising Sign (Ascendant)</h4>
                <p className="text-sm text-gray-700">
                  Your rising sign represents how others perceive you, your outward personality, and your approach to new situations. It's determined by the zodiac sign rising on the eastern horizon at the moment of your birth. The rising sign influences your physical appearance, first impressions, and how you present yourself to the world.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🪐 Planetary Positions</h4>
                <p className="text-sm text-gray-700">
                  The positions of Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto at your birth all influence different aspects of your personality and life. Mercury governs communication, Venus rules love and values, Mars represents action and desire, and so on. A complete birth chart analyzes all these planetary positions and their relationships.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏠 Houses</h4>
                <p className="text-sm text-gray-700">
                  The astrological houses divide the sky into twelve sections, each governing different life areas: self, money, communication, home, creativity, health, partnerships, transformation, philosophy, career, friendships, and spirituality. The planets' positions in these houses show where their energies manifest in your life.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">📐 Aspects</h4>
                <p className="text-sm text-gray-700">
                  Aspects are the angles between planets in your birth chart. Conjunctions (0°), sextiles (60°), squares (90°), trines (120°), and oppositions (180°) create different types of energy interactions. Harmonious aspects indicate natural talents, while challenging aspects point to areas requiring growth and integration.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              To get a complete astrological profile including moon sign, rising sign, and planetary positions, you need your exact birth time and location. Many people find that understanding their full birth chart provides much deeper insights than sun sign alone.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Using Astrology for Personal Growth</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you view astrology as a spiritual practice, psychological tool, or entertaining personality system, it can offer valuable insights for self-understanding and personal development:
            </p>
            
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Self-Awareness:</strong> Understanding your zodiac traits can help you recognize your natural strengths and areas for growth.</li>
              <li><strong>Relationship Insights:</strong> Compatibility information can help you understand different communication styles and needs in relationships.</li>
              <li><strong>Career Guidance:</strong> Each sign has natural talents and preferred work environments that can inform career choices.</li>
              <li><strong>Timing Decisions:</strong> Many people use astrological transits to time important decisions and understand life cycles.</li>
              <li><strong>Emotional Understanding:</strong> Astrology can provide language for understanding complex emotions and behavioral patterns.</li>
              <li><strong>Compassion for Others:</strong> Learning about different zodiac signs can increase empathy and understanding of diverse personalities.</li>
            </ul>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              The key is to use astrology as a tool for reflection and growth rather than a rigid set of rules. Your zodiac sign describes tendencies and potentials, not limitations. Free will, personal choices, life experiences, and conscious effort all play crucial roles in shaping who you are and who you become.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Use our Zodiac Sign Calculator to discover your sun sign and explore the rich tradition of astrological wisdom. Whether you're a skeptic or a believer, understanding the zodiac can provide interesting perspectives on personality, relationships, and the human experience. Share your results with friends and family to spark meaningful conversations about personality and self-discovery!
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
            <h3 className="font-semibold text-gray-900">Chinese Zodiac Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your Chinese zodiac animal</p>
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

