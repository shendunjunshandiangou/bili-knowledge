<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import vaults from '../../vaults.generated.json';

const { site } = useData();
const base = computed(() => site.value.base || '/bili-knowledge/');
</script>

<template>
  <main class="catalog-page">
    <header class="catalog-header">
      <p class="catalog-kicker">KNOWLEDGE DIRECTORY</p>
      <h1>知识目录</h1>
      <p>从一个 UP 主进入一套完整的知识框架。每个知识库都包含体系文章、逐视频文章与可独立检索的原子笔记。</p>
      <div class="catalog-count"><strong>{{ vaults.length }}</strong><span>个持续更新的知识库</span></div>
    </header>

    <div class="catalog-grid">
      <a v-for="(vault, index) in vaults" :key="vault.key" class="catalog-card" :href="base + vault.key + '/'">
        <div class="card-topline">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <span>{{ vault.total }} PAGES</span>
        </div>
        <div class="card-illustration" aria-hidden="true">
          <img :src="base + 'images/' + (vault.illustration || 'knowledge-still-life.png')" alt="" />
        </div>
        <div class="card-identity">
          <span class="avatar-placeholder" aria-hidden="true">
            <img v-if="vault.avatar" :src="base + 'images/' + vault.avatar" :alt="vault.name + ' 头像'" draggable="false" />
            <template v-else>UP</template>
          </span>
          <div>
            <p class="card-subject">{{ vault.subject }}</p>
            <h2>{{ vault.name }}</h2>
          </div>
        </div>
        <div class="card-content">
          <p class="card-description">{{ vault.description }}</p>
          <div class="card-tags"><span v-for="tag in vault.tags" :key="tag">{{ tag }}</span></div>
        </div>
        <dl class="card-stats">
          <div><dt>{{ vault.counts.knowledge }}</dt><dd>体系文章</dd></div>
          <div><dt>{{ vault.counts.articles }}</dt><dd>视频文章</dd></div>
          <div><dt>{{ vault.counts.atoms }}</dt><dd>原子笔记</dd></div>
        </dl>
        <div class="card-action">进入知识库 <span>↗</span></div>
      </a>
    </div>

    <footer class="catalog-note">
      <span>持续扩展</span>
      <p>后续新增的 UP 主与主题知识库会自动加入此目录。</p>
    </footer>
  </main>
</template>

