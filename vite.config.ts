import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, '.', '');
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const base =
    env.VITE_BASE_URL ||
    (process.env.GITHUB_ACTIONS === 'true' && repositoryName
      ? `/${repositoryName}/`
      : command === 'build'
        ? './'
        : '/');

  return {
    // GitHub Pages 部署时自动使用仓库子路径，本地开发默认为 '/'
    base,
    plugins: [
      react(),
      tailwindcss(),
      nodePolyfills({
        include: ['buffer', 'process'],
      }),
      {
        name: 'github-pages-spa-fallback',
        closeBundle() {
          const distDir = path.resolve(__dirname, 'dist');
          const indexFile = path.join(distDir, 'index.html');
          const notFoundFile = path.join(distDir, '404.html');
          const noJekyllFile = path.join(distDir, '.nojekyll');

          if (fs.existsSync(indexFile)) {
            fs.copyFileSync(indexFile, notFoundFile);
          }

          fs.writeFileSync(noJekyllFile, '');
        },
      },
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
