<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Layout from "@/layouts/DemoLayout.vue";
import { computed } from "@vue/reactivity";

useHead({
  title: "时间轴动画TODO | @柒宇",
});

defineOptions({
  label: "时间轴动画TODO",
  name: "timeline",
});

const start = {
  x: 20,
  y: 10,
};
const distance = { x: 140, y: 100 };
const r = 50;

const nodeList = [
  { x: 20, y: 10 },
  { x: 160, y: 10 },
  { x: 300, y: 10 },
  { x: 440, y: 10 },
];

const semicirclePath = (x: number, y: number) => `A ${r} ${r} 0 1 1 ${x} ${y}`;

const pathD = computed(() => {
  const line = nodeList.map((node) => `${node.x},${node.y}`).join(" L ");
  return `M ${line} ${semicirclePath(440, 120)}  `;
});
</script>

<template>
  <Layout name="timeline">
    <svg width="600" height="500">
      <path :d="pathD" fill="none" stroke="#000" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" />
      <template v-for="i in nodeList.length - 1">
        <circle :cx="start.x + (i - 1) * distance.x" :cy="start.y" r="3" stroke="#9f3af0" stroke-width="2" fill="#fff"></circle>
        <text :x="start.x + (i - 1) * distance.x" :y="start.y + 20" text-anchor="middle" alignment-baseline="middle">内容</text>
      </template>
    </svg>
  </Layout>
</template>

<style lang="less" scoped></style>
