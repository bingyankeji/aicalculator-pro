# 🚀 AI Calculator - 快速启动指南

## 📦 安装步骤

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 2. 配置环境变量（可选）

创建 `.env.local` 文件（如果需要）：

```bash
# 创建环境变量文件
touch .env.local
```

然后编辑 `.env.local`，添加以下配置：

#### **分享功能配置（推荐）**
```env
# 分享链接的基础URL
# 本地开发：
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# 生产环境（替换为你的域名）：
# NEXT_PUBLIC_BASE_URL=https://aicalculator.com
```

> **💡 提示：** 如果不配置，系统会自动使用当前域名，本地和生产环境都能正常工作。

#### **AI功能配置（可选）**
```env
# OpenAI API Key（用于AI分析功能）
OPENAI_API_KEY=your_api_key_here
```

详细说明请查看 [`docs/分享功能配置说明.md`](docs/分享功能配置说明.md)

### 3. 启动开发服务器

**Windows 用户（推荐）：**
双击 `快速启动.bat` 即可一键启动！

**或使用命令行：**
```bash
npm run dev
```

打开浏览器访问 [http://localhost:3001](http://localhost:3001)

## ✅ 验证安装

访问以下页面确认一切正常：

- ✅ 首页：http://localhost:3000
- ✅ API 健康检查：http://localhost:3000/api/health
- ✅ 计算器功能正常
- ✅ 键盘快捷键工作
- ✅ 移动端菜单可展开

## 🎯 项目结构说明

```
ai-calculator/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # 根布局（包含 Header/Footer）
│   ├── page.tsx           # 首页
│   ├── globals.css        # 全局样式
│   ├── sitemap.ts         # SEO sitemap
│   ├── robots.ts          # SEO robots.txt
│   └── api/               # API 路由
│       ├── health/        # 健康检查
│       └── ai/analyze/    # AI 分析（待接入 OpenAI）
│
├── components/            # React 组件
│   ├── Header.tsx         # 顶部导航
│   ├── Footer.tsx         # 底部信息
│   ├── Sidebar.tsx        # 侧边栏（搜索+分类）
│   ├── CalculatorList.tsx # 计算器列表
│   ├── Calculator/        # 计算器组件
│   │   ├── BasicCalculator.tsx      # 基础计算器
│   │   └── PopularCalculators.tsx   # 热门计算器
│   └── ui/                # UI 组件库（shadcn/ui）
│       └── button.tsx
│
├── lib/                   # 工具函数
│   ├── utils.ts           # 通用工具（cn, calculate 等）
│   └── types.ts           # TypeScript 类型定义
│
├── public/                # 静态资源
│   └── robots.txt
│
├── package.json           # 依赖管理
├── next.config.js         # Next.js 配置
├── tailwind.config.ts     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
├── .env.local.example     # 环境变量示例
├── .gitignore            # Git 忽略文件
└── README.md             # 项目说明
```

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 运行 ESLint 检查
npm run lint

# 运行 TypeScript 类型检查
npm run type-check
```

## 🎨 核心功能

### 1. 基础计算器
- ✅ 完整的四则运算
- ✅ 百分比计算
- ✅ 正负号切换
- ✅ 键盘快捷键支持
  - 数字键：0-9
  - 运算符：+、-、*、/、%
  - Enter/= 计算结果
  - Escape/C 清除
  - Backspace 删除

### 2. 搜索功能
- ✅ 实时搜索计算器
- ✅ 搜索结果过滤
- ✅ 搜索建议

### 3. 响应式设计
- ✅ 桌面端
- ✅ 平板端
- ✅ 移动端（汉堡菜单）

### 4. SEO 优化
- ✅ 自动生成 sitemap.xml
- ✅ robots.txt 配置
- ✅ Meta 标签优化
- ✅ Open Graph 标签
- ✅ Twitter Card 标签

### 5. 分享功能 ⭐️ NEW
- ✅ 一键分享计算结果
- ✅ URL参数预填充（好友点击链接自动填充数据）
- ✅ 支持平台：
  - 📋 复制链接
  - 📘 Facebook
  - 🐦 Twitter (X)
  - 💬 WhatsApp
  - 📧 Email
- ✅ 自动适应本地/生产环境
- ✅ 已实现：BMI Calculator
- 📌 待添加：Mortgage Calculator

**使用示例：**
```
1. 用户计算BMI后点击"Share"按钮
2. 生成链接：https://yourdomain.com/bmi-calculator?w=70&h=170&a=30&g=m&u=metric
3. 好友点击链接，计算器自动填充数据并显示结果
4. 好友可以修改参数，计算自己的数据
```

## 📝 下一步开发

### 优先级 1: 专用计算器页面
创建以下计算器的独立页面：

1. **BMI Calculator** (`/bmi-calculator`)
   - 输入身高、体重
   - 显示 BMI 值和分类
   - AI 健康分析

2. **Loan Calculator** (`/loan-calculator`)
   - 输入贷款金额、利率、期限
   - 显示月供、总利息
   - AI 财务建议

3. **Percentage Calculator** (`/percentage-calculator`)
   - 多种百分比计算模式
   - 实时计算

### 优先级 2: OpenAI 集成
在 `app/api/ai/analyze/route.ts` 中：

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 调用 GPT-4 进行分析
const completion = await openai.chat.completions.create({
  model: "gpt-4-turbo-preview",
  messages: [
    {
      role: "system",
      content: "You are a helpful calculator assistant..."
    },
    {
      role: "user",
      content: `Analyze this ${calculatorType} result...`
    }
  ],
});
```

### 优先级 3: 多语言支持
安装 `next-intl`：

```bash
npm install next-intl
```

### 优先级 4: Google AdSense
在 `app/layout.tsx` 中添加 AdSense 脚本。

## 🐛 常见问题

### Q: 运行 `npm install` 报错？
A: 确保 Node.js 版本 >= 18.0.0

```bash
node --version
```

### Q: 端口 3000 被占用？
A: 修改端口：

```bash
npm run dev -- -p 3001
```

### Q: TypeScript 报错？
A: 运行类型检查：

```bash
npm run type-check
```

### Q: 样式不生效？
A: 确认 Tailwind CSS 配置正确，重启开发服务器。

## 📮 获取帮助

- 查看 [README.md](./README.md)
- 查看技术文档：`AI增强计算器-技术架构与实施.md`
- GitHub Issues: [报告问题](https://github.com/yourusername/ai-calculator/issues)

## 🎉 开始开发吧！

现在你已经准备好开始开发了。祝编码愉快！🚀

