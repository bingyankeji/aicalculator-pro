import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import NameNumerologyCalculator from '@/components/Calculator/NameNumerologyCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Name Numerology Calculator - Discover Your Name Numbers | AICalculator',
  description: 'Free name numerology calculator to find your Expression, Soul Urge, and Personality numbers. Discover the hidden meanings and energy in your name.',
  keywords: [
    'name numerology calculator',
    'numerology name calculator',
    'name number calculator',
    'expression number calculator',
    'soul urge number',
    'personality number',
    'pythagorean numerology',
    'name meaning numerology',
    'numerology calculator name',
    'destiny number calculator',
    'name energy calculator',
    'numerology name analysis',
    'name vibration calculator',
    'lucky name calculator',
    'name power calculator',
    'numerology by name',
    'name number meaning',
    'calculate name number',
    'name numerology reading',
    'full name numerology',
    'birth name numerology',
    'name destiny number',
    'name soul number',
    'numerology name meaning',
    'name calculator numerology'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Name Numerology Calculator - Discover Your Name Numbers',
    description: 'Calculate your Expression, Soul Urge, and Personality numbers from your name.',
    type: 'website',
    url: getUrl('/name-numerology-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('name-numerology'),
      width: 1200,
      height: 630,
      alt: 'Name Numerology Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Name Numerology Calculator - Discover Your Name Numbers',
    description: 'Find the hidden meanings in your name through numerology.',
    images: [getOgImage('name-numerology')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/name-numerology-calculator'),
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

export default function NameNumerologyCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/name-numerology-calculator'),
        name: 'Name Numerology Calculator',
        url: getUrl('/name-numerology-calculator'),
        description: 'Calculate your Expression Number, Soul Urge Number, and Personality Number from your name using Pythagorean numerology.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Expression Number calculation',
          'Soul Urge Number calculation',
          'Personality Number calculation',
          'Detailed number meanings',
          'Strengths and challenges',
          'Career path suggestions',
          'Lucky colors and numbers',
          'Pythagorean numerology system'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/name-numerology-calculator'),
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
            name: 'Name Numerology Calculator',
            item: getUrl('/name-numerology-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/name-numerology-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is name numerology?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Name numerology is the practice of assigning numerical values to letters in your name to reveal insights about your personality, destiny, and life path. The most common system is Pythagorean numerology, which assigns numbers 1-9 to letters A-Z. Your name produces three core numbers: Expression Number (from all letters), Soul Urge Number (from vowels), and Personality Number (from consonants). Each number carries specific vibrations and meanings that supposedly influence your character and life experiences.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do you calculate name numerology numbers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate name numerology numbers: 1) Assign each letter a number using the Pythagorean chart (A=1, B=2, C=3, etc.). 2) For Expression Number: Add all letters in your full name, then reduce to a single digit (keep master numbers 11, 22, 33). 3) For Soul Urge Number: Add only vowels (A, E, I, O, U), then reduce. 4) For Personality Number: Add only consonants, then reduce. Example: "JOHN" = J(1) + O(6) + H(8) + N(5) = 20 = 2+0 = 2. Master numbers 11, 22, and 33 are not reduced further as they have special significance.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Expression, Soul Urge, and Personality numbers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The three core name numbers reveal different aspects: Expression Number (all letters) represents your natural talents, abilities, and life purpose. It shows what you\'re meant to accomplish and how you express yourself in the world. Soul Urge Number (vowels only) reveals your inner desires, motivations, and what truly drives you. It represents your heart\'s deepest wishes and what brings you fulfillment. Personality Number (consonants only) shows how others perceive you and the image you project. It represents your outer personality and first impressions. Together, these three numbers create a complete numerological profile of your name\'s energy and influence.'
            }
          },
          {
            '@type': 'Question',
            name: 'Should I use my birth name or current name?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For the most accurate numerology reading, use your full birth name as it appears on your birth certificate. This is considered your "blueprint" - the name you were given at birth carries your original destiny and life path. However, if you legally changed your name or consistently use a different name, that name also carries energy and influence. Some numerologists calculate both: birth name for your inherent nature and destiny, and current name for your present circumstances and how you\'re currently expressing yourself. Nicknames can be calculated separately to see how they affect your daily interactions.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are master numbers in numerology?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Master numbers are 11, 22, and 33 - double-digit numbers that are not reduced to single digits in numerology. They carry powerful, intensified vibrations: Master Number 11 - The Intuitive/Illuminator. Highly intuitive, spiritual, and inspirational. Natural teachers and visionaries. Master Number 22 - The Master Builder. Practical idealists who can turn dreams into reality. Capable of achieving great things. Master Number 33 - The Master Teacher. Embodies unconditional love and spiritual teaching. Rare and powerful healing energy. Having a master number indicates higher spiritual potential and greater responsibility. However, master numbers also come with increased challenges and pressure. Not everyone with these numbers will fully express their master number potential - some may operate at the reduced single-digit level (11→2, 22→4, 33→6).'
            }
          },
          {
            '@type': 'Question',
            name: 'Is name numerology scientifically accurate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Name numerology is not scientifically proven or supported by empirical research. There is no scientific evidence that letters in names carry vibrational energy or that numerical patterns derived from names can predict personality traits or life outcomes. Numerology is considered a pseudoscience because it lacks a plausible mechanism, makes unfalsifiable claims, and fails controlled testing. However, numerology can still be valuable as: a tool for self-reflection and personal insight, a framework for understanding yourself better, entertainment and fun exploration, a way to think about your strengths and challenges. Many people find numerology readings personally meaningful due to the Barnum effect (general descriptions feel specific) and confirmation bias (remembering matches, forgetting mismatches). Use numerology as a reflective tool rather than definitive truth about yourself.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/name-numerology-calculator'),
        name: 'How to Use the Name Numerology Calculator',
        description: 'Learn how to calculate your name numerology numbers and understand their meanings.',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Name Numerology Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your First Name',
            text: 'Input your first name as it appears on your birth certificate for the most accurate reading.',
            url: getStepUrl('/name-numerology-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Add Middle Name (Optional)',
            text: 'If you have a middle name, include it for a complete numerology profile.',
            url: getStepUrl('/name-numerology-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Your Last Name',
            text: 'Input your last name to complete your full birth name.',
            url: getStepUrl('/name-numerology-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Numerology',
            text: 'Click the "Calculate Numerology" button to generate your name numbers.',
            url: getStepUrl('/name-numerology-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Your Core Numbers',
            text: 'See your Expression Number, Soul Urge Number, and Personality Number displayed prominently.',
            url: getStepUrl('/name-numerology-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Read Number Meanings',
            text: 'Explore detailed interpretations of each of your three core numbers.',
            url: getStepUrl('/name-numerology-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Discover Strengths and Challenges',
            text: 'Review your natural strengths and potential challenges based on your numbers.',
            url: getStepUrl('/name-numerology-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Explore Career Paths and Lucky Elements',
            text: 'Find ideal career suggestions, lucky colors, and lucky numbers aligned with your numerology.',
            url: getStepUrl('/name-numerology-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/name-numerology-calculator'),
        headline: 'Name Numerology Calculator - Discover the Power of Your Name',
        description: 'Complete guide to name numerology, including how to calculate and interpret Expression, Soul Urge, and Personality numbers.',
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
        image: getOgImage('name-numerology'),
        articleBody: 'Name numerology reveals the hidden energy and meaning in your name through numerical analysis. By converting letters to numbers, you can discover your Expression Number, Soul Urge Number, and Personality Number.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Name Numerology Calculator - Discover Your Name Numbers</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Name Numerology Calculator"
        calculatorUrl="/name-numerology-calculator"
      />

      <NameNumerologyCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Name Numerology</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is Name Numerology?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Name numerology</strong> is the practice of analyzing the numerical values of letters in your name to reveal insights about your personality, talents, and life path. Based on the ancient Pythagorean system, each letter corresponds to a number from 1 to 9, and these numbers carry specific vibrations and meanings.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your name is not random - it carries energy that influences your life. Whether chosen by your parents intuitively or deliberately, your birth name creates a vibrational blueprint that shapes your experiences and characteristics. Name numerology helps you understand this hidden influence.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The three core numbers derived from your name - Expression, Soul Urge, and Personality - work together to create a complete picture of who you are, what you desire, and how others perceive you.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Pythagorean Numerology Chart</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Pythagorean system assigns numbers to letters as follows:
            </p>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-4">
              <div className="grid grid-cols-3 md:grid-cols-9 gap-4 text-center">
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">1</div>
                  <div className="text-sm text-gray-700">A J S</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">2</div>
                  <div className="text-sm text-gray-700">B K T</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">3</div>
                  <div className="text-sm text-gray-700">C L U</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">4</div>
                  <div className="text-sm text-gray-700">D M V</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">5</div>
                  <div className="text-sm text-gray-700">E N W</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">6</div>
                  <div className="text-sm text-gray-700">F O X</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">7</div>
                  <div className="text-sm text-gray-700">G P Y</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">8</div>
                  <div className="text-sm text-gray-700">H Q Z</div>
                </div>
                <div>
                  <div className="font-bold text-purple-700 text-xl mb-1">9</div>
                  <div className="text-sm text-gray-700">I R</div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              To calculate a name number, convert each letter to its corresponding number, add them together, then reduce to a single digit (1-9) by adding the digits. Master numbers 11, 22, and 33 are exceptions and are not reduced further.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Three Core Name Numbers</h3>
            
            <div className="space-y-6">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-5">
                <h4 className="font-bold text-purple-900 text-lg mb-3">Expression Number (Destiny Number)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Calculated from:</strong> All letters in your full name
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Represents:</strong> Your natural talents, abilities, and life purpose. This is your destiny - what you're meant to accomplish and how you express yourself in the world.
                </p>
                <p className="text-sm text-gray-700">
                  Your Expression Number reveals your potential, the tools you have to work with, and the path you're meant to follow. It shows what comes naturally to you and where you can excel.
                </p>
              </div>
              
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5">
                <h4 className="font-bold text-indigo-900 text-lg mb-3">Soul Urge Number (Heart's Desire Number)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Calculated from:</strong> Vowels only (A, E, I, O, U)
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Represents:</strong> Your inner desires, motivations, and what truly drives you. This is your heart's deepest wish - what brings you fulfillment and joy.
                </p>
                <p className="text-sm text-gray-700">
                  Your Soul Urge Number reveals what you value most, what makes you happy, and what you need to feel satisfied in life. It represents your authentic self and innermost longings.
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
                <h4 className="font-bold text-blue-900 text-lg mb-3">Personality Number (Outer Personality Number)</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Calculated from:</strong> Consonants only
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Represents:</strong> How others perceive you and the image you project to the world. This is your social mask - the first impression you make.
                </p>
                <p className="text-sm text-gray-700">
                  Your Personality Number reveals how you present yourself, what others notice about you first, and the persona you show in social situations. It's the outer layer of your identity.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Master Numbers: 11, 22, and 33</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Master numbers are double-digit numbers that carry intensified vibrations and special significance. They are not reduced to single digits:
            </p>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
                <h4 className="font-semibold text-yellow-900 mb-2">Master Number 11 - The Intuitive Illuminator</h4>
                <p className="text-sm text-gray-700">
                  Highly intuitive, spiritual, and inspirational. Natural teachers and visionaries with strong psychic abilities. Capable of inspiring and enlightening others. However, the pressure of this number can be intense, and some may operate at the reduced level of 2.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h4 className="font-semibold text-orange-900 mb-2">Master Number 22 - The Master Builder</h4>
                <p className="text-sm text-gray-700">
                  Practical idealists who can turn dreams into reality. Capable of achieving great things and building lasting legacies. Combines vision with practical skills. May operate at the reduced level of 4 if not fully expressing potential.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-semibold text-green-900 mb-2">Master Number 33 - The Master Teacher</h4>
                <p className="text-sm text-gray-700">
                  Embodies unconditional love and spiritual teaching. Rare and powerful healing energy focused on uplifting humanity. The most spiritually evolved number. May operate at the reduced level of 6 if not ready for this level of responsibility.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Use Your Name Numerology</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding your name numbers can provide valuable insights for personal growth and self-awareness:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Self-Understanding</h4>
                  <p className="text-sm text-gray-700">Use your numbers to understand your natural strengths, challenges, and life purpose. This awareness can guide your decisions and help you align with your authentic self.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Career Guidance</h4>
                  <p className="text-sm text-gray-700">Your Expression Number reveals careers where you'll naturally excel. Choose paths that align with your numerological strengths for greater satisfaction and success.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Relationship Insights</h4>
                  <p className="text-sm text-gray-700">Understanding your Soul Urge Number helps you recognize what you truly need in relationships. Your Personality Number shows how you come across to potential partners.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-purple-600 font-bold text-lg">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Personal Development</h4>
                  <p className="text-sm text-gray-700">Knowing your challenges helps you work on personal growth areas. Use your strengths consciously and address your weaknesses with awareness.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg">!</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Remember: You Create Your Destiny</h4>
                  <p className="text-sm text-gray-700">Numerology provides insights, but you have free will. Your numbers show potential and tendencies, not fixed fate. Use this knowledge as a tool for self-reflection, not as limitations on what you can achieve.</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mt-6">
              Use our Name Numerology Calculator to discover the hidden meanings in your name and unlock insights about your personality, purpose, and potential. Remember, numerology is a tool for self-discovery and reflection - you are the author of your own life story! ✨
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/life-path-number-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold text-gray-900">Life Path Number</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate from birth date</p>
          </a>
          
          <a 
            href="/love-compatibility-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💕</div>
            <h3 className="font-semibold text-gray-900">Love Compatibility</h3>
            <p className="text-sm text-gray-600 mt-1">Test relationship match</p>
          </a>
          
          <a 
            href="/zodiac-sign-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">♈</div>
            <h3 className="font-semibold text-gray-900">Zodiac Sign</h3>
            <p className="text-sm text-gray-600 mt-1">Find your astrological sign</p>
          </a>
          
          <a 
            href="/biorhythm-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">Biorhythm</h3>
            <p className="text-sm text-gray-600 mt-1">Track your cycles</p>
          </a>
        </div>
      </section>
    </div>
  );
}

