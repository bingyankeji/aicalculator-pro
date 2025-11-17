'use client';

import Link from 'next/link';
import { allCalculators } from '@/lib/calculatorData';

// 定义每个分类及其最常用的计算器
const categoryConfig = {
  financial: {
    title: 'Financial Calculators',
    icon: '💰',
    description: 'Calculate mortgages, loans, investments, and taxes',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-900',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-300',
    hoverText: 'hover:text-blue-900',
    buttonBg: 'bg-gray-900',
    buttonHover: 'hover:bg-gray-800',
    popularTools: [
      'Mortgage Calculator',
      'Loan Calculator',
      'Interest Calculator',
      'Salary Calculator',
      'Income Tax Calculator',
      'Savings Calculator',
      'Retirement Calculator',
      'Investment Calculator',
      'Auto Loan Calculator',
      'Credit Card Calculator',
      'Compound Interest Calculator',
      'Paycheck Calculator'
    ]
  },
  health: {
    title: 'Health & Fitness Calculators',
    icon: '🏥',
    description: 'BMI, calorie, BMR, and fitness calculators',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-900',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-300',
    hoverText: 'hover:text-blue-900',
    buttonBg: 'bg-gray-900',
    buttonHover: 'hover:bg-gray-800',
    popularTools: [
      'BMI Calculator',
      'Calorie Calculator',
      'BMR Calculator',
      'TDEE Calculator',
      'Body Fat Calculator',
      'Macro Calculator',
      'Protein Calculator',
      'Ideal Weight Calculator',
      'Pace Calculator',
      'Pregnancy Calculator'
    ]
  },
  math: {
    title: 'Math Calculators',
    icon: '📐',
    description: 'Percentage, fraction, algebra, and geometry tools',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-900',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-300',
    hoverText: 'hover:text-blue-900',
    buttonBg: 'bg-gray-900',
    buttonHover: 'hover:bg-gray-800',
    popularTools: [
      'Percentage Calculator',
      'Fraction Calculator',
      'Scientific Calculator',
      'Basic Calculator',
      'Area Calculator',
      'Volume Calculator',
      'Ratio Calculator',
      'Statistics Calculator',
      'Standard Deviation Calculator',
      'Average Calculator',
      'Triangle Calculator',
      'Circle Calculator'
    ]
  },
  other: {
    title: 'Other Calculators',
    icon: '🔧',
    description: 'Age, date, time, GPA, grade, and utility tools',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-200',
    textColor: 'text-gray-900',
    hoverBg: 'hover:bg-blue-50',
    hoverBorder: 'hover:border-blue-300',
    hoverText: 'hover:text-blue-900',
    buttonBg: 'bg-gray-900',
    buttonHover: 'hover:bg-gray-800',
    popularTools: [
      'Age Calculator',
      'Date Calculator',
      'Time Calculator',
      'GPA Calculator',
      'Grade Calculator',
      'Tip Calculator',
      'Unit Converter',
      'Currency Converter',
      'Square Footage Calculator'
    ]
  }
};

