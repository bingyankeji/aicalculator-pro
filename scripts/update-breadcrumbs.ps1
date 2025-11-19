# 批量更新所有计算器页面的面包屑导航
# 将所有手动维护的面包屑替换为统一的 CalculatorBreadcrumb 组件

Write-Host "🚀 开始批量更新计算器面包屑..." -ForegroundColor Cyan
Write-Host ""

# 读取 calculatorData.ts
$calculatorDataPath = Join-Path $PSScriptRoot "..\lib\calculatorData.ts"
$calculatorData = Get-Content $calculatorDataPath -Raw

# 提取所有计算器URL
$urls = [regex]::Matches($calculatorData, "url:\s*['`"]([^'`"]+)['`"]") | ForEach-Object { $_.Groups[1].Value }

Write-Host "📊 找到 $($urls.Count) 个计算器" -ForegroundColor Green
Write-Host ""

$updatedCount = 0
$skippedCount = 0
$errorCount = 0
$index = 0

foreach ($url in $urls) {
    $index++
    $calculatorPath = $url.Substring(1) # 移除开头的 /
    $filePath = Join-Path $PSScriptRoot "..\app\$calculatorPath\page.tsx"
    
    if (-not (Test-Path $filePath)) {
        Write-Host "⚠️  [$index/$($urls.Count)] 文件不存在: $calculatorPath" -ForegroundColor Yellow
        $skippedCount++
        continue
    }

    try {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        $originalContent = $content
        
        # 提取计算器名称
        $calculatorName = ""
        if ($content -match "title:\s*['\`"](.*?)\s*[-|].*?['\`"]") {
            $calculatorName = $Matches[1].Trim()
        } else {
            # 从URL生成名称
            $words = $calculatorPath -split '-'
            $calculatorName = ($words | ForEach-Object { 
                $_.Substring(0,1).ToUpper() + $_.Substring(1) 
            }) -join ' '
        }

        # 检查是否已经导入了组件
        $hasImport = $content -match 'CalculatorBreadcrumb'
        
        # 1. 添加导入语句（如果还没有）
        if (-not $hasImport) {
            $importStatement = "import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';`n"
            # 在最后一个 import 之后添加
            $content = $content -replace "(import\s+.*?from\s+['`"].*?['`"];?\s*`n)", "`$1$importStatement"
            $content = $content -replace "$importStatement$importStatement", $importStatement # 去重
        }

        # 2. 替换面包屑导航
        $replacement = @"
{/* Breadcrumb Navigation - Auto-categorized */}
      <CalculatorBreadcrumb 
        calculatorName="$calculatorName"
        calculatorUrl="$url"
      />
"@

        # 尝试多种面包屑格式
        $breadcrumbReplaced = $false
        
        # 格式1: 带注释的完整面包屑
        if ($content -match '(?s)\{/\*\s*Breadcrumb Navigation\s*\*/\}\s*<nav[^>]*?aria-label=["'']Breadcrumb["''][^>]*?>.*?</nav>') {
            $content = $content -replace '(?s)\{/\*\s*Breadcrumb Navigation\s*\*/\}\s*<nav[^>]*?aria-label=["'']Breadcrumb["''][^>]*?>.*?</nav>', $replacement
            $breadcrumbReplaced = $true
        }
        # 格式2: 无注释的面包屑
        elseif ($content -match '(?s)<nav[^>]*?aria-label=["'']Breadcrumb["''][^>]*?>.*?</nav>') {
            $content = $content -replace '(?s)<nav[^>]*?aria-label=["'']Breadcrumb["''][^>]*?>.*?</nav>', $replacement
            $breadcrumbReplaced = $true
        }

        # 3. 保存文件（如果有修改）
        if ($content -ne $originalContent) {
            $content | Set-Content $filePath -Encoding UTF8 -NoNewline
            $updatedCount++
            Write-Host "✅ [$index/$($urls.Count)] $calculatorPath - $calculatorName" -ForegroundColor Green
        } else {
            if (-not $breadcrumbReplaced) {
                Write-Host "⏭️  [$index/$($urls.Count)] $calculatorPath - 已使用组件或未找到面包屑" -ForegroundColor Gray
            }
            $skippedCount++
        }
    } catch {
        Write-Host "❌ [$index/$($urls.Count)] 处理失败: $calculatorPath - $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

# 输出统计
Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "📈 批量更新完成统计:" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "✅ 成功更新: $updatedCount 个" -ForegroundColor Green
Write-Host "⏭️  跳过: $skippedCount 个" -ForegroundColor Yellow
Write-Host "❌ 失败: $errorCount 个" -ForegroundColor Red
Write-Host "📊 总计: $($urls.Count) 个" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan

if ($updatedCount -gt 0) {
    Write-Host ""
    Write-Host "✨ 所有计算器面包屑已统一更新！" -ForegroundColor Green
    Write-Host "💡 建议: 检查几个页面确保正常工作" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

