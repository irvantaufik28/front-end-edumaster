import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig ({
  build: {
    manifest: true, // Generate manifest.json
    rollupOptions: {
      external: [
        '/plugins/jquery/jquery.min.js',
        '/plugins/jquery-ui/jquery-ui.min.js',
        '/plugins/bootstrap/js/bootstrap.bundle.min.js',
        '/plugins/chart.js/Chart.min.js',
        '/plugins/sparklines/sparkline.js',
        '/plugins/jqvmap/jquery.vmap.min.js',
        '/plugins/jqvmap/maps/jquery.vmap.usa.js',
        '/plugins/jquery-knob/jquery.knob.min.js',
        '/plugins/moment/moment.min.js',
        '/plugins/daterangepicker/daterangepicker.js',
        '/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js',
        '/plugins/summernote/summernote-bs4.min.js',
        '/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js',
        '/dist/js/adminlte.js',
        '/dist/js/pages/dashboard.js',
        '/dist/css/adminlte.min.css'
      ],
    },
  },
  plugins: [react()],
});

