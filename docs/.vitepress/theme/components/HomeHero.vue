<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useData } from 'vitepress';
import vaults from '../../vaults.generated.json';
import LineSidebar from './LineSidebar.vue';
import VaultCircularGallery from './VaultCircularGallery.vue';

const { site } = useData();
const base = computed(() => site.value.base || '/bili-knowledge/');
const totalPages = computed(() => vaults.reduce((sum, vault) => sum + vault.total, 0));
const sections = [
  { id: 'intro', index: '01', label: '首页' },
  { id: 'workflow', index: '02', label: '整理流程' },
  { id: 'libraries', index: '03', label: '知识库' },
  { id: 'reading', index: '04', label: '阅读层级' },
];
const activeSection = ref('intro');
let revealObserver: IntersectionObserver | null = null;

function updateActiveSection() {
  const marker = window.scrollY + window.innerHeight * 0.42;
  let current = sections[0].id;
  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element && element.offsetTop <= marker) current = section.id;
  }
  activeSection.value = current;
}

onMounted(() => {
  updateActiveSection();
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });
  revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.home-page .section-block, .home-page .editorial-image').forEach((element) => revealObserver?.observe(element));
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection);
  window.removeEventListener('resize', updateActiveSection);
  revealObserver?.disconnect();
});
</script>

