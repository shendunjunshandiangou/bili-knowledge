<script setup>
import DefaultTheme from 'vitepress/theme'
import BackLink from './components/BackLink.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <BackLink />
    </template>
  </Layout>
</template>
