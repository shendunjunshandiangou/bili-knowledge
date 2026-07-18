import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const siteRoot = path.resolve(__dirname, '..');
const docsRoot = path.resolve(siteRoot, 'docs');
const vpRoot = path.resolve(docsRoot, '.vitepress');
const staticRoot = path.resolve(siteRoot, 'assets');

const VAULTS = [
  {
    key: 'xiaolin',
    name: '小Lin说',
    dir: '小Lin说-财经商业分析',
    subject: '财经商业分析',
    description: '从宏观经济、金融市场到公司与产业，用故事化表达建立理解商业世界的完整框架。',
    tags: ['宏观经济', '金融市场', '公司产业'],
    illustration: 'finance-engraving.png',
  },
  {
    key: 'daishixiong',
    name: '戴师兄',
    dir: '戴师兄-数据分析',
    subject: '数据分析与职场',
    description: '围绕数据分析工具、业务思维、职业发展与 AI 协作，整理可落地的学习和工作方法。',
    tags: ['数据分析', '求职发展', 'AI 应用'],
    illustration: 'data-engraving.png',
  },
];

const SOURCE_SECTIONS = [
  {
    key: 'knowledge',
    dir: '04_knowledge',
    title: '体系化阅读',
    shortDescription: '从完整框架开始，适合系统学习一个领域。',
    description: '把多个视频里的知识重新组织进一套完整框架，去掉重复表达，并补上概念之间的连接。适合第一次进入一个领域，按章节建立整体认知。',
    guide: '建议从第一章开始顺序阅读；如果已经有基础，也可以直接从感兴趣的章节进入。',
  },
  {
    key: 'articles',
    dir: '01_articles',
    title: '逐视频文章',
    shortDescription: '保留单期视频的上下文，适合回看具体观点。',
    description: '以一条视频为单位，将口语内容整理成可阅读的文章，尽量保留原视频的叙事顺序、案例和论证过程。适合按视频标题查找，或回看某一期的完整观点。',
    guide: '按标题选择感兴趣的视频文章；文章页内会保留原视频入口，方便对照观看。',
  },
  {
    key: 'atoms',
    dir: '02_atoms',
    title: '原子笔记',
    shortDescription: '直接定位一个概念，适合搜索、引用与继续探索。',
    description: '把文章拆成可以独立解释、独立搜索和独立引用的知识点。每张笔记只回答一个清晰的问题，并通过双链连接回相关内容。',
    guide: '适合通过顶部搜索直接定位概念，也可以按主题分组浏览并继续追踪关联笔记。',
  },
];

const ALLOWED_HTML_TAGS = new Set(['br', 'sub', 'sup']);

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function copyStaticAssets() {
  if (!fs.existsSync(staticRoot)) return;
  fs.cpSync(staticRoot, path.join(docsRoot, 'public'), { recursive: true });
}

function removeExt(name) {
  return name.replace(/\.md$/i, '');
}

// Linux 文件名上限 255 字节，VitePress 构建时还会给资源文件追加
// 目录前缀和 hash 后缀，中文每字符占 3 字节，故 slug 须限制字节长度。
const SLUG_MAX_BYTES = 90;

