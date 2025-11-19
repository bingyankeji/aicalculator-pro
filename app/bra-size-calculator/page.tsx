import type { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import BraSizeCalculator from '@/components/Calculator/BraSizeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Bra Size Calculator & Converter - Find Your Perfect Fit | AICalculator',
  description: 'Free bra size calculator and converter. Calculate bra size from measurements or convert between international sizes (US, UK, EU, FR, AU, JP). Get sister sizes and fit guide.',
  keywords: [
    'bra size calculator',
    'bra size converter',
    'bra size',
    'calculate bra size',
    'convert bra size',
    'bra size chart',
    'bra calculator',
    'bra sizing',
    'how to measure bra size',
    'bra fit calculator',
    'sister sizes',
    'bra size conversion',
    'US to UK bra size',
    'US to EU bra size',
    'EU bra size',
    'international bra size',
    'bra size guide',
    'cup size calculator',
    'band size calculator',
    'perfect bra fit',
    'bra measurement',
    'bra size finder',
    'correct bra size',
    'bra fit guide',
    'underwear calculator',
    'lingerie size converter',
    'bra cup size',
    'band size chart',
    'measure bra size',
    'find bra size',
    'bra sizing guide',
    'plus size bra calculator',
    'FR bra size',
    'AU bra size',
    'JP bra size',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Bra Size Calculator & Converter - Perfect Fit',
    description: 'Calculate from measurements or convert between international bra sizes. Get accurate sizing, sister sizes, and complete fit guide.',
    type: 'website',
    url: getUrl('/bra-size-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('bra-size'),
      width: 1200,
      height: 630,
      alt: 'Bra Size Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bra Size Calculator - Perfect Fit Guide',
    description: 'Calculate your bra size with international conversions, sister sizes, and professional fit guidance.',
    images: [getOgImage('bra-size')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/bra-size-calculator'),
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BraSizeCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/bra-size-calculator'),
        name: 'Bra Size Calculator & Converter',
        url: getUrl('/bra-size-calculator'),
        description: 'Calculate your bra size from measurements or convert between international sizing systems. Get size conversions, sister sizes, and a complete fit guide for finding your perfect bra.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Calculate bra size from bust and band measurements',
          'Convert existing sizes between international systems',
          'International size conversions (US/UK/EU/FR/AU/JP)',
          'Sister size recommendations',
          'Centimeters or inches input',
          'Cup size calculation',
          'Band size calculation',
          'Two calculation modes: measure or convert',
          'Fit guide and tips',
          'Measurement instructions with visual guide',
          'Real-time calculations',
          'Save and print results',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/bra-size-calculator'),
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
            name: 'Bra Size Calculator',
            item: getUrl('/bra-size-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/bra-size-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I measure my bra size accurately?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To measure your bra size accurately: 1) Wear a non-padded, well-fitting bra. 2) Measure band size: Use a soft measuring tape directly under your bust, keeping it snug but not tight. Round to the nearest whole number; if odd, add 1 to get an even number. 3) Measure bust size: Measure around the fullest part of your bust, keeping the tape parallel to the ground. 4) Calculate cup size: Subtract band size from bust size. Each inch of difference equals one cup size (1" = A, 2" = B, 3" = C, etc.). For example, if your underbust is 34 inches and bust is 37 inches, the difference is 3 inches, making you a 34C. Measure at the same time of day and avoid measuring during menstruation when breast size may fluctuate.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are sister sizes and when should I use them?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sister sizes are bra sizes with the same cup volume but different band sizes. When you go down one band size, you go up one cup size (and vice versa) to maintain the same cup volume. For example, 34C, 32D, and 36B are sister sizes. Use sister sizes when: your calculated size is unavailable, the band feels too tight or too loose, you\'re between sizes, or you want a different fit preference. If 34C feels too loose in the band, try 32D (tighter band, same cup volume). If too tight, try 36B (looser band, same volume). Sister sizes are particularly helpful with different bra styles and brands that fit differently. However, they\'re alternatives, not exact matches - always try them on to ensure proper fit.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do bra sizes differ between countries?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bra sizing systems vary significantly by country. US and UK use inches for band size, with similar sizing but UK DD is US D (UK uses double letters more). EU and FR use centimeters: EU adds approximately 10-15cm to underbust measurement, while FR adds about 15cm. Australia generally follows US sizing. Japan uses underbust in cm plus 65 for band size. For example, a US 34C converts to: UK 34C (same), EU 75C (34 inches × 2.54 + 10 ≈ 75cm), FR 90C (34 × 2.54 + 15 ≈ 90cm), AU 12C or 34C, JP 75C (similar to EU). Cup progression also varies: while US goes A, B, C, D, DD/E, UK may use DD, E, F where US uses DD, DDD/F, G. Always check brand-specific size charts as sizing can vary even within the same country.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why doesn\'t my calculated size fit properly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Several factors affect bra fit beyond calculations: 1) Brand variation - sizing isn\'t standardized; different brands fit differently even in the same size. 2) Bra style - push-up, balconette, full-coverage, sports, and wireless bras all fit differently. 3) Breast shape - affects fit as much as size. Breasts can be shallow, projected, wide-set, close-set, full-on-top, or full-on-bottom. 4) Tissue firmness - affects how cups fill. 5) Measurement timing - breast size fluctuates with menstrual cycle, weight changes, and age. 6) Measurement errors - incorrect tape placement or tension. 7) Wearing the wrong size previously - breast tissue may have migrated; proper fitting can correct this over time. If calculated size doesn\'t fit: try sister sizes, consult professional fitters, try multiple brands, and remember that calculator results are starting points, not guarantees.',
            },
          },
          {
            '@type': 'Question',
            name: 'How often should I measure and update my bra size?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Measure your bra size: every 6-12 months as a routine check, after weight changes of 10+ pounds (5+ kg), after pregnancy and breastfeeding, during adolescence (every 6 months), during menopause when hormone changes affect breast tissue, if your current bras feel uncomfortable, if you notice fit issues (spillage, gaps, band riding up), and when starting a new fitness regimen. Signs you need remeasuring: band rides up in back, straps constantly slip off, spillage over cups, gaps in cups, underwire pokes or digs in, you\'re constantly adjusting your bra, or back and shoulder pain. Breast size naturally fluctuates with menstrual cycle, so measure mid-cycle for most accurate results. Many women wear the wrong size for years - studies show 80% of women wear incorrect bra sizes. Regular measuring ensures optimal fit, comfort, and support.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the signs of a properly fitting bra?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A properly fitting bra has these characteristics: 1) Band: Fits snugly around ribcage on loosest hook (allowing for stretching over time), stays level around body without riding up, and you can fit two fingers under band but it shouldn\'t move more than 1 inch when pulled. 2) Cups: Fully contain breasts with no spillage over top or sides, no gaps or wrinkling in fabric, underwire (if present) follows natural breast crease without poking or pinching, and center gore (between cups) lies flat against sternum. 3) Straps: Stay in place without slipping, don\'t dig into shoulders, bear only 10-20% of breast weight (band should support 80-90%). 4) Overall comfort: Can wear all day without discomfort, allows full range of motion, doesn\'t require constant adjusting, and breasts feel supported without pain. If any element is off, try different sizes or styles.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/bra-size-calculator'),
        name: 'How to Calculate Your Bra Size',
        description: 'Step-by-step guide to measuring and calculating your perfect bra size.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Soft measuring tape',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Prepare for Measurement',
            text: 'Wear a non-padded, well-fitting bra (or your best-fitting current bra). Stand in front of a mirror with arms relaxed at your sides. Have a soft measuring tape ready. Measurements are most accurate mid-menstrual cycle when breasts are at their normal size. Remove bulky clothing that might interfere with measurements.',
            url: getStepUrl('/bra-size-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Measure Band Size',
            text: 'Wrap the measuring tape around your ribcage directly under your bust (underbust). Keep the tape snug but not tight - you should be able to fit two fingers under it. Ensure the tape is level all around your body and parallel to the ground. Breathe normally and take the measurement. Round to the nearest whole number. If the number is odd, add 1 to get an even number (bra bands are sold in even numbers).',
            url: getStepUrl('/bra-size-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Measure Bust Size',
            text: 'Wrap the measuring tape around the fullest part of your bust. This is typically at nipple level, but can vary based on breast shape. Keep the tape level and parallel to the ground, not too tight or too loose - it should lie flat against your skin without compressing breast tissue. Stand straight and breathe normally. Record the measurement to the nearest quarter inch or half centimeter.',
            url: getStepUrl('/bra-size-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Calculate Cup Size',
            text: 'Subtract your band size from your bust size. The difference determines your cup size: Less than 1" = AA, 1" = A, 2" = B, 3" = C, 4" = D, 5" = DD/E, 6" = DDD/F, 7" = G, 8" = H, and so on. For example, if your band is 34 inches and bust is 37 inches, the 3-inch difference means you\'re a C cup. Your complete size is 34C.',
            url: getStepUrl('/bra-size-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Find Sister Sizes',
            text: 'Sister sizes have the same cup volume but different band sizes. To find yours: go down one band size and up one cup size (34C → 32D), or go up one band size and down one cup size (34C → 36B). Sister sizes are useful when your calculated size isn\'t available or when you want a slightly different fit. Try on sister sizes along with your calculated size to find the most comfortable option.',
            url: getStepUrl('/bra-size-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Try On and Adjust',
            text: 'Try on bras in your calculated size and sister sizes. Check the fit: band should be snug on the loosest hook, cups should contain breasts fully without spillage or gaps, center gore should lie flat, straps shouldn\'t dig in, and you should be comfortable. Adjust straps so they\'re snug but not tight. Different brands and styles fit differently, so be prepared to try multiple options. When you find the right fit, note the brand and style for future purchases.',
            url: getStepUrl('/bra-size-calculator', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/bra-size-calculator'),
        headline: 'Bra Size Calculator: Find Your Perfect Fit with Measurements and Size Conversions',
        description: 'Comprehensive guide to calculating bra size, understanding international sizing, and achieving the perfect fit.',
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
        image: getOgImage('bra-size'),
        articleBody: 'Comprehensive guide covering bra size calculation, measurement techniques, international size conversions, sister sizes, fit assessment, and lingerie care.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Bra Size Calculator - Find Your Perfect Fit with Size Conversions</h1>
      
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Bra Size Calculator & Converter"
        calculatorUrl="/bra-size-calculator"
      />

      {/* Calculator Component */}
      <BraSizeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="prose prose-pink max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Complete Guide to Finding Your Perfect Bra Size</h2>
          
          <div className="bg-pink-50 border-l-4 border-pink-600 p-6 mb-8 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Finding the right bra size</strong> is essential for comfort, support, and confidence. Studies show that up to 80% 
              of women wear the wrong bra size, leading to discomfort, poor posture, and inadequate support. This comprehensive guide 
              will help you measure accurately, understand sizing systems, and find your perfect fit.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Bra Sizing</h3>
          <p className="text-gray-700 mb-4">
            Bra sizes consist of two components: the band size (number) and the cup size (letter). The band size represents the 
            circumference of your ribcage directly under your bust, while the cup size represents the volume of your breasts based 
            on the difference between your bust and band measurements.
          </p>

          <p className="text-gray-700 mb-6">
            For example, in size 34C, "34" is the band size in inches (the measurement around your ribcage under your bust), and 
            "C" is the cup size (indicating a 3-inch difference between bust and band measurements). Understanding this system is 
            the first step to finding your perfect fit.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Measure Your Bra Size</h3>
          
          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What You'll Need</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Soft measuring tape:</strong> Cloth or soft plastic, not rigid metal</li>
            <li><strong>Mirror:</strong> Full-length or large enough to see your torso</li>
            <li><strong>Non-padded bra:</strong> Your best-fitting current bra</li>
            <li><strong>Helper (optional):</strong> Makes measurement easier and more accurate</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Step-by-Step Measurement Guide</h4>
          
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-gray-900 mb-4">Step 1: Measure Band Size</h5>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-pink-600 flex-shrink-0">1.</span>
                <span>Stand straight with arms relaxed at your sides</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-pink-600 flex-shrink-0">2.</span>
                <span>Wrap the tape around your ribcage directly under your bust (underbust)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-pink-600 flex-shrink-0">3.</span>
                <span>Keep the tape level and parallel to the ground</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-pink-600 flex-shrink-0">4.</span>
                <span>The tape should be snug but not tight - you should be able to fit two fingers underneath</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-pink-600 flex-shrink-0">5.</span>
                <span>Breathe normally and take the measurement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-pink-600 flex-shrink-0">6.</span>
                <span>Round to the nearest whole number; if odd, add 1 (band sizes are even)</span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-gray-900 mb-4">Step 2: Measure Bust Size</h5>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">1.</span>
                <span>Wear your best-fitting, non-padded bra</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">2.</span>
                <span>Wrap the tape around the fullest part of your bust (typically at nipple level)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">3.</span>
                <span>Keep the tape level and parallel to the ground</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">4.</span>
                <span>Don't pull the tape too tight - it should lie flat without compressing breast tissue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">5.</span>
                <span>Stand straight with arms at your sides</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600 flex-shrink-0">6.</span>
                <span>Record the measurement to the nearest quarter inch or half centimeter</span>
              </li>
            </ol>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cup Size Calculation</h4>
          <p className="text-gray-700 mb-4">
            Cup size is determined by the difference between your bust and band measurements:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Difference</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Cup Size</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Less than 1"</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">AA</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Band 34" + Bust 34.5" = 34AA</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">1 inch (2.5 cm)</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">A</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Band 34" + Bust 35" = 34A</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">2 inches (5 cm)</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">B</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Band 34" + Bust 36" = 34B</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">3 inches (7.5 cm)</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">C</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Band 34" + Bust 37" = 34C</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">4 inches (10 cm)</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">D</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Band 34" + Bust 38" = 34D</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">5 inches (12.5 cm)</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">DD/E</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Band 34" + Bust 39" = 34DD</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">6 inches (15 cm)</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">DDD/F</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Band 34" + Bust 40" = 34DDD</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">7+ inches (17.5+ cm)</td>
                  <td className="px-6 py-4 text-sm font-medium text-pink-700">G, H, I, J, K...</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Continue alphabet progression</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">International Bra Size Conversions</h3>
          <p className="text-gray-700 mb-4">
            Bra sizing systems vary significantly between countries. Here's how to convert between major sizing systems:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">US</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">UK</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">EU</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">FR</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">AU</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">JP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-gray-700">30B</td>
                  <td className="px-4 py-3 text-gray-700">30B</td>
                  <td className="px-4 py-3 text-gray-700">65B</td>
                  <td className="px-4 py-3 text-gray-700">80B</td>
                  <td className="px-4 py-3 text-gray-700">8B/30B</td>
                  <td className="px-4 py-3 text-gray-700">65B</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">32C</td>
                  <td className="px-4 py-3 text-gray-700">32C</td>
                  <td className="px-4 py-3 text-gray-700">70C</td>
                  <td className="px-4 py-3 text-gray-700">85C</td>
                  <td className="px-4 py-3 text-gray-700">10C/32C</td>
                  <td className="px-4 py-3 text-gray-700">70C</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">34C</td>
                  <td className="px-4 py-3 text-gray-700">34C</td>
                  <td className="px-4 py-3 text-gray-700">75C</td>
                  <td className="px-4 py-3 text-gray-700">90C</td>
                  <td className="px-4 py-3 text-gray-700">12C/34C</td>
                  <td className="px-4 py-3 text-gray-700">75C</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">36D</td>
                  <td className="px-4 py-3 text-gray-700">36D</td>
                  <td className="px-4 py-3 text-gray-700">80D</td>
                  <td className="px-4 py-3 text-gray-700">95D</td>
                  <td className="px-4 py-3 text-gray-700">14D/36D</td>
                  <td className="px-4 py-3 text-gray-700">80D</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">38DD</td>
                  <td className="px-4 py-3 text-gray-700">38DD</td>
                  <td className="px-4 py-3 text-gray-700">85E</td>
                  <td className="px-4 py-3 text-gray-700">100E</td>
                  <td className="px-4 py-3 text-gray-700">16DD/38DD</td>
                  <td className="px-4 py-3 text-gray-700">85E</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Sister Sizes</h3>
          <p className="text-gray-700 mb-4">
            Sister sizes are alternative bra sizes that have the same cup volume but different band sizes. This concept is incredibly 
            useful when your calculated size is unavailable or when you're between sizes.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How Sister Sizes Work</h4>
          <p className="text-gray-700 mb-4">
            When you decrease the band size by one (2 inches), you increase the cup size by one letter to maintain the same cup volume. 
            Conversely, when you increase the band size, you decrease the cup size. For example:
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Sister Size Examples:</h5>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <span className="font-bold text-blue-700">32D</span>
                <span className="text-gray-400">↔</span>
                <span className="font-bold text-pink-700">34C</span>
                <span className="text-gray-400">↔</span>
                <span className="font-bold text-blue-700">36B</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-blue-700">30DD</span>
                <span className="text-gray-400">↔</span>
                <span className="font-bold text-pink-700">32D</span>
                <span className="text-gray-400">↔</span>
                <span className="font-bold text-blue-700">34C</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-blue-700">34B</span>
                <span className="text-gray-400">↔</span>
                <span className="font-bold text-pink-700">36A</span>
                <span className="text-gray-400">↔</span>
                <span className="font-bold text-blue-700">38AA</span>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">When to Use Sister Sizes</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Size unavailable:</strong> When your calculated size is out of stock</li>
            <li><strong>Band too tight:</strong> Go up one band size and down one cup size</li>
            <li><strong>Band too loose:</strong> Go down one band size and up one cup size</li>
            <li><strong>Between sizes:</strong> Try sister sizes to find the best fit</li>
            <li><strong>Brand variations:</strong> Different brands fit differently; sister sizes provide options</li>
            <li><strong>Style differences:</strong> Different bra styles (push-up, sports, wireless) may require sister sizes</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Signs of a Perfect Fit</h3>
          <p className="text-gray-700 mb-4">
            A properly fitting bra should be comfortable all day and provide adequate support. Here's what to look for:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-green-900 mb-3">✓ Good Fit Indicators</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Band stays level around body</li>
                <li>• Band fits snugly on loosest hook</li>
                <li>• Cups contain breasts fully</li>
                <li>• No spillage or gaps</li>
                <li>• Center gore lies flat</li>
                <li>• Underwire follows breast crease</li>
                <li>• Straps stay in place</li>
                <li>• Comfortable all day</li>
                <li>• Can move freely</li>
                <li>• Minimal adjusting needed</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-red-900 mb-3">✗ Poor Fit Warning Signs</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Band rides up in back</li>
                <li>• Band is too tight or loose</li>
                <li>• Breast tissue spills over cups</li>
                <li>• Gaps or wrinkling in cups</li>
                <li>• Center gore doesn't touch skin</li>
                <li>• Underwire pokes or digs</li>
                <li>• Straps slip off or dig in</li>
                <li>• Uncomfortable or painful</li>
                <li>• Constantly need to adjust</li>
                <li>• Back or shoulder pain</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Bra Fitting Mistakes</h3>
          
          <div className="space-y-4 mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Mistake 1: Wearing the Wrong Band Size</h5>
              <p className="text-sm text-gray-700">
                <strong>Problem:</strong> Many women wear bands that are too large, relying on straps for support. The band should 
                provide 80-90% of breast support.<br />
                <strong>Solution:</strong> Ensure band is snug on loosest hook. If it rides up or moves more than 1 inch when pulled, 
                it's too loose.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Mistake 2: Assuming Cup Size is Static</h5>
              <p className="text-sm text-gray-700">
                <strong>Problem:</strong> Cup size is relative to band size. A 32D has smaller cups than a 38D, though both are "D cups."<br />
                <strong>Solution:</strong> Always consider band and cup size together. Understand sister sizes for accurate fit across 
                different band sizes.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Mistake 3: Not Adjusting for Brand Differences</h5>
              <p className="text-sm text-gray-700">
                <strong>Problem:</strong> Bra sizing isn't standardized. Different brands fit differently even in the same size.<br />
                <strong>Solution:</strong> Always try on bras before buying. Keep notes on which brands run large, small, or true to size 
                for your body.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Mistake 4: Ignoring Breast Shape</h5>
              <p className="text-sm text-gray-700">
                <strong>Problem:</strong> Breast shape (shallow, projected, wide-set, close-set) affects fit as much as size.<br />
                <strong>Solution:</strong> Try different bra styles. Balconette, plunge, full-coverage, and demi bras suit different breast shapes.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Bra Styles and When to Wear Them</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2">T-Shirt / Seamless Bra</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Best For:</strong> Everyday wear, fitted clothing</p>
              <p className="text-sm text-gray-600">Smooth cups create a seamless look under clothing. Molded or lightly padded cups prevent show-through.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Full-Coverage / Support Bra</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Best For:</strong> Larger busts, all-day support</p>
              <p className="text-sm text-gray-600">Covers entire breast, provides maximum support and containment. Often features wide straps and reinforced band.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Push-Up / Padded Bra</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Best For:</strong> Adding volume, enhancing cleavage</p>
              <p className="text-sm text-gray-600">Padding at bottom of cups lifts breasts. Creates fuller appearance and enhances décolletage.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Balconette / Demi Bra</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Best For:</strong> V-neck, scoop-neck tops</p>
              <p className="text-sm text-gray-600">Lower cut with wider-set straps. Shows more cleavage while providing good support. Great for low necklines.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Sports Bra</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Best For:</strong> Exercise, high-impact activities</p>
              <p className="text-sm text-gray-600">Minimizes breast movement during physical activity. Compression or encapsulation styles available.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-2">Wireless / Bralette</h4>
              <p className="text-sm text-gray-700 mb-2"><strong>Best For:</strong> Comfort, lounging, smaller busts</p>
              <p className="text-sm text-gray-600">No underwire for maximum comfort. Softer support, great for home wear and smaller cup sizes.</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Caring for Your Bras</h3>
          <p className="text-gray-700 mb-4">
            Proper care extends bra lifespan and maintains shape and support:
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Washing and Drying</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Hand wash preferred:</strong> Use lukewarm water and gentle detergent. Swish and squeeze gently, don't wring</li>
            <li><strong>Machine wash (if necessary):</strong> Use lingerie bag, gentle cycle, cold water, and hook bras closed</li>
            <li><strong>Air dry only:</strong> Never machine dry. Heat damages elastic and shape. Lay flat or hang by center gore</li>
            <li><strong>Wash frequency:</strong> After 2-3 wears, or after sweating. Rotate bras to avoid wearing same one consecutively</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Storage</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Keep shape:</strong> Never fold cups. Stack bras or lay flat in drawer</li>
            <li><strong>Organize:</strong> Store by type or frequency of use for easy access</li>
            <li><strong>Protect:</strong> Keep away from rough fabrics that can snag delicate materials</li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">When to Replace</h4>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Every 6-12 months:</strong> Regular wear stretches elastic and reduces support</li>
            <li><strong>Signs to replace:</strong> Band no longer fits on tightest hook, cups lose shape, underwire pokes through, straps lose elasticity</li>
            <li><strong>Rotate collection:</strong> Own 3-5 everyday bras to extend lifespan of each</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Professional Bra Fitting</h3>
          <p className="text-gray-700 mb-4">
            While this calculator provides accurate estimates, professional fitting is highly recommended:
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Benefits of Professional Fitting:</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Expert assessment of breast shape and tissue distribution</li>
              <li>• Personalized recommendations for styles that suit your body</li>
              <li>• Adjustment guidance and fit troubleshooting</li>
              <li>• Access to wide range of sizes including hard-to-find options</li>
              <li>• Brand-specific knowledge and sizing variations</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4">
            Consider professional fitting if you're pregnant, nursing, experiencing weight changes, post-surgery, or simply can't find 
            a comfortable fit. Many lingerie stores and department stores offer free fitting services.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resources and Further Information</h3>
          <p className="text-gray-700 mb-4">
            For additional information on bra fitting and sizing:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <a 
                href="https://www.nationwidechildrens.org/family-resources-education/health-wellness-and-safety-resources/patient-resources" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Nationwide Children's Hospital - Adolescent Health Resources
              </a>
            </li>
            <li>
              <a 
                href="https://www.breastcancer.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Breastcancer.org - Post-Surgery Fitting Information
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/shoe-size-conversion" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">👟</div>
            <h3 className="font-semibold text-gray-900">Shoe Size Conversion</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between international shoe sizes</p>
          </a>
          
          <a 
            href="/bmi-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate body mass index</p>
          </a>
          
          <a 
            href="/body-fat-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate body fat percentage</p>
          </a>
          
          <a 
            href="/ideal-weight-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Ideal Weight Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your ideal weight range</p>
          </a>
        </div>
      </section>
    </div>
  );
}

