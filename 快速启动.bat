@echo off
chcp 65001 >nul
title AI Calculator - 快速启动
color 0B

:: 切换到项目目录
cd /d "%~dp0"

echo.
echo 正在启动 AI Calculator...
echo.

:: 检查依赖
if not exist "node_modules\" (
    echo 首次运行，正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo 安装失败！
        pause
        exit /b 1
    )
)

:: 启动服务
echo 启动开发服务器 (端口 3001)...
echo.
start http://localhost:3001
call npm run dev

pause

