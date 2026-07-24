<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import vaults from '../../vaults.generated.json';
import sectionIndexes from '../../section-indexes.generated.json';

type SectionKey = 'knowledge' | 'articles' | 'atoms';

const props = defineProps<{
  vaultKey: string;
  sectionKey: SectionKey;
}>();

const { site } = useData();
const base = computed(() => site.value.base || '/bili-knowledge/');

const PAGE_SIZE = 40;

const sections = {
  knowledge: {
    title: '体系化阅读',
    kicker: 'SYSTEMATIC READING',
    description: '把多个视频里的知识重新组织进一套完整框架，去掉重复表达，并补上概念之间的连接。',
    guide: '建议从第一章开始顺序阅读；如果已经有基础，也可以直接从感兴趣的章节进入。',
  },
  articles: {
    title: '逐视频文章',
    kicker: 'VIDEO BY VIDEO',
    description: '以一条视频为单位整理成可阅读文章，尽量保留原视频的叙事顺序、案例和论证过程。',
    guide: '按标题选择感兴趣的视频文章；文章页内会保留原视频入口，方便对照观看。',
  },
  atoms: {
    title: '原子笔记',
    kicker: 'ATOMIC NOTES',
    description: '拆成可以独立解释、独立搜索和独立引用的知识点，并通过双链连接回相关内容。',
    guide: '适合通过顶部搜索直接定位概念，也可以按主题分组浏览并继续追踪关联笔记。',
  },
} as const;

const vault = computed(() => vaults.find((item) => item.key === props.vaultKey));
const sectionMeta = computed(() => sections[props.sectionKey]);
const indexData = computed(() => {
  const vaultIndex = sectionIndexes[props.vaultKey as keyof typeof sectionIndexes];
  if (!vaultIndex) return null;
  return vaultIndex[props.sectionKey];
});

const prefix = computed(() => `${base.value}${props.vaultKey}/${props.sectionKey}/`);

function chapterNo(title: string, fileBase?: string) {
  const source = fileBase || title;
  const match = source.match(/^(\d+)/);
  return match ? match[1].padStart(2, '0') : '';
}

const expandedGroups = ref<Set<string>>(new Set());
const visibleCounts = ref<Record<string, number>>({});

function isExpanded(groupName: string) {
  return expandedGroups.value.has(groupName);
}

function toggleGroup(groupName: string, total: number) {
  const next = new Set(expandedGroups.value);
  if (next.has(groupName)) {
    next.delete(groupName);
  } else {
    next.add(groupName);
    if (!visibleCounts.value[groupName]) {
      visibleCounts.value = {
        ...visibleCounts.value,
        [groupName]: Math.min(PAGE_SIZE, total),
      };
    }
  }
  expandedGroups.value = next;
}

function visibleItems(groupName: string, items: { slug: string; title: string }[]) {
  const limit = visibleCounts.value[groupName] ?? PAGE_SIZE;
  return items.slice(0, limit);
}

function hasMore(groupName: string, total: number) {
  return (visibleCounts.value[groupName] ?? PAGE_SIZE) < total;
}

function loadMore(groupName: string, total: number) {
  const current = visibleCounts.value[groupName] ?? PAGE_SIZE;
  visibleCounts.value = {
    ...visibleCounts.value,
    [groupName]: Math.min(current + PAGE_SIZE, total),
  };
}
</script>

