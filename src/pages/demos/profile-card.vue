<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Layout from "@/layouts/DemoLayout.vue";

useHead({
  title: "个人资料卡片 | @柒宇",
});

defineOptions({
  label: "个人资料卡片",
  name: "profile-card",
});
</script>

<template>
  <Layout name="profile-card">
    <figure>
      <img src="https://avatars.githubusercontent.com/u/48339849?v=4" alt="avatar" />
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

  transition: all 0.3s;
  img {
    height: 240px;
    width: 160px;
    object-fit: cover;

    grid-row-start: 1;
    grid-row-end: 3;
    transition: all 0.3s;
  }

  blockquote,
  figcaption {
    padding: 1.5rem 1.5rem 0;
    transition: all 0.3s;
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

@media (max-width: 820px) {
  figure {
    position: relative;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    width: 280px;
    height: auto;
    padding: 1rem;

    img {
      display: inline-block;
      position: absolute;
      top: 1rem;
      left: 1rem;

      width: 50px;
      height: 50px;
      border-radius: 30px;
    }
    blockquote,
    figcaption {
      padding: 0;
    }
    blockquote {
      order: 2;
      padding-top: 1.3rem;
    }
    figcaption {
      display: inline-block;
      order: 1;
      padding-left: 68px;
    }
  }
}
</style>
