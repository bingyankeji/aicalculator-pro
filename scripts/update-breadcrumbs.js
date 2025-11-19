/**
 * 批量更新所有计算器页面的面包屑导航
 * 将所有手动维护的面包屑替换为统一的 CalculatorBreadcrumb 组件
 */

const fs = require('fs');
const path = require('path');

// 获取所有计算器数据
const calculatorDataPath = path.join(__dirname, '../lib/calculatorData.ts');
const calculatorDataContent = fs.readFileSync(calculatorDataPath, 'utf-8');

// 从 calculatorData.ts 中提取所有计算器URL
const urlMatches = calculatorDataContent.matchAll(/url:\s*['"]([^'"]+)['"]/g);
const calculatorUrls = Array.from(urlMatches).map(match => match[1]);

console.log(`📊 找到 ${calculatorUrls.length} 个计算器\n`);

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

// 遍历所有计算器URL
calculatorUrls.forEach((url, index) => {
  const calculatorPath = url.substring(1); // 移除开头的 /
  const filePath = path.join(__dirname, '../app', calculatorPath, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  文件不存在: ${calculatorPath}`);
    skippedCount++;
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    
    // 提取计算器名称（从文件内容中）
    let calculatorName = '';
    
    // 尝试从 metadata title 中提取
    const titleMatch = content.match(/title:\s*['"](.*?)\s*[-|].*?['"]/);
    if (titleMatch) {
      calculatorName = titleMatch[1].trim();
    } else {
      // 从URL生成名称
      calculatorName = calculatorPath
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    // 检查是否已经导入了组件
    const hasImport = content.includes('CalculatorBreadcrumb');
    
    // 1. 添加导入语句（如果还没有）
    if (!hasImport) {
      // 找到 import 语句的位置
      const lastImportMatch = content.match(/(import\s+.*?from\s+['"].*?['"];?\s*\n)+/);
      if (lastImportMatch) {
        const lastImportEnd = lastImportMatch.index + lastImportMatch[0].length;
        const importStatement = "import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';\n";
        content = content.slice(0, lastImportEnd) + importStatement + content.slice(lastImportEnd);
      }
    }

    // 2. 替换面包屑导航
    // 匹配各种面包屑格式
    const breadcrumbPatterns = [
      // 格式1: 带注释的标准格式
      /\{\/\*\s*Breadcrumb Navigation\s*\*\/\}\s*<nav[^>]*aria-label=["']Breadcrumb["'][^>]*>[\s\S]*?<\/nav>/,
      // 格式2: 无注释的标准格式
      /<nav[^>]*aria-label=["']Breadcrumb["'][^>]*>[\s\S]*?<\/nav>/,
    ];

    let breadcrumbReplaced = false;
    for (const pattern of breadcrumbPatterns) {
      if (pattern.test(content)) {
        const replacement = `{/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="${calculatorName}"
        calculatorUrl="${url}"
      />`;
        
        content = content.replace(pattern, replacement);
        breadcrumbReplaced = true;
        break;
      }
    }

    // 3. 保存文件（如果有修改）
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      updatedCount++;
      console.log(`✅ [${index + 1}/${calculatorUrls.length}] ${calculatorPath} - ${calculatorName}`);
    } else {
      if (!breadcrumbReplaced) {
        console.log(`⏭️  [${index + 1}/${calculatorUrls.length}] ${calculatorPath} - 未找到面包屑或已使用组件`);
      }
      skippedCount++;
    }
  } catch (error) {
    console.error(`❌ 处理失败: ${calculatorPath} - ${error.message}`);
    errorCount++;
  }
});

// 输出统计
console.log('\n' + '='.repeat(50));
console.log('📈 批量更新完成统计:');
console.log('='.repeat(50));
console.log(`✅ 成功更新: ${updatedCount} 个`);
console.log(`⏭️  跳过: ${skippedCount} 个`);
console.log(`❌ 失败: ${errorCount} 个`);
console.log(`📊 总计: ${calculatorUrls.length} 个`);
console.log('='.repeat(50));

if (updatedCount > 0) {
  console.log('\n✨ 所有计算器面包屑已统一更新！');
  console.log('💡 建议: 运行测试确保所有页面正常工作');
}

