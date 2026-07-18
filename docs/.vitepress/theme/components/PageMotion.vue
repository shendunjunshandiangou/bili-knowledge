<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';
import { setupPageMotion } from '../composables/usePageMotion';

const router = useRouter();

onMounted(() => {
  setupPageMotion(router);
});
</script>

<template></template>
