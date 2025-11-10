import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // 메인 페이지
        index: "index.html",

        // 에러 페이지
        // error: "src/pages/error.html",
      },
    },
  },
  appType: "mpa", // fallback 사용안함
});
