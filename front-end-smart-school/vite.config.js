// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';
// // https://vitejs.dev/config/
// export default defineConfig ({
//   build: {
//     manifest: true, // Generate manifest.json
//     rollupOptions: {
//       external: [
//         '/public/plugins/jquery/jquery.min.js',
//         '/public/plugins/jquery-ui/jquery-ui.min.js',
//         '/public/plugins/bootstrap/js/bootstrap.bundle.min.js',
//         '/public/plugins/chart.js/Chart.min.js',
//         '/public/plugins/sparklines/sparkline.js',
//         '/public/plugins/jqvmap/jquery.vmap.min.js',
//         '/public/plugins/jqvmap/maps/jquery.vmap.usa.js',
//         '/public/plugins/jquery-knob/jquery.knob.min.js',
//         '/public/plugins/moment/moment.min.js',
//         '/public/plugins/daterangepicker/daterangepicker.js',
//         '/public/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js',
//         '/public/plugins/summernote/summernote-bs4.min.js',
//         '/public/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js',
//         '/public/dist/js/adminlte.js',
//         '/public/dist/js/pages/dashboard.js',
//         '/public/dist/css/adminlte.min.css'
//       ],
//     },
//   },
//   plugins: [react()],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})