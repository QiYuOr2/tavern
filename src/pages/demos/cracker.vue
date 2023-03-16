<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCracker } from '@/hooks/useCracker';
import { useHead } from '@vueuse/head';
import DemoLayout from '@/layouts/DemoLayout.vue';

useHead({
  title: '粒子效果 | @柒宇',
});

defineOptions({
  label: '粒子效果',
  name: 'cracker',
});

const container = ref<HTMLElement>();
const { play } = useCracker(container);

onMounted(() => {
  container.value?.addEventListener('click', (e) => {
    console.log(e.x, e.y);
    play(e.x, e.y);
  });
});
</script>

<template>
  <DemoLayout name="cracker">
    <div ref="container"></div>
    <div class="tips">点击任意位置</div>
  </DemoLayout>
</template>

<style lang="less" scoped>
.tips {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  user-select: none;
}
</style>
