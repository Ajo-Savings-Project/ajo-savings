import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/pages",
      layouts: "/src/layouts",
      constants: "/src/constants",
      utils: "/src/utils",
      router: "/src/router",
      contexts: "/src/contexts"
    },
  },
})
