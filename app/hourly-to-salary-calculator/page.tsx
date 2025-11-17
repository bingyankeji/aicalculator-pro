import { Metadata } from 'next';
import HourlyToSalaryCalculator from '@/components/Calculator/HourlyToSalaryCalculator';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';

export const metadata: Metadata = {
  title: 'Hourly to Salary Calculator - Convert Hourly Wage to Annual Salary | AICalculator',
  description: 'Free hourly to salary calculator. Convert hourly wage to annual, monthly, weekly salary. Calculate overtime, benefits, after-tax income, and effective hourly rate. Compare part-time vs full-time earnings.',
  keywords: [
    'hourly to salary calculator',
    'hourly wage calculator',
    'salary converter',
    'hourly rate to annual salary',
    'wage calculator',
    'overtime calculator',
    'hourly to yearly calculator',
    'part time salary calculator',
    'full time salary calculator',
    'take home pay calculator',
    'benefits calculator',
    'effective hourly rate',
    'hourly to monthly salary',
    'wage conversion calculator',
    'annual salary from hourly',
    'hourly pay calculator',
    'salary comparison calculator',
    'work hours calculator',
    'income calculator',
    'pay rate converter'
  ],
  authors: [{ name: 'AICalculator.pro Team' }],
  creator: 'AICalculator.pro',
  publisher: 'AICalculator.pro',
  openGraph: {
    title: 'Hourly to Salary Calculator - Convert Hourly Wage to Annual Salary',
    description: 'Convert hourly wage to annual, monthly, weekly salary. Calculate overtime, benefits, taxes, and effective hourly rate. Free and accurate.',
    type: 'website',
    url: getUrl('/hourly-to-salary-calculator'),
    siteName: 'AICalculator',
    locale: 'en_US',
    images: [{
      url: getOgImage('hourly-salary'),
      width: 1200,
      height: 630,
      alt: 'Hourly to Salary Calculator - Wage Conversion Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hourly to Salary Calculator - Convert Hourly Wage',
    description: 'Convert hourly wage to annual salary with overtime, benefits, and tax calculations. Compare job offers and plan your finances.',
    images: [getOgImage('hourly-salary')],
    creator: '@aicalculator'
  },
  alternates: {
    canonical: getUrl('/hourly-to-salary-calculator')
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HourlyToSalaryCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/hourly-to-salary-calculator'),
        name: 'Hourly to Salary Calculator',
        url: getUrl('/hourly-to-salary-calculator'),
        description: 'Free online calculator to convert hourly wage to annual, monthly, and weekly salary. Calculate overtime pay, benefits value, after-tax income, and effective hourly rate for comprehensive compensation analysis.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        permissions: 'browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Hourly to annual salary conversion',
          'Monthly and weekly salary calculation',
          'Overtime pay calculation (time and a half)',
          'Annual work weeks adjustment (vacation time)',
          'Benefits value calculation',
          'Federal and state tax estimation',
          'FICA tax calculation',
          'After-tax income analysis',
          'Effective hourly rate calculation',
          'Part-time vs full-time comparison',
          'Standard 2,080 hour work year',
          'Customizable work hours per week'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/hourly-to-salary-calculator'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getUrl('/')
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Financial',
            item: getUrl('/financial')
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Hourly to Salary Calculator',
            item: getUrl('/hourly-to-salary-calculator')
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': getFaqId('/hourly-to-salary-calculator'),
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do you convert hourly wage to annual salary?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'To convert hourly wage to annual salary, multiply your hourly rate by the number of hours worked per week, then multiply by 52 weeks per year. The standard formula is: Hourly Rate × Hours Per Week × 52 = Annual Salary. For example, $20/hour at 40 hours/week = $20 × 40 × 52 = $41,600 annual salary. However, this assumes you work all 52 weeks without vacation. A more realistic calculation accounts for unpaid time off. If you take 2 weeks vacation, multiply by 50 weeks instead: $20 × 40 × 50 = $40,000. Don\'t forget to factor in overtime if you regularly work over 40 hours, as overtime hours pay at 1.5× your regular rate.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the standard work year in hours?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The standard full-time work year is 2,080 hours, calculated as 40 hours per week × 52 weeks per year. However, most employees don\'t actually work all 2,080 hours due to vacation, holidays, and sick time. A more realistic work year is 2,000 hours (50 weeks × 40 hours), accounting for 2 weeks of vacation. To calculate: if you work 40 hours/week with 2 weeks vacation, you work 50 weeks, which equals 2,000 hours annually. Part-time employees work fewer hours: 20 hours/week × 52 weeks = 1,040 hours annually, or 30 hours/week × 52 weeks = 1,560 hours. Understanding your actual work hours helps accurately convert hourly wages to annual salary and compare job offers.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does overtime affect annual salary calculations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Overtime significantly increases annual salary for non-exempt employees. Under the Fair Labor Standards Act (FLSA), hours worked beyond 40 per week must be paid at 1.5× your regular hourly rate (time and a half). For example, if you earn $20/hour and regularly work 45 hours/week: Regular pay = 40 hours × $20 = $800/week. Overtime pay = 5 hours × $30 (1.5 × $20) = $150/week. Total = $950/week × 52 weeks = $49,400 annually (vs $41,600 without overtime). Some employers offer double time (2×) for holidays or excessive hours. Overtime can add $5,000-$20,000+ annually to your income. Calculate your effective hourly rate by dividing total annual earnings by total hours worked to understand your true compensation.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between gross and net salary?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Gross salary is your total earnings before any deductions, while net salary (take-home pay) is what you actually receive after taxes and deductions. Typical deductions include: Federal income tax (10-37% based on bracket), FICA taxes (7.65%: 6.2% Social Security + 1.45% Medicare), state income tax (0-13.3% depending on state), and benefits (health insurance, 401k contributions, etc.). For example, if your gross salary is $50,000: Federal tax at 12% bracket ≈ $4,000, FICA tax = $3,825, state tax (e.g., 5%) = $2,500, total deductions ≈ $10,325, and net salary ≈ $39,675 (79% of gross). Most people take home 70-80% of gross salary. Use our calculator to estimate your after-tax income for accurate budget planning and job offer comparisons.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do you calculate the value of benefits in total compensation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Benefits significantly increase total compensation beyond base salary. Common benefits and typical values include: Health insurance (employer pays $7,000-$15,000/year for family coverage, $5,000-$8,000 for individual), 401(k) match (typically 3-6% of salary, e.g., $2,500 on $50K salary with 5% match), paid time off (value of vacation/sick days: 10 days = $1,923 at $50K salary), dental and vision ($500-$1,500/year), life insurance ($200-$500/year), and professional development ($1,000-$5,000/year). For a $50,000 salary job, total benefits could add $10,000-$25,000 in value, making total compensation $60,000-$75,000. When comparing job offers, always calculate total compensation (salary + benefits value), not just base salary. A $55K job with excellent benefits may be worth more than a $60K job with minimal benefits.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is an effective hourly rate and why is it important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Effective hourly rate is your true hourly compensation including all earnings and benefits divided by actual hours worked. It provides a more accurate comparison than simple hourly wage. Calculate it as: (Annual Salary + Benefits Value) ÷ Annual Hours Worked = Effective Hourly Rate. Example: You earn $50,000/year, receive $12,000 in benefits, and work 2,000 hours annually. Effective hourly rate = ($50,000 + $12,000) ÷ 2,000 = $31/hour, even though your base hourly wage calculation is only $25/hour ($50,000 ÷ 2,000). This matters when comparing: salaried positions to hourly jobs, job offers with different benefit packages, and freelance rates (must be higher to account for lack of benefits). Understanding effective hourly rate helps make informed career decisions and negotiate fair compensation.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many hours per week is considered full-time vs part-time?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Full-time employment is typically defined as 40 hours per week, though the IRS and Affordable Care Act define it as 30+ hours for benefit purposes. Part-time employment is generally under 30-35 hours per week. Common work schedules include: Full-time standard (40 hours/week, 2,080 hours/year), full-time with benefits eligibility (30 hours/week minimum for ACA), three-quarter time (30 hours/week, 1,560 hours/year), part-time standard (20 hours/week, 1,040 hours/year), and part-time minimal (15 hours/week or less). The distinction matters because full-time employees typically receive benefits (health insurance, paid time off, retirement contributions), while part-time workers often don\'t. Some employers offer pro-rated benefits for 30+ hour employees. When calculating annual salary from hourly wage, knowing your classification helps determine actual compensation including benefits.'
            }
          },
          {
            '@type': 'Question',
            name: 'Should I take a salaried job or stay hourly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The decision between salaried and hourly employment depends on multiple factors. Hourly advantages include: guaranteed overtime pay (1.5× for hours over 40/week), payment for all hours worked, flexibility to increase income by working more, easier to track compensation, and FLSA protections. Hourly disadvantages: income variability if hours fluctuate, potentially fewer benefits, perception of lower status, and no pay for time off unless employer provides it. Salaried advantages: predictable income, typically better benefits, more autonomy and flexibility, paid time off, career advancement opportunities, and professional designation. Salaried disadvantages: no overtime pay if exempt, potential to work 50-60+ hours for same pay, pressure to work beyond 40 hours, and lack of hourly compensation tracking. Choose hourly if you value overtime pay, work predictable hours, and prefer guaranteed compensation per hour. Choose salaried for career growth, benefits, income stability, and professional roles. Calculate total compensation (including benefits and actual hours worked) to compare fairly.'
            }
          }
        ]
      },
      {
        '@type': 'HowTo',
        '@id': getHowToId('/hourly-to-salary-calculator'),
        name: 'How to Convert Hourly Wage to Annual Salary',
        description: 'Step-by-step guide to accurately converting your hourly wage to annual, monthly, and weekly salary including overtime, benefits, and taxes.',
        totalTime: 'PT5M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0'
        },
        tool: {
          '@type': 'HowToTool',
          name: 'Hourly to Salary Calculator'
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Enter Your Hourly Wage',
            text: 'Input your current hourly rate of pay. This is the amount you earn per hour before any taxes or deductions. If you have different rates for regular and overtime work, use your base regular hourly rate. Check your pay stub or employment contract if you\'re unsure of your exact hourly wage.',
            url: getStepUrl('/hourly-to-salary-calculator', 1)
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Weekly Work Hours',
            text: 'Enter the number of hours you work per week. Standard full-time is 40 hours/week, but adjust based on your actual schedule. For part-time work, enter your typical weekly hours (e.g., 20, 25, or 30 hours). If your hours vary, use your average weekly hours over a typical month or quarter.',
            url: getStepUrl('/hourly-to-salary-calculator', 2)
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Adjust for Vacation and Time Off',
            text: 'Select the number of work weeks per year, accounting for unpaid vacation or time off. Standard is 52 weeks if you have no vacation, 50 weeks if you take 2 weeks off, or 48 weeks for 4 weeks vacation. This adjustment is crucial for accurate annual salary calculation, as unpaid time off reduces total annual earnings.',
            url: getStepUrl('/hourly-to-salary-calculator', 3)
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Add Overtime Hours (if applicable)',
            text: 'If you regularly work overtime, enter average overtime hours per week. Overtime typically pays at 1.5× your regular rate (time and a half) for hours over 40 per week. Some employers offer double time (2×) for holidays or excessive hours. Overtime can significantly increase your annual salary, sometimes by $10,000-$20,000+ per year.',
            url: getStepUrl('/hourly-to-salary-calculator', 4)
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Include Benefits Value',
            text: 'Enter the annual value of your benefits package if provided by your employer. Common benefits include health insurance ($5,000-$15,000/year), 401(k) matching (3-6% of salary), paid time off, dental/vision coverage, life insurance, and professional development. This shows your total compensation, not just cash salary.',
            url: getStepUrl('/hourly-to-salary-calculator', 5)
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Add Tax Information',
            text: 'Enter your federal tax rate (based on your tax bracket: 10%, 12%, 22%, 24%, 32%, 35%, or 37%), state tax rate (0-13.3% depending on state), and FICA is automatically calculated at 7.65%. This provides an estimate of your after-tax take-home pay, which is typically 70-80% of gross salary.',
            url: getStepUrl('/hourly-to-salary-calculator', 6)
          },
          {
            '@type': 'HowToStep',
            position: 7,
            name: 'Review Your Complete Salary Breakdown',
            text: 'Analyze your results showing annual salary, monthly salary, weekly salary, total compensation (including benefits), estimated taxes, after-tax income, and effective hourly rate. Use this information to budget, compare job offers, negotiate raises, or decide between hourly and salaried positions. The effective hourly rate is particularly useful for understanding your true compensation per hour worked.',
            url: getStepUrl('/hourly-to-salary-calculator', 7)
          }
        ]
      },
      {
        '@type': 'Article',
        '@id': getArticleId('/hourly-to-salary-calculator'),
        headline: 'Hourly to Salary Calculator - Complete Guide to Wage Conversion',
        description: 'Learn how to accurately convert hourly wages to annual, monthly, and weekly salary. Understand overtime calculations, benefits valuation, tax implications, and how to calculate effective hourly rate for complete compensation analysis.',
        author: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          url: getUrl('/')
        },
        publisher: {
          '@type': 'Organization',
          name: 'AICalculator.pro',
          logo: {
            '@type': 'ImageObject',
            url: getUrl('/logo.png')
          }
        },
        datePublished: '2024-01-01',
        dateModified: '2025-11-16',
        image: getOgImage('hourly-salary'),
        articleBody: 'Comprehensive guide to converting hourly wages to annual salary, including standard work year calculations, overtime pay, benefits valuation, tax implications, effective hourly rate, and strategies for comparing hourly and salaried compensation.'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <h1 className="sr-only">Hourly to Salary Calculator - Convert Hourly Wage to Annual Salary</h1>
        
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
                <a href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                  <span itemProp="name">Financial</span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-gray-400">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-gray-900 font-semibold">Hourly to Salary Calculator</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* Calculator Component */}
        <HourlyToSalaryCalculator />

        {/* Educational Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Hourly to Salary Conversion</h2>
            
            <p className="text-gray-700 mb-4">
              Converting hourly wages to annual salary helps you understand total earnings, compare job offers, and plan finances effectively. According to the{' '}
              <a 
                href="https://www.bls.gov/news.release/empsit.t19.htm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Bureau of Labor Statistics
              </a>
              , median hourly wages vary significantly by occupation and industry, making accurate conversion essential for financial planning.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Basic Conversion Formula</h3>
            <p className="text-gray-700 mb-4">
              The fundamental formula for converting hourly wages to annual salary is:
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Annual Salary = Hourly Rate × Hours Per Week × Weeks Per Year
              </p>
              <p className="text-sm text-gray-700">
                <strong>Standard full-time calculation:</strong> Hourly Rate × 40 hours × 52 weeks
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              <strong>Examples:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>$15/hour:</strong> $15 × 40 × 52 = $31,200 annually</li>
              <li><strong>$20/hour:</strong> $20 × 40 × 52 = $41,600 annually</li>
              <li><strong>$25/hour:</strong> $25 × 40 × 52 = $52,000 annually</li>
              <li><strong>$30/hour:</strong> $30 × 40 × 52 = $62,400 annually</li>
              <li><strong>$50/hour:</strong> $50 × 40 × 52 = $104,000 annually</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Standard Work Year Calculations</h3>
            <p className="text-gray-700 mb-4">
              Understanding the standard work year is crucial for accurate salary calculations:
            </p>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Work Pattern</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours/Week</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weeks/Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Annual Hours</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Full-time (no vacation)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">40</td>
                  <td className="px-6 py-4 text-sm text-gray-900">52</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">2,080 hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Full-time (2 weeks vacation)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">40</td>
                  <td className="px-6 py-4 text-sm text-gray-900">50</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">2,000 hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Full-time (4 weeks vacation)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">40</td>
                  <td className="px-6 py-4 text-sm text-gray-900">48</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">1,920 hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Part-time (30 hrs/week)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">30</td>
                  <td className="px-6 py-4 text-sm text-gray-900">52</td>
                  <td className="px-6 py-4 text-sm text-gray-900">1,560 hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Part-time (20 hrs/week)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">20</td>
                  <td className="px-6 py-4 text-sm text-gray-900">52</td>
                  <td className="px-6 py-4 text-sm text-gray-900">1,040 hours</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Overtime Calculations</h3>
            <p className="text-gray-700 mb-4">
              Under the{' '}
              <a 
                href="https://www.dol.gov/agencies/whd/flsa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Fair Labor Standards Act (FLSA)
              </a>
              , non-exempt employees must receive overtime pay at 1.5× their regular rate for hours worked beyond 40 per week.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Overtime Pay Rates</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Time and a half (1.5×):</strong> Standard for hours 41-60 per week</li>
              <li><strong>Double time (2×):</strong> Some employers for holidays, Sundays, or hours over 60</li>
              <li><strong>California special rule:</strong> Double time for hours over 12 in a day</li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-3">Example: $20/hour with 5 hours overtime per week</p>
              <ul className="list-none space-y-1 text-sm text-gray-700">
                <li><strong>Regular pay:</strong> 40 hours × $20 = $800/week</li>
                <li><strong>Overtime pay:</strong> 5 hours × $30 ($20 × 1.5) = $150/week</li>
                <li><strong>Weekly total:</strong> $950/week</li>
                <li><strong>Annual salary:</strong> $950 × 52 = $49,400</li>
                <li><strong>Increase from overtime:</strong> +$7,800/year (+18.75%)</li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              Overtime can significantly boost annual earnings. For someone earning $20/hour, consistent overtime can increase total compensation from $41,600 to $50,000+ annually. Use our{' '}
              <a href="/overtime-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Overtime Calculator
              </a>
              {' '}for detailed overtime pay analysis.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Total Compensation: Including Benefits</h3>
            <p className="text-gray-700 mb-4">
              Your true compensation extends far beyond your hourly wage or salary. Benefits can add 20-40% to your total compensation package.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Benefits and Their Value</h4>

            <table className="min-w-full divide-y divide-gray-200 my-6">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Benefit Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Annual Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Health Insurance (family)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$7,000 - $15,000</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Employer contribution portion</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Health Insurance (individual)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$5,000 - $8,000</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Employer contribution portion</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">401(k) Match</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$1,500 - $5,000</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Typically 3-6% of salary</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Paid Time Off (2 weeks)</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$1,600 - $4,000</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Based on hourly rate</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Dental & Vision</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$500 - $1,500</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Employer contribution</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Life Insurance</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$200 - $500</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Basic coverage</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Professional Development</td>
                  <td className="px-6 py-4 text-sm text-gray-900">$1,000 - $5,000</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Training, conferences, certifications</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-2">Example: Total Compensation Calculation</p>
              <ul className="list-none space-y-1 text-sm text-gray-700">
                <li><strong>Base hourly wage:</strong> $25/hour</li>
                <li><strong>Annual salary:</strong> $25 × 40 × 52 = $52,000</li>
                <li><strong>Health insurance value:</strong> +$8,000</li>
                <li><strong>401(k) match (5%):</strong> +$2,600</li>
                <li><strong>2 weeks PTO value:</strong> +$2,000</li>
                <li><strong>Other benefits:</strong> +$1,400</li>
                <li className="text-lg font-bold text-green-900 pt-2"><strong>Total Compensation: $66,000</strong></li>
                <li className="text-green-900"><strong>Effective hourly rate: $31.73</strong> ($66,000 ÷ 2,080 hours)</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Understanding Tax Impact</h3>
            <p className="text-gray-700 mb-4">
              Your gross salary differs significantly from take-home pay due to various taxes and deductions. Understanding the tax impact helps with realistic budgeting and financial planning.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Tax Deductions</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Federal Income Tax:</strong> 10%, 12%, 22%, 24%, 32%, 35%, or 37% based on taxable income brackets</li>
              <li><strong>FICA Taxes:</strong> 7.65% total (6.2% Social Security on first $168,600 in 2024 + 1.45% Medicare on all income)</li>
              <li><strong>Additional Medicare Tax:</strong> 0.9% on income over $200K (single) or $250K (married)</li>
              <li><strong>State Income Tax:</strong> 0% (9 states) to 13.3% (California), varies widely</li>
              <li><strong>Local Taxes:</strong> Some cities/counties have additional income taxes</li>
            </ul>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-3">Example: Take-Home Pay from $50,000 Gross Salary</p>
              <ul className="list-none space-y-1 text-sm text-gray-700">
                <li><strong>Gross annual salary:</strong> $50,000</li>
                <li><strong>Federal income tax (12% bracket):</strong> -$4,200</li>
                <li><strong>FICA taxes (7.65%):</strong> -$3,825</li>
                <li><strong>State income tax (5%):</strong> -$2,500</li>
                <li><strong>Total taxes:</strong> -$10,525</li>
                <li className="text-lg font-bold text-gray-900 pt-2"><strong>Net take-home pay: $39,475</strong></li>
                <li className="text-gray-900"><strong>Take-home percentage: 78.95%</strong></li>
              </ul>
            </div>

            <p className="text-gray-700 mb-4">
              Most people take home 70-80% of gross salary after taxes. Use our{' '}
              <a href="/take-home-paycheck-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Take-Home Paycheck Calculator
              </a>
              {' '}for detailed tax calculations and our{' '}
              <a href="/tax-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Tax Calculator
              </a>
              {' '}to understand your tax bracket and liability.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Effective Hourly Rate</h3>
            <p className="text-gray-700 mb-4">
              Effective hourly rate provides a true picture of your hourly compensation by including all earnings and benefits. This metric is invaluable for comparing job offers and understanding your actual worth per hour worked.
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Formula:</strong> (Annual Salary + Benefits Value) ÷ Annual Hours Worked = Effective Hourly Rate
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="font-semibold text-gray-900 mb-3">Comparison Example: Two Job Offers</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">Job A: Hourly Position</p>
                  <ul className="list-none space-y-1 text-gray-700">
                    <li>Hourly rate: $28/hour</li>
                    <li>Annual salary: $58,240</li>
                    <li>Benefits value: $5,000</li>
                    <li>Total comp: $63,240</li>
                    <li className="font-bold text-blue-900">Effective rate: $30.40/hour</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded">
                  <p className="font-semibold text-gray-900 mb-2">Job B: Salaried Position</p>
                  <ul className="list-none space-y-1 text-gray-700">
                    <li>Annual salary: $60,000</li>
                    <li>Expected hours: 2,200 (overtime)</li>
                    <li>Benefits value: $12,000</li>
                    <li>Total comp: $72,000</li>
                    <li className="font-bold text-green-900">Effective rate: $32.73/hour</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-700 mt-3">
                <strong>Result:</strong> Job B offers better effective hourly compensation despite requiring more hours, primarily due to superior benefits package.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Part-Time vs Full-Time Considerations</h3>
            <p className="text-gray-700 mb-4">
              The choice between part-time and full-time work involves more than just hours and pay. Consider these factors:
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Full-Time Advantages</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Benefits eligibility:</strong> Health insurance, retirement plans, paid time off</li>
              <li><strong>Higher annual income:</strong> More working hours translate to higher total earnings</li>
              <li><strong>Career advancement:</strong> Typically more promotion opportunities</li>
              <li><strong>Job security:</strong> Often more stable than part-time positions</li>
              <li><strong>Professional development:</strong> More training and growth opportunities</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Part-Time Advantages</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Flexibility:</strong> Better work-life balance, time for other commitments</li>
              <li><strong>Multiple income streams:</strong> Opportunity to work multiple part-time jobs</li>
              <li><strong>Reduced burnout:</strong> Fewer hours can mean less stress</li>
              <li><strong>Education compatible:</strong> Easier to balance with school or training</li>
              <li><strong>Trial period:</strong> Test a career or company before full commitment</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Hourly vs Salaried: Which is Better?</h3>
            <p className="text-gray-700 mb-4">
              The decision between hourly and salaried employment depends on your priorities, lifestyle, and career goals.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Choose Hourly If You Value:</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Overtime pay:</strong> Every extra hour is compensated at 1.5×</li>
              <li><strong>Clear boundaries:</strong> When you clock out, work stops</li>
              <li><strong>Flexibility:</strong> Often easier to adjust hours or take unpaid time off</li>
              <li><strong>Predictable compensation:</strong> Pay directly correlates with hours worked</li>
              <li><strong>Legal protections:</strong> FLSA protections for overtime and working conditions</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Choose Salaried If You Value:</h4>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Income stability:</strong> Same paycheck regardless of hours worked that week</li>
              <li><strong>Better benefits:</strong> Typically more comprehensive benefit packages</li>
              <li><strong>Career growth:</strong> More advancement opportunities and professional designation</li>
              <li><strong>Autonomy:</strong> More control over schedule and work approach</li>
              <li><strong>Paid time off:</strong> Vacation, sick days, and holidays typically included</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common Mistakes in Salary Comparison</h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Not Accounting for Unpaid Time Off</h4>
              <p className="text-red-800">
                Forgetting to subtract unpaid vacation weeks inflates your estimated annual salary. If you take 2 weeks unpaid vacation, multiply by 50 weeks, not 52.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Ignoring Benefits Value</h4>
              <p className="text-red-800">
                Comparing only base salary or hourly rate without factoring in benefits can lead to poor job decisions. A $55K job with great benefits may be worth more than a $60K job with minimal benefits.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Overlooking Actual Hours Worked</h4>
              <p className="text-red-800">
                Salaried positions often require 50-60 hours/week but pay the same as 40 hours, significantly reducing your effective hourly rate. Calculate based on actual hours worked, not standard 40 hours.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h4 className="text-lg font-semibold text-red-900 mb-2">❌ Forgetting Tax Impact</h4>
              <p className="text-red-800">
                Focusing on gross pay without considering after-tax income leads to budget shortfalls. Always calculate take-home pay for realistic financial planning.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using This Hourly to Salary Calculator</h3>
            <p className="text-gray-700 mb-4">
              Our calculator provides comprehensive wage-to-salary conversion including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Multiple time periods:</strong> Annual, monthly, weekly salary breakdowns</li>
              <li><strong>Overtime calculations:</strong> Automatic time-and-a-half overtime pay</li>
              <li><strong>Vacation adjustment:</strong> Account for unpaid time off (48-52 work weeks)</li>
              <li><strong>Benefits inclusion:</strong> Add benefits value for total compensation</li>
              <li><strong>Tax estimation:</strong> Federal, state, and FICA tax calculations</li>
              <li><strong>Effective hourly rate:</strong> True hourly compensation including all factors</li>
              <li><strong>Comparison tool:</strong> Compare different job offers or scenarios</li>
            </ul>

            <p className="text-gray-700 mb-4">
              For related calculations, explore our{' '}
              <a href="/salary-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Salary Calculator
              </a>
              {' '}for comprehensive salary analysis,{' '}
              <a href="/payroll-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Payroll Calculator
              </a>
              {' '}for employer cost calculations, and{' '}
              <a href="/commission-calculator" className="text-blue-600 hover:text-blue-800 underline">
                Commission Calculator
              </a>
              {' '}if your compensation includes commission.
            </p>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/salary-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-semibold text-gray-900">Salary Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Comprehensive salary analysis</p>
            </a>
            
            <a href="/take-home-paycheck-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">Take-Home Pay Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate net income after taxes</p>
            </a>
            
            <a href="/overtime-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-semibold text-gray-900">Overtime Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate overtime pay</p>
            </a>
            
            <a href="/payroll-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900">Payroll Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate payroll taxes</p>
            </a>

            <a href="/tax-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900">Tax Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Estimate federal and state taxes</p>
            </a>
            
            <a href="/commission-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💹</div>
              <h3 className="font-semibold text-gray-900">Commission Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Calculate sales commission earnings</p>
            </a>
            
            <a href="/budget-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">💵</div>
              <h3 className="font-semibold text-gray-900">Budget Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Plan your monthly budget</p>
            </a>
            
            <a href="/retirement-calculator" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">🏖️</div>
              <h3 className="font-semibold text-gray-900">Retirement Calculator</h3>
              <p className="text-sm text-gray-600 mt-1">Plan retirement savings</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
