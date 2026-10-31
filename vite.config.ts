import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Project page on GitHub Pages: https://yugjain.github.io/yug-v2/
export default defineConfig({
  base: '/yug-v2/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      // Two real pages: the portfolio and the Lab.
      input: {
        main: 'index.html',
        lab: 'lab/index.html',
      },
    },
  },
});
