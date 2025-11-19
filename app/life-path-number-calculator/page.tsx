import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import LifePathNumberCalculator from '@/components/Calculator/LifePathNumberCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Life Path Number Calculator - Discover Your Numerology & Life Purpose | AICalculator',
  description: 'Free Life Path Number calculator to discover your numerology number and life purpose. Learn about personality traits, career paths, relationships, and spiritual destiny based on your birth date.',
  keywords: [
    'life path number calculator',
    'numerology calculator',
    'life path calculator',
    'numerology life path',
    'birth date numerology',
    'destiny number calculator',
    'life purpose calculator',
    'numerology chart',
    'life path 1',
    'life path 2',
    'life path 3',
    'life path 4',
    'life path 5',
    'life path 6',
    'life path 7',
    'life path 8',
    'life path 9',
    'master number 11',
    'master number 22',
    'master number 33',
    'numerology compatibility',
    'numerology meaning',
    'spiritual numerology',
    'pythagorean numerology'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Life Path Number Calculator - Discover Your Numerology',
    description: 'Calculate your Life Path Number and discover your life purpose, personality traits, and spiritual destiny.',
    type: 'website',
    url: getUrl('/life-path-number-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('life-path-number'),
      width: 1200,
      height: 630,
      alt: 'Life Path Number Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Path Number Calculator - Find Your Life Purpose',
    description: 'Discover your Life Path Number and unlock insights into your personality and destiny.',
    images: [getOgImage('life-path-number')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/life-path-number-calculator'),
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

export default function LifePathNumberCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/life-path-number-calculator'),
        name: 'Life Path Number Calculator',
        url: getUrl('/life-path-number-calculator'),
        description: 'Calculate your Life Path Number based on birth date and discover your life purpose, personality traits, and spiritual destiny through numerology.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate Life Path Number from birth date',
          'View detailed personality analysis',
          'Discover life purpose and mission',
          'Explore ideal career paths',
          'Check numerology compatibility',
          'Learn about strengths and challenges',
          'Master Numbers (11, 22, 33) support',
          'Step-by-step calculation display'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/life-path-number-calculator'),
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
            name: 'Life Path Number Calculator',
            item: getUrl('/life-path-number-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/life-path-number-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a Life Path Number and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your Life Path Number is the most important number in numerology, calculated from your complete birth date. To find it, reduce your birth month, day, and year to single digits (or Master Numbers 11, 22, 33), then add them together and reduce again if needed. For example, if you were born on July 20, 1985: Month (7) + Day (2+0=2) + Year (1+9+8+5=23, 2+3=5) = 7+2+5=14, then 1+4=5. Your Life Path Number would be 5. This number reveals your life purpose, natural talents, challenges, and the path you\'re meant to walk in this lifetime. It\'s like a blueprint for your soul\'s journey.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are Master Numbers in numerology?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Master Numbers are 11, 22, and 33 - powerful double-digit numbers that are not reduced to single digits in numerology. They carry higher spiritual vibrations and greater potential, but also come with increased challenges and responsibilities. Master Number 11 is the Spiritual Messenger with heightened intuition; 22 is the Master Builder who manifests grand visions; and 33 is the Master Teacher embodying unconditional love. If your calculation results in 11, 22, or 33 at any stage, you stop reducing. People with Master Numbers often feel called to make significant contributions to humanity and may experience intense life lessons. Not everyone is ready to fully express Master Number energy, and some may operate at the reduced single-digit level (11→2, 22→4, 33→6) until they develop spiritually.'
            }
          },
          {
            '@type': 'Question',
            name: 'What does my Life Path Number reveal about me?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your Life Path Number reveals your core personality traits, natural talents, life purpose, ideal career paths, relationship compatibility, and the challenges you\'ll face for growth. Each number from 1-9 and Master Numbers 11, 22, 33 has distinct characteristics. For instance, Life Path 1 individuals are natural leaders and pioneers, while Life Path 2 people are diplomatic peacemakers. The number shows your strengths (like creativity for 3s or analytical ability for 7s) and weaknesses (like stubbornness for 4s or indecisiveness for 2s). It also indicates your soul\'s mission - what you\'re here to learn and contribute. Understanding your Life Path Number helps you make aligned decisions, choose suitable careers, improve relationships, and navigate life\'s challenges with greater awareness and purpose.'
            }
          },
          {
            '@type': 'Question',
            name: 'How accurate is Life Path Number compatibility?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Life Path Number compatibility provides valuable insights into relationship dynamics based on numerological harmony, but it\'s not deterministic. Certain numbers naturally complement each other - for example, 2 and 8 balance each other well, while 1 and 1 may compete for leadership. However, successful relationships depend on many factors including emotional maturity, communication skills, shared values, and conscious effort from both partners. Numerology compatibility highlights potential strengths and challenges in a relationship, helping partners understand each other\'s needs and approaches. Even "incompatible" numbers can have successful relationships through awareness and compromise, while "compatible" numbers can struggle without proper care. Use compatibility as a tool for understanding, not as a rigid rule for choosing partners.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I have more than one Life Path Number?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, you have only one Life Path Number based on your birth date, which never changes. However, numerology includes other important numbers that add depth to your profile. Your Expression Number (from your full birth name) reveals your natural abilities and talents. Your Soul Urge Number (from vowels in your name) shows your inner desires and motivations. Your Personality Number (from consonants) indicates how others perceive you. Your Birth Day Number (the day you were born) adds specific characteristics. Together, these numbers create a complete numerological chart. While your Life Path Number is your primary number and life theme, these other numbers provide additional layers of understanding. Some people also calculate their Personal Year Number, which changes annually and shows the energy and themes for that specific year.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can I use my Life Path Number for personal growth?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use your Life Path Number as a guide for self-awareness and conscious development. First, embrace your strengths - if you\'re a creative 3, pursue artistic endeavors; if you\'re an analytical 7, engage in research or spiritual study. Second, work on your challenges - stubborn 4s can practice flexibility, while scattered 5s can develop commitment. Third, align your career with your number\'s natural talents - 8s excel in business, 6s in caregiving, 1s in leadership. Fourth, understand your relationship patterns and choose compatible partners or learn to navigate differences. Fifth, recognize your life purpose and make decisions that support it. Use your number\'s insights during difficult times to understand lessons and growth opportunities. Remember, your Life Path Number shows tendencies, not limitations - you have free will to evolve beyond your number\'s typical patterns through conscious effort and spiritual growth.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/life-path-number-calculator'),
        name: 'How to Calculate Your Life Path Number',
        description: 'Learn how to calculate your Life Path Number and discover your life purpose, personality traits, and spiritual destiny through numerology.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Life Path Number Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Birth Month',
            text: 'Select your birth month from the dropdown menu (January through December). The calculator will use this to begin the numerology calculation.',
            url: getStepUrl('/life-path-number-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Your Birth Day',
            text: 'Input the day of the month you were born (1-31). Make sure to enter the correct day for accurate numerology results.',
            url: getStepUrl('/life-path-number-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Your Birth Year',
            text: 'Input your complete birth year (e.g., 1990). The full year is essential for accurate Life Path Number calculation.',
            url: getStepUrl('/life-path-number-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Click Calculate',
            text: 'Click the "Calculate Life Path Number" button to process your birth date and reveal your numerology number.',
            url: getStepUrl('/life-path-number-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'View Calculation Steps',
            text: 'See the step-by-step calculation process showing how your birth date numbers are reduced to reach your Life Path Number. This helps you understand the numerology method.',
            url: getStepUrl('/life-path-number-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Discover Your Life Path Number',
            text: 'View your Life Path Number (1-9, 11, 22, or 33) along with its title and symbolic meaning. Master Numbers (11, 22, 33) indicate special spiritual significance.',
            url: getStepUrl('/life-path-number-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Explore Personality Traits',
            text: 'Read detailed information about your personality characteristics, strengths, weaknesses, and how your number influences your behavior and relationships.',
            url: getStepUrl('/life-path-number-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Learn Your Life Purpose',
            text: 'Discover your soul\'s mission and life purpose. Understand what you\'re here to learn, contribute, and achieve in this lifetime.',
            url: getStepUrl('/life-path-number-calculator', 8),
          },
          {
            '@type': 'HowToStep',
            position: 9,
            name: 'Explore Career Paths',
            text: 'View ideal career paths that align with your Life Path Number\'s natural talents and abilities. Use this guidance for career planning and development.',
            url: getStepUrl('/life-path-number-calculator', 9),
          },
          {
            '@type': 'HowToStep',
            position: 10,
            name: 'Check Compatibility',
            text: 'See which Life Path Numbers are most compatible with yours for relationships and which may present challenges. Use this for better relationship understanding.',
            url: getStepUrl('/life-path-number-calculator', 10),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/life-path-number-calculator'),
        headline: 'Life Path Number Calculator - Discover Your Numerology and Life Purpose',
        description: 'Complete guide to calculating your Life Path Number, understanding numerology, personality traits, and spiritual destiny.',
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
        image: getOgImage('life-path-number'),
        articleBody: 'Numerology is an ancient practice that reveals the mystical relationship between numbers and life events. Your Life Path Number, calculated from your birth date, is the most significant number in your numerology chart, revealing your life purpose, natural talents, and spiritual destiny.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Life Path Number Calculator - Discover Your Numerology and Life Purpose</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Life Path Number Calculator"
        calculatorUrl="/life-path-number-calculator"
      />

      <LifePathNumberCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Life Path Numbers and Numerology</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is a Life Path Number?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your <strong>Life Path Number</strong> is the most important number in numerology, representing your life's purpose, natural talents, and the path you're meant to walk in this lifetime. Calculated from your complete birth date, it reveals your core personality traits, strengths, challenges, and the lessons you're here to learn.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Think of your Life Path Number as a blueprint for your soul's journey. It doesn't dictate your destiny but rather illuminates your natural inclinations, potential, and the themes that will recur throughout your life. Understanding your Life Path Number can help you make aligned decisions, choose suitable careers, improve relationships, and navigate life's challenges with greater awareness and purpose.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Numerology, the study of numbers' mystical significance, has been practiced for thousands of years across various cultures including ancient Babylon, Egypt, Greece, and China. The modern Western numerology system is largely based on the teachings of Greek mathematician and philosopher Pythagoras, who believed that numbers are the universal language and hold the key to understanding the cosmos and human existence.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Calculate Your Life Path Number</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Calculating your Life Path Number involves reducing your birth date to a single digit (or Master Number). Here's the step-by-step process:
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Example Calculation: July 20, 1985</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Step 1:</strong> Reduce the month: July = 7 (already a single digit)</p>
                <p><strong>Step 2:</strong> Reduce the day: 20 = 2 + 0 = 2</p>
                <p><strong>Step 3:</strong> Reduce the year: 1985 = 1 + 9 + 8 + 5 = 23, then 2 + 3 = 5</p>
                <p><strong>Step 4:</strong> Add the reduced numbers: 7 + 2 + 5 = 14</p>
                <p><strong>Step 5:</strong> Final reduction: 14 = 1 + 4 = 5</p>
                <p className="font-semibold text-blue-700 mt-3">Life Path Number: 5</p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important Note:</strong> If at any point during your calculation you encounter 11, 22, or 33, you stop reducing. These are Master Numbers with special significance and are not reduced to single digits.
            </p>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Master Number Example: November 22, 1988</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Step 1:</strong> Month: November = 11 (Master Number - don't reduce!)</p>
                <p><strong>Step 2:</strong> Day: 22 (Master Number - don't reduce!)</p>
                <p><strong>Step 3:</strong> Year: 1988 = 1 + 9 + 8 + 8 = 26, then 2 + 6 = 8</p>
                <p><strong>Step 4:</strong> Add: 11 + 22 + 8 = 41, then 4 + 1 = 5</p>
                <p className="font-semibold text-purple-700 mt-3">Life Path Number: 5 (but influenced by Master Numbers 11 and 22)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Nine Life Path Numbers</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Each Life Path Number from 1 to 9 represents a distinct personality type, life purpose, and set of challenges. Here's a comprehensive overview:
            </p>
            
            <div className="space-y-6">
              <div className="bg-red-50 rounded-lg p-5 border border-red-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">👑</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 1: The Leader</h4>
                    <p className="text-sm text-gray-600 mt-1">Independent • Ambitious • Pioneering</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Natural-born leaders with strong willpower and determination. Life Path 1 individuals are innovative, courageous, and not afraid to forge their own path. They excel in positions of authority and pioneering new ideas.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Leadership, independence, innovation, courage</p>
                  <p><strong>Challenges:</strong> Stubbornness, arrogance, learning to cooperate</p>
                  <p><strong>Careers:</strong> Entrepreneur, CEO, Designer, Military Leader</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🕊️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 2: The Peacemaker</h4>
                    <p className="text-sm text-gray-600 mt-1">Diplomatic • Cooperative • Sensitive</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Natural peacemakers who excel at bringing people together. Life Path 2 individuals are intuitive, empathetic, and skilled at understanding others' perspectives. They thrive in partnerships and collaborative environments.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Diplomacy, cooperation, intuition, patience</p>
                  <p><strong>Challenges:</strong> Oversensitivity, indecisiveness, building confidence</p>
                  <p><strong>Careers:</strong> Counselor, Mediator, Teacher, Social Worker</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🎨</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 3: The Creative Communicator</h4>
                    <p className="text-sm text-gray-600 mt-1">Creative • Expressive • Optimistic</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Natural communicators with artistic talents. Life Path 3 individuals are charming, sociable, and have a gift for inspiring others through words and creativity. Their enthusiasm and joy are contagious.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Creativity, communication, optimism, charm</p>
                  <p><strong>Challenges:</strong> Scattered energy, superficiality, maintaining focus</p>
                  <p><strong>Careers:</strong> Writer, Artist, Performer, Designer</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🏗️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 4: The Builder</h4>
                    <p className="text-sm text-gray-600 mt-1">Practical • Disciplined • Hardworking</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Master builders who create solid foundations. Life Path 4 individuals are reliable, organized, and excel at turning ideas into reality through systematic effort. Their dedication and persistence are unmatched.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Discipline, reliability, organization, practicality</p>
                  <p><strong>Challenges:</strong> Rigidity, stubbornness, embracing change</p>
                  <p><strong>Careers:</strong> Engineer, Accountant, Manager, Programmer</p>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🦅</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 5: The Freedom Seeker</h4>
                    <p className="text-sm text-gray-600 mt-1">Adventurous • Versatile • Freedom-Loving</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Dynamic explorers who crave variety and change. Life Path 5 individuals are adaptable, curious, and thrive on new experiences. Their progressive thinking and love of freedom inspire others.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Adaptability, versatility, curiosity, resourcefulness</p>
                  <p><strong>Challenges:</strong> Restlessness, impulsiveness, commitment issues</p>
                  <p><strong>Careers:</strong> Travel Writer, Sales, Journalist, Entrepreneur</p>
                </div>
              </div>
              
              <div className="bg-pink-50 rounded-lg p-5 border border-pink-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">❤️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 6: The Nurturer</h4>
                    <p className="text-sm text-gray-600 mt-1">Caring • Responsible • Family-Oriented</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Natural nurturers who create harmony and beauty. Life Path 6 individuals are compassionate, protective, and have a strong sense of responsibility toward others. Their loving nature heals and supports.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Compassion, responsibility, nurturing, harmony-seeking</p>
                  <p><strong>Challenges:</strong> Martyrdom, worry, perfectionism, setting boundaries</p>
                  <p><strong>Careers:</strong> Teacher, Nurse, Counselor, Interior Designer</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🔍</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 7: The Seeker</h4>
                    <p className="text-sm text-gray-600 mt-1">Analytical • Spiritual • Introspective</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Deep thinkers who seek truth and wisdom. Life Path 7 individuals are intuitive, philosophical, and drawn to mysteries. Their analytical mind and spiritual nature lead to profound insights.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Analytical thinking, intuition, wisdom-seeking, spirituality</p>
                  <p><strong>Challenges:</strong> Aloofness, cynicism, avoiding isolation</p>
                  <p><strong>Careers:</strong> Researcher, Scientist, Philosopher, Investigator</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">💎</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 8: The Powerhouse</h4>
                    <p className="text-sm text-gray-600 mt-1">Ambitious • Authoritative • Material-Focused</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Natural executives who understand power and success. Life Path 8 individuals are confident, efficient, and excel at managing resources and people. Their business acumen and leadership create abundance.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Leadership, business acumen, efficiency, ambition</p>
                  <p><strong>Challenges:</strong> Materialism, workaholism, work-life balance</p>
                  <p><strong>Careers:</strong> Executive, Banker, Investor, Business Owner</p>
                </div>
              </div>
              
              <div className="bg-teal-50 rounded-lg p-5 border border-teal-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🌍</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Life Path 9: The Humanitarian</h4>
                    <p className="text-sm text-gray-600 mt-1">Compassionate • Idealistic • Humanitarian</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Old souls who care deeply about humanity. Life Path 9 individuals are generous, tolerant, and have a global perspective. Their wisdom and compassion inspire positive change in the world.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Strengths:</strong> Compassion, idealism, wisdom, tolerance</p>
                  <p><strong>Challenges:</strong> Martyrdom, emotional volatility, letting go</p>
                  <p><strong>Careers:</strong> Humanitarian Worker, Artist, Teacher, Activist</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Master Numbers: 11, 22, and 33</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Master Numbers are double-digit numbers (11, 22, 33) that carry higher spiritual vibrations and greater potential than single-digit numbers. They are not reduced in numerology calculations because they represent heightened abilities and increased responsibilities.
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">✨</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Master Number 11: The Spiritual Messenger</h4>
                    <p className="text-sm text-gray-600 mt-1">Intuitive • Inspirational • Spiritually Aware</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Master Number 11 individuals are spiritual messengers with heightened intuition and psychic abilities. They are visionary, idealistic, and have the ability to inspire and enlighten others. Their spiritual insights illuminate the path for many, though they may struggle with nervous tension and staying grounded. Life Path 11 carries the energy of both 11 and its reduced form 2, combining spiritual vision with diplomatic sensitivity.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Mission:</strong> To inspire and enlighten others through spiritual wisdom while staying grounded in practical reality.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border-2 border-blue-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Master Number 22: The Master Builder</h4>
                    <p className="text-sm text-gray-600 mt-1">Visionary • Practical • Powerful</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Master Number 22 individuals combine spiritual vision with practical ability to manifest grand dreams into reality. They are the master builders who can create lasting structures that benefit humanity on a large scale. Their unique blend of idealism and practicality makes them powerful change agents, though they may face overwhelming pressure and anxiety. Life Path 22 carries the energy of both 22 and its reduced form 4, combining visionary leadership with practical building skills.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Mission:</strong> To build something of lasting value that benefits humanity while balancing spiritual and material realms.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-5 border-2 border-yellow-200">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">🌟</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Master Number 33: The Master Teacher</h4>
                    <p className="text-sm text-gray-600 mt-1">Nurturing • Selfless • Devoted to Service</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Master Number 33 individuals are master teachers who embody unconditional love and compassion. They are the ultimate nurturers with the ability to heal and uplift humanity through their wisdom and selfless service. Their mission is to raise consciousness and help humanity evolve, though they must guard against martyrdom and burnout. Life Path 33 carries the energy of both 33 and its reduced form 6, combining master teaching with nurturing caregiving.
                </p>
                <div className="text-xs text-gray-600">
                  <p><strong>Mission:</strong> To teach and heal through unconditional love while maintaining healthy boundaries and self-care.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
              <p className="text-sm text-gray-700">
                <strong>Important Note:</strong> Not everyone with a Master Number fully expresses its higher vibration. Some may operate at the reduced single-digit level (11→2, 22→4, 33→6) until they develop spiritually and emotionally. Master Numbers come with greater challenges and responsibilities, requiring conscious effort to manifest their full potential.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Life Path Number Compatibility</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding numerology compatibility can provide valuable insights into relationship dynamics. While compatibility is not deterministic, certain Life Path Numbers naturally harmonize while others may face challenges:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Your Number</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Most Compatible</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Challenging</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">1</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">2, 3, 9</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">4, 8</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">2</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">1, 6, 8, 9</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">5, 7</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">3</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">1, 5, 6, 9</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">4, 7</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">4</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">2, 7, 8</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">1, 3, 5</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">5</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">1, 3, 7, 9</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">2, 4, 6</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">6</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">2, 3, 9</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">5, 7</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">7</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">4, 5, 9</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">2, 6, 8</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">8</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">2, 4, 6</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">1, 7, 9</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">9</td>
                    <td className="border border-gray-300 px-4 py-2 text-green-700">1, 2, 3, 6</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-700">5, 8</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="text-sm text-gray-700">
                <strong>Remember:</strong> Compatibility is just one factor in relationships. Communication, shared values, emotional maturity, and conscious effort are equally important. Many "incompatible" numbers have successful relationships through understanding and growth, while "compatible" numbers can struggle without proper care and attention.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Using Your Life Path Number for Personal Growth</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your Life Path Number is a powerful tool for self-awareness and conscious development. Here's how to use it effectively:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">1. Embrace Your Strengths</h4>
                <p className="text-sm text-gray-700">
                  Identify and develop your natural talents. If you're a creative 3, pursue artistic endeavors. If you're an analytical 7, engage in research or spiritual study. Leaning into your strengths brings fulfillment and success.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">2. Work on Your Challenges</h4>
                <p className="text-sm text-gray-700">
                  Recognize your weaknesses and consciously work to improve them. Stubborn 4s can practice flexibility, scattered 5s can develop commitment, and aloof 7s can work on emotional connection. Growth happens when we address our shadow side.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">3. Align Your Career</h4>
                <p className="text-sm text-gray-700">
                  Choose career paths that align with your Life Path Number's natural talents. 8s excel in business, 6s in caregiving, 1s in leadership. When your work aligns with your number, you'll find greater satisfaction and success.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">4. Improve Relationships</h4>
                <p className="text-sm text-gray-700">
                  Understand your relationship patterns and compatibility. Use numerology insights to communicate better, appreciate differences, and choose compatible partners. Even challenging combinations can work with awareness and effort.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">5. Fulfill Your Life Purpose</h4>
                <p className="text-sm text-gray-700">
                  Make decisions that support your soul's mission. Each Life Path Number has a specific purpose - leaders for 1s, peacemakers for 2s, humanitarians for 9s. Living in alignment with your purpose brings deep fulfillment.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">6. Navigate Life Challenges</h4>
                <p className="text-sm text-gray-700">
                  Use your number's insights during difficult times to understand lessons and growth opportunities. Challenges often relate to your number's weaknesses - see them as opportunities for evolution rather than obstacles.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mt-6">
              Remember, your Life Path Number shows tendencies and potentials, not limitations. You have free will to evolve beyond your number's typical patterns through conscious effort, self-awareness, and spiritual growth. Use numerology as a guide for understanding yourself and making aligned choices, but don't let it box you in. You are always capable of growth, change, and transcending your number's challenges.
            </p>
            
            <p className="text-gray-700 leading-relaxed mt-4">
              Use our Life Path Number Calculator to discover your numerology number and unlock insights into your personality, purpose, and potential. Share your results with friends and family to spark meaningful conversations about life purpose and personal growth!
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
            href="/zodiac-sign-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">♈</div>
            <h3 className="font-semibold text-gray-900">Zodiac Sign Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your astrological sign</p>
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

