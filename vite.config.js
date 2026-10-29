import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages project sites (served at
  // https://<user>.github.io/MON-CODE/ instead of the domain root).
  base: '/MON-CODE/',
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Split big libraries so they cache separately from app code.
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap'],
          motion: ['motion/react'],
          ogl: ['ogl'],
        },
      },
    },
  },
})
