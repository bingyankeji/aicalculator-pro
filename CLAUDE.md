# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
```bash
npm run dev         # Start development server on port 3001
npm run build       # Build for production
npm run start       # Start production server on port 3001
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript validation (currently skips for deployment)
```

### Windows Quick Start
Double-click `快速启动.bat` for one-click development server startup.

## Project Architecture

This is a **Next.js 14 AI Calculator Platform** (AICalculator.pro) featuring 250+ free online calculators with AI-powered analysis.

### ⚠️ 重要：网站域名配置与代码规范

**生产环境域名：** `https://aicalculator.pro`

**🚫 禁止硬编码 URL！必须使用配置文件！**

**核心原则：**
- ✅ 使用环境变量和配置文件管理域名
- ✅ 保留所有页面的完整SEO内容（不允许精简）
- ✅ 只替换硬编码URL，不修改其他代码
- ❌ 禁止删除或简化任何SEO内容、FAQ、教育内容

---

#### ✅ 正确做法：只替换URL，保留所有内容

**步骤1：导入辅助函数**
```typescript
import { getUrl, getOgImage, getBreadcrumbId, getWebAppId, getFaqId, getHowToId, getArticleId, getStepUrl } from '@/config/site';
```

**步骤2：替换 metadata 中的硬编码URL**
```typescript
export const metadata: Metadata = {
  title: 'Mortgage Calculator - Calculate Monthly Payments | AICalculator',  // ← 保持不变
  description: 'Free mortgage calculator with detailed amortization...',  // ← 保持不变
  keywords: [
    'mortgage calculator',
    'home loan calculator',
    // ... 保留所有20+个关键词
  ],  // ← 保持不变
  authors: [{ name: 'AICalculator.pro Team' }],  // ← 保持不变
  creator: 'AICalculator.pro',  // ← 保持不变
  publisher: 'AICalculator.pro',  // ← 保持不变
  openGraph: {
    title: 'Mortgage Calculator',  // ← 保持不变
    description: '...',  // ← 保持不变
    type: 'website',  // ← 保持不变
    url: getUrl('/mortgage-calculator'),  // ✅ 只改这里
    siteName: 'AICalculator',  // ← 保持不变
    locale: 'en_US',  // ← 保持不变
    images: [{
      url: getOgImage('mortgage'),  // ✅ 只改这里
      width: 1200,  // ← 保持不变
      height: 630,  // ← 保持不变
    }],
  },
  twitter: {
    card: 'summary_large_image',  // ← 保持不变
    title: '...',  // ← 保持不变
    description: '...',  // ← 保持不变
    images: [getOgImage('mortgage')],  // ✅ 只改这里
    creator: '@aicalculator',  // ← 保持不变
  },
  alternates: {
    canonical: getUrl('/mortgage-calculator'),  // ✅ 只改这里
  },
  robots: {
    // ... 保持不变
  },
};
```

**步骤3：替换 JSON-LD Schema 中的硬编码URL**
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': getWebAppId('/mortgage-calculator'),  // ✅ 只改这里
      name: 'Mortgage Calculator',  // ← 保持不变
      url: getUrl('/mortgage-calculator'),  // ✅ 只改这里
      description: '...',  // ← 保持不变
      // ... 保留所有 featureList、offers 等配置
    },
    {
      '@type': 'BreadcrumbList',
      '@id': getBreadcrumbId('/mortgage-calculator'),  // ✅ 只改这里
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getUrl('/'),  // ✅ 只改这里
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Financial',
          item: getUrl('/financial'),  // ✅ 只改这里
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Mortgage Calculator',
          item: getUrl('/mortgage-calculator'),  // ✅ 只改这里
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/mortgage-calculator'),  // ✅ 只改这里
      mainEntity: [
        // ← 保留所有8-10个详细FAQ（每个100-200字）
        {
          '@type': 'Question',
          name: 'How to calculate mortgage payment?',  // ← 保持不变
          acceptedAnswer: {
            '@type': 'Answer',
            text: '详细的200字答案...'  // ← 保持不变
          }
        },
        // ... 保留所有FAQ
      ],
    },
    {
      '@type': 'HowTo',
      '@id': getHowToId('/mortgage-calculator'),  // ✅ 只改这里
      name: 'How to Use Mortgage Calculator',  // ← 保持不变
      description: '...',  // ← 保持不变
      totalTime: 'PT5M',  // ← 保持不变
      estimatedCost: { /* ... */ },  // ← 保持不变
      tool: { /* ... */ },  // ← 保持不变
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter Home Price',  // ← 保持不变
          text: '详细的步骤说明...',  // ← 保持不变
          url: getStepUrl('/mortgage-calculator', 1),  // ✅ 只改这里
        },
        // ... 保留所有6-8个步骤
      ],
    },
    {
      '@type': 'Article',
      '@id': getArticleId('/mortgage-calculator'),  // ✅ 只改这里
      headline: '...',  // ← 保持不变
      description: '...',  // ← 保持不变
      author: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
        url: getUrl('/'),  // ✅ 只改这里
      },
      publisher: {
        '@type': 'Organization',
        name: 'AICalculator.pro',
        logo: {
          '@type': 'ImageObject',
          url: getUrl('/logo.png'),  // ✅ 只改这里
        },
      },
      datePublished: '2024-01-01',  // ← 保持不变
      dateModified: '2024-11-16',  // ← 保持不变
      image: getOgImage('mortgage'),  // ✅ 只改这里
      articleBody: '...',  // ← 保持不变
    },
  ],
};
```

**步骤4：保留所有教育内容**
```typescript
return (
  <>
    <script type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <h1 className="sr-only">Mortgage Calculator</h1>
      
      {/* 面包屑导航 - 保持不变 */}
      <nav aria-label="Breadcrumb">...</nav>
      
      {/* 计算器组件 - 保持不变 */}
      <MortgageCalculator />
      
      {/* 教育内容 - 保持不变（300-500行）*/}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-blue max-w-none">
          <h2>Understanding Mortgage Calculations</h2>
          <p>详细的教育内容...</p>
          {/* 保留所有2000+字的教育内容 */}
        </div>
      </section>
    </div>
  </>
);
```

---

#### ❌ 错误做法

**错误1：硬编码 URL**
```typescript
// ❌ 禁止！
"url": "https://aicalculator.pro/mortgage-calculator"
"canonical": "https://aicalculator.pro/mortgage-calculator"
```

**错误2：删除或简化内容**
```typescript
// ❌ 禁止！删除FAQ
faqs: [
  { question: '...', answer: '简短答案' },  // 只有3个FAQ
]

// ❌ 禁止！删除教育内容
// 删除了300-500行的教育内容

// ❌ 禁止！精简关键词
keywords: ['mortgage', 'loan']  // 只有2个关键词
```

---

#### 📁 配置文件说明

**`config/site.ts` - 网站核心配置**
- 从 `.env.production` 读取域名：`NEXT_PUBLIC_SITE_URL`
- 提供辅助函数：
  - `getUrl(path)` - 生成完整URL
  - `getOgImage(name)` - 生成OG图片URL
  - `getBreadcrumbId(path)` - 生成面包屑Schema ID
  - `getWebAppId(path)` - 生成WebApp Schema ID
  - `getFaqId(path)` - 生成FAQ Schema ID
  - `getHowToId(path)` - 生成HowTo Schema ID
  - `getArticleId(path)` - 生成Article Schema ID
  - `getStepUrl(path, step)` - 生成步骤URL

---

#### 🎯 修复现有页面的规范

**必须遵守：**
1. ✅ 只导入 `config/site.ts` 的辅助函数
2. ✅ 只替换硬编码URL（约20-30处）
3. ✅ 保留所有 metadata 配置（title, description, keywords等）
4. ✅ 保留所有 JSON-LD Schema 内容
5. ✅ 保留所有8-10个详细FAQ（每个100-200字）
6. ✅ 保留所有6-8个详细HowTo步骤
7. ✅ 保留所有教育内容（300-500行，2000+字）
8. ❌ 禁止删除任何SEO内容
9. ❌ 禁止精简任何FAQ或关键词
10. ❌ 禁止使用生成器重写页面

**检查清单：**
- [ ] 导入了 `config/site.ts` 的辅助函数
- [ ] 替换了所有硬编码URL（20-30处）
- [ ] 保留了所有20+个关键词
- [ ] 保留了所有8-10个详细FAQ
- [ ] 保留了所有6-8个详细HowTo步骤
- [ ] 保留了所有教育内容（300-500行）
- [ ] 文件行数基本不变（600-800行）
- [ ] 没有使用任何生成器
- [ ] 代码中不包含 `https://aicalculator.pro` 字符串

**修改统计（正确的）：**
- 新增：1行 import
- 修改：20-30处URL
- 删除：0行
- 保留：600-800行原有内容

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Charts**: Recharts
- **AI Integration**: OpenAI API (placeholder implementation)
- **Analytics**: Vercel Analytics + Google Analytics 4

### Application Structure

#### Directory Layout
```
app/                    # Next.js App Router
├── api/               # API routes
│   ├── health/        # Health check endpoint
│   ├── ai/            # AI analysis endpoints
│   └── exchange-rates/ # Currency conversion API
├── [calculator]/      # Dynamic calculator pages
│   └── page.tsx       # Individual calculator pages with SEO
├── globals.css        # Global styles
├── layout.tsx         # Root layout with comprehensive SEO
└── page.tsx           # Homepage

components/
├── Calculator/        # All calculator components (80+ files)
│   └── [Name]Calculator.tsx
├── ui/                # shadcn/ui components
├── Header.tsx         # Site navigation
├── Footer.tsx         # Site footer
├── SmartSearch.tsx    # Enhanced search with keyword matching
├── CalculatorList.tsx # Calculator listing
└── ShareModal.tsx     # Social sharing component

lib/
├── calculatorData.ts  # Central calculator database with keywords
├── utils.ts           # Helper functions (formatting, calculations)
├── types.ts           # TypeScript type definitions
├── mathParser.ts      # Mathematical expression parsing
└── analytics.ts       # Analytics helpers
```

### Calculator Component Pattern

Each calculator follows this consistent architecture:

1. **Component Structure** (`components/Calculator/[Name]Calculator.tsx`):
   - Input validation with TypeScript
   - Real-time calculation using React hooks
   - Export functionality (Save as Image, Print, Share)
   - URL parameter support for sharing calculations
   - Responsive design with Tailwind CSS

