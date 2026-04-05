---
name: claude-mem
description: Persistent memory compression system for Claude. Automatically captures tool usage observations, generates semantic summaries, and makes them available to future sessions.
license: AGPL-3.0
---
# Claude-Mem - Memory Search Skill

跨会话持久化记忆压缩系统。

## 触发场景
- "Did we already fix this?"
- "How did we solve X last time?"
- "What happened last week?"

## 工作流程
### Step 1: Search
```
search(query="关键词", limit=20, project="项目名")
```
### Step 2: Timeline
```
timeline(anchor=ID, depth_before=3, depth_after=3)
```
### Step 3: Fetch
```
get_observations(ids=[ID1, ID2])
```

## 安装
```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```
