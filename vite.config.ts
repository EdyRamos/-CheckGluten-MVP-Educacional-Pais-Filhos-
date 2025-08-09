import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  // Para GitHub Pages web use base: '/chef-alerg-mvp/'
  base: '/',
  test: {
    environment: 'jsdom',
  },
})
