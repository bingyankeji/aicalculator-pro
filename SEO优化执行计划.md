# SEO优化执行计划：Canonical + 标题优化

**优化目标：** 为 189 个页面添加 Canonical 标签 + 吸引性标题标签

**预期效果：**
- ✅ Google 索引速度提升 70%
- ✅ 搜索结果 CTR 提升 20-40%
- ✅ 2-4 周内完成全部 189 个页面的索引
- ✅ 流量预计提升 50-100%

**执行策略：** 分 19 批，每批 10 个页面，按重要性优先级排序

---

## 📋 优化内容（每个页面）

### ✅ 需要修改的 4 个地方：

```typescript
export const metadata: Metadata = {
  // 1️⃣ 修改主标题：添加 (Free, No signup)
  title: "[Calculator Name] (Free, No signup) - [Benefit] | AICalculator",
  
  openGraph: {
    // 2️⃣ 同步修改 OG 标题
    title: "[Calculator Name] (Free, No signup) - AICalculator",
  },
  
  twitter: {
    // 3️⃣ 同步修改 Twitter 标题
    title: "[Calculator Name] (Free, No signup) - AICalculator",
  },
  
  // 4️⃣ 添加 Canonical 标签
  alternates: {
    canonical: getUrl('/calculator-path'),
  },
};
```

---

## 🎯 批次优先级分类

### 优先级说明：

- **🔥 P0（第1-3批）：** 核心页面，最高流量，立即优化
- **⚡ P1（第4-8批）：** 重要页面，高流量，优先优化
- **📊 P2（第9-15批）：** 常用页面，中等流量
- **📝 P3（第16-19批）：** 其他页面，补充完整

---

## 📅 第1批 - 核心首页 + 顶级金融计算器 🔥

**优先级：** P0 - 最高优先级  
**预计流量占比：** 35%  
**预计完成时间：** 30-45 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 1 | `/` (首页) | `AICalculator (Free, No signup) - 250+ Online Calculators` | 61 | ✅ 网站入口 |
| 2 | `/mortgage-calculator` | `Mortgage Calculator (Free, No signup) - Monthly Payments \| AICalculator` | 72 | 🔥 最高流量 |
| 3 | `/loan-calculator` | `Loan Calculator (Free, No signup) - Compare Rates \| AICalculator` | 68 | 🔥 高流量 |
| 4 | `/bmi-calculator` | `BMI Calculator (Free, No signup) - Check Your BMI \| AICalculator` | 68 | 🔥 高流量 |
| 5 | `/percentage-calculator` | `Percentage Calculator (Free, No signup) - Quick Math \| AICalculator` | 71 | 🔥 高流量 |
| 6 | `/401k-calculator` | `401k Calculator (Free, No signup) - Retirement Savings \| AICalculator` | 73 | 💰 金融核心 |
| 7 | `/auto-loan-calculator` | `Auto Loan Calculator (Free, No signup) - Car Payments \| AICalculator` | 73 | 💰 金融核心 |
| 8 | `/retirement-calculator` | `Retirement Calculator (Free, No signup) - Plan Ahead \| AICalculator` | 71 | 💰 金融核心 |
| 9 | `/student-loan-calculator` | `Student Loan Calculator (Free, No signup) - Repayment \| AICalculator` | 72 | 💰 金融核心 |
| 10 | `/tax-calculator` | `Tax Calculator (Free, No signup) - Income Tax \| AICalculator` | 64 | 💰 金融核心 |

**完成后提交：** Commit message: `feat: SEO optimization batch 1 - Core pages (canonical + title tags)`

---

## 📅 第2批 - 核心健康 + 金融计算器 🔥

**优先级：** P0 - 最高优先级  
**预计流量占比：** 25%  
**预计完成时间：** 30-45 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 11 | `/calorie-calculator` | `Calorie Calculator (Free, No signup) - Daily Needs \| AICalculator` | 69 | 💪 健康核心 |
| 12 | `/body-fat-calculator` | `Body Fat Calculator (Free, No signup) - Estimate Fat \| AICalculator` | 72 | 💪 健康核心 |
| 13 | `/savings-calculator` | `Savings Calculator (Free, No signup) - Grow Wealth \| AICalculator` | 70 | 💰 金融重要 |
| 14 | `/investment-calculator` | `Investment Calculator (Free, No signup) - ROI \| AICalculator` | 65 | 💰 金融重要 |
| 15 | `/compound-interest-calculator` | `Compound Interest (Free, No signup) - Investment Growth \| AICalculator` | 73 | 💰 金融重要 |
| 16 | `/credit-card-calculator` | `Credit Card Calculator (Free, No signup) - Payoff Plan \| AICalculator` | 73 | 💰 金融重要 |
| 17 | `/salary-calculator` | `Salary Calculator (Free, No signup) - Net Income \| AICalculator` | 67 | 💰 金融重要 |
| 18 | `/roi-calculator` | `ROI Calculator (Free, No signup) - Return on Investment \| AICalculator` | 74 | 💰 金融重要 |
| 19 | `/inflation-calculator` | `Inflation Calculator (Free, No signup) - Purchasing Power \| AICalculator` | 76 | 💰 金融重要 |
| 20 | `/budget-calculator` | `Budget Calculator (Free, No signup) - Monthly Budget \| AICalculator` | 70 | 💰 金融重要 |

