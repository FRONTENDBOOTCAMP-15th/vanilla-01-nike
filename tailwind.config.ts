module.exports = {
  content: [
    // 💡 HTML 템플릿 파일과 TS 로직 파일의 경로를 반드시 포함해야 합니다.
    './index.html',
    './src/**/*.{ts,html}', // src 폴더 하위의 모든 .ts 및 .html 파일 스캔
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
