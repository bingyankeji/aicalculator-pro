import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import DressSizeConverter from '@/components/Calculator/DressSizeConverter';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Dress Size Converter - International Size Chart | AICalculator',
  description: 'Free dress size converter to convert clothing sizes between US, UK, EU, China, and Japan. Get accurate size conversions for tops, dresses, pants, and more.',
  keywords: [
    'dress size converter',
    'clothing size converter',
    'international size chart',
    'size conversion chart',
    'US to EU size',
    'UK to US size',
    'clothing size calculator',
    'dress size chart',
    'size converter',
    'women size chart',
    'men size chart',
    'pants size converter',
    'shirt size converter',
    'international clothing sizes',
    'size guide',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Dress Size Converter - International Size Chart',
    description: 'Convert clothing sizes between US, UK, EU, CN, and JP instantly. Free international size converter.',
    type: 'website',
    url: getUrl('/dress-size-converter'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('dress-size'),
      width: 1200,
      height: 630,
      alt: 'Dress Size Converter',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dress Size Converter',
    description: 'Convert clothing sizes between countries',
    images: [getOgImage('dress-size')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/dress-size-converter'),
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
      '@id': getWebAppId('/dress-size-converter'),
      name: 'Dress Size Converter',
      url: getUrl('/dress-size-converter'),
      description: 'Convert clothing sizes between US, UK, EU, China, and Japan sizing systems for tops, bottoms, dresses, and pants.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'US to EU size conversion',
        'UK to US size conversion',
        'International size chart',
        'Women\'s clothing sizes',
        'Men\'s clothing sizes',
        'Complete size tables',
        'Multiple clothing types',
        'Measurement guide',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/dress-size-converter'),
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
          name: 'Dress Size Converter',
          item: getUrl('/dress-size-converter'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/dress-size-converter'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I convert US dress size to EU?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To convert US dress sizes to EU, add 30 to the US size for most women\'s clothing. For example, US size 8 equals EU size 38. However, this is a general rule and can vary by brand and clothing type. Our converter provides accurate conversions across all major sizing systems including US, UK, EU, China, and Japan.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are clothing sizes the same across all brands?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, clothing sizes can vary significantly between brands, even within the same country. This is known as "vanity sizing" or size inconsistency. Always check each brand\'s specific size chart when possible. Our converter provides standard international conversions as a starting point, but individual brand measurements may differ by 1-2 sizes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What measurements do I need to find my size?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For accurate sizing, measure your bust/chest, waist, and hips in inches or centimeters. For tops, bust and waist are most important. For bottoms, focus on waist and hip measurements. Use a soft measuring tape, keep it parallel to the floor, and measure in the morning for consistency. Compare your measurements to size charts rather than relying solely on your usual size.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do Chinese clothing sizes compare to US sizes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Chinese sizes typically run smaller than US sizes. A Chinese size L often equals a US size S or M. Chinese sizing also uses a different numbering system (e.g., 165/88A) where the first number is height in cm and the second is bust/waist measurement. When shopping from Chinese retailers, always check measurements in centimeters and size up 1-2 sizes from your US size.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/dress-size-converter'),
      name: 'How to Use Dress Size Converter',
      description: 'Convert clothing sizes between international sizing systems',
      totalTime: 'PT2M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Dress Size Converter',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Clothing Type',
          text: 'Choose the type of clothing you want to convert: women\'s tops/dresses, women\'s bottoms, men\'s tops/shirts, or men\'s bottoms/pants.',
          url: getStepUrl('/dress-size-converter', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose Your Region',
          text: 'Select the sizing system you currently know: US, UK, EU, China (CN), or Japan (JP).',
          url: getStepUrl('/dress-size-converter', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Enter Your Size',
          text: 'Type in your size in the selected region\'s format (e.g., S, M, 8, 38).',
          url: getStepUrl('/dress-size-converter', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'View Conversions',
          text: 'See your size converted to all international sizing systems with a complete size chart for reference.',
          url: getStepUrl('/dress-size-converter', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/dress-size-converter'),
      headline: 'Dress Size Converter - International Clothing Size Guide',
      description: 'Complete guide to converting clothing sizes between US, UK, EU, China, and Japan sizing systems.',
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
      image: getOgImage('dress-size'),
      articleBody: 'International clothing size conversion is essential for online shopping and international travel...',
    },
  ],
};

export default function DressSizeConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Dress Size Converter - International Size Chart</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Dress Size Converter"
        calculatorUrl="/dress-size-converter"
      />

      <DressSizeConverter />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding International Clothing Sizes</h2>
          <p className="text-gray-700 mb-4">
            International clothing size conversion can be confusing when shopping online or traveling abroad. Different countries use different sizing systems, and even within the same country, sizes can vary between brands. Our converter helps you navigate these differences with accurate conversions.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Major Sizing Systems</h3>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">United States (US)</h4>
            <p className="text-gray-700">
              US sizes use numerical sizing (0, 2, 4, 6, 8, etc.) for women and letter sizes (XS, S, M, L, XL) or chest measurements for men. US sizes tend to run larger than European sizes.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">United Kingdom (UK)</h4>
            <p className="text-gray-700">
              UK sizes are typically 2 sizes larger than US sizes for women (US 8 = UK 12). Men's sizing is similar to US but may vary by brand.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">European Union (EU)</h4>
            <p className="text-gray-700">
              EU sizes use a different numbering system (34, 36, 38, 40, etc.). Generally, add 30 to US women's sizes to get EU sizes (US 8 = EU 38). Men's sizing uses chest measurements in centimeters.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">China (CN)</h4>
            <p className="text-gray-700">
              Chinese sizes typically run 1-2 sizes smaller than US sizes. They often use a height/measurement system (e.g., 165/88A where 165 is height in cm). Always check measurements when buying from Chinese retailers.
            </p>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Japan (JP)</h4>
            <p className="text-gray-700">
              Japanese sizes run small compared to Western sizes. A Japanese M is often equivalent to a US XS or S. Japanese sizing uses numbers (5, 7, 9, 11) or letters (S, M, L).
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How to Measure Yourself</h3>
          <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2">
            <li><strong>Bust/Chest:</strong> Measure around the fullest part of your chest, keeping the tape parallel to the floor</li>
            <li><strong>Waist:</strong> Measure around your natural waistline (smallest part of your torso)</li>
            <li><strong>Hips:</strong> Measure around the fullest part of your hips and buttocks</li>
            <li><strong>Inseam:</strong> For pants, measure from crotch to ankle along the inside of your leg</li>
            <li><strong>Tips:</strong> Measure in the morning, wear minimal clothing, don't pull the tape too tight</li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Size Conversion Tips</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Always check the specific brand's size chart when available</li>
            <li>Read customer reviews for sizing feedback</li>
            <li>When between sizes, size up for a more comfortable fit</li>
            <li>Consider the fabric—stretchy materials are more forgiving</li>
            <li>Asian sizes (China, Japan) typically run smaller—size up 1-2 sizes</li>
            <li>Luxury brands may have different sizing than fast fashion</li>
            <li>Vintage clothing often uses older sizing standards (smaller)</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Common Sizing Challenges</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Vanity Sizing</h4>
            <p className="text-gray-700 mb-2">
              Many brands use "vanity sizing" where sizes are labeled smaller than actual measurements to make customers feel better. This means a size 8 from one brand may fit like a size 10 from another.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Body Shape Variations</h4>
            <p className="text-gray-700 mb-2">
              Standard sizes assume certain body proportions. If you have a different body shape (pear, apple, hourglass, etc.), you may need different sizes for tops and bottoms.
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/shoe-size-conversion" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">👟</div>
            <h3 className="font-semibold text-gray-900">Shoe Size Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert shoe sizes internationally</p>
          </a>
          <a href="/bmi-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate body mass index</p>
          </a>
          <a href="/body-fat-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate body fat percentage</p>
          </a>
          <a href="/unit-converter" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert measurements and units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

