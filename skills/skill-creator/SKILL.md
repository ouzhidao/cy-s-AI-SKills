---
name: skill-creator
description: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations.
license: Apache-2.0
---
# Skill Creator
This skill provides guidance for creating effective skills.

## About Skills
Skills are modular, self-contained packages that extend Claude's capabilities by providing specialized knowledge, workflows, and tools.

## Core Principles

### Concise is Key
The context window is a public good. Only add context Claude doesn't already have.

### Set Appropriate Degrees of Freedom
- **High freedom**: Multiple valid approaches
- **Medium freedom**: Preferred pattern exists
- **Low freedom**: Fragile operations

## Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/
    ├── references/
    └── assets/
```
