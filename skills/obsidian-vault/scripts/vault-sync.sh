#!/bin/bash
# Obsidian Vault Git 同步脚本
VAULT_PATH="F:/AI软件/CY的知识库"
cd "$VAULT_PATH" || exit 1

echo "📥 拉取远程更新..."
git pull

echo "📦 暂存变更..."
git add -A

if git diff --cached --quiet; then
    echo "ℹ️ 没有新变更"
else
    MSG="📥 知识库同步 [$(date '+%Y-%m-%d %H:%M')]"
    git commit -m "$MSG"
    echo "📤 推送到 GitHub..."
    git push
    echo "✅ 同步完成"
fi