<style scoped>
.catalog-page { max-width: 1180px; margin: 0 auto; padding: 76px 32px 100px; }
.catalog-header { display: grid; grid-template-columns: 1.3fr .8fr; gap: 18px 80px; padding-bottom: 56px; border-bottom: 1px solid var(--vp-c-divider); }
.catalog-kicker { grid-column: 1 / -1; color: var(--vp-c-brand-1); font-size: 11px; font-weight: 700; letter-spacing: .15em; }
.catalog-header h1 { font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif; font-size: clamp(3.2rem, 7vw, 6.6rem); line-height: .95; letter-spacing: -.065em; font-weight: 650; white-space: nowrap; word-break: keep-all; writing-mode: horizontal-tb; }
.catalog-header > p:not(.catalog-kicker) { align-self: end; color: var(--vp-c-text-2); line-height: 1.8; }
.catalog-count { grid-column: 1 / -1; display: flex; align-items: baseline; gap: 10px; margin-top: 24px; }
.catalog-count strong { font: 700 24px var(--vp-font-family-mono); color: var(--vp-c-brand-1); }
.catalog-count span { color: var(--vp-c-text-3); font-size: 13px; }
.catalog-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; padding-top: 48px; }
.catalog-card { position: relative; display: flex; flex-direction: column; min-width: 0; min-height: 680px; padding: 44px; overflow: hidden; border: 1px solid #bca78e; background-color: #f1e6d6; background-image: repeating-linear-gradient(0deg, rgb(87 57 38 / .018) 0 1px, transparent 1px 4px), radial-gradient(circle at 18% 16%, rgb(255 255 255 / .48), transparent 34%); writing-mode: horizontal-tb; box-shadow: 0 14px 34px rgb(63 41 26 / .07); transition: transform var(--kb-motion-base), border-color var(--kb-motion-base), box-shadow var(--kb-motion-base); }
.catalog-card::before { content: ''; position: absolute; inset: 10px; border: 1px solid rgb(119 84 59 / .15); pointer-events: none; }
.catalog-card:hover { transform: translateY(-3px); border-color: var(--vp-c-brand-1); box-shadow: 0 16px 48px rgb(38 64 91 / .08); }
.card-topline { display: flex; align-items: center; justify-content: space-between; color: var(--vp-c-text-3); font: 11px var(--vp-font-family-mono); letter-spacing: .05em; }
.card-illustration { position: relative; height: 220px; margin: 34px 0 22px; border-bottom: 1px solid #cdbba6; }
.card-illustration::after { content: 'ARCHIVE · FIELD NOTES'; position: absolute; right: 0; bottom: 10px; color: #a78d76; font: 8px var(--vp-font-family-mono); letter-spacing: .12em; }
.card-illustration img { width: 100%; height: 100%; object-fit: contain; object-position: center bottom; opacity: .88; }
.card-identity { display: flex; align-items: center; gap: 22px; margin-top: 18px; }
.avatar-placeholder { display: grid; place-items: center; width: 74px; height: 74px; flex: 0 0 74px; overflow: hidden; border: 1px solid #bda991; border-radius: 50%; color: var(--vp-c-brand-1); background: linear-gradient(145deg, #f8f0e5, #dfd1bf); font: 700 13px var(--vp-font-family-mono); letter-spacing: .08em; box-shadow: inset 0 0 0 7px rgb(255 250 243 / .68); }
.avatar-placeholder img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; filter: sepia(.14) saturate(.9); }
.card-subject { color: var(--vp-c-brand-1); font-size: 12px; font-weight: 650; }
.card-identity h2 { margin-top: 6px; font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif; font-size: clamp(28px, 3vw, 38px); line-height: 1.15; letter-spacing: -.045em; white-space: nowrap; word-break: keep-all; writing-mode: horizontal-tb; }
.card-content { margin-left: 96px; }
.card-description { max-width: 480px; margin-top: 18px; color: var(--vp-c-text-2); line-height: 1.75; font-size: 14px; word-break: normal; overflow-wrap: break-word; writing-mode: horizontal-tb; }
.card-tags { display: flex; flex-flow: row wrap; gap: 7px; margin-top: 22px; writing-mode: horizontal-tb; }
.card-tags span { padding: 5px 9px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); font-size: 11px; }
.card-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; width: calc(100% - 96px); margin: auto 0 0 96px; padding: 24px 0; border-top: 1px solid var(--vp-c-divider); }
.card-stats div { display: grid; gap: 5px; }
.card-stats dt { font: 700 18px var(--vp-font-family-mono); }
.card-stats dd { color: var(--vp-c-text-3); font-size: 11px; white-space: nowrap; word-break: keep-all; writing-mode: horizontal-tb; }
.card-action { display: flex; justify-content: space-between; width: calc(100% - 96px); margin-left: 96px; color: var(--vp-c-text-1); font-size: 13px; font-weight: 650; }
.card-action span { color: var(--vp-c-brand-1); font-size: 17px; }
.catalog-note { display: flex; gap: 24px; margin-top: 72px; padding-top: 24px; border-top: 1px solid var(--vp-c-divider); }
.catalog-note span { color: var(--vp-c-brand-1); font-size: 12px; font-weight: 700; }
.catalog-note p { color: var(--vp-c-text-3); font-size: 13px; }
@media (max-width: 899px) {
  .catalog-page { padding: 32px 16px 56px; }
  .catalog-header { grid-template-columns: 1fr; gap: 12px; padding-bottom: 32px; }
  .catalog-header > * { grid-column: 1; }
  .catalog-header h1 { font-size: clamp(2.2rem, 11vw, 3rem); white-space: normal; line-height: 1.05; }
  .catalog-header > p:not(.catalog-kicker) { align-self: start; font-size: 15px; line-height: 1.7; }
  .catalog-count { justify-self: start; }
  .catalog-grid { grid-template-columns: 1fr; gap: 16px; }
  .catalog-card { min-height: 0; padding: 22px 20px 24px; }
  .card-illustration { height: 120px; margin-top: 12px; }
  .card-identity { margin-top: 20px; gap: 14px; }
  .avatar-placeholder { width: 52px; height: 52px; flex-basis: 52px; }
  .card-identity h2 { font-size: clamp(22px, 7vw, 28px); white-space: normal; }
  .card-content { margin-left: 0; margin-top: 14px; }
  .card-description { font-size: 13px; line-height: 1.7; }
  .card-stats, .card-action { width: 100%; margin-left: 0; margin-top: 16px; }
  .catalog-note { margin-top: 40px; flex-direction: column; gap: 8px; }
}

@media (min-width: 701px) and (max-width: 980px) {
  .catalog-card { padding: 24px; }
  .card-content { margin-left: 0; }
  .card-stats, .card-action { width: 100%; margin-left: 0; }
}
</style>
