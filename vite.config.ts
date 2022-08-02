import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueMacros from "unplugin-vue-macros/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueMacros()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
