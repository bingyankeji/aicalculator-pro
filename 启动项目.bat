@echo off
chcp 65001 >nul
title AI Calculator - 开发服务器
color 0A

echo.
echo ========================================
echo    AI Calculator - 项目启动脚本
echo ========================================
echo.

:: 切换到项目目录
cd /d "%~dp0"

:: 检查 Node.js 是否安装
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js！
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js 版本:
node --version
echo.

:: 检查 npm 是否安装
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 npm！
    pause
    exit /b 1
)

echo [✓] npm 版本:
npm --version
echo.

:: 检查 node_modules 是否存在
if not exist "node_modules\" (
    echo [!] 检测到首次运行，正在安装依赖...
    echo.
    echo [执行] npm install
    echo.
    call npm install
    
    if %errorlevel% neq 0 (
        echo.
        echo [错误] 依赖安装失败！
        pause
        exit /b 1
    )
    
    echo.
    echo [✓] 依赖安装完成！
    echo.
) else (
    echo [✓] 依赖已安装
    echo.
)

:: 启动开发服务器
echo ========================================
echo    正在启动开发服务器...
echo    端口: 3001
echo    地址: http://localhost:3001
echo ========================================
echo.
echo [提示] 按 Ctrl+C 可停止服务器
echo.

call npm run dev

:: 如果服务器意外退出
if %errorlevel% neq 0 (
    echo.
    echo [错误] 服务器启动失败！
    pause
    exit /b 1
)

pause

