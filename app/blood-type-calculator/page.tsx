import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import BloodTypeCalculator from '@/components/Calculator/BloodTypeCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Blood Type Calculator - Predict Child Blood Type | AICalculator',
  description: 'Free blood type calculator to predict possible blood types for your children based on parents\' blood types. Learn about ABO and Rh genetics, blood compatibility, and inheritance patterns.',
  keywords: [
    'blood type calculator',
    'blood type inheritance',
    'child blood type',
    'blood type genetics',
    'ABO blood type',
    'Rh factor calculator',
    'blood type compatibility',
    'blood type predictor',
    'genetics calculator',
    'blood group calculator',
    'blood type chart',
    'blood donation compatibility',
    'universal donor',
    'universal recipient',
    'blood type probability',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Blood Type Calculator - Predict Child Blood Type',
    description: 'Calculate possible blood types for your children based on parents\' blood types with genetic probability.',
    type: 'website',
    url: getUrl('/blood-type-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('blood-type'),
      width: 1200,
      height: 630,
      alt: 'Blood Type Calculator',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blood Type Calculator',
    description: 'Predict child blood type based on parents genetics',
    images: [getOgImage('blood-type')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/blood-type-calculator'),
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
      '@id': getWebAppId('/blood-type-calculator'),
      name: 'Blood Type Calculator',
      url: getUrl('/blood-type-calculator'),
      description: 'Calculate possible blood types for children based on parents\' blood types using Mendelian genetics and ABO/Rh inheritance patterns.',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Blood type inheritance prediction',
        'ABO blood group calculation',
        'Rh factor inheritance',
        'Probability percentages',
        'Blood compatibility chart',
        'Donor and recipient matching',
        'Genetics explanation',
        'Mendelian inheritance patterns',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/blood-type-calculator'),
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
          name: 'Blood Type Calculator',
          item: getUrl('/blood-type-calculator'),
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/blood-type-calculator'),
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How is blood type inherited?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Blood type is inherited through genes from both parents. Each parent passes one of two ABO alleles (A, B, or O) to their child. Type A and B are dominant over O. If a child receives A from one parent and B from the other, they will have AB blood type. The Rh factor is also inherited separately, with Rh+ being dominant over Rh-. This means a child needs two Rh- genes (one from each parent) to be Rh negative.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can two O+ parents have an A+ child?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, two parents with O blood type can only have children with O blood type. This is because O is recessive and requires two O alleles. Since both parents can only pass O alleles, the child must have OO genotype, resulting in type O blood. However, the Rh factor can vary—two O+ parents can have O+ or O- children depending on their Rh genotypes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the universal blood donor type?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O negative (O-) is the universal donor blood type because it lacks A, B, and Rh antigens that could trigger an immune response in recipients. O- blood can be safely given to patients of any blood type in emergency situations. However, O- individuals can only receive O- blood themselves. Conversely, AB+ is the universal recipient, able to receive blood from any type.',
          },
        },
        {
          '@type': 'Question',
          name: 'How accurate is the blood type calculator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The blood type calculator is highly accurate for predicting possible blood types based on Mendelian genetics. It calculates all genetically possible combinations and their probabilities. However, it assumes standard ABO and Rh inheritance patterns. Rare genetic variations and mutations (occurring in less than 0.01% of cases) are not accounted for. For medical decisions, always confirm blood types through laboratory testing.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/blood-type-calculator'),
      name: 'How to Use Blood Type Calculator',
      description: 'Calculate possible blood types for your children',
      totalTime: 'PT2M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: {
        '@type': 'HowToTool',
        name: 'Blood Type Calculator',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Parent 1 Blood Type',
          text: 'Choose the blood type (A, B, AB, or O) and Rh factor (+ or -) for the first parent.',
          url: getStepUrl('/blood-type-calculator', 1),
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Select Parent 2 Blood Type',
          text: 'Choose the blood type (A, B, AB, or O) and Rh factor (+ or -) for the second parent.',
          url: getStepUrl('/blood-type-calculator', 2),
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Calculate Results',
          text: 'Click the Calculate button to see all possible blood types for children with their probabilities.',
          url: getStepUrl('/blood-type-calculator', 3),
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Review Compatibility',
          text: 'View blood compatibility information including which blood types can donate to or receive from the most likely child blood type.',
          url: getStepUrl('/blood-type-calculator', 4),
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/blood-type-calculator'),
      headline: 'Blood Type Calculator - Understanding ABO and Rh Inheritance',
      description: 'Complete guide to blood type genetics, inheritance patterns, and compatibility for donation and transfusion.',
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
      image: getOgImage('blood-type'),
      articleBody: 'Blood type inheritance follows Mendelian genetics principles, with the ABO system and Rh factor being the most important...',
    },
  ],
};