2. **Page Structure** (`app/[calculator]/page.tsx`):
   - Comprehensive SEO metadata
   - **Hidden H1 tag with `sr-only` class** (SEO-visible, user-invisible)
   - Structured data (JSON-LD) for search engines
   - Educational content section
   - FAQ section with schema.org markup
   - Related calculators links

3. **Data Management**:
   - Calculator registry in `lib/calculatorData.ts`
   - Keywords for smart search functionality
   - Category organization (Financial, Health, Math, Academic, Utility)

### Key Configuration Files

#### next.config.js
- **Build Optimization**: Ignores TypeScript/ESLint errors during builds
- **Image Optimization**: WebP/AVIF formats, external image domains
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Environment Variables**: Comprehensive setup for analytics and deployment

#### Tailwind Configuration
- **Dark Mode**: Class-based dark mode support
- **shadcn/ui**: Proper integration with custom theme
- **Animations**: Extended animations and transitions

### Development Patterns

#### Adding New Calculators
1. Create component: `components/Calculator/[Name]Calculator.tsx`
2. Create page: `app/[calculator]/page.tsx` with SEO optimization
3. Add to calculator registry: `lib/calculatorData.ts`
4. Update navigation: `app/calculators/page.tsx` and `app/[category]/page.tsx`

#### Google SEO Requirements (严格的Google SEO优化标准) ⭐ **100分满分标准**

Every calculator page must include:

**基础SEO优化 (必需):**
- **标题标签**: 主要关键词 + 功能优势 + 品牌名 (50-60字符)
- **元描述**: 行动导向描述 + 目标关键词 (150-160字符)
- **关键词**: 20+个高价值关键词，包括长尾关键词
- **规范URL**: 设置正确的canonical链接
- **Authors/Creator/Publisher**: 完整的作者信息
- **Robots配置**: 正确的索引和爬取指令

**结构化数据 Schema.org (必需 - 5个核心Schema):**

1. ✅ **WebApplication Schema** (必需)
   - 描述计算器应用本身
   - 包含 featureList（功能列表）
   - 包含 Offer（免费价格）
   - 包含 applicationCategory

2. ✅ **BreadcrumbList Schema** (必需)
   - 三层级结构：Home / Category / Calculator
   - 同时包含 JSON-LD 和 HTML 标记
   - 正确的 position 顺序

3. ✅ **FAQPage Schema** (必需)
   - 5-6个高质量问题和答案（不超过8个）
   - 每个问题都是用户真实搜索的关键词
   - 答案简洁且有价值（150-200字）
   - FAQ总字数控制在800-1,000字以内
   - 原则：直接回答问题，不堆砌内容

4. ✅ **HowTo Schema** (必需 - 提升CTR 10-20%)
   - 描述如何使用计算器的步骤
   - 6-8个清晰的步骤
   - 每个步骤包含 position, name, text, url
   - 包含 totalTime（如 "PT5M" = 5分钟）
   - 包含 tool 和 estimatedCost

5. ✅ **Article Schema** (必需 - 提升内容权威性)
   - 标记教育性内容为高质量文章
   - 包含 headline, description, author, publisher
   - 包含 datePublished 和 dateModified
   - 包含 image 和 articleBody

**可选但推荐的Schema:**
- **AggregateRating Schema**: 如果有用户评分（提升CTR 15-25%）
- **VideoObject Schema**: 如果有视频教程（提升CTR 20-30%）

**内容质量标准:**
- **教育内容**: 每页2000+字的原创有价值内容
- **FAQ部分**: 包含schema.org标记的5-6个常见问题（总字数800-1,000字）
- **内部链接**: 4-8个相关计算器链接（详见"内链和外链规范"）
- **外部链接**: 3-5个权威网站链接（详见"内链和外链规范"）
- **E-E-A-T**: 展示专业性、经验、权威性、可信度
- **实际案例**: 包含计算示例和真实场景
- **对比表格**: 使用表格对比不同选项
- **策略建议**: 提供可操作的建议

**技术SEO:**
- **页面速度**: 移动端加载时间<2.5秒 (Core Web Vitals)
- **移动SEO**: 响应式设计，触摸友好元素
- **图像优化**: WebP/AVIF格式，alt标签，合适尺寸
- **语义HTML**: 正确的H标签层次结构（H1 → H2 → H3 → H4）
- **面包屑导航**: 三层级结构化面包屑导航
- **Open Graph**: 完整的OG标签（title, description, url, images）
- **Twitter Cards**: summary_large_image 类型

**SEO最佳实践:**
- **H1标签**: 使用 `sr-only` 类隐藏，SEO可见但用户不可见
- **H2-H6层级**: 清晰的内容层次结构
- **内容更新**: 定期更新内容保持新鲜度
- **本地SEO**: 如果适用，包含本地化信息
- **社交媒体**: Open Graph和Twitter Card优化

**SEO评分标准:**
- **92-95分**: 优秀（缺少1-2个可选Schema）
- **96-99分**: 卓越（所有必需Schema完整）
- **100分**: 完美（包含所有Schema + 用户评分 + 视频）

#### SEO + UX 平衡设计规范 ⭐ **核心设计理念**

**问题：** 如何在满足SEO要求的同时，保持用户界面简洁？

**解决方案：** 使用 `sr-only` 类隐藏H1标签

**设计原则：**
1. ✅ **SEO需要H1** - Google要求每个页面有唯一的H1标签
2. ✅ **用户不需要看到** - 用户点进计算器就是要用，不需要再看标题
3. ✅ **保持界面简洁** - 避免冗余信息占据屏幕空间

**实现方法：**

```tsx
// app/[calculator]/page.tsx

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 结构化数据 */}
      <script type="application/ld+json" {...} />
      
      {/* ✅ 隐藏的H1标签 - SEO可见，用户不可见 */}
      <h1 className="sr-only">
        Calculator Name - Complete SEO-Friendly Title with Keywords
      </h1>
      
      {/* 计算器组件 - 用户直接看到这个 */}
      <CalculatorComponent />
      
      {/* 教育内容 */}
      <section>...</section>
    </div>
  );
}
```

**Tailwind CSS 的 `sr-only` 类定义：**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**效果对比：**

| 方面 | 效果 |
|------|------|
| **Google爬虫** | ✅ 能看到H1标签 |
| **用户视觉** | ✅ 完全看不到H1 |
| **屏幕阅读器** | ✅ 能读取H1（无障碍） |
| **屏幕空间** | ✅ 不占据任何空间 |
| **SEO评分** | ✅ 满分 |
| **用户体验** | ✅ 界面简洁 |

**❌ 禁止的做法：**

```tsx
// ❌ 错误1：在计算器组件内添加可见的标题框
export function CalculatorComponent() {
  return (
    <div>
      {/* ❌ 禁止！占据空间，信息冗余 */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Calculator Name</h2>
        <p>Calculate your...</p>
      </div>
      {/* 计算器内容 */}
    </div>
  );
}

// ❌ 错误2：使用 display:none 隐藏H1（SEO可能被忽略）
<h1 style={{ display: 'none' }}>Calculator Name</h1>

// ❌ 错误3：完全不使用H1标签
// 缺少H1会降低SEO评分
```

**✅ 正确做法：**

```tsx
// ✅ 页面文件：使用 sr-only 隐藏H1
export default function CalculatorPage() {
  return (
    <div>
      <h1 className="sr-only">SEO Title</h1>
      <CalculatorComponent />
    </div>
  );
}

// ✅ 组件文件：直接开始计算器内容，不添加标题
export function CalculatorComponent() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 直接开始输入区域 */}
      <Card>
        <CardHeader>
          <CardTitle>Input Section</CardTitle>
        </CardHeader>
        {/* ... */}
      </Card>
    </div>
  );
}
```

**为什么不能用其他隐藏方法？**

| 方法 | SEO效果 | 推荐度 | 原因 |
|------|---------|--------|------|
| `sr-only` | ✅ 完美 | ⭐⭐⭐⭐⭐ | Google官方认可，专为屏幕阅读器设计 |
| `display: none` | ❌ 可能被忽略 | ❌ 不推荐 | Google可能认为是隐藏内容作弊 |
| `visibility: hidden` | ⚠️ 可疑 | ❌ 不推荐 | 可能被视为试图操纵SEO |
| `opacity: 0` | ⚠️ 可疑 | ❌ 不推荐 | 仍占据空间，可能被标记 |
| `text-indent: -9999px` | ⚠️ 过时 | ❌ 不推荐 | 老方法，现代SEO不推荐 |

**检查清单：**
- [ ] 每个计算器页面都有唯一的H1标签
- [ ] H1标签使用 `sr-only` 类隐藏
- [ ] H1标签包含主要关键词
- [ ] 计算器组件内不添加可见的标题框
- [ ] 界面简洁，直接展示计算器功能

#### FAQ撰写规范 ⭐ **核心原则：简洁 > 详细**

**问题：** 工具站的FAQ应该多长？是否越详细越好？

**答案：** 不是！根据Google对工具站的建议：
- ✅ **高价值、问题导向、非废话** - 直接回答问题
- ✅ **避免自动生成的大段文字** - 过长内容会被判定为低质量
- ✅ **总字数控制** - 每页FAQ不超过800-1,000字
- ✅ **拆分策略** - 复杂主题拆成独立文章（如 `/blog/what-is-apr`）

**设计原则：**
1. ✅ **高价值** - 回答用户真实搜索的问题
2. ✅ **问题导向** - 直接回答，不绕弯子
3. ✅ **简洁明了** - 150-200字足够，不要堆砌
4. ✅ **总量控制** - 5-6个FAQ，总字数800-1,000字
5. ✅ **避免部署错误** - 超长文本可能导致解析失败

**撰写标准：**

| 项目 | 标准 | 说明 |
|------|------|------|
| **数量** | 5-6个 | 最多不超过8个 |
| **每个长度** | 150-200字 | 简洁有力，不拖沓 |
| **总字数** | 800-1,000字 | 6个×150字=900字（理想） |
| **问题类型** | 用户真实搜索 | 不要自己编造问题 |
| **答案风格** | 直接回答 | 不要长篇大论 |

**实现示例：**

