import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
  ],
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
  server: {
    // L'API n'autorise en CORS que le domaine de production : on la proxifie en local
    proxy: {
      '/api-proxy': {
        target: 'https://locazen12-api.motastic.workers.dev',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api-proxy/, ''),
      },
    },
  },
});
