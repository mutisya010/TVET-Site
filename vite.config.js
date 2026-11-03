
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Must match the GitHub repository name for GitHub Pages to resolve assets correctly.
  // The site is served at https://teemoh00.github.io/TVET-Site/
  base: '/TVET-Site/',

  // Output to /docs so GitHub Pages can serve directly from the main branch
  // (Settings → Pages → Deploy from branch → main → /docs)
  build: {
    outDir: 'docs',
    emptyOutDir: false,
  },

  plugins: [react()],

  resolve: {
    alias: [
      { find: /^react-native$/, replacement: 'react-native-web' },
      { find: /^react-native\/(.*)$/, replacement: 'react-native-web/dist/$1' },
    ],
    extensions: [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
    ],
  },

  define: {
    global: 'window',
    __DEV__: JSON.stringify(false),
  },
});
