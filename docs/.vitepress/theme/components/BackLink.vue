<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vitepress'

interface NavEntry {
  path: string
  title: string
}

interface Point {
  x: number
  y: number
}

const router = useRouter()
const stack = ref<NavEntry[]>([])
const btnRef = ref<HTMLButtonElement | null>(null)
const pos = ref<Point>({ x: 0, y: 0 })
const isDragging = ref(false)

const STACK_KEY = 'bili-knowledge-navstack'
const POS_KEY = 'bili-knowledge-back-btn-pos'
const MAX = 20
const MARGIN = 8
const DRAG_THRESHOLD = 5
const LONG_PRESS_MS = 300

let navigatingBack = false
let positionReady = false
let hasDragged = false
let dragActive = false
let pointerStartX = 0
let pointerStartY = 0
let dragStartPos: Point = { x: 0, y: 0 }
let longPressTimer: ReturnType<typeof setTimeout> | null = null

const buttonTitle = computed(() => {
  if (!stack.value.length) return ''
  const base = `返回：${stack.value[stack.value.length - 1].title}`
  return isDragging.value ? `${base}（拖动中）` : base
})

function cleanTitle() {
  return document.title.replace(/\s*\|\s*B站知识库\s*$/, '').trim()
}

function saveStack() {
  try {
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack.value))
  } catch {
    // ignore
  }
}

function loadStack() {
  try {
    const raw = sessionStorage.getItem(STACK_KEY)
    if (raw) stack.value = JSON.parse(raw)
  } catch {
    stack.value = []
  }
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 899px)').matches
}

function getMobileBottomMargin() {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:fixed;bottom:0;left:0;padding-bottom:env(safe-area-inset-bottom, 16px);visibility:hidden;pointer-events:none;'
  document.body.appendChild(probe)
  const inset = parseFloat(getComputedStyle(probe).paddingBottom) || 16
  document.body.removeChild(probe)
  return Math.max(16, inset)
}

function getButtonSize() {
  const el = btnRef.value
  return {
    width: el?.offsetWidth ?? (isMobileViewport() ? 44 : 120),
    height: el?.offsetHeight ?? (isMobileViewport() ? 44 : 36),
  }
}

function clampPosition(x: number, y: number): Point {
  const { width, height } = getButtonSize()
  const maxX = window.innerWidth - width - MARGIN
  const maxY = window.innerHeight - height - MARGIN
  return {
    x: Math.min(maxX, Math.max(MARGIN, x)),
    y: Math.min(maxY, Math.max(MARGIN, y)),
  }
}

function applyPosition(x: number, y: number, persist = false) {
  pos.value = clampPosition(x, y)
  if (persist) {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify(pos.value))
    } catch {
      // ignore
    }
  }
}

function readSavedPosition(): Point | null {
  try {
    const raw = localStorage.getItem(POS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Point
    if (typeof parsed.x === 'number' && typeof parsed.y === 'number') return parsed
  } catch {
    // ignore
  }
  return null
}

function getDefaultPosition(): Point {
  const { width, height } = getButtonSize()
  const right = isMobileViewport() ? 12 : 24
  const bottom = isMobileViewport() ? getMobileBottomMargin() : 88
  return clampPosition(window.innerWidth - width - right, window.innerHeight - height - bottom)
}

function initPosition() {
  const saved = readSavedPosition()
  if (saved) {
    applyPosition(saved.x, saved.y)
  } else {
    applyPosition(getDefaultPosition().x, getDefaultPosition().y)
  }
  positionReady = true
}

function resetPosition() {
  try {
    localStorage.removeItem(POS_KEY)
  } catch {
    // ignore
  }
  applyPosition(getDefaultPosition().x, getDefaultPosition().y)
}

function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
}

function beginDragIfNeeded(clientX: number, clientY: number) {
  const dx = clientX - pointerStartX
  const dy = clientY - pointerStartY
  if (!dragActive && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
    dragActive = true
    hasDragged = true
    isDragging.value = true
    clearLongPressTimer()
  }
  if (dragActive) {
    applyPosition(dragStartPos.x + dx, dragStartPos.y + dy)
  }
}

function onDocumentMouseMove(e: MouseEvent) {
  beginDragIfNeeded(e.clientX, e.clientY)
}

function onDocumentTouchMove(e: TouchEvent) {
  if (!e.touches.length) return
  const touch = e.touches[0]
  beginDragIfNeeded(touch.clientX, touch.clientY)
  if (dragActive) e.preventDefault()
}

function endPointerInteraction() {
  clearLongPressTimer()
  document.removeEventListener('mousemove', onDocumentMouseMove)
  document.removeEventListener('mouseup', onDocumentMouseUp)
  document.removeEventListener('touchmove', onDocumentTouchMove)
  document.removeEventListener('touchend', onDocumentTouchEnd)
  document.removeEventListener('touchcancel', onDocumentTouchEnd)

  if (dragActive) {
    applyPosition(pos.value.x, pos.value.y, true)
  }

  isDragging.value = false
  dragActive = false
}

