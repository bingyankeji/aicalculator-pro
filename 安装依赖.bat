@echo off
chcp 65001 >nul
title AI Calculator - 安装依赖
color 0E

echo.
echo ========================================
echo    安装项目依赖
echo ========================================
echo.

:: 切换到项目目录
cd /d "%~dp0"

:: 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 Node.js！
    echo 请访问: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js 版本: 
node --version
echo.

echo npm 版本:
npm --version
echo.

:: 清理旧的依赖（可选）
if exist "node_modules\" (
    echo [?] 检测到已有 node_modules 目录
    set /p clean="是否清理后重新安装? (Y/N): "
    if /i "%clean%"=="Y" (
        echo 正在清理...
        rmdir /s /q node_modules
        if exist "package-lock.json" del /f /q package-lock.json
    )
)

:: 安装依赖
echo.
echo [执行] npm install
echo.
echo 请稍候，这可能需要几分钟...
echo.

call npm install

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    ✓ 依赖安装成功！
    echo ========================================
    echo.
    echo 现在可以运行 "启动项目.bat" 启动开发服务器
) else (
    echo.
    echo ========================================
    echo    ✗ 依赖安装失败！
    echo ========================================
    echo.
    echo 请检查网络连接或尝试以下命令:
    echo   npm install --registry=https://registry.npmmirror.com
)

echo.
pause

