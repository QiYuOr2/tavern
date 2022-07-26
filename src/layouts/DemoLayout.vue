<script setup lang="ts">
import GithubCorner from "@/components/GithubCorner.vue";

defineProps({
  name: String,
});
</script>

<template>
  <GithubCorner :name="name" />
  <main>
    <slot></slot>
  </main>
</template>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
