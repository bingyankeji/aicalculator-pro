@echo off
echo ========================================
echo AICalculator.pro 部署脚本
echo ========================================

echo 1. 安装依赖...
call npm install

echo 2. 构建生产版本...
call npm run build

echo 3. 检查构建结果...
if exist ".next" (
    echo ✅ 构建成功！
) else (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo 4. 启动生产服务器...
call npm start

pause
