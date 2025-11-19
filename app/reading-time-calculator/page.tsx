import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ReadingTimeCalculator from '@/components/Calculator/ReadingTimeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Reading Time Calculator - Estimate Reading & Speaking Time | AICalculator',
  description: 'Free reading time calculator to estimate how long it takes to read any text. Calculate word count, character count, reading time for different speeds, and speaking time for presentations.',
  keywords: [
    'reading time calculator',
    'word counter',
    'character counter',
    'reading speed calculator',
    'text analyzer',
    'word count tool',
    'speaking time calculator',
    'presentation timer',
    'words per minute',
    'WPM calculator',
    'text statistics',
    'reading duration',
    'audiobook length',
    'speech time calculator',
    'article reading time',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Reading Time Calculator - Estimate Reading & Speaking Time',
    description: 'Calculate reading time, word count, and text statistics instantly. Perfect for writers, speakers, and content creators.',
    type: 'website',
    url: getUrl('/reading-time-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('reading-time'),
      width: 1200,
      height: 630,
      alt: 'Reading Time Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reading Time Calculator',
    description: 'Calculate reading time and text statistics instantly',
    images: [getOgImage('reading-time')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/reading-time-calculator'),
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/reading-time-calculator'),
      name: 'Reading Time Calculator',
      url: getUrl('/reading-time-calculator'),
      description: 'Calculate reading time, word count, character count, and text statistics for any text.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Reading time estimation',
        'Word count',
        'Character count',
        'Sentence and paragraph count',
        'Speaking time calculation',
        'Multiple reading speeds',
        'Text statistics',
        'Real-time analysis',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/reading-time-calculator'),
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
          name: 'Other',
          item: getUrl('/other'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Reading Time Calculator',
          item: getUrl('/reading-time-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/reading-time-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is reading time calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reading time is calculated by dividing the total word count by the reading speed (words per minute). The average adult reads at 200-250 words per minute for silent reading. For example, a 1,000-word article would take approximately 4-5 minutes to read at average speed. Speaking time is calculated at 150 words per minute, which is the typical pace for presentations and public speaking.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the average reading speed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The average reading speed for adults is 200-250 words per minute (WPM) for silent reading. Slow readers typically read at 200 WPM, while fast readers can reach 300+ WPM. For speaking and presentations, the average speed is 150 WPM. Speed reading techniques can increase reading speed to 400-700 WPM, though comprehension may decrease at very high speeds.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I use the Reading Time Calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply paste or type your text into the input box and click Calculate. The calculator will instantly show reading times for slow, average, and fast readers, plus speaking time. It also provides detailed text statistics including word count, character count, sentence count, and paragraph count. You can adjust the average reading speed if needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is speaking time and how is it different from reading time?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Speaking time is the estimated duration for reading text aloud, calculated at 150 words per minute—slower than silent reading. This accounts for natural pauses, pronunciation, and emphasis needed in speech. Speaking time is essential for presentations, audiobook recordings, and public speaking. For presentations with visual aids, add 20% more time for pauses and audience interaction.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/reading-time-calculator'),
      name: 'How to Use Reading Time Calculator',
      description: 'Calculate reading time and text statistics in simple steps',
      totalTime: 'PT2M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Reading Time Calculator',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter Your Text',
          text: 'Paste or type the text you want to analyze into the text input box. The calculator accepts any length of text.',
          url: getStepUrl('/reading-time-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Adjust Reading Speed (Optional)',
          text: 'Optionally adjust the average reading speed in words per minute. The default is 250 WPM, which is suitable for most readers.',
          url: getStepUrl('/reading-time-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Click Calculate',
          text: 'Click the Calculate button to analyze your text and generate reading time estimates.',
          url: getStepUrl('/reading-time-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Review Results',
          text: 'View reading times for different speeds (slow, average, fast), speaking time, and comprehensive text statistics including word count, character count, and more.',
          url: getStepUrl('/reading-time-calculator', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/reading-time-calculator'),
      headline: 'Reading Time Calculator - Estimate Reading and Speaking Duration',
      description: 'Comprehensive guide to calculating reading time, understanding reading speeds, and analyzing text statistics.',
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
      dateModified: '2024-11-19',
      image: getOgImage('reading-time'),
      articleBody: 'Reading time calculation helps writers, content creators, and speakers estimate how long it takes to read or present text...',
    },
  ],
};

export default function ReadingTimeCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Reading Time Calculator - Estimate Reading & Speaking Time</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Reading Time Calculator"
        calculatorUrl="/reading-time-calculator"
      />

      <ReadingTimeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Reading Time</h2>
          <p className="text-gray-700 mb-4">
            Reading time estimation is essential for content creators, writers, speakers, and anyone who needs to know how long it takes to consume written content. Whether you're preparing a presentation, writing a blog post, or recording an audiobook, understanding reading time helps you plan and structure your content effectively.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Reading Speed Standards</h3>
          <p className="text-gray-700 mb-4">
            Reading speed varies significantly based on the reader's skill level, the complexity of the text, and the purpose of reading:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Slow Reading (200 WPM):</strong> Careful reading with high comprehension, suitable for technical or complex material</li>
            <li><strong>Average Reading (250 WPM):</strong> Standard silent reading speed for most adults reading general content</li>
            <li><strong>Fast Reading (300+ WPM):</strong> Experienced readers or speed readers, may sacrifice some comprehension</li>
            <li><strong>Speaking Speed (150 WPM):</strong> Natural pace for presentations, public speaking, and audiobook narration</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Use Cases</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Content Writing</h4>
            <p className="text-gray-700">
              Add reading time estimates to blog posts and articles to help readers decide if they have time to read. Studies show that displaying reading time increases engagement by 20-30%.
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Public Speaking</h4>
            <p className="text-gray-700">
              Calculate speaking time for presentations, speeches, and lectures. Remember to add 20-30% extra time for pauses, audience interaction, and visual aids.
            </p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Audiobook Production</h4>
            <p className="text-gray-700">
              Estimate recording time for audiobooks and voice-over projects. Professional narrators typically read at 150-160 WPM for optimal clarity.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Text Statistics Explained</h3>
          <p className="text-gray-700 mb-4">
            Our calculator provides comprehensive text analysis beyond just reading time:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Word Count:</strong> Total number of words, essential for meeting content requirements</li>
            <li><strong>Character Count:</strong> Total characters including spaces, important for social media limits</li>
            <li><strong>Character Count (No Spaces):</strong> Characters excluding spaces, used in some publishing standards</li>
            <li><strong>Sentence Count:</strong> Number of sentences, helps assess readability</li>
            <li><strong>Paragraph Count:</strong> Number of paragraphs, indicates content structure</li>
            <li><strong>Average Word Length:</strong> Indicates text complexity; longer words suggest more advanced vocabulary</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Tips for Accurate Estimates</h3>
          <p className="text-gray-700 mb-4">
            To get the most accurate reading time estimates:
          </p>
          <ol className="list-decimal pl-6 mb-4 text-gray-700">
            <li>Use the appropriate reading speed for your audience and content type</li>
            <li>Add extra time for technical or complex content</li>
            <li>For presentations, increase speaking time by 20-30% for pauses and interaction</li>
            <li>Consider that reading speed decreases on screens compared to print</li>
            <li>Account for the reader's familiarity with the subject matter</li>
          </ol>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/character-counter" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900">Character Counter</h3>
            <p className="text-sm text-gray-600 mt-1">Count characters and words in real-time</p>
          </a>
          <a href="/typing-speed-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⌨️</div>
            <h3 className="font-semibold text-gray-900">Typing Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Test your typing speed and accuracy</p>
          </a>
          <a href="/time-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-gray-900">Time Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add, subtract, and convert time</p>
          </a>
          <a href="/percentage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages and ratios</p>
          </a>
        </div>
      </section>
    </div>
  );
}

