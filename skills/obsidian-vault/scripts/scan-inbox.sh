#!/bin/bash
# 扫描收件箱，列出待整理笔记
VAULT="F:/AI软件/CY的知识库"

echo "════════════════════════════════"
echo "  📥 收件箱状态"
echo "════════════════════════════════"
echo ""

for v in "知识库-工作" "知识库-个人"; do
    INBOX="$VAULT/$v/00_收件箱"
    count=$(ls "$INBOX"/*.md 2>/dev/null | wc -l)
    echo "📂 $v: $count 条待整理"
    if [ "$count" -gt 0 ]; then
        ls -1 "$INBOX"/*.md 2>/dev/null | while read f; do
            echo "   📝 $(basename "$f")"
        done
    fi
    echo ""
done

echo "执行 /vault-organize 开始整理"
