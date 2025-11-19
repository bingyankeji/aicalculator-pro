# 批量更新计算器面包屑 - 优化版本
$ErrorActionPreference = "Continue"

# 读取所有计算器URL
$urls = @(
  "/mortgage-calculator", "/canadian-mortgage-calculator", "/real-estate-calculator", 
  "/rent-vs-buy-calculator", "/loan-calculator", "/emi-calculator", "/interest-calculator",
  "/salary-calculator", "/tax-calculator", "/savings-calculator", "/cd-calculator",
  "/bond-calculator", "/prime-factorization-calculator", "/matrix-calculator",
  "/carbohydrate-calculator", "/body-fat-calculator", "/ideal-weight-calculator",
  "/calorie-calculator", "/bmi-calculator", "/bmr-calculator", "/tdee-calculator",
  "/protein-calculator", "/water-intake-calculator", "/macro-calculator",
  "/body-surface-area-calculator", "/lean-body-mass-calculator", "/waist-to-hip-ratio-calculator",
  "/body-type-calculator", "/army-body-fat-calculator", "/navy-body-fat-calculator",
  "/macro-ratio-calculator", "/beef-cooking-calculator", "/egg-cooking-calculator",
  "/cake-calculator", "/food-cost-calculator", "/turkey-size-calculator",
  "/wedding-cake-size-calculator", "/roast-cooking-calculator", "/chicken-cooking-calculator",
  "/recipe-converter-calculator", "/rice-cooking-calculator", "/investment-calculator",
  "/compound-interest-calculator", "/roi-calculator", "/stock-calculator",
  "/retirement-calculator", "/401k-calculator", "/roth-ira-calculator",
  "/pension-calculator", "/social-security-calculator", "/dividend-calculator",
  "/stock-profit-calculator", "/crypto-profit-calculator", "/cagr-calculator",
  "/inflation-calculator", "/net-worth-calculator", "/budget-calculator",
  "/debt-payoff-calculator", "/credit-card-payoff-calculator", "/debt-to-income-calculator",
  "/emergency-fund-calculator", "/financial-independence-calculator", "/amortization-calculator",
  "/apr-calculator", "/simple-interest-calculator", "/lease-calculator",
  "/car-loan-calculator", "/student-loan-calculator", "/personal-loan-calculator",
  "/refinance-calculator", "/home-equity-calculator", "/heloc-calculator",
  "/closing-cost-calculator", "/down-payment-calculator", "/house-affordability-calculator",
  "/rent-affordability-calculator", "/property-tax-calculator", "/hoa-fee-calculator",
  "/homeowners-insurance-calculator", "/pmi-calculator", "/cap-rate-calculator",
  "/cash-on-cash-return-calculator", "/gross-rent-multiplier-calculator", "/noi-calculator",
  "/irr-calculator", "/payback-period-calculator", "/break-even-calculator",
  "/markup-calculator", "/margin-calculator", "/discount-calculator",
  "/sales-tax-calculator", "/vat-calculator", "/tip-calculator",
  "/unit-converter", "/currency-converter", "/time-zone-converter",
  "/date-calculator", "/age-calculator", "/birthday-calculator",
  "/pregnancy-calculator", "/due-date-calculator", "/ovulation-calculator",
  "/menstrual-cycle-calculator", "/conception-calculator", "/implantation-calculator",
  "/hcg-calculator", "/weight-gain-pregnancy-calculator", "/baby-weight-calculator",
  "/baby-growth-calculator", "/baby-sleep-calculator", "/baby-formula-calculator",
  "/baby-food-calculator", "/diaper-calculator", "/baby-cost-calculator",
  "/love-calculator", "/relationship-calculator", "/wedding-budget-calculator",
  "/wedding-guest-calculator", "/seating-chart-calculator", "/alcohol-calculator",
  "/drink-calculator", "/party-cost-calculator", "/gas-mileage-calculator",
  "/fuel-cost-calculator", "/car-depreciation-calculator", "/lease-vs-buy-car-calculator",
  "/auto-loan-payment-calculator", "/car-affordability-calculator", "/car-trade-in-calculator",
  "/gpa-calculator", "/grade-calculator", "/test-score-calculator",
  "/weighted-grade-calculator", "/final-grade-calculator", "/assignment-calculator",
  "/study-time-calculator", "/reading-time-calculator", "/typing-speed-calculator",
  "/word-counter", "/character-counter", "/paragraph-generator",
  "/random-number-generator", "/percentage-calculator", "/ratio-calculator",
  "/proportion-calculator", "/fractions-calculator", "/mixed-number-calculator",
  "/decimal-to-fraction-calculator", "/fraction-to-decimal-calculator", "/lcm-calculator",
  "/gcf-calculator", "/square-root-calculator", "/cube-root-calculator",
  "/exponent-calculator", "/logarithm-calculator", "/scientific-calculator",
  "/standard-deviation-calculator", "/mean-median-mode-calculator", "/variance-calculator",
  "/z-score-calculator", "/correlation-calculator", "/regression-calculator",
  "/t-test-calculator", "/anova-calculator", "/chi-square-calculator",
  "/confidence-interval-calculator", "/sample-size-calculator", "/probability-calculator",
  "/permutation-calculator", "/combination-calculator", "/factorial-calculator",
  "/fibonacci-calculator", "/prime-number-calculator", "/even-odd-calculator",
  "/divisibility-calculator", "/modulo-calculator", "/binary-calculator",
  "/hexadecimal-calculator", "/octal-calculator", "/roman-numeral-calculator",
  "/time-calculator", "/hours-calculator", "/minutes-calculator",
  "/seconds-calculator", "/days-calculator", "/weeks-calculator",
  "/months-calculator", "/years-calculator", "/business-days-calculator",
  "/working-hours-calculator", "/overtime-calculator", "/paycheck-calculator",
  "/hourly-to-salary-calculator", "/salary-to-hourly-calculator", "/raise-calculator",
  "/bonus-calculator", "/commission-calculator", "/tip-pooling-calculator",
  "/concrete-calculator", "/asphalt-calculator", "/gravel-calculator",
  "/mulch-calculator", "/soil-calculator", "/sand-calculator",
  "/paint-calculator", "/wallpaper-calculator", "/tile-calculator",
  "/flooring-calculator", "/carpet-calculator", "/drywall-calculator",
  "/insulation-calculator", "/roof-calculator", "/siding-calculator",
  "/fence-calculator", "/deck-calculator", "/patio-calculator",
  "/square-footage-calculator", "/cubic-yards-calculator", "/board-feet-calculator",
  "/btu-calculator", "/hvac-calculator", "/air-conditioner-calculator",
  "/heater-calculator", "/pool-calculator", "/hot-tub-calculator",
  "/aquarium-calculator", "/fish-tank-calculator", "/pond-calculator",
  "/garden-calculator", "/plant-spacing-calculator", "/seed-calculator",
  "/fertilizer-calculator", "/compost-calculator", "/grass-seed-calculator",
  "/sod-calculator", "/irrigation-calculator", "/water-timer-calculator"
)

