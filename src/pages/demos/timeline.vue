<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Layout from "@/layouts/DemoLayout.vue";

useHead({
  title: "时间轴动画 | @柒宇",
});

defineOptions({
  label: "时间轴动画",
  name: "timeline",
});
</script>

<template>
  <Layout name="timeline">
    
  </Layout>
</template>

<style lang="less" scoped></style>
