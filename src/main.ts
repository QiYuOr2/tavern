import { createHead } from "@vueuse/head";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(createHead()).use(router).mount("#app");
