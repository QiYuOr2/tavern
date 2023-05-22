<script setup lang="ts">
import { useHead } from '@vueuse/head';
import Layout from '@/layouts/DemoLayout.vue';

useHead({
  title: '边框流光 | @柒宇',
});

defineOptions({
  label: '边框流光',
  name: 'border-light',
});
</script>

<template>
  <Layout name="border-light">
    <div class="wrap"></div>
  </Layout>
</template>

<style lang="less" scoped>
.wrap {
  position: relative;
  z-index: 0;
  overflow: hidden;

  width: 400px;
  height: 500px;

  border-radius: 20px;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;

    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;

    background: linear-gradient(240deg, transparent 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 52%, transparent 60%);
    background-color: #654eff;
    background-size: 200% 100%;
    background-position-x: 180%;
    animation: 3s loading ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: #fff;
    border-radius: 20px;
  }
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
