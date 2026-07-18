<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

type Spark = { x: number; y: number; angle: number; start: number };

const canvas = ref<HTMLCanvasElement | null>(null);
const sparks: Spark[] = [];
let frame = 0;
let context: CanvasRenderingContext2D | null = null;

const duration = 430;
const sparkCount = 8;
const radius = 24;
const sparkSize = 10;

function resize() {
  if (!canvas.value) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.value.width = Math.round(window.innerWidth * ratio);
  canvas.value.height = Math.round(window.innerHeight * ratio);
  canvas.value.style.width = `${window.innerWidth}px`;
  canvas.value.style.height = `${window.innerHeight}px`;
  context = canvas.value.getContext('2d');
  context?.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function draw(timestamp: number) {
  if (!context || !canvas.value) return;
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let index = sparks.length - 1; index >= 0; index -= 1) {
    const spark = sparks[index];
    const progress = (timestamp - spark.start) / duration;
    if (progress >= 1) {
      sparks.splice(index, 1);
      continue;
    }
    const eased = progress * (2 - progress);
    const distance = eased * radius;
    const length = sparkSize * (1 - eased);
    const x1 = spark.x + distance * Math.cos(spark.angle);
    const y1 = spark.y + distance * Math.sin(spark.angle);
    context.globalAlpha = 1 - progress;
    context.strokeStyle = '#9a603f';
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x1 + length * Math.cos(spark.angle), y1 + length * Math.sin(spark.angle));
    context.stroke();
  }
  context.globalAlpha = 1;
  frame = requestAnimationFrame(draw);
}

function onClick(event: MouseEvent) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const now = performance.now();
  for (let index = 0; index < sparkCount; index += 1) {
    sparks.push({
      x: event.clientX,
      y: event.clientY,
      angle: (Math.PI * 2 * index) / sparkCount,
      start: now,
    });
  }
}

onMounted(() => {
  resize();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('click', onClick, { passive: true });
  frame = requestAnimationFrame(draw);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
  document.removeEventListener('click', onClick);
  cancelAnimationFrame(frame);
});
</script>

<template><canvas ref="canvas" class="click-spark" aria-hidden="true"></canvas></template>

<style scoped>
.click-spark { position: fixed; z-index: 9999; inset: 0; pointer-events: none; user-select: none; }
</style>
