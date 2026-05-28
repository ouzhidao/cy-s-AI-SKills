---
name: obsidian-vault
description: Claude Code ↔ Obsidian 知识库桥接技能。6个命令 + 4个工作流，实现笔记捕获、收件箱整理、知识园艺、Git同步。
---

# Obsidian Vault - 知识库操作技能

Claude Code 与 Obsidian 知识库的桥接层。让 AI 直接操作你的知识库：
捕获笔记、整理收件箱、搜索归档、知识园艺、自动同步。

## 仓库位置

```
F:\AI软件\CY的知识库\
├── 知识库-工作\    ← 公司（采购/ERP/供应商/合同/烘焙）
└── 知识库-个人\    ← 个人（AI/Python/Git/职业）
```

## 命令速查

| 命令 | 功能 | 场景 |
|------|------|------|
| `/vault-capture` | 快速捕获笔记到收件箱 | 开会/阅读时快速记录 |
| `/vault-import` | 文件/网页 → 自动转 .md 笔记 | 🔥 最常用：拖文件、贴链接就行 |
| `/vault-organize` | 整理收件箱 → 自动归类 | 每日下班前 |
| `/vault-search` | 搜索知识库 | 查找历史笔记 |
| `/vault-garden` | 知识园艺（孤立/过期/质量检查） | 每周一次 |
| `/vault-sync` | Git 拉取 → 提交 → 推送 | 任一操作后 |
| `/vault-moc` | 生成/更新主题索引 | 领域知识沉淀 |

---

## 命令详解

### `/vault-capture` — 快速捕获

```
用法: /vault-capture [内容] --vault 工作|个人 --tags tag1,tag2
示例: /vault-capture "星瀚BOM导入报错：字段映射不匹配" --vault 工作 --tags erp,星瀚,bug
```

**执行流程：**
1. 确认 vault 目标（工作/个人）
2. 生成笔记文件名：`📝_[简短标题]_YYYYMMDD.md`
3. 写入 YAML frontmatter + 内容
4. 放入对应 `00_收件箱/`
5. 告知用户已捕获

### `/vault-import` — 文件/网页自动导入

```
用法: /vault-import [文件路径|网页URL|目录路径] [--vault 工作|个人]
示例: 
  /vault-import "F:\采购资料\合同\xxx.docx" --vault 工作
  /vault-import "https://xxx.com/article" --vault 个人
  /vault-import "F:\采购资料\采购合同整理\" --vault 工作     ← 批量扫描目录
```

**支持格式：**
| 格式 | 处理方式 |
|------|---------|
| `.md` `.txt` | 直接放入收件箱 |
| `.docx` `.doc` | 提取文本 → AI 摘要 + 关键信息 → 生成 .md 笔记 |
| `.pdf` | 提取文本 → AI 摘要 → 生成 .md 笔记 |
| `.xlsx` `.csv` | 提取表格 → 结构化清单 → 生成 .md 笔记 |
| 网页 URL | 抓取内容 → AI 摘要 → 生成 .md 笔记 |
| 目录路径 | 扫描目录下所有文件 → 生成索引笔记 |

**输出产物：**
```
📝_[文件名]_摘要.md    ← 核心笔记（AI提取的摘要+关键信息）
📋_[目录名]_索引.md    ← 批量导入时生成的目录索引
```

**原则：原文件不动，笔记放链接指向原文件。**

### `/vault-organize` — 整理收件箱

```
用法: /vault-organize [--vault 工作|个人|全部]
示例: /vault-organize --vault 全部
```

**执行流程：**
1. 扫描收件箱中所有笔记
2. 分析内容 → 判定归属目录
3. 移动到对应目录
4. 添加双向链接 `[[相关笔记]]`
5. 打标签、更新 frontmatter
6. 输出分类报告
7. 可选：自动执行 `/vault-sync`

**分类规则见：** `references/classify-rules.md`

### `/vault-search` — 搜索知识库

```
用法: /vault-search "关键词" [--vault 工作|个人] [--type 会议|bug|周报]
示例: /vault-search "星瀚 BOM" --vault 工作
```

### `/vault-garden` — 知识园艺

```
用法: /vault-garden [--vault 工作|个人|全部]
```

**检查项：**
- 🔗 孤立笔记（无任何链接指向它）
- ⏰ 过期内容（3个月未更新）
- 📋 收件箱积压（超过7天未整理）
- 🏷️ 缺失标签的笔记
- 📊 输出健康报告

### `/vault-sync` — Git 同步

```
用法: /vault-sync [--message "自定义提交信息"]
```

**执行流程：**
1. `git pull` 拉取远程更新
2. `git add -A` 暂存所有变更
3. `git commit -m "📥 知识库同步 [时间]"`
4. `git push` 推送到 GitHub
5. 输出同步摘要

### `/vault-moc` — 生成主题索引

```
用法: /vault-moc "主题名" --vault 工作|个人
示例: /vault-moc "金蝶云星瀚" --vault 工作
```

扫描相关笔记，生成 Map of Content 索引页。

---

## 工作流

### 每日工作流

```
/vault-sync                    → 拉取最新
查看今日收件箱                  → 了解新增
/vault-organize --vault 全部   → 自动归类
/vault-sync                    → 推送同步
```

### 每周工作流

```
/vault-sync
/vault-garden --vault 全部     → 知识园艺
/vault-moc "本周关键主题"       → 沉淀索引
/vault-sync
```

### 会议记录流

```
/vault-capture "会议主题：XXX" --vault 工作 --tags meeting
→ 会议中逐步补充内容
→ 自动归类到项目目录
→ /vault-sync
```

### 项目复盘流

```
/vault-search "项目名"          → 找到所有相关笔记
→ 手动撰写复盘笔记
→ 关联历史笔记
→ /vault-sync
```

---

## 笔记规范

所有新笔记遵循统一格式：

```markdown
---
title: "笔记标题"
date: YYYY-MM-DD
tags: [tag1, tag2]
type: note  # note|meeting|bug|spec|weekly|decision|moc
vault: 工作  # 工作|个人
status: active  # active|draft|archived
---

# 📝 笔记标题

## 内容

## 关联
- [[相关笔记1]]
- [[相关笔记2]]
```

---

## 目录映射表

| 收件箱内容类型 | 目标目录 |
|--------------|---------|
| 采购/询价/比价 | `知识库-工作/02_工作领域/采购管理/` |
| 供应商/考核/调查 | `知识库-工作/02_工作领域/供应商管理/` |
| 合同/协议/订单 | `知识库-工作/02_工作领域/合同管理/` |
| 库存/物流/出库 | `知识库-工作/02_工作领域/库存物流/` |
| 财务/信控/开票 | `知识库-工作/02_工作领域/财务信控/` |
| 烘焙/报价/新品 | `知识库-工作/02_工作领域/烘焙业务/` |
| ERP/星瀚/星空 | `知识库-工作/02_工作领域/ERP系统/` |
| 年报/行业分析 | `知识库-工作/03_参考资料/` |
| Python/AI/Git | `知识库-个人/01_技术开发/` |
| 读书/学习/规划 | `知识库-个人/02_个人成长/` |

## 依赖

- Git（已配置）
- GitHub 仓库: `ouzhidao/Cy-knowledge-base`
- Obsidian（本地编辑器，非必需）
