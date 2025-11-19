import { Metadata } from 'next';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import Link from 'next/link';
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId } from '@/config/site';

export const metadata: Metadata = {
  title: 'Real Estate Calculator (Free, No signup) - Property Value | AICalculator',
  description: 'Free real estate calculator with no sign-up required. Calculators for home buyers and investors. Calculate mortgage payments, affordability, ROI, rental income, down payments, refinancing options and more. Plan your real estate investment with confidence.',
  keywords: [
    'real estate calculator',
    'free real estate calculator',
    'real estate calculator no signup',
    'mortgage calculator',
    'home affordability calculator',
    'rental property calculator',
    'real estate investment calculator',
    'down payment calculator',
    'rent vs buy calculator',
    'cap rate calculator',
    'cash flow calculator',
    'property investment',
    'home loan calculator',
    'refinance calculator',
  ],
  openGraph: {
    title: 'Real Estate Calculator (Free, No signup) - AICalculator',
    description: 'Free real estate calculator with no sign-up required. For home buyers and investors. Calculate mortgage, affordability, ROI, and more.',
    url: getUrl('/real-estate-calculator'),
    images: [getOgImage()],
  },
};

const calculators = {
  financial: [
    {
      name: 'Mortgage Calculator',
      name_zh: '抵押贷款计算器',
      url: '/mortgage-calculator',
      description: 'Plan real estate mortgage loans or compare them against other loans.',
      description_zh: '规划房地产抵押贷款或将其与其他贷款进行比较。',
      icon: '🏠',
      available: true,
    },
    {
      name: 'House Affordability Calculator',
      name_zh: '房屋负担能力计算器',
      url: '/house-affordability-calculator',
      description: 'Calculate residential real estate affordability based on household income or fixed monthly estimates or budgets.',
      description_zh: '根据家庭收入或固定月度估算或预算住宅房地产的可负担能力。',
      icon: '💰',
      available: false,
    },
    {
      name: 'Mortgage Payoff Calculator',
      name_zh: '抵押贷款还清计算器',
      url: '/mortgage-payoff-calculator',
      description: 'Evaluate mortgage payoffs with additional or lump sum payments.',
      description_zh: '评估含额外付款或一次性付款的抵押贷款还清情况。',
      icon: '💳',
      available: false,
    },
    {
      name: 'Refinance Calculator',
      name_zh: '再融资计算器',
      url: '/refinance-calculator',
      description: 'Plan and/or compare real estate loan refinancing options.',
      description_zh: '规划和/或比较房地产贷款再融资方案。',
      icon: '🔄',
      available: false,
    },
    {
      name: 'FHA Loan Calculator',
      name_zh: 'FHA贷款计算器',
      url: '/fha-loan-calculator',
      description: 'Estimate and evaluate the payments and options for FHA loans.',
      description_zh: '估算和评估FHA贷款的付款和选项。',
      icon: '🏛️',
      available: false,
    },
    {
      name: 'VA Mortgage Calculator',
      name_zh: 'VA抵押贷款计算器',
      url: '/va-mortgage-calculator',
      description: 'Estimate and evaluate the payments and options for VA loans.',
      description_zh: '估算和评估VA贷款的付款和选项。',
      icon: '🎖️',
      available: false,
    },
    {
      name: 'Down Payment Calculator',
      name_zh: '首付计算器',
      url: '/down-payment-calculator',
      description: 'Calculations centered around the down payment of a home purchase.',
      description_zh: '以购房首付为核心的计算。',
      icon: '💵',
      available: false,
    },
    {
      name: 'APR Calculator',
      name_zh: '年利率计算器',
      url: '/apr-calculator',
      description: 'Help figure out the real APR of your loan with fees and points.',
      description_zh: '帮助您计算贷款含费用和点数在内的的真实年利率。',
      icon: '📊',
      available: false,
    },
    {
      name: 'Rental Property Calculator',
      name_zh: '租赁房产计算器',
      url: '/rental-property-calculator',
      description: 'Calculate return percentages, capitalization rate, and cashflows of rental property investments.',
      description_zh: '计算租赁房产投资的回报率、资本化率和资金流。',
      icon: '🏘️',
      available: false,
    },
    {
      name: 'Rent Calculator',
      name_zh: '租金计算器',
      url: '/rent-calculator',
      description: 'Estimate rental fee affordability based on income and debt levels.',
      description_zh: '根据收入和债务水平估算租金负担能力。',
      icon: '🏢',
      available: false,
    },
    {
      name: 'Rent vs. Buy Calculator',
      name_zh: '租房还是买房计算器',
      url: '/rent-vs-buy-calculator',
      description: 'Evaluate the financial feasibility of a rent-or-buy decision.',
      description_zh: '评估租房或买房决策的财务可行性。',
      icon: '⚖️',
      available: false,
    },
  ],
  other: [
    {
      name: 'Area Calculator',
      name_zh: '面积计算器',
      url: '/area-calculator',
      description: 'Estimate the area of real estate property.',
      description_zh: '估算房地产面积。',
      icon: '📐',
      available: false,
    },
    {
      name: 'Concrete Calculator',
      name_zh: '混凝土计算器',
      url: '/concrete-calculator',
      description: 'Estimate the amount of concrete for a real estate project.',
      description_zh: '估算房地产项目所需的混凝土量。',
      icon: '🧱',
      available: false,
    },
    {
      name: 'BTU Calculator',
      name_zh: 'BTU计算器',
      url: '/btu-calculator',
      description: 'Estimate the number of BTUs (British Thermal Units) needed for the heating or cooling of a particular property.',
      description_zh: '估算特定房产所需的BTU（英国热量单位）数量用于供暖或制冷。',
      icon: '🌡️',
      available: false,
    },
    {
      name: 'Stair Calculator',
      name_zh: '楼梯计算器',
      url: '/stair-calculator',
      description: 'Calculate stair parameters for a real estate project.',
      description_zh: '计算房地产项目的楼梯参数。',
      icon: '🪜',
      available: false,
    },
    {
      name: 'Tile Calculator',
      name_zh: '瓷砖计算器',
      url: '/tile-calculator',
      description: 'Estimate the number of tiles for floor, roof, or any other surface coverage needed for any real estate project.',
      description_zh: '估算任何房地产项目所需的地板、屋顶或其他表面覆盖的瓷砖数量。',
      icon: '🔲',
      available: false,
    },
    {
      name: 'Square Footage Calculator',
      name_zh: '平方英尺计算器',
      url: '/square-footage-calculator',
      description: 'Estimate the square footage of real estate.',
      description_zh: '估算房地产的平方英尺。',
      icon: '📏',
      available: false,
    },
    {
      name: 'Roofing Calculator',
      name_zh: '屋顶计算器',
      url: '/roofing-calculator',
      description: 'Estimate the roof area and the materials needed for a real estate project.',
      description_zh: '估算房地产项目的屋顶面积和所需材料。',
      icon: '🏠',
      available: false,
    },
  ],
};

