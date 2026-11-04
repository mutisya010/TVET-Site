import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages: base is '/TVET-Site/' and outDir is 'docs'
// For VPS Linux Deployment: base is '/' and outDir is 'dist' (or configurable via env vars)
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.VITE_BASE_PATH || (isGitHubPages ? '/TVET-Site/' : '/');
const outDir = process.env.VITE_OUT_DIR || (isGitHubPages ? 'docs' : 'dist');

export default defineConfig({
  base: basePath,

  build: {
    outDir: outDir,
    emptyOutDir: true,
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