function onDocumentMouseUp() {
  endPointerInteraction()
}

function onDocumentTouchEnd() {
  endPointerInteraction()
}

function onPointerDown(clientX: number, clientY: number) {
  hasDragged = false
  dragActive = false
  isDragging.value = false
  pointerStartX = clientX
  pointerStartY = clientY
  dragStartPos = { ...pos.value }
}

function onMouseDown(e: MouseEvent) {
  if (e.button !== 0) return
  onPointerDown(e.clientX, e.clientY)
  document.addEventListener('mousemove', onDocumentMouseMove)
  document.addEventListener('mouseup', onDocumentMouseUp)
}

function onTouchStart(e: TouchEvent) {
  if (!e.touches.length) return
  const touch = e.touches[0]
  onPointerDown(touch.clientX, touch.clientY)
  clearLongPressTimer()
  longPressTimer = setTimeout(() => {
    dragActive = true
    hasDragged = true
    isDragging.value = true
  }, LONG_PRESS_MS)
  document.addEventListener('touchmove', onDocumentTouchMove, { passive: false })
  document.addEventListener('touchend', onDocumentTouchEnd)
  document.addEventListener('touchcancel', onDocumentTouchEnd)
}

function onClick(e: MouseEvent) {
  if (hasDragged) {
    e.preventDefault()
    e.stopPropagation()
    hasDragged = false
    return
  }
  goBack()
}

function onDoubleClick(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  hasDragged = true
  resetPosition()
}

function onResize() {
  if (!positionReady) return
  const saved = readSavedPosition()
  if (saved) {
    applyPosition(saved.x, saved.y, true)
  } else {
    applyPosition(getDefaultPosition().x, getDefaultPosition().y)
  }
}

function goBack() {
  const prev = stack.value.pop()
  saveStack()
  if (!prev) return
  navigatingBack = true
  try {
    // @ts-ignore VitePress router.go 支持站内路径
    router.go(prev.path)
  } catch {
    window.location.href = prev.path
  }
}

watch(
  () => stack.value.length,
  async (len) => {
    if (len > 0) {
      await nextTick()
      initPosition()
    }
  },
)

onMounted(() => {
  loadStack()

  const original = router.onBeforeRouteChange
  router.onBeforeRouteChange = (to: string) => {
    if (navigatingBack) {
      navigatingBack = false
    } else {
      const from = window.location.pathname
      const toPath = to.split('#')[0]
      if (from && from !== toPath) {
        stack.value.push({ path: from, title: cleanTitle() || '上一页' })
        if (stack.value.length > MAX) stack.value.shift()
        saveStack()
      }
    }
    return original?.(to)
  }

  if (stack.value.length > 0) {
    nextTick(() => initPosition())
  }

  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  clearLongPressTimer()
  document.removeEventListener('mousemove', onDocumentMouseMove)
  document.removeEventListener('mouseup', onDocumentMouseUp)
  document.removeEventListener('touchmove', onDocumentTouchMove)
  document.removeEventListener('touchend', onDocumentTouchEnd)
  document.removeEventListener('touchcancel', onDocumentTouchEnd)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <Transition name="backbtn-fade">
    <button
      v-if="stack.length > 0"
      ref="btnRef"
      type="button"
      class="back-float-btn"
      :class="{ 'is-dragging': isDragging }"
      :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
      :title="buttonTitle"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @click="onClick"
      @dblclick="onDoubleClick"
    >
      <span class="arrow">←</span>
      <span class="label">返回上一页</span>
    </button>
  </Transition>
</template>

<style scoped>
.back-float-btn {
  position: fixed;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 500;
  cursor: grab;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s, opacity 0.2s;
  touch-action: none;
  user-select: none;
}

.back-float-btn:hover:not(.is-dragging) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  background: var(--vp-c-brand-soft);
}

.back-float-btn.is-dragging {
  opacity: 0.85;
  cursor: grabbing;
  transform: scale(1.05);
  transition: opacity 0.15s;
}

.back-float-btn .arrow {
  font-size: 15px;
  line-height: 1;
}

.backbtn-fade-enter-active,
.backbtn-fade-leave-active {
  transition: opacity 0.25s;
}

.backbtn-fade-enter-from,
.backbtn-fade-leave-to {
  opacity: 0;
}

@media (max-width: 899px) {
  .back-float-btn {
    padding: 10px 12px;
    box-shadow: 0 2px 10px rgb(55 38 27 / 0.18);
  }

  .back-float-btn .label {
    display: none;
  }
}
</style>
