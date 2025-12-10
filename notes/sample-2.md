---
slug: sample-2
title: 使用 Obsidian 和 Git 构建博客工作流
date: 2024-01-10
tags:
  - 工作流
  - Obsidian
summary: 极简主义不仅是设计哲学，更是一种工作方式。用最简单的工具构建高效的写作系统，让创作回归本质。
cover: /single-candle-flame-in-complete-darkness-minimalis.jpg
---

## 为什么选择极简工作流

- 写作核心是内容，不是工具。工具越轻，摩擦越小。
- 笔记即资产，最好存成纯文本，版本可追踪。
- 发布应当自动化，减少重复劳动。

## 基本结构

```
notes/        # Obsidian 里的原始 Markdown
scripts/      # 同步/转换脚本
app/posts/    # 站点的页面入口
data/posts.json # 由脚本生成，构建期读取
```

## 操作步骤

1. 在 Obsidian 里写作，按约定的 frontmatter（slug、title、date、tags、summary、cover）。
2. 运行同步脚本（本地或 CI）把 notes 转为 data/posts.json。
3. Next.js 构建时读取 JSON，静态导出。
4. GitHub Actions 自动部署到 Pages。

## 约定的 Frontmatter

- slug: 页面路径，唯一，例如 `my-first-note`
- title: 标题
- date: `YYYY-MM-DD`
- tags: 数组
- summary: 简短摘要
- cover: 可选，指向 public 下图片路径

## 进一步优化

- 用阅读时长（词数/200）在列表展示。
- 支持草稿：frontmatter 里 `draft: true` 时跳过导出。
- 每次同步前校验必填字段，避免构建时才报错。