**完成后提交：** Commit message: `feat: SEO optimization batch 2 - Core health & finance calculators`

---

## 📅 第3批 - 房产 + 债务计算器 🔥

**优先级：** P0 - 最高优先级  
**预计流量占比：** 20%  
**预计完成时间：** 30-45 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 21 | `/mortgage-payoff-calculator` | `Mortgage Payoff (Free, No signup) - Early Payoff \| AICalculator` | 69 | 🏠 房产重要 |
| 22 | `/refinance-calculator` | `Refinance Calculator (Free, No signup) - Save Money \| AICalculator` | 71 | 🏠 房产重要 |
| 23 | `/home-affordability-calculator` | `Home Affordability (Free, No signup) - Can I Afford? \| AICalculator` | 72 | 🏠 房产重要 |
| 24 | `/real-estate-calculator` | `Real Estate Calculator (Free, No signup) - Property Value \| AICalculator` | 76 | 🏠 房产重要 |
| 25 | `/rent-vs-buy-calculator` | `Rent vs Buy (Free, No signup) - Better Option? \| AICalculator` | 66 | 🏠 房产重要 |
| 26 | `/debt-payoff-calculator` | `Debt Payoff Calculator (Free, No signup) - Get Debt Free \| AICalculator` | 76 | 💳 债务管理 |
| 27 | `/debt-consolidation-calculator` | `Debt Consolidation (Free, No signup) - Simplify Debt \| AICalculator` | 71 | 💳 债务管理 |
| 28 | `/credit-card-payoff-calculator` | `Credit Card Payoff (Free, No signup) - Pay Off Faster \| AICalculator` | 73 | 💳 债务管理 |
| 29 | `/personal-loan-calculator` | `Personal Loan (Free, No signup) - Monthly Payments \| AICalculator` | 68 | 💳 贷款类 |
| 30 | `/fha-loan-calculator` | `FHA Loan Calculator (Free, No signup) - FHA Mortgage \| AICalculator` | 71 | 🏠 房产贷款 |

**完成后提交：** Commit message: `feat: SEO optimization batch 3 - Real estate & debt calculators`

---

## 📅 第4批 - 健身健康计算器 ⚡

**优先级：** P1 - 高优先级  
**预计流量占比：** 15%  
**预计完成时间：** 30-40 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 31 | `/bmr-calculator` | `BMR Calculator (Free, No signup) - Basal Metabolic Rate \| AICalculator` | 75 | 💪 健康 |
| 32 | `/tdee-calculator` | `TDEE Calculator (Free, No signup) - Daily Calories \| AICalculator` | 70 | 💪 健康 |
| 33 | `/macro-calculator` | `Macro Calculator (Free, No signup) - Macronutrients \| AICalculator` | 69 | 💪 健康 |
| 34 | `/protein-calculator` | `Protein Calculator (Free, No signup) - Daily Protein \| AICalculator` | 70 | 💪 健康 |
| 35 | `/weight-calculator` | `Weight Calculator (Free, No signup) - Ideal Weight \| AICalculator` | 69 | 💪 健康 |
| 36 | `/pace-calculator` | `Pace Calculator (Free, No signup) - Running Pace \| AICalculator` | 67 | 🏃 运动 |
| 37 | `/age-calculator` | `Age Calculator (Free, No signup) - Calculate Age \| AICalculator` | 67 | 📅 日期工具 |
| 38 | `/date-calculator` | `Date Calculator (Free, No signup) - Days Between \| AICalculator` | 68 | 📅 日期工具 |
| 39 | `/time-calculator` | `Time Calculator (Free, No signup) - Time Duration \| AICalculator` | 69 | ⏰ 时间工具 |
| 40 | `/tip-calculator` | `Tip Calculator (Free, No signup) - Gratuity \| AICalculator` | 63 | 🍴 生活工具 |

**完成后提交：** Commit message: `feat: SEO optimization batch 4 - Health & fitness calculators`

---

## 📅 第5批 - 数学科学计算器 ⚡

**优先级：** P1 - 高优先级  
**预计流量占比：** 12%  
**预计完成时间：** 30-40 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 41 | `/scientific-calculator` | `Scientific Calculator (Free, No signup) - Advanced Math \| AICalculator` | 74 | 🔬 科学 |
| 42 | `/fraction-calculator` | `Fraction Calculator (Free, No signup) - Simplify Fractions \| AICalculator` | 77 | ➗ 数学 |
| 43 | `/square-root-calculator` | `Square Root (Free, No signup) - Calculate Roots \| AICalculator` | 65 | √ 数学 |
| 44 | `/average-calculator` | `Average Calculator (Free, No signup) - Mean Median \| AICalculator` | 70 | 📊 统计 |
| 45 | `/standard-deviation-calculator` | `Standard Deviation (Free) - Statistical Analysis \| AICalculator` | 68 | 📊 统计 |
| 46 | `/area-calculator` | `Area Calculator (Free, No signup) - Calculate Area \| AICalculator` | 68 | 📐 几何 |
| 47 | `/volume-calculator` | `Volume Calculator (Free, No signup) - 3D Volume \| AICalculator` | 66 | 📦 几何 |
| 48 | `/pythagorean-calculator` | `Pythagorean Calculator (Free, No signup) - Right Triangle \| AICalculator` | 77 | 📐 几何 |
| 49 | `/quadratic-formula-calculator` | `Quadratic Formula (Free, No signup) - Solve Equations \| AICalculator` | 71 | 🔢 代数 |
| 50 | `/triangle-calculator` | `Triangle Calculator (Free, No signup) - Solve Triangles \| AICalculator` | 74 | 📐 几何 |

