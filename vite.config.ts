import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'FacePass — 페패',
        short_name: 'FacePass',
        description: '사내 얼굴인식 출석체크',
        theme_color: '#3182F6',
        background_color: '#F2F4F6',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'ko',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Cache the ONNX model and large assets aggressively (kiosk runs offline)
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB (model)
        runtimeCaching: [
          {
            urlPattern: /\.onnx$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'onnx-models',
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1y
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24, // 1d
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false, // disable in dev to avoid SW caching during HMR
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3200,
    host: true,
  },
  preview: {
    port: 3200,
    host: true,
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web'], // load lazily
  },
});
