import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
              minify: true,
              pure: true,
            },
          ],
        ],
      },
    }),
    ...(process.env.ANALYZE ? [analyzer()] : []),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          styled: ['styled-components'],
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            const name = facadeModuleId
              .split('/')
              .pop()
              ?.replace('.tsx', '')
              .replace('.ts', '')
            return `js/${name}-[hash].js`
          }
          return 'js/[name]-[hash].js'
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext || '')) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
    minify: 'terser',
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components'],
  },
})
