# My SKILLs

我的AI Agent SKILL集合，用于MiniMax Agent等工具。

## 📦 SKILL列表

### 预装SKILL

| SKILL名称 | 功能描述 |
|-----------|----------|
| minimax-docx | Word文档创建和编辑 |
| minimax-xlsx | Excel表格处理 |
| minimax-pdf | PDF文档处理 |
| pptx-generator | PowerPoint演示文稿创建 |

### 工具类SKILL

| SKILL名称 | 功能描述 |
|-----------|----------|
| openclaw-doctor | OpenClaw诊断和修复 |
| openclaw-install | OpenClaw安装和配置 |
| windows-env-setup | Windows环境依赖安装 |

### 创意开发类SKILL

| SKILL名称 | 来源 | Star | 功能描述 |
|-----------|------|------|----------|
| frontend-design | Anthropic官方 | ⭐68.8k | 创建独特、生产级前端界面 |
| skill-creator | Anthropic官方 | ⭐52.3k | 创建和管理新SKILL的指南工具包 |

### 效率增强类SKILL

| SKILL名称 | 来源 | Star | 功能描述 |
|-----------|------|------|----------|
| pua | tanweai/pua | ⭐1.9k | PUA话术驱动AI穷尽所有方案 |
| claude-mem | thedotmack | ⭐6.9k | 跨会话持久化记忆压缩系统 |

## 📁 目录结构

```
SKILLs/
├── skills/
│   ├── frontend-design/
│   ├── skill-creator/
│   ├── pua/
│   ├── claude-mem/
│   ├── minimax-docx/
│   ├── minimax-xlsx/
│   ├── minimax-pdf/
│   ├── pptx-generator/
│   ├── openclaw-doctor/
│   ├── openclaw-install/
│   └── windows-env-setup/
└── README.md
```

## 🔗 本地Symlink配置

本地MiniMax Agent通过Symlink链接到skills目录：

```powershell
# 创建Symlink (需要管理员权限或启用开发者模式)
New-Item -ItemType SymbolicLink -Path "C:\Users\34009\.minimax-agent-cn\projects\6\.minimax\skills" -Target "F:\软件\SKILLs\skills"
```

## 📝 SKILL创建规范

每个SKILL必须包含：
- `SKILL.md` - YAML frontmatter + Markdown正文
- `LICENSE.txt` - 许可证文件

参考: [skill-creator](./skills/skill-creator/)

## 🔧 使用方法

1. 克隆本仓库到本地
2. 创建Symlink到MiniMax Agent的skills目录
3. GitHub同步更新

## 📜 许可证

各SKILL使用不同的许可证，详见各目录下的LICENSE.txt文件。

---

最后更新: 2026-04-05