**✅ 好的FAQ（简洁有力）：**
```tsx
{
  '@type': 'Question',
  name: 'How is property tax calculated?',
  acceptedAnswer: {
    '@type': 'Answer',
    text: 'Property tax is calculated using the formula: Assessed Value × Tax Rate. The assessed value is typically a percentage of your home\'s market value (e.g., 80-100%), set by your local assessor. The tax rate is expressed as a percentage or per $1,000 of assessed value. For example, a $400,000 home with 100% assessment ratio and 1.2% tax rate would pay $4,800 annually ($400,000 × 1.2% = $4,800). Rates vary significantly by location, from 0.3% in Hawaii to 2.5% in New Jersey. Visit your county assessor\'s website for local rates.'
    // ✅ 约180字 - 简洁、有数据、有示例、有来源
  }
}
```

**❌ 不好的FAQ（过于详细）：**
```tsx
{
  '@type': 'Question',
  name: 'How is property tax calculated?',
  acceptedAnswer: {
    '@type': 'Answer',
    text: 'Property tax calculation is a complex process that involves multiple steps and considerations. First, your local county assessor determines your property\'s market value through various methods including comparable sales analysis, cost approach, and income approach if applicable. The comparable sales approach looks at recent sales of similar properties in your area, adjusting for differences in size, condition, location, and features. The cost approach estimates what it would cost to rebuild your property from scratch, then subtracts depreciation. The income approach is used primarily for investment properties and calculates value based on rental income potential. Once the market value is determined, the assessor applies an assessment ratio, which is a percentage set by state law that can range from as low as 10% in some states to 100% in others. This assessment ratio is intended to standardize property valuations across different jurisdictions...'
    // ❌ 超过500字 - 太长了！像在写论文！可能导致部署错误！
  }
}
```

**FAQ结构模板：**

每个计算器页面应包含以下结构：

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // ... 其他 Schema
    {
      '@type': 'FAQPage',
      '@id': getFaqId('/calculator-name'),
      mainEntity: [
        // ✅ FAQ 1: 核心功能问题（150-200字）
        {
          '@type': 'Question',
          name: 'What is [Calculator Name] and how does it work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '简洁解释计算器功能、工作原理、适用场景。包含关键公式或逻辑。约150-200字。'
          }
        },
        // ✅ FAQ 2: 使用方法问题（150-200字）
        {
          '@type': 'Question',
          name: 'How do I use the [Calculator Name]?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '简洁的使用步骤：1) 输入X 2) 选择Y 3) 点击计算 4) 查看结果。约150-200字。'
          }
        },
        // ✅ FAQ 3: 关键概念解释（150-200字）
        {
          '@type': 'Question',
          name: 'What is [Key Concept] and why is it important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '解释关键概念、重要性、影响因素。包含简单示例。约150-200字。'
          }
        },
        // ✅ FAQ 4: 实际应用场景（150-200字）
        {
          '@type': 'Question',
          name: 'When should I use [Calculator Name]?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '适用场景、最佳实践、常见用例。约150-200字。'
          }
        },
        // ✅ FAQ 5: 结果解读问题（150-200字）
        {
          '@type': 'Question',
          name: 'How do I interpret the results?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '如何理解结果、什么是好/坏结果、下一步行动建议。约150-200字。'
          }
        },
        // ✅ FAQ 6: 权威来源或延伸（150-200字，可选）
        {
          '@type': 'Question',
          name: 'Where can I find more information?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '提供权威网站链接（.gov, .edu）、相关工具推荐、延伸阅读。约150-200字。'
          }
        }
      ]
    }
  ]
};
```

**检查清单：**
- [ ] FAQ数量：5-6个（不超过8个）
- [ ] 每个FAQ：150-200字（不超过250字）
- [ ] 总字数：800-1,000字（不超过1,200字）
- [ ] 直接回答问题，不绕弯子
- [ ] 没有超长段落（避免部署解析错误）
- [ ] 包含必要的数据和示例
- [ ] 包含权威来源链接（如适用）
- [ ] 问题是用户真实搜索的关键词
- [ ] 答案简洁有力，不像AI生成的堆砌内容

**常见错误（必须避免）：**

```tsx
// ❌ 错误1：FAQ过多
mainEntity: [
  // 12个FAQ... 太多了！
]

// ❌ 错误2：单个FAQ过长
text: '超过500字的长篇大论...' // 部署可能失败！

// ❌ 错误3：总字数超标
// 10个FAQ × 300字 = 3,000字 // 远超1,000字限制！

// ❌ 错误4：像在写论文
text: 'First, we need to understand the historical context of property taxation dating back to ancient civilizations...' // 不要这样！

// ❌ 错误5：没有实际价值
name: 'What color is the calculate button?' // 无意义问题
```

**SEO效果对比：**

| 方面 | 8-10个FAQ (长) | 5-6个FAQ (简洁) |
|------|---------------|----------------|
| **总字数** | 1,600-2,000字 | 800-1,000字 |
| **Google评价** | ⚠️ 疑似堆砌 | ✅ 高质量 |
| **用户体验** | ⚠️ 信息过载 | ✅ 快速找到答案 |
| **部署稳定性** | ⚠️ 可能解析失败 | ✅ 稳定 |
| **维护成本** | ⚠️ 高 | ✅ 低 |
| **SEO效果** | ⚠️ 一般 | ✅ 优秀 |

#### 计算器输入字段设计规范 ⭐ **核心原则：透明度 > 简洁性**

**问题：** 计算器输入字段太多，用户一进来就看到很多字段，会不会信息过载？

**解决方案：** 全部显示，清晰标注必填/可选，使用合理默认值

**设计原则：**
1. ✅ **透明度优先** - 显示所有参与计算的字段，用户知道用了什么参数
2. ✅ **清晰标注** - 明确标记哪些必填、哪些可选（带默认值）
3. ✅ **合理默认值** - 可选字段都有智能默认值，不填也能计算
4. ✅ **不隐藏信息** - 避免用户不知道背后用了什么参数导致误解

**实现模式：**

```tsx
// components/Calculator/ExampleCalculator.tsx

