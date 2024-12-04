import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
    }),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      external: [
        'leather-styles/jsx',
        'leather-styles/tokens',
        'leather-styles/css',
        'leather-styles/hooks',
        'leather-styles',
      ],
    },
  },
});