<template>
  <main v-if="vault && indexData" class="section-hub">
    <nav class="section-breadcrumb" aria-label="面包屑">
      <a :href="base">首页</a>
      <span>/</span>
      <a :href="base + 'reading/' + props.sectionKey">{{ sectionMeta.title }}</a>
      <span>/</span>
      <span>{{ vault.name }}</span>
    </nav>

    <header class="section-hero">
      <div class="hero-visual" aria-hidden="true">
        <img :src="base + 'images/' + (vault.illustration || 'knowledge-still-life.png')" alt="" />
      </div>
      <div class="hero-copy">
        <p class="hero-kicker">{{ sectionMeta.kicker }}</p>
        <h1>{{ vault.name }} · {{ sectionMeta.title }}</h1>
        <p class="hero-subject">{{ vault.subject }}</p>
        <p class="hero-description">{{ sectionMeta.description }}</p>
        <dl class="hero-stats">
          <div>
            <dt>{{ indexData.total }}</dt>
            <dd>本层内容</dd>
          </div>
          <div>
            <dt>{{ vault.counts.knowledge }}</dt>
            <dd>体系章节</dd>
          </div>
          <div>
            <dt>{{ vault.counts.articles }}</dt>
            <dd>视频文章</dd>
          </div>
          <div>
            <dt>{{ vault.counts.atoms }}</dt>
            <dd>原子笔记</dd>
          </div>
        </dl>
      </div>
      <aside class="hero-aside">
        <span class="aside-avatar">
          <img v-if="vault.avatar" :src="base + 'images/' + vault.avatar" :alt="vault.name + ' 头像'" />
          <template v-else>{{ vault.name.slice(0, 1) }}</template>
        </span>
        <div class="guide-box">
          <span class="guide-label">怎么使用</span>
          <p>{{ sectionMeta.guide }}</p>
        </div>
        <div class="layer-links">
          <a
            v-for="key in (['knowledge', 'articles', 'atoms'] as SectionKey[])"
            :key="key"
            :class="{ active: key === props.sectionKey }"
            :href="base + vault.key + '/' + key + '/'"
          >{{ sections[key].title }}</a>
        </div>
      </aside>
    </header>

    <!-- 体系化阅读：章节卡片 -->
    <section v-if="props.sectionKey === 'knowledge' && indexData.items" class="content-panel">
      <div class="panel-head">
        <h2>章节目录</h2>
        <span>共 {{ indexData.total }} 章</span>
      </div>
      <ol class="chapter-list">
        <li v-for="item in indexData.items" :key="item.slug">
          <a :href="prefix + item.slug + '.html'">
            <span class="chapter-no">{{ chapterNo(item.title, item.fileBase) }}</span>
            <span class="chapter-title">{{ item.title }}</span>
            <i>→</i>
          </a>
        </li>
      </ol>
    </section>

    <!-- 逐视频 / 原子：分组列表 -->
    <section v-else-if="indexData.groups" class="content-panel">
      <div class="panel-head">
        <h2>{{ props.sectionKey === 'articles' ? '文章分组' : '主题分组' }}</h2>
        <span>共 {{ indexData.total }} 篇</span>
      </div>
      <div class="group-list">
        <section
          v-for="group in indexData.groups"
          :key="group.name"
          class="group-block"
          :class="{ open: isExpanded(group.name) }"
        >
          <button
            type="button"
            class="group-summary"
            :aria-expanded="isExpanded(group.name)"
            @click="toggleGroup(group.name, group.items.length)"
          >
            <span class="group-name">{{ group.name }}</span>
            <span class="group-meta">
              <span class="group-count">{{ group.items.length }} 篇</span>
              <span class="group-chevron" aria-hidden="true">{{ isExpanded(group.name) ? '−' : '+' }}</span>
            </span>
          </button>
          <ul v-if="isExpanded(group.name)">
            <li v-for="item in visibleItems(group.name, group.items)" :key="item.slug">
              <a :href="prefix + item.slug + '.html'">{{ item.title }}</a>
            </li>
            <li v-if="hasMore(group.name, group.items.length)" class="group-more">
              <button type="button" @click="loadMore(group.name, group.items.length)">
                加载更多（还剩 {{ group.items.length - (visibleCounts[group.name] ?? PAGE_SIZE) }} 篇）
              </button>
            </li>
          </ul>
        </section>
      </div>
    </section>

    <footer class="section-footer">
      <a :href="base + vault.key + '/'">← 返回 {{ vault.name }} 首页</a>
      <a :href="base + 'reading/' + props.sectionKey">切换其他知识库</a>
    </footer>
  </main>
</template>

<style scoped>
.section-hub {
  max-width: 1240px;
  margin: 0 auto;
  padding: 48px 32px 96px;
}

.section-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.section-breadcrumb a {
  color: var(--vp-c-text-2);
}

.section-breadcrumb a:hover {
  color: var(--vp-c-brand-1);
}

.section-hero {
  display: grid;
  grid-template-columns: 220px 1fr 260px;
  gap: 28px;
  margin-top: 28px;
  padding: 28px;
  border: 1px solid #bca78e;
  background:
    repeating-linear-gradient(0deg, rgb(87 57 38 / 0.014) 0 1px, transparent 1px 4px),
    radial-gradient(circle at 82% 12%, rgb(255 255 255 / 0.42), transparent 38%),
    #f1e6d6;
  box-shadow: 0 14px 34px rgb(63 41 26 / 0.07);
}

.hero-visual {
  display: flex;
  align-items: flex-end;
  min-height: 180px;
  border-bottom: 1px solid #cdbba6;
}

.hero-visual img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  object-position: center bottom;
  opacity: 0.9;
}

.hero-kicker {
  color: var(--vp-c-brand-1);
  font: 700 10px var(--vp-font-family-mono);
  letter-spacing: 0.14em;
}

.hero-copy h1 {
  margin-top: 10px;
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -0.04em;
}

.hero-subject {
  margin-top: 8px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 650;
}

