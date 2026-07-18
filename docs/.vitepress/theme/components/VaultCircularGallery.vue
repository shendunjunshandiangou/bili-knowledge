<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

type Vault = {
  key: string;
  name: string;
  subject: string;
  description: string;
  tags: string[];
  illustration?: string;
  avatar?: string;
  total: number;
  counts: { knowledge: number; articles: number; atoms: number };
};

const props = defineProps<{ vaults: Vault[]; base: string }>();
const viewport = ref<HTMLElement | null>(null);
const maxScroll = ref(0);
const scrollPosition = ref(0);
const dragging = ref(false);
const tiltStyles = ref<Record<string, Record<string, string>>>({});

let resizeObserver: ResizeObserver | null = null;
let pointerStart = 0;
let scrollStart = 0;
let previousPointerX = 0;
let dragVelocity = 0;
let suppressClick = false;

const progress = computed(() => maxScroll.value ? scrollPosition.value / maxScroll.value : 0);
const atStart = computed(() => scrollPosition.value <= 2);
const atEnd = computed(() => scrollPosition.value >= maxScroll.value - 2);

function measure() {
  if (!viewport.value) return;
  maxScroll.value = Math.max(0, viewport.value.scrollWidth - viewport.value.clientWidth);
  scrollPosition.value = viewport.value.scrollLeft;
}

function onScroll() {
  if (!viewport.value) return;
  scrollPosition.value = viewport.value.scrollLeft;
}

function moveBy(distance: number) {
  viewport.value?.scrollBy({ left: distance, behavior: 'smooth' });
}

function onWheel(event: WheelEvent) {
  if (!viewport.value || maxScroll.value <= 0) return;
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (Math.abs(delta) < 2) return;
  const next = Math.max(0, Math.min(maxScroll.value, viewport.value.scrollLeft + delta));
  if (Math.abs(next - viewport.value.scrollLeft) < 1) return;
  event.preventDefault();
  viewport.value.scrollBy({ left: delta * .9, behavior: 'smooth' });
}

function onPointerDown(event: PointerEvent) {
  if (!viewport.value || (event.pointerType === 'mouse' && event.button !== 0)) return;
  dragging.value = true;
  pointerStart = event.clientX;
  previousPointerX = event.clientX;
  scrollStart = viewport.value.scrollLeft;
  dragVelocity = 0;
  suppressClick = false;
}

function onPointerMove(event: PointerEvent) {
  if (!viewport.value || !dragging.value) return;
  const distance = event.clientX - pointerStart;
  dragVelocity = event.clientX - previousPointerX;
  previousPointerX = event.clientX;
  viewport.value.scrollLeft = scrollStart - distance;
  if (Math.abs(distance) > 7) suppressClick = true;
}

function onPointerEnd() {
  if (!viewport.value || !dragging.value) return;
  dragging.value = false;
  viewport.value.scrollBy({ left: -dragVelocity * 10, behavior: 'smooth' });
  window.setTimeout(() => { suppressClick = false; }, 90);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') { event.preventDefault(); moveBy(420); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); moveBy(-420); }
  if (event.key === 'Home' && viewport.value) { event.preventDefault(); viewport.value.scrollTo({ left: 0, behavior: 'smooth' }); }
  if (event.key === 'End' && viewport.value) { event.preventDefault(); viewport.value.scrollTo({ left: maxScroll.value, behavior: 'smooth' }); }
}

function onCardMove(event: PointerEvent, key: string) {
  if (event.pointerType === 'touch' || dragging.value) return;
  const card = event.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  tiltStyles.value[key] = {
    '--tilt-x': `${y * -4.5}deg`,
    '--tilt-y': `${x * 5.5}deg`,
    '--glare-x': `${(x + .5) * 100}%`,
    '--glare-y': `${(y + .5) * 100}%`,
    '--tilt-scale': '1.008',
    '--glare-opacity': '.18',
  };
}

function resetTilt(key: string) {
  tiltStyles.value[key] = {
    '--tilt-x': '0deg', '--tilt-y': '0deg', '--glare-x': '50%', '--glare-y': '50%', '--tilt-scale': '1', '--glare-opacity': '0',
  };
}

function onCardClick(event: MouseEvent) {
  if (suppressClick) event.preventDefault();
}