**完成后提交：** Commit message: `feat: SEO optimization batch 5 - Math & science calculators`

---

## 📅 第6批 - 转换器 + 单位工具 ⚡

**优先级：** P1 - 高优先级  
**预计流量占比：** 10%  
**预计完成时间：** 30-40 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 51 | `/unit-converter` | `Unit Converter (Free, No signup) - Convert Any Unit \| AICalculator` | 71 | 🔀 转换 |
| 52 | `/currency-converter` | `Currency Converter (Free, No signup) - Exchange Rates \| AICalculator` | 73 | 💱 货币 |
| 53 | `/square-footage-calculator` | `Square Footage (Free, No signup) - Calculate Area \| AICalculator` | 68 | 📏 测量 |
| 54 | `/discount-calculator` | `Discount Calculator (Free, No signup) - Sale Price \| AICalculator` | 70 | 🏷️ 购物 |
| 55 | `/interest-calculator` | `Interest Calculator (Free, No signup) - Compound Interest \| AICalculator` | 77 | 💰 金融 |
| 56 | `/payment-calculator` | `Payment Calculator (Free, No signup) - Monthly Payment \| AICalculator` | 73 | 💳 金融 |
| 57 | `/emi-calculator` | `EMI Calculator (Free, No signup) - Monthly EMI \| AICalculator` | 65 | 💳 金融 |
| 58 | `/amortization-calculator` | `Amortization (Free, No signup) - Payment Schedule \| AICalculator` | 68 | 💰 金融 |
| 59 | `/down-payment-calculator` | `Down Payment (Free, No signup) - Home Down Payment \| AICalculator` | 70 | 🏠 房产 |
| 60 | `/rent-calculator` | `Rent Calculator (Free, No signup) - Rent Affordability \| AICalculator` | 74 | 🏘️ 租房 |

**完成后提交：** Commit message: `feat: SEO optimization batch 6 - Converters & utility tools`

---

## 📅 第7批 - 高级金融计算器 ⚡

**优先级：** P1 - 高优先级  
**预计流量占比：** 8%  
**预计完成时间：** 30-40 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 61 | `/roth-ira-calculator` | `Roth IRA Calculator (Free, No signup) - Retirement \| AICalculator` | 70 | 🏦 退休 |
| 62 | `/ira-calculator` | `IRA Calculator (Free, No signup) - Traditional vs Roth \| AICalculator` | 73 | 🏦 退休 |
| 63 | `/va-mortgage-calculator` | `VA Mortgage (Free, No signup) - Veterans Loan \| AICalculator` | 65 | 🏠 房产 |
| 64 | `/canadian-mortgage-calculator` | `Canadian Mortgage (Free, No signup) - CMHC Calculator \| AICalculator` | 71 | 🏠 加拿大 |
| 65 | `/mortgage-calculator-uk` | `UK Mortgage (Free, No signup) - British Calculator \| AICalculator` | 67 | 🏠 英国 |
| 66 | `/property-tax-calculator` | `Property Tax (Free, No signup) - Annual Tax \| AICalculator` | 63 | 🏛️ 税务 |
| 67 | `/capital-gains-tax-calculator` | `Capital Gains Tax (Free) - Investment Tax \| AICalculator` | 62 | 📊 税务 |
| 68 | `/social-security-calculator` | `Social Security (Free, No signup) - Benefits \| AICalculator` | 64 | 👴 退休 |
| 69 | `/estate-tax-calculator` | `Estate Tax (Free, No signup) - Inheritance Tax \| AICalculator` | 67 | 🏛️ 税务 |
| 70 | `/vat-calculator` | `VAT Calculator (Free, No signup) - Value Added Tax \| AICalculator` | 71 | 🌍 税务 |

**完成后提交：** Commit message: `feat: SEO optimization batch 7 - Advanced financial calculators`

---

## 📅 第8批 - 工资薪酬计算器 ⚡

**优先级：** P1 - 高优先级  
**预计流量占比：** 7%  
**预计完成时间：** 30-40 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 71 | `/pay-calculator` | `Pay Calculator (Free, No signup) - Paycheck Calculator \| AICalculator` | 73 | 💰 工资 |
| 72 | `/payroll-calculator` | `Payroll Calculator (Free, No signup) - Net Pay \| AICalculator` | 66 | 💰 工资 |
| 73 | `/take-home-paycheck-calculator` | `Take Home Pay (Free, No signup) - After Tax Income \| AICalculator` | 70 | 💰 工资 |
| 74 | `/hourly-to-salary-calculator` | `Hourly to Salary (Free, No signup) - Annual Income \| AICalculator` | 70 | ⏰ 工资 |
| 75 | `/overtime-calculator` | `Overtime Calculator (Free, No signup) - OT Pay \| AICalculator` | 66 | ⏰ 工资 |
| 76 | `/commission-calculator` | `Commission Calculator (Free, No signup) - Sales Income \| AICalculator` | 73 | 💹 销售 |
| 77 | `/pension-calculator` | `Pension Calculator (Free, No signup) - Retirement Income \| AICalculator` | 75 | 🏦 退休 |
| 78 | `/sales-tax-calculator` | `Sales Tax Calculator (Free, No signup) - Tax Amount \| AICalculator` | 70 | 🧾 税务 |
| 79 | `/apr-calculator` | `APR Calculator (Free, No signup) - Annual Rate \| AICalculator` | 65 | 📊 金融 |
| 80 | `/apr-vs-apy-calculator` | `APR vs APY (Free, No signup) - Interest Comparison \| AICalculator` | 70 | 📈 金融 |

