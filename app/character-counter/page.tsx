import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import CharacterCounterCalculator from '@/components/Calculator/CharacterCounterCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Character Counter - Count Characters, Words & Text Statistics | AICalculator',
  description: 'Free character counter tool to count characters, words, sentences, and paragraphs in real-time. Check social media character limits for Twitter, Facebook, Instagram, and more.',
  keywords: [
    'character counter',
    'word counter',
    'character count',
    'word count',
    'text counter',
    'letter counter',
    'character calculator',
    'twitter character counter',
    'character limit checker',
    'text statistics',
    'sentence counter',
    'paragraph counter',
    'social media character limit',
    'instagram character counter',
    'facebook character limit',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Character Counter - Count Characters & Words',
    description: 'Count characters, words, and check social media limits in real-time. Free online character counter tool.',
    type: 'website',
    url: getUrl('/character-counter'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('character-counter'),
      width: 1200,
      height: 630,
      alt: 'Character Counter',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Character Counter',
    description: 'Count characters and words in real-time',
    images: [getOgImage('character-counter')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/character-counter'),
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
      '@id': getWebAppId('/character-counter'),
      name: 'Character Counter',
      url: getUrl('/character-counter'),
      description: 'Real-time character counter to count characters, words, sentences, paragraphs, and check social media limits.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Real-time character counting',
        'Word count',
        'Sentence and paragraph count',
        'Social media character limits',
        'Twitter/X character counter',
        'Instagram character counter',
        'Facebook character limit checker',
        'SMS character counter',
        'Copy text and statistics',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/character-counter'),
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
          name: 'Character Counter',
          item: getUrl('/character-counter'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/character-counter'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the character counter work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The character counter analyzes your text in real-time as you type or paste. It counts characters with and without spaces, words, sentences, paragraphs, and lines. It also checks your text against social media character limits for platforms like Twitter (280 characters), Instagram (2,200 characters), Facebook (63,206 characters), LinkedIn (3,000 characters), and SMS (160 characters).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between characters with spaces and without spaces?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Characters with spaces counts every character including spaces, punctuation, and line breaks. Characters without spaces only counts letters, numbers, and punctuation, excluding all whitespace. Some platforms and requirements specify one or the other—for example, Twitter counts all characters including spaces, while some academic assignments may only count characters without spaces.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the character limits for social media platforms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Social media character limits vary by platform: Twitter/X allows 280 characters per tweet, Instagram captions can be up to 2,200 characters, Facebook posts support up to 63,206 characters, LinkedIn posts allow 3,000 characters, and standard SMS messages are limited to 160 characters. Our calculator shows real-time progress bars and remaining characters for each platform.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use this character counter for academic writing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, this character counter is perfect for academic writing. It provides word count, character count (with and without spaces), sentence count, and paragraph count—all essential metrics for essays, research papers, and assignments. Many academic requirements specify word or character limits, and our tool helps you stay within those boundaries while tracking your progress.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/character-counter'),
      name: 'How to Use Character Counter',
      description: 'Count characters and words in your text instantly',
      totalTime: 'PT1M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Character Counter',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter Your Text',
          text: 'Type or paste your text into the input box. The counter updates in real-time as you type.',
          url: getStepUrl('/character-counter', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'View Statistics',
          text: 'Instantly see character count (with/without spaces), word count, sentences, paragraphs, and more.',
          url: getStepUrl('/character-counter', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Check Social Media Limits',
          text: 'Review the social media section to see how your text fits within character limits for Twitter, Instagram, Facebook, LinkedIn, and SMS.',
          url: getStepUrl('/character-counter', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Copy or Save Results',
          text: 'Copy your text or statistics, save as an image, or print your results for future reference.',
          url: getStepUrl('/character-counter', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/character-counter'),
      headline: 'Character Counter - Real-Time Text Analysis Tool',
      description: 'Comprehensive guide to counting characters, words, and analyzing text for social media and writing.',
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
      image: getOgImage('character-counter'),
      articleBody: 'Character counting is essential for writers, social media managers, and content creators who need to meet specific length requirements...',
    },
  ],
};

export default function CharacterCounterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Character Counter - Count Characters, Words & Text Statistics</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Character Counter"
        calculatorUrl="/character-counter"
      />

      <CharacterCounterCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Character Counting</h2>
          <p className="text-gray-700 mb-4">
            Character counting is a fundamental tool for anyone working with text, from social media managers to academic writers. Whether you're crafting the perfect tweet, writing an essay with a strict word limit, or creating content for multiple platforms, knowing your character and word count is essential.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Social Media Character Limits</h3>
          <p className="text-gray-700 mb-4">
            Different social media platforms have varying character limits that you need to be aware of:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Twitter/X (280 characters):</strong> Originally 140, doubled in 2017. Emojis, links, and images count toward the limit.</li>
            <li><strong>Instagram (2,200 characters):</strong> Captions can be lengthy, but only the first 125 characters appear before "more."</li>
            <li><strong>Facebook (63,206 characters):</strong> Extremely generous limit, but posts over 400 characters are truncated in feeds.</li>
            <li><strong>LinkedIn (3,000 characters):</strong> Professional posts with substantial room for detailed content.</li>
            <li><strong>SMS (160 characters):</strong> Standard text message limit; longer messages are split into multiple texts.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Common Use Cases</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Social Media Management</h4>
            <p className="text-gray-700">
              Ensure your posts fit within platform limits while maximizing engagement. Studies show that tweets between 71-100 characters receive 17% more engagement than longer ones.
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Academic Writing</h4>
            <p className="text-gray-700">
              Meet word count requirements for essays, research papers, and assignments. Many institutions specify both minimum and maximum word counts that must be followed precisely.
            </p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Content Creation</h4>
            <p className="text-gray-700">
              Optimize meta descriptions (150-160 characters), email subject lines (40-50 characters), and ad copy for maximum impact within strict character limits.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Text Statistics Explained</h3>
          <p className="text-gray-700 mb-4">
            Our character counter provides comprehensive text analysis:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Characters with Spaces:</strong> Total count including all characters, spaces, and punctuation</li>
            <li><strong>Characters without Spaces:</strong> Only letters, numbers, and punctuation marks</li>
            <li><strong>Words:</strong> Total word count, useful for meeting writing requirements</li>
            <li><strong>Sentences:</strong> Number of complete sentences, indicates content structure</li>
            <li><strong>Paragraphs:</strong> Paragraph count, helps assess readability and organization</li>
            <li><strong>Lines:</strong> Total lines including blank lines</li>
            <li><strong>Average Word Length:</strong> Indicates vocabulary complexity and readability</li>
            <li><strong>Longest Word:</strong> Identifies the longest word in your text</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Tips for Effective Writing</h3>
          <ol className="list-decimal pl-6 mb-4 text-gray-700">
            <li>For Twitter, aim for 71-100 characters for maximum engagement</li>
            <li>Instagram captions should front-load important information in the first 125 characters</li>
            <li>Keep email subject lines under 50 characters for better open rates</li>
            <li>Meta descriptions should be 150-160 characters for optimal display in search results</li>
            <li>Use our real-time counter to stay within limits as you write</li>
          </ol>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/reading-time-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-gray-900">Reading Time Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate reading and speaking time</p>
          </a>
          <a href="/typing-speed-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⌨️</div>
            <h3 className="font-semibold text-gray-900">Typing Speed Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Test your typing speed and accuracy</p>
          </a>
          <a href="/percentage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages and ratios</p>
          </a>
          <a href="/time-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-semibold text-gray-900">Time Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add, subtract, and convert time</p>
          </a>
        </div>
      </section>
    </div>
  );
}

