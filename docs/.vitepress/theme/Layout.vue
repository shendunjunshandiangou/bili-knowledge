<script setup>
import DefaultTheme from 'vitepress/theme'
import BackLink from './components/BackLink.vue'
import SidebarResizer from './components/SidebarResizer.vue'
import ClickSpark from './components/ClickSpark.vue'
import VaultSidebarNav from './components/VaultSidebarNav.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <ClickSpark />
      <BackLink />
      <SidebarResizer />
    </template>
    <template #sidebar-nav-before>
      <VaultSidebarNav />
    </template>
  </Layout>
</template>