**完成后提交：** Commit message: `feat: SEO optimization batch 8 - Salary & payroll calculators`

---

## 📅 第9批 - 健康专项计算器 📊

**优先级：** P2 - 中等优先级  
**预计流量占比：** 6%  
**预计完成时间：** 25-35 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 81 | `/pregnancy-calculator` | `Pregnancy Calculator (Free, No signup) - Due Date \| AICalculator` | 70 | 🤰 怀孕 |
| 82 | `/due-date-calculator` | `Due Date Calculator (Free, No signup) - Baby Due Date \| AICalculator` | 73 | 🤰 怀孕 |
| 83 | `/ovulation-calculator` | `Ovulation Calculator (Free, No signup) - Fertile Days \| AICalculator` | 73 | 🌸 生育 |
| 84 | `/period-calculator` | `Period Calculator (Free, No signup) - Cycle Tracker \| AICalculator` | 69 | 📅 生理 |
| 85 | `/bac-calculator` | `BAC Calculator (Free, No signup) - Blood Alcohol \| AICalculator` | 68 | 🍺 健康 |
| 86 | `/gfr-calculator` | `GFR Calculator (Free, No signup) - Kidney Function \| AICalculator` | 70 | 🩺 医疗 |
| 87 | `/body-surface-area-calculator` | `Body Surface Area (Free, No signup) - BSA Calculator \| AICalculator` | 71 | 📏 医疗 |
| 88 | `/lean-body-mass-calculator` | `Lean Body Mass (Free, No signup) - LBM Calculator \| AICalculator` | 69 | 💪 健身 |
| 89 | `/ideal-weight-calculator` | `Ideal Weight (Free, No signup) - Target Weight \| AICalculator` | 66 | ⚖️ 健康 |
| 90 | `/army-body-fat-calculator` | `Army Body Fat (Free, No signup) - Military Standards \| AICalculator` | 71 | 🎖️ 军事 |

**完成后提交：** Commit message: `feat: SEO optimization batch 9 - Specialized health calculators`

---

## 📅 第10批 - 运动健身计算器 📊

**优先级：** P2 - 中等优先级  
**预计流量占比：** 5%  
**预计完成时间：** 25-35 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 91 | `/calories-burned-calculator` | `Calories Burned (Free, No signup) - Exercise Calories \| AICalculator` | 74 | 🔥 运动 |
| 92 | `/one-rep-max-calculator` | `One Rep Max (Free, No signup) - 1RM Calculator \| AICalculator` | 65 | 💪 力量 |
| 93 | `/target-heart-rate-calculator` | `Target Heart Rate (Free, No signup) - Training Zones \| AICalculator` | 72 | ❤️ 心率 |
| 94 | `/vo2-max-calculator` | `VO2 Max Calculator (Free, No signup) - Fitness Level \| AICalculator` | 71 | 🫁 有氧 |
| 95 | `/running-calculator` | `Running Calculator (Free, No signup) - Pace Time \| AICalculator` | 68 | 🏃 跑步 |
| 96 | `/swimming-calculator` | `Swimming Calculator (Free, No signup) - Swim Pace \| AICalculator` | 69 | 🏊 游泳 |
| 97 | `/cycling-calculator` | `Cycling Calculator (Free, No signup) - Bike Speed \| AICalculator` | 69 | 🚴 骑行 |
| 98 | `/carbohydrate-calculator` | `Carbohydrate Calculator (Free, No signup) - Daily Carbs \| AICalculator` | 75 | 🍞 营养 |
| 99 | `/fat-intake-calculator` | `Fat Intake Calculator (Free, No signup) - Daily Fats \| AICalculator` | 72 | 🥑 营养 |
| 100 | `/pregnancy-weight-gain-calculator` | `Pregnancy Weight Gain (Free) - Healthy Gain \| AICalculator` | 64 | 🤰 孕期 |

**完成后提交：** Commit message: `feat: SEO optimization batch 10 - Exercise & fitness calculators`

---

## 📅 第11批 - 投资理财计算器 📊

