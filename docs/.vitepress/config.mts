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
  description: '小Lin说、戴师兄知识库站点',
  lang: 'zh-CN',
  base: '/bili-knowledge/',
  lastUpdated: true,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '小Lin说', link: '/xiaolin/' },
      { text: '戴师兄', link: '/daishixiong/' },
      { text: '来源声明', link: '/about' },
    ],
    sidebar,
    socialLinks: [],
    search: {
      provider: 'local',
      options: {
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
    resolve: {
      alias: {
        '@theme': path.join(__dirname, 'theme'),
      },
    },
  },
});
