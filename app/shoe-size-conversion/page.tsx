import { Metadata } from 'next';
import ShoeSizeConverter from '@/components/Calculator/ShoeSizeConverter';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Shoe Size Conversion - Convert US, EU, UK, CN, JP Sizes | AICalculator',
  description: 'Free shoe size converter for US, EU, UK, CN, JP sizes. Convert mens, womens, and kids shoe sizes with accurate length measurements. Save your family shoe sizes.',
  keywords: [
    'shoe size conversion',
    'shoe size converter',
    'US to EU shoe size',
    'UK to US shoe size',
    'shoe size chart',
    'international shoe size',
    'mens shoe size conversion',
    'womens shoe size conversion',
    'kids shoe size conversion',
    'convert shoe sizes',
    'shoe size calculator',
    'EU to US size',
    'cm to shoe size',
    'foot length to shoe size',
    'shoe sizing guide',
    'shoe measurement converter',
    'global shoe sizes',
    'shoe size comparison',
    'footwear size conversion',
    'shoe size translator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Shoe Size Conversion - Convert US, EU, UK, CN, JP Sizes',
    description: 'Convert shoe sizes between US, EU, UK, CN, JP standards. Accurate conversion for mens, womens, and kids footwear with sizing tips.',
    type: 'website',
    url: getUrl('/shoe-size-conversion'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('shoe-size'),
      width: 1200,
      height: 630,
      alt: 'Shoe Size Conversion'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shoe Size Conversion - Convert US, EU, UK, CN, JP Sizes',
    description: 'Convert shoe sizes between US, EU, UK, CN, JP standards. Accurate conversion for mens, womens, and kids footwear with sizing tips.',
    images: [getOgImage('shoe-size')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/shoe-size-conversion'),
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

export default function ShoeSizeConversionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/shoe-size-conversion'),
        name: 'Shoe Size Conversion',
        url: getUrl('/shoe-size-conversion'),
        description: 'Free online shoe size converter supporting US, EU, UK, CN, JP standards for mens, womens, and kids footwear with accurate measurements.',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Convert between 6 shoe size standards',
          'Mens, womens, and kids sizes',
          'Accurate foot length measurements',
          'Save family shoe sizes',
          'Foot measurement guide',
          'Brand-specific sizing tips',
          'Width fitting recommendations',
          'International size comparison',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/shoe-size-conversion'),
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
            name: 'Shoe Size Conversion',
            item: getUrl('/shoe-size-conversion'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/shoe-size-conversion'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I convert my US shoe size to EU?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To convert US to EU shoe sizes: For mens shoes, add approximately 33 to your US size (e.g., US 9 = EU 42). For womens shoes, add approximately 31 (e.g., US 8 = EU 39). However, exact conversions vary slightly by brand and style. Use our calculator for precise conversions based on actual foot length in centimeters. The EU sizing system is based on Paris Points (⅔ cm), providing more granular sizing than US whole and half sizes.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between mens and womens shoe sizing?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In the US system, mens and womens sizes differ by approximately 1.5 sizes for the same foot length. A US mens size 8 equals approximately US womens size 9.5. This difference exists because sizing scales originated separately. EU sizes are unisex and based on actual foot length, eliminating confusion. When converting between standards, always specify gender to ensure accurate results. Width designations also differ—mens shoes typically come in wider widths than womens shoes of the same length.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I measure my foot size accurately?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To measure feet accurately: 1) Measure in the afternoon when feet are largest due to swelling. 2) Stand on paper with heel against a wall, wearing socks you will wear with shoes. 3) Mark the position of your longest toe. 4) Measure from wall to mark in centimeters. 5) Add 0.5-1 cm for toe room. 6) Measure both feet and use the larger measurement. 7) Compare to size charts for the specific brand. Feet can change over time, so remeasure every few years or if shoes feel uncomfortable.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why do shoe sizes vary between brands?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Shoe sizes vary between brands because: 1) No universal manufacturing standards exist—each brand creates their own lasts (foot-shaped molds). 2) Different countries have different sizing systems that brands adapt inconsistently. 3) Shoe style affects fit—athletic shoes typically run larger than dress shoes. 4) Width variations are not standardized. 5) Target market preferences influence sizing (Asian brands often run smaller). Always check brand-specific size charts and read customer reviews about fit. When shopping online, order multiple sizes if possible and return what does not fit.',
            },
          },
          {
            '@type': 'Question',
            name: 'What do shoe width letters mean (B, D, EE, etc.)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Shoe width letters indicate foot width at the ball: For womens shoes—AA (narrowest), A (narrow), B (medium/standard), C (wide), D (extra wide), EE (double extra wide). For mens shoes—B (narrow), D (medium/standard), EE (wide), EEEE (extra wide). Medium width is most common and unmarked on many shoes. Width increases by approximately ⅛ inch (3mm) per letter. Not all brands offer width options. If shoes feel tight across the ball but length is correct, try a wider width. If heels slip but toes fit, try a narrower width.',
            },
          },
          {
            '@type': 'Question',
            name: 'How often should I remeasure my shoe size?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Remeasure shoe size: 1) Every 2-3 years for adults—feet can change due to weight gain/loss, pregnancy, aging, or medical conditions. 2) Every 3-6 months for children—kids feet grow rapidly, especially during growth spurts. 3) After significant life changes—pregnancy (feet can grow permanently), weight changes (±20+ lbs), foot injuries, or new medical diagnoses (diabetes, arthritis). 4) If current shoes feel uncomfortable—pain, numbness, or blisters indicate wrong size. Adult feet typically stop growing by age 20-21, but can still change shape over time.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/shoe-size-conversion'),
        name: 'How to Convert Shoe Sizes Between Standards',
        description: 'Learn how to accurately convert shoe sizes between US, EU, UK, CN, and JP standards for mens, womens, and kids footwear.',
        totalTime: 'PT3M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Shoe Size Conversion',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Gender/Category',
            text: 'Choose whether you need mens, womens, or kids shoe size conversion. This is critical as sizing systems differ significantly between categories.',
            url: getStepUrl('/shoe-size-conversion', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Size Standard',
            text: 'Select the size standard you currently know: US, UK, EU, CM (centimeters), CN (China), or JP (Japan). Most people know their US or EU size.',
            url: getStepUrl('/shoe-size-conversion', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Enter Your Size',
            text: 'Input your current shoe size in the selected standard. For centimeter measurements, measure your foot length accurately while standing.',
            url: getStepUrl('/shoe-size-conversion', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'View All Conversions',
            text: 'See your size converted to all 6 standards simultaneously: US, UK, EU, CM, CN, and JP. All conversions are shown in one view.',
            url: getStepUrl('/shoe-size-conversion', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Save for Family Members',
            text: 'Save converted sizes with names for easy reference when shopping. Store shoe sizes for your entire family to shop more efficiently.',
            url: getStepUrl('/shoe-size-conversion', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Check Brand-Specific Sizing',
            text: 'Remember that brands vary—always check brand-specific charts and customer reviews for fit feedback before purchasing.',
            url: getStepUrl('/shoe-size-conversion', 6),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/shoe-size-conversion'),
        headline: 'Complete Guide to International Shoe Size Conversion',
        description: 'Comprehensive guide to converting shoe sizes between US, EU, UK, CN, JP standards for mens, womens, and kids footwear.',
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
        dateModified: '2024-11-18',
        image: getOgImage('shoe-size'),
        articleBody: 'Learn how to convert shoe sizes between international standards including US, EU, UK, CN, JP for mens, womens, and kids footwear.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="sr-only">Shoe Size Conversion - Convert US, EU, UK, CN, JP Sizes</h1>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/other" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Other</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Shoe Size Conversion
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <ShoeSizeConverter />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding International Shoe Size Systems</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700">
              <strong>Quick Summary:</strong> Convert shoe sizes between US, EU, UK, CN, and JP standards with our free calculator. Get accurate conversions for mens, womens, and kids footwear, measure your feet correctly, and learn why sizes vary between brands.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Shoe Size Conversion Matters</h3>
          <p className="text-gray-700 mb-4">
            Shopping for shoes online or from international brands requires understanding different sizing systems. A US size 9 is not the same as EU 9 or UK 9—in fact, they represent vastly different foot lengths. Without proper conversion, you risk ordering shoes that do not fit, leading to returns, frustration, and wasted time.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>The global shoe market uses at least 5 major sizing standards:</strong> US (United States), EU (European Union), UK (United Kingdom), CN (China), and JP (Japan). Each system evolved independently with different measurement methods and historical origins. Additionally, mens, womens, and kids sizes use different scales even within the same country, further complicating conversions.
          </p>
          <p className="text-gray-700 mb-4">
            Understanding shoe size conversion is essential for: online shopping from international retailers, buying shoes while traveling abroad, purchasing gifts for family and friends, shopping for children whose feet grow rapidly, and comparing prices across different markets. Accurate conversion prevents costly mistakes and ensures comfort.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Major Shoe Sizing Systems Explained</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">US Sizing (United States)</h4>
          <p className="text-gray-700 mb-4">
            The US system uses different scales for mens and womens shoes, with womens sizes approximately 1.5 sizes larger than mens for the same foot length. US sizes increment in whole and half sizes (7, 7.5, 8, 8.5, etc.). The system originated from the Brannock Device, invented in 1927, which measures foot length and width. However, manufacturers are not legally required to use standardized sizing, leading to significant variations between brands.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>US sizing characteristics:</strong> Mens sizes typically range from 6-16, womens from 5-12, and kids from 0-13 (toddler) plus 1-7 (youth). Athletic shoes often run half a size larger than dress shoes. Width options are common but not universal. The system is intuitive for Americans but confusing for international buyers due to the mens/womens split.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">EU Sizing (European Union)</h4>
          <p className="text-gray-700 mb-4">
            EU sizing, also called Continental or French sizing, is based on the Paris Point system. One Paris Point equals ⅔ centimeter (6.67 mm). Sizes increment in whole numbers only (no half sizes), though some brands offer half sizes for certain markets. EU sizes are theoretically unisex—the same foot length uses the same EU size regardless of gender.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>EU sizing advantages:</strong> Based on actual foot length measurement, providing more objective sizing. No gender distinction simplifies conversion. Widely used across Europe, making it the international standard for many global brands. Common ranges: mens 39-48, womens 35-42, kids 16-39. Each size increment represents approximately 6.67 mm of length difference.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">UK Sizing (United Kingdom)</h4>
          <p className="text-gray-700 mb-4">
            UK sizing is similar to US sizing but typically 1 size smaller for mens shoes and 2 sizes smaller for womens shoes (same foot length). UK sizes use whole and half increments. The system originated from barleycorns—one size equals ⅓ inch or 8.47 mm, originally the length of three barleycorns (historical grain measurement).
          </p>
          <p className="text-gray-700 mb-4">
            <strong>UK sizing notes:</strong> Used in the UK, Ireland, and some Commonwealth countries. Similar enough to US sizing that approximate conversions work, but precise fit requires exact charts. Some brands show both UK and US sizes on labels. Width fittings are less common than in US shoes. Common ranges: mens 6-12, womens 3-9.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Asian Sizing (China and Japan)</h4>
          <p className="text-gray-700 mb-4">
            <strong>Chinese (CN) sizing:</strong> Uses the Mondopoint system based on foot length in centimeters or millimeters. CN 245 means 24.5 cm foot length. Some brands use EU-equivalent numbering (CN 40 = EU 40), while others use actual length. This dual system creates confusion—always verify which CN system a brand uses.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Japanese (JP) sizing:</strong> Similar to CN sizing, based on foot length in centimeters. JP 25 means 25 cm foot length. Japanese shoes often run narrower than Western shoes due to average foot shape differences. Many Japanese brands now also provide US/EU size equivalents on labels.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Comprehensive Size Conversion Charts</h3>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Mens Shoe Size Conversion</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-center font-semibold border-b">US</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">UK</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">EU</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">CM</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">CN</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">JP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-center">7</td>
                  <td className="px-4 py-3 text-center">6.5</td>
                  <td className="px-4 py-3 text-center">40</td>
                  <td className="px-4 py-3 text-center">24.8</td>
                  <td className="px-4 py-3 text-center">40.5</td>
                  <td className="px-4 py-3 text-center">25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">8</td>
                  <td className="px-4 py-3 text-center">7.5</td>
                  <td className="px-4 py-3 text-center">41</td>
                  <td className="px-4 py-3 text-center">25.4</td>
                  <td className="px-4 py-3 text-center">42</td>
                  <td className="px-4 py-3 text-center">26</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">9</td>
                  <td className="px-4 py-3 text-center">8.5</td>
                  <td className="px-4 py-3 text-center">42.5</td>
                  <td className="px-4 py-3 text-center">26.0</td>
                  <td className="px-4 py-3 text-center">43</td>
                  <td className="px-4 py-3 text-center">27</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">10</td>
                  <td className="px-4 py-3 text-center">9.5</td>
                  <td className="px-4 py-3 text-center">44</td>
                  <td className="px-4 py-3 text-center">27.0</td>
                  <td className="px-4 py-3 text-center">44.5</td>
                  <td className="px-4 py-3 text-center">28</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">11</td>
                  <td className="px-4 py-3 text-center">10.5</td>
                  <td className="px-4 py-3 text-center">45</td>
                  <td className="px-4 py-3 text-center">27.9</td>
                  <td className="px-4 py-3 text-center">46</td>
                  <td className="px-4 py-3 text-center">29</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">12</td>
                  <td className="px-4 py-3 text-center">11.5</td>
                  <td className="px-4 py-3 text-center">46</td>
                  <td className="px-4 py-3 text-center">28.6</td>
                  <td className="px-4 py-3 text-center">47</td>
                  <td className="px-4 py-3 text-center">30</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Womens Shoe Size Conversion</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-center font-semibold border-b">US</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">UK</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">EU</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">CM</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">CN</th>
                  <th className="px-4 py-3 text-center font-semibold border-b">JP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-center">6</td>
                  <td className="px-4 py-3 text-center">3.5</td>
                  <td className="px-4 py-3 text-center">36</td>
                  <td className="px-4 py-3 text-center">22.5</td>
                  <td className="px-4 py-3 text-center">36</td>
                  <td className="px-4 py-3 text-center">22.5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">7</td>
                  <td className="px-4 py-3 text-center">4.5</td>
                  <td className="px-4 py-3 text-center">37.5</td>
                  <td className="px-4 py-3 text-center">23.5</td>
                  <td className="px-4 py-3 text-center">37.5</td>
                  <td className="px-4 py-3 text-center">23.5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">8</td>
                  <td className="px-4 py-3 text-center">5.5</td>
                  <td className="px-4 py-3 text-center">38.5</td>
                  <td className="px-4 py-3 text-center">24.1</td>
                  <td className="px-4 py-3 text-center">39</td>
                  <td className="px-4 py-3 text-center">24.5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">9</td>
                  <td className="px-4 py-3 text-center">6.5</td>
                  <td className="px-4 py-3 text-center">40</td>
                  <td className="px-4 py-3 text-center">25.1</td>
                  <td className="px-4 py-3 text-center">40</td>
                  <td className="px-4 py-3 text-center">25.5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">10</td>
                  <td className="px-4 py-3 text-center">7.5</td>
                  <td className="px-4 py-3 text-center">41</td>
                  <td className="px-4 py-3 text-center">25.9</td>
                  <td className="px-4 py-3 text-center">41.5</td>
                  <td className="px-4 py-3 text-center">26.5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-center">11</td>
                  <td className="px-4 py-3 text-center">8.5</td>
                  <td className="px-4 py-3 text-center">42.5</td>
                  <td className="px-4 py-3 text-center">26.7</td>
                  <td className="px-4 py-3 text-center">43</td>
                  <td className="px-4 py-3 text-center">27.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Measure Your Feet Accurately</h3>
          <p className="text-gray-700 mb-4">
            Accurate foot measurement is the foundation of finding shoes that fit. Follow these professional measurement techniques used by shoe fitters:
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step-by-Step Measurement Guide</h4>
          <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
            <li>
              <strong>Timing matters:</strong> Measure feet in the afternoon or evening. Feet swell throughout the day due to activity and gravity, increasing up to 5% in length and volume. Morning measurements may result in shoes that feel tight by day's end.
            </li>
            <li>
              <strong>Prepare materials:</strong> You need: blank paper (larger than your foot), pencil or pen, ruler or measuring tape (centimeters), and the socks you will wear with the shoes. Standing on carpet compresses padding—use a hard floor.
            </li>
            <li>
              <strong>Position correctly:</strong> Place paper against a wall. Stand with heel touching the wall, weight distributed evenly on both feet. Standing is critical—feet are longer when bearing weight than when sitting (up to 5 mm difference).
            </li>
            <li>
              <strong>Mark the position:</strong> Have someone mark the paper at your longest toe (usually big toe, but not always—10% of people have longer second toes). Hold the pencil vertical for accuracy. Mark while standing—do not lift foot then mark.
            </li>
            <li>
              <strong>Measure carefully:</strong> Measure from the wall edge to the mark in centimeters. Use the inside edge of the mark (closest to heel) for precision. Record measurement to nearest millimeter (e.g., 25.3 cm).
            </li>
            <li>
              <strong>Measure both feet:</strong> Most people have one foot slightly larger (average difference: 2-5 mm). Always use the measurement from your larger foot when selecting shoe size. About 60% of people have a larger right foot.
            </li>
            <li>
              <strong>Add comfort space:</strong> Add 0.5-1 cm to your measurement for toe room. Toes should not touch the shoe front when standing. More space needed for running shoes (1-1.5 cm) than dress shoes (0.5 cm).
            </li>
            <li>
              <strong>Compare to size charts:</strong> Use your measurement in centimeters to find the corresponding size in your preferred system. Our calculator simplifies this—enter your foot length in CM for most accurate conversion.
            </li>
          </ol>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-amber-900 mb-3">Common Measurement Mistakes to Avoid</h4>
            <ul className="text-sm text-amber-900 space-y-2 list-disc ml-6">
              <li>Measuring while sitting—feet are shorter without weight bearing</li>
              <li>Using worn-out socks—compressed padding affects fit</li>
              <li>Measuring in the morning—feet have not yet swelled to daily maximum</li>
              <li>Not measuring both feet—assumes both are identical (rarely true)</li>
              <li>Forgetting comfort space—tight shoes cause pain and foot problems</li>
              <li>Using old measurements—feet change over time due to aging, weight, pregnancy</li>
              <li>Measuring with shoes on—adds unnecessary thickness</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Shoe Width Sizing</h3>
          <p className="text-gray-700 mb-4">
            Length is only half the story—width significantly affects fit and comfort. Width is measured across the widest part of the foot (ball, behind the toes). US sizing has standardized width letters, though not all brands offer width options.
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">US Width Sizing System</h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold border-b">Width Letter</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Womens</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Mens</th>
                  <th className="px-4 py-3 text-left font-semibold border-b">Width (inches)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">AA or 2A</td>
                  <td className="px-4 py-3">Extra Narrow</td>
                  <td className="px-4 py-3">Narrow</td>
                  <td className="px-4 py-3">-0.25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">A</td>
                  <td className="px-4 py-3">Narrow</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">-0.125</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">B</td>
                  <td className="px-4 py-3">Medium/Standard</td>
                  <td className="px-4 py-3">Narrow</td>
                  <td className="px-4 py-3">Standard</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">D</td>
                  <td className="px-4 py-3">Wide</td>
                  <td className="px-4 py-3">Medium/Standard</td>
                  <td className="px-4 py-3">+0.125</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">EE or 2E</td>
                  <td className="px-4 py-3">Extra Wide</td>
                  <td className="px-4 py-3">Wide</td>
                  <td className="px-4 py-3">+0.25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">EEEE or 4E</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">Extra Wide</td>
                  <td className="px-4 py-3">+0.50</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-4">
            <strong>Width fitting signs:</strong> Correct width—no pressure on sides of foot, ball area comfortable, no pinching. Too narrow—side bulging over sole, pressure on pinky toe or bunion area, numbness or tingling. Too wide—foot slides side-to-side, heel slips, lack of support at midfoot. Many foot problems (bunions, hammertoes, neuromas) worsen from shoes too narrow.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Brand-Specific Sizing Variations</h3>
          <p className="text-gray-700 mb-4">
            Despite standard sizing systems, significant variations exist between brands. Understanding brand tendencies helps online shoppers select correct sizes without trying on:
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Brand Sizing Patterns</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Athletic brands (Nike, Adidas, Puma):</strong> Typically run true to size for athletic shoes, though some running models run small (especially Nike womens). Width is usually medium—limited wide options. Performance shoes fit snugger than lifestyle sneakers.</li>
            <li><strong>Dress shoe brands (Clarks, Ecco, Cole Haan):</strong> European brands (Ecco, Geox) often run large—size down ½ to 1 size. Traditional dress shoes fit narrower than athletic shoes. Width options more common in quality brands.</li>
            <li><strong>Boot brands (Dr. Martens, Timberland, Red Wing):</strong> Dr. Martens run large and wide—size down for most people. Work boots (Timberland, Red Wing) typically true to size but designed for thick socks. Break-in period affects fit—leather stretches ¼-½ size over time.</li>
            <li><strong>Fashion brands (Zara, H&M, ASOS):</strong> Fast fashion sizing highly inconsistent—size varies even within same brand. Generally run small, especially Asian fashion brands. Always check customer reviews for fit feedback.</li>
            <li><strong>Luxury brands (Gucci, Prada, Christian Louboutin):</strong> Italian luxury brands typically run 1-1.5 sizes small—size up significantly. Narrow last construction (sleek silhouette) means less width than athletic shoes. Expect minimal break-in—luxury shoes should fit immediately.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Kids Shoe Sizing: Special Considerations</h3>
          <p className="text-gray-700 mb-4">
            Children's feet grow rapidly and unpredictably, requiring frequent size checks. Growth rates vary: infants and toddlers grow approximately 1-1.5 sizes per year, preschoolers (3-5 years) about 1 size per year, school-age children (6-10 years) about ½-1 size per year. Growth spurts cause sudden changes—measure every 2-3 months.
          </p>
          
          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Kids Sizing Categories</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Infant (0-12 months):</strong> US sizes 0-4, soft-sole recommended for development. Shoes more for protection than support. Focus on flexibility and room for growth (thumb width space at toe).</li>
            <li><strong>Toddler (1-3 years):</strong> US sizes 4-10, learning to walk requires flexible, lightweight shoes. Avoid stiff soles that restrict natural foot motion. Toe room essential as toddlers have not developed toe-off gait pattern.</li>
            <li><strong>Little Kid (4-8 years):</strong> US sizes 10.5-3, transitioning to more structured shoes. Still prioritize flexibility and comfort over fashion. Feet growing fastest in this period—check fit frequently.</li>
            <li><strong>Big Kid (8-12 years):</strong> US sizes 3.5-7, approaching adult sizing. Can transition to athletic/specific sport shoes. Width becomes more important as arches develop. Pre-teens may enter adult sizing.</li>
          </ul>

          <p className="text-gray-700 mb-4">
            <strong>Kids fitting guidelines:</strong> Check fit every 6-8 weeks during rapid growth phases. Look for thumb width (1-1.5 cm) between longest toe and shoe end. Shoes too small cause ingrown toenails, blisters, and gait problems. Do not buy excessively large shoes "to grow into"—oversized shoes cause tripping and poor support. Replace when less than thumb width remains.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Online Shopping Best Practices</h3>
          <p className="text-gray-700 mb-4">
            Shopping for shoes online without trying them on requires strategy to minimize returns:
          </p>
          
          <ol className="list-decimal pl-6 mb-6 space-y-3 text-gray-700">
            <li><strong>Know your foot measurements:</strong> Measure both feet in centimeters following our guide. Keep record handy when shopping. Update measurements if weight changes significantly or annually.</li>
            <li><strong>Check brand-specific charts:</strong> Always consult the specific brand's size chart—do not assume standard conversions. Brand charts show how their shoes fit their sizing system.</li>
            <li><strong>Read customer reviews:</strong> Look for comments about sizing—"runs small," "runs large," "true to size," "wide toe box," "narrow heel." Reviews from people with similar foot shapes most helpful.</li>
            <li><strong>Order multiple sizes if allowed:</strong> Many retailers offer free returns. Order your typical size plus ½ size up and down. Try all at home and return what does not fit.</li>
            <li><strong>Consider shoe type:</strong> Athletic shoes generally need more room than dress shoes. Boots need space for thicker socks. High heels fit tighter than flats—often need ½ size larger.</li>
            <li><strong>Check return policy:</strong> Ensure free returns before ordering. Some retailers charge return shipping. Keep all packaging until certain shoes fit. Try indoors only—outdoor wear voids most returns.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">When Feet Change: Life Events Affecting Size</h3>
          <p className="text-gray-700 mb-4">
            Feet are not static—size and shape change throughout life due to various factors:
          </p>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Pregnancy:</strong> Hormones (relaxin) loosen ligaments, causing arches to flatten. Feet can grow ½-1 full size, often permanently. Swelling adds temporary volume. Measure after pregnancy stabilizes (3-6 months postpartum) before buying new shoes.</li>
            <li><strong>Weight gain/loss:</strong> Significant weight changes (±20+ lbs) affect foot volume and arch height. Feet widen with weight gain, may narrow slightly with loss. Changes can be ½ size or more.</li>
            <li><strong>Aging:</strong> Foot fat pads thin with age, especially under heel and ball. Arches flatten due to ligament weakening. Feet may lengthen and widen ½-1 size from ages 40-70. Bunions and hammertoes more common, requiring wider toe boxes.</li>
            <li><strong>Medical conditions:</strong> Diabetes causes neuropathy and circulation problems—proper fit critical to prevent ulcers. Arthritis changes foot shape. Lymphedema causes swelling requiring larger sizes. Always consult healthcare provider about footwear for medical conditions.</li>
            <li><strong>Athletic training:</strong> Long-distance running and high-impact sports can cause temporary foot swelling. Feet may swell up to half size during/after long runs. Many athletes wear ½-1 size larger running shoes than casual shoes.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Additional Resources</h3>
          <p className="text-gray-700 mb-4">
            For more information on shoe sizing and foot health:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            <li>
              <a href="https://www.aapsm.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                American Academy of Podiatric Sports Medicine
              </a> - Professional guidance on athletic footwear and foot health
            </li>
            <li>
              <a href="https://www.apma.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                American Podiatric Medical Association
              </a> - Information on proper shoe fit and foot care
            </li>
            <li>
              <a href="https://www.iso.org/standard/11534.html" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                ISO 9407 Shoe Sizing Standard
              </a> - International shoe size system standards
            </li>
            <li>
              <a href="https://www.healthychildren.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                American Academy of Pediatrics
              </a> - Guidelines for children's shoe fit and foot development
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/bra-size-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">👗</div>
            <h3 className="font-semibold text-gray-900">Bra Size Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate your bra size accurately</p>
          </a>
          
          <a 
            href="/clothing-size-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">👔</div>
            <h3 className="font-semibold text-gray-900">Clothing Size Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert clothing sizes internationally</p>
          </a>
          
          <a 
            href="/height-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">Height Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert height between units</p>
          </a>
          
          <a 
            href="/unit-converter" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900">Unit Converter</h3>
            <p className="text-sm text-gray-600 mt-1">Convert between measurement units</p>
          </a>
        </div>
      </section>
    </div>
  );
}