<template>
  <main class="home-page">
    <LineSidebar :items="sections" :active-id="activeSection" />
    <section id="intro" class="hero">
      <img class="edge-wheat hero-wheat" :src="base + 'images/wheat-ornament.png'" alt="" aria-hidden="true" />
      <div class="link-backdrop" aria-hidden="true">
        <i class="link-line line-1"></i><i class="link-line line-2"></i>
        <i class="link-line line-3"></i><i class="link-line line-4"></i>
        <i class="link-line line-5"></i><i class="link-line line-6"></i>
        <i class="link-line line-7"></i><i class="link-line line-8"></i>
        <span class="link-node node-1"><b>视频</b></span>
        <span class="link-node node-2"></span>
        <span class="link-node node-3"><b>文章</b></span>
        <span class="link-node node-4"></span>
        <span class="link-node node-5"><b>原子</b></span>
        <span class="link-node node-6"></span>
        <span class="link-node node-7"><b>双链</b></span>
        <span class="link-node node-8"></span>
      </div>
      <div class="hero-stage">
        <div class="knowledge-object">
          <div class="knowledge-sheet sheet-back-one"></div>
          <div class="knowledge-sheet sheet-back-two"></div>
          <div class="knowledge-sheet sheet-main">
            <div class="sheet-head">
              <span>KB / 001</span><i></i><span>BILIBILI KNOWLEDGE ARCHIVE</span><i></i><span>持续生长</span>
            </div>
            <div class="sheet-body">
              <div class="sheet-copy">
                <p class="document-kicker">B 站视频 · 结构化知识系统</p>
                <h1>视频知识库<br /><span class="hollow-title">结构化工厂</span></h1>
                <p class="sheet-description">把散落在视频里的表达，整理成可以阅读、搜索和继续连接的长期知识资产。</p>
                <div class="sheet-actions">
                  <a class="btn primary" :href="base + 'catalog'">进入知识目录 <span>→</span></a>
                  <a class="document-link" href="#workflow">了解整理过程</a>
                </div>
              </div>
              <aside class="sheet-panel" aria-label="知识整理结构示意">
                <div class="panel-label"><span>KNOWLEDGE</span><span>SYSTEM / 05</span></div>
                <strong>VIDEO<br />TO<br />INSIGHT</strong>
                <div class="sheet-network">
                  <span class="node node-a"></span><span class="node node-b"></span>
                  <span class="node node-c"></span><span class="node node-d"></span>
                  <i class="line line-a"></i><i class="line line-b"></i><i class="line line-c"></i>
                </div>
                <div class="sheet-foot"><span>视频</span><b>→</b><span>文章</span><b>→</b><span>原子</span></div>
              </aside>
            </div>
            <dl class="sheet-meta">
              <div><dt>{{ vaults.length }}</dt><dd>个知识库</dd></div>
              <div><dt>{{ totalPages.toLocaleString('zh-CN') }}</dt><dd>篇知识页面</dd></div>
              <div><dt>3</dt><dd>种阅读层级</dd></div>
              <div class="sheet-note"><dt>CONTENT → CONNECTION → INSIGHT</dt><dd>从观看到理解</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section id="workflow" class="workflow section-block">
      <div class="section-heading">
        <p class="section-kicker">HOW IT WORKS</p>
        <h2>从视频到知识，不止是转录</h2>
        <p>每条内容经过统一流程处理，让零散观点进入可持续生长的知识结构。</p>
      </div>
      <div class="workflow-display" aria-hidden="true"><span>从视频</span><i></i><span>到知识</span></div>
      <ol class="workflow-list">
        <li><span>01</span><strong>采集</strong><p>筛选值得长期保留的视频</p></li>
        <li><span>02</span><strong>重写</strong><p>将口语整理成可读文章</p></li>
        <li><span>03</span><strong>拆解</strong><p>提炼可独立引用的概念</p></li>
        <li><span>04</span><strong>结构化</strong><p>把概念放入完整知识框架</p></li>
        <li><span>05</span><strong>成文</strong><p>形成适合系统阅读的长文</p></li>
      </ol>
    </section>

    <figure class="editorial-image" aria-label="知识整理静物">
      <img :src="base + 'images/knowledge-still-life.png'" alt="打开的笔记本、书籍、钢笔与麦穗组成的知识整理静物" />
      <figcaption><span>FIELD NOTES / 001</span><strong>知识不是被收藏的内容，<br />而是被重新组织的理解。</strong></figcaption>
    </figure>

    <section id="libraries" class="vaults section-block">
      <img class="edge-wheat vault-wheat" :src="base + 'images/wheat-ornament.png'" alt="" aria-hidden="true" />
      <div class="section-heading row">
        <div>
          <p class="section-kicker">LIBRARIES</p>
          <h2>正在生长的知识库</h2>
          <p>按 UP 主与主题独立整理，未来新增内容会自然加入这里。</p>
        </div>
        <a class="all-link" :href="base + 'catalog'">查看完整目录 <span>→</span></a>
      </div>
      <VaultCircularGallery :vaults="vaults" :base="base" />
    </section>

    <section id="reading" class="reading-levels section-block">
      <div class="section-heading">
        <p class="section-kicker">READ YOUR WAY</p>
        <h2>根据问题，选择阅读深度</h2>
      </div>
      <div class="level-list">
        <a class="level-card" :href="base + 'reading/knowledge'"><span>01</span><div><h3>体系化阅读</h3><p>从完整框架开始，适合系统学习一个领域。</p><b>选择知识库 →</b></div></a>
        <a class="level-card" :href="base + 'reading/articles'"><span>02</span><div><h3>逐视频文章</h3><p>保留单期视频的上下文，适合回看具体观点。</p><b>选择知识库 →</b></div></a>
        <a class="level-card" :href="base + 'reading/atoms'"><span>03</span><div><h3>原子笔记</h3><p>直接定位一个概念，适合搜索、引用与继续探索。</p><b>选择知识库 →</b></div></a>
      </div>
    </section>

    <footer class="home-footer">
      <strong>B 站视频知识库工厂</strong>
      <p>一个持续整理中的个人学习项目。内容版权归原作者与原 UP 主所有。</p>
      <a :href="base + 'about'">关于与来源声明 →</a>
    </footer>
  </main>
</template>

