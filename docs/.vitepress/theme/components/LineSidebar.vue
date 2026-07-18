<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

type SectionItem = { id: string; index: string; label: string };

const props = defineProps<{
  items: SectionItem[];
  activeId: string;
}>();

const root = ref<HTMLElement | null>(null);
const effects = ref<number[]>(props.items.map(() => 0));
const pointerY = ref<number | null>(null);

function smoothstep(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

function updateEffects() {
  if (!root.value || pointerY.value === null) {
    effects.value = props.items.map(() => 0);
    return;
  }

  const links = Array.from(root.value.querySelectorAll<HTMLElement>('.line-sidebar__item'));
  effects.value = links.map((link) => {
    const rect = link.getBoundingClientRect();
    const distance = Math.abs(pointerY.value! - (rect.top + rect.height / 2));
    return smoothstep(1 - distance / 92);
  });
}

function onPointerMove(event: PointerEvent) {
  pointerY.value = event.clientY;
  updateEffects();
}

function onPointerLeave() {
  pointerY.value = null;
  updateEffects();
}

function scrollToSection(event: MouseEvent, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}

watch(() => props.items.length, () => {
  effects.value = props.items.map(() => 0);
});

onMounted(() => window.addEventListener('resize', updateEffects, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('resize', updateEffects));
</script>

<template>
  <nav
    ref="root"
    class="line-sidebar"
    aria-label="首页章节导航"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <span class="line-sidebar__caption">INDEX</span>
    <a
      v-for="(item, index) in items"
      :key="item.id"
      class="line-sidebar__item"
      :class="{ active: activeId === item.id }"
      :href="`#${item.id}`"
      :aria-current="activeId === item.id ? 'location' : undefined"
      :style="{
        '--effect': activeId === item.id ? 1 : effects[index],
        '--shift': `${(activeId === item.id ? 1 : effects[index]) * 4}px`,
        '--marker': String(0.44 + (activeId === item.id ? 1 : effects[index]) * 0.56),
      }"
      @click="scrollToSection($event, item.id)"
    >
      <span class="line-sidebar__marker"></span>
      <span class="line-sidebar__index">{{ item.index }}</span>
      <strong>{{ item.label }}</strong>
    </a>
  </nav>
</template>

<style scoped>
.line-sidebar {
  position: fixed;
  z-index: 30;
  left: max(10px, calc(50vw - 930px));
  top: 50%;
  width: 82px;
  padding: 18px 0;
  transform: translateY(-50%);
  color: #867466;
  user-select: none;
}
.line-sidebar::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(transparent, #bda991 12%, #bda991 88%, transparent);
}
.line-sidebar__caption {
  display: block;
  margin: 0 0 12px 14px;
  color: #a18d7c;
  font: 8px var(--vp-font-family-mono);
  letter-spacing: .2em;
}
.line-sidebar__item {
  --effect: 0;
  --shift: 0px;
  --marker: .44;
  position: relative;
  display: grid;
  grid-template-columns: 22px 15px 1fr;
  align-items: center;
  min-height: 42px;
  color: color-mix(in srgb, #8e7b6b calc(100% - var(--effect) * 38%), #2b241f calc(var(--effect) * 38%));
  text-decoration: none;
  transform: translateX(var(--shift));
  transition: transform 180ms cubic-bezier(.2,.75,.25,1), color 180ms ease;
  will-change: transform;
}
.line-sidebar__marker {
  display: block;
  width: 22px;
  height: 1px;
  transform: scaleX(var(--marker));
  transform-origin: left center;
  background: color-mix(in srgb, #b9a691 calc(100% - var(--effect) * 45%), var(--vp-c-brand-1) calc(var(--effect) * 45%));
  transition: transform 180ms cubic-bezier(.2,.75,.25,1), background 180ms ease;
}
.line-sidebar__marker::before {
  content: '';
  position: absolute;
  left: -3px;
  top: -3px;
  width: 7px;
  height: 7px;
  border: 1px solid #b7a38e;
  border-radius: 50%;
  background: var(--vp-c-bg);
  transform: scale(calc(.72 + var(--effect) * .34));
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
}
.line-sidebar__index {
  font: 9px var(--vp-font-family-mono);
}
.line-sidebar strong {
  opacity: var(--effect);
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 10px;
  font-weight: 550;
  white-space: nowrap;
  transition: opacity 180ms ease;
}
.line-sidebar__item.active { color: #2b241f; }
.line-sidebar__item.active .line-sidebar__marker { height: 2px; background: var(--vp-c-brand-1); }
.line-sidebar__item.active .line-sidebar__marker::before {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 5px rgb(154 96 63 / .12);
}
@media (max-width: 1280px) { .line-sidebar { display: none; } }
@media (prefers-reduced-motion: reduce) {
  .line-sidebar__item, .line-sidebar__marker, .line-sidebar__marker::before { transition: none; }
}
</style>
