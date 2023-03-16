<script setup lang="ts">
import { ref } from 'vue';
import { useLike } from '@/hooks/useLike';
import { useHead } from '@vueuse/head';
import DemoLayout from '@/layouts/DemoLayout.vue';

useHead({
  title: '点赞效果 | @柒宇',
});

defineOptions({
  label: '点赞效果',
  name: 'like',
});

const container = ref<HTMLElement>();
const { play } = useLike(container);
</script>

<template>
  <DemoLayout name="like">
    <div ref="container"></div>
    <button @click="play">点击</button>
  </DemoLayout>
</template>

<style lang="less" scoped>
button {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
