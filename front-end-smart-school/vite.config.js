import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      external: ['/public/dist/js/adminlte.js', '/public/dist/js/pages/dashboard.js'],
    },
  },
  plugins: [react()],
})
