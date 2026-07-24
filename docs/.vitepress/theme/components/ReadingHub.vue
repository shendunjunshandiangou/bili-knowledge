<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import vaults from '../../vaults.generated.json';

type SectionKey = 'knowledge' | 'articles' | 'atoms';

const props = defineProps<{ sectionKey: SectionKey }>();
const { site } = useData();
const base = computed(() => site.value.base || '/bili-knowledge/');

const sections = {
  knowledge: {
    index: '01',
    title: '体系化阅读',
    kicker: 'SYSTEMATIC READING',
    description: '把不同视频中的知识重新组织成完整框架。适合从全局进入一个领域，按章节建立稳定、可复用的认知结构。',
    guide: '建议从第一章开始顺序阅读；如果已经有基础，也可以直接从感兴趣的章节进入。',
    hint: '选择一位 UP 主，进入他的体系化目录。',
    statLabel: '体系章节',
  },
  articles: {
    index: '02',
    title: '逐视频文章',
    kicker: 'VIDEO BY VIDEO',
    description: '一条视频对应一篇可读文章，保留原视频的叙事、案例和上下文。适合寻找某一期内容，或完整回看一个具体观点。',
    guide: '按标题选择感兴趣的视频文章；文章页内会保留原视频入口，方便对照观看。',
    hint: '选择一位 UP 主，浏览他的全部视频文章。',
    statLabel: '视频文章',
  },
  atoms: {
    index: '03',
    title: '原子笔记',
    kicker: 'ATOMIC NOTES',
    description: '把长内容拆成可独立解释、搜索和引用的知识点，并通过双链连接相关概念。适合带着问题查找答案。',
    guide: '适合通过顶部搜索直接定位概念，也可以按主题分组浏览并继续追踪关联笔记。',
    hint: '选择一位 UP 主，进入他的原子笔记库。',
    statLabel: '原子笔记',
  },
} as const;

const current = computed(() => sections[props.sectionKey]);
const depthKeys = computed(() => Object.keys(sections) as SectionKey[]);
</script>

<template>
  <main class="reading-hub">
    <header class="reading-hero">
      <p class="reading-kicker">{{ current.kicker }} / {{ current.index }}</p>
      <div class="reading-hero-grid">
        <h1>{{ current.title }}</h1>
        <div class="reading-intro">
          <p>{{ current.description }}</p>
          <div class="reading-guide">
            <span class="guide-label">怎么使用</span>
            <p>{{ current.guide }}</p>
          </div>
        </div>
      </div>
    </header>

    <nav class="depth-tabs" aria-label="阅读深度切换">
      <a
        v-for="key in depthKeys"
        :key="key"
        class="depth-tab"
        :class="{ active: key === props.sectionKey }"
        :href="base + 'reading/' + key"
      >
        <span class="tab-index">{{ sections[key].index }}</span>
        <span class="tab-title">{{ sections[key].title }}</span>
      </a>
    </nav>

    <section class="vault-grid" aria-label="选择知识库">
      <a
        v-for="(vault, index) in vaults"
        :key="vault.key"
        class="vault-card"
        :href="base + vault.key + '/' + props.sectionKey + '/'"
      >
        <div class="card-topline">
          <span>ARCHIVE / {{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ vault.counts[props.sectionKey] }} {{ current.statLabel }}</span>
        </div>
        <div class="card-illustration" aria-hidden="true">
          <img :src="base + 'images/' + (vault.illustration || 'knowledge-still-life.png')" alt="" />
        </div>
        <div class="card-identity">
          <span class="card-avatar">
            <img v-if="vault.avatar" :src="base + 'images/' + vault.avatar" :alt="vault.name + ' 头像'" />
            <template v-else>{{ vault.name.slice(0, 1) }}</template>
          </span>
          <div>
            <p class="card-subject">{{ vault.subject }}</p>
            <h2>{{ vault.name }}</h2>
          </div>
        </div>
        <p class="card-description">{{ vault.description }}</p>
        <div class="card-tags">
          <span v-for="tag in vault.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="card-action">
          <span>进入{{ current.title }}</span>
          <i>↗</i>
        </div>
      </a>
    </section>

    <footer class="reading-footer">
      <a :href="base">← 返回首页</a>
      <a :href="base + 'catalog'">浏览知识目录</a>
    </footer>
  </main>
</template>

<style scoped>
.reading-hub {
  max-width: 1240px;
  margin: 0 auto;
  padding: 76px 32px 100px;
}