export function CategoryShowcase() {
  // 获取每个分类的计算器
  const getCalculatorsByCategory = (categoryName: string) => {
    return allCalculators.filter(calc => calc.category === categoryName);
  };

  // 根据名称获取计算器
  const getCalculatorByName = (name: string) => {
    return allCalculators.find(calc => calc.name === name);
  };

  return (
    <>
        {/* Financial Calculators */}
        <div className={`bg-gradient-to-br ${categoryConfig.financial.bgColor} rounded-xl border ${categoryConfig.financial.borderColor} p-6 shadow-sm hover:shadow-md transition-all`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{categoryConfig.financial.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${categoryConfig.financial.textColor}`}>
                {categoryConfig.financial.title}
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {categoryConfig.financial.popularTools.slice(0, 10).map((toolName) => {
              const calc = getCalculatorByName(toolName);
              if (!calc) return null;
              return (
                <Link
                  key={calc.url}
                  href={calc.url}
                  className={`px-3 py-2 bg-white ${categoryConfig.financial.hoverBg} rounded-lg text-sm text-gray-700 ${categoryConfig.financial.hoverText} transition-colors flex items-center gap-2 border border-gray-200 ${categoryConfig.financial.hoverBorder}`}
                >
                  <span>{calc.icon}</span>
                  <span className="truncate">{calc.name.replace(' Calculator', '')}</span>
                </Link>
              );
            })}
          </div>
          
          <Link
            href="/calculators#financial"
            className={`block text-center py-2 ${categoryConfig.financial.buttonBg} text-white rounded-lg ${categoryConfig.financial.buttonHover} transition-colors font-medium text-sm`}
          >
            View All Financial Calculators →
          </Link>
        </div>

        {/* Health & Fitness Calculators */}
        <div className={`bg-gradient-to-br ${categoryConfig.health.bgColor} rounded-xl border ${categoryConfig.health.borderColor} p-6 shadow-sm hover:shadow-md transition-all`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{categoryConfig.health.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${categoryConfig.health.textColor}`}>
                {categoryConfig.health.title}
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {categoryConfig.health.popularTools.slice(0, 10).map((toolName) => {
              const calc = getCalculatorByName(toolName);
              if (!calc) return null;
              return (
                <Link
                  key={calc.url}
                  href={calc.url}
                  className={`px-3 py-2 bg-white ${categoryConfig.health.hoverBg} rounded-lg text-sm text-gray-700 ${categoryConfig.health.hoverText} transition-colors flex items-center gap-2 border border-gray-200 ${categoryConfig.health.hoverBorder}`}
                >
                  <span>{calc.icon}</span>
                  <span className="truncate">{calc.name.replace(' Calculator', '')}</span>
                </Link>
              );
            })}
          </div>
          
          <Link
            href="/calculators#health"
            className={`block text-center py-2 ${categoryConfig.health.buttonBg} text-white rounded-lg ${categoryConfig.health.buttonHover} transition-colors font-medium text-sm`}
          >
            View All Health Calculators →
          </Link>
        </div>

        {/* Math Calculators */}
        <div className={`bg-gradient-to-br ${categoryConfig.math.bgColor} rounded-xl border ${categoryConfig.math.borderColor} p-6 shadow-sm hover:shadow-md transition-all`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{categoryConfig.math.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${categoryConfig.math.textColor}`}>
                {categoryConfig.math.title}
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {categoryConfig.math.popularTools.slice(0, 10).map((toolName) => {
              const calc = getCalculatorByName(toolName);
              if (!calc) return null;
              return (
                <Link
                  key={calc.url}
                  href={calc.url}
                  className={`px-3 py-2 bg-white ${categoryConfig.math.hoverBg} rounded-lg text-sm text-gray-700 ${categoryConfig.math.hoverText} transition-colors flex items-center gap-2 border border-gray-200 ${categoryConfig.math.hoverBorder}`}
                >
                  <span>{calc.icon}</span>
                  <span className="truncate">{calc.name.replace(' Calculator', '')}</span>
                </Link>
              );
            })}
          </div>
          
          <Link
            href="/calculators#math"
            className={`block text-center py-2 ${categoryConfig.math.buttonBg} text-white rounded-lg ${categoryConfig.math.buttonHover} transition-colors font-medium text-sm`}
          >
            View All Math Calculators →
          </Link>
        </div>

        {/* Other Calculators */}
        <div className={`bg-gradient-to-br ${categoryConfig.other.bgColor} rounded-xl border ${categoryConfig.other.borderColor} p-6 shadow-sm hover:shadow-md transition-all`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{categoryConfig.other.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${categoryConfig.other.textColor}`}>
                {categoryConfig.other.title}
              </h3>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {categoryConfig.other.popularTools.slice(0, 10).map((toolName) => {
              const calc = getCalculatorByName(toolName);
              if (!calc) return null;
              return (
                <Link
                  key={calc.url}
                  href={calc.url}
                  className={`px-3 py-2 bg-white ${categoryConfig.other.hoverBg} rounded-lg text-sm text-gray-700 ${categoryConfig.other.hoverText} transition-colors flex items-center gap-2 border border-gray-200 ${categoryConfig.other.hoverBorder}`}
                >
                  <span>{calc.icon}</span>
                  <span className="truncate">{calc.name.replace(' Calculator', '')}</span>
                </Link>
              );
            })}
          </div>
          
          <Link
            href="/calculators#other"
            className={`block text-center py-2 ${categoryConfig.other.buttonBg} text-white rounded-lg ${categoryConfig.other.buttonHover} transition-colors font-medium text-sm`}
          >
            View All Other Calculators →
          </Link>
        </div>
    </>
  );
}