<style scoped>
.home-page { box-sizing: border-box; width: 100%; max-width: 1480px; margin: 0 auto; padding: 0 38px 72px; color: var(--vp-c-text-1); }
.hero { position: relative; min-height: calc(100vh - 64px); display: flex; flex-direction: column; justify-content: center; padding: 70px 0 56px; isolation: isolate; }
.edge-wheat { position: absolute; z-index: 2; width: clamp(120px, 12vw, 190px); height: auto; pointer-events: none; filter: sepia(.28) saturate(.72) contrast(.92); opacity: .72; }
.hero-wheat { right: 24px; top: 90px; transform: rotate(12deg); transform-origin: bottom center; }
.link-backdrop { position: absolute; z-index: -1; inset: 22px -4vw 18px; overflow: hidden; pointer-events: none; opacity: .78; mask-image: linear-gradient(to bottom, transparent 0, #000 12%, #000 82%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 12%, #000 82%, transparent 100%); }
.link-backdrop::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgb(154 96 63 / .13) 1px, transparent 1px); background-size: 28px 28px; opacity: .5; }
.link-node { position: absolute; z-index: 2; width: 10px; height: 10px; border: 2px solid var(--vp-c-bg); border-radius: 50%; background: #bd8663; box-shadow: 0 0 0 1px rgb(154 96 63 / .34), 0 0 18px rgb(154 96 63 / .14); }
.link-node::after { content: ''; position: absolute; inset: -7px; border: 1px solid rgb(154 96 63 / .13); border-radius: 50%; }
.link-node b { position: absolute; left: 15px; top: -6px; color: rgb(111 65 45 / .52); font: 9px var(--vp-font-family-mono); font-weight: 500; letter-spacing: .08em; white-space: nowrap; }
.link-line { position: absolute; z-index: 1; height: 1px; transform-origin: left center; background: linear-gradient(90deg, rgb(154 96 63 / .06), rgb(154 96 63 / .28), rgb(154 96 63 / .08)); }
.link-line::after { content: ''; position: absolute; inset: -1px 0; background: repeating-linear-gradient(90deg, transparent 0 13px, rgb(238 231 220 / .78) 13px 16px); }
.node-1 { left: 3%; top: 28%; }.node-2 { left: 19%; top: 12%; }.node-3 { left: 29%; top: 57%; }.node-4 { left: 14%; top: 77%; }
.node-5 { right: 26%; top: 18%; }.node-6 { right: 8%; top: 35%; }.node-7 { right: 17%; top: 68%; }.node-8 { right: 38%; top: 82%; }
.line-1 { left: 3.5%; top: 28.5%; width: 19%; transform: rotate(-31deg); }.line-2 { left: 3.5%; top: 28.5%; width: 28%; transform: rotate(33deg); }
.line-3 { left: 19.5%; top: 12.5%; width: 35%; transform: rotate(4deg); }.line-4 { left: 14.5%; top: 77.5%; width: 20%; transform: rotate(-42deg); }
.line-5 { right: 8.5%; top: 35.5%; width: 20%; transform: rotate(203deg); }.line-6 { right: 8.5%; top: 35.5%; width: 20%; transform: rotate(126deg); }
.line-7 { right: 17.5%; top: 68.5%; width: 24%; transform: rotate(143deg); }.line-8 { right: 26.5%; top: 18.5%; width: 22%; transform: rotate(35deg); }
.hero-stage { position: relative; width: 100%; padding: 42px 0; }
.knowledge-object { position: relative; z-index: 3; width: min(1320px, 94vw); margin: 0 auto; }
.knowledge-sheet { border: 1px solid #bfae99; background: #f7efe3; }
.sheet-back-one, .sheet-back-two { position: absolute; inset: 12px 4px -8px; box-shadow: var(--vp-shadow-2); }
.sheet-back-one { transform: rotate(-1.9deg) translate(-12px, 8px); background: #d6c6b3; }
.sheet-back-two { transform: rotate(1.4deg) translate(13px, 5px); background: #eadfce; }
.sheet-main { position: relative; min-height: 710px; padding: 38px 52px 34px; overflow: hidden; box-shadow: 0 42px 105px rgb(63 41 26 / .23), 0 3px 8px rgb(63 41 26 / .10); background-color: #f4ecdf; background-image: linear-gradient(93deg, transparent 0 49.85%, rgb(121 92 66 / .045) 50%, transparent 50.15%), repeating-linear-gradient(0deg, rgb(82 59 40 / .016) 0 1px, transparent 1px 4px), radial-gradient(circle at 18% 22%, rgb(255 255 255 / .55), transparent 36%); }
.sheet-main::before { content: ''; position: absolute; inset: 10px; border: 1px solid rgb(120 91 65 / .18); pointer-events: none; }
.sheet-main::after { content: ''; position: absolute; left: 0; top: 0; width: 16px; height: 100%; background: linear-gradient(90deg, rgb(63 41 26 / .14), transparent); opacity: .5; pointer-events: none; }
.sheet-head { position: relative; z-index: 1; display: flex; align-items: center; gap: 14px; color: #75675c; font: 11px var(--vp-font-family-mono); letter-spacing: .09em; }
.sheet-head i { flex: 1; height: 1px; background: #cdbda9; }
.sheet-body { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(320px, .65fr); gap: 68px; align-items: stretch; min-height: 515px; padding: 66px 18px 44px; }
.sheet-copy { display: flex; flex-direction: column; justify-content: center; padding: 12px 0 20px 22px; }
.document-kicker { color: var(--vp-c-brand-1); font: 700 13px var(--vp-font-family-mono); letter-spacing: .15em; }
.sheet-copy h1 { margin-top: 22px; font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'STSong', 'SimSun', Georgia, serif; font-size: clamp(4.3rem, 7.2vw, 7.2rem); font-weight: 700; line-height: .96; letter-spacing: -.07em; white-space: nowrap; }
.sheet-copy h1 .hollow-title {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1.5px #8f5f3f;
  text-stroke: 1.5px #8f5f3f;
  paint-order: stroke fill;
  letter-spacing: -.06em;
}
.sheet-copy h1 em { color: var(--vp-c-brand-1); font-style: normal; font-weight: inherit; }
.sheet-description { max-width: 560px; margin-top: 30px; color: #62564d; font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif; font-size: 19px; line-height: 1.85; }
.sheet-actions { display: flex; align-items: center; gap: 26px; margin-top: 36px; }
.document-link { color: #3b312b; font-size: 13px; font-weight: 650; white-space: nowrap; }
.document-link:hover { color: var(--vp-c-brand-1); }
.sheet-panel { position: relative; display: flex; flex-direction: column; min-height: 440px; padding: 36px; overflow: hidden; color: #eee2d3; background: #211c19; border: 1px solid #5a4638; box-shadow: inset 0 0 0 8px #28211d; }
.sheet-panel::before { content: ''; position: absolute; inset: -30% -50%; background: radial-gradient(circle at center, rgb(183 121 83 / .18), transparent 38%), repeating-radial-gradient(circle at center, transparent 0 32px, rgb(183 121 83 / .08) 33px 34px); }
.panel-label { position: relative; z-index: 1; display: flex; justify-content: space-between; color: #c3a18a; font: 10px var(--vp-font-family-mono); letter-spacing: .11em; }
.sheet-panel > strong { position: relative; z-index: 1; margin-top: 38px; color: #f2e6d8; font-size: clamp(2.2rem, 3.3vw, 3.7rem); line-height: .82; letter-spacing: -.075em; }
.sheet-network { position: relative; z-index: 1; height: 118px; margin-top: 34px; background: linear-gradient(rgb(185 147 119 / .09) 1px, transparent 1px), linear-gradient(90deg, rgb(185 147 119 / .09) 1px, transparent 1px); background-size: 22px 22px; }
.sheet-network .node { position: absolute; z-index: 2; width: 11px; height: 11px; border: 2px solid #211c19; border-radius: 50%; background: #bc815d; box-shadow: 0 0 0 1px #d3a587, 0 0 14px rgb(188 129 93 / .32); }
.node-a { left: 14px; top: 72px; }.node-b { left: 34%; top: 28px; }.node-c { right: 25%; top: 66px; }.node-d { right: 10px; top: 18px; }
.sheet-network .line { position: absolute; z-index: 1; height: 1px; transform-origin: left; background: #b77953; }
.line-a { left: 20px; top: 76px; width: 36%; transform: rotate(-27deg); }.line-b { left: 38%; top: 34px; width: 39%; transform: rotate(20deg); }.line-c { right: 15px; top: 24px; width: 38%; transform: rotate(139deg); }
.sheet-foot { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 20px; border-top: 1px solid #5a4638; color: #c9b4a3; font: 11px var(--vp-font-family-mono); }
.sheet-foot b { color: #c88962; font-size: 13px; }
.sheet-meta { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 135px) 1fr; gap: 28px; align-items: end; padding: 30px 18px 2px 26px; border-top: 1px solid #cdbda9; }
.sheet-meta div { display: grid; gap: 5px; }
.sheet-meta dt { color: #2c241f; font-family: 'Noto Serif SC', Georgia, serif; font-size: 29px; font-weight: 700; white-space: nowrap; }
.sheet-meta dd { color: #77695e; font-size: 13px; white-space: nowrap; }
.sheet-meta .sheet-note { justify-self: end; text-align: right; }
.sheet-meta .sheet-note dt { color: #9a603f; font: 11px var(--vp-font-family-mono); letter-spacing: .09em; }
.sheet-meta .sheet-note dd { margin-top: 2px; }
.btn { display: inline-flex; gap: 30px; align-items: center; padding: 13px 18px; border-radius: var(--kb-radius-sm); font-weight: 650; }
.btn.primary { background: var(--vp-c-brand-1); color: #fff; }
.btn.primary:hover { background: var(--vp-c-brand-2); transform: translateY(-1px); }
.text-link, .all-link { color: var(--vp-c-text-1); font-size: 14px; font-weight: 650; }
.text-link:hover, .all-link:hover { color: var(--vp-c-brand-1); }
.section-kicker { color: var(--vp-c-brand-1); font-size: 12px; font-weight: 700; letter-spacing: .15em; }
.section-block { position: relative; padding: 104px 0; border-top: 1px solid var(--vp-c-divider); }
.section-block, .editorial-image { opacity: 0; transform: translateY(26px); transition: opacity 680ms ease, transform 760ms cubic-bezier(.2,.72,.18,1); }
.section-block.is-visible, .editorial-image.is-visible { opacity: 1; transform: translateY(0); }
.section-heading { max-width: 680px; margin-bottom: 48px; }
.section-heading.row { max-width: none; display: flex; justify-content: space-between; align-items: end; gap: 32px; }
.section-heading h2 { margin-top: 13px; font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif; font-size: clamp(2rem, 4vw, 3.15rem); line-height: 1.18; letter-spacing: -.045em; font-weight: 650; }
.section-heading > p:last-child, .section-heading div > p:last-child { margin-top: 15px; color: var(--vp-c-text-2); font-size: 16px; line-height: 1.7; }
.workflow { margin: 44px 0 0; padding-inline: 58px; color: #eee2d3; background: #211c19; border: 1px solid #3e332c; box-shadow: var(--vp-shadow-3); }
.workflow .section-kicker { color: #c68a65; }
.workflow .section-heading > p:last-child { color: #aa998b; }
.workflow-display { display: flex; align-items: center; gap: 28px; margin: -8px 0 56px; color: transparent; font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif; font-size: clamp(4rem, 8vw, 7.8rem); line-height: .9; letter-spacing: -.07em; white-space: nowrap; -webkit-text-stroke: 1px #756052; }
.workflow-display i { flex: 1; min-width: 70px; height: 1px; background: #705948; }
.workflow-display span:last-child { color: #eadccc; -webkit-text-stroke: 0; }
.workflow-list { list-style: none; display: grid; grid-template-columns: repeat(5, 1fr); padding: 0; margin: 0; border-top: 1px solid var(--vp-c-divider); }
.workflow-list li { min-height: 190px; padding: 26px 22px; border-right: 1px solid #4b3d34; }
.workflow-list li:first-child { border-left: 1px solid #4b3d34; }
.workflow-list span { display: block; color: #c68a65; font: 11px var(--vp-font-family-mono); }
.workflow-list strong { display: block; margin-top: 34px; font-size: 18px; }
.workflow-list p { margin-top: 10px; color: #9f8d7f; font-size: 13px; line-height: 1.6; }
.editorial-image { position: relative; height: clamp(360px, 42vw, 560px); margin: 104px 0 18px; overflow: hidden; border: 1px solid #bca993; background: #2a211b; box-shadow: var(--vp-shadow-3); }
.editorial-image::after { content: ''; position: absolute; inset: 12px; border: 1px solid rgb(244 236 223 / .34); pointer-events: none; }
.editorial-image img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.72) sepia(.12) contrast(.96); }
.editorial-image figcaption { position: absolute; left: 42px; bottom: 38px; display: grid; gap: 13px; max-width: 430px; padding: 24px 28px; color: #efe3d3; background: rgb(32 26 22 / .88); border: 1px solid #705642; backdrop-filter: blur(8px); }
.editorial-image figcaption span { color: #c78a64; font: 10px var(--vp-font-family-mono); letter-spacing: .12em; }
.editorial-image figcaption strong { font-family: 'Noto Serif SC', 'Songti SC', serif; font-size: 22px; font-weight: 500; line-height: 1.55; }
.vaults { position: relative; }
.vault-wheat { left: -72px; top: 30px; width: clamp(82px, 8vw, 116px); transform: scaleX(-1) rotate(-8deg); opacity: .38; }
.level-list { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--vp-c-divider); border-bottom: 1px solid var(--vp-c-divider); }
.level-list .level-card { position: relative; min-height: 300px; padding: 38px 36px 42px; border-right: 1px solid var(--vp-c-divider); overflow: hidden; color: var(--vp-c-text-1); transition: color 200ms, background-color 200ms; }
.level-list .level-card:last-child { border-right: 0; }
.level-list .level-card:hover { color: var(--vp-c-brand-1); background: rgb(245 238 228 / .45); }
.level-list .level-card::after { content: ''; position: absolute; right: -18px; bottom: -46px; width: 130px; height: 170px; transform: rotate(8deg); border: 1px solid #c9b8a4; background: rgb(245 238 228 / .52); box-shadow: -8px 8px 0 rgb(215 199 180 / .28); transition: transform 200ms; }
.level-list .level-card:hover::after { transform: rotate(5deg) translateY(-6px); }
.level-list .level-card > span { display: block; color: #b29882; font: 11px var(--vp-font-family-mono); }
.level-list .level-card > div { position: relative; z-index: 1; margin-top: 72px; }
.level-list h3 { font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif; font-size: 28px; font-weight: 600; }
.level-list p { max-width: 260px; margin-top: 13px; color: var(--vp-c-text-2); line-height: 1.7; }
.level-list b { display: block; margin-top: 20px; color: var(--vp-c-brand-1); font-size: 12px; font-weight: 650; }
.home-footer { display: grid; grid-template-columns: 1fr 2fr auto; gap: 30px; align-items: center; padding: 36px 0 0; border-top: 1px solid var(--vp-c-divider); }
.home-footer p { color: var(--vp-c-text-3); font-size: 13px; }
.home-footer a { color: var(--vp-c-brand-1); font-size: 13px; font-weight: 650; }
@media (max-width: 900px) {
  .hero { min-height: auto; padding: 72px 0; }
  .hero-stage { padding-block: 30px; }
  .knowledge-object { width: min(720px, 92vw); }
  .sheet-main { min-height: 0; padding: 28px 30px 26px; }
  .sheet-body { grid-template-columns: 1fr; gap: 34px; padding: 42px 8px 30px; }
  .sheet-copy { padding: 0 12px; }
  .sheet-copy h1 { font-size: clamp(4rem, 12vw, 6.2rem); }
  .sheet-panel { min-height: 330px; }
  .sheet-meta { grid-template-columns: repeat(3, 1fr); padding-inline: 12px; }
  .sheet-meta .sheet-note { display: none; }
  .link-backdrop { inset-inline: -20px; opacity: .62; }
  .edge-wheat { opacity: .4; }
  .workflow-list { grid-template-columns: 1fr; }
  .workflow-list li { min-height: 0; border-left: 1px solid #4b3d34; border-bottom: 1px solid #4b3d34; }
  .workflow-list strong { margin-top: 16px; }
  .level-list { grid-template-columns: 1fr; }
  .level-list .level-card { min-height: 230px; border-right: 0; border-bottom: 1px solid var(--vp-c-divider); }
  .level-list .level-card:last-child { border-bottom: 0; }
  .level-list .level-card > div { margin-top: 36px; }
  .home-footer { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .home-page { padding-inline: 20px; }
  .hero { padding-block: 40px; }
  .knowledge-object { width: 94vw; }
  .sheet-main { padding: 24px 20px 22px; }
  .sheet-head span:nth-of-type(2) { display: none; }
  .sheet-body { padding-top: 34px; }
  .sheet-copy h1 { font-size: clamp(3.3rem, 16vw, 5rem); }
  .sheet-description { font-size: 15px; }
  .sheet-actions { align-items: flex-start; flex-direction: column; gap: 16px; }
  .sheet-panel { min-height: 300px; padding: 24px; }
  .sheet-meta { gap: 10px; }
  .sheet-meta dt { font-size: 19px; }
  .link-backdrop { opacity: .48; }
  .link-node b { display: none; }
  .section-block { padding: 72px 0; }
  .workflow { padding-inline: 24px; }
  .workflow-display { gap: 14px; margin-bottom: 42px; font-size: clamp(3rem, 15vw, 5rem); }
  .editorial-image { height: 430px; margin-top: 72px; }
  .editorial-image figcaption { right: 18px; left: 18px; bottom: 18px; padding: 20px; }
  .edge-wheat { display: none; }
  .section-heading.row { align-items: start; flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .section-block, .editorial-image { opacity: 1; transform: none; transition: none; }
}
</style>
