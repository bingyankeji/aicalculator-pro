/**
 * 网站配置文件
 * 
 * 这是项目的中心配置文件，所有URL、域名、社交媒体账号等信息都在这里统一管理。
 * 
 * ✅ 优势：
 * 1. 单一数据源 - 所有配置集中管理
 * 2. 环境感知 - 自动根据环境变量切换
 * 3. 类型安全 - TypeScript 类型检查
 * 4. 易于维护 - 修改一处，全局生效
 * 
 * ⚠️ 重要：
 * - 所有新开发的页面必须使用这个配置文件
 * - 禁止在代码中硬编码 URL
 * - 使用辅助函数（getUrl, getOgImage）生成完整 URL
 */

import { allCalculators } from '@/lib/calculatorData';

/**
 * 网站核心配置
 */
export const siteConfig = {
  // 域名配置（从环境变量读取）
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aicalculator.pro',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'AICalculator.pro',
  
  // 社交媒体配置
  twitter: {
    handle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@AICalculatorPro',
    site: '@AICalculator',
    creator: '@aicalculator',
  },
  facebook: {
    page: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || 'AICalculatorPro',
  },
  
  // 联系信息
  email: {
    support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@aicalculator.pro',
    business: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'business@aicalculator.pro',
  },
  
  // SEO 相关配置
  seo: {
    defaultTitle: 'AI Calculator - 250+ Free Online Calculators',
    defaultDescription: 'Professional AI-powered calculator tools for finance, health, math, and more. Free, accurate, and easy to use.',
    keywords: [
      'calculator',
      'online calculator',
      'free calculator',
      'AI calculator',
      'financial calculator',
      'health calculator',
      'math calculator',
    ],
  },
  
  // Open Graph 图片配置
  og: {
    width: 1200,
    height: 630,
    type: 'website',
    locale: 'en_US',
  },
  
  // 品牌资源
  assets: {
    logo: '/logo.png',
    favicon: '/favicon.ico',
  },
  
  // Google Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
  },
} as const;

/**
 * 辅助函数：生成完整的 URL
 * 
 * @param path - 路径（如 '/mortgage-calculator' 或 'mortgage-calculator'）
 * @returns 完整的 URL（如 'https://aicalculator.pro/mortgage-calculator'）
 * 
 * @example
 * ```ts
 * getUrl('/mortgage-calculator')
 * // => 'https://aicalculator.pro/mortgage-calculator'
 * 
 * getUrl('mortgage-calculator')
 * // => 'https://aicalculator.pro/mortgage-calculator'
 * ```
 */
export function getUrl(path: string): string {
  // 确保路径以 / 开头
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // 移除末尾的 /
  const trimmedPath = cleanPath.endsWith('/') && cleanPath !== '/' 
    ? cleanPath.slice(0, -1) 
    : cleanPath;
  
  return `${siteConfig.url}${trimmedPath}`;
}

/**
 * 辅助函数：根据 URL 或名称查找计算器信息
 * 
 * @param identifier - 计算器 URL 或名称（如 '/mortgage-calculator' 或 'mortgage'）
 * @returns 计算器对象或 undefined
 */
function getCalculatorInfo(identifier: string | undefined) {
  // 参数验证
  if (!identifier || typeof identifier !== 'string') {
    return undefined;
  }
  
  // 标准化标识符
  const normalized = identifier.startsWith('/') ? identifier : `/${identifier}`;
  const withCalculator = normalized.includes('-calculator') ? normalized : `${normalized}-calculator`;
  
  // 查找计算器
  return allCalculators.find(calc => 
    calc.url === normalized || 
    calc.url === withCalculator ||
    calc.url.replace('-calculator', '') === normalized.replace('-calculator', '')
  );
}

/**
 * 辅助函数：生成 Open Graph 图片 URL（动态生成）
 * 
 * @param name - 图片名称或路径（如 'mortgage'、'mortgage-calculator'、'/mortgage-calculator' 或 'home'）
 * @returns 完整的 OG 图片 API URL（动态生成）
 * 
 * @example
 * ```ts
 * getOgImage('mortgage')
 * // => 'https://aicalculator.pro/api/og?title=Mortgage%20Calculator&subtitle=Calculate%20monthly%20payments&icon=🏠&category=Financial'
 * 
 * getOgImage('home')
 * // => 'https://aicalculator.pro/api/og?title=AICalculator.pro&subtitle=250%2B%20Free%20Online%20Calculators&icon=🧮&category=Calculator'
 * ```
 */
