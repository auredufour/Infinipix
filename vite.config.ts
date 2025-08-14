import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: process.env.NODE_ENV !== 'production',
              fileName: process.env.NODE_ENV !== 'production',
              minify: true,
              pure: true,
              // Remove styled-components runtime overhead in production
              ...(process.env.NODE_ENV === 'production' && {
                displayName: false,
                fileName: false,
              }),
            },
          ],
        ],
      },
    }),
    // Enable gzip compression for all assets
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 512, // Compress files larger than 512B
    }),
    // Enable brotli compression for even better compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 512,
    }),
    ...(process.env.ANALYZE ? [analyzer()] : []),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 200,
    minify: 'esbuild',
    target: 'es2022',
    cssTarget: 'chrome80',
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        preset: 'recommended',
      },
      output: {
        manualChunks: (id) => {
          // React core (keep small)
          if (
            id.includes('react/jsx-runtime') ||
            id.includes('react/jsx-dev-runtime')
          ) {
            return 'react-jsx'
          }
          if (id.includes('react-dom/client')) {
            return 'react-dom'
          }
          if (
            id.includes('react') &&
            !id.includes('react-dom') &&
            !id.includes('react-router')
          ) {
            return 'react-core'
          }

          // Router as separate chunk
          if (id.includes('react-router')) {
            return 'react-router'
          }

          // Styled components
          if (id.includes('styled-components')) {
            return 'styled'
          }

          // Other vendors
          if (id.includes('node_modules')) {
            return 'vendor'
          }

          // App chunks
          if (id.includes('/src/features/photos/')) {
            return 'photos'
          }
          if (id.includes('/src/components/shared/')) {
            return 'components'
          }
          if (id.includes('/src/styles/')) {
            return 'styles'
          }
        },
        chunkFileNames: 'js/[name]-[hash].js',
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
  },

  esbuild: {
    target: 'es2022',
    legalComments: 'none',
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true,
    // Remove unused imports
    pure: ['console.log', 'console.warn', 'console.info'],
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components'],
    esbuildOptions: {
      target: 'es2022',
    },
  },

  css: {
    devSourcemap: false,
  },

  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})
