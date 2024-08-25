/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/__tests__/**/*.?(c|m)[jt]s?(x)"],
    watch: false
  }
})
