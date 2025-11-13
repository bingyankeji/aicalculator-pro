# 环境变量配置说明

## 🔒 汇率API密钥配置

为了保障API密钥的安全性，我们使用环境变量来存储敏感信息。

### 配置步骤

#### 1. 创建 `.env.local` 文件

在项目根目录创建 `.env.local` 文件（此文件已在 `.gitignore` 中，不会被提交到Git）：

```bash
# 在项目根目录执行
touch .env.local
```

#### 2. 添加API密钥

在 `.env.local` 文件中添加以下内容：

```env
# Exchange Rate API Key
# 您的API密钥（从图片中获取）
EXCHANGE_RATE_API_KEY=3c87fe3b412edfe9dd10c41a

# 可选：自定义缓存时间（毫秒）
# 默认：86400000（24小时）
# EXCHANGE_RATE_CACHE_DURATION=86400000
```

#### 3. 重启开发服务器

修改环境变量后，需要重启Next.js开发服务器：

```bash
# 停止当前服务（Ctrl + C）
# 然后重新启动
npm run dev
```

---

## 🛡️ 安全性保障

### 为什么使用环境变量？

| 方式 | 安全性 | 说明 |
|------|--------|------|
| ❌ **硬编码在代码中** | 极低 | API密钥会暴露在Git历史、代码审查、部署日志中 |
| ✅ **环境变量** | 高 | 密钥只存在于本地和服务器，不会进入版本控制 |

### `.env.local` vs `.env`

- **`.env.local`**：本地开发使用，**不会被Git追踪**（已在 `.gitignore`）
- **`.env`**：示例文件，可以提交到Git（不包含真实密钥）
- **`.env.example`**：模板文件，告诉其他开发者需要哪些环境变量

### Git安全检查

确保 `.env.local` 已在 `.gitignore` 中：

```bash
# 查看 .gitignore 内容
cat .gitignore | grep -E "\.env\.local|\.env\*\.local"
```

应该看到类似这样的行：
```
.env*.local
```

---

## 🚀 生产环境配置

### Vercel 部署

1. 进入 Vercel 项目设置
2. 找到 **Environment Variables**
3. 添加变量：
   - **Key**: `EXCHANGE_RATE_API_KEY`
   - **Value**: `3c87fe3b412edfe9dd10c41a`
   - **Environment**: Production

### 其他平台（Netlify, AWS, etc.）

参考各平台的环境变量配置文档，添加相同的环境变量。

---

## 📊 API使用情况监控

### 免费tier限制

- **每月请求数**：1,500次
- **当前配置**：每日更新1次 = 30次/月
- **剩余额度**：1,470次（可用于其他用途）

### 监控API使用

访问：https://www.exchangerate-api.com/dashboard

在您的仪表板中可以看到：
- ✅ 可用请求数：1,500
- ✅ 今日已使用：0
- ✅ 本月已使用：0
- ✅ 下次重置：8th（每月8号）

---

## 🔧 开发模式配置

### 无需API密钥也能开发

如果 `.env.local` 中没有配置 `EXCHANGE_RATE_API_KEY`，系统会：

1. 使用免费的公共API端点（有限制）
2. 或使用内置的备用汇率（离线模式）

这样新加入的开发者无需立即配置API密钥即可开发。

### API切换逻辑

```typescript
// 代码中的实现（已完成）
const apiUrl = API_KEY 
  ? `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`  // 有密钥：使用付费API
  : 'https://open.exchangerate-api.com/v6/latest/USD';           // 无密钥：使用免费API
```

---

## ✅ 验证配置

### 1. 检查环境变量是否加载

在 `app/api/exchange-rates/route.ts` 中临时添加日志：

```typescript
console.log('API Key status:', API_KEY ? 'Loaded ✅' : 'Missing ❌');
```

### 2. 测试API调用

访问：`http://localhost:3000/api/exchange-rates`

应该返回类似：

```json
{
  "rates": {
    "USD": 1,
    "EUR": 0.92,
    ...
  },
  "timestamp": 1699564800000,
  "source": "api"  // 如果看到"api"说明成功调用了API
}
```

### 3. 检查汇率状态指示器

在Currency Converter页面，应该看到：
- 🟢 **Live** - API调用成功
- 🔵 **Cached** - 使用24小时内的缓存
- 🟠 **Backup** - API失败，使用备用汇率

---

## 🔥 常见问题

### Q: 如何获取API密钥？

**A:** 您已经有了！从截图中看，您的密钥是：`3c87fe3b412edfe9dd10c41a`

### Q: API密钥会过期吗？

**A:** 免费tier的密钥不会过期，但有月度请求限制（1,500次）。

### Q: 如何更换API提供商？

**A:** 修改 `app/api/exchange-rates/route.ts` 中的 `apiUrl` 即可。

### Q: 生产环境如何保护密钥？

**A:** Vercel/Netlify等平台会自动加密环境变量，只有服务器端代码能访问。

---

## 📚 相关文档

- [exchangerate-api.com 官方文档](https://www.exchangerate-api.com/docs)
- [Next.js 环境变量指南](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel 环境变量配置](https://vercel.com/docs/concepts/projects/environment-variables)

---

## 🎯 总结

✅ **安全性**：API密钥存储在 `.env.local`，不会进入Git  
✅ **更新频率**：每日更新1次（从每小时改为每天）  
✅ **降级策略**：API失败时自动使用备用汇率  
✅ **监控**：可在仪表板查看API使用情况  

**配置完成后，您的Currency Converter就可以安全地使用实时汇率了！** 🎉