export function getOgImage(name?: string): string {
  // 参数验证
  if (!name || typeof name !== 'string') {
    const params = new URLSearchParams({
      title: 'AICalculator.pro',
      subtitle: 'Free Online Calculator',
      icon: '🧮',
      category: 'Calculator',
    });
    return `${siteConfig.url}/api/og?${params.toString()}`;
  }
  
  // 特殊处理首页
  if (name === 'home' || name === '' || name === '/') {
    const params = new URLSearchParams({
      title: 'AICalculator.pro',
      subtitle: '250+ Free Online Calculators',
      icon: '🧮',
      category: 'Free Tools',
    });
    return `${siteConfig.url}/api/og?${params.toString()}`;
  }
  
  // 查找计算器信息
  const calculator = getCalculatorInfo(name);
  
  if (calculator) {
    // 生成动态 OG 图片 URL
    const params = new URLSearchParams({
      title: calculator.name,
      subtitle: 'Calculate instantly with AI-powered analysis',
      icon: calculator.icon,
      category: calculator.category,
    });
    return `${siteConfig.url}/api/og?${params.toString()}`;
  }
  
  // 回退到默认图片（如果没有找到计算器信息）
  const params = new URLSearchParams({
    title: 'AICalculator.pro',
    subtitle: 'Free Online Calculator',
    icon: '🧮',
    category: 'Calculator',
  });
  return `${siteConfig.url}/api/og?${params.toString()}`;
}

/**
 * 辅助函数：生成面包屑 Schema ID
 * 
 * @param path - 路径
 * @returns Schema ID（如 'https://aicalculator.pro/mortgage-calculator#breadcrumb'）
 */
export function getBreadcrumbId(path: string): string {
  return `${getUrl(path)}#breadcrumb`;
}

/**
 * 辅助函数：生成 WebApplication Schema ID
 * 
 * @param path - 路径
 * @returns Schema ID（如 'https://aicalculator.pro/mortgage-calculator#webapp'）
 */
export function getWebAppId(path: string): string {
  return `${getUrl(path)}#webapp`;
}

/**
 * 辅助函数：生成 FAQ Schema ID
 * 
 * @param path - 路径
 * @returns Schema ID（如 'https://aicalculator.pro/mortgage-calculator#faq'）
 */
export function getFaqId(path: string): string {
  return `${getUrl(path)}#faq`;
}

/**
 * 辅助函数：生成 HowTo Schema ID
 * 
 * @param path - 路径
 * @returns Schema ID（如 'https://aicalculator.pro/mortgage-calculator#howto'）
 */
export function getHowToId(path: string): string {
  return `${getUrl(path)}#howto`;
}

/**
 * 辅助函数：生成 Article Schema ID
 * 
 * @param path - 路径
 * @returns Schema ID（如 'https://aicalculator.pro/mortgage-calculator#article'）
 */
export function getArticleId(path: string): string {
  return `${getUrl(path)}#article`;
}

/**
 * 辅助函数：生成步骤 URL（用于 HowTo Schema）
 * 
 * @param path - 计算器路径
 * @param stepNumber - 步骤编号（1, 2, 3...）
 * @returns 步骤 URL（如 'https://aicalculator.pro/mortgage-calculator#step1'）
 */
export function getStepUrl(path: string, stepNumber: number): string {
  return `${getUrl(path)}#step${stepNumber}`;
}

/**
 * 分类路径映射
 * 用于面包屑导航和分类页面
 */
export const categoryPaths = {
  financial: '/financial',
  health: '/health-fitness',
  math: '/math-numbers',
  date: '/date-time',
  other: '/other',
} as const;

/**
 * 辅助函数：获取分类 URL
 * 
 * @param category - 分类名称
 * @returns 分类 URL
 */
export function getCategoryUrl(category: keyof typeof categoryPaths): string {
  return getUrl(categoryPaths[category]);
}

/**
 * 类型定义：确保类型安全
 */
export type SiteConfig = typeof siteConfig;
export type CategoryKey = keyof typeof categoryPaths;

