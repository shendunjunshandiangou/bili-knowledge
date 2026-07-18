<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const showBack = ref(false)
const backLink = ref('')
const backTitle = ref('')

const KEY = 'bili-knowledge-prev'

// 只在从文章/体系化阅读页跳转到原子页时，记录来源页
router.onBeforeRouteChange = (to: string) => {
  const from = window.location.pathname
  if (
    to.includes('/atoms/') &&
    (from.includes('/articles/') || from.includes('/knowledge/'))
  ) {
    sessionStorage.setItem(
      KEY,
      JSON.stringify({
        path: from,
        title: document.title.replace(/ \| B站知识库$/, ''),
      })
    )
  }
}

onMounted(() => {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return
  try {
    const prev = JSON.parse(raw)
    if (prev.path && prev.path !== window.location.pathname) {
      backLink.value = prev.path
      backTitle.value = prev.title || '上一页'
      showBack.value = true
    }
  } catch {
    // ignore
  }
})

function goBack() {
  try {
    // @ts-ignore
    router.go(backLink.value)
  } catch {
    window.location.href = backLink.value
  }
}
</script>

<template>
  <div v-if="showBack" class="back-link">
    <a :href="backLink" @click.prevent="goBack">← 返回：{{ backTitle }}</a>
  </div>
</template>

<style scoped>
.back-link {
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-size: 14px;
}

.back-link a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>
