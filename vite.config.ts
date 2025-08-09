import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Para GitHub Pages web use base: '/chef-alerg-mvp/'
  base: '/',
})
