<script setup lang="ts">
import { useData } from 'vitepress';

const { site } = useData();
const base = site.value.base || '/bili-knowledge/';
</script>

<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">B 站视频 · 结构化知识库</span>
        <h1>
          把视频知识<br />
          <span class="gradient">沉淀为可检索的知识库</span>
        </h1>
        <p class="hero-desc">
          精选整理自 B 站优质 UP 主（小Lin说、戴师兄）的视频内容，拆分为
          <strong>体系化阅读</strong>、<strong>逐视频文章</strong>、<strong>原子卡片库</strong>
          三个层级，便于系统学习与快速查找。
        </p>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">1603</span>
            <span class="stat-label">总页面</span>
          </div>
          <div class="stat">
            <span class="stat-num">2</span>
            <span class="stat-label">知识库</span>
          </div>
          <div class="stat">
            <span class="stat-num">3</span>
            <span class="stat-label">内容层级</span>
          </div>
        </div>
        <div class="hero-actions">
          <a class="btn primary" :href="base + 'xiaolin/'">浏览小Lin说</a>
          <a class="btn secondary" :href="base + 'daishixiong/'">浏览戴师兄</a>
          <a class="btn ghost" :href="base + 'about'">来源声明</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="card-stack">
          <div class="mini-card card-1">
            <span class="icon">📊</span>
            <span class="mini-title">财经商业分析</span>
          </div>
          <div class="mini-card card-2">
            <span class="icon">💡</span>
            <span class="mini-title">数据分析求职</span>
          </div>
          <div class="mini-card card-3">
            <span class="icon">🧩</span>
            <span class="mini-title">原子概念卡片</span>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">三个层级，按需阅读</h2>
      <div class="feature-grid">
        <a class="feature-card" :href="base + 'xiaolin/knowledge/'">
          <span class="feature-icon">📖</span>
          <h3>体系化阅读</h3>
          <p>按主题重组的视频知识脉络，适合系统学习、建立完整框架。</p>
          <span class="feature-link">进入体系化阅读 →</span>
        </a>
        <a class="feature-card" :href="base + 'xiaolin/articles/'">
          <span class="feature-icon">🎬</span>
          <h3>逐视频文章</h3>
          <p>每个视频对应一篇完整文章，保留原视频信息并嵌入 B 站播放器。</p>
          <span class="feature-link">浏览视频文章 →</span>
        </a>
        <a class="feature-card" :href="base + 'xiaolin/atoms/'">
          <span class="feature-icon">🧬</span>
          <h3>原子卡片库</h3>
          <p>拆分到最小可独立解释的概念卡片，支持双向链接与快速引用。</p>
          <span class="feature-link">探索原子卡片 →</span>
        </a>
      </div>
    </section>

    <section class="vaults">
      <h2 class="section-title">知识库入口</h2>
      <div class="vault-grid">
        <a class="vault-card xiaolin" :href="base + 'xiaolin/'">
          <div class="vault-header">
            <span class="vault-avatar">L</span>
            <div>
              <h3>小Lin说</h3>
              <p>财经商业分析</p>
            </div>
          </div>
          <div class="vault-bar">
            <div class="bar-track"><div class="bar-fill" style="width: 70%"></div></div>
            <span class="bar-label">1126 页</span>
          </div>
          <div class="vault-tags">
            <span class="vault-tag">宏观经济</span>
            <span class="vault-tag">金融市场</span>
            <span class="vault-tag">热点事件</span>
          </div>
        </a>
        <a class="vault-card daishixiong" :href="base + 'daishixiong/'">
          <div class="vault-header">
            <span class="vault-avatar">D</span>
            <div>
              <h3>戴师兄</h3>
              <p>数据分析与职场</p>
            </div>
          </div>
          <div class="vault-bar">
            <div class="bar-track"><div class="bar-fill" style="width: 30%"></div></div>
            <span class="bar-label">477 页</span>
          </div>
          <div class="vault-tags">
            <span class="vault-tag">数据分析</span>
            <span class="vault-tag">求职跳槽</span>
            <span class="vault-tag">AI 应用</span>
          </div>
        </a>
      </div>
    </section>

    <section class="disclaimer">
      <p>
        本站为个人学习整理，所有内容版权归原作者与原 UP 主所有。技术栈：VitePress + Obsidian 工作流。
      </p>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px 80px;
  color: var(--vp-c-text-1);
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
  padding: 64px 0 72px;
}

.eyebrow {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 20px;
}

.hero h1 {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.04em;
  margin: 0 0 20px;
}

.hero h1 .gradient {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 18px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  max-width: 540px;
  margin: 0 0 28px;
}

.hero-desc strong {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.hero-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.2s, background-color 0.2s, border-color 0.2s;
  border: 1px solid transparent;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-2);
}

.btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.btn.primary:hover {
  background: var(--vp-c-brand-2);
}

.btn.secondary {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.btn.secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.btn.ghost {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid transparent;
}

.btn.ghost:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

/* Hero visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 280px;
}

.card-stack {
  position: relative;
  width: 260px;
  height: 220px;
}

.mini-card {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 180px;
  padding: 18px;
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--vp-shadow-3);
  transition: transform 0.3s ease;
}

.mini-card:hover {
  transform: translateY(-6px) rotate(0deg) !important;
}

.mini-card .icon {
  font-size: 28px;
  line-height: 1;
}

.mini-card .mini-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-1 {
  top: 0;
  left: 0;
  transform: rotate(-6deg);
  z-index: 3;
}

.card-2 {
  top: 40px;
  left: 50px;
  transform: rotate(4deg);
  z-index: 2;
}

.card-3 {
  top: 90px;
  left: 20px;
  transform: rotate(-2deg);
  z-index: 1;
}

/* Sections */
.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 28px;
  text-align: center;
}

.features {
  padding: 56px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--vp-shadow-3);
  border-color: var(--vp-c-brand-1);
}

.feature-card h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 12px 0 8px;
  color: var(--vp-c-text-1);
}

.feature-card p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  flex: 1;
}

.feature-icon {
  font-size: 32px;
  line-height: 1;
}

.feature-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.vaults {
  padding: 56px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.vault-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.vault-card {
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: 18px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.vault-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--vp-shadow-3);
  border-color: var(--vp-c-brand-1);
}

.vault-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.vault-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  background: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.vault-card.xiaolin .vault-avatar {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
}

.vault-card.daishixiong .vault-avatar {
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
}

.vault-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 2px;
  color: var(--vp-c-text-1);
}

.vault-header p {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.vault-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.bar-track {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-accent));
  transition: width 0.6s ease;
}

.bar-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  min-width: 56px;
  text-align: right;
}

.vault-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.vault-tag {
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.disclaimer {
  text-align: center;
  padding: 48px 0 0;
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 40px;
}

.disclaimer p {
  font-size: 14px;
  color: var(--vp-c-text-3);
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 960px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 40px 0 56px;
  }
  .hero-desc,
  .hero-stats {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-visual {
    order: -1;
    min-height: 220px;
  }
  .feature-grid,
  .vault-grid {
    grid-template-columns: 1fr;
  }
  .card-stack {
    transform: scale(0.85);
  }
}
</style>
