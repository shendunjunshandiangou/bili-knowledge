<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

interface NavEntry {
  path: string
  title: string
}

const router = useRouter()
const stack = ref<NavEntry[]>([])
const STACK_KEY = 'bili-knowledge-navstack'
const MAX = 20

// 标记：正在执行"返回"导航，避免把当前页重新压栈
let navigatingBack = false

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

onMounted(() => {
  loadStack()

  const original = router.onBeforeRouteChange
  router.onBeforeRouteChange = (to: string) => {
    if (navigatingBack) {
      navigatingBack = false
    } else {
      const from = window.location.pathname
      const toPath = to.split('#')[0]
      // 同页锚点跳转不入栈；仅记录站内实际换页
      if (from && from !== toPath) {
        stack.value.push({ path: from, title: cleanTitle() || '上一页' })
        if (stack.value.length > MAX) stack.value.shift()
        saveStack()
      }
    }
    return original?.(to)
  }
})

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
</script>

<template>
  <Transition name="backbtn-fade">
    <button
      v-if="stack.length > 0"
      class="back-float-btn"
      :title="'返回：' + stack[stack.length - 1].title"
      @click="goBack"
    >
      <span class="arrow">←</span>
      <span class="label">返回上一页</span>
    </button>
  </Transition>
</template>

<style scoped>
.back-float-btn {
  position: fixed;
  right: 24px;
  bottom: 88px;
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
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}

.back-float-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  background: var(--vp-c-brand-soft);
}

.back-float-btn .arrow {
  font-size: 15px;
  line-height: 1;
}

.backbtn-fade-enter-active,
.backbtn-fade-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.backbtn-fade-enter-from,
.backbtn-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .back-float-btn {
    right: 16px;
    bottom: 76px;
    padding: 7px 12px;
  }
  .back-float-btn .label {
    display: none;
  }
}
</style>
