import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/DIRI/', 
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})