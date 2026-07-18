<template>
  <div class="bili-player">
    <iframe
      :src="src"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  bvid: string;
}>();

const src = computed(() => {
  const id = props.bvid.startsWith('BV') ? props.bvid : `BV${props.bvid}`;
  return `https://player.bilibili.com/player.html?bvid=${id}&autoplay=0`;
});
</script>

<style scoped>
.bili-player {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin: 1.5rem 0;
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: var(--vp-shadow-3);
  transition: transform var(--kb-motion-base), box-shadow var(--kb-motion-base);
}

.bili-player:hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-3);
}

.bili-player iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
