import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sidebarPath = path.join(__dirname, 'sidebar.generated.json');
const sidebar = fs.existsSync(sidebarPath)
  ? JSON.parse(fs.readFileSync(sidebarPath, 'utf8'))
  : {};

export default defineConfig({
  title: 'B站知识库',
  description: '把 B 站视频整理成可阅读、可搜索、可连接的结构化知识库',
  lang: 'zh-CN',
  base: '/bili-knowledge/',
  appearance: false,
  lastUpdated: true,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '知识目录', link: '/catalog' },
      { text: '关于', link: '/about' },
    ],
    sidebar,
    socialLinks: [],
    search: {
      provider: 'local',
      options: {
        // 三层内容高度重叠：体系长文和逐视频文章索引标题/章节，
        // 原子卡片索引概念名与“一句话定义”。搜索仍可定位知识概念，
        // 同时避免浏览器下载数份重复正文。
        _render: (src, env, md) => {
          if (/\/(?:knowledge|articles)\//.test(env.relativePath)) {
            const headings = src
              .split('\n')
              .filter((line) => /^#{1,4}\s+/.test(line))
              .join('\n\n');
            return md.render(headings, env);
          }

          if (/\/atoms\//.test(env.relativePath)) {
            const title = src.match(/^#\s+.+$/m)?.[0] ?? '';
            const definition =
              src.match(/^##\s+一句话定义\s*$([\s\S]*?)(?=^##\s+|$(?![\s\S]))/m)?.[1]?.trim() ?? '';
            return md.render([title, definition].filter(Boolean).join('\n\n'), env);
          }

          return md.render(src, env);
        },
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
        miniSearch: {
          options: {
            tokenize: (text: string) =>
              text.split(/[\s\n\r\t]+/).filter((t) => t.length > 0),
          },
        },
      },
    },
    outline: {
      label: '页面导航',
      level: [2, 3],
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdatedText: '最后更新',
    editLink: {
      pattern: '',
      text: '',
    },
    footer: {
      message: '内容版权归原作者与原 UP 主所有，本站仅供个人学习。',
      copyright: '使用 VitePress 构建',
    },
  },
  vite: {
    build: {
      // 本站以大量 Markdown 页面为主。提高警告阈值，避免把正常的内容索引
      // 误报成应用代码膨胀；真正的视觉组件仍保持独立分包。
      chunkSizeWarningLimit: 900,
    },
    resolve: {
      alias: {
        '@theme': path.join(__dirname, 'theme'),
      },
    },
  },
});
