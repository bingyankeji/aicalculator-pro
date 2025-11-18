import type { Metadata } from 'next';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
import BodyTypeCalculator from '@/components/Calculator/BodyTypeCalculator';

export const metadata: Metadata = {
  title: 'Body Type Calculator (Free, No signup) - Find Your Body Shape | AICalculator',
  description: 'Free body type calculator with no sign-up required. Determine if you\'re hourglass, pear, apple, rectangle, or inverted triangle. Get personalized style and fitness recommendations. 100% free, unlimited use.',
  keywords: [
    'body type calculator',
    'body shape calculator',
    'free body type calculator',
    'body type calculator female',
    'body type calculator male',
    'hourglass calculator',
    'pear shape calculator',
    'apple shape calculator',
    'body shape finder',
    'body type quiz',
    'female body types',
    'male body types',
    'body shape test',
    'waist hip ratio calculator',
    'body proportion calculator',
    'body type test',
    'what is my body type',
    'body shape analysis',
    'body type fashion',
    'body type workout',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  
  openGraph: {
    title: 'Body Type Calculator (Free, No signup) - Find Your Body Shape',
    description: 'Free body type calculator with no sign-up required. Discover your body shape and get personalized style and fitness tips. Hourglass, pear, apple, rectangle, or inverted triangle.',
    type: 'website',
    url: getUrl('/body-type-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('body-type'),
      width: 1200,
      height: 630,
      alt: 'Body Type Calculator - Find Your Body Shape',
    }],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Body Type Calculator (Free, No signup) - Find Your Body Shape',
    description: 'Free body type calculator. Discover if you\'re hourglass, pear, apple, rectangle, or inverted triangle. Get personalized style and fitness tips.',
    images: [getOgImage('body-type')],
    creator: '@aicalculator',
  },
  
  alternates: {
    canonical: getUrl('/body-type-calculator'),
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

export default function BodyTypeCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/body-type-calculator'),
        'name': 'Body Type Calculator - Free Body Shape Finder',
        'url': getUrl('/body-type-calculator'),
        'description': 'Free body type calculator to determine your body shape. Get personalized style recommendations, fitness tips, and fashion advice based on your measurements. No sign-up required.',
        'applicationCategory': 'HealthApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
        },
        'featureList': [
          'Body type determination (hourglass, pear, apple, rectangle, inverted triangle)',
          'Body ratio calculations (waist-hip, shoulder-waist, bust-waist)',
          'Personalized style and clothing recommendations',
          'Exercise and fitness tips for your body type',
          'Celebrity body type examples',
          'Instant results with detailed analysis',
          'Both male and female body types',
          'No sign-up or registration required',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/body-type-calculator'),
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': getUrl('/'),
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Health & Fitness',
            'item': getUrl('/health-fitness'),
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Body Type Calculator',
            'item': getUrl('/body-type-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/body-type-calculator'),
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What are the different body types?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'There are five main female body types: Hourglass (X-shape with balanced bust and hips, defined waist), Pear/Triangle (A-shape with hips wider than bust), Apple/Oval (O-shape with weight around midsection), Rectangle/Banana (H-shape with similar bust, waist, hip measurements), and Inverted Triangle (V-shape with shoulders wider than hips). Male body types include V-shape/Inverted Triangle (wide shoulders, narrow waist), Rectangle (straight build), Oval/Round (weight in midsection), and Trapezoid (balanced athletic build). Each body type has unique characteristics that influence clothing fit and exercise approaches.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How do I measure my body type correctly?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'To accurately measure your body type, use a flexible measuring tape and stand straight. For bust/chest, measure around the fullest part. For waist, measure at the narrowest point (usually above belly button). For hips, measure around the fullest part of your buttocks. For shoulders, measure across the widest point from shoulder to shoulder. Don\'t pull the tape too tight - it should be snug but comfortable. Measure over thin clothing or directly on skin for best accuracy. Take measurements at the same time of day for consistency.',
            },
          },
          {
            '@type': 'Question',
            'name': 'Can my body type change over time?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, your body type can change due to weight gain or loss, muscle development, pregnancy, hormonal changes, and aging. While your skeletal structure remains the same, changes in body composition can shift you between body types. For example, weight loss might reveal a more defined waist, changing from apple to hourglass. Targeted strength training can broaden shoulders or build curves. However, your basic frame (bone structure) stays constant. Focus on being the healthiest version of your natural body type rather than trying to drastically change it.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What is the best body type for fashion?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'There is no "best" body type for fashion - every body shape is beautiful and can be dressed stylishly. The fashion industry traditionally favored hourglass and rectangle shapes, but modern fashion celebrates all body types. The key is understanding your body shape and choosing clothes that flatter your natural proportions. Hourglass shapes look great in fitted styles, pear shapes shine in A-line cuts, apple shapes benefit from empire waists, rectangles create curves with belts and layers, and inverted triangles balance with wider bottoms. Confidence and proper fit matter more than body type.',
            },
          },
          {
            '@type': 'Question',
            'name': 'How can I dress for my body type?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Dressing for your body type means emphasizing your strengths and creating balanced proportions. Hourglass shapes should highlight the waist with belts and fitted styles. Pear shapes can draw attention upward with statement tops and darker bottoms. Apple shapes look great in empire waists and A-line dresses. Rectangle shapes create curves with ruffles, belts, and layering. Inverted triangles balance with wider bottoms and V-necks. General tips: ensure proper fit (not too tight or loose), choose fabrics that drape well, and wear what makes you feel confident. The right fit matters more than following strict rules.',
            },
          },
          {
            '@type': 'Question',
            'name': 'What exercises are best for my body type?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Exercise recommendations vary by body type. Hourglass shapes benefit from balanced full-body workouts to maintain proportions. Pear shapes should focus on upper body strength training and cardio for lower body fat burning. Apple shapes need cardio for overall fat loss and core strengthening. Rectangle shapes should build curves with glute, shoulder, and oblique exercises. Inverted triangles can add lower body exercises like squats and lunges. However, all body types should include cardiovascular exercise, strength training, and flexibility work for overall health. Consult a fitness professional for personalized exercise plans.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/body-type-calculator'),
        'name': 'How to Use the Body Type Calculator',
        'description': 'Step-by-step guide to using the body type calculator to determine your body shape and get personalized recommendations.',
        'totalTime': 'PT5M',
        'estimatedCost': {
          '@type': 'MonetaryAmount',
          'currency': 'USD',
          'value': '0',
        },
        'tool': {
          '@type': 'HowToTool',
          'name': 'Flexible measuring tape',
        },
        'step': [
          {
            '@type': 'HowToStep',
            'position': 1,
            'name': 'Select Your Gender',
            'text': 'Choose either Female or Male to get body type categories relevant to your gender. Female categories include hourglass, pear, apple, rectangle, and inverted triangle. Male categories include V-shape, rectangle, oval, and trapezoid.',
            'url': getStepUrl('/body-type-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            'position': 2,
            'name': 'Choose Measurement Unit',
            'text': 'Select either centimeters (cm) or inches based on your preference. You can use either metric or imperial units - the calculator will work with both.',
            'url': getStepUrl('/body-type-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            'position': 3,
            'name': 'Measure Bust/Chest',
            'text': 'Using a flexible measuring tape, measure around the fullest part of your bust (for females) or chest (for males). Stand straight and ensure the tape is parallel to the floor. The tape should be snug but not tight.',
            'url': getStepUrl('/body-type-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            'position': 4,
            'name': 'Measure Waist',
            'text': 'Measure around the narrowest part of your waist, typically just above your belly button. This is usually where your body naturally creases when you bend to the side. Don\'t suck in your stomach - breathe normally.',
            'url': getStepUrl('/body-type-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            'position': 5,
            'name': 'Measure Hips',
            'text': 'Measure around the fullest part of your hips and buttocks. Stand with feet together and ensure the tape is parallel to the floor. This measurement should be taken at the widest point.',
            'url': getStepUrl('/body-type-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            'position': 6,
            'name': 'Measure Shoulders',
            'text': 'Measure across the widest part of your shoulders from edge to edge. You may need assistance for this measurement. The tape should cross over the tops of your shoulder bones.',
            'url': getStepUrl('/body-type-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            'position': 7,
            'name': 'Calculate Body Type',
            'text': 'Click the "Calculate Body Type" button to analyze your measurements. The calculator will determine your body shape based on the ratios between your measurements.',
            'url': getStepUrl('/body-type-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            'position': 8,
            'name': 'Review Your Results',
            'text': 'Read your body type results including your body shape, key ratios (waist-hip, shoulder-waist, bust-waist), strengths, challenges, clothing tips, exercise recommendations, and celebrity examples with similar body types.',
            'url': getStepUrl('/body-type-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/body-type-calculator'),
        'headline': 'Complete Guide to Body Types: Find Your Shape and Dress with Confidence',
        'description': 'Comprehensive guide to understanding different body types, how to measure correctly, and personalized style and fitness recommendations for each body shape.',
        'author': {
          '@type': 'Organization',
          'name': 'AICalculator.pro',
          'url': getUrl('/'),
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'AICalculator.pro',
          'logo': {
            '@type': 'ImageObject',
            'url': getUrl('/logo.png'),
          },
        },
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0],
        'image': getOgImage('body-type'),
        'articleBody': 'Understanding your body type is essential for choosing flattering clothing, developing effective fitness routines, and building confidence in your appearance. This comprehensive guide covers the five main female body types (hourglass, pear, apple, rectangle, inverted triangle) and four main male body types (V-shape, rectangle, oval, trapezoid), including how to accurately measure, dress for your shape, and exercise effectively.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO: Hidden H1 */}
      <h1 className="sr-only">
        Body Type Calculator - Free Body Shape Finder with Style and Fitness Tips (No Sign-up Required)
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/health-fitness" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Health & Fitness</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Body Type Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <BodyTypeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Body Types: A Complete Guide
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Your body type, also called body shape or figure type, is determined by the distribution of your body fat and muscle, 
              as well as your skeletal structure. Understanding your body type helps you choose clothing that flatters your figure, 
              develop effective fitness routines, and build confidence in your appearance.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Female Body Types Explained
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🍷 Hourglass (X-Shape)
              </h4>
              <p className="text-gray-700 mb-3">
                Bust and hips are nearly equal in size, with a well-defined, narrow waist. This is considered the most balanced 
                and proportionate body shape.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Waist is at least 25% smaller than bust/hips, curves are balanced, 
                weight is distributed evenly.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🍐 Pear/Triangle (A-Shape)
              </h4>
              <p className="text-gray-700 mb-3">
                Hips are wider than bust and shoulders. Weight tends to accumulate in the hips, thighs, and buttocks area.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Defined waist, fuller hips and thighs, narrower shoulders, 
                upper body stays slim.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🍎 Apple/Oval (O-Shape)
              </h4>
              <p className="text-gray-700 mb-3">
                Weight is concentrated around the midsection. Bust may be larger than hips, with less waist definition.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Fuller bust, weight around stomach, slimmer legs, 
                shoulders wider than hips.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                📏 Rectangle/Banana (H-Shape)
              </h4>
              <p className="text-gray-700 mb-3">
                Bust, waist, and hips are nearly the same width. Straight up and down with minimal curves or waist definition.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Balanced proportions, athletic build, minimal waist definition, 
                lean appearance.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🔺 Inverted Triangle (V-Shape)
              </h4>
              <p className="text-gray-700 mb-3">
                Shoulders and bust are broader than hips. Athletic build with wider upper body and narrower lower body.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Broad shoulders, fuller bust, narrow hips, athletic frame, 
                slim legs.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Male Body Types Explained
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                💪 V-Shape/Inverted Triangle
              </h4>
              <p className="text-gray-700 mb-3">
                Wide shoulders and chest tapering to a narrow waist. This is the classic athletic, masculine build 
                most associated with fitness and strength.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Broad shoulders, developed chest, narrow waist, V-taper from 
                shoulders to waist.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                📐 Rectangle/Straight
              </h4>
              <p className="text-gray-700 mb-3">
                Shoulders, waist, and hips are similar in width. Straight up and down with minimal taper or definition.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Lean frame, minimal muscle definition, narrow build, 
                ectomorph body type.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                ⭕ Oval/Round
              </h4>
              <p className="text-gray-700 mb-3">
                Weight concentrated around the midsection. Wider waist relative to shoulders and hips, with weight 
                carried in the stomach area.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Fuller midsection, weight around stomach, less muscle definition, 
                endomorph tendency.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                🏋️ Trapezoid
              </h4>
              <p className="text-gray-700 mb-3">
                Wide shoulders with proportionate waist and hips. Balanced, athletic build with good muscle definition 
                throughout.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Key Characteristics:</strong> Balanced proportions, athletic build, moderate muscle definition, 
                mesomorph body type.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Measure Your Body Type Accurately
          </h3>

          <p className="text-gray-700 mb-4">
            Accurate measurements are crucial for determining your body type. Follow these steps for the best results:
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">What You'll Need:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>A flexible measuring tape (fabric or vinyl tape measure)</li>
              <li>A mirror (full-length is ideal)</li>
              <li>Thin, form-fitting clothing or measure over bare skin</li>
              <li>Someone to help you measure shoulders (optional but helpful)</li>
            </ul>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white border-l-4 border-blue-500 p-4">
              <h5 className="font-bold text-gray-900 mb-2">Step 1: Bust/Chest Measurement</h5>
              <p className="text-gray-700">
                Measure around the fullest part of your bust (for females) or chest (for males). The tape should be 
                parallel to the floor and snug but not tight. Stand straight with arms at your sides and breathe normally.
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-500 p-4">
              <h5 className="font-bold text-gray-900 mb-2">Step 2: Waist Measurement</h5>
              <p className="text-gray-700">
                Measure around the narrowest part of your waist, typically just above your belly button. This is where 
                your body naturally creases when you bend to the side. Don't suck in your stomach - breathe normally 
                and keep the tape comfortably snug.
              </p>
            </div>

            <div className="bg-white border-l-4 border-purple-500 p-4">
              <h5 className="font-bold text-gray-900 mb-2">Step 3: Hip Measurement</h5>
              <p className="text-gray-700">
                Measure around the fullest part of your hips and buttocks. Stand with your feet together and ensure 
                the tape is parallel to the floor. This should be taken at the widest point of your lower body.
              </p>
            </div>

            <div className="bg-white border-l-4 border-orange-500 p-4">
              <h5 className="font-bold text-gray-900 mb-2">Step 4: Shoulder Measurement</h5>
              <p className="text-gray-700">
                Measure across the widest part of your shoulders from edge to edge (acromion to acromion). The tape 
                should cross over the tops of your shoulder bones. This measurement is easier with assistance.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span> Important Measurement Tips
            </h4>
            <ul className="space-y-2 text-amber-900">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Measure at the same time of day for consistency (morning is best, before eating)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Don't pull the tape too tight - it should be snug but comfortable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Stand straight and relaxed, don't tense your muscles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Take each measurement 2-3 times and use the average</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Use the same measuring tape for all measurements</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Understanding Body Ratios
          </h3>

          <p className="text-gray-700 mb-4">
            Body type classification uses specific ratios between your measurements. Here are the key ratios:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Ratio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    Calculation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                    What It Indicates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Waist-Hip Ratio (WHR)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Waist ÷ Hips
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Lower ratio indicates more hip curves relative to waist. <br />
                    <span className="text-xs text-gray-600">Healthy range: Women &lt;0.85, Men &lt;0.95</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Shoulder-Waist Ratio
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Shoulders ÷ Waist
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Higher ratio indicates broader shoulders relative to waist (V-taper). <br />
                    <span className="text-xs text-gray-600">Athletic ratio: &gt;1.4 for men, &gt;1.2 for women</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Bust/Chest-Waist Ratio
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Bust/Chest ÷ Waist
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    Indicates upper body proportions and bust/chest fullness relative to waist.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Styling Tips for Each Body Type
          </h3>

          <p className="text-gray-700 mb-6">
            Understanding your body type is the first step to dressing with confidence. Here are comprehensive styling 
            guidelines for each body shape:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                General Styling Principles (All Body Types)
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span><strong>Proper fit is everything:</strong> Clothes should skim your body, not be too tight or too loose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span><strong>Know your proportions:</strong> Balance top and bottom, and define or create a waist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span><strong>Emphasize your best features:</strong> Draw attention to parts you love</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span><strong>Use color strategically:</strong> Dark colors minimize, bright colors emphasize</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-600 mt-1">✓</span>
                  <span><strong>Confidence is key:</strong> Wear what makes you feel good</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Exercise Recommendations by Body Type
          </h3>

          <p className="text-gray-700 mb-6">
            Different body types respond differently to various types of exercise. Here's how to train effectively for your body shape:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                💪 Hourglass Body Type
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Balanced full-body workouts</li>
                <li>• Mix of cardio and strength training</li>
                <li>• Core exercises to maintain waist definition</li>
                <li>• Yoga and Pilates for flexibility</li>
                <li>• Focus on maintaining proportions</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                🍐 Pear Body Type
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Upper body strength training (shoulders, arms, chest)</li>
                <li>• Cardio focusing on lower body fat burning</li>
                <li>• Lunges and squats for lower body toning</li>
                <li>• Swimming for balanced development</li>
                <li>• Avoid heavy lower body weight training</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                🍎 Apple Body Type
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Cardio for overall fat loss (30-45 min, 5x/week)</li>
                <li>• Core strengthening and stability exercises</li>
                <li>• Full-body circuit training</li>
                <li>• Walking, running, cycling, swimming</li>
                <li>• Diet is crucial for reducing midsection fat</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                📏 Rectangle Body Type
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Focus on building curves (glutes, shoulders)</li>
                <li>• Squats, deadlifts, hip thrusts for lower body</li>
                <li>• Shoulder presses and lateral raises for upper body</li>
                <li>• Oblique exercises for waist definition</li>
                <li>• Progressive overload to build muscle</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                🔺 Inverted Triangle
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Lower body exercises to add curves to hips</li>
                <li>• Squats, lunges, leg presses</li>
                <li>• Cardio to maintain upper body leanness</li>
                <li>• Core work for waist definition</li>
                <li>• Avoid excessive upper body training</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Can Your Body Type Change?
          </h3>

          <p className="text-gray-700 mb-4">
            Yes and no. Your basic skeletal structure (bone structure) is determined by genetics and remains relatively 
            constant throughout your adult life. However, your body shape can change due to:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">Factors That Can Change Body Shape:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Weight gain or loss</li>
                <li>• Muscle development through exercise</li>
                <li>• Pregnancy and childbirth</li>
                <li>• Hormonal changes (puberty, menopause)</li>
                <li>• Aging and metabolism changes</li>
                <li>• Medical conditions</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">What Stays the Same:</h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Bone structure (width of shoulders, hips)</li>
                <li>• Height (after growth is complete)</li>
                <li>• Basic frame size (small, medium, large)</li>
                <li>• Natural fat distribution patterns</li>
                <li>• Metabolic type tendencies</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            The key is to focus on being the healthiest version of YOUR body type rather than trying to achieve a 
            drastically different shape. Through proper nutrition, targeted exercise, and understanding how to dress 
            for your shape, you can look and feel your best in your natural body type.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Body Positivity and Acceptance
          </h3>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-4">
              <strong>Remember:</strong> Every body type is beautiful and has unique strengths. The fashion and fitness 
              industries have historically promoted certain body types as "ideal," but this is changing. Modern fashion 
              celebrates diversity and emphasizes that style is about confidence and self-expression, not conforming to 
              a single standard.
            </p>
            <p className="text-gray-700 mb-4">
              Your body type is just one aspect of who you are. Health, happiness, and confidence matter far more than 
              fitting into a specific category. Use this calculator as a tool for understanding yourself better, choosing 
              clothes that flatter you, and developing fitness routines that work for your body - not as a judgment of your worth.
            </p>
            <p className="text-gray-700 font-semibold">
              The best body type is a healthy, strong, confident body - and that comes in all shapes and sizes! 💖
            </p>
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/bmi-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate your Body Mass Index</p>
          </a>

          <a
            href="/body-fat-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate your body fat percentage</p>
          </a>

          <a
            href="/ideal-weight-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900">Ideal Weight Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your ideal body weight</p>
          </a>

          <a
            href="/calorie-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-semibold text-gray-900">Calorie Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate daily calorie needs</p>
          </a>
        </div>
      </section>
    </div>
  );
}

