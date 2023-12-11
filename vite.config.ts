import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 3000,
    proxy: {
      // string shorthand: http://localhost:3000/api -> http://localhost:8080/api
      '/medical-procedures': 'http://127.0.0.1:8000',
    },
  },
  base: "React_Medicine",
  plugins: [react()],
  // base: "/main-page",
})

