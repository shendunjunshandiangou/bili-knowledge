<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const STORAGE_KEY = 'bili-knowledge-sidebar-width'
const DEFAULT_WIDTH = 272
const MIN_WIDTH = 200
const MAX_WIDTH = 520

const handleLeft = ref(0)
const dragging = ref(false)
let startX = 0
let startWidth = DEFAULT_WIDTH

function readWidth(): number {
  const raw = localStorage.getItem(STORAGE_KEY)
  const n = raw ? parseInt(raw, 10) : DEFAULT_WIDTH
  return Number.isFinite(n) ? Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, n)) : DEFAULT_WIDTH
}

function applyWidth(width: number) {
  document.documentElement.style.setProperty('--vp-sidebar-width', `${width}px`)
  localStorage.setItem(STORAGE_KEY, String(width))
}

function syncHandlePosition() {
  const sidebar = document.querySelector<HTMLElement>('.VPSidebar')
  if (!sidebar || window.innerWidth < 960) {
    handleLeft.value = -9999
    return
  }
  handleLeft.value = sidebar.getBoundingClientRect().right - 3
}

function onMouseDown(e: MouseEvent) {
  if (window.innerWidth < 960) return
  dragging.value = true
  startX = e.clientX
  const current = getComputedStyle(document.documentElement)
    .getPropertyValue('--vp-sidebar-width')
    .trim()
  startWidth = parseInt(current, 10) || readWidth()
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  e.preventDefault()
}

function onMouseMove(e: MouseEvent) {
  if (!dragging.value) return
  const delta = e.clientX - startX
  applyWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta)))
  syncHandlePosition()
}

function onMouseUp() {
  if (!dragging.value) return
  dragging.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

function onDoubleClick() {
  applyWidth(DEFAULT_WIDTH)
  syncHandlePosition()
}

onMounted(() => {
  applyWidth(readWidth())
  syncHandlePosition()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('resize', syncHandlePosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('resize', syncHandlePosition)
})
</script>

<template>
  <div
    v-show="handleLeft > 0"
    class="sidebar-resizer"
    :class="{ dragging }"
    :style="{ left: `${handleLeft}px` }"
    title="拖拽调整目录宽度，双击恢复默认"
    @mousedown="onMouseDown"
    @dblclick="onDoubleClick"
  />
</template>

<style scoped>
.sidebar-resizer {
  position: fixed;
  top: var(--vp-nav-height);
  bottom: 0;
  width: 6px;
  z-index: 30;
  cursor: col-resize;
  touch-action: none;
}

.sidebar-resizer::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 2px;
  width: 2px;
  border-radius: 1px;
  background: transparent;
  transition: background 0.15s;
}

.sidebar-resizer:hover::after,
.sidebar-resizer.dragging::after {
  background: var(--vp-c-brand-1);
}
</style>
