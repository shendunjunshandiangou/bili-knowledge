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
  padding-top: 56.25%; /* 16:9 */
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.bili-player iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
