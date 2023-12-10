/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      pages: '/src/pages',
      layouts: '/src/layouts',
      appConstants: '/src/appConstants',
      utils: '/src/utils',
      router: '/src/router',
      contexts: '/src/contexts',
      api: '/src/api',
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './test-setup.ts',
  },
})
