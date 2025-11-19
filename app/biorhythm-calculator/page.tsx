import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import BiorhythmCalculator from '@/components/Calculator/BiorhythmCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Biorhythm Calculator - Track Your Physical, Emotional & Intellectual Cycles | AICalculator',
  description: 'Free biorhythm calculator to track your physical, emotional, and intellectual cycles. Discover your peak days, critical days, and optimal times for activities based on your birth date.',
  keywords: [
    'biorhythm calculator',
    'biorhythm chart',
    'physical cycle calculator',
    'emotional cycle calculator',
    'intellectual cycle calculator',
    'biorhythm analysis',
    'critical days calculator',
    'peak performance days',
    'biorhythm compatibility',
    'biological rhythm',
    'circadian rhythm calculator',
    'personal biorhythm',
    'biorhythm forecast',
    'energy level calculator',
    'mood cycle calculator',
    'mental clarity calculator',
    'biorhythm theory',
    '23 day cycle',
    '28 day cycle',
    '33 day cycle',
    'optimal performance calculator'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Biorhythm Calculator - Track Your Natural Cycles',
    description: 'Calculate your biorhythm cycles and discover your peak days for physical, emotional, and intellectual activities.',
    type: 'website',
    url: getUrl('/biorhythm-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('biorhythm'),
      width: 1200,
      height: 630,
      alt: 'Biorhythm Calculator'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biorhythm Calculator - Track Your Natural Cycles',
    description: 'Discover your physical, emotional, and intellectual cycles to optimize your performance.',
    images: [getOgImage('biorhythm')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/biorhythm-calculator'),
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

export default function BiorhythmCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/biorhythm-calculator'),
        name: 'Biorhythm Calculator',
        url: getUrl('/biorhythm-calculator'),
        description: 'Calculate your biorhythm cycles to track physical, emotional, and intellectual rhythms and discover optimal days for various activities.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate three biorhythm cycles',
          'Physical cycle (23 days)',
          'Emotional cycle (28 days)',
          'Intellectual cycle (33 days)',
          'Visual biorhythm chart',
          'Critical days identification',
          'Peak performance predictions',
          '30-day forecast'
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/biorhythm-calculator'),
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
            name: 'Biorhythm Calculator',
            item: getUrl('/biorhythm-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/biorhythm-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is biorhythm and how does it work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Biorhythm theory suggests that our lives are influenced by three primary cycles that begin at birth: Physical (23 days), Emotional (28 days), and Intellectual (33 days). These cycles follow sinusoidal patterns, alternating between high and low phases. During high phases (positive values), you experience increased energy, better mood, or enhanced mental clarity depending on the cycle. During low phases (negative values), you may feel tired, moody, or mentally foggy. The theory proposes that understanding these rhythms can help you plan activities for optimal performance - scheduling physical activities during physical peaks, important meetings during emotional highs, and complex problem-solving during intellectual peaks.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are critical days in biorhythm?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Critical days occur when a biorhythm cycle crosses the zero line, transitioning from positive to negative or vice versa. These are considered unstable periods when you may be more prone to accidents, errors, or emotional volatility. Physical critical days may bring clumsiness or reduced coordination; emotional critical days can cause mood swings or relationship conflicts; intellectual critical days might result in poor judgment or mental confusion. When two or more cycles cross zero on the same day (double or triple critical days), extra caution is advised. However, it\'s important to note that biorhythm theory is not scientifically proven, and critical days should be viewed as reminders to be mindful rather than definitive predictions of bad luck.'
            }
          },
          {
            '@type': 'Question',
            name: 'How accurate is biorhythm theory?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Biorhythm theory lacks strong scientific evidence and is generally considered pseudoscience by the mainstream scientific community. Multiple studies have failed to find consistent correlations between biorhythm cycles and actual performance, accidents, or health outcomes. The theory was popular in the 1970s but has since been largely debunked by rigorous research. However, many people still find value in biorhythm charts as a tool for self-awareness and planning. The act of paying attention to your energy levels, moods, and mental clarity - regardless of whether biorhythm theory is accurate - can help you become more mindful of your natural patterns and make better decisions about when to tackle different types of activities. Use biorhythm as a fun, reflective tool rather than a scientific prediction.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the three biorhythm cycles?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The three primary biorhythm cycles are: 1) Physical Cycle (23 days) - governs physical strength, energy, endurance, coordination, and overall physical well-being. High phases are ideal for sports, exercise, manual labor, and physically demanding activities. 2) Emotional Cycle (28 days) - influences mood, feelings, creativity, sensitivity, and interpersonal relationships. High phases enhance emotional stability, artistic expression, and social interactions. 3) Intellectual Cycle (33 days) - affects mental clarity, memory, analytical thinking, concentration, and problem-solving abilities. High phases are best for learning, studying, making important decisions, and tackling complex mental tasks. Each cycle follows a sine wave pattern, with the positive half representing high phases and the negative half representing low phases.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can biorhythm predict compatibility in relationships?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Biorhythm compatibility compares two people\'s cycles to identify periods of synchronization or conflict. When partners have aligned high phases, they may experience better understanding and harmony. When cycles are opposite (one high, one low), conflicts may arise. Some biorhythm enthusiasts use compatibility charts to plan important relationship events or understand relationship dynamics. However, there is no scientific evidence supporting biorhythm compatibility as a valid predictor of relationship success. Successful relationships depend on communication, shared values, emotional maturity, mutual respect, and conscious effort - factors that biorhythm cannot measure. While comparing biorhythm charts can be an interesting conversation starter, it should not be used as a serious tool for relationship decisions.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can I use biorhythm for better performance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To use biorhythm for performance optimization, track your cycles and plan activities accordingly. Schedule physically demanding tasks, workouts, or sports during physical peaks. Plan important presentations, social events, or creative work during emotional highs. Tackle complex problems, learning, or strategic planning during intellectual peaks. Avoid making major decisions or taking risks during critical days when cycles cross zero. Use low phases for rest, recovery, and routine tasks. Keep a journal to note whether your actual experiences align with your biorhythm predictions - this self-awareness can help you identify your true energy patterns regardless of biorhythm validity. Remember that biorhythm is just one tool; also consider sleep quality, nutrition, stress levels, and other factors that genuinely affect performance.'
            }
          }
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/biorhythm-calculator'),
        name: 'How to Use the Biorhythm Calculator',
        description: 'Learn how to calculate your biorhythm cycles and interpret the results for optimal performance planning.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Biorhythm Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Birth Date',
            text: 'Input your complete birth date (month, day, and year). This is the starting point for all biorhythm calculations.',
            url: getStepUrl('/biorhythm-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Target Date',
            text: 'Choose the date you want to analyze. By default, this is set to today, but you can select any future or past date.',
            url: getStepUrl('/biorhythm-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Calculate Biorhythm',
            text: 'Click the "Calculate Biorhythm" button to generate your biorhythm analysis for the selected date.',
            url: getStepUrl('/biorhythm-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View Current Status',
            text: 'See your current physical, emotional, and intellectual percentages. Positive values indicate high phases; negative values indicate low phases.',
            url: getStepUrl('/biorhythm-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Analyze the Chart',
            text: 'Study the 30-day biorhythm chart showing past and future cycles. The red line represents physical, green is emotional, and blue is intellectual.',
            url: getStepUrl('/biorhythm-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Check Peak Days',
            text: 'Review the next peak days for each cycle. These are optimal times for activities related to each rhythm.',
            url: getStepUrl('/biorhythm-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Note Critical Days',
            text: 'Pay attention to critical days when cycles cross zero. Extra caution is advised during these transition periods.',
            url: getStepUrl('/biorhythm-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Plan Your Activities',
            text: 'Use the biorhythm information to plan physical activities during physical peaks, social events during emotional highs, and mental work during intellectual peaks.',
            url: getStepUrl('/biorhythm-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/biorhythm-calculator'),
        headline: 'Biorhythm Calculator - Track Your Physical, Emotional, and Intellectual Cycles',
        description: 'Complete guide to understanding biorhythm theory, calculating your cycles, and using biorhythm for performance optimization.',
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
        image: getOgImage('biorhythm'),
        articleBody: 'Biorhythm theory proposes that our lives are influenced by three primary biological cycles that begin at birth and continue throughout life. Understanding these rhythms can help optimize performance and plan activities for maximum effectiveness.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Biorhythm Calculator - Track Your Physical, Emotional, and Intellectual Cycles</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Biorhythm Calculator"
        calculatorUrl="/biorhythm-calculator"
      />

      <BiorhythmCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Biorhythm Theory</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What is Biorhythm?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Biorhythm theory</strong> proposes that our lives are influenced by three primary biological cycles that begin at birth and continue throughout our lifetime. These rhythmic patterns supposedly affect our physical condition, emotional state, and intellectual capabilities. The theory suggests that by understanding these cycles, we can optimize our performance, avoid critical periods, and plan activities for maximum effectiveness.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The concept of biorhythms emerged in the late 19th and early 20th centuries through the work of several researchers. Wilhelm Fliess, a German physician and friend of Sigmund Freud, proposed the 23-day physical and 28-day emotional cycles. Hermann Swoboda, an Austrian psychology professor, independently discovered similar cycles. Later, Alfred Teltscher, an Austrian engineer, added the 33-day intellectual cycle based on observations of his students' performance patterns.
            </p>
            <p className="text-gray-700 leading-relaxed">
              While biorhythm theory gained significant popularity in the 1970s, it's important to note that it lacks strong scientific support. Multiple studies have failed to find consistent correlations between biorhythm cycles and actual performance or events. Despite this, many people still find biorhythm charts useful as a tool for self-reflection and awareness of their natural energy patterns.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Three Primary Cycles</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Biorhythm theory identifies three fundamental cycles, each with its own period and area of influence. These cycles follow sinusoidal (wave-like) patterns, alternating between positive (high) and negative (low) phases:
            </p>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-5">
                <h4 className="font-bold text-red-900 text-lg mb-3">Physical Cycle (23 Days)</h4>
                <p className="text-gray-700 mb-3">
                  The physical cycle governs your physical strength, energy levels, endurance, coordination, and overall physical well-being. This 23-day cycle affects your body's physical capabilities and resistance to illness.
                </p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>High Phase (Positive):</strong> Increased energy, strength, stamina, and coordination. Optimal for sports, exercise, manual labor, and physically demanding activities. Better immune function and faster recovery from illness or injury.</p>
                  <p><strong>Low Phase (Negative):</strong> Reduced energy, fatigue, decreased coordination, and lower physical performance. More susceptible to illness and injury. Best for rest, recovery, and light activities.</p>
                  <p><strong>Critical Day (Zero Crossing):</strong> Transition period with potential for accidents, clumsiness, or physical instability. Extra caution advised during physical activities.</p>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-5">
                <h4 className="font-bold text-green-900 text-lg mb-3">Emotional Cycle (28 Days)</h4>
                <p className="text-gray-700 mb-3">
                  The emotional cycle influences your mood, feelings, creativity, sensitivity, and interpersonal relationships. This 28-day cycle (matching the lunar cycle) affects your emotional stability and social interactions.
                </p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>High Phase (Positive):</strong> Positive mood, emotional stability, enhanced creativity, better relationships, and increased empathy. Optimal for social events, artistic work, important conversations, and building connections.</p>
                  <p><strong>Low Phase (Negative):</strong> Mood swings, irritability, emotional sensitivity, and potential for conflicts. May feel withdrawn or pessimistic. Best for solitary activities and self-care.</p>
                  <p><strong>Critical Day (Zero Crossing):</strong> Emotional volatility, unpredictable mood changes, or relationship conflicts. Be mindful in social situations and important discussions.</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5">
                <h4 className="font-bold text-blue-900 text-lg mb-3">Intellectual Cycle (33 Days)</h4>
                <p className="text-gray-700 mb-3">
                  The intellectual cycle governs mental clarity, memory, analytical thinking, concentration, and problem-solving abilities. This 33-day cycle affects your cognitive performance and learning capacity.
                </p>
                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>High Phase (Positive):</strong> Sharp mental clarity, enhanced memory, better concentration, and improved problem-solving. Optimal for learning, studying, exams, important decisions, strategic planning, and complex mental tasks.</p>
                  <p><strong>Low Phase (Negative):</strong> Mental fog, difficulty concentrating, poor memory, and reduced analytical ability. More prone to mistakes and poor judgment. Best for routine tasks and breaks from intensive mental work.</p>
                  <p><strong>Critical Day (Zero Crossing):</strong> Confusion, poor judgment, or mental errors. Avoid making important decisions or tackling complex problems.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How Biorhythm is Calculated</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Biorhythm calculations are based on a simple mathematical formula using sine waves. Each cycle starts at birth (day zero) and continues throughout life following a sinusoidal pattern:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-5 mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Calculation Formula</h4>
              <div className="text-sm text-gray-700 space-y-2 font-mono bg-white p-4 rounded border border-gray-200">
                <p>Physical = sin(2π × days_alive / 23) × 100</p>
                <p>Emotional = sin(2π × days_alive / 28) × 100</p>
                <p>Intellectual = sin(2π × days_alive / 33) × 100</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Example Calculation</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>Birth Date: January 1, 1990</p>
                <p>Target Date: November 19, 2024</p>
                <p>Days Alive: 12,741 days</p>
                <p className="mt-3"><strong>Results:</strong></p>
                <p>Physical: sin(2π × 12,741 / 23) × 100 = [calculated value]%</p>
                <p>Emotional: sin(2π × 12,741 / 28) × 100 = [calculated value]%</p>
                <p>Intellectual: sin(2π × 12,741 / 33) × 100 = [calculated value]%</p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              The result is a percentage between -100% (lowest point) and +100% (highest point). Values above 0% indicate high phases with increased capacity, while values below 0% indicate low phases with decreased capacity. When a cycle crosses 0% (transitioning between positive and negative), it's considered a critical day.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Understanding Critical Days</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Critical days</strong> are considered the most important aspect of biorhythm theory. These occur when a cycle crosses the zero line, transitioning from positive to negative or vice versa. During these transition periods, the cycle is at its most unstable point, potentially leading to unpredictable behavior or performance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">Physical Critical Days</h4>
                <p className="text-sm text-gray-700">May experience clumsiness, accidents, reduced coordination, or physical mishaps. Extra caution advised during sports, driving, or operating machinery.</p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Emotional Critical Days</h4>
                <p className="text-sm text-gray-700">Potential for mood swings, emotional outbursts, or relationship conflicts. Be mindful in social situations and important conversations.</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Intellectual Critical Days</h4>
                <p className="text-sm text-gray-700">Risk of poor judgment, mental errors, or confusion. Avoid making important decisions or tackling complex problems.</p>
              </div>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h4 className="font-semibold text-amber-900 mb-2">Double and Triple Critical Days</h4>
              <p className="text-sm text-gray-700">
                When two or more cycles cross zero on the same day, it's called a double or triple critical day. These are considered especially unstable periods requiring maximum caution. However, it's important to remember that biorhythm theory lacks scientific validation, and critical days should be viewed as reminders to be mindful rather than definitive predictions of bad luck.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Practical Applications of Biorhythm</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              While biorhythm theory is not scientifically proven, many people use it as a tool for self-awareness and activity planning. Here's how you can apply biorhythm concepts to your daily life:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏋️ Physical Activities</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>High Phase:</strong> Schedule intense workouts, sports competitions, physically demanding projects, or outdoor adventures. Your body is at peak performance.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Low Phase:</strong> Focus on rest, recovery, stretching, light exercise, or routine physical tasks. Listen to your body's need for recuperation.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">💝 Emotional & Social Activities</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>High Phase:</strong> Plan important conversations, social gatherings, creative projects, relationship discussions, or networking events. Your emotional intelligence is heightened.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Low Phase:</strong> Take time for solitude, self-care, journaling, or quiet reflection. Avoid major relationship decisions or conflicts.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🧠 Intellectual & Mental Activities</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>High Phase:</strong> Tackle complex problems, study for exams, make important decisions, engage in strategic planning, or learn new skills. Your mental clarity is optimal.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Low Phase:</strong> Handle routine tasks, administrative work, or simple activities. Avoid making major life decisions or signing important contracts.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">⚠️ Critical Days</h4>
                <p className="text-sm text-gray-700">
                  Be extra mindful and cautious on critical days. Double-check your work, drive carefully, think before speaking, and avoid taking unnecessary risks. Use these days for routine activities and self-awareness.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Scientific Perspective on Biorhythm</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              It's crucial to understand the scientific status of biorhythm theory. Despite its popularity, biorhythm has been extensively studied and largely rejected by the scientific community:
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <h4 className="font-semibold text-red-900 mb-2">Lack of Scientific Evidence</h4>
              <p className="text-sm text-gray-700">
                Multiple peer-reviewed studies have failed to find consistent correlations between biorhythm cycles and actual performance, accidents, or health outcomes. Research has shown that biorhythm predictions perform no better than random chance in predicting events or performance.
              </p>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Why Biorhythm Seems to Work:</strong> Several psychological factors may explain why people believe biorhythm works:
            </p>
            
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Confirmation Bias:</strong> People tend to remember instances when biorhythm predictions matched their experiences and forget when they didn't.</li>
              <li><strong>Self-Fulfilling Prophecy:</strong> Believing you're in a low phase may actually cause you to perform worse or be more cautious.</li>
              <li><strong>Barnum Effect:</strong> Biorhythm descriptions are often vague enough to apply to anyone, similar to horoscopes.</li>
              <li><strong>Increased Self-Awareness:</strong> Simply paying attention to your energy levels and moods can help you notice patterns, regardless of biorhythm validity.</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Legitimate Biological Rhythms</h4>
              <p className="text-sm text-gray-700 mb-2">
                While biorhythm theory itself isn't scientifically supported, there are genuine biological rhythms that science recognizes:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li><strong>Circadian Rhythm:</strong> 24-hour sleep-wake cycle regulated by light exposure</li>
                <li><strong>Ultradian Rhythms:</strong> 90-120 minute cycles affecting alertness and concentration</li>
                <li><strong>Infradian Rhythms:</strong> Cycles longer than 24 hours, including menstrual cycles</li>
                <li><strong>Seasonal Rhythms:</strong> Annual patterns affecting mood and energy (e.g., Seasonal Affective Disorder)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">How to Use This Calculator Effectively</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              While biorhythm theory lacks scientific support, you can still use this calculator as a tool for self-reflection and mindfulness:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">1.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Track Your Actual Patterns</h4>
                  <p className="text-sm text-gray-700">Keep a journal of your energy levels, moods, and mental clarity. Compare your actual experiences with biorhythm predictions to see if they align.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">2.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Use as a Planning Tool</h4>
                  <p className="text-sm text-gray-700">Treat biorhythm as a reminder to plan activities thoughtfully. Even if the cycles aren't accurate, the practice of strategic planning is valuable.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Increase Self-Awareness</h4>
                  <p className="text-sm text-gray-700">Use biorhythm as a prompt to check in with yourself. How do you actually feel physically, emotionally, and mentally today?</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">4.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Don't Make Critical Decisions Based Solely on Biorhythm</h4>
                  <p className="text-sm text-gray-700">Use biorhythm as one factor among many, not as a definitive guide. Consider sleep quality, stress levels, health, and other real factors that affect performance.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">5.</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Have Fun With It</h4>
                  <p className="text-sm text-gray-700">Approach biorhythm with curiosity and playfulness rather than as a serious predictive tool. Share and compare charts with friends for interesting conversations.</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mt-6">
              Use our Biorhythm Calculator to explore your cycles and discover patterns in your physical, emotional, and intellectual states. Whether you view it as a scientific tool or an interesting self-reflection exercise, biorhythm can help you become more aware of your natural rhythms and plan your activities more mindfully!
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
            <p className="text-sm text-gray-600 mt-1">Discover your numerology</p>
          </a>
          
          <a 
            href="/chinese-zodiac-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🐉</div>
            <h3 className="font-semibold text-gray-900">Chinese Zodiac</h3>
            <p className="text-sm text-gray-600 mt-1">Find your zodiac animal</p>
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
        </div>
      </section>
    </div>
  );
}