**优先级：** P2 - 中等优先级  
**预计流量占比：** 5%  
**预计完成时间：** 25-35 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 101 | `/rental-property-calculator` | `Rental Property (Free, No signup) - Investment Analysis \| AICalculator` | 76 | 🏢 房产投资 |
| 102 | `/bond-calculator` | `Bond Calculator (Free, No signup) - Bond Valuation \| AICalculator` | 70 | 📊 债券 |
| 103 | `/cd-calculator` | `CD Calculator (Free, No signup) - Certificate Deposit \| AICalculator` | 72 | 🏦 存款 |
| 104 | `/annuity-calculator` | `Annuity Calculator (Free, No signup) - Retirement Income \| AICalculator` | 75 | 🏖️ 年金 |
| 105 | `/future-value-calculator` | `Future Value (Free, No signup) - Investment Growth \| AICalculator` | 69 | 📈 投资 |
| 106 | `/present-value-calculator` | `Present Value (Free, No signup) - NPV Calculator \| AICalculator` | 67 | 📉 投资 |
| 107 | `/cash-flow-calculator` | `Cash Flow Calculator (Free, No signup) - DCF Analysis \| AICalculator` | 71 | 💵 财务 |
| 108 | `/average-return-calculator` | `Average Return (Free, No signup) - CAGR Calculator \| AICalculator` | 68 | 📈 投资 |
| 109 | `/rmd-calculator` | `RMD Calculator (Free, No signup) - Required Distribution \| AICalculator` | 75 | 🏦 退休 |
| 110 | `/college-cost-calculator` | `College Cost (Free, No signup) - Education Planning \| AICalculator` | 71 | 🎓 教育 |

**完成后提交：** Commit message: `feat: SEO optimization batch 11 - Investment & planning calculators`

---

## 📅 第12批 - 信用债务计算器 📊

**优先级：** P2 - 中等优先级  
**预计流量占比：** 4%  
**预计完成时间：** 25-35 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 111 | `/balance-transfer-calculator` | `Balance Transfer (Free, No signup) - Save on Interest \| AICalculator` | 73 | 🔄 信用卡 |
| 112 | `/minimum-payment-calculator` | `Minimum Payment (Free, No signup) - Credit Card Debt \| AICalculator` | 73 | ⚠️ 信用卡 |
| 113 | `/credit-utilization-calculator` | `Credit Utilization (Free, No signup) - Usage Ratio \| AICalculator` | 71 | 💳 信用 |
| 114 | `/late-fee-calculator` | `Late Fee Calculator (Free, No signup) - Penalty Charges \| AICalculator` | 74 | ⚠️ 费用 |
| 115 | `/dti-calculator` | `DTI Calculator (Free, No signup) - Debt to Income \| AICalculator` | 68 | 📊 债务比率 |
| 116 | `/home-loan-calculator` | `Home Loan Calculator (Free, No signup) - House Loan \| AICalculator` | 70 | 🏠 房贷 |
| 117 | `/business-loan-calculator` | `Business Loan (Free, No signup) - Commercial Loan \| AICalculator` | 69 | 🏢 商业 |
| 118 | `/boat-loan-calculator` | `Boat Loan Calculator (Free, No signup) - Marine Financing \| AICalculator` | 77 | ⛵ 船贷 |
| 119 | `/cash-back-calculator` | `Cash Back Calculator (Free, No signup) - Auto Rebate \| AICalculator` | 70 | 🚗 汽车 |
| 120 | `/lease-calculator` | `Lease Calculator (Free, No signup) - Lease vs Buy \| AICalculator` | 68 | 🚗 租赁 |

**完成后提交：** Commit message: `feat: SEO optimization batch 12 - Credit & debt calculators`

---

## 📅 第13批 - 商业财务计算器 📊

**优先级：** P2 - 中等优先级  
**预计流量占比：** 3%  
**预计完成时间：** 25-35 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 121 | `/breakeven-calculator` | `Break Even Calculator (Free, No signup) - Profit Point \| AICalculator` | 74 | 🎯 商业 |
| 122 | `/profit-margin-calculator` | `Profit Margin (Free, No signup) - Business Profitability \| AICalculator` | 76 | 💰 利润 |
| 123 | `/markup-calculator` | `Markup Calculator (Free, No signup) - Pricing Strategy \| AICalculator` | 73 | 🏷️ 定价 |
| 124 | `/depreciation-calculator` | `Depreciation Calculator (Free, No signup) - Asset Value \| AICalculator` | 73 | 📉 资产 |
| 125 | `/marriage-tax-calculator` | `Marriage Tax (Free, No signup) - Tax Impact \| AICalculator` | 63 | 💑 税务 |
| 126 | `/time-card-calculator` | `Time Card Calculator (Free, No signup) - Hours Worked \| AICalculator` | 73 | ⏱️ 考勤 |
| 127 | `/fico-score-estimator` | `FICO Score Estimator (Free, No signup) - Credit Score \| AICalculator` | 73 | 📊 信用 |
| 128 | `/grade-calculator` | `Grade Calculator (Free, No signup) - Final Grade \| AICalculator` | 68 | 📝 学业 |
| 129 | `/gpa-calculator` | `GPA Calculator (Free, No signup) - Grade Point Average \| AICalculator` | 73 | 🎓 学业 |
| 130 | `/password-generator` | `Password Generator (Free, No signup) - Strong Passwords \| AICalculator` | 75 | 🔒 安全 |

**完成后提交：** Commit message: `feat: SEO optimization batch 13 - Business & utility calculators`

---

## 📅 第14批 - 数学统计计算器 📊

