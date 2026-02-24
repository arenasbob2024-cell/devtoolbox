#!/bin/bash

# 工具SEO实现分析报告
# =====================

echo "========================================"
echo "   DevToolBox 工具页面 SEO 分析报告"
echo "========================================"
echo ""

TOOLS_DIR="/Users/mengnan/devtoolbox/src/app/[lang]/tools"

# 统计总数
TOTAL=$(find "$TOOLS_DIR" -name "layout.tsx" | wc -l | tr -d ' ')
WITH_TOOLSEOSERVER=$(find "$TOOLS_DIR" -name "layout.tsx" -exec grep -l "ToolSeoServer" {} \; | wc -l | tr -d ' ')
HARDCODED=$(find "$TOOLS_DIR" -name "layout.tsx" -exec grep -L "ToolSeoServer" {} \; | wc -l | tr -d ' ')

echo "📊 总体统计"
echo "-----------"
echo "工具页面总数:       $TOTAL"
echo "使用 ToolSeoServer: $WITH_TOOLSEOSERVER ($(echo "scale=1; $WITH_TOOLSEOSERVER * 100 / $TOTAL" | bc)%)"
echo "硬编码 SEO:         $HARDCODED ($(echo "scale=1; $HARDCODED * 100 / $TOTAL" | bc)%)"
echo ""

echo "✅ 已使用 ToolSeoServer 的工具 (标准模式)"
echo "------------------------------------------"
find "$TOOLS_DIR" -name "layout.tsx" -exec grep -l "ToolSeoServer" {} \; | while read f; do
  dirname "$f" | xargs basename
done | sort | nl
echo ""

echo "⚠️  需要迁移的工具 (硬编码 SEO)"
echo "-------------------------------"
find "$TOOLS_DIR" -name "layout.tsx" -exec grep -L "ToolSeoServer" {} \; | while read f; do
  dirname "$f" | xargs basename
done | sort | nl
echo ""

echo "========================================"
echo "分析完成"
echo "========================================"
