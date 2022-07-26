<script setup lang="ts">
import GithubCorner from "@/components/GithubCorner.vue";

defineProps({
  name: String,
});
</script>

<template>
  <GithubCorner :name="name" />
  <slot></slot>
</template>