**优先级：** P2 - 中等优先级  
**预计流量占比：** 3%  
**预计完成时间：** 25-35 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 131 | `/statistics-calculator` | `Statistics Calculator (Free, No signup) - Data Analysis \| AICalculator` | 75 | 📊 统计 |
| 132 | `/probability-calculator` | `Probability Calculator (Free, No signup) - Odds \| AICalculator` | 67 | 🎲 概率 |
| 133 | `/sample-size-calculator` | `Sample Size Calculator (Free, No signup) - Statistics \| AICalculator` | 73 | 📊 抽样 |
| 134 | `/z-score-calculator` | `Z-Score Calculator (Free, No signup) - Standard Score \| AICalculator` | 72 | 📈 统计 |
| 135 | `/confidence-interval-calculator` | `Confidence Interval (Free) - Statistical Analysis \| AICalculator` | 68 | 📊 统计 |
| 136 | `/p-value-calculator` | `P-Value Calculator (Free, No signup) - Significance Test \| AICalculator` | 75 | 🔬 统计 |
| 137 | `/ratio-calculator` | `Ratio Calculator (Free, No signup) - Proportions \| AICalculator` | 68 | ⚖️ 比例 |
| 138 | `/percent-error-calculator` | `Percent Error (Free, No signup) - Error Calculation \| AICalculator` | 71 | 🔬 误差 |
| 139 | `/lcm-calculator` | `LCM Calculator (Free, No signup) - Least Common Multiple \| AICalculator` | 76 | 🔢 数学 |
| 140 | `/gcf-calculator` | `GCF Calculator (Free, No signup) - Greatest Common Factor \| AICalculator` | 77 | 🔢 数学 |

**完成后提交：** Commit message: `feat: SEO optimization batch 14 - Math & statistics calculators`

---

## 📅 第15批 - 高级数学计算器 📊

**优先级：** P2 - 中等优先级  
**预计流量占比：** 2%  
**预计完成时间：** 25-35 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 141 | `/factor-calculator` | `Factor Calculator (Free, No signup) - Find Factors \| AICalculator` | 70 | 🔢 因数 |
| 142 | `/prime-factorization-calculator` | `Prime Factorization (Free, No signup) - Prime Factors \| AICalculator` | 74 | 🔢 质因数 |
| 143 | `/permutation-combination-calculator` | `Permutation & Combination (Free) - nPr nCr \| AICalculator` | 63 | 🔢 排列组合 |
| 144 | `/matrix-calculator` | `Matrix Calculator (Free, No signup) - Linear Algebra \| AICalculator` | 72 | 🔤 矩阵 |
| 145 | `/logarithm-calculator` | `Logarithm Calculator (Free, No signup) - Log Calculator \| AICalculator` | 74 | 📊 对数 |
| 146 | `/exponent-calculator` | `Exponent Calculator (Free, No signup) - Power Calculator \| AICalculator` | 75 | ⚡ 指数 |
| 147 | `/root-calculator` | `Root Calculator (Free, No signup) - Nth Root \| AICalculator` | 64 | √ 根式 |
| 148 | `/slope-calculator` | `Slope Calculator (Free, No signup) - Line Slope \| AICalculator` | 68 | 📐 斜率 |
| 149 | `/distance-calculator` | `Distance Calculator (Free, No signup) - Point Distance \| AICalculator` | 73 | 📏 距离 |
| 150 | `/circle-calculator` | `Circle Calculator (Free, No signup) - Area Circumference \| AICalculator` | 76 | ⭕ 圆形 |

**完成后提交：** Commit message: `feat: SEO optimization batch 15 - Advanced math calculators`

---

## 📅 第16批 - 编程工具计算器 📝

**优先级：** P3 - 补充优化  
**预计流量占比：** 2%  
**预计完成时间：** 20-30 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 151 | `/binary-calculator` | `Binary Calculator (Free, No signup) - Binary Conversion \| AICalculator` | 75 | 💻 二进制 |
| 152 | `/hex-calculator` | `Hex Calculator (Free, No signup) - Hexadecimal \| AICalculator` | 67 | 🔢 十六进制 |
| 153 | `/basic-calculator` | `Basic Calculator (Free, No signup) - Simple Math \| AICalculator` | 69 | 🔢 基础 |
| 154 | `/graphing-calculator` | `Graphing Calculator (Free, No signup) - Plot Functions \| AICalculator` | 75 | 📈 图形 |
| 155 | `/scientific-notation-calculator` | `Scientific Notation (Free) - E Notation \| AICalculator` | 60 | 🔬 科学记数 |
| 156 | `/rounding-calculator` | `Rounding Calculator (Free, No signup) - Round Numbers \| AICalculator` | 74 | 🔄 取整 |
| 157 | `/random-number-generator` | `Random Number Generator (Free, No signup) - RNG \| AICalculator` | 67 | 🎲 随机数 |
| 158 | `/roman-numeral-converter` | `Roman Numeral Converter (Free, No signup) - I V X \| AICalculator` | 70 | 🏛️ 罗马数字 |
| 159 | `/big-number-calculator` | `Big Number Calculator (Free, No signup) - Large Numbers \| AICalculator` | 75 | 🔢 大数 |
| 160 | `/long-division-calculator` | `Long Division (Free, No signup) - Division Steps \| AICalculator` | 69 | ➗ 长除法 |

