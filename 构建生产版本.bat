@echo off
chcp 65001 >nul
title AI Calculator - 构建生产版本
color 0D

echo.
echo ========================================
echo    构建生产版本
echo ========================================
echo.

:: 切换到项目目录
cd /d "%~dp0"

:: 检查依赖
if not exist "node_modules\" (
    echo [!] 未安装依赖，正在安装...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败！
        pause
        exit /b 1
    )
)

:: 构建
echo.
echo [执行] npm run build
echo.

call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    ✓ 构建成功！
    echo ========================================
    echo.
    echo 生产文件位于 .next 目录
    echo.
    echo 运行生产服务器:
    echo   npm run start
) else (
    echo.
    echo ========================================
    echo    ✗ 构建失败！
    echo ========================================
)

echo.
pause

