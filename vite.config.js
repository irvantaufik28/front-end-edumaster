import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';


export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/components/layouts'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      
    },
  },
  server: {
    port: 9001
  },
  preview: {
    port: 8080
  }
})