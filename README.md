# bili-knowledge

将 B 站 UP 主（小Lin说、戴师兄）的视频知识库导出为可搜索、可跳转的 VitePress 静态站点。

- 在线访问：https://shendunjunshandiangou.github.io/bili-knowledge/
- 小Lin说：7 章体系化成文 + 161 篇逐视频文章 + 959 个原子笔记
- 戴师兄：8 章体系化成文 + 127 篇逐视频文章 + 342 个原子笔记

## 目录结构

```
├── docs/                    # VitePress 站点内容（由脚本预生成后提交）
│   ├── index.md             # 首页
│   ├── about.md             # 来源声明
│   ├── xiaolin/             # 小Lin说（knowledge / articles / atoms）
│   ├── daishixiong/         # 戴师兄（knowledge / articles / atoms）
│   └── .vitepress/          # 配置、主题、slug 映射、侧边栏
├── scripts/build-content.mjs # 内容同步脚本（本地运行，需知识库源文件）
└── .github/workflows/deploy.yml # GitHub Pages 自动部署
```

## 本地开发

```bash
npm install
npm run sync     # 从知识库源文件重新生成站点内容
npm run dev      # 本地预览
npm run build    # 构建
```

`npm run sync` 需要本地存在 Obsidian 知识库源文件（不在本仓库中），
运行后会重新生成 `docs/` 下的全部页面。更新内容的流程：本地 sync → build 验证 → 提交 push，CI 只负责 build 和部署。

## 视觉样式入口

后续调整网页视觉时，按下面顺序修改，避免内容同步覆盖设计：

1. `docs/.vitepress/theme/tokens.css`：颜色、字体、圆角、阴影与动效速度。
2. `docs/.vitepress/theme/custom.css`：导航、侧边栏、正文和响应式布局。
3. `docs/.vitepress/theme/components/HomeHero.vue`：首页结构与首屏视觉。
4. `docs/.vitepress/config.mts`：站点名称、导航、搜索和构建配置。

`npm run sync` 只重建内容页，不会覆盖以上主题文件。

## 版权声明

所有内容整理自 B 站 UP 主公开视频，版权归原作者与原 UP 主所有，本站仅供个人学习。
