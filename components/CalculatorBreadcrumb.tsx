'use client';

import Link from 'next/link';
import { allCalculators } from '@/lib/calculatorData';

interface BreadcrumbProps {
  calculatorName: string;
  calculatorUrl?: string;
}

/**
 * 统一的计算器面包屑导航组件
 * 自动根据计算器URL从 calculatorData.ts 中获取正确的分类
 */
export function CalculatorBreadcrumb({ calculatorName, calculatorUrl }: BreadcrumbProps) {
  // 如果提供了URL，从数据中查找对应的计算器
  let category = 'Other'; // 默认分类
  let categoryName = 'Other';
  let categoryUrl = '/other';
  
  if (calculatorUrl) {
    const calc = allCalculators.find(c => c.url === calculatorUrl);
    if (calc) {
      category = calc.category;
    }
  }
  
  // 根据分类设置面包屑信息
  const categoryMap: Record<string, { name: string; url: string; urlFragment: string }> = {
    'Financial': { name: 'Financial', url: '/financial', urlFragment: 'financial' },
    'Health': { name: 'Health & Fitness', url: '/health-fitness', urlFragment: 'health' },
    'Math': { name: 'Math', url: '/math-numbers', urlFragment: 'math' },
    'Other': { name: 'Other', url: '/other', urlFragment: 'other' },
  };
  
  const categoryInfo = categoryMap[category] || categoryMap['Other'];
  categoryName = categoryInfo.name;
  categoryUrl = categoryInfo.url;

  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <ol 
          className="flex items-center space-x-2 text-sm text-gray-600"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {/* Home */}
          <li 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <Link 
              href="/" 
              itemProp="item" 
              className="hover:text-blue-600 transition-colors"
            >
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          
          <li className="text-gray-400">/</li>
          
          {/* Category */}
          <li 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <Link 
              href={categoryUrl}
              itemProp="item" 
              className="hover:text-blue-600 transition-colors"
            >
              <span itemProp="name">{categoryName}</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          
          <li className="text-gray-400">/</li>
          
          {/* Current Calculator */}
          <li 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name" className="text-gray-900 font-semibold">
              {calculatorName}
            </span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </div>
    </nav>
  );
}

/**
 * 简化版面包屑（用于不需要完整样式的场景）
 */
export function SimpleBreadcrumb({ calculatorName, calculatorUrl }: BreadcrumbProps) {
  // 如果提供了URL，从数据中查找对应的计算器
  let category = 'Other';
  let categoryName = 'Other';
  let categoryUrl = '/other';
  
  if (calculatorUrl) {
    const calc = allCalculators.find(c => c.url === calculatorUrl);
    if (calc) {
      category = calc.category;
    }
  }
  
  // 根据分类设置面包屑信息
  const categoryMap: Record<string, { name: string; url: string }> = {
    'Financial': { name: 'Financial', url: '/financial' },
    'Health': { name: 'Health & Fitness', url: '/health-fitness' },
    'Math': { name: 'Math', url: '/math-numbers' },
    'Other': { name: 'Other', url: '/other' },
  };
  
  const categoryInfo = categoryMap[category] || categoryMap['Other'];
  categoryName = categoryInfo.name;
  categoryUrl = categoryInfo.url;

  return (
    <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2">/</span>
          <Link href={categoryUrl} className="hover:text-blue-600 transition-colors">
            {categoryName}
          </Link>
        </li>
        <li className="flex items-center">
          <span className="mx-2">/</span>
          <span className="text-gray-900">{calculatorName}</span>
        </li>
      </ol>
    </nav>
  );
}

