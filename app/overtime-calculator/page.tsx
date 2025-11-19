import type { Metadata } from 'next';
import OvertimeCalculator from '@/components/Calculator/OvertimeCalculator';

export const metadata: Metadata = {
  title: 'Overtime Calculator (Free, No signup) - OT Pay | AICalculator',
  description: 'Free overtime calculator with no sign-up required. With labor law compliance checking. Calculate overtime pay, double time, and ensure FLSA compliance. Supports state-specific overtime rules.',
  keywords: [
    'overtime calculator',
    'free overtime calculator',
    'overtime calculator no signup',
    'overtime pay calculator',
    'time and a half calculator',
    'double time calculator',
    'labor law compliance',
    'FLSA calculator',
    'overtime rate calculator',
    'payroll calculator',
    'wage calculator',
    'overtime cost calculator',
    'employee overtime',
    'overtime premium',
    'labor cost calculator',
    'overtime analysis',
    'work hours calculator',
    'overtime compliance',
    'california overtime',
    'federal overtime rules',
    'overtime multiplier',
    'business labor costs'
  ],
  authors: [{ name: 'Calculator Tools Team' }],
  creator: 'Calculator Tools',
  publisher: 'Calculator Tools',
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
  openGraph: {
    title: 'Overtime Calculator (Free, No signup) - AICalculator',
    description: 'Free overtime calculator with no sign-up required. Calculate overtime pay with labor law compliance checking. Supports federal and state-specific overtime rules for accurate payroll calculations.',
    url: 'https://calculator-tools.com/overtime-calculator',
    siteName: 'Calculator Tools',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://calculator-tools.com/images/overtime-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Overtime Calculator - Labor Law Compliance and Pay Calculation Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overtime Calculator (Free, No signup) - AICalculator',
    description: 'Free overtime calculator with no sign-up required. Calculate overtime pay and ensure labor law compliance. Supports federal and state overtime rules for accurate payroll.',
    images: ['https://calculator-tools.com/images/overtime-calculator-twitter.jpg'],
    creator: '@CalculatorTools',
  },
  alternates: {
    canonical: 'https://calculator-tools.com/overtime-calculator',
  },
  other: {
    'last-modified': new Date().toISOString(),
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://calculator-tools.com/overtime-calculator#webapp',
      name: 'Overtime Calculator',
      description: 'Professional overtime calculator with labor law compliance checking for federal and state-specific overtime rules, cost analysis, and payroll planning.',
      url: 'https://calculator-tools.com/overtime-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      permissions: 'browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        'Calculate overtime pay at 1.5x rate',
        'Double time pay calculations',
        'Labor law compliance checking',
        'Federal FLSA compliance',
        'State-specific overtime rules',
        'California overtime calculations',
        'Cost analysis and premiums',
        'Exempt vs non-exempt employees',
        'Pay period projections',
        'Annual salary equivalents',
        'Compliance violation warnings',
        'Save results as image',
        'Mobile-responsive design',
        'Real-time calculations',
        'HR and payroll planning'
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://calculator-tools.com/overtime-calculator#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Calculator Tools',
          item: 'https://calculator-tools.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Financial Calculators',
          item: 'https://calculator-tools.com/financial',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Overtime Calculator',
          item: 'https://calculator-tools.com/overtime-calculator',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://calculator-tools.com/overtime-calculator#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the federal overtime rate under FLSA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive overtime pay at 1.5 times their regular rate for hours worked over 40 in a workweek. This applies to most hourly employees and some salaried employees earning less than $684 per week.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which states have daily overtime requirements?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'California requires overtime after 8 hours per day and double time after 12 hours. Alaska requires overtime after 8 hours per day. Nevada has daily overtime for certain employees. Colorado requires overtime after 12 hours per day. Most other states follow federal weekly-only rules.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is exempt from overtime pay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Exempt employees include executives, administrators, professionals, computer employees, and outside sales workers who meet specific salary and duties tests. They must earn at least $684 per week ($35,568 annually) and perform primarily executive, administrative, or professional duties.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you calculate overtime pay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Overtime pay = Regular hourly rate × 1.5 × Overtime hours. For example, if you earn $20/hour and work 10 overtime hours: $20 × 1.5 × 10 = $300 in overtime pay. Add this to your regular pay for total compensation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is double time pay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Double time pay is compensation at twice the regular rate, typically required in California after 12 hours in a day or 8 hours on the 7th consecutive day. Some employers voluntarily offer double time for holidays or excessive overtime hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can employers require overtime work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, employers can generally require overtime work from non-exempt employees, though they must pay the overtime rate. Some states and union contracts may limit mandatory overtime. Employers cannot retaliate against employees for refusing to work overtime in certain protected situations.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': 'https://calculator-tools.com/overtime-calculator#howto',
      name: 'How to Calculate Overtime Pay and Ensure Labor Law Compliance',
      description: 'Step-by-step guide to calculate overtime compensation and verify compliance with federal and state labor laws',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Determine Employee Classification',
          text: 'Identify if the employee is exempt or non-exempt from overtime. Non-exempt employees are entitled to overtime pay, while exempt employees (meeting salary and duties tests) are not.',
        },
        {
          '@type': 'HowToStep',
          name: 'Enter Work Hours and Rate',
          text: 'Input regular hours worked, overtime hours, and the employee\'s regular hourly rate. Separate regular time (typically up to 40 hours) from overtime hours.',
        },
        {
          '@type': 'HowToStep',
          name: 'Select Overtime Rate',
          text: 'Choose the appropriate overtime multiplier: 1.5x for standard overtime (time and a half), 2.0x for double time, or other rates as required by law or company policy.',
        },
        {
          '@type': 'HowToStep',
          name: 'Choose Jurisdiction',
          text: 'Select the applicable state or federal jurisdiction to ensure compliance with local overtime laws. Some states have daily overtime requirements in addition to weekly limits.',
        },
        {
          '@type': 'HowToStep',
          name: 'Review Compliance and Costs',
          text: 'Examine the compliance status, cost analysis, and recommendations. Address any violations and consider the overtime premium impact on labor costs.',
        },
      ],
    },
  ],
};

