import Link from 'next/link';

const calculatorsByCategory = [
  {
    category: 'Financial',
    icon: '💰',
    categoryId: 'financial',
    calculators: [
      { name: 'Mortgage Calculator', url: '/mortgage-calculator' },
      { name: 'Loan Calculator', url: '/loan-calculator' },
      { name: 'Income Tax Calculator', url: '/tax-calculator' },
      { name: 'Retirement Calculator', url: '/retirement-calculator' },
      { name: 'Investment Calculator', url: '/investment-calculator' },
      { name: 'Salary Calculator', url: '/salary-calculator' },
      { name: 'Compound Interest', url: '/compound-interest-calculator' },
    ],
    totalCount: 80,
  },
  {
    category: 'Health & Fitness',
    icon: '🏥',
    categoryId: 'health',
    calculators: [
      { name: 'BMI Calculator', url: '/bmi-calculator' },
      { name: 'Calorie Calculator', url: '/calorie-calculator' },
      { name: 'Body Fat Calculator', url: '/body-fat-calculator' },
      { name: 'Ideal Weight', url: '/ideal-weight-calculator' },
      { name: 'Pregnancy Calculator', url: '/pregnancy-calculator' },
      { name: 'BMR Calculator', url: '/bmr-calculator' },
      { name: 'TDEE Calculator', url: '/tdee-calculator' },
    ],
    totalCount: 35,
  },
  {
    category: 'Math',
    icon: '📐',
    categoryId: 'math',
    calculators: [
      { name: 'Percentage Calculator', url: '/percentage-calculator' },
      { name: 'Average Calculator', url: '/average-calculator' },
      { name: 'Ratio Calculator', url: '/ratio-calculator' },
      { name: 'Fraction Calculator', url: '/fraction-calculator' },
      { name: 'Scientific Calculator', url: '/scientific-calculator' },
      { name: 'Square Root', url: '/square-root-calculator' },
      { name: 'Statistics Calculator', url: '/statistics-calculator' },
    ],
    totalCount: 50,
  },
  {
    category: 'Other',
    icon: '🔧',
    categoryId: 'other',
    calculators: [
      { name: 'Age Calculator', url: '/age-calculator' },
      { name: 'Date Calculator', url: '/date-calculator' },
      { name: 'Time Calculator', url: '/time-calculator' },
      { name: 'GPA Calculator', url: '/gpa-calculator' },
      { name: 'Tip Calculator', url: '/tip-calculator' },
      { name: 'Unit Converter', url: '/unit-converter' },
      { name: 'Square Footage', url: '/square-footage-calculator' },
    ],
    totalCount: 60,
  },
];

export function CalculatorList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {calculatorsByCategory.map((category) => (
        <div 
          key={category.category} 
          className="bg-white rounded-lg border border-gray-200 p-5"
        >
          {/* Category Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <span className="text-2xl">{category.icon}</span>
            <h3 className="font-bold text-gray-900">
              {category.category}
            </h3>
          </div>

          {/* Calculator Links */}
          <ul className="space-y-2">
            {category.calculators.map((calc) => (
              <li key={calc.name}>
                {calc.url !== '#' ? (
                  <Link 
                    href={calc.url} 
                    className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
                  >
                    {calc.name}
                  </Link>
                ) : (
                  <span className="text-sm text-gray-500">
                    {calc.name}
                  </span>
                )}
              </li>
            ))}
            {category.totalCount > category.calculators.length && (
              <li className="pt-2">
                <Link
                  href={`/calculators#${category.categoryId}`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + {category.totalCount - category.calculators.length} more
                </Link>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
