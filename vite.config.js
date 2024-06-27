import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@css': fileURLToPath(new URL('./src/assets/css', import.meta.url)),
      '@imgs': fileURLToPath(new URL('./src/assets/imgs', import.meta.url)),
    },
  },
  server: {
    open: true,
  }
})