function toSlug(name) {
  const full = name
    .replace(/\.md$/i, '')
    .replace(/[<>:"/\\|?*#&%]/g, '')
    .replace(/[\s\u3000]+/g, '-')
    .replace(/[\p{P}\p{S}]/gu, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  if (Buffer.byteLength(full, 'utf8') <= SLUG_MAX_BYTES) return full;

  // 超长时截断并追加短 hash 保证唯一性
  const hash = crypto.createHash('md5').update(full).digest('hex').slice(0, 8);
  let truncated = '';
  for (const ch of full) {
    if (Buffer.byteLength(truncated + ch, 'utf8') > SLUG_MAX_BYTES - 9) break;
    truncated += ch;
  }
  truncated = truncated.replace(/-$/, '');
  return `${truncated}-${hash}`;
}

function readVaultFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function parseFrontmatter(content) {
  const fm = {};
  if (!content.startsWith('---\n')) return { fm, body: content };
  const end = content.indexOf('\n---', 4);
  if (end === -1) return { fm, body: content };
  const raw = content.slice(4, end);
  const body = content.slice(end + 4).replace(/^\n+/, '');
  for (const line of raw.split('\n')) {
    const idx = line.search(/[:：]/);
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) fm[key] = value;
  }
  return { fm, body };
}

function stripFrontmatter(content) {
  if (!content.startsWith('---\n')) return content;
  const end = content.indexOf('\n---', 4);
  if (end === -1) return content;
  return content.slice(end + 4).replace(/^\n+/, '');
}

function extractFirstH1(body) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

function extractBvidFromUrl(url) {
  const m = url.match(/[Bb][Vv][a-zA-Z0-9]{10}/);
  return m ? m[0] : '';
}

function extractBvidFromFm(fm) {
  if (fm['BV号']) {
    const m = String(fm['BV号']).trim().match(/[Bb][Vv][a-zA-Z0-9]{10}/);
    if (m) return m[0];
  }
  if (fm['视频链接']) {
    return extractBvidFromUrl(String(fm['视频链接']));
  }
  return '';
}

function buildVaultSlugMap(vaultDir) {
  const slugMap = new Map();
  for (const section of SOURCE_SECTIONS) {
    const dir = path.join(vaultDir, section.dir);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      // 内容标题可以合法地以下划线开头（例如“_十五五_ 规划…”），
      // SOURCE_SECTIONS 已限定为内容目录，不应再把它误判为内部文件。
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(dir, file);
      const base = removeExt(file);
      const slug = toSlug(base);
      if (slugMap.has(slug)) {
        const existing = slugMap.get(slug);
        console.warn(`[slug collision] ${slug}: ${existing.filePath} vs ${filePath}`);
      }
      slugMap.set(slug, { filePath, base, section: section.key, slug });
    }
  }
  return slugMap;
}

function buildGlobalSlugMap(vaults) {
  const globalMap = new Map();
  for (const vault of vaults) {
    const vaultDir = path.join(repoRoot, '知识库', vault.dir);
    const map = buildVaultSlugMap(vaultDir);
    for (const [slug, info] of map) {
      globalMap.set(slug, { ...info, vault: vault.key });
    }
  }
  return globalMap;
}

function escapeVueBody(body) {
  const codeBlocks = [];
  const inlineCodes = [];

  let out = body.replace(/(```[\s\S]*?```)/g, (m) => {
    codeBlocks.push(m);
    return `\u0000CB${codeBlocks.length - 1}\u0000`;
  });

  out = out.replace(/(`[^`]*`)/g, (m) => {
    inlineCodes.push(m);
    return `\u0000IC${inlineCodes.length - 1}\u0000`;
  });

  out = out.replace(/\{\{/g, '&#123;&#123;');
  out = out.replace(/\}\}/g, '&#125;&#125;');

  out = out.replace(/<([^a-zA-Z\/!\?]|\/?)([a-zA-Z]*)/g, (m, lead, tagName) => {
    const t = tagName.toLowerCase();
    if (ALLOWED_HTML_TAGS.has(t)) return m;
    return '&lt;' + lead + tagName;
  });

  out = out.replace(/\u0000CB(\d+)\u0000/g, (_, i) => codeBlocks[+i]);
  out = out.replace(/\u0000IC(\d+)\u0000/g, (_, i) => inlineCodes[+i]);
  return out;
}

function wikilinkReplacer(body, slugMap) {
  return body.replace(/\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g, (m, rawTarget, alias) => {
    const target = rawTarget.trim();
    const display = alias ? alias.trim() : target;
    const slug = toSlug(target);
    const info = slugMap.get(slug) || slugMap.get(toSlug(removeExt(target)));
    if (!info) return display;
    const link = `/${info.vault}/${info.section}/${slug}.html`;
    return `[${display}](${link})`;
  });
}

function buildBiliPlayer(bvid) {
  const clean = bvid.startsWith('BV') ? bvid : `BV${bvid}`;
  return `<BiliPlayer :bvid="'${clean}'" />\n\n`;
}

function buildBacklinksSection(links) {
  if (!links.length) return '';
  const items = links
    .map((l) => `- [${l.title}](/${l.vault}/${l.section}/${l.slug}.html)`)
    .join('\n');
  return `\n\n---\n\n## 被引用于\n\n${items}`;
}

function inferAtomGroup(fileBase) {
  const parts = fileBase.split('-');
  if (parts.length >= 2) return parts.slice(0, 2).join('-');
  return parts[0] || '其他';
}

function processVault(vault, globalSlugMap) {
  const vaultDir = path.join(repoRoot, '知识库', vault.dir);
  const outVaultDir = path.join(docsRoot, vault.key);
  ensureDir(outVaultDir);

  const backlinkMap = new Map();
  const sections = [];

  for (const section of SOURCE_SECTIONS) {
    const srcDir = path.join(vaultDir, section.dir);
    const outDir = path.join(outVaultDir, section.key);
    ensureDir(outDir);
    const sectionFiles = [];
    if (!fs.existsSync(srcDir)) continue;

    for (const file of fs.readdirSync(srcDir)) {
      if (!file.endsWith('.md')) continue;
      const filePath = path.join(srcDir, file);
      const base = removeExt(file);
      const slug = toSlug(base);
      const content = readVaultFile(filePath);
      const { fm, body: rawBody } = parseFrontmatter(content);
      const h1 = extractFirstH1(rawBody) || base;
      // 原子卡片：H1 才是概念名；来源文章只是视频双链，不能当侧边栏标题
      const title =
        section.key === 'atoms'
          ? fm['title'] || h1 || base
          : fm['title'] || fm['视频标题'] || fm['来源文章'] || h1 || base;

      let escapedBody = escapeVueBody(rawBody);
      let processedBody = wikilinkReplacer(escapedBody, globalSlugMap);

      let bvid = '';
      if (section.key === 'articles') {
        bvid = extractBvidFromFm(fm);
      }

      function yamlSafe(value) {
        const s = String(value).trim();
        if (s.includes(':') || s.includes('"') || s.includes('[') || s.includes('{') || s.includes(',') || s.startsWith('[') || s.endsWith(']')) {
          return JSON.stringify(s);
        }
        return s;
      }

      const outFm = {
        title: yamlSafe(title),
      };
      if (section.key === 'atoms') {
        const tags = fm['标签'] || fm['tags'] || '';
        const source = fm['来源文章'] || fm['来源'] || '';
        if (tags) outFm.tags = yamlSafe(tags);
        if (source) outFm.source = yamlSafe(source);
      }

      const rawBodyNoFm = stripFrontmatter(content);
      const linkMatches = rawBodyNoFm.matchAll(/\[\[([^\]|\n]+)(?:\|[^\]\n]+)?\]\]/g);
      for (const m of linkMatches) {
        const target = m[1].trim();
        const targetSlug = toSlug(target);
        const info = globalSlugMap.get(targetSlug) || globalSlugMap.get(toSlug(removeExt(target)));
        if (!info) continue;
        if (info.section !== 'atoms') continue;
        if (!backlinkMap.has(info.slug)) backlinkMap.set(info.slug, []);
        const list = backlinkMap.get(info.slug);
        const existing = list.find((x) => x.vault === vault.key && x.section === section.key && x.slug === slug);
        if (!existing) {
          list.push({ vault: vault.key, section: section.key, slug, title });
        }
      }

      let outBody = `---\n`;
      for (const [k, v] of Object.entries(outFm)) {
        outBody += `${k}: ${v}\n`;
      }
      outBody += `---\n\n`;

      if (section.key === 'articles' && bvid) {
        const h1Match = processedBody.match(/^(#\s+.+)$/m);
        if (h1Match) {
          const idx = h1Match.index + h1Match[0].length;
          processedBody = processedBody.slice(0, idx) + '\n\n' + buildBiliPlayer(bvid) + processedBody.slice(idx + 1);
        } else {
          outBody += buildBiliPlayer(bvid);
        }
      }

      outBody += processedBody;

      const outPath = path.join(outDir, `${slug}.md`);
      fs.writeFileSync(outPath, outBody, 'utf8');
      sectionFiles.push({ slug, title, fileBase: base, fm });
    }

    sections.push({ section, files: sectionFiles });
  }

  const atomSection = sections.find((s) => s.section.key === 'atoms');
  if (atomSection) {
    for (const atom of atomSection.files) {
      const atomPath = path.join(outVaultDir, 'atoms', `${atom.slug}.md`);
      const backlinks = backlinkMap.get(atom.slug) || [];
      if (backlinks.length) {
        fs.appendFileSync(atomPath, buildBacklinksSection(backlinks), 'utf8');
      }
    }
  }

  return { vault, sections, backlinkMap };
}

function writeVaultIndex(vault, sections) {
  const outPath = path.join(docsRoot, vault.key, 'index.md');
  const counts = sections.map((s) => `- **${s.section.title}**：${s.files.length} 篇`).join('\n');
  const content = `---\ntitle: ${vault.name} 知识库\n---\n\n# ${vault.name} 知识库\n\n本区整理自 B 站 UP 主 **${vault.name}** 的视频内容，包含三个层次：\n\n${counts}\n\n## 快速入口\n\n${sections
    .map((s) => `- [${s.section.title}](${s.section.key}/)`)
    .join('\n')}\n\n> 内容版权归原作者与原 UP 主所有，本站仅做结构化整理与学习索引。\n`;
  fs.writeFileSync(outPath, content, 'utf8');
}

function writeVaultSectionIndexes(vault, sections) {
  for (const { section, files } of sections) {
    const outPath = path.join(docsRoot, vault.key, section.key, 'index.md');
    const sorted = [...files].sort((a, b) => {
      if (section.key === 'knowledge') return a.fileBase.localeCompare(b.fileBase, 'zh-CN');
      return a.title.localeCompare(b.title, 'zh-CN');
    });

    const links = sorted
      .map((file) => `- [${file.title}](./${file.slug}.html)`)
      .join('\n');
    const content = `---\ntitle: ${vault.name} · ${section.title}\n---\n\n# ${section.title}\n\n> ${section.shortDescription}\n\n${section.description}\n\n## 怎么使用\n\n${section.guide}\n\n## ${vault.name}的内容\n\n共 **${files.length}** 篇。\n\n${links || '内容正在整理中。'}\n`;
    fs.writeFileSync(outPath, content, 'utf8');
  }
}

function writeReadingIndexes() {
  const readingDir = path.join(docsRoot, 'reading');
  ensureDir(readingDir);
  for (const section of SOURCE_SECTIONS) {
    const content = `---\ntitle: ${section.title}\naside: false\nsidebar: false\n---\n\n<script setup>\nimport ReadingHub from '../.vitepress/theme/components/ReadingHub.vue'\n</script>\n\n<ReadingHub section-key="${section.key}" />\n`;
    fs.writeFileSync(path.join(readingDir, `${section.key}.md`), content, 'utf8');
  }
}

function writeHomeIndex(vaultStats) {
  const content = `---\ntitle: B 站知识库\naside: false\nsidebar: false\n---\n\n<script setup>\nimport HomeHero from './.vitepress/theme/components/HomeHero.vue'\n</script>\n\n<HomeHero />\n`;
  fs.writeFileSync(path.join(docsRoot, 'index.md'), content, 'utf8');
}

function writeCatalogIndex() {
  const content = `---\ntitle: 知识目录\naside: false\nsidebar: false\n---\n\n<script setup>\nimport CatalogGrid from './.vitepress/theme/components/CatalogGrid.vue'\n</script>\n\n<CatalogGrid />\n`;
  fs.writeFileSync(path.join(docsRoot, 'catalog.md'), content, 'utf8');
}

function writeVaultManifest(vaultStats) {
  const manifest = vaultStats.map((stats) => {
    const vault = VAULTS.find((item) => item.key === stats.key);
    return {
      key: vault.key,
      name: vault.name,
      subject: vault.subject,
      description: vault.description,
      tags: vault.tags,
      illustration: vault.illustration || 'knowledge-still-life.png',
      total: stats.total,
      counts: stats.counts,
    };
  });
  fs.writeFileSync(path.join(vpRoot, 'vaults.generated.json'), JSON.stringify(manifest, null, 2), 'utf8');
}

function writeAboutPage() {
  const vaultList = VAULTS.map((vault) => `- **${vault.name}**：${vault.subject}`).join('\n');
  const content = `---\ntitle: 来源声明\n---\n\n# 来源声明\n\n本站内容全部整理自 B 站 UP 主公开视频，仅用于个人学习、检索与知识管理：\n\n${vaultList}\n\n本站不拥有原视频内容的版权，不用于商业用途。若原 UP 主或相关权利方认为任何内容不合适，请联系删除。\n\n## 技术说明\n\n- 使用 [VitePress](https://vitepress.dev/) 生成静态站点\n- 知识库整理流程见原仓库说明\n`;
  fs.writeFileSync(path.join(docsRoot, 'about.md'), content, 'utf8');
}

function writeSlugMap(globalSlugMap) {
  const obj = {};
  for (const [slug, info] of globalSlugMap) {
    obj[slug] = {
      vault: info.vault,
      section: info.section,
      base: info.base,
      path: path.relative(repoRoot, info.filePath).replace(/\\/g, '/'),
    };
  }
  ensureDir(vpRoot);
  fs.writeFileSync(path.join(vpRoot, 'slug-map.json'), JSON.stringify(obj, null, 2), 'utf8');
}

function writeSidebar(vaults, processedResults) {
  const sidebar = {};
  for (const result of processedResults) {
    const prefix = `/${result.vault.key}/`;
    const sections = result.sections;
    const items = [];

    for (const s of sections) {
      const sectionPrefix = `${prefix}${s.section.key}/`;
      if (s.section.key === 'knowledge') {
        const sorted = [...s.files].sort((a, b) => a.fileBase.localeCompare(b.fileBase, 'zh-CN'));
        items.push({
          text: s.section.title,
          collapsed: false,
          items: sorted.map((f) => ({ text: f.title, link: `${sectionPrefix}${f.slug}.html` })),
        });
      } else if (s.section.key === 'articles') {
        const sorted = [...s.files].sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
        items.push({
          text: s.section.title,
          collapsed: true,
          items: sorted.map((f) => ({ text: f.title, link: `${sectionPrefix}${f.slug}.html` })),
        });
      } else if (s.section.key === 'atoms') {
        const groups = new Map();
        for (const f of s.files) {
          const g = inferAtomGroup(f.fileBase);
          if (!groups.has(g)) groups.set(g, []);
          groups.get(g).push(f);
        }
        const groupKeys = [...groups.keys()].sort((a, b) => a.localeCompare(b, 'zh-CN'));
        const groupItems = groupKeys.map((g) => {
          const groupFiles = [...groups.get(g)].sort((a, b) =>
            a.fileBase.localeCompare(b.fileBase, 'zh-CN')
          );
          return {
            text: g,
            collapsed: true,
            items: groupFiles.map((f) => ({ text: f.title, link: `${sectionPrefix}${f.slug}.html` })),
          };
        });
        items.push({
          text: s.section.title,
          collapsed: true,
          items: groupItems,
        });
      }
    }

    sidebar[prefix] = items;
  }

  ensureDir(vpRoot);
  fs.writeFileSync(path.join(vpRoot, 'sidebar.generated.json'), JSON.stringify(sidebar, null, 2), 'utf8');
  return sidebar;
}

function main() {
  ensureDir(docsRoot);

  for (const entry of fs.readdirSync(docsRoot)) {
    if (entry === '.vitepress') continue;
    const p = path.join(docsRoot, entry);
    fs.rmSync(p, { recursive: true, force: true });
  }

  copyStaticAssets();

  const globalSlugMap = buildGlobalSlugMap(VAULTS);
  writeSlugMap(globalSlugMap);

  const processedResults = [];
  const vaultStats = [];

  for (const vault of VAULTS) {
    const result = processVault(vault, globalSlugMap);
    processedResults.push(result);
    writeVaultIndex(vault, result.sections);
    writeVaultSectionIndexes(vault, result.sections);
    const total = result.sections.reduce((sum, s) => sum + s.files.length, 0);
    const details = result.sections.map((s) => `${s.section.title} ${s.files.length}`).join(' / ');
    const counts = Object.fromEntries(result.sections.map((s) => [s.section.key, s.files.length]));
    vaultStats.push({ key: vault.key, name: vault.name, total, details, counts });
    console.log(`[${vault.name}] processed ${total} pages: ${details}`);
  }

  writeHomeIndex(vaultStats);
  writeReadingIndexes();
  writeCatalogIndex();
  writeVaultManifest(vaultStats);
  writeAboutPage();
  writeSidebar(VAULTS, processedResults);

  console.log(`\nGenerated ${vaultStats.reduce((s, v) => s + v.total, 0)} pages in ${docsRoot}`);
  console.log('Slug map written to', path.join(vpRoot, 'slug-map.json'));
  console.log('Sidebar written to', path.join(vpRoot, 'sidebar.generated.json'));
}

main();
