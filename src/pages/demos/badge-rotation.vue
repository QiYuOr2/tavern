<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useHead } from "@vueuse/head";
import Layout from "@/layouts/DemoLayout.vue";
import { DefaultNull } from "@/utils/type";
import useRotationAnime from "@/hooks/useRotationAnime";

//#region
useHead({
  title: `旋转吧！徽章！ | @柒宇`,
});

defineOptions({
  label: "旋转吧！徽章！",
  name: "badge-rotation",
});
//#endregion

const container = ref<DefaultNull<HTMLDivElement>>(null);
const { rotateYWithDeg, run } = useRotationAnime(container);

onMounted(() => {
  // 首次进入稍微晃一下
  run(30);
});
</script>

<template>
  <Layout name="badge-rotation">
    <div class="container" ref="container">
      <div class="badge">
        <div class="badge__front"></div>
        <div class="badge__back"></div>
      </div>
      <div class="desc">← 尝试左右滑动 →</div>
    </div>
  </Layout>
</template>

<style lang="less" scoped>
@size: 200px;
@space: 5px;

.container {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  .desc {
    margin-top: 1rem;
  }
}

.badge {
  position: relative;

  width: @size;
  height: @size;
  transform-style: preserve-3d;

  transform: rotateY(v-bind(rotateYWithDeg));

  &__front,
  &__back {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__front {
    background: #369;
    transform: translateZ(@space);
  }
  &__back {
    background: #f78989;
    transform: translateZ(-@space);
  }
}
</style>
