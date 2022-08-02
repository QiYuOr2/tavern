<script setup lang="ts">
import PageLayout from "@/layouts/PageLayout.vue";

defineOptions({
  name: "index",
});

const demoFiles = import.meta.globEager("./demos/*.vue");
const demos = Object.keys(demoFiles).map((k) => {
  const { label, name } = demoFiles[k].default;
  return { label, name };
});
</script>

<template>
  <PageLayout>
    <header>
      <h1>一些前端案例</h1>
    </header>
    <main>
      <ul>
        <li v-for="(item, i) in demos" :key="item.name" :style="`--delay: ${i * 0.1}s`">
          <RouterLink :to="{ name: item.name }"> {{ item.label }}</RouterLink>
        </li>
      </ul>
    </main>
  </PageLayout>
</template>

<style lang="less" scoped>
header {
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 3rem;
  h1 {
    margin-bottom: 2rem;
  }
}

main {
  font-size: 16px;
  text-align: left;
  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    li a {
      text-align: center;
      display: block;
      padding: 1rem 2rem;
      border-radius: 5px;
      box-shadow: 0 0 12px 1px rgb(0 0 0 / 10%);
      transition: all 0.3s;
      opacity: 0;
      animation: 0.5s fade-in ease-in-out forwards, 0.5s zoom-in ease-in-out forwards;
      animation-delay: var(--delay);
      &:hover {
        box-shadow: 0 0 19px 1px rgb(0 0 0 / 15%);
        transition: all 0.3s;
      }
    }
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

@keyframes zoom-in {
  from {
    transform: scale(1.3);
  }
  to {
    transform: scale(1);
  }
}

@media (max-width: 767px) {
  header {
    padding: 0 2rem;
  }
  main ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 554px) {
  main ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
