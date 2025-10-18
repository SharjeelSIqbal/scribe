import { defineConfig } from 'vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          plugins: [tsconfigPaths()],
          resolve: {
            alias: {
              '@shared': path.resolve(__dirname, 'shared/'),
              '@electron': path.resolve(__dirname, 'electron/'),
              '@src': path.resolve(__dirname, 'src/'),
              '@services-layer': path.resolve(__dirname, 'src/service-layer/'),
            },
          },
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          plugins: [tsconfigPaths()],
          resolve: {
            alias: {
              '@shared': path.resolve(__dirname, 'shared/'),
              '@services-layer': path.resolve(__dirname, 'src/service-layer/'),
            },
          },
        },
      },
      renderer: process.env.NODE_ENV === 'test'
        ? undefined
        : {},
    }),
  ],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'shared/'),
      '@electron': path.resolve(__dirname, 'electron/'),
      '@src': path.resolve(__dirname, 'src/'),
      '@lexical-custom-plugins': path.resolve(__dirname, 'src/editor/lexical-custom-plugins/'),
      '@services-layer': path.resolve(__dirname, 'src/service-layer/'),
      '@utility': path.resolve(__dirname, 'src/utility/'),
      '@contexts': path.resolve(__dirname, 'src/contexts/'),
    },
  },
});
