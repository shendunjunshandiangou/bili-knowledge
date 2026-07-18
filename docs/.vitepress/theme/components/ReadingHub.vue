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
    hint: '选择一位 UP 主，进入他的体系化目录。',
  },
  articles: {
    index: '02',
    title: '逐视频文章',
    kicker: 'VIDEO BY VIDEO',
    description: '一条视频对应一篇可读文章，保留原视频的叙事、案例和上下文。适合寻找某一期内容，或完整回看一个具体观点。',
    hint: '选择一位 UP 主，浏览他的全部视频文章。',
  },
  atoms: {
    index: '03',
    title: '原子笔记',
    kicker: 'ATOMIC NOTES',
    description: '把长内容拆成可独立解释、搜索和引用的知识点，并通过双链连接相关概念。适合带着问题查找答案。',
    hint: '选择一位 UP 主，进入他的原子笔记库。',
  },
} as const;

const current = computed(() => sections[props.sectionKey]);
</script>

<template>
  <main class="reading-hub">
    <header class="reading-header">
      <p>{{ current.kicker }} / {{ current.index }}</p>
      <h1>{{ current.title }}</h1>
      <div class="reading-intro">
        <p>{{ current.description }}</p>
        <span>{{ current.hint }}</span>
      </div>
    </header>

    <section class="vault-options" aria-label="选择知识库">
      <a
        v-for="(vault, index) in vaults"
        :key="vault.key"
        class="vault-option"
        :href="base + vault.key + '/' + props.sectionKey + '/'"
      >
        <div class="option-top">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ vault.counts[props.sectionKey] }} 篇</span>
        </div>
        <p>{{ vault.subject }}</p>
        <h2>{{ vault.name }}</h2>
        <div class="option-action">进入{{ current.title }} <span>→</span></div>
      </a>
    </section>

    <nav class="depth-nav" aria-label="其他阅读深度">
      <span>其他阅读深度</span>
      <a
        v-for="(section, key) in sections"
        :key="key"
        :class="{ active: key === props.sectionKey }"
        :href="base + 'reading/' + key"
      >{{ section.title }}</a>
    </nav>
  </main>
</template>

<style scoped>
.reading-hub { max-width: 1180px; margin: 0 auto; padding: 82px 32px 100px; }
.reading-header { display: grid; grid-template-columns: 1.15fr .85fr; gap: 24px 80px; padding-bottom: 58px; border-bottom: 1px solid var(--vp-c-divider); }
.reading-header > p { grid-column: 1 / -1; color: var(--vp-c-brand-1); font: 700 11px var(--vp-font-family-mono); letter-spacing: .15em; }
.reading-header h1 { font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif; font-size: clamp(3.5rem, 7vw, 6.8rem); line-height: .95; letter-spacing: -.07em; font-weight: 650; }
.reading-intro { align-self: end; }
.reading-intro p { color: var(--vp-c-text-2); font-size: 17px; line-height: 1.85; }
.reading-intro span { display: block; margin-top: 20px; color: var(--vp-c-brand-1); font-size: 13px; font-weight: 650; }
.vault-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; padding: 48px 0 72px; }
.vault-option { display: flex; flex-direction: column; min-height: 330px; padding: 38px; border: 1px solid #bca78e; color: var(--vp-c-text-1); background: #f1e6d6; box-shadow: 0 14px 34px rgb(63 41 26 / .06); transition: transform 200ms, border-color 200ms, box-shadow 200ms; }
.vault-option:hover { transform: translateY(-3px); border-color: var(--vp-c-brand-1); box-shadow: var(--vp-shadow-2); }
.option-top { display: flex; justify-content: space-between; color: var(--vp-c-text-3); font: 11px var(--vp-font-family-mono); }
.vault-option > p { margin-top: 70px; color: var(--vp-c-brand-1); font-size: 12px; font-weight: 650; }
.vault-option h2 { margin-top: 8px; font-family: 'Noto Serif SC', 'Songti SC', serif; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.1; letter-spacing: -.05em; }
.option-action { display: flex; justify-content: space-between; margin-top: auto; padding-top: 28px; border-top: 1px solid var(--vp-c-divider); font-size: 13px; font-weight: 650; }
.option-action span { color: var(--vp-c-brand-1); font-size: 18px; }
.depth-nav { display: flex; align-items: center; gap: 28px; padding-top: 26px; border-top: 1px solid var(--vp-c-divider); }
.depth-nav > span { margin-right: auto; color: var(--vp-c-text-3); font-size: 12px; }
.depth-nav a { color: var(--vp-c-text-2); font-size: 13px; }
.depth-nav a.active { color: var(--vp-c-brand-1); font-weight: 700; }
@media (max-width: 700px) {
  .reading-hub { padding: 58px 20px 72px; }
  .reading-header { grid-template-columns: 1fr; }
  .reading-header > * { grid-column: 1; }
  .vault-options { grid-template-columns: 1fr; }
  .vault-option { min-height: 280px; padding: 28px; }
  .depth-nav { align-items: flex-start; flex-direction: column; gap: 12px; }
  .depth-nav > span { margin: 0 0 8px; }
}
</style>
