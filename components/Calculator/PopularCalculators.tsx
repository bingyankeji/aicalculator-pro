import Link from 'next/link';
import { Calculator } from '@/lib/types';

const popularCalculators: Calculator[] = [
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    description: 'Home Loan Analysis',
    icon: '🏠',
    category: 'financial',
    url: '/mortgage-calculator',
    featured: true,
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate Age',
    icon: '🎂',
    category: 'academic',
    url: '/age-calculator',
    featured: true,
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    description: 'Body Mass Index',
    icon: '⚖️',
    category: 'health',
    url: '/bmi-calculator',
    featured: true,
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Loan EMI',
    icon: '📈',
    category: 'financial',
    url: '/emi-calculator',
    featured: true,
  },
  {
    id: 'tax',
    name: 'Tax Calculator',
    description: 'Income Tax',
    icon: '📋',
    category: 'financial',
    url: '/tax-calculator',
    featured: true,
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    description: 'Monthly Payments',
    icon: '💰',
    category: 'financial',
    url: '/loan-calculator',
    featured: true,
  },
];

const iconBgColors: { [key: string]: string } = {
  '📊': 'bg-blue-100',
  '🏠': 'bg-green-100',
  '🤖': 'bg-green-100',
  '💰': 'bg-yellow-100',
  '🔢': 'bg-purple-100',
  '🍎': 'bg-red-100',
  '📋': 'bg-orange-100',
};

export function PopularCalculators() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {popularCalculators.map((calc) => (
        <Link
          key={calc.id}
          href={calc.url}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="text-4xl mb-2">{calc.icon}</div>
          <h3 className="font-semibold text-sm text-gray-900 text-center mb-1">
            {calc.name}
          </h3>
          <p className="text-xs text-gray-500 text-center">{calc.description}</p>
        </Link>
      ))}
    </div>
  );
}
