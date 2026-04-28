import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/starrail-showcase/',
  plugins: [react()],
})
