import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        // 메인 페이지
        index: 'index.html',
        // 로그인 관련
        login: path.resolve(__dirname, 'src/components/Login/log-in.html'),
        join: path.resolve(__dirname, 'src/components/Login/join.html'),
        loginpw: path.resolve(__dirname, 'src/components/Login/log-in-pw.html'),
        authority: path.resolve(
          __dirname,
          'src/components/Login/authority.html',
        ),
        // 상품 관련
        itemList: path.resolve(__dirname, 'src/pages/itemList.html'),
        cart: path.resolve(__dirname, 'src/pages/cart.html'),
        detail: path.resolve(__dirname, 'src/pages/detail.html'),

        // 에러 페이지
        error: 'src/pages/error.html',
      },
    },
  },
  appType: 'mpa', // fallback 사용안함
});