export default function ExampleCalculator() {
  const [inputs, setInputs] = useState({
    // 必填字段 - 用户必须填写
    homePrice: '',
    downPayment: '',
    
    // 可选字段 - 有合理默认值，用户可以不改
    assessmentRatio: '100',
    customTaxRate: '',
    yearsToProject: '10',
    additionalCosts: '0',
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 输入区域 */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* ✅ 所有字段都显示在一个卡片中 */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle>Calculator Inputs</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* 必填字段 */}
              <div className="space-y-2">
                <Label htmlFor="homePrice" className="text-sm font-medium">
                  Home Price <span className="text-red-500">*</span>
                </Label>
                <input
                  id="homePrice"
                  type="number"
                  value={inputs.homePrice}
                  onChange={(e) => handleInputChange('homePrice', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="400000"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="downPayment" className="text-sm font-medium">
                  Down Payment <span className="text-red-500">*</span>
                </Label>
                <input
                  id="downPayment"
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => handleInputChange('downPayment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="20"
                  required
                />
              </div>
              
              {/* 可选字段 - 带提示说明 */}
              <div className="space-y-2">
                <Label htmlFor="assessmentRatio" className="text-sm font-medium">
                  Assessment Ratio (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="assessmentRatio"
                  type="number"
                  value={inputs.assessmentRatio}
                  onChange={(e) => handleInputChange('assessmentRatio', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="100"
                />
                <p className="text-xs text-gray-500">Default: 100% (full home value)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customTaxRate" className="text-sm font-medium">
                  Custom Tax Rate (%) <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="customTaxRate"
                  type="number"
                  value={inputs.customTaxRate}
                  onChange={(e) => handleInputChange('customTaxRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Leave blank to use state average"
                />
                <p className="text-xs text-gray-500">Leave blank to use state average rate</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsToProject" className="text-sm font-medium">
                  Years to Project <span className="text-gray-500 text-xs">- Optional</span>
                </Label>
                <input
                  id="yearsToProject"
                  type="number"
                  value={inputs.yearsToProject}
                  onChange={(e) => handleInputChange('yearsToProject', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="10"
                  min="1"
                  max="30"
                />
                <p className="text-xs text-gray-500">Default: 10 years</p>
              </div>
            </CardContent>
          </Card>
          
          {/* ⭐ 计算按钮 - 在所有字段后面 */}
          <Button 
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 min-h-[44px] shadow-lg"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate
          </Button>
        </div>
        
        {/* 结果区域 */}
        <div className="xl:col-span-2">
          {/* 结果显示 */}
        </div>
      </div>
    </div>
  );
}
```

**字段标注规范：**

1. **必填字段**：使用红色星号 `<span className="text-red-500">*</span>`
2. **可选字段**：使用灰色提示 `<span className="text-gray-500 text-xs">- Optional</span>`
3. **字段说明**：在输入框下方添加小字提示说明默认值或用途

**示例对比：**

```tsx
// ❌ 错误：没有标注，用户不知道哪些必填
<Label>Home Price</Label>
<input type="number" placeholder="400000" />

// ✅ 正确：清楚标注必填
<Label>
  Home Price <span className="text-red-500">*</span>
</Label>
<input type="number" placeholder="400000" required />

// ✅ 正确：清楚标注可选，并说明默认值
<Label>
  Assessment Ratio (%) <span className="text-gray-500 text-xs">- Optional</span>
</Label>
<input type="number" value="100" placeholder="100" />
<p className="text-xs text-gray-500">Default: 100% (full home value)</p>
```

**检查清单：**
- [ ] 所有参与计算的字段都显示出来
- [ ] 必填字段用红色星号标注
- [ ] 可选字段用灰色"Optional"标注
- [ ] 每个可选字段都有合理的默认值
- [ ] 每个字段下方有说明文字解释默认值或用途
- [ ] **计算按钮在所有输入字段的最底部**
- [ ] 字段按逻辑分组（可以用多个Card分组，但都显示）
- [ ] 移动端友好（所有字段都能清晰看到）

**不要做的事情：**
- ❌ 隐藏任何参与计算的字段
- ❌ 没有标注哪些必填哪些可选
- ❌ 可选字段没有默认值
- ❌ 没有说明默认值是什么
- ❌ 用户不知道计算时用了什么参数

**好处：**
- ✅ 完全透明（用户知道所有参数）
- ✅ 避免误导（不会因为隐藏参数导致计算不准）
- ✅ 用户掌控（可以自由调整任何参数）
- ✅ 建立信任（不隐瞒任何计算逻辑）
- ✅ 符合财务工具高透明度要求

#### 面包屑导航规范 ⭐ **SEO必需！三层级结构**

**问题：** 为什么面包屑导航如此重要？

**答案：** 面包屑导航是SEO的关键因素之一：
1. ✅ **帮助Google理解网站结构** - 层级关系清晰
2. ✅ **提升用户体验** - 用户知道当前位置，可以快速返回
3. ✅ **增加内部链接** - 提升页面权重
4. ✅ **显示在搜索结果中** - Google会在搜索结果中显示面包屑
5. ✅ **降低跳出率** - 用户更容易导航

**必需的三层级结构：**

```
Home / Category / Calculator Name
  ↓       ↓            ↓
首页   分类页面    当前计算器
```

**完整实现代码：**

```tsx
// app/[calculator]/page.tsx

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 结构化数据 */}
      <script type="application/ld+json" {...} />
      
      {/* 隐藏的H1 */}
      <h1 className="sr-only">Calculator Name</h1>
      
      {/* ✅ 面包屑导航（必需！） */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm text-gray-600" 
              itemScope itemType="https://schema.org/BreadcrumbList">
            {/* 第1层：Home */}
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Home</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400">/</li>
            
            {/* 第2层：Category */}
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/financial" itemProp="item" className="hover:text-blue-600 transition-colors">
                <span itemProp="name">Financial</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400">/</li>
            
            {/* 第3层：Current Calculator */}
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-semibold">
                Home Affordability Calculator
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* 计算器组件 */}
      <CalculatorComponent />
    </div>
  );
}
```

**分类映射规范（严格遵守）：**

| 分类名称 | URL路径 | 包含的计算器示例 |
|---------|---------|-----------------|
| **Financial** | `/financial` | Mortgage, Loan, Tax, Interest, Savings, Investment |
| **Health & Fitness** | `/health-fitness` | BMI, Calorie, TDEE, Body Fat, Protein, Macro |
| **Math & Numbers** | `/math-numbers` | Percentage, Average, Fraction, Scientific |
| **Date & Time** | `/date-time` | Age, Date, Time |
| **Other** | `/other` | Tip, Unit Converter, Square Footage |

**⚠️ 常见错误（必须避免）：**

```tsx
// ❌ 错误1：使用错误的分类路径
<a href="/financial-calculators">  // 错误！
<a href="/financial">               // ✅ 正确

// ❌ 错误2：缺少 Schema.org 标记
<ol className="flex items-center">  // 错误！缺少 itemScope
<ol itemScope itemType="https://schema.org/BreadcrumbList">  // ✅ 正确

// ❌ 错误3：只有两层级
Home / Calculator Name  // 错误！缺少分类层
Home / Category / Calculator Name  // ✅ 正确

// ❌ 错误4：当前页面使用链接
<a href="/current-calculator">Current Calculator</a>  // 错误！
<span>Current Calculator</span>  // ✅ 正确（当前页不应该是链接）
```

**结构化数据（JSON-LD）：**

必须在页面中同时包含 BreadcrumbList Schema：

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // ... 其他 Schema
    {
      "@type": "BreadcrumbList",
      "@id": "https://aicalculator.pro/home-affordability-calculator#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://aicalculator.pro"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Financial",
          "item": "https://aicalculator.pro/financial"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Home Affordability Calculator",
          "item": "https://aicalculator.pro/home-affordability-calculator"
        }
      ]
    }
  ]
};
```

**样式规范：**

```tsx
// 容器样式
className="bg-white border-b border-gray-200"  // 白色背景，底部边框

// 内容区域
className="container mx-auto px-4 py-3"  // 居中，适当内边距

// 列表样式
className="flex items-center space-x-2 text-sm text-gray-600"  // 横向排列

// 链接样式
className="hover:text-blue-600 transition-colors"  // 悬停变蓝

// 分隔符
className="text-gray-400"  // 灰色斜杠

// 当前页样式
className="text-gray-900 font-semibold"  // 深色加粗
```

**响应式设计：**

```tsx
// 移动端优化
<nav className="bg-white border-b border-gray-200">
  <div className="container mx-auto px-4 py-3">
    <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
      {/* 面包屑项目 */}
    </ol>
  </div>
</nav>

// 关键点：
// - text-xs sm:text-sm - 移动端更小字体
// - overflow-x-auto - 长面包屑可以横向滚动
// - space-x-2 - 适当间距
```

**SEO效果：**

| 方面 | 无面包屑 | 有面包屑 |
|------|---------|---------|
| **Google理解结构** | ⚠️ 困难 | ✅ 清晰 |
| **搜索结果显示** | ❌ 无 | ✅ 显示面包屑 |
| **用户体验** | ⚠️ 一般 | ✅ 优秀 |
| **内部链接** | ❌ 少 | ✅ 多 |
| **SEO评分** | 85/100 | 100/100 |

**检查清单：**
- [ ] 每个计算器页面都有面包屑导航
- [ ] 使用三层级结构（Home / Category / Calculator）
- [ ] 分类路径正确（如 `/financial` 而非 `/financial-calculators`）
- [ ] 包含 Schema.org 标记（itemScope, itemType, itemProp）
- [ ] 包含 BreadcrumbList JSON-LD 结构化数据
- [ ] 当前页面不是链接（使用 span 而非 a）
- [ ] 响应式设计（移动端友好）
- [ ] 样式统一（白色背景，底部边框）

**测试验证：**
1. ✅ 访问计算器页面，能看到面包屑
2. ✅ 点击 "Home" 能返回首页
3. ✅ 点击分类名能进入分类页面
4. ✅ 当前计算器名称不可点击
5. ✅ 使用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证结构化数据
6. ✅ 移动端显示正常

#### 内链和外链规范 ⭐ **SEO关键！提升权威性和用户体验**

**问题：** 为什么内链和外链如此重要？

**答案：** 内链和外链是SEO的核心要素：

**外部链接（Outbound Links）的价值：**
1. ✅ **提升可信度** - 链接到权威网站（.gov, .edu）显示内容有依据
2. ✅ **提升E-E-A-T评分** - Google重视专业性、权威性、可信度
3. ✅ **上下文相关性** - 显示你的内容与主题高度相关
4. ✅ **用户价值** - 提供额外资源，提升用户体验
5. ✅ **降低跳出率** - 用户找到更多有价值的信息

**内部链接（Internal Links）的价值：**
1. ✅ **分散PageRank** - 将页面权重传递给其他页面
2. ✅ **降低跳出率** - 用户浏览更多页面，增加会话时长
3. ✅ **增加页面深度** - 帮助Google发现和索引新页面
4. ✅ **改善用户体验** - 相关推荐，满足用户延伸需求
5. ✅ **建立主题集群** - 显示网站内容结构，提升主题权威

---

### 外链规范

**选择原则（根据页面主题动态选择）：**

1. **优先链接权威网站：**
   - ✅ **政府网站** (.gov) - IRS.gov, SSA.gov, Treasury.gov, 各州政府网站
   - ✅ **教育机构** (.edu) - 大学研究、学术论文
   - ✅ **权威金融机构** - Federal Reserve, World Bank, IMF
   - ✅ **行业协会** - AICPA, CFA Institute
   - ✅ **专业媒体** - Investopedia, NerdWallet（谨慎使用）

2. **按主题选择相关外链：**
   - **税务类计算器** → IRS.gov 相关税法页面、州税务局网站
   - **社保类计算器** → SSA.gov 官方资源
   - **房产类计算器** → HUD.gov, Fannie Mae, Freddie Mac
   - **投资类计算器** → SEC.gov, FINRA.org
   - **健康类计算器** → CDC.gov, NIH.gov, WHO.int

3. **外链最佳实践：**
   - ✅ 每页3-5个高质量外链（不要太多）
   - ✅ 自然融入教育内容中（不要生硬堆砌）
   - ✅ 使用描述性锚文本（如"IRS资本利得税指南"而非"点击这里"）
   - ✅ 添加 `rel="noopener noreferrer"` 保护安全
   - ✅ 在新标签打开 `target="_blank"`
   - ❌ 不链接到竞争对手网站
   - ❌ 不链接到低质量、垃圾网站

**外链示例代码：**

```tsx
<p className="text-gray-700 mb-4">
  For official capital gains tax rates and regulations, visit the{' '}
  <a 
    href="https://www.irs.gov/taxtopics/tc409" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 underline"
  >
    IRS Capital Gains Tax Guide
  </a>
  {' '}for the most up-to-date information.
</p>
```

**外链放置位置：**
- ✅ 教育内容中相关段落
- ✅ FAQ答案中提供官方资源
- ✅ "参考资源"或"延伸阅读"章节

---

### 内链规范

**选择原则（根据页面主题动态选择）：**

1. **链接到真正相关的计算器：**
   - ✅ **功能相关** - 用户可能需要的下一步工具
   - ✅ **主题相关** - 同一类别或相关类别的计算器
   - ✅ **流程相关** - 用户决策流程中的前后步骤

2. **按主题选择相关内链示例：**

**Capital Gains Tax Calculator 应该链接到：**
- Investment Calculator（投资回报）
- ROI Calculator（投资收益率）
- Retirement Calculator（退休规划）
- Tax Calculator（综合税务）
- Inflation Calculator（通胀影响）

**Property Tax Calculator 应该链接到：**
- Mortgage Calculator（房贷计算）
- Home Affordability Calculator（购房能力）
- Rent Calculator（租vs买对比）
- Home Loan Calculator（房屋贷款）
- Refinance Calculator（再融资）

**Take-Home Paycheck Calculator 应该链接到：**
- Salary Calculator（薪资计算）
- Tax Calculator（税务计算）
- 401k Calculator（退休储蓄）
- Budget Calculator（预算规划）
- Savings Calculator（储蓄计划）

3. **内链最佳实践：**
   - ✅ 每页4-8个相关计算器链接
   - ✅ 使用描述性锚文本（如"Mortgage Calculator"而非"这里"）
   - ✅ 自然融入内容（不要生硬列表）
   - ✅ 在教育内容中提及时添加链接
   - ✅ 在页面底部添加"相关计算器"章节
   - ❌ 不要链接不相关的计算器
   - ❌ 不要过度链接（每个计算器只链接1次）

**内链示例代码：**

**方式1：教育内容中自然提及**
```tsx
<p className="text-gray-700 mb-4">
  Before calculating capital gains tax, you may want to use our{' '}
  <a href="/roi-calculator" className="text-blue-600 hover:text-blue-800 underline">
    ROI Calculator
  </a>
  {' '}to determine your investment's total return.
</p>
```

**方式2：页面底部"相关计算器"章节**
```tsx
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Calculators</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <a 
      href="/investment-calculator" 
      className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="text-3xl mb-2">📊</div>
      <h3 className="font-semibold text-gray-900">Investment Calculator</h3>
      <p className="text-sm text-gray-600 mt-1">Calculate investment returns and growth</p>
    </a>
    
    <a 
      href="/roi-calculator" 
      className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="text-3xl mb-2">📈</div>
      <h3 className="font-semibold text-gray-900">ROI Calculator</h3>
      <p className="text-sm text-gray-600 mt-1">Measure return on investment percentage</p>
    </a>
    
    {/* 更多相关计算器... */}
  </div>
</section>
```

**内链放置位置：**
- ✅ 教育内容中自然提及时
- ✅ FAQ答案中推荐相关工具
- ✅ 页面底部"相关计算器"章节（必需）
- ✅ 计算结果后的"下一步推荐"

---

**检查清单：**
- [ ] 每页包含3-5个权威网站外链
- [ ] 外链主题相关（如税务计算器链接到IRS.gov）
- [ ] 外链使用 `rel="noopener noreferrer"` 和 `target="_blank"`
- [ ] 每页包含4-8个相关计算器内链
- [ ] 内链真正相关（不是随机推荐）
- [ ] 使用描述性锚文本（不用"点击这里"）
- [ ] 页面底部有"相关计算器"章节
- [ ] 链接自然融入内容（不生硬堆砌）

**SEO效果对比：**

| 方面 | 无外链/内链 | 有外链/内链 |
|------|------------|------------|
| **E-E-A-T评分** | ⚠️ 一般 | ✅ 优秀 |
| **用户停留时间** | 2-3分钟 | 5-8分钟 |
| **跳出率** | 70%+ | 40-50% |
| **页面权重** | ⚠️ 孤立 | ✅ 互相加强 |
| **Google排名** | 较低 | 较高 |

#### Mobile-First Development Requirements (移动端优先开发要求)

**移动UI设计标准:**
- **响应式设计**: 使用Tailwind CSS断点，移动端优先 (`sm: 640px`, `lg: 1024px`, `xl: 1280px`)
- **触摸目标**: 最小44x44px的触摸目标，确保移动端可点击
- **字体大小**: 移动端16px+的可读字体大小，标题响应式缩放
- **布局设计**: 移动端单列布局，平板两列，桌面多列
- **输入框**: 大而易于点击的输入框，适当间距，避免过密布局
- **计算结果**: 移动友好的结果显示格式，避免溢出

**移动UX要求:**
- **拇指友好设计**: 重要控件放在拇指易达区域（屏幕上半部分）
- **滑动手势**: 支持表格/图表的水平滑动，避免横向滚动页面
- **屏幕方向**: 支持横竖屏布局，使用 `orientation: landscape` 媒体查询
- **离线考虑**: 优雅处理网络连接问题，提供离线提示
- **性能优化**: 针对移动网络条件优化，减少不必要的网络请求
- **无障碍性**: WCAG 2.1 AA级别的移动无障碍，支持屏幕阅读器

**移动端特定功能:**
- **计算器输入**: 支持小数点的数字键盘，使用 `inputmode="decimal"`
- **复制结果**: 移动端便捷的复制到剪贴板功能，支持 `navigator.clipboard`
- **分享集成**: 原生移动分享功能，使用 Web Share API
- **本地存储**: 移动端便捷的本地保存计算，使用 localStorage
- **渐进增强**: 无JavaScript时核心功能仍可用

**移动端性能优化:**
- **图片优化**: 移动端优化的图片格式和尺寸 (WebP/AVIF)
- **懒加载**: 图片和组件懒加载，使用 `loading="lazy"`
- **缓存策略**: 移动端友好的缓存策略，Service Worker 支持
- **包大小**: 最小化JavaScript包大小，使用动态导入
- **网络优化**: 针对移动网络优化的资源加载

#### 📱 移动端响应式布局最佳实践

**1. 容器布局优化**
```html
<!-- 响应式容器 -->
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<!-- 响应式网格 -->
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  <div className="xl:col-span-1">  <!-- 输入表单 -->
  <div className="xl:col-span-2">  <!-- 结果区域 -->
```

**2. 响应式网格系统**
- **移动端**: `grid-cols-1` 单列布局
- **平板端**: `grid-cols-2` 两列布局 (视情况)
- **桌面端**: `grid-cols-3` 或更多列布局
- **列跨度**: 使用 `xl:col-span-*` 而非 `lg:col-span-*` 以获得更好的控制

**3. 响应式输入字段布局**
```html
<!-- 移动端标签在上，桌面端标签在左 -->
<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
  <label className="text-sm font-medium text-gray-700 sm:w-32 flex items-center sm:flex-shrink-0">
    Field Name
  </label>
  <input className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
</div>
```

**4. 响应式字号处理**
```html
<!-- 响应式标题和数字显示 -->
<h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
  Title Text
</h2>

<!-- 大金额响应式显示 -->
<div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold break-all">
  $1,000,000+
</div>
```

**5. 响应式表格处理**
```html
<!-- 可滚动的表格容器 -->
<div className="overflow-x-auto overflow-y-hidden">
  <table className="w-full min-w-[350px] text-xs sm:text-sm">
    <!-- 表格内容 -->
  </table>
</div>

<!-- 响应式单元格间距 -->
<th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
```

**6. 响应式图表优化**
```html
<!-- Recharts 响应式容器 -->
<ResponsiveContainer width="100%" height={200} minHeight={180}>

<!-- 图表容器间距 -->
<div className="p-4 sm:p-6">
```

**7. 响应式间距和内边距**
```html
<!-- 响应式容器间距 -->
<div className="space-y-3 sm:space-y-4 md:space-y-6">

<!-- 响应式内边距 -->
<div className="p-3 sm:p-4 md:p-6">
```

**8. 响应式按钮和交互元素**
```html
<!-- 移动端友好的按钮 -->
<button className="px-4 py-3 text-sm sm:text-base min-h-[44px] font-medium">
  Action Button
</button>

<!-- 双重保险的链接 -->
<Link
  href="/calculator"
  className="block cursor-pointer"
  onClick={(e) => {
    e.stopPropagation();
    window.location.href = '/calculator';
  }}
>
  Link Content
</Link>
```

#### 🚨 移动端常见问题及解决方案

**1. 数字溢出问题**
```html
<!-- 问题: 大数字在小屏幕上溢出 -->
<div className="text-5xl font-bold">$1,234,567</div>

<!-- 解决: 响应式字号 + 换行 -->
<div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold break-all">
  $1,234,567
</div>
```

**2. 表格水平滚动**
```html
<!-- 问题: 表格在小屏幕上挤压 -->
<table className="w-full text-sm">

<!-- 解决: 水平滚动容器 + 最小宽度 -->
<div className="overflow-x-auto overflow-y-hidden">
  <table className="w-full min-w-[350px] text-xs sm:text-sm">
```

**3. 复杂表单布局**
```html
<!-- 问题: 水平布局在小屏幕上换行 -->
<div className="flex items-center gap-3">
  <label className="w-32">Field:</label>
  <input />

<!-- 解决: 响应式方向切换 -->
<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
  <label className="sm:w-32 sm:flex-shrink-0">Field:</label>
  <input className="w-full" />
```

**4. 图表尺寸适配**
```html
<!-- 问题: 固定高度在小屏幕上过大 -->
<ResponsiveContainer width="100%" height={300}>

<!-- 解决: 响应式高度 + 最小高度 -->
<ResponsiveContainer width="100%" height={200} minHeight={180}>
```

#### 📋 移动端开发检查清单

**必检项目:**
- [ ] 所有文本在最小屏幕 (375px) 上可读
- [ ] 所有按钮 >= 44px 高度 (Apple HIG 标准)
- [ ] 表格可以水平滚动，不会挤压内容
- [ ] 大金额数字使用 `break-all` 防止溢出
- [ ] 输入字段在移动端足够大，易于点击
- [ ] 没有水平页面滚动（除表格外）
- [ ] 图表在小屏幕上正常显示
- [ ] 所有链接和按钮在触摸设备上可点击
- [ ] 在 iPhone SE (375x667) 和 iPad Mini (768x1024) 上测试通过

#### Component Standards
- Use TypeScript interfaces from `lib/types.ts`
- Implement share functionality via `useShare` hook
- Include save/print capabilities with html2canvas
- Follow mobile-first responsive design patterns
- Support keyboard navigation and touch gestures
- Ensure accessibility compliance (WCAG 2.1 AA)

### API Architecture

#### API Routes Pattern
- Located in `app/api/` directory
- Use Zod for request/response validation
- Follow RESTful conventions
- Include proper error handling
- Health check endpoint at `app/api/health/route.ts`

#### AI Integration
- OpenAI API integration ready (placeholder implementation)
- Endpoint structure in `app/api/ai/`
- Multi-language support architecture
- Context-aware calculation analysis

### Environment Setup

Required environment variables (see .env.local.example):
- `OPENAI_API_KEY` - AI analysis functionality
- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO
- `NEXT_PUBLIC_GA_ID` - Google Analytics tracking
- `NEXT_PUBLIC_SUPPORT_EMAIL` - Contact information

### Performance Optimization

- **Image Optimization**: WebP/AVIF formats, CDN domains
- **Code Splitting**: Automatic with Next.js
- **Caching**: Built-in Next.js caching
- **Analytics**: Vercel Analytics for real-time monitoring
- **SEO**: Comprehensive structured data and metadata

### Search System

The smart search functionality uses:
- Keyword matching from `lib/calculatorData.ts`
- Fuzzy search capabilities
- Category-based filtering
- Real-time search results

### Deployment & Performance

- **Platform**: Optimized for Vercel deployment
- **Build Process**: Handles TypeScript/ESLint gracefully
- **Port**: Development runs on 3001, production on standard ports
- **Environment**: Comprehensive environment variable setup
- **Mobile Performance**: Optimized for mobile Core Web Vitals
- **CDN Delivery**: Global content delivery for mobile speed
- **SEO Monitoring**: Built-in Google SEO best practices compliance

**移动端部署优化:**
- **边缘函数**: Vercel Edge Functions提供低延迟移动体验
- **图片优化**: 移动端优先的图片格式和尺寸优化
- **缓存策略**: 针对移动网络的缓存优化
- **性能监控**: 移动端Core Web Vitals实时监控

---

### UI 颜色设计规范 ⭐ **核心原则：专业、统一、克制**

**问题：** 为什么计算器的UI不应该五颜六色？

**答案：** 
1. ✅ **专业性** - 工具站需要传达可信、专业的形象
2. ✅ **可读性** - 过多颜色会分散注意力，降低信息获取效率
3. ✅ **一致性** - 统一的配色方案让用户感到整个网站协调、有序
4. ✅ **品牌形象** - 克制的用色体现品牌的专业度和可靠性

---

#### 推荐配色方案

**主色调：蓝灰色系（Blue-Gray Palette）**

```tsx
// 推荐的 Tailwind CSS 颜色类
const PROFESSIONAL_COLORS = {
  // 主色调 - 蓝色（用于强调、按钮、链接）
  primary: {
    bg: 'bg-blue-600',           // 主要按钮背景
    bgHover: 'bg-blue-700',      // 主要按钮悬停
    text: 'text-blue-600',       // 链接、强调文字
    textHover: 'text-blue-700',  // 链接悬停
    border: 'border-blue-200',   // 边框
    light: 'bg-blue-50',         // 浅色背景
    gradient: 'from-blue-50 to-indigo-50', // 渐变背景
  },
  
  // 中性色 - 灰色（用于文字、边框、背景）
  neutral: {
    text: 'text-gray-900',       // 主要文字
    textSecondary: 'text-gray-600', // 次要文字
    textMuted: 'text-gray-500',  // 辅助文字
    border: 'border-gray-200',   // 边框
    borderStrong: 'border-gray-300', // 强调边框
    bg: 'bg-white',              // 卡片背景
    bgLight: 'bg-gray-50',       // 浅色背景
    bgMedium: 'bg-gray-100',     // 中性背景
  },
  
  // 状态色 - 仅在必要时使用
  status: {
    success: 'bg-green-50 border-green-200 text-green-700', // 成功状态
    warning: 'bg-amber-50 border-amber-200 text-amber-700',  // 警告状态
    error: 'bg-red-50 border-red-200 text-red-700',          // 错误状态
    info: 'bg-blue-50 border-blue-200 text-blue-700',        // 信息提示
  },
};
```

---

#### 设计原则

**1. 主色调统一使用蓝色**
- ✅ 按钮：`bg-blue-600 hover:bg-blue-700`
- ✅ 链接：`text-blue-600 hover:text-blue-800`
- ✅ 强调文字：`text-blue-700`
- ✅ 边框：`border-blue-200`
- ✅ 浅色背景：`bg-blue-50`

**2. 中性色为主体**
- ✅ 文字颜色：`text-gray-900` (主要) / `text-gray-600` (次要) / `text-gray-500` (辅助)
- ✅ 卡片背景：`bg-white`
- ✅ 页面背景：`bg-gray-50` 或 `bg-gradient-to-b from-gray-50 to-white`
- ✅ 边框：`border-gray-200`

**3. 状态色谨慎使用**
- ✅ **仅在必要时使用**：成功、警告、错误、信息提示
- ✅ 使用浅色背景 + 深色文字的组合（如 `bg-green-50 text-green-700`）
- ❌ 避免大面积使用鲜艳的状态色

**4. 避免使用的颜色**
- ❌ 紫色（`purple`）- 除非品牌色
- ❌ 粉色（`pink`）- 不够专业
- ❌ 橙色（`orange`）- 仅用于警告
- ❌ 黄色（`yellow`）- 仅用于高亮提示
- ❌ 多种颜色混用 - 降低专业感

---

#### 实际应用示例

**✅ 正确示例：专业的蓝灰配色**

```tsx
export default function ProfessionalCalculator() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 输入区域 */}
        <div className="xl:col-span-1">
          <Card className="shadow-lg">
            {/* ✅ 统一的蓝色渐变背景 */}
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Calculator Inputs</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* 输入字段 */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Field Name <span className="text-red-500">*</span>
                </Label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter value"
                />
                <p className="text-xs text-gray-500 mt-1">Helper text</p>
              </div>
              
              {/* ✅ 统一的蓝色按钮 */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Calculate
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* 结果区域 */}
        <div className="xl:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Results</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* ✅ 蓝色系结果卡片 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-1">Result Label:</p>
                <p className="text-3xl font-bold text-blue-700">$1,234</p>
              </div>
              
              {/* ✅ 中性灰色信息卡片 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                <p className="text-sm text-gray-700">Explanation text...</p>
              </div>
              
              {/* ✅ 仅在必要时使用状态色 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">✓ Calculation successful</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

**❌ 错误示例：五颜六色的配色**

```tsx
// ❌ 避免这样做！
export default function ColorfulCalculator() {
  return (
    <div>
      {/* ❌ 紫色背景 */}
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
      
      {/* ❌ 橙色按钮 */}
      <Button className="bg-orange-600 hover:bg-orange-700">
      
      {/* ❌ 多种颜色的结果卡片 */}
      <div className="bg-purple-100 border-purple-400">
        <p className="text-purple-700">Result 1</p>
      </div>
      <div className="bg-pink-100 border-pink-400">
        <p className="text-pink-700">Result 2</p>
      </div>
      <div className="bg-orange-100 border-orange-400">
        <p className="text-orange-700">Result 3</p>
      </div>
      <div className="bg-green-100 border-green-400">
        <p className="text-green-700">Result 4</p>
      </div>
      {/* ❌ 太多颜色了！不专业！ */}
    </div>
  );
}
```

---

#### 特殊情况处理

**1. 标签和徽章**
```tsx
// ✅ 使用灰色系为主，蓝色为辅
<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
  Normal Tag
</span>

<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
  Important Tag
</span>
```

**2. 图表和可视化**
```tsx
// ✅ 使用蓝色系渐变
const CHART_COLORS = {
  primary: '#3B82F6',   // blue-500
  secondary: '#60A5FA', // blue-400
  tertiary: '#93C5FD',  // blue-300
  background: '#EFF6FF', // blue-50
};
```

**3. 表格和列表**
```tsx
// ✅ 斑马纹使用灰色
<tr className="even:bg-gray-50 hover:bg-blue-50">
  <td className="px-4 py-3 text-gray-900">...</td>
</tr>
```

---

#### 检查清单

**颜色使用检查：**
- [ ] 主色调统一使用蓝色（`blue-*`）
- [ ] 背景主要使用白色和浅灰色（`white`, `gray-50`）
- [ ] 文字颜色使用灰色系（`gray-900`, `gray-600`, `gray-500`）
- [ ] 按钮统一使用 `bg-blue-600 hover:bg-blue-700`
- [ ] 卡片头部使用 `bg-gradient-to-r from-blue-50 to-indigo-50`
- [ ] 边框主要使用 `border-gray-200` 或 `border-blue-200`
- [ ] 状态色仅在必要时使用（成功、警告、错误）
- [ ] 避免使用紫色、粉色、橙色（除非必要）
- [ ] 没有大面积使用鲜艳颜色
- [ ] 整体配色协调、专业、统一

**反面检查（必须避免）：**
- [ ] 是否使用了超过3种主色？
- [ ] 是否每个卡片都是不同颜色？
- [ ] 是否使用了紫色、粉色等非主色调？
- [ ] 是否颜色过于鲜艳刺眼？
- [ ] 是否缺乏统一的配色方案？

---

#### 颜色对比表

| 用途 | ✅ 推荐 | ❌ 避免 |
|-----|--------|--------|
| **主要按钮** | `bg-blue-600` | `bg-purple-600`, `bg-orange-600` |
| **卡片头部** | `from-blue-50 to-indigo-50` | `from-purple-50 to-pink-50` |
| **结果卡片背景** | `bg-blue-50 border-blue-200` | `bg-purple-100 border-purple-400` |
| **文字颜色** | `text-gray-900`, `text-gray-600` | `text-purple-700`, `text-orange-700` |
| **强调数字** | `text-blue-700` | `text-purple-700`, `text-pink-700` |
| **边框** | `border-gray-200`, `border-blue-200` | `border-purple-300`, `border-orange-300` |
| **成功提示** | `bg-green-50 text-green-700` | `bg-green-500 text-white` (太鲜艳) |

---

#### 实际效果对比

**专业配色的好处：**
- ✅ 用户感觉网站可信、专业
- ✅ 阅读体验舒适，不刺眼
- ✅ 品牌形象统一
- ✅ 符合工具站的定位
- ✅ 降低用户的视觉疲劳

**五颜六色的问题：**
- ❌ 显得不专业、像玩具
- ❌ 分散用户注意力
- ❌ 降低可信度
- ❌ 品牌形象混乱
- ❌ 用户体验差

---

**总结：坚持「蓝灰」配色，拒绝「五颜六色」！**

---

### 分享和导出功能规范 ⭐ **必需！使用统一组件！**

**问题：** 为什么每个计算器都要实现分享和保存图片功能？

**答案：** 
1. ✅ **用户需求** - 用户希望分享计算结果或保存为图片
2. ✅ **标准化** - 使用统一的组件和 Hook，代码更易维护
3. ✅ **代码复用** - 避免每次重复实现相同功能
4. ✅ **功能完整性** - 专业计算器必备的导出功能

---

#### 必需的3个导出功能

**所有计算器必须实现：**
1. ✅ **分享功能** - 使用 `useShare` Hook + `ShareModal` 组件
2. ✅ **保存为图片** - 使用 `html2canvas` 库
3. ✅ **打印功能** - 将结果打印为 PDF

---

#### 完整实现代码

**步骤 1: 导入必要的依赖**

```tsx
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Copy, Share2, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ShareModal } from '@/components/ShareModal';
import { useShare } from '@/hooks/useShare';
```

**步骤 2: 在组件中设置 Hook 和 Ref**

```tsx
export default function YourCalculator() {
  const [inputs, setInputs] = useState({ /* ... */ });
  const [result, setResult] = useState(null);
  
  // ✅ 结果区域的引用（用于保存图片和打印）
  const resultRef = useRef<HTMLDivElement>(null);
  
  // ✅ 分享功能 Hook
  const { showShareModal, shareUrl, shareText, handleShare, closeShareModal } = useShare({
    calculatorPath: '/your-calculator',  // 你的计算器路径
    getShareParams: () => ({
      // 返回URL参数（使用简短字母缩写）
      n: inputs.number?.toString() || '',
      r: inputs.selected?.toString() || '',
      // 只传递必要参数，保持URL简洁
    }),
    getShareText: () => {
      // 返回分享文本（当有结果时显示结果，否则显示默认文本）
      return result 
        ? `My calculation result: ${result.value}`
        : 'Check out this calculator!';
    },
  });

  // ✅ 保存为图片功能
  const handleSaveAsImage = async () => {
    if (!resultRef.current) return;
    
    try {
      // 等待内容渲染完成
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,                    // 高清晰度
        backgroundColor: '#ffffff',   // 白色背景
        logging: false,              // 不输出日志
        useCORS: true,               // 支持跨域图片
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = `calculator-result-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  // ✅ 打印功能
  const handlePrint = async () => {
    if (!resultRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Calculator Results</title>
              <style>
                body { margin: 0; padding: 20px; display: flex; justify-content: center; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { padding: 0; }
                  img { max-width: 100%; page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <img src="${imgData}" onload="window.print();"/>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Failed to print:', error);
      alert('Failed to print. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ... 输入区域 ... */}
      
      {/* ✅ 结果区域 - 添加 ref */}
      <div ref={resultRef}>
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-xl text-gray-900">Results</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {result ? (
              <div className="space-y-4">
                {/* 结果内容 */}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No results yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ✅ 操作按钮区域 */}
      <div className="flex flex-wrap gap-3 justify-center mt-6 print:hidden">
        <Button 
          onClick={handleSaveAsImage} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Download className="h-4 w-4" />
          Save as Image
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="gap-2"
          disabled={!result}
        >
          <Printer className="h-4 w-4" />
          Print Results
        </Button>
        
        <Button 
          onClick={handleShare} 
          variant="outline" 
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Calculator
        </Button>
      </div>

      {/* ✅ 分享模态框 */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={closeShareModal}
        shareUrl={shareUrl}
        shareText={shareText}
        calculatorName="Your Calculator Name"
      />
    </div>
  );
}
```

---

#### 关键要点

**1. resultRef 的使用**
```tsx
// ✅ 正确：包裹整个结果区域
<div ref={resultRef}>
  <Card>
    <CardContent>
      {/* 所有要导出的内容 */}
    </CardContent>
  </Card>
</div>

// ❌ 错误：只包裹部分内容
<Card>
  <div ref={resultRef}>  // 不完整
    <p>Result</p>
  </div>
</Card>
```

**2. 按钮状态管理**
```tsx
// ✅ 正确：有结果时才启用保存和打印
<Button onClick={handleSaveAsImage} disabled={!result}>
  Save as Image
</Button>

// ✅ 分享按钮始终可用（可以分享计算器本身）
<Button onClick={handleShare}>
  Share Calculator
</Button>
```

**3. URL 参数简化**
```tsx
// ✅ 正确：使用简短字母缩写
getShareParams: () => ({
  n: inputs.number.toString(),     // n = number
  r: inputs.rate.toString(),       // r = rate
  t: inputs.term.toString(),       // t = term
})

// ❌ 错误：使用完整单词（URL太长）
getShareParams: () => ({
  number: inputs.number.toString(),
  rate: inputs.rate.toString(),
  term: inputs.term.toString(),
})
```

**4. html2canvas 配置**
```tsx
// ✅ 推荐配置
const canvas = await html2canvas(resultRef.current, {
  scale: 2,                    // 2倍分辨率，高清晰度
  backgroundColor: '#ffffff',   // 白色背景，避免透明
  logging: false,              // 不输出日志，保持控制台干净
  useCORS: true,               // 支持跨域图片
  allowTaint: true,            // 允许跨域内容
});
```

---

#### 检查清单

**必须实现的功能：**
- [ ] 导入 `useShare` Hook 和 `ShareModal` 组件
- [ ] 导入 `html2canvas` 库
- [ ] 创建 `resultRef` 引用结果区域
- [ ] 实现 `handleSaveAsImage` 函数
- [ ] 实现 `handlePrint` 函数
- [ ] 配置 `useShare` Hook（路径、参数、文本）
- [ ] 添加3个操作按钮（Save、Print、Share）
- [ ] 添加 `ShareModal` 组件
- [ ] 按钮有正确的 `disabled` 状态
- [ ] 结果区域使用 `ref={resultRef}`

**测试验证：**
- [ ] 点击 "Save as Image" 能下载 PNG 图片
- [ ] 点击 "Print Results" 能打开打印预览
- [ ] 点击 "Share Calculator" 能打开分享模态框
- [ ] 分享模态框可以复制链接
- [ ] 分享模态框可以分享到社交媒体
- [ ] 没有结果时，保存和打印按钮是禁用状态
- [ ] 生成的图片包含完整的结果内容

---

#### 常见错误（必须避免）

```tsx
// ❌ 错误1：自己实现分享逻辑
const handleShare = async () => {
  try {
    if (navigator.share) {
      await navigator.share({ title: '...', url: '...' });
    }
  } catch (err) { /* ... */ }
};
// ✅ 正确：使用 useShare Hook

// ❌ 错误2：缺少保存图片功能
// 完全没有实现 handleSaveAsImage
// ✅ 正确：必须实现

// ❌ 错误3：缺少 resultRef
<div>  // 没有 ref
  <Card>Results</Card>
</div>
// ✅ 正确：<div ref={resultRef}>

// ❌ 错误4：按钮没有禁用状态
<Button onClick={handleSaveAsImage}>
  Save as Image
</Button>
// ✅ 正确：<Button disabled={!result}>

// ❌ 错误5：忘记添加 ShareModal
// JSX 中没有 <ShareModal />
// ✅ 正确：必须添加
```

---

### 🔄 方案保存与对比功能

**适用场景：** 某些计算器特别适合方案保存和对比功能，让用户可以保存多个计算结果，然后并排对比差异。

#### ✅ 适合使用方案对比的计算器

**金融投资类**（对比不同投资选择）：
- ✅ Bond Calculator - 对比不同债券的价格、收益率、久期
- ✅ Mortgage Calculator - 对比不同贷款方案（利率、期限）
- ✅ Investment Calculator - 对比不同投资策略
- ✅ Retirement Calculator - 对比不同储蓄计划
- ✅ Loan Comparison Calculator - 对比多个贷款选项
- ✅ CD Calculator - 对比不同存款期限和利率

**房地产类**（对比不同房产）：
- ✅ Rental Property Calculator - 对比多个投资物业
- ✅ Property Tax Calculator - 对比不同地区税费

**保险类**（对比不同保险计划）：
- ✅ Health Insurance Calculator - 对比不同保险计划
- ✅ Life Insurance Calculator - 对比保险方案

**教育类**（对比不同选择）：
- ✅ College Savings Calculator - 对比不同储蓄策略
- ✅ Student Loan Calculator - 对比还款计划

#### ❌ 不适合方案对比的计算器

**简单单次计算**（一次性结果）：
- ❌ BMI Calculator - 无需对比，只关心当前体重
- ❌ Age Calculator - 单纯计算年龄
- ❌ Tip Calculator - 当次用餐小费
- ❌ Unit Converter - 单位转换
- ❌ Percentage Calculator - 简单百分比计算

**实时工具**（即时反馈）：
- ❌ Time Zone Converter - 实时查看时区
- ❌ Date Calculator - 日期计算

**健康工具**（个人当前状态）：
- ❌ Calorie Calculator - 关注当前热量需求
- ❌ Heart Rate Calculator - 当前心率

---

#### 核心设计原则

**1. 数据结构**

```typescript
interface SavedScenario {
  id: string;                     // 唯一标识
  name: string;                   // 用户自定义名称
  inputs: YourInputsInterface;    // 保存输入参数
  result: CalculationResult;      // 保存完整计算结果（重点！）
  savedAt: Date;                  // 保存时间
}
```

**⭐ 关键：必须保存完整的 `result` 对象，而不仅仅是输入参数**
- ✅ 对比的重点是**计算结果**（价格、收益率、总成本等）
- ✅ 不是对比输入参数（用户已经知道输入了什么）

**2. 状态管理**

```typescript
const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
const [showComparison, setShowComparison] = useState(false);
const [scenarioName, setScenarioName] = useState('');
const [showSaveDialog, setShowSaveDialog] = useState(false);

// 从 localStorage 加载已保存方案
useEffect(() => {
  const saved = localStorage.getItem('yourCalculatorScenarios');
  if (saved) {
    const parsed = JSON.parse(saved);
    setSavedScenarios(parsed.map((s: SavedScenario) => ({
      ...s,
      savedAt: new Date(s.savedAt)  // 转换日期对象
    })));
  }
}, []);

// 保存到 localStorage
useEffect(() => {
  if (savedScenarios.length > 0) {
    localStorage.setItem('yourCalculatorScenarios', JSON.stringify(savedScenarios));
  }
}, [savedScenarios]);
```

**3. 核心功能实现**

```typescript
// ✅ 保存方案
const handleSaveScenario = () => {
  if (!result) {
    alert('Please calculate first.');
    return;
  }
  if (!scenarioName.trim()) {
    alert('Please enter a scenario name.');
    return;
  }
  
  const newScenario: SavedScenario = {
    id: Date.now().toString(),
    name: scenarioName.trim(),
    inputs: { ...inputs },      // 保存输入
    result: { ...result },      // ⭐ 保存完整结果
    savedAt: new Date(),
  };
  
  setSavedScenarios(prev => [...prev, newScenario]);
  setScenarioName('');
  setShowSaveDialog(false);
};

// ✅ 删除方案
const handleDeleteScenario = (id: string) => {
  if (confirm('Delete this scenario?')) {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
    setSelectedScenarios(prev => prev.filter(sid => sid !== id));
  }
};

// ✅ 加载方案
const handleLoadScenario = (scenario: SavedScenario) => {
  setInputs(scenario.inputs);
  setResult(scenario.result);
  setShowComparison(false);
};

// ✅ 选择/取消选择方案（用于对比）
const toggleScenarioSelection = (id: string) => {
  setSelectedScenarios(prev => {
    if (prev.includes(id)) {
      return prev.filter(sid => sid !== id);
    } else if (prev.length < 4) {  // 限制最多4个
      return [...prev, id];
    } else {
      alert('Maximum 4 scenarios for comparison.');
      return prev;
    }
  });
};
```

**4. UI 布局 - 方案卡片列表**

```tsx
{/* 底部：保存的方案网格 */}
{savedScenarios.length > 0 && (
  <div className="mt-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Saved Scenarios ({savedScenarios.length})
      </h3>
      {selectedScenarios.length >= 2 && (
        <Button onClick={() => setShowComparison(true)}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Compare {selectedScenarios.length} Scenarios
        </Button>
      )}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {savedScenarios.map((scenario) => (
        <Card 
          key={scenario.id}
          className={`cursor-pointer transition-all ${
            selectedScenarios.includes(scenario.id)
              ? 'border-blue-500 border-2 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
          }`}
          onClick={() => toggleScenarioSelection(scenario.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              {/* ⭐ Checkbox 只用于展示，点击整个卡片即可选择 */}
              <input
                type="checkbox"
                checked={selectedScenarios.includes(scenario.id)}
                onChange={() => {}}
                className="mt-1 pointer-events-none"
                readOnly
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();  // ⭐ 阻止冒泡，避免触发卡片点击
                  handleDeleteScenario(scenario.id);
                }}
                variant="ghost"
                size="sm"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-2">
              {scenario.name}
            </h4>
            
            {/* ⭐ 显示关键计算结果，不是输入参数 */}
            <div className="space-y-1 text-xs text-gray-600 mb-3">
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-semibold text-blue-700">
                  ${scenario.result.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>YTM:</span>
                <span className="font-semibold">
                  {scenario.result.yieldToMaturity.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold">
                  {scenario.result.modifiedDuration.toFixed(2)}y
                </span>
              </div>
            </div>
            
            <Button
              onClick={(e) => {
                e.stopPropagation();  // ⭐ 阻止冒泡
                handleLoadScenario(scenario);
              }}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Load
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)}
```

**⭐ UI 交互关键点：**
- ✅ **点击整个卡片即可选择/取消选择**（使用 `onClick` 在 Card 上）
- ✅ Checkbox 设为 `readOnly` 和 `pointer-events-none`，只用于视觉展示
- ✅ Delete 和 Load 按钮使用 `e.stopPropagation()` 阻止事件冒泡
- ✅ 选中状态用 `border-blue-500 border-2 bg-blue-50` 明确标识
- ✅ 最多允许选择 4 个方案对比

**5. 对比视图 - 全屏模式**

```tsx
// ⭐ 对比模式：全屏覆盖层
if (showComparison && selectedScenarios.length >= 2) {
  const comparisonScenarios = savedScenarios.filter(s => 
    selectedScenarios.includes(s.id)
  );
  
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Scenario Comparison ({selectedScenarios.length} scenarios)
          </h2>
          <Button onClick={() => setShowComparison(false)}>
            <X className="h-4 w-4 mr-2" />
            Close Comparison
          </Button>
        </div>

        <div className="space-y-8">
          {/* ⭐ 1. 详细对比表格 - 并排显示所有关键结果 */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-3">Metric</th>
                    {comparisonScenarios.map(s => (
                      <th key={s.id} className="text-right py-3">{s.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* ⭐ 对比计算结果，不是输入参数 */}
                  <tr className="border-b">
                    <td className="py-3 font-medium">Bond Price</td>
                    {comparisonScenarios.map(s => (
                      <td key={s.id} className="text-right font-semibold text-blue-700">
                        ${s.result.price.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">YTM</td>
                    {comparisonScenarios.map(s => (
                      <td key={s.id} className="text-right">
                        {s.result.yieldToMaturity.toFixed(2)}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Duration</td>
                    {comparisonScenarios.map(s => (
                      <td key={s.id} className="text-right">
                        {s.result.modifiedDuration.toFixed(2)}y
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">Total Return</td>
                    {comparisonScenarios.map(s => (
                      <td key={s.id} className="text-right text-green-700 font-semibold">
                        {s.result.totalReturn.toFixed(2)}%
                      </td>
                    ))}
                  </tr>
                  {/* ... 更多关键指标 */}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* ⭐ 2. 可视化对比图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 柱状图：价格对比 */}
            <Card>
              <CardHeader>
                <CardTitle>Price Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonScenarios.map(s => ({
                    name: s.name.substring(0, 12),
                    price: s.result.price,
                    duration: s.result.modifiedDuration * 100,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="price" fill="#1e40af" name="Price" />
                    <Bar yAxisId="right" dataKey="duration" fill="#64748b" name="Duration (x100)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 收益对比 */}
            <Card>
              <CardHeader>
                <CardTitle>Return Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonScenarios.map(s => ({
                    name: s.name.substring(0, 12),
                    ytm: s.result.yieldToMaturity,
                    totalReturn: s.result.totalReturn,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ytm" fill="#1e40af" name="YTM" />
                    <Bar dataKey="totalReturn" fill="#059669" name="Total Return" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* ⭐ 3. 叠加曲线对比（如价格-收益率曲线）*/}
          <Card>
            <CardHeader>
              <CardTitle>Price-Yield Curves Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="yield" 
                    type="number"
                    label={{ value: 'Yield (%)', position: 'insideBottom' }}
                  />
                  <YAxis label={{ value: 'Price ($)', angle: -90 }} />
                  <Tooltip />
                  <Legend />
                  {/* ⭐ 每个方案一条线，不同颜色 */}
                  {comparisonScenarios.map((scenario, idx) => {
                    const colors = ['#1e40af', '#059669', '#d97706', '#dc2626'];
                    return (
                      <Line
                        key={scenario.id}
                        data={scenario.result.priceYieldCurve}
                        type="monotone"
                        dataKey="price"
                        stroke={colors[idx % colors.length]}
                        strokeWidth={2}
                        name={scenario.name.substring(0, 15)}
                        dot={false}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

---

#### 检查清单

**核心功能：**
- [ ] 保存方案功能（包含完整的 result 对象）
- [ ] 从 localStorage 加载/保存方案
- [ ] 删除方案功能
- [ ] 加载方案到计算器
- [ ] 点击卡片即可选择（不需要精确点击 checkbox）
- [ ] 最多选择 4 个方案对比
- [ ] 全屏对比视图

**对比内容（重点！）：**
- [ ] ⭐ 详细对比表格：并排显示所有关键**计算结果**
- [ ] ⭐ 可视化图表：柱状图、折线图对比
- [ ] ⭐ 叠加曲线：如价格-收益率曲线、增长曲线等
- [ ] 突出差异：用颜色和粗体标识最优/最差值

**UI/UX：**
- [ ] 方案卡片显示核心结果（不是输入参数）
- [ ] 选中状态明显（蓝色边框+背景）
- [ ] Delete 和 Load 按钮使用 `e.stopPropagation()`
- [ ] 对比视图有 "Close Comparison" 按钮
- [ ] 至少选择 2 个方案才显示 "Compare" 按钮

**性能：**
- [ ] 使用 localStorage 持久化存储
- [ ] 日期字符串正确转换为 Date 对象
- [ ] 删除方案时同步更新选择列表

---

#### 常见错误（必须避免）

```tsx
// ❌ 错误1：只保存输入参数，不保存计算结果
const newScenario = {
  id: Date.now().toString(),
  name: scenarioName,
  inputs: { ...inputs },
  // 缺少 result: { ...result }
};
// ✅ 正确：必须保存完整的 result

// ❌ 错误2：对比视图只显示输入参数
<tr>
  <td>Face Value</td>
  {scenarios.map(s => <td>${s.inputs.faceValue}</td>)}
</tr>
// ✅ 正确：应该对比计算结果
<tr>
  <td>Bond Price</td>
  {scenarios.map(s => <td>${s.result.price.toFixed(2)}</td>)}
</tr>

// ❌ 错误3：需要精确点击 checkbox 才能选择
<input 
  type="checkbox"
  onChange={() => toggleScenarioSelection(id)}
/>
// ✅ 正确：点击整个卡片即可
<Card onClick={() => toggleScenarioSelection(id)}>
  <input 
    type="checkbox"
    readOnly
    className="pointer-events-none"
  />
</Card>

// ❌ 错误4：Delete 和 Load 按钮触发卡片点击
<Button onClick={() => handleDeleteScenario(id)}>
  Delete
</Button>
// ✅ 正确：阻止事件冒泡
<Button onClick={(e) => {
  e.stopPropagation();
  handleDeleteScenario(id);
}}>
  Delete
</Button>

// ❌ 错误5：对比视图只是简单列表，没有可视化
{scenarios.map(s => <div>{s.name}: {s.result.price}</div>)}
// ✅ 正确：使用表格 + 图表
<table>...</table>
<BarChart>...</BarChart>
<LineChart>...</LineChart>
```

---

#### 实际应用示例（Bond Calculator）

**用户使用流程：**
1. 用户输入债券参数，计算得到价格、YTM、久期等结果
2. 点击 "Save Scenario"，命名为 "公司债 10年 5%"
3. 修改参数（如 YTM 改为 5%），重新计算
4. 再次保存为 "公司债 10年 5% - 低利率"
5. 重复保存 3-4 个不同方案
6. 在底部卡片网格中，**点击卡片**选择要对比的方案（2-4个）
7. 点击 "Compare X Scenarios" 进入全屏对比视图
8. 查看：
   - 详细对比表格：价格、YTM、久期、凸性、总收益等
   - 价格 & 久期对比图（双Y轴柱状图）
   - 收益率对比图
   - **价格-收益率曲线叠加**（4条不同颜色的线）
   - 现金流总额对比
9. 点击 "Close Comparison" 返回主界面

**关键价值：**
- ✅ 用户可以直观看出哪个债券收益更高
- ✅ 用户可以看出哪个债券对利率更敏感（久期、凸性）
- ✅ 用户可以对比总收益和风险等级
- ✅ 价格-收益率曲线叠加展示相对敏感性

---

#### 效果对比

| 功能 | 没有实现 | 正确实现 |
|-----|---------|---------|
| **分享** | ❌ 用户无法分享 | ✅ 多平台分享 |
| **保存图片** | ❌ 无法保存 | ✅ 高清PNG下载 |
| **打印** | ❌ 打印效果差 | ✅ 专业打印布局 |
| **用户体验** | ⚠️ 功能不完整 | ✅ 专业工具站 |
| **代码维护** | ⚠️ 重复代码 | ✅ 统一组件 |

---

**总结：所有计算器必须实现「分享」+「保存图片」+「打印」三大导出功能！**