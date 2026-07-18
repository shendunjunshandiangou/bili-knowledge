<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, withBase } from 'vitepress';
import vaults from '../../vaults.generated.json';

const route = useRoute();
const currentVault = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  const key = segments.find((segment) => vaults.some((vault) => vault.key === segment));
  return vaults.find((vault) => vault.key === key);
});

const links = [
  { key: 'knowledge', label: '体系化阅读' },
  { key: 'articles', label: '逐视频文章' },
  { key: 'atoms', label: '原子笔记' },
];

function isSectionActive(key: string) {
  return route.path.includes(`/${key}/`);
}
</script>

<template>
  <div v-if="currentVault" class="vault-sidebar-nav">
    <a
      class="vault-home-link"
      :class="{ active: route.path.endsWith(`/${currentVault.key}/`) }"
      :href="withBase(`/${currentVault.key}/`)"
    >
      <span>知识库首页</span>
      <strong>{{ currentVault.name }}</strong>
      <i>→</i>
    </a>
    <nav aria-label="阅读目录">
      <a
        v-for="link in links"
        :key="link.key"
        :class="{ active: isSectionActive(link.key) }"
        :href="withBase(`/${currentVault.key}/${link.key}/`)"
      >
        <span>{{ link.label }}</span>
        <i>↗</i>
      </a>
    </nav>
  </div>
</template>

<style scoped>
.vault-sidebar-nav { margin: 0 8px 24px; padding-bottom: 22px; border-bottom: 1px solid var(--vp-c-divider); }
.vault-home-link { position: relative; display: grid; gap: 3px; padding: 13px 34px 13px 14px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); background: rgb(245 238 228 / .54); transition: border-color 160ms, background-color 160ms; }
.vault-home-link:hover, .vault-home-link.active { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.vault-home-link span { color: var(--vp-c-text-3); font-size: 10px; letter-spacing: .08em; }
.vault-home-link strong { font-size: 14px; }
.vault-home-link i { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); color: var(--vp-c-brand-1); font-style: normal; }
.vault-sidebar-nav nav { display: grid; gap: 2px; margin-top: 10px; }
.vault-sidebar-nav nav a { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; color: var(--vp-c-text-2); font-size: 12px; }
.vault-sidebar-nav nav a:hover, .vault-sidebar-nav nav a.active { color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.vault-sidebar-nav nav i { font-style: normal; opacity: .72; }
</style>