.reading-kicker {
  color: var(--vp-c-brand-1);
  font: 700 11px var(--vp-font-family-mono);
  letter-spacing: 0.15em;
}

.reading-hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px 72px;
  margin-top: 18px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.reading-hero h1 {
  font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif;
  font-size: clamp(3rem, 6.5vw, 5.8rem);
  font-weight: 650;
  line-height: 0.96;
  letter-spacing: -0.07em;
}

.reading-intro p {
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.85;
}

.reading-guide {
  margin-top: 24px;
  padding: 20px 22px;
  border: 1px solid #cdbba6;
  background: rgb(241 230 214 / 0.55);
}

.guide-label {
  display: block;
  color: var(--vp-c-brand-1);
  font: 700 10px var(--vp-font-family-mono);
  letter-spacing: 0.12em;
}

.reading-guide p {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.75;
}

.depth-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 36px 0 40px;
}

.depth-tab {
  display: grid;
  gap: 6px;
  padding: 16px 18px;
  border: 1px solid #bca78e;
  color: var(--vp-c-text-2);
  background: rgb(244 236 223 / 0.45);
  transition: border-color 180ms, background-color 180ms, transform 180ms;
}

.depth-tab:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.depth-tab.active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  background: #f1e6d6;
  box-shadow: inset 0 0 0 1px rgb(154 96 63 / 0.12);
}

.tab-index {
  color: var(--vp-c-brand-1);
  font: 10px var(--vp-font-family-mono);
  letter-spacing: 0.1em;
}

.tab-title {
  font-size: 14px;
  font-weight: 650;
}

.depth-tab.active .tab-title {
  color: var(--vp-c-brand-1);
}

.vault-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.vault-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 520px;
  padding: 28px 28px 24px;
  overflow: hidden;
  border: 1px solid #bca78e;
  color: var(--vp-c-text-1);
  background-color: #f1e6d6;
  background-image:
    repeating-linear-gradient(0deg, rgb(87 57 38 / 0.016) 0 1px, transparent 1px 4px),
    radial-gradient(circle at 18% 14%, rgb(255 255 255 / 0.5), transparent 36%);
  box-shadow: 0 12px 30px rgb(63 41 26 / 0.07);
  transition: transform 200ms, border-color 200ms, box-shadow 200ms;
}

.vault-card::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgb(119 84 59 / 0.14);
  pointer-events: none;
}

.vault-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-2);
  transform: translateY(-3px);
}

.card-topline {
  display: flex;
  justify-content: space-between;
  color: var(--vp-c-text-3);
  font: 10px var(--vp-font-family-mono);
  letter-spacing: 0.05em;
}

.card-illustration {
  position: relative;
  height: 140px;
  margin: 20px 0 16px;
  border-bottom: 1px solid #cdbba6;
}

.card-illustration img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  opacity: 0.88;
}

.card-identity {
  display: flex;
  align-items: center;
  gap: 14px;
}

.card-avatar {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  overflow: hidden;
  border: 1px solid #bda991;
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  background: linear-gradient(145deg, #f8f0e5, #dfd1bf);
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 20px;
}

.card-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  filter: sepia(0.14) saturate(0.9);
}

.card-subject {
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 650;
}

.card-identity h2 {
  margin-top: 4px;
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: clamp(1.35rem, 2.2vw, 1.75rem);
  line-height: 1.15;
  letter-spacing: -0.04em;
}

.card-description {
  margin-top: 14px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.7;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.card-tags span {
  padding: 4px 8px;
  border: 1px solid #cfbeaa;
  color: #77695d;
  font-size: 10px;
}

.card-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid #cdbba6;
  font-size: 12px;
  font-weight: 650;
}

.card-action i {
  color: var(--vp-c-brand-1);
  font-style: normal;
  font-size: 16px;
}

.reading-footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 650;
}

.reading-footer a {
  color: var(--vp-c-text-2);
}

.reading-footer a:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 980px) {
  .vault-grid {
    grid-template-columns: 1fr;
  }

  .vault-card {
    min-height: 0;
  }
}

@media (max-width: 899px) {
  .reading-hub {
    padding: 24px 12px 48px;
  }

  .reading-hero-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding-bottom: 32px;
  }

  .reading-hero h1 {
    font-family: 'Songti SC', 'STSong', 'SimSun', serif;
    font-size: clamp(2rem, 10vw, 2.8rem);
  }

  .depth-tabs {
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 24px 0 28px;
  }

  .card-illustration {
    height: 110px;
  }
}
</style>
