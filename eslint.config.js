import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      'prefer-const': 'warn', // 변수가 재할당 되지 않는다면 let 대신 const 사용하도록 경고
      'no-redeclare': 1, // 변수 중복 선언시 경고
      quotes: ['error', 'double'], // double quote 사용
      // 기타 룰 추가
    },
  },
  {
    ignores: ['.history', 'dist'], // ignores 속성만 제공하면 전체 설정에 적용
  },
  prettierConfig.recommended, // eslint의 스타일 관련 규칙 모두 비활성화
  tseslint.configs.recommended,
]);
