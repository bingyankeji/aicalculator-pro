import { Metadata } from 'next';
import LeanBodyMassCalculator from '@/components/Calculator/LeanBodyMassCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Lean Body Mass Calculator - Calculate LBM & Body Composition | AICalculator',
  description: 'Free lean body mass calculator using Boer, James, and Hume formulas. Calculate your LBM, body fat percentage, muscle mass, and get personalized fitness recommendations with detailed analysis.',
  keywords: [
    'lean body mass calculator',
    'LBM calculator',
    'body composition calculator',
    'muscle mass calculator',
    'body fat calculator',
    'lean mass calculator',
    'fat free mass calculator',
    'body composition analysis',
    'lean body weight calculator',
    'muscle to fat ratio',
    'Boer formula calculator',
    'James formula LBM',
    'Hume formula calculator',
    'body fat percentage calculator',
    'fitness calculator',
    'muscle calculator',
    'body composition test',
    'lean muscle mass',
    'body mass composition',
    'fitness assessment tool',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Lean Body Mass Calculator - LBM & Body Composition Analysis',
    description: 'Calculate your lean body mass using multiple formulas. Get body fat percentage, muscle mass estimates, and personalized fitness recommendations.',
    type: 'website',
    url: getUrl('/lean-body-mass-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [
      {
        url: getOgImage('lean-body-mass'),
        width: 1200,
        height: 630,
        alt: 'Lean Body Mass Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lean Body Mass Calculator - Body Composition Analysis',
    description: 'Calculate LBM, body fat percentage, and muscle mass with multiple formulas and get personalized recommendations.',
    images: [getOgImage('lean-body-mass')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/lean-body-mass-calculator'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LeanBodyMassCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/lean-body-mass-calculator'),
        name: 'Lean Body Mass Calculator',
        url: getUrl('/lean-body-mass-calculator'),
        description:
          'Comprehensive lean body mass calculator that uses Boer, James, and Hume formulas to calculate LBM, body fat percentage, muscle mass, and provides personalized fitness recommendations.',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        featureList: [
          'Calculate lean body mass using three validated formulas',
          'Body fat percentage calculation using U.S. Navy method',
          'Muscle mass and fat mass breakdown',
          'BMI calculation and health rating',
          'Ideal weight range estimation',
          'Interactive body composition pie chart',
          'Formula comparison visualization',
          'Personalized fitness recommendations',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/lean-body-mass-calculator'),
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
            name: 'Health & Fitness',
            item: getUrl('/health-fitness'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Lean Body Mass Calculator',
            item: getUrl('/lean-body-mass-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/lean-body-mass-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is lean body mass and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Lean body mass (LBM) is your total body weight minus body fat mass. It includes muscles, bones, organs, water, and connective tissue—everything except fat. This calculator uses three validated formulas: Boer formula (0.407×weight + 0.267×height - 19.2 for men), James formula (1.1×weight - 128×(weight/height²)² for men), and Hume formula (0.3281×weight + 0.33929×height - 29.5336 for men). Each formula has slightly different coefficients for women. The calculator averages all three results for the most accurate estimate. LBM is crucial for understanding body composition, determining appropriate calorie needs, and tracking fitness progress.',
            },
          },
          {
            '@type': 'Question',
            name: 'How accurate is this lean body mass calculator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'This calculator provides good estimates using validated formulas from peer-reviewed research. The Boer, James, and Hume formulas correlate well with DEXA scans (gold standard) with typical errors of 3-5%. However, accuracy varies based on individual factors like muscle mass, bone density, and hydration. Athletes with high muscle mass may see higher estimates, while older adults may see lower estimates. For most people, averaging three formulas provides accuracy within ±5% of actual LBM. For precise measurements, consider DEXA scans, hydrostatic weighing, or bioelectrical impedance analysis at fitness facilities.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a healthy body fat percentage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Healthy body fat percentages vary by gender and age. For men: 2-5% is essential fat (minimum for survival), 6-13% is athletes level, 14-17% is fitness level, 18-24% is acceptable, and 25%+ is considered obese. For women: 10-13% is essential fat, 14-20% is athletes, 21-24% is fitness, 25-31% is acceptable, and 32%+ is obese. Women naturally have higher body fat percentages due to reproductive functions. Athletes typically maintain lower levels, but extremely low body fat can disrupt hormones, menstrual cycles, immune function, and bone health. Optimal levels balance health, performance, and sustainability.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I increase my lean body mass?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Increasing lean body mass requires progressive resistance training combined with adequate protein intake. Lift weights 3-4 times per week, focusing on compound movements like squats, deadlifts, bench press, and rows. Aim for 8-12 repetitions per set with progressively heavier weights. Consume 1.6-2.2g of protein per kilogram of body weight daily (about 0.73-1g per pound). Eat in a slight caloric surplus (200-300 calories above maintenance) to support muscle growth. Ensure 7-9 hours of quality sleep nightly for muscle recovery. Be patient—natural muscle gain averages 1-2 pounds per month for beginners, 0.5-1 pound for intermediates. Consistency over months and years produces significant results.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does lean body mass matter for weight loss?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Lean body mass is crucial during weight loss because it determines your metabolic rate and body composition. Muscle tissue burns approximately 6 calories per pound daily at rest, while fat burns only 2 calories per pound. Higher LBM means higher metabolism and easier weight maintenance. When losing weight without preserving LBM, you lose both fat and muscle, which slows metabolism and can lead to weight regain. Aim to preserve LBM during weight loss through strength training 2-3 times weekly, consuming adequate protein (1.6-2.4g per kg), and maintaining moderate caloric deficits (500-750 calories below maintenance). This approach ensures fat loss while maintaining metabolic rate and functional fitness.',
            },
          },
          {
            '@type': 'Question',
            name: 'What measurements do I need for this calculator?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You need five measurements: gender, weight, height, waist circumference, hip circumference (women only), and neck circumference. For weight and height, use accurate scales and measuring devices. For body circumferences: measure waist at navel level while standing relaxed, hip at the widest point (women), and neck below the Adam\'s apple. Take measurements in the morning after using the bathroom but before eating, wearing minimal clothing. Use a flexible tape measure that doesn\'t stretch, keeping it snug but not compressing skin. Measure three times and use the average for accuracy. Consistent measurement technique is crucial for tracking progress over time.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/lean-body-mass-calculator'),
        name: 'How to Use the Lean Body Mass Calculator',
        description: 'Step-by-step guide to calculating your lean body mass and understanding body composition.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Lean Body Mass Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Your Gender',
            text: 'Choose male or female. This is important because the calculation formulas use different coefficients for men and women due to natural differences in body composition. Men typically have higher muscle mass and lower body fat percentages.',
            url: getStepUrl('/lean-body-mass-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Weight and Height',
            text: 'Input your current weight and height using your preferred units (kg/lbs for weight, cm/inches for height). Use accurate measurements taken in the morning after using the bathroom. Remove heavy clothing and shoes for best accuracy.',
            url: getStepUrl('/lean-body-mass-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Measure Waist Circumference',
            text: 'Measure your waist at navel level while standing with relaxed abdomen. Use a flexible tape measure, keeping it snug but not compressing the skin. Take three measurements and use the average. This measurement is crucial for body fat percentage calculation.',
            url: getStepUrl('/lean-body-mass-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Measure Hip Circumference (Women Only)',
            text: 'If you are female, measure your hips at the widest point while standing with feet together. Keep the tape measure level all the way around. This measurement along with waist helps calculate body fat distribution using the U.S. Navy method.',
            url: getStepUrl('/lean-body-mass-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Measure Neck Circumference',
            text: 'Measure your neck just below the Adam\'s apple (laryngeal prominence). Keep your head in neutral position and measure the smallest circumference. Take multiple measurements for accuracy. Neck measurement helps estimate body fat percentage.',
            url: getStepUrl('/lean-body-mass-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Calculate Results',
            text: 'Click "Calculate Body Composition" to generate your results. The calculator will compute lean body mass using three validated formulas (Boer, James, Hume), average them, calculate body fat percentage, and determine muscle mass, BMI, and health rating.',
            url: getStepUrl('/lean-body-mass-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Review Body Composition Breakdown',
            text: 'Examine the pie chart showing your body composition split between lean mass and fat mass. Compare the results from different formulas in the bar chart to understand the range of estimates. Review your health rating based on body fat percentage.',
            url: getStepUrl('/lean-body-mass-calculator', 7),
          },
          {
            '@type': 'HowToStep',
            position: 8,
            name: 'Read Personalized Recommendations',
            text: 'Review the personalized fitness and nutrition recommendations based on your body composition. These suggestions help you maintain or improve your lean body mass through appropriate exercise and nutrition strategies. Consider consulting healthcare professionals for personalized guidance.',
            url: getStepUrl('/lean-body-mass-calculator', 8),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/lean-body-mass-calculator'),
        headline: 'Lean Body Mass Calculator - Complete Body Composition Analysis Guide',
        description:
          'Comprehensive guide to calculating lean body mass using validated formulas, understanding body composition, and improving muscle mass for better health and fitness.',
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
        dateModified: '2024-11-17',
        image: getOgImage('lean-body-mass'),
        articleBody:
          'Lean body mass represents the weight of everything in your body except fat, including muscles, bones, organs, and water. Understanding and tracking LBM is essential for fitness, health monitoring, and achieving body composition goals. This calculator uses three validated formulas to provide accurate estimates and comprehensive body composition analysis.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Lean Body Mass Calculator - Calculate LBM, Body Fat Percentage, and Muscle Mass with Multiple Formulas
      </h1>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol
            className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a
                href="/health-fitness"
                itemProp="item"
                className="hover:text-blue-600 transition-colors"
              >
                <span itemProp="name">Health & Fitness</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Lean Body Mass Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <LeanBodyMassCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Lean Body Mass and Body Composition
          </h2>

          <p className="text-gray-700 mb-4">
            Lean body mass (LBM) is one of the most important metrics for understanding your overall
            health, fitness level, and metabolic function. Unlike simple weight measurements, LBM
            provides insight into the quality of your body composition—specifically, how much of your
            weight comes from muscle, bone, organs, and water versus fat. This comprehensive guide
            explains everything you need to know about lean body mass, how to calculate it accurately,
            and why it matters for your health and fitness goals.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            What is Lean Body Mass?
          </h3>

          <p className="text-gray-700 mb-4">
            Lean body mass represents everything in your body that isn't fat tissue. This includes:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Skeletal Muscle:</strong> The muscles attached to your bones that control
              voluntary movement (40-50% of LBM in average adults)
            </li>
            <li>
              <strong>Bones and Connective Tissue:</strong> Your skeleton and the tissues that
              connect bones and muscles (15-20% of LBM)
            </li>
            <li>
              <strong>Internal Organs:</strong> Heart, liver, kidneys, brain, and other vital organs
              (15-20% of LBM)
            </li>
            <li>
              <strong>Water:</strong> Both intracellular and extracellular water that's not part of
              fat tissue (15-20% of LBM)
            </li>
            <li>
              <strong>Blood and Lymph:</strong> Circulatory fluids essential for nutrient transport
              and immune function
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            The formula for calculating lean body mass is straightforward: LBM = Total Body Weight -
            Fat Mass. However, accurately determining fat mass requires validated formulas and precise
            measurements, which is what this calculator provides using three different scientific
            methods.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Why Lean Body Mass Matters
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Metabolic Rate and Calorie Needs
          </h4>

          <p className="text-gray-700 mb-4">
            Your lean body mass is the primary determinant of your basal metabolic rate (BMR)—the
            number of calories your body burns at rest. Muscle tissue is metabolically active, burning
            approximately 6 calories per pound per day even when you're not exercising. In contrast, fat
            tissue burns only about 2 calories per pound daily. This means:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              Higher LBM = Higher metabolism and easier weight management
            </li>
            <li>
              Lower LBM = Lower metabolism and increased difficulty maintaining or losing weight
            </li>
            <li>
              Preserving LBM during weight loss prevents metabolic slowdown
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            For example, a person with 140 lbs of lean mass burns approximately 840 calories daily
            just from their lean tissues at rest, while someone with 120 lbs of lean mass burns 720
            calories—a 120-calorie difference. Over time, this adds up significantly.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Physical Performance and Function
          </h4>

          <p className="text-gray-700 mb-4">
            Lean body mass directly correlates with physical capabilities:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Strength:</strong> More muscle mass enables greater force production for
              lifting, pushing, and pulling
            </li>
            <li>
              <strong>Power:</strong> Higher LBM improves speed, jumping ability, and explosive
              movements
            </li>
            <li>
              <strong>Endurance:</strong> More muscle provides greater energy reserves and
              mitochondrial capacity
            </li>
            <li>
              <strong>Mobility:</strong> Adequate muscle mass supports joints and maintains range of
              motion throughout life
            </li>
            <li>
              <strong>Balance and Stability:</strong> Strong muscles prevent falls and injuries,
              especially important as we age
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Long-Term Health Outcomes
          </h4>

          <p className="text-gray-700 mb-4">
            Research consistently shows that higher lean body mass is associated with:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Reduced Disease Risk:</strong> Lower rates of type 2 diabetes, cardiovascular
              disease, and metabolic syndrome
            </li>
            <li>
              <strong>Better Glucose Control:</strong> Muscle is the primary site of glucose disposal,
              improving insulin sensitivity
            </li>
            <li>
              <strong>Bone Health:</strong> Resistance training and muscle mass help maintain bone
              density and prevent osteoporosis
            </li>
            <li>
              <strong>Longevity:</strong> Studies show muscle mass is inversely correlated with
              all-cause mortality, especially in older adults
            </li>
            <li>
              <strong>Mental Health:</strong> Exercise and muscle maintenance are associated with
              reduced depression and anxiety
            </li>
            <li>
              <strong>Recovery:</strong> Higher muscle mass aids recovery from illness, surgery, and
              injuries
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Calculation Methods Explained
          </h3>

          <p className="text-gray-700 mb-4">
            This calculator uses three validated formulas to estimate lean body mass, each developed
            through scientific research and tested against gold-standard measurement techniques:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Boer Formula (1984)
          </h4>

          <p className="text-gray-700 mb-4">
            The Boer formula is the most commonly used LBM calculation in clinical and research
            settings:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>For Men:</strong> LBM = 0.407 × weight(kg) + 0.267 × height(cm) - 19.2
            </li>
            <li>
              <strong>For Women:</strong> LBM = 0.252 × weight(kg) + 0.473 × height(cm) - 48.3
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Developed by Pieter Boer in 1984, this formula considers both weight and height to estimate
            lean mass. It's particularly accurate for individuals with average body compositions and has
            been validated against hydrostatic weighing and DEXA scans. The formula accounts for gender
            differences in body composition, with women having naturally higher body fat percentages due
            to reproductive functions and hormonal differences.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            James Formula (1976)
          </h4>

          <p className="text-gray-700 mb-4">
            The James formula incorporates BMI into the calculation:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>For Men:</strong> LBM = 1.1 × weight(kg) - 128 × (weight(kg) / height(m)²)²
            </li>
            <li>
              <strong>For Women:</strong> LBM = 1.07 × weight(kg) - 148 × (weight(kg) / height(m)²)²
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Developed by W.P.T. James, this method adjusts for body mass index squared, making it
            particularly useful for individuals with higher or lower BMIs. The formula tends to provide
            slightly different estimates than Boer, especially at the extremes of body weight, which is
            why averaging multiple formulas improves accuracy.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Hume Formula (1966)
          </h4>

          <p className="text-gray-700 mb-4">
            The Hume formula is one of the earliest validated LBM calculations:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>For Men:</strong> LBM = 0.3281 × weight(kg) + 0.33929 × height(cm) - 29.5336
            </li>
            <li>
              <strong>For Women:</strong> LBM = 0.29569 × weight(kg) + 0.41813 × height(cm) - 43.2933
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Developed by R. Hume in 1966, this formula has stood the test of time and remains widely
            used in pharmacology for drug dosing calculations. It provides reliable estimates across a
            broad range of body types and has been validated in numerous studies over decades of use.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Why Three Formulas?
          </h4>

          <p className="text-gray-700 mb-4">
            No single formula is perfect for all individuals. Body composition varies based on:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Genetics and ethnicity</li>
            <li>Training status and activity level</li>
            <li>Age and hormonal factors</li>
            <li>Previous weight loss or gain history</li>
            <li>Hydration status and water retention</li>
          </ul>

          <p className="text-gray-700 mb-4">
            By calculating LBM using three different formulas and averaging the results, this calculator
            provides a more robust estimate that accounts for the limitations of any single method. The
            typical variation between formulas is 3-5%, and averaging them reduces error and provides
            greater confidence in the result.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Body Fat Percentage Calculation
          </h3>

          <p className="text-gray-700 mb-4">
            This calculator uses the U.S. Navy circumference method to estimate body fat percentage, one
            of the most validated field methods available:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            U.S. Navy Method
          </h4>

          <p className="text-gray-700 mb-4">
            Developed by the U.S. Navy for fitness assessments, this method uses simple circumference
            measurements to estimate body fat with good accuracy (within 3-4% of DEXA scans):
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>For Men:</strong> Uses height, waist, and neck circumferences
            </li>
            <li>
              <strong>For Women:</strong> Uses height, waist, hip, and neck circumferences
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            The method works because body fat distribution follows predictable patterns. Larger waist
            circumference relative to height indicates higher body fat, while larger neck circumference
            (relative to body size) indicates more muscle mass. For women, hip circumference provides
            additional information about lower body fat distribution. The logarithmic relationships in
            the formulas account for the non-linear nature of body fat storage.
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Measurement Best Practices
          </h4>

          <p className="text-gray-700 mb-4">
            Accurate measurements are crucial for reliable results:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Timing:</strong> Measure in the morning after using the bathroom but before
              eating or drinking
            </li>
            <li>
              <strong>Clothing:</strong> Wear minimal clothing or measure directly on skin
            </li>
            <li>
              <strong>Tape Measure:</strong> Use a flexible, non-stretching tape measure
            </li>
            <li>
              <strong>Tension:</strong> Keep tape snug against skin without compressing tissue
            </li>
            <li>
              <strong>Position:</strong> Stand relaxed with natural posture, breathing normally
            </li>
            <li>
              <strong>Repeatability:</strong> Take three measurements and use the average
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Specific measurement locations:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Waist:</strong> At navel level, parallel to the floor, at the end of a normal
              exhale
            </li>
            <li>
              <strong>Hips (women):</strong> At the widest point of the buttocks, feet together
            </li>
            <li>
              <strong>Neck:</strong> Below the Adam's apple at the smallest circumference
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Understanding Body Fat Percentage Categories
          </h3>

          <p className="text-gray-700 mb-4">
            Body fat percentages have different health and fitness implications depending on gender:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            For Men
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>2-5% (Essential Fat):</strong> Minimum for survival. Bodybuilders achieve this
              temporarily for competitions. Not sustainable long-term and can impair immune function,
              hormone production, and organ function.
            </li>
            <li>
              <strong>6-13% (Athletes):</strong> Very lean, visible muscle definition, abs clearly
              visible. Common for competitive athletes, fitness models, and serious bodybuilders.
              Requires strict diet and training. May affect hormone levels if maintained long-term.
            </li>
            <li>
              <strong>14-17% (Fitness):</strong> Lean and fit appearance, some muscle definition
              visible. Sustainable for most people with regular exercise and mindful eating. Good
              balance of performance and health.
            </li>
            <li>
              <strong>18-24% (Acceptable):</strong> Average body fat for general population. Healthy
              range for most men with no specific fitness goals. Some softness in midsection but no
              major health concerns.
            </li>
            <li>
              <strong>25%+ (Obese):</strong> Increased health risks including type 2 diabetes,
              cardiovascular disease, sleep apnea, and joint problems. Recommended to reduce through
              diet and exercise.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            For Women
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>10-13% (Essential Fat):</strong> Minimum for survival and reproductive function.
              Only achieved by elite athletes temporarily. Can disrupt menstrual cycles, bone health,
              and hormone production. Not recommended except briefly under supervision.
            </li>
            <li>
              <strong>14-20% (Athletes):</strong> Very lean for women. Common for competitive athletes,
              fitness competitors, and serious gym-goers. Visible muscle definition. May affect
              menstrual regularity. Requires disciplined diet and training.
            </li>
            <li>
              <strong>21-24% (Fitness):</strong> Fit and healthy appearance. Sustainable with regular
              exercise (4-5 days/week) and balanced nutrition. Optimal for many women balancing health,
              fitness, and lifestyle.
            </li>
            <li>
              <strong>25-31% (Acceptable):</strong> Average and healthy for general population. No
              specific fitness training required. Curves are natural and healthy. Compatible with good
              health markers.
            </li>
            <li>
              <strong>32%+ (Obese):</strong> Increased health risks including type 2 diabetes, heart
              disease, PCOS, and fertility issues. Recommended to reduce through sustainable lifestyle
              changes.
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Important note: Women naturally have 6-11% more body fat than men due to biological
            differences related to childbearing and hormone production. This is healthy and necessary.
            Comparing female body fat percentages to male standards is inappropriate and can lead to
            unrealistic expectations.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How to Increase Lean Body Mass
          </h3>

          <p className="text-gray-700 mb-4">
            Building lean body mass requires a strategic combination of resistance training, nutrition,
            recovery, and consistency:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Resistance Training Principles
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Frequency:</strong> Train each muscle group 2-3 times per week with 48-72 hours
              recovery between sessions
            </li>
            <li>
              <strong>Volume:</strong> Perform 10-20 sets per muscle group per week (beginners start
              lower, advanced may go higher)
            </li>
            <li>
              <strong>Intensity:</strong> Lift 60-85% of your one-rep max, or 6-15 repetitions per
              set, taking most sets close to failure
            </li>
            <li>
              <strong>Progressive Overload:</strong> Gradually increase weight, reps, or sets over
              time. Aim to add 2.5-5 lbs or 1-2 reps every 1-2 weeks
            </li>
            <li>
              <strong>Compound Movements:</strong> Prioritize squats, deadlifts, bench press, rows,
              and overhead press which build the most muscle
            </li>
            <li>
              <strong>Full Range of Motion:</strong> Use complete movement ranges for maximum muscle
              fiber recruitment and growth stimulus
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Nutrition for Muscle Growth
          </h4>

          <p className="text-gray-700 mb-4">
            Proper nutrition is equally important as training:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Protein Intake:</strong> Consume 1.6-2.2g per kg of body weight daily (0.73-1g
              per pound). Distribute across 3-5 meals for optimal muscle protein synthesis. Include
              high-quality sources like chicken, fish, lean beef, eggs, dairy, legumes, and protein
              powder.
            </li>
            <li>
              <strong>Caloric Surplus:</strong> Eat 200-300 calories above maintenance (TDEE) to
              support muscle growth. Larger surpluses lead to more fat gain. Track intake for 2-4
              weeks to dial in your ideal surplus.
            </li>
            <li>
              <strong>Carbohydrates:</strong> Consume 3-5g per kg of body weight to fuel training and
              recovery. Time carbs around workouts for performance and glycogen replenishment.
            </li>
            <li>
              <strong>Fats:</strong> Maintain 0.5-1g per kg of body weight for hormone production,
              especially testosterone which supports muscle growth.
            </li>
            <li>
              <strong>Meal Timing:</strong> While not critical, spreading protein across 3-5 meals
              and consuming carbs and protein within 2 hours post-workout optimizes recovery.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Recovery and Sleep
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Sleep Duration:</strong> Aim for 7-9 hours of quality sleep nightly. Muscle
              protein synthesis peaks during deep sleep stages.
            </li>
            <li>
              <strong>Sleep Quality:</strong> Maintain consistent sleep schedule, dark/cool room
              (65-68°F), and avoid screens 1-2 hours before bed.
            </li>
            <li>
              <strong>Rest Days:</strong> Take 1-2 complete rest days per week. Active recovery (light
              walking, stretching, yoga) is beneficial.
            </li>
            <li>
              <strong>Stress Management:</strong> Chronic stress elevates cortisol which impairs
              muscle growth. Practice stress reduction techniques.
            </li>
            <li>
              <strong>Deload Weeks:</strong> Every 4-8 weeks, reduce training volume by 40-50% for
              one week to allow full recovery.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Realistic Expectations
          </h4>

          <p className="text-gray-700 mb-4">
            Understanding realistic muscle gain rates prevents frustration and unsustainable practices:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Beginners (0-1 year training):</strong> 1-2 lbs of muscle per month, or 12-24
              lbs in first year
            </li>
            <li>
              <strong>Intermediate (1-3 years):</strong> 0.5-1 lb of muscle per month, or 6-12 lbs
              per year
            </li>
            <li>
              <strong>Advanced (3+ years):</strong> 0.25-0.5 lb of muscle per month, or 3-6 lbs per
              year
            </li>
            <li>
              <strong>Elite (5+ years):</strong> Minimal gains, 1-2 lbs per year approaching genetic
              potential
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            These rates assume optimal training, nutrition, recovery, and consistency. Women typically
            gain muscle at about 50-70% of male rates due to lower testosterone levels. Age also
            affects rates—those over 40 may gain slightly slower but can still make significant
            progress. The key is patience and consistency over months and years rather than seeking
            quick results.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Maintaining Lean Body Mass During Weight Loss
          </h3>

          <p className="text-gray-700 mb-4">
            Preserving muscle during fat loss is crucial for maintaining metabolism and achieving an
            aesthetic physique:
          </p>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Key Strategies
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Moderate Caloric Deficit:</strong> Aim for 500-750 calorie deficit (about 1-1.5
              lbs loss per week). Larger deficits increase muscle loss risk. Adjust based on energy
              levels and performance.
            </li>
            <li>
              <strong>High Protein Intake:</strong> Increase to 2.0-2.4g per kg of body weight (about
              1g per pound) during caloric deficits. Higher protein preserves muscle and increases
              satiety.
            </li>
            <li>
              <strong>Maintain Training Intensity:</strong> Keep lifting heavy weights (relative to
              your ability) even in a deficit. You may need to reduce volume slightly, but maintain
              intensity to signal your body to preserve muscle.
            </li>
            <li>
              <strong>Limit Cardio:</strong> Excessive cardio can interfere with recovery and muscle
              preservation. Limit to 150-200 minutes of moderate cardio weekly, or 75-100 minutes of
              vigorous activity.
            </li>
            <li>
              <strong>Prioritize Sleep:</strong> Sleep becomes even more important during deficits. Aim
              for 8-9 hours nightly to support recovery and hormone balance.
            </li>
            <li>
              <strong>Diet Breaks:</strong> Every 8-12 weeks of dieting, take 1-2 weeks at
              maintenance calories to restore hormones and reduce metabolic adaptation.
            </li>
            <li>
              <strong>Supplement Creatine:</strong> 5g daily of creatine monohydrate helps maintain
              strength and muscle during deficits.
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Warning Signs of Muscle Loss
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Strength decreasing by more than 10-15% on major lifts</li>
            <li>Weight loss exceeding 1.5 lbs per week consistently</li>
            <li>Severe fatigue and poor recovery between workouts</li>
            <li>Loss of muscle fullness and vascularity</li>
            <li>Extreme hunger and food obsession</li>
            <li>Sleep disturbances and mood changes</li>
          </ul>

          <p className="text-gray-700 mb-4">
            If experiencing these signs, reduce caloric deficit, increase protein further, or take a
            diet break at maintenance calories for 1-2 weeks.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Special Considerations
          </h3>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Age and Lean Body Mass
          </h4>

          <p className="text-gray-700 mb-4">
            Sarcopenia (age-related muscle loss) begins around age 30, with adults losing 3-8% of muscle
            mass per decade without intervention:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Prevention:</strong> Regular resistance training 2-3 times weekly, adequate
              protein (1.2-1.6g per kg minimum), and vitamin D sufficiency
            </li>
            <li>
              <strong>Older Adults (50+):</strong> May need higher protein (1.6-2.0g per kg) and more
              recovery time between sessions
            </li>
            <li>
              <strong>Training Modifications:</strong> Emphasize compound movements, slower
              eccentrics, and joint-friendly exercises
            </li>
            <li>
              <strong>Benefits:</strong> Resistance training at any age improves muscle mass, strength,
              balance, and quality of life
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Gender Differences
          </h4>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Hormones:</strong> Men have 15-20x more testosterone than women, enabling faster
              and greater muscle growth
            </li>
            <li>
              <strong>Muscle Distribution:</strong> Men carry more muscle in upper body, women more in
              lower body relative to total mass
            </li>
            <li>
              <strong>Body Fat:</strong> Women naturally have 6-11% higher body fat for reproductive
              health
            </li>
            <li>
              <strong>Training Response:</strong> Women and men respond similarly to resistance
              training (relatively), building similar percentage gains in strength and muscle
            </li>
          </ul>

          <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Athletic Populations
          </h4>

          <p className="text-gray-700 mb-4">
            Different sports emphasize different aspects of body composition:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Strength Athletes:</strong> Powerlifters and strongmen prioritize maximum muscle
              mass and may carry higher body fat (15-25% for men)
            </li>
            <li>
              <strong>Physique Athletes:</strong> Bodybuilders and fitness competitors maximize muscle
              while minimizing fat (5-12% for men, 12-20% for women)
            </li>
            <li>
              <strong>Endurance Athletes:</strong> Runners and cyclists optimize power-to-weight ratio
              with moderate muscle and low fat
            </li>
            <li>
              <strong>Team Sports:</strong> Balance muscle mass for power with body composition for
              speed and agility
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Limitations of LBM Calculations
          </h3>

          <p className="text-gray-700 mb-4">
            While this calculator provides good estimates, it's important to understand its limitations:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Population Averages:</strong> Formulas are based on population studies and may
              not perfectly match individual variations
            </li>
            <li>
              <strong>Ethnicity:</strong> Body composition differs among ethnic groups; formulas may be
              less accurate for non-Caucasian populations
            </li>
            <li>
              <strong>Extreme Body Types:</strong> Very muscular or very lean individuals may see
              less accurate estimates
            </li>
            <li>
              <strong>Hydration:</strong> Water retention or dehydration affects measurements,
              especially circumferences
            </li>
            <li>
              <strong>Measurement Error:</strong> Circumference measurements require skill and
              consistency for accuracy
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            For most accurate body composition assessment, consider:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>DEXA Scan:</strong> Dual-energy X-ray absorptiometry, considered gold standard
              (±1-2% accuracy)
            </li>
            <li>
              <strong>Hydrostatic Weighing:</strong> Underwater weighing, very accurate (±2-3%
              accuracy)
            </li>
            <li>
              <strong>Bod Pod:</strong> Air displacement plethysmography (±2-3% accuracy)
            </li>
            <li>
              <strong>BIA:</strong> Bioelectrical impedance analysis, less accurate (±3-5%) but
              convenient for tracking trends
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Additional Resources</h3>

          <p className="text-gray-700 mb-4">
            For more information about body composition, fitness, and health, explore these authoritative resources:
          </p>

          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <a
                href="https://www.cdc.gov/healthyweight/assessing/bmi/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                CDC - Healthy Weight Assessment
              </a>{' '}
              - Government guidance on healthy weight and body composition
            </li>
            <li>
              <a
                href="https://www.acsm.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                American College of Sports Medicine
              </a>{' '}
              - Evidence-based fitness and health recommendations
            </li>
            <li>
              <a
                href="https://www.nutrition.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Nutrition.gov
              </a>{' '}
              - Federal nutrition information and guidance
            </li>
            <li>
              <a
                href="https://www.niddk.nih.gov/health-information/weight-management"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                National Institute of Diabetes and Digestive and Kidney Diseases
              </a>{' '}
              - Comprehensive weight management resources
            </li>
          </ul>
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
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate your body mass index and health status</p>
          </a>

          <a
            href="/body-fat-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-semibold text-gray-900">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Estimate your body fat percentage accurately</p>
          </a>

          <a
            href="/calorie-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-semibold text-gray-900">Calorie Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate daily calorie needs for your goals</p>
          </a>

          <a
            href="/tdee-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">TDEE Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate total daily energy expenditure</p>
          </a>

          <a
            href="/protein-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🥩</div>
            <h3 className="font-semibold text-gray-900">Protein Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate optimal daily protein intake</p>
          </a>

          <a
            href="/macro-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🍽️</div>
            <h3 className="font-semibold text-gray-900">Macro Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate macronutrient ratios for your diet</p>
          </a>

          <a
            href="/ideal-weight-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">Ideal Weight Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your ideal body weight range</p>
          </a>

          <a
            href="/one-rep-max-calculator"
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💪</div>
            <h3 className="font-semibold text-gray-900">One Rep Max Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate your maximum strength for lifts</p>
          </a>
        </div>
      </section>
    </div>
  );
}

