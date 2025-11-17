import { allCalculators } from './calculatorData';

// 统计各分类的真实计算器数量
export function getCategoryStats() {
  const stats = allCalculators.reduce((acc, calc) => {
    const category = calc.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    Financial: stats.Financial || 0,
    Health: stats.Health || 0,
    Math: stats.Math || 0,
    Academic: stats.Academic || 0,
    Other: stats.Other || 0,
    total: allCalculators.length
  };
}

// 获取实际存在的分类
export function getActualCategories() {
  const stats = getCategoryStats();
  
  return [
    { name: 'Financial', icon: '💰', count: stats.Financial, url: '/calculators#financial' },
    { name: 'Health & Fitness', icon: '🏥', count: stats.Health, url: '/calculators#health' },
    { name: 'Math', icon: '📐', count: stats.Math, url: '/calculators#math' },
    { name: 'Academic', icon: '🎓', count: stats.Academic, url: '/calculators#academic' },
    { name: 'Other', icon: '🔧', count: stats.Other, url: '/calculators#other' },
  ].filter(category => category.count > 0); // 只返回有计算器的分类
}

// 获取总计算器数量的描述
export function getTotalCalculatorsDescription() {
  const total = allCalculators.length;
  return `${total}+ Free Calculator Tools`;
}
