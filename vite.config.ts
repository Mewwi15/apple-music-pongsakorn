import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // เพิ่มบรรทัดนี้

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // เพิ่มบรรทัดนี้เพื่อให้ Vite รู้จัก Tailwind V4
  ],
  build: {
    outDir: 'build', // สั่งให้สร้างโฟลเดอร์ชื่อ build แทน dist
  },
})