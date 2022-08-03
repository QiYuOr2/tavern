<script setup lang="ts">
import GithubCorner from "@/components/GithubCorner.vue";

defineProps({
  name: String,
});
</script>

<template>
  <GithubCorner :name="name" />
  <div class="page-layout">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.page-layout {
  height: 100%;
  padding: 0 16rem;
}
</style>