export default function BloodTypeCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Blood Type Calculator - Predict Child Blood Type</h1>
      
      {/* Breadcrumb */}
      {/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="Blood Type Calculator"
        calculatorUrl="/blood-type-calculator"
      />

      <BloodTypeCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Blood Type Genetics</h2>
          <p className="text-gray-700 mb-4">
            Blood type inheritance follows predictable genetic patterns based on Mendelian genetics. Understanding how blood types are passed from parents to children can help you predict possible blood types for your offspring and understand blood compatibility for medical purposes.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">The ABO Blood Group System</h3>
          <p className="text-gray-700 mb-4">
            The ABO system classifies blood into four main types based on the presence or absence of A and B antigens on red blood cells:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Type A:</strong> Has A antigens on red cells and anti-B antibodies in plasma</li>
            <li><strong>Type B:</strong> Has B antigens on red cells and anti-A antibodies in plasma</li>
            <li><strong>Type AB:</strong> Has both A and B antigens, no anti-A or anti-B antibodies (universal recipient)</li>
            <li><strong>Type O:</strong> Has no A or B antigens, has both anti-A and anti-B antibodies (universal donor)</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Genetic Inheritance Patterns</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Allele Combinations</h4>
            <p className="text-gray-700 mb-2">
              Each person inherits one ABO allele from each parent. Possible combinations:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• AA or AO = Type A blood</li>
              <li>• BB or BO = Type B blood</li>
              <li>• AB = Type AB blood</li>
              <li>• OO = Type O blood</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">The Rh Factor</h3>
          <p className="text-gray-700 mb-4">
            The Rh factor is a separate protein that can be present (+) or absent (-) on red blood cells. Rh positive is dominant over Rh negative:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Rh+:</strong> Can have ++ or +- genotype</li>
            <li><strong>Rh-:</strong> Must have -- genotype (two negative genes)</li>
            <li>Two Rh+ parents can have Rh- children if both carry the recessive gene</li>
            <li>Two Rh- parents can only have Rh- children</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Blood Compatibility for Transfusion</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Blood Type</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Can Donate To</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Can Receive From</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">O-</td>
                  <td className="border border-gray-300 px-4 py-2">All types (Universal Donor)</td>
                  <td className="border border-gray-300 px-4 py-2">O-</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">O+</td>
                  <td className="border border-gray-300 px-4 py-2">O+, A+, B+, AB+</td>
                  <td className="border border-gray-300 px-4 py-2">O-, O+</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">A-</td>
                  <td className="border border-gray-300 px-4 py-2">A-, A+, AB-, AB+</td>
                  <td className="border border-gray-300 px-4 py-2">O-, A-</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">A+</td>
                  <td className="border border-gray-300 px-4 py-2">A+, AB+</td>
                  <td className="border border-gray-300 px-4 py-2">O-, O+, A-, A+</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">B-</td>
                  <td className="border border-gray-300 px-4 py-2">B-, B+, AB-, AB+</td>
                  <td className="border border-gray-300 px-4 py-2">O-, B-</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">B+</td>
                  <td className="border border-gray-300 px-4 py-2">B+, AB+</td>
                  <td className="border border-gray-300 px-4 py-2">O-, O+, B-, B+</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">AB-</td>
                  <td className="border border-gray-300 px-4 py-2">AB-, AB+</td>
                  <td className="border border-gray-300 px-4 py-2">O-, A-, B-, AB-</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-semibold">AB+</td>
                  <td className="border border-gray-300 px-4 py-2">AB+</td>
                  <td className="border border-gray-300 px-4 py-2">All types (Universal Recipient)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Important Medical Considerations</h3>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Rh Incompatibility in Pregnancy</h4>
            <p className="text-gray-700">
              When an Rh- mother carries an Rh+ baby, her immune system may produce antibodies against the baby's Rh+ blood cells. This can cause hemolytic disease in subsequent pregnancies. RhoGAM injections prevent this complication by stopping antibody formation.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Blood Type Distribution</h3>
          <p className="text-gray-700 mb-4">
            Blood type frequency varies by ethnicity and geography. In the United States:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>O+ is most common (37-38% of population)</li>
            <li>AB- is rarest (less than 1% of population)</li>
            <li>About 85% of people are Rh positive</li>
            <li>Type O is more common in Hispanic and African American populations</li>
          </ul>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/pregnancy-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🤰</div>
            <h3 className="font-semibold text-gray-900">Pregnancy Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate due date and milestones</p>
          </a>
          <a href="/ovulation-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-gray-900">Ovulation Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Find your fertile window</p>
          </a>
          <a href="/bmi-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-semibold text-gray-900">BMI Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate body mass index</p>
          </a>
          <a href="/age-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🎂</div>
            <h3 className="font-semibold text-gray-900">Age Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate exact age</p>
          </a>
        </div>
      </section>
    </div>
  );
}