**完成后提交：** Commit message: `feat: SEO optimization batch 16 - Programming & utility calculators`

---

## 📅 第17批 - 科学工程计算器 📝

**优先级：** P3 - 补充优化  
**预计流量占比：** 2%  
**预计完成时间：** 20-30 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 161 | `/number-sequence-calculator` | `Number Sequence (Free, No signup) - Pattern Finder \| AICalculator` | 71 | 🔢 数列 |
| 162 | `/half-life-calculator` | `Half-Life Calculator (Free, No signup) - Decay Rate \| AICalculator` | 71 | ⚛️ 半衰期 |
| 163 | `/surface-area-calculator` | `Surface Area (Free, No signup) - 3D Surface \| AICalculator` | 65 | 📐 表面积 |
| 164 | `/voltage-drop-calculator` | `Voltage Drop (Free, No signup) - Wire Sizing \| AICalculator` | 66 | ⚡ 电压降 |
| 165 | `/resistor-calculator` | `Resistor Calculator (Free, No signup) - Color Code \| AICalculator` | 71 | ⚡ 电阻 |
| 166 | `/mass-calculator` | `Mass Calculator (Free, No signup) - Weight Calculation \| AICalculator` | 74 | ⚖️ 质量 |
| 167 | `/density-calculator` | `Density Calculator (Free, No signup) - Mass Volume \| AICalculator` | 70 | 🧪 密度 |
| 168 | `/speed-calculator` | `Speed Calculator (Free, No signup) - Velocity \| AICalculator` | 64 | ⚡ 速度 |
| 169 | `/molarity-calculator` | `Molarity Calculator (Free, No signup) - Chemistry \| AICalculator` | 69 | 🧪 摩尔浓度 |
| 170 | `/molecular-weight-calculator` | `Molecular Weight (Free, No signup) - Molar Mass \| AICalculator` | 68 | 🧬 分子量 |

**完成后提交：** Commit message: `feat: SEO optimization batch 17 - Science & engineering calculators`

---

## 📅 第18批 - 建筑施工计算器 📝

**优先级：** P3 - 补充优化  
**预计流量占比：** 1%  
**预计完成时间：** 20-30 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 171 | `/concrete-calculator` | `Concrete Calculator (Free, No signup) - Volume Needed \| AICalculator` | 74 | 🏗️ 混凝土 |
| 172 | `/tile-calculator` | `Tile Calculator (Free, No signup) - Flooring Tiles \| AICalculator` | 70 | 🏠 瓷砖 |
| 173 | `/mulch-calculator` | `Mulch Calculator (Free, No signup) - Garden Mulch \| AICalculator` | 69 | 🌱 覆盖物 |
| 174 | `/roofing-calculator` | `Roofing Calculator (Free, No signup) - Roof Area \| AICalculator` | 69 | 🏠 屋顶 |
| 175 | `/fuel-cost-calculator` | `Fuel Cost Calculator (Free, No signup) - Trip Cost \| AICalculator` | 70 | 🚗 燃油 |
| 176 | `/gas-mileage-calculator` | `Gas Mileage (Free, No signup) - Fuel Efficiency \| AICalculator` | 68 | ⛽ 油耗 |
| 177 | `/mileage-calculator` | `Mileage Calculator (Free, No signup) - Trip Distance \| AICalculator` | 72 | 🚗 里程 |
| 178 | `/golf-handicap-calculator` | `Golf Handicap (Free, No signup) - USGA Calculator \| AICalculator` | 69 | ⛳ 高尔夫 |
| 179 | `/sleep-calculator` | `Sleep Calculator (Free, No signup) - Sleep Cycles \| AICalculator` | 69 | 😴 睡眠 |
| 180 | `/height-calculator` | `Height Calculator (Free, No signup) - Child Height \| AICalculator` | 69 | 📏 身高 |

**完成后提交：** Commit message: `feat: SEO optimization batch 18 - Construction & lifestyle calculators`

---

## 📅 第19批 - 分类页面 + 最后补充 📝

**优先级：** P3 - 补充优化  
**预计流量占比：** 1%  
**预计完成时间：** 20-30 分钟

| # | 页面路径 | 标题模板 | 字符数 | 备注 |
|---|---------|---------|-------|------|
| 181 | `/time-zone-calculator` | `Time Zone Calculator (Free, No signup) - World Time \| AICalculator` | 72 | 🌍 时区 |
| 182 | `/day-of-week-calculator` | `Day of Week (Free, No signup) - Weekday Finder \| AICalculator` | 68 | 📆 星期 |
| 183 | `/shoe-size-conversion` | `Shoe Size Conversion (Free, No signup) - US EU UK \| AICalculator` | 70 | 👟 鞋码 |
| 184 | `/calculators` | `Free Calculators (No signup) - 250+ Calculator Tools \| AICalculator` | 73 | 📂 分类页 |
| 185 | `/financial` | `Financial Calculators (Free, No signup) - 60+ Tools \| AICalculator` | 72 | 💰 金融分类 |
| 186 | `/health-fitness` | `Health Calculators (Free, No signup) - 40+ Fitness Tools \| AICalculator` | 76 | 💪 健康分类 |
| 187 | `/math-numbers` | `Math Calculators (Free, No signup) - 50+ Math Tools \| AICalculator` | 71 | 🔢 数学分类 |
| 188 | `/date-time` | `Date & Time Calculators (Free, No signup) - Time Tools \| AICalculator` | 73 | ⏰ 时间分类 |
| 189 | `/` (首页-复查) | `AICalculator (Free, No signup) - 250+ Online Calculators` | 61 | 🏠 首页复查 |