export default function OvertimeCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3" itemScope itemType="https://schema.org/BreadcrumbList">
                <li className="inline-flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600" itemProp="item">
                    <span itemProp="name">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <a href="/financial" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2" itemProp="item">
                      <span itemProp="name">Financial</span>
                    </a>
                    <meta itemProp="position" content="2" />
                  </div>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2" itemProp="name">Overtime Calculator</span>
                    <meta itemProp="position" content="3" />
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          Overtime Calculator - Calculate Overtime Pay with Labor Law Compliance Analysis
        </h1>

        {/* Calculator Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Overtime Calculator
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate overtime pay with labor law compliance checking. Supports 
              federal FLSA and state-specific overtime rules including California's 
              daily overtime requirements.
            </p>
          </div>

          <OvertimeCalculator />
        </div>

        {/* Educational Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Complete Guide to Overtime Pay and Labor Law Compliance
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Understanding Overtime Laws
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Overtime laws protect workers by ensuring fair compensation for extended work hours. 
                    The Fair Labor Standards Act (FLSA) establishes federal minimum standards, while 
                    states may provide additional protections.
                  </p>
                  <p className="text-gray-700">
                    Our calculator helps employers and employees understand overtime obligations, 
                    calculate proper compensation, and ensure compliance with applicable laws.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Key Overtime Concepts
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Regular Rate:</strong> Base hourly pay for overtime calculations</li>
                    <li>• <strong>Time and a Half:</strong> 1.5x regular rate for overtime hours</li>
                    <li>• <strong>Double Time:</strong> 2x regular rate for excessive hours</li>
                    <li>• <strong>Workweek:</strong> Fixed 168-hour period for overtime calculations</li>
                    <li>• <strong>Non-Exempt:</strong> Employees eligible for overtime pay</li>
                    <li>• <strong>Exempt:</strong> Employees not entitled to overtime pay</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Federal vs. State Overtime Laws
              </h3>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-blue-900 mb-3">
                  Federal FLSA Requirements
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2">Basic Standards</h5>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Overtime after 40 hours per week</li>
                      <li>• 1.5x regular rate for overtime</li>
                      <li>• No daily overtime requirement</li>
                      <li>• Applies to non-exempt employees</li>
                      <li>• $7.25 federal minimum wage</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-2">Exempt Employee Tests</h5>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Salary of at least $684/week ($35,568/year)</li>
                      <li>• Executive duties test</li>
                      <li>• Administrative duties test</li>
                      <li>• Professional duties test</li>
                      <li>• Computer employee exception</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-green-900 mb-4">
                    California Overtime Laws
                  </h4>
                  <p className="text-green-800 mb-3">
                    California has the most comprehensive overtime laws in the US:
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Overtime after 8 hours per day</li>
                    <li>• Overtime after 40 hours per week</li>
                    <li>• Double time after 12 hours per day</li>
                    <li>• Double time after 8 hours on 7th consecutive day</li>
                    <li>• Higher salary threshold for exemptions</li>
                    <li>• Stricter duties tests</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-orange-900 mb-4">
                    Other State Variations
                  </h4>
                  <div className="text-orange-700 text-sm space-y-2">
                    <p><strong>Alaska:</strong> Daily overtime after 8 hours</p>
                    <p><strong>Nevada:</strong> Daily overtime after 8 hours (if paid less than 1.5x minimum wage)</p>
                    <p><strong>Colorado:</strong> Daily overtime after 12 hours</p>
                    <p><strong>Minnesota:</strong> Weekly overtime after 48 hours</p>
                    <p className="text-orange-600 mt-3">
                      <strong>Note:</strong> When federal and state laws differ, the more generous standard applies.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Calculating Overtime Pay
              </h3>

              <div className="bg-yellow-50 p-6 rounded-lg mb-8">
                <h4 className="text-xl font-semibold text-yellow-900 mb-3">
                  Step-by-Step Calculation
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border border-yellow-200">
                    <h5 className="font-semibold text-yellow-900 mb-2">Example: 50-hour work week</h5>
                    <div className="text-yellow-800 text-sm space-y-1">
                      <p>Regular rate: $20/hour</p>
                      <p>Regular hours: 40 hours × $20 = $800</p>
                      <p>Overtime hours: 10 hours × ($20 × 1.5) = 10 × $30 = $300</p>
                      <p><strong>Total pay: $800 + $300 = $1,100</strong></p>
                      <p>Effective rate: $1,100 ÷ 50 hours = $22/hour</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded border border-yellow-200">
                    <h5 className="font-semibold text-yellow-900 mb-2">California Example: 12-hour day</h5>
                    <div className="text-yellow-800 text-sm space-y-1">
                      <p>Regular rate: $25/hour</p>
                      <p>Regular time: 8 hours × $25 = $200</p>
                      <p>Overtime: 4 hours × ($25 × 1.5) = $150</p>
                      <p>Double time: 0 hours (starts after 12 hours)</p>
                      <p><strong>Total pay: $200 + $150 = $350</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Common Overtime Violations and Penalties
              </h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="text-lg font-semibold text-red-900 mb-3">
                    Misclassification
                  </h4>
                  <p className="text-red-800 text-sm mb-2">
                    Incorrectly classifying non-exempt employees as exempt
                  </p>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>• Back pay for unpaid overtime</li>
                    <li>• Liquidated damages (double damages)</li>
                    <li>• Attorney fees and court costs</li>
                    <li>• DOL investigations</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="text-lg font-semibold text-red-900 mb-3">
                    Unpaid Overtime
                  </h4>
                  <p className="text-red-800 text-sm mb-2">
                    Failing to pay required overtime premiums
                  </p>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>• 2-3 years of back wages</li>
                    <li>• Equal amount in liquidated damages</li>
                    <li>• Civil penalties up to $2,074 per violation</li>
                    <li>• Criminal penalties for willful violations</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="text-lg font-semibold text-red-900 mb-3">
                    Recordkeeping Failures
                  </h4>
                  <p className="text-red-800 text-sm mb-2">
                    Inadequate time and pay records
                  </p>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>• Presumption against employer</li>
                    <li>• Burden of proof shifts to employer</li>
                    <li>• Additional penalties and fines</li>
                    <li>• Audit triggers and investigations</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Best Practices for Overtime Management
              </h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    For Employers
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Accurate Classification:</strong> Regularly review exempt/non-exempt status</li>
                    <li>• <strong>Time Tracking:</strong> Implement reliable timekeeping systems</li>
                    <li>• <strong>Approval Processes:</strong> Require pre-approval for overtime work</li>
                    <li>• <strong>Regular Audits:</strong> Review payroll for compliance issues</li>
                    <li>• <strong>Training:</strong> Educate managers on overtime laws</li>
                    <li>• <strong>Documentation:</strong> Maintain detailed records for 3+ years</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    For Employees
                  </h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• <strong>Know Your Rights:</strong> Understand applicable overtime laws</li>
                    <li>• <strong>Track Time:</strong> Keep personal records of hours worked</li>
                    <li>• <strong>Report Issues:</strong> Notify HR of potential violations</li>
                    <li>• <strong>Understand Classification:</strong> Know if you're exempt or non-exempt</li>
                    <li>• <strong>Review Pay Stubs:</strong> Verify overtime calculations</li>
                    <li>• <strong>Seek Help:</strong> Contact DOL or attorney if needed</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-900 mb-4">
                  Start Managing Overtime Compliance Today
                </h4>
                <p className="text-blue-800 mb-4">
                  Use our comprehensive overtime calculator to ensure accurate pay calculations 
                  and labor law compliance. Whether you're an employer managing payroll costs 
                  or an employee verifying your pay, our tool provides the analysis you need.
                </p>
                <p className="text-blue-700">
                  Stay compliant with federal and state overtime laws while managing labor 
                  costs effectively. Our calculator helps you understand the true cost of 
                  overtime and make informed staffing decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
