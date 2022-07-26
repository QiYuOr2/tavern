import { createRouter, createWebHashHistory } from "vue-router";

const pages = import.meta.globEager("./pages/**/*.vue");

const pathRegex = /^\.\/pages\/(.*)\.vue$/;

const router = createRouter({
  history: createWebHashHistory(),
  routes: Object.keys(pages).map((k) => {
    const page = pages[k].default;
    const path = `/${k.match(pathRegex)?.[1] || ""}`.replace("index", "");
    return {
      path,
      name: page.name,
      component: page,
    };
  }),
});

export default router;
