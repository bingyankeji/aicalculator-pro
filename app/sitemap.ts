import { MetadataRoute } from 'next';
import { allCalculators } from '@/lib/calculatorData';

/**
 * 动态Sitemap生成器
 * 
 * ✅ 优势：
 * 1. 真正的动态sitemap - 自动从 calculatorData.ts 读取所有计算器
 * 2. 零维护 - 添加新计算器到 calculatorData.ts 后，sitemap自动更新
 * 3. 单一数据源 - 和搜索功能使用相同的数据源
 * 4. 永不过期 - 始终包含所有最新计算器
 * 
 * Next.js会自动在 /sitemap.xml 生成此sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicalculator.pro';

  // 主页面路由
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/financial`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/health-fitness`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/math-numbers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/date-time`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/other`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // 从 calculatorData.ts 自动生成所有计算器路由
  const calculatorPages: MetadataRoute.Sitemap = allCalculators.map((calculator) => {
    // 根据分类设置优先级
    let priority = 0.8;
    let changeFrequency: 'weekly' | 'daily' | 'monthly' = 'weekly';

    // Financial 分类计算器优先级更高
    if (calculator.category === 'Financial') {
      priority = 0.9;
      changeFrequency = 'weekly';
    } else if (calculator.category === 'Health') {
      priority = 0.85;
      changeFrequency = 'weekly';
    } else if (calculator.category === 'Math') {
      priority = 0.8;
      changeFrequency = 'monthly';
    } else {
      priority = 0.75;
      changeFrequency = 'monthly';
    }

    return {
      url: `${baseUrl}${calculator.url}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  // 合并所有路由
  return [...mainPages, ...calculatorPages];
}