export default function RealEstateCalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': getWebAppId('/real-estate-calculator'),
        name: 'Real Estate Calculator',
        description:
          'Free real estate calculators for home buyers and investors. Calculate mortgage payments, affordability, ROI, rental income, and more.',
        url: getUrl('/real-estate-calculator'),
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': getBreadcrumbId('/real-estate-calculator'),
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
            name: 'Financial',
            item: getUrl('/calculators#financial'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Real Estate Calculator',
            item: getUrl('/real-estate-calculator'),
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Real Estate Calculator</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">房地产计算器</h2>
          <p className="text-lg text-gray-600 max-w-4xl">
            Real Estate is a broad term with many different calculations associated with it. Included is a list to
            help choose the right calculator to fit most real estate needs. If, after perusing this list, you find
            that the calculator you need doesn&apos;t exist, please contact us with your concerns and we determine if
            it is possible to build one for public use.
          </p>
          <p className="text-base text-gray-600 max-w-4xl mt-2">
            房地产是一个涵盖范围很广的概念，涉及多种不同的计算方法。这里提供一份计算器列表，帮助您选择最适合您房地产需求的计算器。如果您在浏览此列表后发现您需要的计算器不存在，请与我们联系并说明您的需求，我们将评估是否可以开发一个供公众使用的计算器。
          </p>
        </div>

        {/* Financial Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Financial
            <span className="ml-3 text-xl text-gray-600">金融的</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.financial.map((calc, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow ${
                  calc.available ? 'bg-white' : 'bg-gray-50 opacity-75'
                }`}
              >
                <div className="flex items-start mb-3">
                  <span className="text-3xl mr-3">{calc.icon}</span>
                  <div className="flex-1">
                    {calc.available ? (
                      <Link
                        href={calc.url}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-semibold text-base"
                      >
                        {calc.name}
                      </Link>
                    ) : (
                      <span className="text-gray-700 font-semibold text-base">{calc.name}</span>
                    )}
                    <p className="text-sm text-gray-500 mt-0.5">{calc.name_zh}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{calc.description}</p>
                <p className="text-xs text-gray-500">{calc.description_zh}</p>
                {!calc.available && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Other Section */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Other</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.other.map((calc, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow bg-gray-50 opacity-75"
              >
                <div className="flex items-start mb-3">
                  <span className="text-3xl mr-3">{calc.icon}</span>
                  <div className="flex-1">
                    <span className="text-gray-700 font-semibold text-base">{calc.name}</span>
                    <p className="text-sm text-gray-500 mt-0.5">{calc.name_zh}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{calc.description}</p>
                <p className="text-xs text-gray-500">{calc.description_zh}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