$updated = 0
$failed = @()

Write-Host "Starting update of $($urls.Count) calculators..." -ForegroundColor Cyan

foreach ($url in $urls) {
    $path = $url.TrimStart('/')
    $file = "app\$path\page.tsx"
    
    if (!(Test-Path $file)) {
        continue
    }
    
    try {
        $content = Get-Content $file -Raw
        
        # 提取计算器名称
        if ($content -match 'title:\s*[''"]([^''"]+?)\s*[-|]') {
            $name = $Matches[1].Trim()
        } else {
            $name = ($path -split '-' | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_) }) -join ' '
        }
        
        # 检查是否需要更新
        if ($content -notmatch 'CalculatorBreadcrumb') {
            # 添加import
            if ($content -notmatch "import.*CalculatorBreadcrumb") {
                $content = $content -replace "(import.*?from.*?;`n)", "`$1import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';`n"
            }
            
            # 替换面包屑
            $new = "{/* Breadcrumb Navigation - Auto-categorized */}`n      <CalculatorBreadcrumb `n        calculatorName=`"$name`"`n        calculatorUrl=`"$url`"`n      />"
            $content = $content -replace '(?s)<nav[^>]*aria-label=[''"]Breadcrumb[''"].*?</nav>', $new
            
            Set-Content $file -Value $content -NoNewline
            $updated++
            Write-Host "[$updated] $path" -ForegroundColor Green
        }
    } catch {
        $failed += $path
        Write-Host "Failed: $path" -ForegroundColor Red
    }
}

Write-Host "`nCompleted: $updated updated, $($failed.Count) failed" -ForegroundColor Cyan

