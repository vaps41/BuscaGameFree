import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/games': {
        target: 'https://www.gamerpower.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/games/, '/api/giveaways'),
      },
    },
  },
})
