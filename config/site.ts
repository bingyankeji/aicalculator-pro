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
 * 辅助函数：生成 Open Graph 图片 URL
 * 
 * @param name - 图片名称（如 'mortgage' 或 'mortgage-calculator'）
 * @returns 完整的图片 URL（如 'https://aicalculator.pro/og-mortgage.png'）
 * 
 * @example
 * ```ts
 * getOgImage('mortgage')
 * // => 'https://aicalculator.pro/og-mortgage.png'
 * 
 * getOgImage('mortgage-calculator')
 * // => 'https://aicalculator.pro/og-mortgage-calculator.png'
 * ```
 */
export function getOgImage(name: string): string {
  // 移除可能的 -calculator 后缀（如果需要）
  // const cleanName = name.replace(/-calculator$/, '');
  return `${siteConfig.url}/og-${name}.png`;
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

