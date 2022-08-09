<script setup lang="ts">
import { computed, ref } from "vue";
import { useHead } from "@vueuse/head";
import Layout from "@/layouts/DemoLayout.vue";

useHead({
  title: "时间轴动画TODO | @柒宇",
});

defineOptions({
  label: "时间轴动画TODO",
  name: "timeline",
});

const start = {
  x: 60,
  y: 10,
};
const distance = { x: 140, y: 110 };
const r = 50;

const list = [
  { label: "测试1" },
  { label: "测试2" },
  { label: "测试3" },
  { label: "测试4" },
  { label: "测试5" },
  { label: "测试6" },
  { label: "测试7" },
  { label: "测试8" },
  { label: "测试9" },
  { label: "测试10" },
];
const maxCountInLine = Math.floor(600 / distance.x) - 1;
const level = ref(-1);
const direction = ref<"r" | "l">("l");
const pointToRight = (item: Record<string, any>, i: number) => {
  return {
    ...item,
    x: i * distance.x + start.x,
    y: start.y + level.value * distance.y,
  };
};
const pointToLeft = (item: Record<string, any>, i: number) => {
  return {
    ...item,
    x: (maxCountInLine - i) * distance.x + start.x,
    y: start.y + level.value * distance.y,
  };
};
const nodePosition = computed(() => {
  level.value = -1;
  direction.value = "l";
  return list.reduce<any[]>((result, current, i) => {
    if (i % 3 === 0) {
      level.value += 1;
      direction.value = direction.value === "l" ? "r" : "l";
    }
    direction.value === "r"
      ? result.push(pointToRight(current, i % maxCountInLine))
      : result.push(pointToLeft(current, i % maxCountInLine));
    return result;
  }, []);
});

const line = (item: any) => {
  return `${item.x},${item.y} `;
};
const getNextPoint = (current: any) => ({ x: current.x, y: current.y - distance.y });
const semicirclePath = (x: number, y: number) =>
  direction.value === "r" ? `A ${r} ${r} 0 1 0 ${x} ${y} ` : `A ${-r} ${-r} 0 1 1 ${x} ${y} `;
const pathD = computed(() => {
  level.value = -1;
  direction.value = "l";
  return nodePosition.value.reduce((result, current, i) => {
    if (i % 3 === 0) {
      // 拐点延长
      if (i !== 0) {
        console.log(current, getNextPoint(current));
        result += line(getNextPoint(current));
      }
      level.value += 1;
      direction.value = direction.value === "l" ? "r" : "l";
      // 弧线
      if (i !== 0) {
        result = result + semicirclePath(current.x, current.y) + "L ";
      }
    }
    direction.value === "r" ? (result = result + line(current)) : (result = result + line(current));
    return result;
  }, "M ");
});
</script>

<template>
  <Layout name="timeline">
    <svg width="600" height="500">
      <path :d="pathD" fill="none" stroke="#000" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" />
      <template v-for="node in nodePosition">
        <template v-if="node.label">
          <circle :cx="node.x" :cy="node.y" r="3" stroke="#9f3af0" stroke-width="2" fill="#fff"></circle>
          <text :x="node.x" :y="node.y + 20" text-anchor="middle" alignment-baseline="middle">{{ node.label }}</text>
        </template>
      </template>
    </svg>
  </Layout>
</template>

<style lang="less" scoped></style>
