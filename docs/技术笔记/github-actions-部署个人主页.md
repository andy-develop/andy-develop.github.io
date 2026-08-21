---
title: 用 GitHub Actions 部署个人主页
date: 2026-08-21
---

## 它是如何工作的

把 Markdown 文章放进仓库的文件夹，push 到 GitHub 后，GitHub Actions 会自动构建并部署到 GitHub Pages。

1. 文章以 Markdown 文件形式存放在对应文件夹中
2. push 触发 Actions 工作流
3. VitePress 构建出静态站点
4. 自动部署到 GitHub Pages

## 为什么选这套组合

- **内容即文件**：Markdown 纯文本，无数据库、无平台锁定
- **目录即文件夹**：左侧目录树直接由仓库目录结构自动生成
- **浏览器写作**：通过 Sveltia CMS 在网页里写文章，保存即提交
