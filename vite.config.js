import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/memecoinnpl/', // เปลี่ยนเป็นชื่อ Repo ของคุณใน GitHub
})