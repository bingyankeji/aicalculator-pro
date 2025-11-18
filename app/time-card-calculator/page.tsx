import { Metadata } from 'next';
import TimeCardCalculator from '@/components/Calculator/TimeCardCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Time Card Calculator - Track Work Hours & Calculate Pay | AICalculator',
  description: 'Free time card calculator to track work hours, calculate overtime, and compute weekly pay. Supports break deductions, multiple pay rates, and generates printable timesheets.',
  keywords: [
    'time card calculator',
    'timesheet calculator',
    'work hours calculator',
    'overtime calculator',
    'paycheck calculator',
    'time clock calculator',
    'weekly hours calculator',
    'timecard',
    'time tracker',
    'work time calculator',
    'employee hours',
    'hourly pay calculator',
    'time and attendance',
    'punch clock calculator',
    'labor hours calculator',
    'shift calculator',
    'time punch calculator',
    'weekly timesheet',
    'work schedule calculator',
    'break time calculator',
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Time Card Calculator - Track Work Hours & Calculate Pay',
    description: 'Free time card calculator to track work hours, calculate overtime, and compute weekly pay with break deductions.',
    type: 'website',
    url: getUrl('/time-card-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('timecard'),
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Card Calculator - Track Work Hours & Calculate Pay',
    description: 'Free time card calculator to track work hours, calculate overtime, and compute weekly pay with break deductions.',
    images: [getOgImage('timecard')],
    creator: '@aicalculator',
  },
  alternates: {
    canonical: getUrl('/time-card-calculator'),
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

export default function TimeCardCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/time-card-calculator'),
        name: 'Time Card Calculator',
        url: getUrl('/time-card-calculator'),
        description: 'Free online time card calculator to track work hours, calculate overtime pay, deduct breaks, and generate weekly timesheets. Supports multiple pay rates and customizable settings.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Track daily work hours with start and end times',
          'Automatic break time deduction',
          'Calculate overtime and double-time pay',
          'Multiple pay rate support',
          'Weekly hours summary',
          'Printable timesheet reports',
          'Time rounding options',
          'Pay breakdown by hour type',
          'Visual charts and graphs',
          'Export to PDF and image',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/time-card-calculator'),
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
            name: 'Time Card Calculator',
            item: getUrl('/time-card-calculator'),
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/time-card-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does a time card calculator work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A time card calculator works by taking your clock-in and clock-out times for each workday, subtracting any break periods, and calculating total hours worked. It then applies your hourly wage to compute gross pay. Advanced calculators handle overtime (typically time-and-a-half for hours over 40 per week), double-time rates, and various rounding rules. The calculator tracks each day separately and provides weekly totals, making it easy to verify paychecks and generate reports for payroll processing.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate my work hours from a time card?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To calculate work hours: (1) Note your clock-in time (e.g., 8:30 AM) and clock-out time (e.g., 5:00 PM). (2) Calculate total time: 5:00 PM - 8:30 AM = 8.5 hours. (3) Subtract unpaid breaks: 8.5 hours - 0.5 hour lunch = 8 hours worked. (4) Repeat for each workday. (5) Add all daily hours for your weekly total. Many employers round to the nearest quarter hour (15 minutes), so 8:32 becomes 8:30. Use a time card calculator to automate this process and avoid manual errors.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is overtime and how is it calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Overtime is additional pay for hours worked beyond the standard 40-hour workweek. Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive 1.5× their regular hourly rate for overtime hours. For example, if you earn $20/hour and work 45 hours, you get: (40 hours × $20) + (5 hours × $30) = $800 + $150 = $950. Some states have daily overtime rules (e.g., California pays overtime after 8 hours per day). Double-time (2× pay) may apply for hours over 12 per day or work on specific holidays.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I include lunch breaks in my timecard?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Meal breaks (typically 30 minutes or longer) are usually unpaid and should be deducted from your timecard. If you work 9:00 AM to 5:30 PM with a 30-minute lunch, you worked 8 hours, not 8.5. However, short rest breaks (5-20 minutes) are typically paid and should not be deducted. Federal law doesn\'t require meal or rest breaks, but many states do. Always check your company policy and state labor laws. If you work through lunch (eating at your desk while working), that time is compensable and should be included.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is time clock rounding and is it legal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Time clock rounding is when employers round punch times to the nearest increment (typically 5, 10, or 15 minutes) for payroll simplicity. For example, with 15-minute rounding: 8:07 becomes 8:00, and 8:08 becomes 8:15. This is legal under Department of Labor rules if it\'s neutral and doesn\'t consistently favor the employer. The rounding must average out over time—sometimes benefiting the employee, sometimes the employer. However, some states restrict rounding practices. California requires rounding to be neutral and has stricter enforcement. Always review your pay stubs to ensure rounding isn\'t consistently reducing your hours.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I track my hours if my employer doesn\'t provide a time clock?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If your employer doesn\'t track hours, keep your own records using: (1) A time card calculator or timesheet app—log start/end times daily. (2) Calendar or notebook—write down exact work times each day. (3) Email timestamps—if you send/receive work emails, they prove when you were working. (4) GPS or phone location history—can show when you arrived/left work. The FLSA requires accurate record-keeping, and if disputes arise, your personal records can support wage claims. Save records for at least 3 years. If you\'re misclassified as exempt or an independent contractor when you should be non-exempt, contact your state labor department.',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/time-card-calculator'),
        name: 'How to Use the Time Card Calculator',
        description: 'Step-by-step guide to calculating work hours and pay using the time card calculator',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Time Card Calculator',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Daily Work Times',
            text: 'For each workday, enter your clock-in time (e.g., "8:30AM") in the "From" field and clock-out time (e.g., "5:00PM") in the "To" field. The calculator supports 12-hour format with AM/PM or 24-hour format. Click "Add Day" to add more days to your timecard.',
            url: getStepUrl('/time-card-calculator', 1),
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Deduct Break Times',
            text: 'Enter unpaid break duration in the "Break Deduction" field using hours:minutes format (e.g., "0:30" for 30 minutes, "1:00" for 1 hour). Typically, meal breaks of 30 minutes or more are unpaid. Short rest breaks under 20 minutes are usually paid and should not be deducted.',
            url: getStepUrl('/time-card-calculator', 2),
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Set Your Hourly Rate',
            text: 'Enter your hourly wage in the "Hourly Rate" field. This is your regular pay rate before overtime. For example, if you earn $20 per hour, enter "20". This rate will be used to calculate your regular pay and as the base for overtime calculations.',
            url: getStepUrl('/time-card-calculator', 3),
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Configure Overtime Settings',
            text: 'Set "Overtime Multiplier" (typically 1.5 for time-and-a-half) and "Double Time Multiplier" (typically 2.0). Enter "Regular Hours Limit" (usually 40 hours per week) to determine when overtime starts. Set "Overtime Limit" to specify when double-time begins (e.g., 50 hours).',
            url: getStepUrl('/time-card-calculator', 4),
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Choose Rounding Options',
            text: 'Select a time rounding option if your employer uses rounding rules. Common options are 5, 10, or 15-minute rounding. "No Round" keeps exact times. For example, 15-minute rounding converts 8:07 to 8:00 and 8:08 to 8:15, following standard neutral rounding practices.',
            url: getStepUrl('/time-card-calculator', 5),
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Add Report Information',
            text: 'Optionally add a "Report Header" (your name, company name) and "Report Notes" for additional context. Check "Include payment information" to show pay amounts on the report. Enable "Show blank days in report" if you want days without hours to appear on the timesheet.',
            url: getStepUrl('/time-card-calculator', 6),
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Calculate and Review Results',
            text: 'Click "Calculate Hours & Pay" to see your results. Review total hours worked, regular vs. overtime breakdown, and gross pay. Check the daily hours table and charts for visual breakdown. Use "Save as Image" or "Print Results" to create a record for your files or submit to payroll.',
            url: getStepUrl('/time-card-calculator', 7),
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/time-card-calculator'),
        headline: 'Complete Guide to Time Card Calculations and Payroll',
        description: 'Learn how to accurately track work hours, calculate overtime pay, and understand timecard requirements under labor laws.',
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
        dateModified: '2024-11-16',
        image: getOgImage('timecard'),
        articleBody: 'Comprehensive guide covering time card calculations, overtime rules, break deductions, rounding practices, and payroll compliance for employees and employers.',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <h1 className="sr-only">Time Card Calculator - Track Work Hours and Calculate Pay with Overtime</h1>
      
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
                Time Card Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Calculator Component */}
      <TimeCardCalculator />

      {/* Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Time Card Calculations</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-lg text-gray-800 leading-relaxed">
              A time card calculator is an essential tool for both employees and employers to accurately track work hours, 
              calculate overtime pay, and ensure proper wage compensation. Whether you're an hourly worker verifying your 
              paycheck or a business owner processing payroll, understanding time card calculations is crucial for compliance 
              with labor laws and maintaining accurate financial records.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is a Time Card?</h2>
          <p className="text-gray-700 mb-4">
            A time card (also called a timesheet, timecard, or punch card) is a record of an employee's work hours during a 
            specific pay period. Traditionally, time cards were physical cards that employees would "punch" in a mechanical 
            time clock when arriving and leaving work. Today, most time cards are digital, tracked through software, apps, 
            or biometric systems, but the fundamental purpose remains the same: documenting when employees start work, take 
            breaks, and finish their shifts.
          </p>
          <p className="text-gray-700 mb-4">
            Time cards serve multiple critical functions in the workplace. For employees, they provide a verifiable record of 
            hours worked and ensure proper compensation. For employers, they're essential for payroll processing, labor cost 
            analysis, project tracking, and compliance with the Fair Labor Standards Act (FLSA) and state labor laws. Under 
            federal law, employers must maintain accurate time records for non-exempt employees for at least three years.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Basic Time Card Calculation Formula</h2>
          <p className="text-gray-700 mb-4">
            The basic formula for calculating work hours from a time card is straightforward:
          </p>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="font-mono text-lg text-center mb-4">
              <strong>Hours Worked = Clock-Out Time - Clock-In Time - Unpaid Breaks</strong>
            </p>
            <p className="text-sm text-gray-600 text-center">
              Example: 5:00 PM (clock-out) - 8:00 AM (clock-in) - 0:30 (lunch) = 8.5 hours worked
            </p>
          </div>
          <p className="text-gray-700 mb-4">
            However, real-world time card calculations often involve additional complexities:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Multiple shifts per day:</strong> Some employees clock in and out multiple times (split shifts)</li>
            <li><strong>Overnight shifts:</strong> When work crosses midnight, calculations must account for the day change</li>
            <li><strong>Paid vs. unpaid breaks:</strong> Federal law requires rest breaks under 20 minutes to be paid; meal breaks (typically 30+ minutes) are unpaid</li>
            <li><strong>Time rounding:</strong> Many employers round punch times to the nearest 5, 10, or 15 minutes</li>
            <li><strong>Overtime calculations:</strong> Hours beyond 40 per week (or 8 per day in some states) require overtime pay</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Overtime Pay</h2>
          <p className="text-gray-700 mb-4">
            The Fair Labor Standards Act (FLSA) requires employers to pay non-exempt employees overtime at a rate of not less 
            than 1.5 times their regular hourly rate for hours worked beyond 40 in a workweek. A workweek is a fixed, recurring 
            period of 168 hours (seven consecutive 24-hour periods), which can begin on any day and at any hour as defined by 
            the employer.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Overtime Calculation Example</h3>
            <p className="text-gray-700 mb-2">Regular hourly rate: $20/hour</p>
            <p className="text-gray-700 mb-2">Hours worked in week: 45 hours</p>
            <p className="text-gray-700 mb-2">Regular hours (first 40): 40 × $20 = $800</p>
            <p className="text-gray-700 mb-2">Overtime hours (5 hours): 5 × ($20 × 1.5) = 5 × $30 = $150</p>
            <p className="text-gray-900 font-bold mt-3">Total weekly pay: $800 + $150 = $950</p>
          </div>
          <p className="text-gray-700 mb-4">
            Some states have additional overtime requirements beyond federal law. For example:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>California:</strong> Overtime after 8 hours per day AND after 40 hours per week; double-time after 12 hours per day or after 8 hours on the seventh consecutive workday</li>
            <li><strong>Alaska:</strong> Overtime after 8 hours per day AND after 40 hours per week</li>
            <li><strong>Nevada:</strong> Overtime after 8 hours per day (for employees earning less than 1.5× minimum wage)</li>
            <li><strong>Colorado:</strong> Overtime after 12 hours per day, after 12 consecutive hours, or after 40 hours per week</li>
          </ul>
          <p className="text-gray-700 mb-4">
            It's crucial to know your state's specific requirements. When state and federal overtime laws differ, employers 
            must apply whichever standard is more generous to the employee. Visit your state's{' '}
            <a 
              href="https://www.dol.gov/agencies/whd/state/contacts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Department of Labor website
            </a>
            {' '}for detailed overtime regulations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Break Time Rules and Deductions</h2>
          <p className="text-gray-700 mb-4">
            Federal law doesn't require employers to provide meal or rest breaks, but when breaks are given, specific rules 
            apply regarding whether they must be paid:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Break Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Paid/Unpaid</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Rest Break</td>
                  <td className="px-6 py-4 text-sm text-gray-700">5-20 minutes</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-700">Paid</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Must be counted as work time</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Meal Break</td>
                  <td className="px-6 py-4 text-sm text-gray-700">30+ minutes</td>
                  <td className="px-6 py-4 text-sm font-semibold text-red-700">Unpaid</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Employee must be completely relieved of duties</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Working Lunch</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Any duration</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-700">Paid</td>
                  <td className="px-6 py-4 text-sm text-gray-700">If employee performs any work duties</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mb-4">
            Many states have their own break requirements that are more generous than federal standards. For example, 
            California requires a 30-minute meal break for shifts over 5 hours and a second 30-minute break for shifts 
            over 10 hours, plus 10-minute paid rest breaks for every 4 hours worked. Check your{' '}
            <a 
              href="https://www.dol.gov/agencies/whd/state/meal-breaks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              state's meal and rest break requirements
            </a>
            {' '}to ensure compliance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Time Clock Rounding: Rules and Best Practices</h2>
          <p className="text-gray-700 mb-4">
            Time clock rounding is a practice where employers round employee punch times to the nearest increment (typically 
            5, 10, or 15 minutes) to simplify payroll calculations. The U.S. Department of Labor allows rounding, but it must 
            comply with specific rules:
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Key Rounding Rules</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Rounding must be <strong>neutral</strong>—sometimes favoring the employee, sometimes the employer</li>
              <li>Rounding cannot consistently reduce employee time worked</li>
              <li>The most common (and legally safe) method is 15-minute rounding using the "7-minute rule"</li>
              <li>Employers must apply the same rounding policy to both clock-in and clock-out times</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">15-Minute Rounding Examples (7-Minute Rule)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Clock-In Times:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>8:00 - 8:07 → rounds to 8:00</li>
                  <li>8:08 - 8:14 → rounds to 8:15</li>
                  <li>8:15 - 8:22 → rounds to 8:15</li>
                  <li>8:23 - 8:29 → rounds to 8:30</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Clock-Out Times:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>5:00 - 5:07 → rounds to 5:00</li>
                  <li>5:08 - 5:14 → rounds to 5:15</li>
                  <li>5:15 - 5:22 → rounds to 5:15</li>
                  <li>5:23 - 5:29 → rounds to 5:30</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            However, some states restrict or prohibit rounding. California courts have held that rounding policies face 
            heightened scrutiny and must be proven neutral over time. Some California employers have moved away from rounding 
            entirely to avoid litigation. Always verify your state's specific rounding rules and maintain detailed records to 
            demonstrate neutrality.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Time Card Errors and How to Avoid Them</h2>
          <p className="text-gray-700 mb-4">
            Time card errors can result in underpayment (wage theft) or overpayment (financial losses for employers). Here 
            are the most common mistakes and prevention strategies:
          </p>
          <div className="space-y-6 mb-6">
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. Forgetting to Clock In or Out</h3>
              <p className="text-gray-700 mb-2">
                <strong>Problem:</strong> Missing punch times create gaps in time records, leading to disputes and estimated hours.
              </p>
              <p className="text-gray-700">
                <strong>Solution:</strong> Use mobile time clock apps with GPS verification, implement punch reminders, 
                and train employees to report missed punches immediately. Keep a manual log as backup.
              </p>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Not Deducting Meal Breaks</h3>
              <p className="text-gray-700 mb-2">
                <strong>Problem:</strong> Failing to subtract unpaid meal breaks results in overpayment and inaccurate 
                labor cost tracking.
              </p>
              <p className="text-gray-700">
                <strong>Solution:</strong> Configure automatic break deductions in your time clock system, or clearly 
                instruct employees to clock out for meals. Verify break deductions on each pay period.
              </p>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Incorrect Overtime Calculations</h3>
              <p className="text-gray-700 mb-2">
                <strong>Problem:</strong> Misunderstanding when overtime begins (daily vs. weekly) or applying wrong multipliers.
              </p>
              <p className="text-gray-700">
                <strong>Solution:</strong> Use automated payroll software that knows federal and state overtime rules. 
                Double-check calculations for employees working over 40 hours/week or 8 hours/day (if state-required).
              </p>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">4. Buddy Punching (Time Theft)</h3>
              <p className="text-gray-700 mb-2">
                <strong>Problem:</strong> One employee clocks in for another who hasn't arrived yet, causing fraudulent 
                time records and payroll fraud.
              </p>
              <p className="text-gray-700">
                <strong>Solution:</strong> Implement biometric time clocks (fingerprint, facial recognition) or GPS-based 
                mobile punch systems. Clearly communicate that buddy punching is grounds for discipline or termination.
              </p>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">5. Misclassifying Exempt vs. Non-Exempt Employees</h3>
              <p className="text-gray-700 mb-2">
                <strong>Problem:</strong> Treating non-exempt employees as salaried exempt, avoiding overtime obligations illegally.
              </p>
              <p className="text-gray-700">
                <strong>Solution:</strong> Review the FLSA's "duties test" and salary threshold ($684/week as of 2024) for 
                exempt classification. When in doubt, consult an employment attorney. Misclassification can result in back pay 
                claims and penalties.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Digital vs. Manual Time Cards: Pros and Cons</h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Feature</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Manual/Paper</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Digital/Software</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Cost</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Low initial cost (paper, cards)</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Higher upfront cost (software, hardware)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Accuracy</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Prone to human error in recording and calculations</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Automated calculations reduce errors</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Time Required</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Manual data entry and calculation time-consuming</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Instant calculations and reports</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Security</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Easy to alter or lose physical records</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Encrypted, backed up, audit trails</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Fraud Prevention</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Difficult to prevent buddy punching</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Biometric/GPS prevents time theft</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Compliance</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Requires manual verification of labor law compliance</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Built-in overtime, break, and compliance rules</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Accessibility</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Limited to physical location</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Cloud-based access from anywhere</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mb-4">
            While manual time cards may work for very small businesses with few employees, digital time tracking systems 
            offer significant advantages in accuracy, efficiency, and compliance. The return on investment typically comes 
            quickly through reduced payroll errors, time theft prevention, and saved administrative time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Legal Requirements and Recordkeeping</h2>
          <p className="text-gray-700 mb-4">
            Under the Fair Labor Standards Act, employers must maintain accurate time and pay records for all non-exempt 
            employees. Required records include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li>Employee's full name and social security number</li>
            <li>Address, including zip code</li>
            <li>Birth date (if younger than 19)</li>
            <li>Sex and occupation</li>
            <li>Time and day of week when employee's workweek begins</li>
            <li>Hours worked each day and total hours worked each workweek</li>
            <li>Basis on which employee's wages are paid (hourly, weekly, piecework, etc.)</li>
            <li>Regular hourly pay rate</li>
            <li>Total daily or weekly straight-time earnings</li>
            <li>Total overtime earnings for the workweek</li>
            <li>All additions to or deductions from wages</li>
            <li>Total wages paid each pay period</li>
            <li>Date of payment and pay period covered</li>
          </ul>
          <p className="text-gray-700 mb-4">
            These records must be retained for at least three years. Payroll records, collective bargaining agreements, 
            and sales and purchase records should be kept for at least two years. Failure to maintain proper records can 
            result in penalties and make it difficult to defend against wage claims.
          </p>
          <p className="text-gray-700 mb-4">
            The Department of Labor can conduct investigations and audits at any time. Having organized, accurate time 
            records is your best defense. For official recordkeeping requirements, refer to the{' '}
            <a 
              href="https://www.dol.gov/agencies/whd/flsa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Department of Labor's FLSA guidance
            </a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for Employees: Protecting Your Wages</h2>
          <p className="text-gray-700 mb-4">
            As an employee, you have the right to accurate time tracking and full payment for all hours worked. Here's how 
            to protect yourself:
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Employee Best Practices</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li><strong>Keep your own records:</strong> Write down your daily start/end times and breaks, even if your employer tracks time</li>
              <li><strong>Review every paycheck:</strong> Verify hours worked match hours paid, especially overtime</li>
              <li><strong>Report discrepancies immediately:</strong> Don't wait; address any pay errors right away</li>
              <li><strong>Clock in/out accurately:</strong> Don't start working before clocking in or after clocking out</li>
              <li><strong>Know your rights:</strong> Understand whether you're exempt or non-exempt and what overtime rules apply</li>
              <li><strong>Report off-the-clock work:</strong> If asked to work without clocking in, report it to HR or your state labor board</li>
              <li><strong>Save pay stubs:</strong> Keep at least 3 years of records for potential disputes</li>
            </ol>
          </div>
          <p className="text-gray-700 mb-4">
            If you believe your employer is not paying you correctly, you can file a complaint with your state labor department 
            or the U.S. Department of Labor's Wage and Hour Division. Many wage violations can be resolved through investigation 
            without litigation. You have the right to be paid for all time worked, and retaliation for asserting your wage rights 
            is illegal.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Choosing the Right Time Card Solution</h2>
          <p className="text-gray-700 mb-4">
            When selecting a time card system for your business or personal use, consider these factors:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
            <li><strong>Business size:</strong> Small businesses may need simple solutions; enterprises need scalability</li>
            <li><strong>Employee locations:</strong> Remote/mobile workers need GPS tracking and mobile apps</li>
            <li><strong>Budget:</strong> Balance features against cost; consider ROI from reduced errors and time theft</li>
            <li><strong>Integration:</strong> Ensure compatibility with your payroll and accounting software</li>
            <li><strong>Compliance features:</strong> Built-in overtime, break, and state-specific labor law compliance</li>
            <li><strong>User-friendliness:</strong> Both employees and managers should find it easy to use</li>
            <li><strong>Reporting:</strong> Look for customizable reports for labor cost analysis and forecasting</li>
            <li><strong>Security:</strong> Data encryption, user authentication, and audit trails are essential</li>
          </ul>
          <p className="text-gray-700 mb-4">
            For employees without employer-provided time tracking, free online time card calculators (like this one) can help 
            you verify your hours and pay. Keep screenshots or printouts of your calculations as backup records. Mobile apps 
            with GPS timestamping provide additional verification of when and where you worked.
          </p>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="/salary-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900">Salary Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Convert hourly to salary or vice versa</p>
          </a>
          
          <a 
            href="/tax-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Tax Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Calculate income tax withholding</p>
          </a>
          
          <a 
            href="/budget-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold text-gray-900">Budget Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan monthly income and expenses</p>
          </a>
          
          <a 
            href="/retirement-calculator" 
            className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-2">🏖️</div>
            <h3 className="font-semibold text-gray-900">Retirement Calculator</h3>
            <p className="text-sm text-gray-600 mt-1">Plan for retirement savings</p>
          </a>
        </div>
      </section>
    </div>
  );
}

