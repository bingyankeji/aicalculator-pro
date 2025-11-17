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
   - 8-10个高质量问题和答案
   - 每个问题都是用户真实搜索的关键词
   - 答案详细且有价值（100-200字）

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
- **FAQ部分**: 包含schema.org标记的8-10个常见问题
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