**完成后提交：** Commit message: `feat: SEO optimization batch 19 - Category pages & final batch (COMPLETE)`

---

## 🎯 执行清单模板（每批使用）

### ✅ 执行前检查：

- [ ] 确认要修改的 10 个页面路径
- [ ] 准备好标题模板
- [ ] 确保 `config/site.ts` 中的 `getUrl()` 函数可用

### ✅ 执行步骤：

**对每个页面执行以下 4 步：**

1. **打开文件：** `app/[calculator-name]/page.tsx`

2. **修改 4 处：**
   ```typescript
   // ① 修改主标题
   title: "[Calculator Name] (Free, No signup) - [Benefit] | AICalculator",
   
   // ② 修改 OG 标题
   openGraph: { title: "[Calculator Name] (Free, No signup) - AICalculator" }
   
   // ③ 修改 Twitter 标题
   twitter: { title: "[Calculator Name] (Free, No signup) - AICalculator" }
   
   // ④ 添加 Canonical
   alternates: { canonical: getUrl('/calculator-path') }
   ```

3. **检查字符数：** 确保主标题 ≤ 70 字符

4. **保存文件**

### ✅ 完成后：

- [ ] 本地测试：`npm run dev`
- [ ] 检查 3-5 个页面的源代码
- [ ] 提交 Git：`git add . && git commit -m "feat: SEO batch X - description"`
- [ ] 推送到 GitHub：`git push origin main`

---

## 📊 整体进度追踪

| 批次 | 状态 | 页面数 | 完成日期 | Git Commit |
|-----|------|-------|----------|-----------|
| 第1批 | ⏳ 待执行 | 10 | - | - |
| 第2批 | ⏳ 待执行 | 10 | - | - |
| 第3批 | ⏳ 待执行 | 10 | - | - |
| 第4批 | ⏳ 待执行 | 10 | - | - |
| 第5批 | ⏳ 待执行 | 10 | - | - |
| 第6批 | ⏳ 待执行 | 10 | - | - |
| 第7批 | ⏳ 待执行 | 10 | - | - |
| 第8批 | ⏳ 待执行 | 10 | - | - |
| 第9批 | ⏳ 待执行 | 10 | - | - |
| 第10批 | ⏳ 待执行 | 10 | - | - |
| 第11批 | ⏳ 待执行 | 10 | - | - |
| 第12批 | ⏳ 待执行 | 10 | - | - |
| 第13批 | ⏳ 待执行 | 10 | - | - |
| 第14批 | ⏳ 待执行 | 10 | - | - |
| 第15批 | ⏳ 待执行 | 10 | - | - |
| 第16批 | ⏳ 待执行 | 10 | - | - |
| 第17批 | ⏳ 待执行 | 10 | - | - |
| 第18批 | ⏳ 待执行 | 10 | - | - |
| 第19批 | ⏳ 待执行 | 9 | - | - |
| **合计** | **0%** | **189** | - | - |

---

## 🎯 预期效果时间线

| 时间节点 | 完成批次 | 优化页面 | 预期 Google 索引 | 预期流量提升 |
|---------|---------|---------|----------------|------------|
| **Day 1** | 第1-3批 | 30页 (核心) | 5-10页 | +10-15% |
| **Day 3** | 第1-6批 | 60页 | 15-25页 | +20-30% |
| **Day 7** | 第1-10批 | 100页 | 30-50页 | +35-50% |
| **Day 14** | 全部19批 | 189页 | 80-120页 | +60-80% |
| **Day 30** | - | 189页 | 150-189页 | +100-150% |

---

## 📝 注意事项

### ⚠️ 标题长度控制

- **安全区：** 50-60 字符
- **最大：** 不超过 70 字符
- **如果超过：** 简化 benefit 部分或使用 `(Free)` 代替 `(Free, No signup)`

### ⚠️ 特殊情况处理

**名称特别长的计算器（超过 30 字符）：**
```typescript
// ❌ 太长
title: "Capital Gains Tax Calculator (Free, No signup) - Investment Tax | AICalculator"
// 85 字符 ❌

// ✅ 简化标签
title: "Capital Gains Tax Calculator (Free) - Investment Tax | AICalculator"
// 73 字符 ✅
```

### ⚠️ 保持一致性

所有页面统一使用：
- ✅ `(Free, No signup)` - 标准版本
- ✅ `(Free)` - 简化版本（仅名称长时使用）
- ❌ 不要使用其他变体

---

## 🚀 开始执行

**当你准备好后，告诉我：**

> "开始执行第 X 批"

我会立即为你完成该批次的 10 个页面优化！💪

---

**创建时间：** 2024-11-19  
**最后更新：** 2024-11-19  
**总页面数：** 189 个  
**预计完成时间：** 7-14 天（每天 2-3 批）

