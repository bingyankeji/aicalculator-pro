# CalculatorBreadcrumb 组件使用指南

## 📋 概述

`CalculatorBreadcrumb` 是一个智能面包屑导航组件，可以**自动**根据计算器的URL从 `calculatorData.ts` 中获取正确的分类，并生成标准的面包屑导航。

## ✨ 特性

- ✅ **自动分类识别**：根据计算器URL自动匹配正确的分类
- ✅ **统一样式**：所有计算器使用一致的面包屑样式
- ✅ **SEO优化**：包含结构化数据 (Schema.org BreadcrumbList)
- ✅ **易于维护**：修改一个地方，全站生效
- ✅ **防止错误**：避免手动填写分类时出错

## 📦 组件说明

### CalculatorBreadcrumb（标准版）
完整样式的面包屑组件，包含边框和背景。

### SimpleBreadcrumb（简化版）
简化样式的面包屑组件，适合自定义布局。

## 🚀 使用方法

### 方法 1：推荐使用（自动识别分类）

```typescript
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';

export default function MyCalculatorPage() {
  return (
    <div>
      <CalculatorBreadcrumb 
        calculatorName="Tip Calculator"
        calculatorUrl="/tip-calculator"  // 组件会自动查找分类
      />
      
      {/* 你的计算器内容 */}
    </div>
  );
}
```

### 方法 2：仅提供名称（默认使用Other分类）

```typescript
<CalculatorBreadcrumb 
  calculatorName="Custom Calculator"
  // 不提供URL时，默认归类到 "Other"
/>
```

### 方法 3：使用简化版

```typescript
import { SimpleBreadcrumb } from '@/components/CalculatorBreadcrumb';

export default function MyCalculatorPage() {
  return (
    <div>
      <SimpleBreadcrumb 
        calculatorName="Time Zone Calculator"
        calculatorUrl="/time-zone-calculator"
      />
    </div>
  );
}
```

## 📊 自动分类映射

组件会根据 `calculatorData.ts` 中的分类自动生成正确的面包屑：

| Category in Data | Breadcrumb Name | URL |
|-----------------|-----------------|-----|
| Financial | Financial | /financial |
| Health | Health & Fitness | /health-fitness |
| Math | Math | /math-numbers |
| Other | Other | /other |

## ✅ 迁移步骤

### 旧代码（需要手动维护）:
```typescript
<nav aria-label="Breadcrumb">
  <ol>
    <li><Link href="/">Home</Link></li>
    <li>/</li>
    <li><Link href="/other">Other</Link></li>  {/* 容易写错 */}
    <li>/</li>
    <li>Tip Calculator</li>
  </ol>
</nav>
```

### 新代码（自动识别）:
```typescript
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';

<CalculatorBreadcrumb 
  calculatorName="Tip Calculator"
  calculatorUrl="/tip-calculator"
/>
```

## 🔧 Props 说明

```typescript
interface BreadcrumbProps {
  calculatorName: string;     // 必需：计算器显示名称
  calculatorUrl?: string;     // 可选：计算器URL（用于自动识别分类）
}
```

## 💡 最佳实践

1. **始终提供 calculatorUrl**，让组件自动识别分类
2. **使用 CalculatorBreadcrumb** 作为默认选择（完整样式）
3. **保持 calculatorName 与实际显示一致**
4. **在 calculatorData.ts 中正确设置分类**

## ⚠️ 常见问题

### Q: 面包屑显示的分类不对怎么办？
A: 检查 `lib/calculatorData.ts` 中该计算器的 `category` 字段是否正确。

### Q: 可以自定义面包屑样式吗？
A: 可以使用 `SimpleBreadcrumb` 并添加自定义样式，或者修改组件源码。

### Q: 新计算器需要注册吗？
A: 只需在 `calculatorData.ts` 中添加计算器信息即可，面包屑会自动工作。

## 📝 示例文件

参考已更新的计算器页面：
- `app/age-calculator/page.tsx`
- `app/time-zone-calculator/page.tsx`
- `app/tip-calculator/page.tsx`（待更新）

---

**最后更新**: 2025-11-19  
**维护者**: AICalculator Team

