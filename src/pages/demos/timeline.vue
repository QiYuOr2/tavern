<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Layout from "@/layouts/DemoLayout.vue";
import useTimelineAnime from "@/hooks/useTimelineAnime";
import { ref } from "vue";

useHead({
  title: "时间轴动画 | @柒宇",
});

defineOptions({
  label: "时间轴动画",
  name: "timeline",
});

const svg = ref(null);
const { timelineNodes, pathD, lineLength } = useTimelineAnime(svg, {
  start: { x: 60, y: 10 },
  distance: { x: 140, y: 110 },
  r: 50,
  maxWidth: 600,
  delay: 300,
  list: [
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
    { label: "测试11" },
  ],
});
</script>

<template>
  <Layout name="timeline">
    <svg ref="svg" width="600" height="500">
      <path class="line" :d="pathD" fill="none" stroke="#000" stroke-width="3px" stroke-linecap="round" stroke-linejoin="round" />
      <template v-for="node in timelineNodes">
        <template v-if="node.label">
          <circle
            class="node"
            :style="{ '--delay': node.delay }"
            :cx="node.x"
            :cy="node.y"
            r="3"
            stroke="#9f3af0"
            stroke-width="2"
            fill="#fff"
          ></circle>
          <text
            class="node"
            :style="{ '--delay': node.delay }"
            :x="node.x"
            :y="node.y + 20"
            text-anchor="middle"
            alignment-baseline="middle"
          >
            {{ node.label }}
          </text>
        </template>
      </template>
    </svg>
  </Layout>
</template>

<style lang="less" scoped>
.node {
  transform: scale(0);
  opacity: 0;
  animation: 0.5s fade-in ease-in-out, 0.5s zoom-in ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: var(--delay);
}

.line {
  stroke-dashoffset: 0;
  stroke-dasharray: v-bind(lineLength);
  animation: 3s line-grow linear;
  animation-fill-mode: forwards;
  animation-delay: 0.3s;
}

@keyframes line-grow {
  from {
    stroke-dashoffset: v-bind(lineLength);
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes zoom-in {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
