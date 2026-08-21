import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// docs 目录根路径（本文件位于 docs/.vitepress/ 下）
const docsRoot = fileURLToPath(new URL('..', import.meta.url))

// 不作为内容目录的目录
const IGNORE_DIRS = new Set(['.vitepress', 'public'])
// 不进入侧边栏的文件
const IGNORE_FILES = new Set(['index.md'])

interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

/**
 * 递归扫描 docs 下的文件夹与 Markdown 文件，自动生成「文件夹=目录」的侧边栏。
 * 新增文件夹或文章无需任何配置，构建时会自动出现。
 */
function buildSidebar(dir: string, basePath: string): SidebarItem[] {
  const items: SidebarItem[] = []
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.name !== '.DS_Store')

  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith('.md') && !IGNORE_FILES.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh'))
  const folders = entries
    .filter((e) => e.isDirectory() && !IGNORE_DIRS.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh'))

  for (const f of files) {
    const name = f.name.replace(/\.md$/, '')
    items.push({ text: name, link: `/${basePath}${name}` })
  }
  for (const d of folders) {
    const childItems = buildSidebar(path.join(dir, d.name), `${basePath}${d.name}/`)
    if (childItems.length > 0) {
      items.push({ text: d.name, collapsed: false, items: childItems })
    }
  }
  return items
}

export default defineConfig({
  lang: 'zh-CN',
  title: '个人主页',
  description: '一个以 Markdown 为内容的个人主页，GitHub Actions 自动构建部署',
  // 不启用 cleanUrls：GitHub Pages 不做无扩展名解析，链接带 .html 才能正常访问
  base: '/personalPage/',
  themeConfig: {
    nav: [{ text: 'GitHub', link: 'https://github.com/andy-develop' }],
    sidebar: {
      '/': buildSidebar(docsRoot, ''),
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/andy-develop' }],
    footer: {
      message: 'Powered by VitePress + Sveltia CMS',
      copyright: 'Copyright © 2026',
    },
  },
})
