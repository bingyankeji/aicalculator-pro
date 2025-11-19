import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import ColorConverterCalculator from '@/components/Calculator/ColorConverterCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Color Converter - HEX, RGB, HSL, CMYK Converter | AICalculator',
  description: 'Free color converter tool to convert between HEX, RGB, HSL, CMYK, and HSV color formats. Pick colors, generate complementary colors, and copy color codes instantly.',
  keywords: [
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hsl to rgb',
    'rgb to hsl',
    'cmyk converter',
    'color picker',
    'hex color converter',
    'rgb color converter',
    'color code converter',
    'complementary color',
    'color format converter',
    'hex color picker',
    'color calculator',
    'color tool',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Color Converter - Convert HEX, RGB, HSL, CMYK',
    description: 'Convert colors between HEX, RGB, HSL, CMYK, and HSV formats instantly. Free online color converter tool.',
    type: 'website',
    url: getUrl('/color-converter'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('color-converter'),
      width: 1200,
      height: 630,
      alt: 'Color Converter',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Converter',
    description: 'Convert colors between multiple formats',
    images: [getOgImage('color-converter')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/color-converter'),
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
      '@id': getWebAppId('/color-converter'),
      name: 'Color Converter',
      url: getUrl('/color-converter'),
      description: 'Convert colors between HEX, RGB, HSL, CMYK, and HSV formats with visual color picker and complementary color generator.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'HEX to RGB conversion',
        'RGB to HEX conversion',
        'HSL color conversion',
        'CMYK color conversion',
        'HSV color conversion',
        'Visual color picker',
        'Complementary color generator',
        'Random color generator',
        'Copy color codes',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/color-converter'),
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
          name: 'Color Converter',
          item: getUrl('/color-converter'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/color-converter'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I convert HEX to RGB?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To convert HEX to RGB, enter your HEX color code (e.g., #3B82F6) in the color picker or HEX input field. The converter automatically displays the RGB values. HEX codes use hexadecimal notation where the first two digits represent red, the next two green, and the last two blue. For example, #3B82F6 converts to RGB(59, 130, 246).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between RGB and CMYK?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RGB (Red, Green, Blue) is an additive color model used for digital displays like screens and monitors. Colors are created by adding light. CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive color model used for printing. Colors are created by subtracting light through ink absorption. RGB is ideal for web and digital design, while CMYK is essential for print materials.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I find complementary colors?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Complementary colors are opposite each other on the color wheel, creating maximum contrast. Click the "Complementary" button in our converter to instantly generate the complementary color. Complementary colors are found by adding 180 degrees to the hue value in HSL format. For example, blue (240°) and orange (60°) are complementary colors.',
          },
        },
        {
          '@type': 'Question',
          name: 'What color formats does the converter support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our color converter supports five major color formats: HEX (hexadecimal, e.g., #3B82F6), RGB (Red, Green, Blue, e.g., rgb(59, 130, 246)), HSL (Hue, Saturation, Lightness, e.g., hsl(217, 91%, 60%)), CMYK (Cyan, Magenta, Yellow, Key, e.g., cmyk(76%, 47%, 0%, 4%)), and HSV (Hue, Saturation, Value). You can input in any format and instantly see all conversions.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/color-converter'),
      name: 'How to Use Color Converter',
      description: 'Convert colors between different formats in simple steps',
      totalTime: 'PT2M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Color Converter',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose Input Method',
          text: 'Select your preferred input method: use the visual color picker, or choose HEX, RGB, or HSL input format.',
          url: getStepUrl('/color-converter', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Enter Color Value',
          text: 'Enter your color value in the selected format, or use the color picker to visually select a color.',
          url: getStepUrl('/color-converter', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'View All Formats',
          text: 'Instantly see your color converted to all supported formats: HEX, RGB, HSL, CMYK, and HSV.',
          url: getStepUrl('/color-converter', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Copy or Generate',
          text: 'Copy any color format to your clipboard, generate complementary colors, or create random colors for inspiration.',
          url: getStepUrl('/color-converter', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/color-converter'),
      headline: 'Color Converter - Convert Between Color Formats',
      description: 'Complete guide to converting colors between HEX, RGB, HSL, CMYK, and HSV formats for web and print design.',
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
      image: getOgImage('color-converter'),
      articleBody: 'Color conversion is essential for designers and developers working across digital and print media...',
    },
  ],
};

export default function ColorConverterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Color Converter - HEX, RGB, HSL, CMYK Converter</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Color Converter"
        calculatorUrl="/color-converter"
      />

      <ColorConverterCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Color Formats</h2>
          <p className="text-gray-700 mb-4">
            Color conversion is a fundamental skill for designers, developers, and anyone working with digital or print media. Different platforms and applications use different color formats, making it essential to understand how to convert between them accurately.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Color Format Overview</h3>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">HEX (Hexadecimal)</h4>
            <p className="text-gray-700">
              HEX codes use base-16 notation with values from 0-9 and A-F. Format: #RRGGBB where RR=red, GG=green, BB=blue. Example: #3B82F6. Widely used in web development and CSS.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">RGB (Red, Green, Blue)</h4>
            <p className="text-gray-700">
              RGB is an additive color model using values 0-255 for each channel. Format: rgb(59, 130, 246). Perfect for digital displays, screens, and web design. Colors are created by adding light.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">HSL (Hue, Saturation, Lightness)</h4>
            <p className="text-gray-700">
              HSL uses hue (0-360°), saturation (0-100%), and lightness (0-100%). Format: hsl(217, 91%, 60%). More intuitive for humans, making it easier to create color variations and harmonies.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">CMYK (Cyan, Magenta, Yellow, Key)</h4>
            <p className="text-gray-700">
              CMYK is a subtractive color model used in printing. Values are percentages (0-100%). Format: cmyk(76%, 47%, 0%, 4%). Essential for print design as it represents ink colors on paper.
            </p>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">HSV (Hue, Saturation, Value)</h4>
            <p className="text-gray-700">
              HSV uses hue (0-360°), saturation (0-100%), and value/brightness (0-100%). Format: hsv(217, 76%, 96%). Popular in color pickers and image editing software.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">When to Use Each Format</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>HEX:</strong> Web development, CSS, HTML, email templates</li>
            <li><strong>RGB:</strong> Digital design, screen displays, web graphics, CSS rgba()</li>
            <li><strong>HSL:</strong> Creating color schemes, adjusting brightness/saturation, CSS</li>
            <li><strong>CMYK:</strong> Print design, brochures, business cards, magazines</li>
            <li><strong>HSV:</strong> Image editing, color picking, graphics software</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Color Theory Tips</h3>
          <ol className="list-decimal pl-6 mb-4 text-gray-700">
            <li>Use complementary colors (opposite on color wheel) for maximum contrast</li>
            <li>RGB values above 200 create light, pastel colors</li>
            <li>CMYK colors may appear different on screen vs. print—always test print samples</li>
            <li>HSL makes it easy to create lighter/darker versions by adjusting lightness</li>
            <li>For web accessibility, ensure sufficient contrast between text and background</li>
          </ol>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Common Conversions</h3>
          <p className="text-gray-700 mb-4">
            Our converter handles all common color format conversions instantly. Whether you're converting a HEX code from a design mockup to RGB for CSS, or converting RGB to CMYK for print, the tool provides accurate conversions with visual preview.
          </p>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/percentage-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">%</div>
            <h3 className="font-semibold text-gray-900">Percentage Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate percentages and ratios</p>
          </a>
          <a href="/ratio-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">Ratio Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate and simplify ratios</p>
          </a>
          <a href="/fraction-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🔢</div>
            <h3 className="font-semibold text-gray-900">Fraction Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Add, subtract, multiply fractions</p>
          </a>
          <a href="/unit-converter" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between different units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