.hero-description {
  margin-top: 14px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.75;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.hero-stats div {
  display: grid;
  gap: 4px;
}

.hero-stats dt {
  font: 700 18px var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

.hero-stats dd {
  color: var(--vp-c-text-3);
  font-size: 11px;
}

.hero-aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aside-avatar {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  overflow: hidden;
  border: 1px solid #bda991;
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  background: linear-gradient(145deg, #f8f0e5, #dfd1bf);
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 26px;
}

.aside-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.guide-box {
  padding: 16px;
  border: 1px solid #cdbba6;
  background: rgb(255 250 243 / 0.55);
}

.guide-label {
  display: block;
  color: var(--vp-c-brand-1);
  font: 700 10px var(--vp-font-family-mono);
  letter-spacing: 0.1em;
}

.guide-box p {
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.65;
}

.layer-links {
  display: grid;
  gap: 8px;
}

.layer-links a {
  padding: 10px 12px;
  border: 1px solid #cdbba6;
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 600;
  background: rgb(244 236 223 / 0.45);
}

.layer-links a.active,
.layer-links a:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: rgb(255 250 243 / 0.8);
}

.content-panel {
  margin-top: 36px;
  padding: 28px 28px 12px;
  border: 1px solid #bca78e;
  background: rgb(255 250 243 / 0.45);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.panel-head h2 {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 1.5rem;
  font-weight: 600;
}

.panel-head span {
  color: var(--vp-c-text-3);
  font: 11px var(--vp-font-family-mono);
}

.chapter-list {
  list-style: none;
  margin: 0;
  padding: 12px 0 0;
}

.chapter-list li + li {
  border-top: 1px solid rgb(207 194 177 / 0.65);
}

.chapter-list a {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 18px 8px;
  color: var(--vp-c-text-1);
  transition: background-color 180ms, color 180ms;
}

.chapter-list a:hover {
  background: rgb(241 230 214 / 0.55);
  color: var(--vp-c-brand-1);
}

.chapter-no {
  color: var(--vp-c-brand-1);
  font: 700 13px var(--vp-font-family-mono);
}

.chapter-title {
  font-size: 15px;
  line-height: 1.5;
}

.chapter-list i {
  color: var(--vp-c-brand-1);
  font-style: normal;
  opacity: 0.7;
}

.group-list {
  display: grid;
  gap: 14px;
  padding-top: 16px;
}

.group-block {
  border: 1px solid #cdbba6;
  background: #f1e6d6;
  content-visibility: auto;
  contain-intrinsic-size: auto 52px;
}

.group-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border: 0;
  color: inherit;
  text-align: left;
  cursor: pointer;
  background: transparent;
  font: inherit;
}

.group-summary:hover {
  background: rgb(255 250 243 / 0.35);
}

.group-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.group-chevron {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: 1px solid #cdbba6;
  color: var(--vp-c-brand-1);
  font: 700 14px/1 var(--vp-font-family-mono);
  background: rgb(255 250 243 / 0.55);
}

.group-block.open .group-chevron {
  background: rgb(255 250 243 / 0.85);
}

.group-name {
  font-size: 14px;
  font-weight: 650;
}

.group-count {
  color: var(--vp-c-text-3);
  font: 10px var(--vp-font-family-mono);
}

.group-block ul {
  margin: 0;
  padding: 0 12px 12px;
  list-style: none;
  border-top: 1px solid rgb(207 194 177 / 0.65);
}

.group-block li + li {
  border-top: 1px solid rgb(207 194 177 / 0.45);
}

.group-block a {
  display: block;
  padding: 12px 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.55;
}

.group-block a:hover {
  color: var(--vp-c-brand-1);
}

.group-more {
  border-top: 1px solid rgb(207 194 177 / 0.45) !important;
}

.group-more button {
  display: block;
  width: 100%;
  padding: 12px 8px;
  border: 0;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
  background: rgb(255 250 243 / 0.35);
}

.group-more button:hover {
  background: rgb(255 250 243 / 0.65);
}

.section-footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 650;
}

.section-footer a {
  color: var(--vp-c-text-2);
}

.section-footer a:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 980px) {
  .section-hero {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 120px;
  }

  .hero-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 899px) {
  .section-hub {
    padding: 20px 12px 48px;
  }

  .section-hero {
    padding: 18px;
    gap: 18px;
  }

  .hero-copy h1,
  .panel-head h2 {
    font-family: 'Songti SC', 'STSong', 'SimSun', serif;
  }

  .chapter-list a {
    grid-template-columns: 44px 1fr auto;
    gap: 10px;
    padding: 14px 4px;
  }

  .chapter-title {
    font-size: 14px;
  }

  .section-footer {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