onMounted(() => {
  resizeObserver = new ResizeObserver(measure);
  if (viewport.value) resizeObserver.observe(viewport.value);
  for (const vault of props.vaults) resetTilt(vault.key);
  measure();
});

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <div class="vault-gallery" role="region" aria-roledescription="横向画廊" aria-label="UP 主知识库">
    <div
      ref="viewport"
      class="vault-gallery__viewport"
      :class="{ dragging }"
      tabindex="0"
      @scroll.passive="onScroll"
      @wheel="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerEnd"
      @pointercancel="onPointerEnd"
      @keydown="onKeydown"
    >
      <div class="vault-gallery__track">
        <a
          v-for="(vault, index) in vaults"
          :key="vault.key"
          class="gallery-card"
          :style="tiltStyles[vault.key]"
          :href="base + vault.key + '/'"
          @pointermove="onCardMove($event, vault.key)"
          @pointerleave="resetTilt(vault.key)"
          @dragstart.prevent
          @click="onCardClick"
        >
          <div class="gallery-card__glare" aria-hidden="true"></div>
          <div class="gallery-card__topline"><span>ARCHIVE / {{ String(index + 1).padStart(2, '0') }}</span><span>{{ vault.total.toLocaleString('zh-CN') }} PAGES</span></div>
          <div class="gallery-card__illustration" aria-hidden="true">
            <img :src="base + 'images/' + (vault.illustration || 'knowledge-still-life.png')" alt="" draggable="false" />
            <span>FIELD NOTES · KNOWLEDGE PORTRAIT</span>
          </div>
          <div class="gallery-card__body">
            <div class="gallery-card__identity">
              <span class="gallery-card__avatar">
                <img v-if="vault.avatar" :src="base + 'images/' + vault.avatar" :alt="vault.name + ' 头像'" draggable="false" />
                <template v-else>{{ vault.name.slice(0, 1) }}</template>
              </span>
              <div><p>{{ vault.subject }}</p><h3>{{ vault.name }}</h3></div>
            </div>
            <p class="gallery-card__description">{{ vault.description }}</p>
            <div class="gallery-card__tags"><span v-for="tag in vault.tags" :key="tag">{{ tag }}</span></div>
          </div>
          <div class="gallery-card__footer">
            <span><b>{{ vault.counts.knowledge }}</b> 篇体系文章</span>
            <span><b>{{ vault.counts.articles }}</b> 篇视频文章</span>
            <i>进入知识库 ↗</i>
          </div>
        </a>
      </div>
    </div>

    <div v-if="maxScroll > 2" class="vault-gallery__controls">
      <button type="button" aria-label="向前浏览知识库" :disabled="atStart" @click="moveBy(-520)">←</button>
      <div class="vault-gallery__progress" aria-hidden="true"><i :style="{ transform: `scaleX(${Math.max(.08, progress)})` }"></i></div>
      <span>{{ vaults.length }} 个知识库</span>
      <button type="button" aria-label="向后浏览知识库" :disabled="atEnd" @click="moveBy(520)">→</button>
    </div>
    <p class="vault-gallery__hint">当前知识库完整展示 · 后续新增内容可拖动或滚轮横向浏览</p>
  </div>
</template>

