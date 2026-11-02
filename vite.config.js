
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Use relative base ('./') so assets load correctly on both GitHub Pages (/TVET-Site/),
  // custom root domains, and any subpath without 404 asset path breakage.
  base: './',

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
