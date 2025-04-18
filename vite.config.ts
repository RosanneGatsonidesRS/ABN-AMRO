import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/index.scss" as *;
        `,
      },
    },
  },
  /* vitest config */
  test: {
    environment: 'jsdom',
    globals: true,
    root: fileURLToPath(new URL('./', import.meta.url)),
    setupFiles: ['./src/tests/setup.ts'],
    include: ['./src/tests/**/*.spec.ts'],
    silent: true,
    css: false,
  }
})
