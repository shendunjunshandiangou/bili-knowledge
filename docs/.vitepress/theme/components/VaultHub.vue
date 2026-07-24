<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import vaults from '../../vaults.generated.json';
import sectionIndexes from '../../section-indexes.generated.json';

const props = defineProps<{ vaultKey: string }>();

const { site } = useData();
const base = computed(() => site.value.base || '/bili-knowledge/');

const layers = [
  {
    key: 'knowledge' as const,
    index: '01',
    kicker: 'SYSTEMATIC',
    title: '体系化阅读',
    description: '从完整框架开始，适合系统学习一个领域。',
    guide: '按章节建立整体认知，建议从第一章顺序阅读。',
  },
  {
    key: 'articles' as const,
    index: '02',
    kicker: 'VIDEO BY VIDEO',
    title: '逐视频文章',
    description: '保留单期视频的上下文，适合回看具体观点。',
    guide: '一条视频一篇文，附 B 站播放器，方便对照原片。',
  },
  {
    key: 'atoms' as const,
    index: '03',
    kicker: 'ATOMIC NOTES',
    title: '原子笔记',
    description: '直接定位一个概念，适合搜索、引用与继续探索。',
    guide: '每个概念独立成页，通过双链串联相关知识。',
  },
];

const vault = computed(() => vaults.find((item) => item.key === props.vaultKey));

const vaultIndex = computed(() => {
  if (!props.vaultKey) return null;
  return sectionIndexes[props.vaultKey as keyof typeof sectionIndexes] ?? null;
});

const knowledgePreview = computed(() => vaultIndex.value?.knowledge?.items?.slice(0, 4) ?? []);
</script>

<template>
  <main v-if="vault" class="vault-hub">
    <nav class="vault-breadcrumb" aria-label="面包屑">
      <a :href="base">首页</a>
      <span>/</span>
      <a :href="base + 'catalog'">知识目录</a>
      <span>/</span>
      <span>{{ vault.name }}</span>
    </nav>

    <header class="vault-hero">
      <div class="hero-bg" aria-hidden="true">
        <img :src="base + 'images/' + (vault.illustration || 'knowledge-still-life.png')" alt="" />
      </div>
      <div class="hero-inner">
        <div class="hero-main">
          <span class="hero-avatar">
            <img v-if="vault.avatar" :src="base + 'images/' + vault.avatar" :alt="vault.name + ' 头像'" />
            <template v-else>{{ vault.name.slice(0, 1) }}</template>
          </span>
          <div class="hero-copy">
            <p class="hero-kicker">KNOWLEDGE VAULT / ARCHIVE</p>
            <h1>{{ vault.name }}</h1>
            <p class="hero-subject">{{ vault.subject }}</p>
            <p class="hero-description">{{ vault.description }}</p>
            <div class="hero-tags">
              <span v-for="tag in vault.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
        <dl class="hero-total">
          <dt>{{ vault.total.toLocaleString('zh-CN') }}</dt>
          <dd>篇知识页面</dd>
        </dl>
      </div>
    </header>

    <section class="layer-grid" aria-label="三种阅读层级">
      <a
        v-for="layer in layers"
        :key="layer.key"
        class="layer-card"
        :href="base + vault.key + '/' + layer.key + '/'"
      >
        <div class="layer-top">
          <span class="layer-index">{{ layer.index }}</span>
          <span class="layer-kicker">{{ layer.kicker }}</span>
        </div>
        <h2>{{ layer.title }}</h2>
        <p class="layer-desc">{{ layer.description }}</p>
        <p class="layer-guide">{{ layer.guide }}</p>
        <div class="layer-foot">
          <span class="layer-count"><b>{{ vault.counts[layer.key] }}</b> 篇</span>
          <i>进入{{ layer.title }} →</i>
        </div>
      </a>
    </section>

    <section v-if="knowledgePreview.length" class="preview-panel">
      <div class="preview-head">
        <h2>体系化阅读 · 章节预览</h2>
        <a :href="base + vault.key + '/knowledge/'">查看全部 {{ vault.counts.knowledge }} 章 →</a>
      </div>
      <ol class="preview-list">
        <li v-for="item in knowledgePreview" :key="item.slug">
          <a :href="base + vault.key + '/knowledge/' + item.slug + '.html'">{{ item.title }}</a>
        </li>
      </ol>
    </section>

    <footer class="vault-footer">
      <p>内容版权归原作者与原 UP 主所有，本站仅做结构化整理与学习索引。</p>
      <div class="vault-footer-links">
        <a :href="base + 'catalog'">← 返回知识目录</a>
        <a :href="base + 'reading/knowledge'">按阅读深度浏览</a>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.vault-hub {
  max-width: 1240px;
  margin: 0 auto;
  padding: 48px 32px 96px;
}

.vault-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.vault-breadcrumb a {
  color: var(--vp-c-text-2);
}

.vault-breadcrumb a:hover {
  color: var(--vp-c-brand-1);
}

.vault-hero {
  position: relative;
  margin-top: 28px;
  overflow: hidden;
  border: 1px solid #bca78e;
  background: #f1e6d6;
  box-shadow: 0 16px 40px rgb(63 41 26 / 0.08);
}

