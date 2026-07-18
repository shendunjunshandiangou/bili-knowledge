<script setup>
import DefaultTheme from 'vitepress/theme'
import BackLink from './components/BackLink.vue'
import SidebarResizer from './components/SidebarResizer.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <BackLink />
      <SidebarResizer />
    </template>
  </Layout>
</template>
