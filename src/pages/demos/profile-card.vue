<script setup lang="ts">
import Layout from "@/layouts/DemoLayout.vue";

defineOptions({
  label: "个人资料卡片",
  name: "profile-card",
});
</script>

<template>
  <Layout name="profile-card">
    <figure>
      <img src="https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/pixelartoc_1.png" alt="avatar" />
      <blockquote>
        <p>
          噫吁嚱，危乎高哉，蜀道之难，难于上青天！蚕丛及鱼凫，开国何茫然。尔来四万八千岁，不与秦塞通人烟。西当太白有鸟道，可以横绝峨眉巅。地崩山摧壮士死，然后天梯石栈相钩连。上有六龙回日之高标，下有冲波逆折之回川。
        </p>
      </blockquote>
      <figcaption>
        <div>柒宇</div>
        <div>前端工程师/像素画爱好者</div>
      </figcaption>
    </figure>
  </Layout>
</template>

<style lang="less" scoped>
figure {
  display: grid;
  grid-template-rows: 1fr 70px;
  grid-template-columns: 160px 1fr;
  width: 500px;
  height: 240px;

  box-shadow: 0 0 12px 1px rgb(0 0 0 / 20%);
  border-radius: 12px;
  overflow: hidden;
  img {
    height: 240px;
    width: 160px;
    object-fit: cover;

    grid-row-start: 1;
    grid-row-end: 3;
  }

  blockquote,
  figcaption {
    padding: 1.5rem 1.5rem 0;
  }
  figcaption {
    padding-top: 0;
    padding-bottom: 0;
    div {
      font-size: 0.8rem;
      color: rgb(113, 113, 113);
      &:first-child {
        font-size: 1.2rem;
        font-weight: bold;
        color: #1c5b5a;
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>
