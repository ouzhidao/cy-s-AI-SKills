@echo off
chcp 65001 >nul
cd /d "F:\软件\SKILLs"

echo.
echo ===== Git 一键上传 =====
echo.

REM 显示当前修改了哪些文件
git status --short

echo.
set /p msg="请输入本次修改描述（直接回车使用默认描述）: "
if "%msg%"=="" set msg="更新 skill 文件"

echo.
echo 正在保存...
git add .
git commit -m "%msg%"

echo.
echo 正在上传到 GitHub...
git push

echo.
echo ===== 上传完成 =====
pause
