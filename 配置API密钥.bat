@echo off
chcp 65001 >nul
echo ========================================
echo   Currency Converter API密钥配置助手
echo ========================================
echo.

REM 检查.env.local是否已存在
if exist .env.local (
    echo [警告] .env.local 文件已存在！
    echo.
    set /p overwrite="是否要覆盖现有配置？(Y/N): "
    if /i not "%overwrite%"=="Y" (
        echo 配置已取消。
        pause
        exit /b
    )
)

echo 正在创建 .env.local 文件...
echo.

REM 创建.env.local文件
(
echo # Exchange Rate API Configuration
echo # Generated on %date% %time%
echo # API Key from: https://www.exchangerate-api.com/
echo.
echo # Your API Key
echo EXCHANGE_RATE_API_KEY=3c87fe3b412edfe9dd10c41a
echo.
echo # Cache Duration ^(24 hours in milliseconds^)
echo # EXCHANGE_RATE_CACHE_DURATION=86400000
) > .env.local

if %errorlevel% equ 0 (
    echo [成功] .env.local 文件已创建！
    echo.
    echo ✅ API密钥已配置：3c87fe3b412edfe9dd10c41a
    echo ✅ 汇率更新频率：每天1次
    echo ✅ 月度请求限制：1,500次
    echo ✅ 预计月使用量：约30次
    echo.
    echo ========================================
    echo   下一步操作
    echo ========================================
    echo.
    echo 1. 如果开发服务器正在运行，请重启：
    echo    - 按 Ctrl+C 停止
    echo    - 运行: npm run dev
    echo.
    echo 2. 访问测试页面：
    echo    http://localhost:3000/currency-converter
    echo.
    echo 3. 查看API状态：
    echo    http://localhost:3000/api/exchange-rates
    echo.
    echo 4. 详细配置说明请查看：ENV_SETUP.md
    echo.
) else (
    echo [错误] 创建文件失败！
    echo 请手动创建 .env.local 文件并添加以下内容：
    echo.
    echo EXCHANGE_RATE_API_KEY=3c87fe3b412edfe9dd10c41a
    echo.
)

echo ========================================
pause