<style scoped>
.vault-gallery { position: relative; width: min(1220px, 100%); margin: 0 auto; }
.vault-gallery__viewport { position: relative; overflow-x: auto; overflow-y: hidden; padding: 34px 18px 58px; outline: none; cursor: grab; touch-action: pan-y; perspective: 1300px; scrollbar-width: none; }
.vault-gallery__viewport::-webkit-scrollbar { display: none; }
.vault-gallery__viewport:focus-visible { box-shadow: inset 0 0 0 1px var(--vp-c-brand-1); }
.vault-gallery__viewport.dragging { cursor: grabbing; scroll-behavior: auto; }
.vault-gallery__track { display: flex; gap: 24px; width: max-content; min-width: 100%; padding-inline: 0; }
.gallery-card {
  --tilt-x: 0deg; --tilt-y: 0deg; --tilt-scale: 1; --glare-x: 50%; --glare-y: 50%; --glare-opacity: 0;
  position: relative; display: grid; flex: 0 0 clamp(500px, 44vw, 560px); grid-template-rows: auto 220px 1fr auto; min-height: 620px; padding: 34px 38px 30px; overflow: hidden;
  border: 1px solid #bca78e; color: var(--vp-c-text-1); background-color: #f1e6d6; background-image: repeating-linear-gradient(0deg, rgb(87 57 38 / .017) 0 1px, transparent 1px 4px), radial-gradient(circle at 18% 14%, rgb(255 255 255 / .52), transparent 36%);
  box-shadow: 0 18px 42px rgb(63 41 26 / .10); transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--tilt-scale)); transform-style: preserve-3d; transform-origin: center; transition: transform 250ms cubic-bezier(.2,.72,.18,1), border-color 180ms ease, box-shadow 220ms ease; user-select: none; will-change: transform;
}
.gallery-card::before { content: ''; position: absolute; z-index: 2; inset: 9px; border: 1px solid rgb(119 84 59 / .15); pointer-events: none; transform: translateZ(14px); }
.gallery-card:hover { z-index: 4; border-color: var(--vp-c-brand-1); box-shadow: 0 26px 56px rgb(63 41 26 / .15); }
.gallery-card__glare { position: absolute; z-index: 3; inset: 0; opacity: var(--glare-opacity); pointer-events: none; background: radial-gradient(circle at var(--glare-x) var(--glare-y), rgb(255 255 255 / .78), transparent 34%); mix-blend-mode: soft-light; transition: opacity 180ms ease; }
.gallery-card__topline { position: relative; z-index: 4; display: flex; justify-content: space-between; color: #8d7a69; font: 10px var(--vp-font-family-mono); letter-spacing: .06em; transform: translateZ(18px); }
.gallery-card__illustration { position: relative; z-index: 1; margin-top: 22px; border-bottom: 1px solid #c9b59e; transform: translateZ(23px); }
.gallery-card__illustration img { width: 100%; height: 192px; object-fit: contain; object-position: center bottom; opacity: .88; }
.gallery-card__illustration span { position: absolute; right: 0; bottom: 9px; color: #a18872; font: 8px var(--vp-font-family-mono); letter-spacing: .11em; }
.gallery-card__body { position: relative; z-index: 4; padding: 30px 4px 24px; transform: translateZ(21px); }
.gallery-card__identity { display: grid; grid-template-columns: 66px 1fr; align-items: center; gap: 20px; }
.gallery-card__avatar { display: grid; place-items: center; width: 62px; height: 62px; overflow: hidden; border: 1px solid #bca78e; border-radius: 50%; color: var(--vp-c-brand-1); background: #eee2d3; box-shadow: inset 0 0 0 6px rgb(255 250 243 / .46); font-family: 'Noto Serif SC', 'Songti SC', serif; font-size: 23px; }
.gallery-card__avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; filter: sepia(.14) saturate(.9); }
.gallery-card__identity p { color: var(--vp-c-brand-1); font-size: 12px; font-weight: 650; }
.gallery-card__identity h3 { margin-top: 5px; font-family: 'Noto Serif SC', 'Songti SC', serif; font-size: 34px; line-height: 1.15; letter-spacing: -.04em; }
.gallery-card__description { margin-top: 19px; color: var(--vp-c-text-2); font-size: 13px; line-height: 1.85; }
.gallery-card__tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 16px; }
.gallery-card__tags span { padding: 5px 9px; border: 1px solid #cfbeaa; color: #77695d; font-size: 10px; }
.gallery-card__footer { position: relative; z-index: 4; display: grid; grid-template-columns: auto auto 1fr; gap: 18px; align-items: center; padding-top: 20px; border-top: 1px solid #c9b59e; color: #817164; font-size: 10px; transform: translateZ(18px); }
.gallery-card__footer b { color: #3b3029; font-size: 12px; }
.gallery-card__footer i { justify-self: end; color: var(--vp-c-brand-1); font-style: normal; font-weight: 650; }
.vault-gallery__controls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 3px; }
.vault-gallery__controls button { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid #bda991; border-radius: 50%; color: #382e28; background: rgb(244 236 223 / .82); font-size: 16px; cursor: pointer; }
.vault-gallery__controls button:disabled { opacity: .3; cursor: default; }
.vault-gallery__progress { width: min(220px, 24vw); height: 2px; overflow: hidden; background: #c8b6a2; }
.vault-gallery__progress i { display: block; width: 100%; height: 100%; transform-origin: left; background: var(--vp-c-brand-1); }
.vault-gallery__controls > span { color: #8d7a6a; font: 10px var(--vp-font-family-mono); white-space: nowrap; }
.vault-gallery__hint { margin-top: 2px; color: #978679; font: 9px var(--vp-font-family-mono); letter-spacing: .06em; text-align: center; }
@media (max-width: 760px) {
  .vault-gallery { width: calc(100% + 40px); margin-inline: -20px; }
  .vault-gallery__viewport { padding: 24px 20px 48px; }
  .vault-gallery__track { gap: 16px; }
  .gallery-card { flex-basis: min(84vw, 430px); min-height: 570px; padding: 26px; grid-template-rows: auto 190px 1fr auto; }
  .gallery-card__illustration img { height: 166px; }
  .gallery-card__identity { grid-template-columns: 54px 1fr; gap: 15px; }
  .gallery-card__avatar { width: 52px; height: 52px; font-size: 19px; }
  .gallery-card__identity h3 { font-size: 28px; }
  .gallery-card__description { font-size: 12px; }
  .gallery-card__footer span:nth-child(2) { display: none; }
}
@media (hover: none), (prefers-reduced-motion: reduce) {
  .gallery-card { transform: none !important; transition: border-color 180ms ease, box-shadow 180ms ease; }
  .gallery-card__glare { display: none; }
}
</style>