.hero-bg {
  position: absolute;
  inset: 0;
  opacity: 0.22;
  pointer-events: none;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: sepia(0.2) saturate(0.75);
}

.hero-inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: end;
  padding: 36px 40px 32px;
  background:
    linear-gradient(135deg, rgb(241 230 214 / 0.96) 0%, rgb(241 230 214 / 0.88) 55%, rgb(241 230 214 / 0.72) 100%),
    repeating-linear-gradient(0deg, rgb(87 57 38 / 0.012) 0 1px, transparent 1px 4px);
}

.hero-main {
  display: flex;
  gap: 28px;
  align-items: flex-start;
}

.hero-avatar {
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  flex: 0 0 96px;
  overflow: hidden;
  border: 1px solid #bda991;
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  background: linear-gradient(145deg, #f8f0e5, #dfd1bf);
  box-shadow: inset 0 0 0 8px rgb(255 250 243 / 0.55);
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 36px;
}

.hero-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  filter: sepia(0.14) saturate(0.9);
}

.hero-kicker {
  color: var(--vp-c-brand-1);
  font: 700 10px var(--vp-font-family-mono);
  letter-spacing: 0.14em;
}

.hero-copy h1 {
  margin-top: 10px;
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  font-weight: 650;
  line-height: 1.05;
  letter-spacing: -0.05em;
}

.hero-subject {
  margin-top: 10px;
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 650;
}

.hero-description {
  max-width: 640px;
  margin-top: 14px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.75;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.hero-tags span {
  padding: 5px 10px;
  border: 1px solid #cfbeaa;
  color: #77695d;
  font-size: 11px;
  background: rgb(255 250 243 / 0.65);
}

.hero-total {
  display: grid;
  gap: 6px;
  padding: 18px 22px;
  border: 1px solid #cdbba6;
  text-align: right;
  background: rgb(255 250 243 / 0.72);
}

.hero-total dt {
  color: var(--vp-c-brand-1);
  font: 700 clamp(2rem, 4vw, 2.8rem) var(--vp-font-family-mono);
  line-height: 1;
}

.hero-total dd {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.layer-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 36px;
}

.layer-card {
  display: flex;
  flex-direction: column;
  min-height: 320px;
  padding: 28px 26px 22px;
  border: 1px solid #bca78e;
  color: var(--vp-c-text-1);
  background:
    repeating-linear-gradient(0deg, rgb(87 57 38 / 0.014) 0 1px, transparent 1px 4px),
    #f1e6d6;
  box-shadow: 0 10px 28px rgb(63 41 26 / 0.06);
  transition: transform 200ms, border-color 200ms, box-shadow 200ms;
}

.layer-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-2);
  transform: translateY(-3px);
}

.layer-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.layer-index {
  color: var(--vp-c-brand-1);
  font: 700 12px var(--vp-font-family-mono);
}

.layer-kicker {
  color: var(--vp-c-text-3);
  font: 9px var(--vp-font-family-mono);
  letter-spacing: 0.08em;
}

.layer-card h2 {
  margin-top: 28px;
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -0.03em;
}

.layer-desc {
  margin-top: 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.65;
}

.layer-guide {
  margin-top: 10px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  line-height: 1.6;
}

.layer-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #cdbba6;
  font-size: 12px;
  font-weight: 650;
}

.layer-count b {
  color: var(--vp-c-text-1);
  font: 700 20px var(--vp-font-family-mono);
}

.layer-foot i {
  color: var(--vp-c-brand-1);
  font-style: normal;
}

.preview-panel {
  margin-top: 36px;
  padding: 24px 28px;
  border: 1px solid #bca78e;
  background: rgb(255 250 243 / 0.45);
}

.preview-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.preview-head h2 {
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 1.25rem;
  font-weight: 600;
}

.preview-head a {
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 650;
}

.preview-list {
  list-style: none;
  margin: 0;
  padding: 8px 0 0;
}

.preview-list li + li {
  border-top: 1px solid rgb(207 194 177 / 0.55);
}

.preview-list a {
  display: block;
  padding: 14px 6px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
}

.preview-list a:hover {
  color: var(--vp-c-brand-1);
}

.vault-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.vault-footer p {
  color: var(--vp-c-text-3);
  font-size: 13px;
  line-height: 1.6;
}

.vault-footer-links {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  font-size: 13px;
  font-weight: 650;
}

.vault-footer-links a {
  color: var(--vp-c-text-2);
}

.vault-footer-links a:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 980px) {
  .layer-grid {
    grid-template-columns: 1fr;
  }

  .layer-card {
    min-height: 0;
  }

  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-total {
    justify-self: start;
    text-align: left;
  }
}

@media (max-width: 899px) {
  .vault-hub {
    padding: 20px 12px 48px;
  }

  .hero-inner {
    padding: 22px 18px 20px;
  }

  .hero-main {
    flex-direction: column;
    gap: 16px;
  }

  .hero-avatar {
    width: 72px;
    height: 72px;
    flex-basis: 72px;
    font-size: 28px;
  }

  .hero-copy h1,
  .layer-card h2,
  .preview-head h2 {
    font-family: 'Songti SC', 'STSong', 'SimSun', serif;
  }

  .preview-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .vault-footer-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
